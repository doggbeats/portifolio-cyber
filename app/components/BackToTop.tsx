"use client";

import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao início"
      title="Voltar ao início"
      className="fixed bottom-24 right-6 z-[100] p-3.5 rounded-full border border-[#a5c9ff]/40 bg-black/40 backdrop-blur-md text-white hover:bg-[#a5c9ff] hover:text-black transition-all duration-300"
    >
      <ArrowUp size={22} />
    </button>
  );
}
