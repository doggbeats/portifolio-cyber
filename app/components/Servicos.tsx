/* SOBRE MIM*/

import Image from "next/image";

const Servicos = () => {
  return (
    <section className="py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

        {/* Coluna da Esquerda: Foto maior */}
        <div className="lg:col-span-4 flex justify-center">
        <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden hidden lg:block">
          <Image
            src="/minha-foto.png"
            alt="Minha Foto"
            fill
            className="object-cover"
          />
        </div>

        </div>

        {/* Coluna da Direita: Texto de Introdução */}
        <div className="lg:col-span-8 space-y-6">
 <h2 className="text-4xl font-semibold leading-tight">
  Sobre Mim
</h2>

<p className="text-white">
  Olá! Meu nome é Paulo Henrique, sou profissional de tecnologia com foco em Desenvolvimento Web e criação de aplicações modernas.
</p>

<p className="text-white">
  Tenho experiência com Next.js, React, TypeScript, JavaScript, Tailwind CSS, Python, SQL e integração de APIs, além de Git/GitHub e deploy em produção.
</p>

<p className="text-white">
  Também utilizo IA Generativa e ferramentas como OpenCode como apoio ao desenvolvimento, debugging, otimização de código e aprendizado contínuo.
</p>

<p className="text-white">
  Minha experiência em NOC contribui para uma visão estruturada de troubleshooting, análise de logs e resolução de problemas. Busco transformar conhecimento em aplicações funcionais, responsivas e de qualidade.
</p>
</div>


      </div>
    </section>
  );
};

export default Servicos;

