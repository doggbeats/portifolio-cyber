"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function goTo(path: string) {
    router.push(path);
    setOpen(false);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-green-500 text-black p-4 rounded-full shadow-lg"
        >
          💬
        </button>
      )}

      {open && (
        <div className="bg-zinc-900 text-white w-80 p-4 rounded-xl shadow-2xl">
          <p className="mb-3 font-bold">
            👋 Olá! Eu sou o assistente do Paulo.
          </p>
          <p className="mb-4 text-sm">
            O que você deseja conhecer?
          </p>

          <div className="flex flex-col gap-2">
            <button onClick={() => goTo("/projetos")} className="bg-green-500 p-2 rounded">
              🔐 Projetos de Cybersegurança
            </button>

            <button onClick={() => goTo("/projetos")} className="bg-green-500 p-2 rounded">
              📊 Projetos de Análise de Dados
            </button>

            <button onClick={() => goTo("/projetos")} className="bg-green-500 p-2 rounded">
              💻 Projetos Web
            </button>

            <button onClick={() => goTo("/curriculo")} className="bg-green-500 p-2 rounded">
              📄 Ver currículo
            </button>

            <button onClick={() => goTo("/contato")} className="bg-green-500 p-2 rounded">
              📬 Contato
            </button>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="mt-4 text-red-400 text-sm"
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  );
}