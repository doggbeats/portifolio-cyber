import { Github, Linkedin } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

export default function Contact() {
  return (
    <section className="py-20 text-center border-t border-yellow-500/20">
      <AnimateOnScroll animation="fade-up">
        <h2 className="text-4xl font-bold mb-6">Contato</h2>
      </AnimateOnScroll>
      <AnimateOnScroll animation="fade-up" delay={200}>
        <p>Email: paulo.analise90@gmail.com</p>
      </AnimateOnScroll>
      <AnimateOnScroll animation="fade-up" delay={400}>
        <p>(61) 99289- 0326</p>
      </AnimateOnScroll>
      <AnimateOnScroll animation="fade-up" delay={600}>
        <div className="flex items-center justify-center gap-6 mt-6">
          <a href="https://github.com/doggbeats" target="_blank" className="text-white hover:text-[#a5c9ff] transition-colors duration-300">
            <Github size={28} />
          </a>
          <a href="https://www.linkedin.com/in/paulo-heenrique1990/" target="_blank" className="text-white hover:text-[#0077b5] transition-colors duration-300">
            <Linkedin size={28} />
          </a>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
