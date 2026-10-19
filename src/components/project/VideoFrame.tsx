import Image from "next/image";
import { FeaturedVideo } from "@/types/project";

// Imagem que representa um vídeo: o frame próprio em alta, se houver
// (imageUrl), ou a thumbnail da plataforma.
export function frameSrc(video: FeaturedVideo) {
  return video.imageUrl ?? video.thumbnailUrl;
}

interface VideoFrameProps {
  video: FeaturedVideo;
  // "sizes" do next/image: a largura real do quadro em cada tela.
  sizes: string;
  // Toca o loop curto (loopUrl) por cima do frame. Quem usa decide quando
  // (vídeo em destaque, sem "reduzir movimento"). O <video> só é montado
  // nesse momento — até lá nada do MP4 é baixado.
  playLoop?: boolean;
}

// Mídia de um vídeo dentro de um quadro (o pai define proporção, posição e
// overflow-hidden). Usada pela tela/cartões de Trabalhos, pelo mosaico de
// Bastidores e pelo trailer. Decorativa (alt=""): o título do vídeo está
// sempre no texto ao lado. Cantos retos, como todas as mídias do site.
export default function VideoFrame({ video, sizes, playLoop = false }: VideoFrameProps) {
  return (
    <>
      {/* object-cover em 16:9: corta as tarjas pretas das thumbnails 4:3 do
          YouTube (sddefault). */}
      <Image src={frameSrc(video)} alt="" fill sizes={sizes} className="object-cover" />
      {video.loopUrl && playLoop && (
        <video
          src={video.loopUrl}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </>
  );
}
