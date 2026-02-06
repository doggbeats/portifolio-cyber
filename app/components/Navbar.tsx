"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Me", href: "#me" },
    { label: "Projetos", href: "#projetos" },
    { label: "Habilidades", href: "#habilidades" },
  ];

  return (
    <nav className="flex justify-between items-center py-6 px-4 md:px-12 text-white relative z-50">
      {/* Logo */}
      <div className="font-bold text-xl">Code_PH</div>

      {/* Links Desktop */}
      <div className="hidden md:flex gap-8 text-lg">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hover:text-[#a5c9ff] transition-colors duration-300"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Botão Currículo Desktop */}
      <a
        href="/curriculo_2026.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:block"
      >
        <button className="border border-white/20 px-5 py-2 rounded-full text-sm hover:bg-white hover:text-black transition-all duration-300">
          Currículo
        </button>
      </a>

      {/* Hamburger Mobile */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Lateral Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-64
          bg-white/10 backdrop-blur-md flex flex-col items-center gap-6 py-12
          md:hidden transition-transform duration-[1000ms] ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-white hover:text-[#a5c9ff] transition-colors duration-300 text-xl"
            onClick={() => setIsOpen(false)} // fecha menu ao clicar
          >
            {link.label}
          </a>
        ))}

        <a
          href="/curriculo_2026.pdf"
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
