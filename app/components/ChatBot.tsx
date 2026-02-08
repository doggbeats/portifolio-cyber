"use client";

import { useState, useEffect } from "react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 800);
  }, []);

  function goTo(id: string) {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
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
            <button onClick={() => goTo("me")} className="bg-green-500 p-2 rounded">
              😎 Sobre mim
            </button>

            <button onClick={() => goTo("servicos")} className="bg-green-500 p-2 rounded">
              🛠️ Serviços
            </button>

            <button onClick={() => goTo("processo")} className="bg-green-500 p-2 rounded">
              📊 Habilidades
            </button>

            <button onClick={() => goTo("projetos")} className="bg-green-500 p-2 rounded">
              🚀 Projetos
            </button>

            <button onClick={() => goTo("contact")} className="bg-green-500 p-2 rounded">
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