/* Pagina inicial  */


import Navbar from "./Navbar"; // Sempre relativo à pasta
import Image from "next/image";
import { Github, Linkedin, MessageCircle } from "lucide-react";

const Hero = () => {
  return (
    <section id="me" className="py-16 md:py-24 relative">
  <Navbar /> {/* Navbar transparente com menu hamburger */}

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-10">
    {/* Lado esquerdo: Texto */}
    <div className="space-y-8">
      <h1 className="text-4xl md:text-8xl font-bold leading-[1.05] tracking-tight hover:text-[#a5c9ff]">
        Paulo <br />
        <span className="text-[#a5c9ff]">Henrique</span>
      </h1>

      <p className="text-white text-xl max-w-md leading-relaxed transition-colors hover:text-white">
Desenvolvedor Web focado em aplicações modernas, integração de APIs e soluções com Next.js, React, TypeScript, Python e SQL, utilizando IA Generativa como apoio ao desenvolvimento.
      </p>
       {/* Ícones sociais */}
      <div className="flex items-center gap-5">
        <a href="https://github.com/doggbeats" target="_blank" className="text-white hover:text-white transition">
          <Github size={22} />
        </a>
        <a href="https://www.linkedin.com/in/paulo-heenrique1990/" target="_blank" className="text-white hover:text-[#0077b5] transition">
          <Linkedin size={22} />
        </a>
        <a href="https://wa.me/55SEUNUMERO" target="_blank" className="text-white hover:text-[#25d366] transition">
          <MessageCircle size={22} />
        </a>
      </div>
    </div>

    {/* Lado direito: Foto */}
    <div className="flex justify-center -mt-12">
      <div className="relative">
        {/* Anel de brilho atrás da foto */}
        <div className="absolute inset-0 -m-4 rounded-full bg-[#a5c9ff]/20 blur-3xl" />
        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#a5c9ff] via-white/30 to-[#a5c9ff] blur-sm opacity-60" />

        <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[#a5c9ff] shadow-[0_0_40px_rgba(165,201,255,0.4)] hover:border-white hover:shadow-[0_0_60px_rgba(165,201,255,0.7)] transition-all duration-500">
          <Image src="/minha-foto.png" alt="Paulo Henrique" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-40" />
        </div>
      </div>
    </div>
  </div>
  
</section>



  );
};

export default Hero;

