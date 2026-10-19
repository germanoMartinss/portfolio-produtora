"use client";

import { useRef, useState } from "react";
import { FeaturedVideo } from "@/types/project";
import VideoCard from "@/components/project/VideoCard";
import VideoLightbox from "@/components/project/VideoLightbox";

interface VideoGalleryProps {
  videos: FeaturedVideo[];
  // Classes do grid (colunas/espaçamento), que variam entre as seções.
  className: string;
  // "sizes" das thumbnails (ver VideoCard).
  sizes: string;
}

// Ilha de interatividade das seções de vídeo (FeaturedVideos e
// BehindTheScenes): só o grid de cards + o modal precisam de estado no
// navegador; o cabeçalho da seção continua sendo renderizado no servidor.
export default function VideoGallery({ videos, className, sizes }: VideoGalleryProps) {
  // Guarda qual vídeo está "aberto" no momento (null = nenhum, modal fechado).
  const [activeVideo, setActiveVideo] = useState<FeaturedVideo | null>(null);
  // Botão do card que abriu o modal (o foco volta para ele ao fechar).
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  function openVideo(video: FeaturedVideo, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setActiveVideo(video);
  }

  return (
    <>
      <div className={className}>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} onOpen={openVideo} sizes={sizes} />
        ))}
      </div>

      {/* O modal só é renderizado quando há um vídeo ativo. */}
      {activeVideo && (
        <VideoLightbox
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
          returnFocusRef={triggerRef}
        />
      )}
    </>
  );
}
