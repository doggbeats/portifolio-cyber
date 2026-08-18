/* Pagina inicial  */

import Navbar from "./Navbar";
import Image from "next/image";
import { Github, Linkedin, MessageCircle } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const Hero = () => {
  return (
    <section id="me" className="py-16 md:py-24 relative">
  <Navbar />

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-10">
    {/* Lado esquerdo: Texto */}
    <div className="space-y-8">
      <AnimateOnScroll animation="fade-up" threshold={0.1}>
        <h1 className="text-4xl md:text-8xl font-bold leading-[1.05] tracking-tight hover:text-[#a5c9ff]">
          Paulo <br />
          <span className="text-[#a5c9ff]">Henrique</span>
        </h1>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" delay={200} threshold={0.1}>
        <p className="text-white text-xl max-w-md leading-relaxed transition-colors hover:text-white">
Desenvolvedor Web focado em aplicações modernas, integração de APIs e soluções com Next.js, React, TypeScript, Python e SQL, utilizando IA Generativa como apoio ao desenvolvimento.
        </p>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" delay={400} threshold={0.1}>
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
      </AnimateOnScroll>
    </div>

    {/* Lado direito: Foto */}
    <AnimateOnScroll animation="scale-in" delay={300} threshold={0.1} className="flex justify-center -mt-12">
      <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden hover:scale-105 transition-transform duration-500">
        <Image src="/minha-foto1.png" alt="Paulo Henrique" fill priority className="object-contain" />
      </div>
    </AnimateOnScroll>
  </div>
  
</section>



  );
};

export default Hero;
