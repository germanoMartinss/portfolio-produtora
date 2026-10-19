"use client";

import { useEffect, useRef } from "react";

// Formata segundos como timecode de câmera: 00:00:12.
function timecode(seconds: number) {
  const s = Math.floor(seconds);
  return [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
}

// Vídeo de fundo do Hero (ilha client) + o "REC ● 00:00:12" de câmera, que
// mostra o tempo real do vídeo (volta a zero a cada loop).
// Decorativos (aria-hidden): o nome sobreposto é o conteúdo da seção. Mudo,
// em loop e sem controles, a pedido da cliente — mas, se o visitante pede
// "reduzir movimento" no sistema, o vídeo fica pausado no primeiro quadro
// (e o timecode parado em 00:00:00).
export default function HeroVideo({ src, className }: { src: string; className: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    function sync() {
      if (!video) return;
      if (query.matches) video.pause();
      else void video.play().catch(() => {});
    }

    // timeupdate dispara ~4x por segundo: suficiente para um relógio em
    // segundos. Escreve direto no DOM, sem re-render do React.
    function tick() {
      if (video && timeRef.current) timeRef.current.textContent = timecode(video.currentTime);
    }

    sync();
    query.addEventListener("change", sync);
    video.addEventListener("timeupdate", tick);
    return () => {
      query.removeEventListener("change", sync);
      video.removeEventListener("timeupdate", tick);
    };
  }, []);

  return (
    <>
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
      {/* Canto superior direito, logo abaixo do Header. O ponto usa o azul
          claro (o azul padrão some sobre o vídeo escuro). */}
      <div
        aria-hidden="true"
        className="absolute right-gutter top-[calc(var(--gutter)+3rem)] flex items-center gap-2 text-label font-medium uppercase tracking-credits text-white tabular-nums"
      >
        <span>Rec</span>
        <span className="rec-dot h-2 w-2 rounded-full bg-accent-on-dark" />
        <span ref={timeRef}>00:00:00</span>
      </div>
    </>
  );
}
