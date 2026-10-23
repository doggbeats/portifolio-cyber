// MEUS PROJETOS CRIADOS
import ProjetoCard from "./ProjetosCards";
import AnimateOnScroll from "./AnimateOnScroll";

interface Projeto {
  titulo: string;
  descricao: string;
  videoSrc?: string;
  imagemSrc?: string;
  posterSrc?: string;
  link: string;
}

const projetos: Projeto[] = [
  
  {
    titulo: "Verificador de Links com Análise de Segurança",
    descricao: "Aplicação para análise de URLs e identificação de possíveis ameaças, como phishing e sites maliciosos. Desenvolvida com Python, FastAPI, Next.js, Tailwind CSS e Google Safe Browsing API.",
    imagemSrc: "/images/verificar_links.png",
    link: "https://verificar-links.vercel.app/",
  },
  {
    titulo: "E-commerce VIZION Store",
    descricao: "E-commerce de moda masculina desenvolvido com Next.js, React, TypeScript e Tailwind CSS, com catálogo, categorias, navegação responsiva, painel administrativo e dashboard para gerenciamento de clientes, pedidos, compras e estoque.",
    imagemSrc: "/images/loja-vizion.png",
    link: "https://vizion-leads.vercel.app/"
  },

    {
   titulo: "Buffet sr e sra gourmet",
    descricao: "Sr e Sra Gourmet | Buffet de alta gastronomia, especializado em eventos corporativos e sociais.",
    imagemSrc: "/images/Gourmet.jpg",
    link: "https://sresragourmet.vercel.app/"
  },
    {
   titulo: "CODE_PH - Assistencia Técnica e Suporte em Informática",
    descricao: "CODE_PH | Assistência técnica e suporte em informática, com foco em soluções eficientes e confiáveis.",
    imagemSrc: "/images/Code_ph_assistencia.jpg",
    link: "https://asssistenciaph.vercel.app/"
  },

   {
    titulo: "PDV - sistema de ponto de venda",
    descricao: "Sistema de ponto de venda desenvolvido com React e Node.js, com funcionalidades para gerenciamento de produtos, vendas e relatórios.",
    imagemSrc: "/images/pdv.jpg", 
    link: "https://pdv-vendas-balcao.vercel.app/",
  },
  {
    titulo: "Catalogo de Produto +  finalização via whatsapp",
    descricao: "Sistema de catálogo de produtos desenvolvido com React e Node.js, com funcionalidades para gerenciamento de produtos, vendas e finalização de pedidos via WhatsApp.",
    imagemSrc: "/images/catalogo-tenis.jpg", 
    link: "https://catalago-whatsapp.vercel.app/",
  },
];

export default function Projetos() {
  return (
    <div id="Projetos" className="grid auto-rows-fr grid-cols-1 md:grid-cols-3 gap-6">
      {projetos.map((proj, index) => (
        <AnimateOnScroll key={index} animation="fade-up" delay={Math.min(index * 150, 600)} className="h-full">
          <ProjetoCard
            titulo={proj.titulo}
            descricao={proj.descricao}
            videoSrc={proj.videoSrc}
            imagemSrc={proj.imagemSrc}
            posterSrc={proj.posterSrc}
            link={proj.link}
          />
        </AnimateOnScroll>
      ))}
    </div>
  
  );
}
