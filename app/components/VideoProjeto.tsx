// app/components/VideoProjeto.tsx
interface VideoProjetoProps {
  src: string;
}

export default function VideoProjeto({ src }: VideoProjetoProps) {
  return (
    <video
      src={src}          // aqui você passa apenas a prop
      controls           // adiciona controles de play/pause
      className="rounded-lg w-full h-auto"
      autoPlay={false}   // false para não iniciar sozinho
      loop
      muted
    >
      Seu navegador não suporta o elemento <code>video</code>.
    </video>
  );
}
