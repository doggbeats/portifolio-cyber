/* Pagina inicial  */

import Navbar from "./Navbar";
import Image from "next/image";
import { Github, Linkedin, MessageCircle } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const Hero = () => {
  return (
    <section className="relative pb-16 pt-2 md:py-24">
  <Navbar />

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center mt-8 md:mt-10">
    {/* Lado esquerdo: Texto */}
    <div className="space-y-7 md:space-y-8 min-w-0">
      <AnimateOnScroll animation="fade-up" threshold={0.1}>
        <h1 className="text-[clamp(2.25rem,13vw,4.5rem)] sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight hover:text-[#a5c9ff]">
          Paulo <br />
          <span className="text-[#a5c9ff]">Henrique</span>
        </h1>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" delay={200} threshold={0.1}>
        <p className="text-white text-base sm:text-lg max-w-md leading-relaxed text-left md:text-justify transition-colors hover:text-white">
          Olá! Sou Paulo Henrique, profissional de Tecnologia da Informação com mais de 12 anos de experiência em Suporte Técnico, NOC e Monitoramento de Sistemas, além de atuação no desenvolvimento web.
          <br />
          <br />
          Meu foco é unir conhecimento técnico, pensamento analítico e tecnologia para criar soluções digitais funcionais, automatizar processos e resolver problemas reais. Estou sempre em busca de novos conhecimentos e oportunidades para desenvolver projetos que conectem inovação, eficiência e resultados.
        </p>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" delay={400} threshold={0.1}>
        <div className="flex items-center gap-3">
          <a href="https://github.com/doggbeats" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white hover:border-white hover:text-white transition">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/paulo-heenrique1990/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white hover:border-[#0077b5] hover:text-[#0077b5] transition">
            <Linkedin size={20} />
          </a>
          <a href="https://wa.me/5561992890326" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white hover:border-[#25d366] hover:text-[#25d366] transition">
            <MessageCircle size={20} />
          </a>
        </div>
      </AnimateOnScroll>
    </div>

    {/* Lado direito: Foto */}
    <AnimateOnScroll animation="scale-in" delay={300} threshold={0.1} className="hidden lg:flex justify-center -mt-12">
      <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden hover:scale-105 transition-transform duration-500">
        <Image src="/foto1.png" alt="Paulo Henrique" fill priority className="object-contain" />
      </div>
    </AnimateOnScroll>
  </div>
  
</section>



  );
};

export default Hero;
