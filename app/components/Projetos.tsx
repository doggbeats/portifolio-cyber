// MEUS PROJETOS CRIADOS
import ProjetoCard from "./ProjetosCards";

const projetos = [
  {
    titulo: "Analisador de Logs com Python",
    descricao: "Criei um pequeno projeto em Python para simular o monitoramento de logs em sistemas críticos. O objetivo era entender como eventos de sistemas reais geram alertas e praticar automação de tarefas..",
    videoSrc: "/videos/analise-logs.mp4",
    link: "https://colab.research.google.com/drive/SEU_ID_AQUI", // link do Google Colab
  },
  {
    titulo: "Analise de Dados com Python usando pandas",
    descricao: "Análise de dados usando a biblioteca pandas e matplotlib.pyplot, obejtivo é analisar quantidade de mortes por estados.",
    imagemSrc: "/images/analise-dados.png", 
    link: "https://colab.research.google.com/drive/1ZC-sOWrHexxQo2fCOyz-gWwK236iXhuP",
  },
  {
    titulo: "Verificador de Links com Análise de Segurança",
    descricao: "Aplicação para análise de URLs e identificação de possíveis ameaças, como phishing e sites maliciosos. Desenvolvida com Python, FastAPI, Next.js, Tailwind CSS e Google Safe Browsing API.",
    imagemSrc: "/images/verificar_links.png",
    link: "https://verificar-links.vercel.app/",
    
  },
  {
    titulo: "E-commerce VIZION Store",
    descricao: "Aplicação de e-commerce de moda masculina desenvolvida com Next.js, React, TypeScript e Tailwind CSS, com catálogo de produtos, categorias, navegação responsiva e integração com Git/GitHub.",
    imagemSrc: "/images/loja-vizion.png",
    link: "https://vizion-leads.vercel.app/"
    
  },
];

export default function Projetos() {
  return (
    <div id="Projetos" className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projetos.map((proj, index) => (
        <ProjetoCard
          key={index}
          titulo={proj.titulo}
          descricao={proj.descricao}
          videoSrc={proj.videoSrc}     // envia o vídeo
          imagemSrc={proj.imagemSrc}   // envia a imagem
          link={proj.link}             // envia o link
        />
      ))}
    </div>
  
  );
}
