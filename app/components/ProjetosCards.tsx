import Image from "next/image";
import VideoProjeto from "./VideoProjeto";

interface ProjetoCardProps {
  titulo: string;
  descricao: string;
  videoSrc?: string;
  imagemSrc?: string;
  link?: string;
}

export default function ProjetoCard({ titulo, descricao, videoSrc, imagemSrc, link }: ProjetoCardProps) {
  return (
    <div className="bg-zinc-900 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
      <h3 className="text-xl font-bold mb-4">{titulo}</h3>

      {/* Mostra vídeo ou imagem dependendo do que tiver */}
      {videoSrc && <VideoProjeto src={videoSrc} />}
      {imagemSrc && (
        <Image
          src={imagemSrc}
          alt={titulo}
          width={500}
          height={300}
          className="rounded-lg w-full h-auto object-cover"
        />
      )}

      <p className="mt-4 text-zinc-400">{descricao}</p>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-semibold text-[#a5c9ff] hover:underline"
        >
          Ver no Colab
        </a>
      )}
    </div>
  );
}
