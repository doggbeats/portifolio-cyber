import Image from "next/image";
import VideoProjeto from "./VideoProjeto";

interface ProjetoCardProps {
  titulo: string;
  descricao: string;
  videoSrc?: string;
  imagemSrc?: string;
  posterSrc?: string;
  link?: string;
}

export default function ProjetoCard({ titulo, descricao, videoSrc, imagemSrc, posterSrc, link }: ProjetoCardProps) {
  return (
    <div className="flex h-full flex-col bg-black/30 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 backdrop-blur-sm">
      <h3 className="mb-4 text-xl font-bold line-clamp-2 min-h-[3.5rem]">{titulo}</h3>

      {videoSrc && (
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <VideoProjeto src={videoSrc} poster={posterSrc} />
        </div>
      )}
      {imagemSrc && (
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={imagemSrc}
            alt={titulo}
            width={500}
            height={300}
            className="h-full w-full object-cover object-top"
          />
        </div>
      )}

      <p className="mt-4 flex-1 text-white line-clamp-4">{descricao}</p>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-semibold text-[#a5c9ff] hover:underline"
        >
          Ver Projeto
        </a>
      )}
    </div>
  );
}

