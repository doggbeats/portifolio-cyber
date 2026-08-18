/* SOBRE MIM*/

import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";

const Servicos = () => {
  return (
    <section className="py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

        {/* Coluna da Esquerda: Foto maior */}
        <AnimateOnScroll animation="fade-left" className="lg:col-span-4 flex justify-center">
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden hidden lg:block hover:scale-105 transition-transform duration-500">
          <Image
            src="/minha-foto1.png"
            alt="Minha Foto"
            fill
            className="object-contain"
          />
        </div>
        </AnimateOnScroll>

        {/* Coluna da Direita: Texto de Introdução */}
        <div className="lg:col-span-8 space-y-6">
          <AnimateOnScroll animation="fade-right">
            <h2 className="text-4xl font-semibold leading-tight">
              Sobre Mim
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-right" delay={100}>
            <p className="text-white">
              Olá! Meu nome é Paulo Henrique, sou profissional de tecnologia com foco em Desenvolvimento Web e criação de aplicações modernas.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-right" delay={200}>
            <p className="text-white">
              Tenho experiência com Next.js, React, TypeScript, JavaScript, Tailwind CSS, Python, SQL e integração de APIs, além de Git/GitHub e deploy em produção.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-right" delay={300}>
            <p className="text-white">
              Também utilizo IA Generativa e ferramentas como OpenCode como apoio ao desenvolvimento, debugging, otimização de código e aprendizado contínuo.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-right" delay={400}>
            <p className="text-white">
              Minha experiência em NOC contribui para uma visão estruturada de troubleshooting, análise de logs e resolução de problemas. Busco transformar conhecimento em aplicações funcionais, responsivas e de qualidade.
            </p>
          </AnimateOnScroll>
</div>


      </div>
    </section>
  );
};

export default Servicos;
