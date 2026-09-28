"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  Bot,
  X,
  Send,
  Loader2,
  ChevronDown,
  User,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface Source {
  id: string;
  title: string;
  category: string;
  score: number;
  url?: string;
  anchor?: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  failed?: boolean;
}

const SUGGESTIONS = [
  "Quais são as tecnologias que você usa?",
  "Fale sobre sua experiência com NOC",
  "Quais projetos você já desenvolvimento?",
  "Como eu posso te contratar?",
];

const CATEGORY_LABELS: Record<string, string> = {
  perfil: "Perfil",
  sobre: "Sobre",
  experiencia: "Experiência",
  projetos: "Projeto",
  habilidades: "Habilidade",
  formacao: "Formação",
  certificacoes: "Certificação",
  contato: "Contato",
};

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// Só http(s) entram na lista: esquemas como javascript: ou data: nunca viram
// âncora, o que fecha o vetor de XSS sem precisar de sanitizador de HTML.
const URL_PATTERN = /\bhttps?:\/\/[^\s<>"']+/gi;
const TRAILING_PUNCTUATION = /[.,;:!?)\]}>"']+$/;

/** "https://www.site.com/" vira "site.com": o texto cru e longo some da resposta. */
function shortLabel(url: string): string {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    const path = parsed.pathname === "/" ? "" : parsed.pathname.replace(/\/$/, "");
    return host + path;
  } catch {
    return url;
  }
}

/**
 * Transforma URLs soltas no texto em links clicáveis, sem usar
 * dangerouslySetInnerHTML. O React escapa todo o texto e os <a> são
 * construídos via JSX, então nada vindo do modelo vira HTML.
 */
