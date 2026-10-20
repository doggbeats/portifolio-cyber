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
              Sou profissional de TI e atuo na área de tecnologia há mais de 10 anos, com experiência em Suporte Técnico, NOC, Monitoramento e Desenvolvimento Web.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-right" delay={200}>
            <p className="text-white">
              Minha trajetória combina resolução de problemas, análise técnica e desenvolvimento de soluções digitais, buscando sempre entregar resultados eficientes e funcionais.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-right" delay={300}>
            <p className="text-white">
              Utilizo ferramentas de IA Generativa, como ChatGPT, Claude e OpenCode, como apoio ao desenvolvimento, debugging, aprendizado e otimização de soluções.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-right" delay={400}>
            <p className="text-white">
              Estou constantemente aprimorando meus conhecimentos e acompanhando a evolução das tecnologias para transformar desafios em soluções modernas, eficientes e funcionais.
            </p>
          </AnimateOnScroll>


</div>


      </div>
    </section>
  );
};

export default Servicos;
