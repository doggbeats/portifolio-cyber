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
  <p className="text-gray-400">
    Olá! Meu nome é Paulo Henrique, sou profissional de tecnologia com foco em Segurança da Informação, análise de dados e automação com Python.
  </p>
  <p className="text-gray-400">
    Ao longo da minha trajetória, trabalhei com monitoramento de sistemas, análise de logs e suporte técnico, sempre buscando soluções eficientes e inovadoras.
  </p>
  <p className="text-gray-400">
    Atualmente, estou criando projetos que unem tecnologia, dados e proteção de sistemas, explorando ferramentas modernas como Python, Next.js e ambientes de Cloud.
  </p>
  <p className="text-gray-400">
    Meu objetivo é transformar conhecimento em resultados reais, mantendo alto padrão de segurança e qualidade em cada projeto que desenvolvo.
  </p>
</div>


      </div>
    </section>
  );
};

export default Servicos;
