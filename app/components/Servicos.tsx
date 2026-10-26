/* SOBRE MIM*/

import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";

const Servicos = () => {
  return (
    <section className="py-14 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">

        {/* Coluna da Esquerda: Foto maior */}
        <AnimateOnScroll animation="fade-left" className="lg:col-span-4 flex justify-center">
        <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden hover:scale-105 transition-transform duration-500">
          <Image
            src="/foto1.png"
            alt="Minha Foto"
            fill
            sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, 320px"
            className="object-contain"
          />
        </div>
        </AnimateOnScroll>

        {/* Coluna da Direita: Texto de Introdução */}
        <div className="lg:col-span-8 space-y-5 md:space-y-6">
          <AnimateOnScroll animation="fade-right">
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
              Sobre Mim
            </h2>
          </AnimateOnScroll>

    
          <AnimateOnScroll animation="fade-right" delay={100}>
            <p className="text-white text-sm sm:text-base leading-relaxed">
              Sou profissional de TI e atuo na área de tecnologia há mais de 10 anos, com experiência em Suporte Técnico, NOC, Monitoramento e Desenvolvimento Web.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-right" delay={200}>
            <p className="text-white text-sm sm:text-base leading-relaxed">
              Minha trajetória combina resolução de problemas, análise técnica e desenvolvimento de soluções digitais, buscando sempre entregar resultados eficientes e funcionais.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-right" delay={300}>
            <p className="text-white text-sm sm:text-base leading-relaxed">
              Utilizo ferramentas de IA Generativa, como ChatGPT, Claude e OpenCode, como apoio ao desenvolvimento, debugging, aprendizado e otimização de soluções.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-right" delay={400}>
            <p className="text-white text-sm sm:text-base leading-relaxed">
              Estou constantemente aprimorando meus conhecimentos e acompanhando a evolução das tecnologias para transformar desafios em soluções modernas, eficientes e funcionais.
            </p>
          </AnimateOnScroll>


</div>


      </div>
    </section>
  );
};

export default Servicos;
