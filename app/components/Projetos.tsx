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
    imagemSrc: "/images/analise-dados.png", // coloque a imagem em public/images
    link: "https://colab.research.google.com/drive/1ZC-sOWrHexxQo2fCOyz-gWwK236iXhuP",
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
