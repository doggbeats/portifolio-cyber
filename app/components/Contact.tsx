import { Github, Linkedin } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

export default function Contact() {
  return (
    <section className="py-16 md:py-20 text-center border-t border-white/10">
      <AnimateOnScroll animation="fade-up">
        <h2 className="text-3xl sm:text-4xl font-bold mb-5 sm:mb-6">Contato</h2>
      </AnimateOnScroll>
      <AnimateOnScroll animation="fade-up" delay={200}>
        <p className="text-white text-sm sm:text-base px-2">
          Email:{" "}
          <a href="mailto:paulo.analise90@gmail.com" className="break-all hover:text-[#a5c9ff] transition-colors">
            paulo.analise90@gmail.com
          </a>
        </p>
      </AnimateOnScroll>
      <AnimateOnScroll animation="fade-up" delay={400}>
        <p className="text-white text-sm sm:text-base mt-1">
          <a href="tel:+5561992890326" className="hover:text-[#a5c9ff] transition-colors">
            (61) 99289-0326
          </a>
        </p>
      </AnimateOnScroll>
      <AnimateOnScroll animation="fade-up" delay={600}>
        <div className="flex items-center justify-center gap-6 mt-6">
          <a href="https://github.com/doggbeats" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white hover:border-white hover:text-[#a5c9ff] transition-colors duration-300">
            <Github size={24} />
          </a>
          <a href="https://www.linkedin.com/in/paulo-heenrique1990/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white hover:border-[#0077b5] hover:text-[#0077b5] transition-colors duration-300">
            <Linkedin size={24} />
          </a>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
