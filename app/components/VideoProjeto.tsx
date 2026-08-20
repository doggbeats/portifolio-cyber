// app/components/VideoProjeto.tsx
interface VideoProjetoProps {
  src: string;
  poster?: string;
}

export default function VideoProjeto({ src, poster }: VideoProjetoProps) {
  return (
    <video
      src={src}
      poster={poster}
      controls
      preload="metadata"
      playsInline
      className="rounded-lg w-full h-auto"
      autoPlay={false}
      loop
      muted
    >
      Seu navegador não suporta o elemento <code>video</code>.
    </video>
  );
}
