"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao início"
      title="Voltar ao início"
      className="fixed bottom-20 right-4 z-40 p-3.5 rounded-full border border-[#a5c9ff]/40 bg-black/40 backdrop-blur-md text-white hover:bg-[#a5c9ff] hover:text-black transition-all duration-300 sm:bottom-24 sm:right-6 animate-fade-in"
    >
      <ArrowUp size={22} />
    </button>
  );
}
