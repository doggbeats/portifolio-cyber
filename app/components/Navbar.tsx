"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Me", href: "#me" },
  { label: "Skills", href: "#processo" },
  { label: "Projects", href: "#projetos" },
  { label: "Experience", href: "#experiencia" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Trava o scroll do fundo enquanto o menu mobile está aberto.
  useEffect(() => {
    if (!isOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  // Fecha o menu se a tela crescer para o layout desktop.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (query.matches) setIsOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <nav className="relative z-50 flex items-center justify-between py-5 text-white animate-fade-down">
        {/* Links Desktop */}
        <div className="hidden md:flex gap-8 text-lg">
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="animate-fade-down hover:text-[#a5c9ff] transition-colors duration-300"
              style={{ animationDelay: `${100 + index * 80}ms` }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Botão Currículo Desktop */}
        <a
          href="/Curriculo_atualizado2026.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block animate-fade-down"
          style={{ animationDelay: "500ms" }}
        >
          <span className="inline-block border border-white/20 px-5 py-2 rounded-full text-sm hover:bg-white hover:text-black transition-all duration-300">
            Currículo
          </span>
        </a>

        {/* Hamburger Mobile */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="md:hidden ml-auto -mr-2 flex h-11 w-11 items-center justify-center rounded-lg hover:text-[#a5c9ff] transition-colors"
        >
          <Menu size={26} />
        </button>
      </nav>

      {/* O menu fica fora do <nav> de propósito: a animação do nav cria um
          transform que prende elementos "fixed" dentro dele, o que quebrava
          a largura da página no mobile. */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true" aria-label="Menu de navegação">
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 h-full w-full bg-black/60 backdrop-blur-sm animate-fade-in"
          />

          <aside
            id="mobile-menu"
            className="absolute right-0 top-0 flex h-screen h-dvh w-[min(20rem,85vw)] flex-col border-l border-white/10 bg-[#0a0a0a]/95 px-6 py-5 shadow-2xl backdrop-blur-md animate-fade-right"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm tracking-[0.3em] text-white/40">MENU</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar menu"
                className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-white hover:text-[#a5c9ff] transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-2 py-3 text-lg text-white hover:bg-white/5 hover:text-[#a5c9ff] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href="/Curriculo_atualizado2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-auto"
            >
              <span className="flex w-full items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm transition-all duration-300 hover:bg-[#a5c9ff] hover:text-black">
                Ver currículo
              </span>
            </a>
          </aside>
        </div>
      )}
    </>
  );
};

export default Navbar;
