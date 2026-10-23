"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [

  { label: "Me", href: "#servicos" },
  { label: "Skills", href: "#processo" },
  { label: "Projects", href: "#projetos" },
  { label: "Experience", href: "#experiencia" },
  { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="flex justify-between items-center py-6 px-4 md:px-12 text-white relative z-50 animate-fade-down">
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
        <button className="border border-white/20 px-5 py-2 rounded-full text-sm hover:bg-white hover:text-black transition-all duration-300">
          Currículo
        </button>
      </a>

      {/* Hamburger Mobile */}
      <div className="md:hidden ml-auto">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Lateral Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-64
          bg-white/10 backdrop-blur-md flex flex-col items-center gap-6
          md:hidden transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="w-full flex items-center justify-end px-4 py-6">
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Fechar menu"
            className="p-1 hover:text-[#a5c9ff] transition-colors duration-300"
          >
            <X size={24} />
          </button>
        </div>

        {links.map((link, index) => (
          <a
            key={link.href}
            href={link.href}
            className={`text-white hover:text-[#a5c9ff] transition-colors duration-300 text-xl ${isOpen ? "animate-fade-right" : ""}`}
            style={isOpen ? { animationDelay: `${index * 70}ms` } : undefined}
            onClick={() => setIsOpen(false)} // fecha menu ao clicar
          >
            {link.label}
          </a>
        ))}

        <a
          href="/Curriculo_atualizado2026.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="border border-white/20 px-5 py-2 rounded-full text-sm hover:bg-[#a5c9ff] hover:text-black transition-all duration-300">
            Currículo
          </button>
        </a>
      </div>
      
    </nav>
  );
};

export default Navbar;
