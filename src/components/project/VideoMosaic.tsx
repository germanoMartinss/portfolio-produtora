"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FeaturedVideo } from "@/types/project";
import VideoFrame from "@/components/project/VideoFrame";
import VideoLightbox from "@/components/project/VideoLightbox";
import { TRANSITION, VIEWPORT } from "@/lib/motion";

// "sizes" dos frames: o grande ocupa 8 das 12 colunas; os pequenos, 4.
const BIG_SIZES = "(min-width: 1024px) 66vw, 100vw";
const SMALL_SIZES = "(min-width: 1024px) 33vw, 100vw";

// Mosaico assimétrico de vídeos (seção Bastidores): o primeiro vídeo grande
// (8 colunas) e os outros dois menores, empilhados ao lado (4 colunas). Todos
// os frames ficam em 16:9 — esticar o grande até a altura dos dois pequenos
// o deixaria quase quadrado, cortando as laterais das thumbnails (que têm
// texto) e ampliando uma imagem de 640px além da resolução dela. As bases
// não se alinham, de propósito: o mosaico é assimétrico. Abaixo de lg,
// tudo empilhado.
// Mesmo sistema de mídia e lightbox da seção Trabalhos: o frame de cada
// vídeo é a origem da transição para o player (layoutId), o cursor vira
// "Play" sobre ele e, no toque, um "Play" visível fica no canto.
export default function VideoMosaic({ videos }: { videos: FeaturedVideo[] }) {
  const [open, setOpen] = useState<{ video: FeaturedVideo; sizes: string } | null>(null);
  // Vídeo sob o mouse/foco: toca o loop curto (loopUrl), se houver.
  const [hovered, setHovered] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const reduce = useReducedMotion();

  return (
    <>
      <div className="col-span-full grid grid-cols-subgrid gap-y-12 lg:gap-y-8">
        {videos.map((video, index) => {
          const big = index === 0;
          const sizes = big ? BIG_SIZES : SMALL_SIZES;
          return (
            <motion.article
              key={video.id}
              data-cursor="play"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ ...TRANSITION.base, delay: index * 0.08 }}
              onPointerEnter={() => setHovered(video.id)}
              onPointerLeave={() => setHovered(null)}
              className={`group relative col-span-full flex flex-col gap-4 ${
                big ? "lg:col-span-8 lg:row-span-2 lg:self-start" : "lg:col-span-4 lg:col-start-9"
              }`}
            >
              <motion.div
                layoutId={`bts-${video.id}`}
                className="relative aspect-video overflow-hidden bg-black"
              >
                <div className="absolute inset-0 transition-transform duration-(--dur-slow) ease-cine group-hover:scale-[1.03]">
                  <VideoFrame video={video} sizes={sizes} playLoop={hovered === video.id && !reduce} />
                </div>
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 right-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-label font-medium uppercase tracking-credits text-black can-hover:hidden"
                >
                  Play
                </span>
              </motion.div>

              <div className="flex flex-col gap-2">
                {video.badge && (
                  <p className="text-label font-medium uppercase tracking-credits text-accent">{video.badge}</p>
                )}
                {/* <h3> com o <button> esticado sobre o cartão inteiro. */}
                <h3 className={`font-serif ${big ? "text-title" : "text-lead"}`}>
                  <button
                    type="button"
                    onFocus={() => setHovered(video.id)}
                    onBlur={() => setHovered(null)}
                    onClick={(event) => {
                      triggerRef.current = event.currentTarget;
                      setOpen({ video, sizes });
                    }}
                    className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
                  >
                    <span className="sr-only">Assistir vídeo: </span>
                    {video.title}
                  </button>
                </h3>
              </div>
            </motion.article>
          );
        })}
      </div>

      <AnimatePresence>
        {open && (
          <VideoLightbox
            key={open.video.id}
            video={open.video}
            onClose={() => setOpen(null)}
            returnFocusRef={triggerRef}
            layoutId={`bts-${open.video.id}`}
            frameSizes={open.sizes}
          />
        )}
      </AnimatePresence>
    </>
  );
}
