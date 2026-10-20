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

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao início"
      className={`fixed bottom-24 right-6 z-50 p-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-[#a5c9ff] hover:text-black transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 pointer-events-none translate-y-2"
      }`}
    >
      <ArrowUp size={20} />
    </button>
  );
}
