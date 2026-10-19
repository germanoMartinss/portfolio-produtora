"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FeaturedVideo } from "@/types/project";

// Trailer em largura total, 16:9, com carregamento sob demanda: até o
// clique só existe a imagem (nada do Vimeo é baixado); ao clicar, o iframe
// entra no mesmo lugar, já tocando — sem lightbox.
// Estrutura acessível igual à dos outros vídeos: título em <h3> com o
// <button> dentro, esticado sobre a imagem inteira. Ao trocar pelo player,
// o foco vai para o iframe (o botão some, e o foco não pode se perder).
export default function TrailerPlayer({ video }: { video: FeaturedVideo }) {
  const [playing, setPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (playing) iframeRef.current?.focus();
  }, [playing]);

  if (playing) {
    // autoplay=1 preservando o "?dnt=1" (Vimeo sem rastreamento).
    const src = new URL(video.embedUrl);
    src.searchParams.set("autoplay", "1");
    return (
      <div className="relative col-span-full aspect-video bg-black">
        <iframe
          ref={iframeRef}
          src={src.toString()}
          title={`${video.title} — ${video.badge ?? "Trailer"}`}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <article
      data-cursor="play"
      className="group relative col-span-full aspect-video overflow-hidden bg-black text-white"
    >
      {/* Decorativa (alt=""): o título já identifica o trailer. O quadro
          do Vimeo vem com tarjas pretas (filme widescreen dentro de 16:9):
          a escala de 1,1 as corta. */}
      <Image
        src={video.thumbnailUrl}
        alt=""
        fill
        sizes="100vw"
        className="scale-[1.1] object-cover transition-transform duration-(--dur-slow) ease-cine group-hover:scale-[1.13]"
      />
      {/* Gradiente inferior para a leitura do título. */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-[var(--grid-gap)] sm:p-gutter">
        <div className="flex flex-col gap-2">
          {/* Azul claro: o azul padrão não tem contraste sobre o escuro. */}
          <p className="text-label font-medium uppercase tracking-credits text-accent-on-dark">
            {video.badge}
          </p>
          {/* Menor no celular: o quadro 16:9 tem ~180px de altura em 375px. */}
          <h3 className="font-serif text-title sm:text-section">
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-4 focus-visible:after:outline-white"
            >
              <span className="sr-only">Assistir trailer: </span>
              {video.title}
            </button>
          </h3>
        </div>
        {/* "Play" visível no toque (com mouse, o cursor customizado já vira
            "Play" sobre a imagem). Só visual: o clique é no <button>. */}
        <span
          aria-hidden="true"
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-label font-medium uppercase tracking-credits text-black can-hover:hidden"
        >
          Play
        </span>
      </div>
    </article>
  );
}
