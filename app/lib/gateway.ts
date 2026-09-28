import "server-only";

/**
 * Cliente da API do Google Gemini usando fetch nativo (sem SDK).
 *
 * O free tier do AI Studio não exige cartão de crédito, o que torna o Gemini
 * a opção mais simples para um deploy de portfólio na Vercel.
 *
 * Referência dos endpoints usados:
 *   - Embeddings: POST /v1beta/models/{model}:batchEmbedContents
 *   - Geração:    POST /v1beta/models/{model}:streamGenerateContent?alt=sse
 */

const GEMINI_BASE_URL =
  process.env.GEMINI_BASE_URL ??
  "https://generativelanguage.googleapis.com/v1beta";

export const EMBEDDING_MODEL =
  process.env.GEMINI_EMBEDDING_MODEL ?? "gemini-embedding-001";

/**
 * Modelo de geração.
 *
 * Os modelos Flash "grandes" (3.5/3.6/3.7/3.8-flash) têm apenas ~20 requisições
 * por dia no free tier, o que não sustenta um site público. Os Flash-Lite
 * têm ~500/dia, e para responder 2 a 4 frases a partir de um contexto já
 * recuperado a diferença de qualidade é irrelevante. Troque por
 * "gemini-3.5-flash" via GEMINI_CHAT_MODEL se quiser respostas melhores e
 * aceitar a cota de 20/dia.
 */
export const CHAT_MODEL =
  process.env.GEMINI_CHAT_MODEL ?? "gemini-3.5-flash-lite";

/**
 * Dimensão dos embeddings. O modelo produz 3072 por padrão, mas aceita
 * truncar via MRL: 768 já separa bem os trechos deste corpus e mantém o
 * arquivo de índice pequeno.
 */
export const EMBEDDING_DIMENSIONS = 768;

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export class GatewayError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "GatewayError";
  }
}

function resolveApiKey(): string {
  const key = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;
  if (!key) {
    throw new GatewayError(
      "Chave da API do Gemini não configurada. Crie uma em https://aistudio.google.com/apikey e defina GEMINI_API_KEY no .env.local e na Vercel.",
    );
  }
  return key;
}

async function geminiFetch(path: string, body: unknown): Promise<Response> {
  const response = await fetch(`${GEMINI_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "x-goog-api-key": resolveApiKey(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");

    if (response.status === 429) {
      throw new GatewayError(
        "Cota diária do Gemini esgotada no plano gratuito. Tente novamente amanhã ou troque GEMINI_CHAT_MODEL por um modelo com mais cota.",
        429,
      );
    }

    throw new GatewayError(
      `Gemini ${response.status} em ${path}: ${detail.slice(0, 500)}`,
      response.status,
    );
  }

  return response;
}

/** Gera embeddings para uma lista de textos, em requisições em lote. */
export async function embedMany(
  values: string[],
  model: string = EMBEDDING_MODEL,
): Promise<number[][]> {
  if (values.length === 0) return [];

  const BATCH_SIZE = 50;
  const vectors: number[][] = [];

  for (let i = 0; i < values.length; i += BATCH_SIZE) {
    const batch = values.slice(i, i + BATCH_SIZE);

    const response = await geminiFetch(`/models/${model}:batchEmbedContents`, {
      requests: batch.map((text) => ({
        model: `models/${model}`,
        content: { parts: [{ text }] },
        outputDimensionality: EMBEDDING_DIMENSIONS,
      })),
    });

    const payload = (await response.json()) as {
      embeddings?: { values: number[] }[];
    };

    if (payload.embeddings?.length !== batch.length) {
      throw new GatewayError(
        `O Gemini retornou ${payload.embeddings?.length ?? 0} embeddings para ${batch.length} textos.`,
      );
    }

    vectors.push(...payload.embeddings.map((item) => item.values));
  }

  return vectors;
}

/** Gera o embedding de um único texto. */
export async function embedOne(
  value: string,
  model: string = EMBEDDING_MODEL,
): Promise<number[]> {
  const [vector] = await embedMany([value], model);
  if (!vector) throw new GatewayError("Embedding não retornado.");
  return vector;
}

export interface StreamChatOptions {
  /** Instrução de sistema, enviada no campo systemInstruction. */
  system: string;
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  signal?: AbortSignal;
}

/**
 * Envia as mensagens ao Gemini e emite cada trecho de texto conforme chega.
 * Com `alt=sse` a resposta vira um stream SSE no mesmo formato do
 * generateContent normal, o que dispensa qualquer parser específico.
 */
export async function* streamChat({
  system,
  messages,
  model = CHAT_MODEL,
  temperature = 0.3,
  maxTokens = 800,
  signal,
}: StreamChatOptions): AsyncGenerator<string> {
  const response = await geminiFetch(
    `/models/${model}:streamGenerateContent?alt=sse`,
    {
      systemInstruction: { parts: [{ text: system }] },
      // A API do Gemini nomeia o papel do assistente como "model".
      contents: messages.map((message) => ({
        role: message.role === "assistant" ? "model" : "user",
        parts: [{ text: message.content }],
      })),
      generationConfig: {
        temperature,
        maxOutputTokens: maxTokens,
      },
    },
  );

  if (!response.body) {
    throw new GatewayError("Resposta sem corpo (stream) do Gemini.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  /** Extrai o texto de um bloco SSE já isolado. */
  function* parseBlock(block: string): Generator<string> {
    for (const line of block.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;

      const data = trimmed.slice(5).trim();
      if (!data || data === "[DONE]") continue;

      let event: {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
        promptFeedback?: { blockReason?: string };
      };

      try {
        event = JSON.parse(data);
      } catch {
        // Keep-alive ou linha malformada: ignoramos e seguimos.
        continue;
      }

      // Conteúdo bloqueado chega sem candidates.
      const blocked = event.promptFeedback?.blockReason;
      if (blocked) {
        throw new GatewayError(`Conteúdo bloqueado pelo Gemini (${blocked}).`);
      }

      const text = event.candidates?.[0]?.content?.parts
        ?.map((part) => part.text ?? "")
        .join("");

      if (text) yield text;
    }
  }

  try {
    while (true) {
      if (signal?.aborted) return;

      const { done, value } = await reader.read();
      if (done) break;

      // O Gemini emite os eventos com \r\n\r\n. Normalizar para \n evita que
      // um "\r" fique entre os dois "\n" e quebre a busca pelo separador.
      buffer = (buffer + decoder.decode(value, { stream: true })).replace(
        /\r\n/g,
        "\n",
      );

      let boundary: number;
      while ((boundary = buffer.indexOf("\n\n")) !== -1) {
        yield* parseBlock(buffer.slice(0, boundary));
        buffer = buffer.slice(boundary + 2);
      }
    }

    // O último evento pode não vir acompanhado do separador.
    if (buffer.trim()) yield* parseBlock(buffer);
  } finally {
    reader.cancel().catch(() => {});
  }
}
