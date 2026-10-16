"use client";

import { useEffect, useRef } from "react";

// Vídeo de fundo do Hero (ilha client). Decorativo (aria-hidden): o nome
// sobreposto é o conteúdo da seção. Mudo, em loop e sem controles, a
// pedido da cliente — mas, se o visitante pede "reduzir movimento" no
// sistema, o vídeo fica pausado no primeiro quadro.
export default function HeroVideo({ src, className }: { src: string; className: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    function sync() {
      if (!video) return;
      if (query.matches) video.pause();
      else void video.play().catch(() => {});
    }

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      className={className}
    />
  );
}
