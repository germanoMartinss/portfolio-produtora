"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FeaturedVideo } from "@/types/project";
import VideoFrame from "@/components/project/VideoFrame";
import VideoLightbox from "@/components/project/VideoLightbox";
import { TRANSITION, VIEWPORT } from "@/lib/motion";

// Desktop com mouse (≥ 1024px): lista + tela. Toque ou < 1024px: cartões.
const SCREEN_QUERY = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";
// "sizes" dos frames em cada modo (o lightbox recebe o mesmo, ver
// VideoLightbox.tsx): a tela ocupa 7 das 12 colunas; o cartão, a largura toda.
const SCREEN_SIZES = "(min-width: 1024px) 58vw, 100vw";
const CARD_SIZES = "100vw";

// Seção Trabalhos no padrão "lista + tela". Dois modos, escolhidos pelo tipo
// de ponteiro e pela largura (não só pela largura):
// - Lista + tela (desktop com mouse): marcas à esquerda; à direita uma tela
//   16:9 grande, sticky, que já abre com o primeiro vídeo e troca de frame
//   (crossfade só de opacidade) no hover ou no foco de cada marca. A tela é
//   a origem da transição para o player (layoutId).
// - Cartões (toque, ou tela < 1024px): cada vídeo com o seu frame 16:9 em
//   cima, marca e título embaixo — nada depende de hover.
// Em ambos, o <button> de cada marca é o controle real (teclado, leitor de
// tela); a tela só repete o clique para o mouse.
export default function WorkList({ videos }: { videos: FeaturedVideo[] }) {
  // Vídeo na tela (modo lista + tela).
  const [current, setCurrent] = useState(0);
  // Vídeo aberto no lightbox (null = fechado).
  const [open, setOpen] = useState<FeaturedVideo | null>(null);
  const [screenMode, setScreenMode] = useState(false);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const query = window.matchMedia(SCREEN_QUERY);
    const sync = () => setScreenMode(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  function openVideo(index: number) {
    // O foco volta para o botão da marca ao fechar (mesmo se o clique foi
    // na tela).
    triggerRef.current = buttons.current[index];
    setCurrent(index);
    setOpen(videos[index]);
  }

  return (
    <>
      <div className="col-span-full grid grid-cols-subgrid gap-y-12">
        <ol className="col-span-full flex flex-col gap-12 can-hover:lg:col-span-5 can-hover:lg:gap-0 can-hover:lg:border-b can-hover:lg:border-line">
          {videos.map((video, index) => {
            const isCurrent = index === current;
            return (
              <motion.li
                key={video.id}
                data-cursor="play"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ ...TRANSITION.base, delay: index * 0.08 }}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setCurrent(index);
                }}
                // Na lista, a marca fora da tela fica cinza (#6b6b6b, passa
                // no AA); nos cartões, tudo em preto.
                className={`group relative flex flex-col gap-5 can-hover:lg:border-t can-hover:lg:border-line can-hover:lg:py-7 ${
                  isCurrent ? "" : "can-hover:lg:text-muted"
                }`}
              >
                {/* Frame do cartão (some no modo lista + tela, onde quem
                    mostra o vídeo é a tela). Lazy: escondido, nem é baixado. */}
                <motion.div
                  layoutId={screenMode ? undefined : `work-${video.id}`}
                  className="relative aspect-video overflow-hidden bg-black can-hover:lg:hidden"
                >
                  <VideoFrame video={video} sizes={CARD_SIZES} />
                  {/* "Play" visível no toque (com mouse, o cursor já vira
                      "Play"). Só visual: o clique é no <button>. */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-3 right-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-label font-medium uppercase tracking-credits text-black can-hover:hidden"
                  >
                    Play
                  </span>
                </motion.div>

                {/* Marca, título do vídeo e "Assistir" juntos, logo abaixo
                    um do outro. A posição (1/3) em azul é diferente do
                    número da seção (01 — Trabalhos) para não competir. */}
                <div className="flex flex-col gap-2">
                  <p aria-hidden="true" className="text-label font-medium tracking-credits text-accent tabular-nums">
                    {index + 1}/{videos.length}
                  </p>
                  {/* Título do cartão: o <button> se estica sobre o item
                      inteiro (after:inset-0) — clicar em qualquer ponto,
                      inclusive no frame, abre o vídeo. O título do vídeo
                      entra no nome acessível (sr-only); o visível embaixo
                      é aria-hidden para não ser lido duas vezes. */}
                  <h3 className="font-serif text-title">
                    <button
                      ref={(node) => {
                        buttons.current[index] = node;
                      }}
                      type="button"
                      onFocus={() => setCurrent(index)}
                      onClick={() => openVideo(index)}
                      className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
                    >
                      <span className="sr-only">Assistir vídeo: </span>
                      {video.badge ?? video.title}
                      <span className="sr-only"> — {video.title}</span>
                    </button>
                  </h3>
                  <p aria-hidden="true" className="text-sm leading-snug">
                    {video.title}
                  </p>
                  <p
                    aria-hidden="true"
                    className="mt-1 flex items-center gap-2 text-label font-medium uppercase tracking-credits"
                  >
                    Assistir
                    <span className="inline-block transition-transform duration-(--dur-base) ease-cine group-hover:translate-x-1">
                      →
                    </span>
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>

        {/* Tela (só no modo lista + tela): sticky ao lado da lista, logo
            abaixo do Header. Os frames ficam empilhados e o atual aparece
            por cima (crossfade de opacidade). aria-hidden: é um atalho de
            mouse — o controle acessível é o botão de cada marca. */}
        <div
          aria-hidden="true"
          className="hidden self-start can-hover:lg:sticky can-hover:lg:top-[calc(var(--gutter)+3.5rem)] can-hover:lg:col-span-7 can-hover:lg:col-start-6 can-hover:lg:block"
        >
          <motion.div
            layoutId={screenMode ? "work-screen" : undefined}
            data-cursor="play"
            onClick={() => openVideo(current)}
            className="relative aspect-video cursor-pointer overflow-hidden bg-black"
          >
            {videos.map((video, index) => (
              <div
                key={video.id}
                className={`absolute inset-0 transition-opacity duration-(--dur-base) ease-cine ${
                  index === current ? "opacity-100" : "opacity-0"
                }`}
              >
                <VideoFrame
                  video={video}
                  sizes={SCREEN_SIZES}
                  playLoop={screenMode && index === current && !reduce}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <VideoLightbox
            key={open.id}
            video={open}
            onClose={() => setOpen(null)}
            returnFocusRef={triggerRef}
            layoutId={screenMode ? "work-screen" : `work-${open.id}`}
            frameSizes={screenMode ? SCREEN_SIZES : CARD_SIZES}
          />
        )}
      </AnimatePresence>
    </>
  );
}