function linkify(content: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of content.matchAll(URL_PATTERN)) {
    const start = match.index ?? 0;
    // O ponto final de uma frase não faz parte do endereço.
    const href = match[0].replace(TRAILING_PUNCTUATION, "");
    if (!href) continue;

    if (start > cursor) nodes.push(content.slice(cursor, start));

    nodes.push(
      <a
        key={`${start}-${href}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={href}
        className="mx-0.5 inline-flex max-w-full items-center gap-1 rounded-md border border-[#a5c9ff]/30 bg-[#a5c9ff]/15 px-1.5 py-0.5 align-baseline text-[#a5c9ff] transition-colors hover:bg-[#a5c9ff]/30"
      >
        <span className="truncate">{shortLabel(href)}</span>
        <ExternalLink size={11} className="shrink-0 opacity-70" />
      </a>,
    );

    cursor = start + href.length;
  }

  if (cursor < content.length) nodes.push(content.slice(cursor));
  return nodes;
}

/** Lê o stream SSE do /api/chat e devolve deltas, fontes e erros. */
async function streamAnswer(
  question: string,
  history: Message[],
  signal: AbortSignal,
  onDelta: (text: string) => void,
  onSources: (sources: Source[]) => void,
): Promise<void> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question,
      history: history
        .filter((m) => !m.failed && m.content.trim())
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content })),
    }),
    signal,
  });

  if (!response.ok || !response.body) {
    const detail = await response.json().catch(() => null);
    throw new Error(detail?.error ?? "Não consegui falar com o assistente agora.");
  }

  // Quando nada relevante é recuperado, a rota responde JSON direto em vez de
  // stream. Tratar os dois formatos no mesmo lugar evita uma tela vazia.
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const payload = await response.json();
    onSources(Array.isArray(payload.sources) ? payload.sources : []);
    onDelta(String(payload.answer ?? ""));
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // Cada evento SSE ocupa um bloco separado por linha em branco.
    let split: number;
    while ((split = buffer.indexOf("\n\n")) !== -1) {
      const block = buffer.slice(0, split);
      buffer = buffer.slice(split + 2);

      let event = "message";
      const dataLines: string[] = [];

      for (const line of block.split("\n")) {
        if (line.startsWith("event:")) event = line.slice(6).trim();
        else if (line.startsWith("data:")) dataLines.push(line.slice(5).trim());
      }

      if (!dataLines.length) continue;

      let payload: Record<string, unknown>;
      try {
        payload = JSON.parse(dataLines.join("\n"));
      } catch {
        continue;
      }

      if (event === "delta" && typeof payload.text === "string") {
        onDelta(payload.text);
      } else if (event === "sources" && Array.isArray(payload.sources)) {
        onSources(payload.sources as Source[]);
      } else if (event === "error") {
        throw new Error(
          typeof payload.message === "string"
            ? payload.message
            : "Erro ao gerar a resposta.",
        );
      }
    }
  }
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [unread, setUnread] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
      setUnread(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setUnread(false);
      inputRef.current?.focus();
    }
  }, [open]);

  // Cancela qualquer geração em andamento ao desmontar o componente.
  useEffect(() => () => abortRef.current?.abort(), []);

  const ask = useCallback(
    async (rawQuestion: string) => {
      const question = rawQuestion.trim();
      if (!question || loading) return;

      const history = messages;
      const userMessage: Message = { id: createId(), role: "user", content: question };
      const replyId = createId();
      const reply: Message = { id: replyId, role: "assistant", content: "" };

      setMessages([...history, userMessage, reply]);
      setInput("");
      setLoading(true);
      setShowSources(false);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        await streamAnswer(
          question,
          history,
          controller.signal,
          (text) => {
            setMessages((prev) =>
              prev.map((m) => (m.id === replyId ? { ...m, content: m.content + text } : m)),
            );
          },
          (sources) => {
            setMessages((prev) =>
              prev.map((m) => (m.id === replyId ? { ...m, sources } : m)),
            );
          },
        );
      } catch (error) {
        if (controller.signal.aborted) return;

        const message =
          error instanceof Error ? error.message : "Erro inesperado.";

        setMessages((prev) =>
          prev.map((m) =>
            m.id === replyId
              ? {
                  ...m,
                  content: m.content || "Desculpe, não consegui responder agora.",
                  failed: true,
                }
              : m,
          ),
        );

        console.error("[ChatBot]", message);
      } finally {
        setLoading(false);
        abortRef.current = null;
      }
    },
    [loading, messages],
  );

  const close = () => {
    abortRef.current?.abort();
    setLoading(false);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[calc(100vw-3rem)] max-w-sm h-[min(32rem,calc(100vh-6rem))] bg-[#151515] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-up font-[Arial,Helvetica,sans-serif]">
          {/* Cabeçalho */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-[#1a1a1a]">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-[#a5c9ff]/15 text-[#a5c9ff] flex items-center justify-center">
                <Bot size={18} />
              </div>
              {!loading && (
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#1a1a1a]" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                Assistente do Paulo
              </p>
              <p className="text-[11px] text-white/50">
                {loading ? "digitando..." : "responde sobre perfil e projetos"}
              </p>
            </div>

            <button
              onClick={close}
              aria-label="Fechar assistente"
              className="text-white/50 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Conversa */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="flex gap-2.5">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-[#a5c9ff]/15 text-[#a5c9ff] flex items-center justify-center">
                    <Bot size={14} />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm text-white/90 leading-relaxed">
                    Olá! Eu sou o assistente virtual do Paulo. Tenho acesso ao
                    perfil, à experiência, aos projetos e às tecnologias dele.
                    O que você quer saber?
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pl-9">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => ask(suggestion)}
                      className="text-left text-xs text-white/80 border border-white/15 hover:border-[#a5c9ff]/60 hover:text-[#a5c9ff] rounded-full px-3 py-1.5 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) =>
              message.role === "user" ? (
                <div key={message.id} className="flex justify-end gap-2.5">
                  <div className="bg-[#a5c9ff] text-black rounded-2xl rounded-br-sm px-3.5 py-2.5 text-sm max-w-[85%] leading-relaxed break-words">
                    {message.content}
                  </div>
                  <div className="shrink-0 w-7 h-7 rounded-full bg-white/10 text-white/70 flex items-center justify-center">
                    <User size={14} />
                  </div>
                </div>
              ) : (
                <div key={message.id} className="flex gap-2.5">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-[#a5c9ff]/15 text-[#a5c9ff] flex items-center justify-center">
                    <Bot size={14} />
                  </div>

                  <div className="min-w-0 flex-1 space-y-2">
                    <div
                      className={`bg-white/5 border rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm max-w-[85%] leading-relaxed whitespace-pre-wrap break-words ${
                        message.failed
                          ? "border-red-500/30 text-red-300"
                          : "border-white/10 text-white/90"
                      }`}
                    >
                      {message.content ? (
                        linkify(message.content)
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-white/50">
                          <Loader2 size={13} className="animate-spin" />
                          buscando no currículo...
                        </span>
                      )}
                    </div>

                    {message.sources && message.sources.length > 0 && (
                      <div className="max-w-[85%]">
                        <button
                          onClick={() => setShowSources((v) => !v)}
                          className="flex items-center gap-1 text-[11px] text-white/50 hover:text-[#a5c9ff] transition-colors"
                        >
                          <Sparkles size={11} />
                          {message.sources.length} fonte
                          {message.sources.length > 1 ? "s" : ""} na base
                          <ChevronDown
                            size={12}
                            className={`transition-transform duration-300 ${
                              showSources ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {showSources && (
                          <ul className="mt-1.5 space-y-1">
                            {message.sources.map((source) => (
                              <li key={source.id}>
                                {source.url ? (
                                  <a
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-[11px] text-white/60 hover:text-[#a5c9ff] bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 transition-colors"
                                  >
                                    <span className="text-[#a5c9ff]/80">
                                      {CATEGORY_LABELS[source.category] ??
                                        source.category}
                                    </span>
                                    {" · "}
                                    {source.title}
                                  </a>
                                ) : (
                                  <span className="block text-[11px] text-white/60 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5">
                                    <span className="text-[#a5c9ff]/80">
                                      {CATEGORY_LABELS[source.category] ??
                                        source.category}
                                    </span>
                                    {" · "}
                                    {source.title}
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ),
            )}
          </div>

          {/* Campo de entrada */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              ask(input);
            }}
            className="flex items-center gap-2 px-3 py-3 border-t border-white/10 bg-[#1a1a1a]"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Pergunte sobre skills, projetos, experiência..."
              maxLength={500}
              disabled={loading}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/35 outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Enviar pergunta"
              className="w-9 h-9 rounded-full bg-[#a5c9ff] text-black flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={15} />
              )}
            </button>
          </form>
        </div>
      )}

      {/* Botão flutuante */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir assistente"
          className="relative w-14 h-14 rounded-full bg-[#a5c9ff] text-black flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <Bot size={24} />
          {unread && (
            <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0a0a0a]" />
          )}
        </button>
      )}
    </div>
  );
}
