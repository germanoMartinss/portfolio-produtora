"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FeaturedVideo } from "@/types/project";
import VideoLightbox, { THUMB_SIZES } from "@/components/project/VideoLightbox";
import { EASE, STAGGER, TRANSITION, VIEWPORT } from "@/lib/motion";

// Id compartilhado entre a thumbnail de origem e a caixa do player.
const layoutIdOf = (video: FeaturedVideo) => `work-${video.id}`;

// Lista tipográfica de trabalhos (seção "Trabalhos", Opção A do redesign):
// cada linha é o nome da marca em tamanho grande, com o título do vídeo ao
// lado. Duas interfaces, escolhidas pelo tipo de ponteiro (não pela largura):
// - Mouse: passar sobre uma linha mostra a thumbnail parada num "preview"
//   que segue o cursor (o cursor customizado vira "Play" por cima dele).
// - Toque: cada linha já mostra a sua thumbnail — nada depende de hover.
// Ao abrir um vídeo, a thumbnail visível (preview ou a da linha) cresce até
// virar o player (layoutId). Pelo teclado, sem thumbnail na tela, o player
// só aparece com fade.
export default function WorkList({ videos }: { videos: FeaturedVideo[] }) {
  // Vídeo aberto no lightbox (null = fechado).
  const [active, setActive] = useState<FeaturedVideo | null>(null);
  // Linha sob o mouse (só na interface de mouse).
  const [hovered, setHovered] = useState<FeaturedVideo | null>(null);
  // As imagens do preview só são montadas depois do primeiro hover, para
  // não disputarem banda com o carregamento inicial.
  const [armed, setArmed] = useState(false);
  const [canHover, setCanHover] = useState(false);
  // Se o vídeo aberto tem uma thumbnail de origem na tela (para o layoutId).
  const [fromThumb, setFromThumb] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // Preview seguindo o mouse: a posição é interpolada a cada quadro e
  // escrita direto no DOM (transform), sem re-render do React — mesma
  // técnica do CustomCursor, sem precisar das molas do framer-motion
  // (que pesariam no JS inicial). Com "reduzir movimento", vai colado.
  const previewRef = useRef<HTMLDivElement>(null);
  const follow = useRef({ x: 0, y: 0, drawnX: 0, drawnY: 0, frame: 0 });

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(query.matches);
    sync();
    query.addEventListener("change", sync);
    const state = follow.current;
    return () => {
      query.removeEventListener("change", sync);
      cancelAnimationFrame(state.frame);
    };
  }, []);

  function render() {
    const state = follow.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ease = reduce ? 1 : 0.18;
    state.drawnX += (state.x - state.drawnX) * ease;
    state.drawnY += (state.y - state.drawnY) * ease;
    if (previewRef.current) {
      previewRef.current.style.transform = `translate3d(${state.drawnX}px, ${state.drawnY}px, 0)`;
    }
    const settled =
      Math.abs(state.x - state.drawnX) < 0.1 && Math.abs(state.y - state.drawnY) < 0.1;
    state.frame = settled ? 0 : requestAnimationFrame(render);
  }

  function moveTo(x: number, y: number, jump = false) {
    const state = follow.current;
    state.x = x;
    state.y = y;
    if (jump) {
      state.drawnX = x;
      state.drawnY = y;
    }
    if (!state.frame) state.frame = requestAnimationFrame(render);
  }

  function onPointerMove(event: React.PointerEvent) {
    if (event.pointerType === "mouse") moveTo(event.clientX, event.clientY);
  }

  function onRowEnter(event: React.PointerEvent, video: FeaturedVideo) {
    if (event.pointerType !== "mouse" || !canHover) return;
    // Primeira entrada na lista: o preview "nasce" no cursor, sem voar do
    // canto da tela até ele.
    moveTo(event.clientX, event.clientY, !hovered);
    setArmed(true);
    setHovered(video);
  }

  function openVideo(video: FeaturedVideo, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    // Origem visível: o preview (mouse sobre esta linha) ou a thumbnail da
    // própria linha (interface de toque).
    setFromThumb(canHover ? hovered?.id === video.id : true);
    setActive(video);
  }

  function closeVideo() {
    setActive(null);
    // O mouse provavelmente já não está onde estava: o preview só volta no
    // próximo hover.
    setHovered(null);
  }

  return (
    <>
      <div
        className="col-span-full grid grid-cols-subgrid border-b border-line"
        onPointerMove={onPointerMove}
        onPointerLeave={() => setHovered(null)}
      >
        {videos.map((video, index) => (
          <motion.article
            key={video.id}
            data-cursor="play"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={{ hidden: {}, show: { transition: { staggerChildren: STAGGER.base } } }}
            onPointerEnter={(event) => onRowEnter(event, video)}
            className="group relative col-span-full grid grid-cols-subgrid items-end gap-y-4 py-6 lg:py-10"
          >
            {/* Linha fina de divisão que se desenha da esquerda (créditos). */}
            <motion.span
              aria-hidden="true"
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
              transition={{ duration: 1.2, ease: EASE.cine }}
              className="absolute inset-x-0 top-0 h-px origin-left bg-line"
            />

            {/* Número da linha, no estilo dos rótulos de crédito. Fica azul
                quando a linha está sob o mouse (troca de cor sem transição). */}
            <p
              aria-hidden="true"
              className="col-span-full self-start text-label font-medium uppercase tracking-credits text-muted tabular-nums group-hover:text-accent lg:col-span-2 lg:pt-[0.6em]"
            >
              {String(index + 1).padStart(2, "0")}
            </p>

            {/* Nome da marca: o título do card, com o <button> esticado
                sobre a linha inteira (after:inset-0) — clicar em qualquer
                ponto abre o vídeo. O título do vídeo entra no nome
                acessível do botão (sr-only); o visível ao lado é aria-hidden
                para não ser lido duas vezes. */}
            <h3 className="col-span-full font-serif text-section lg:col-span-6 lg:col-start-3">
              <button
                type="button"
                onClick={(event) => openVideo(video, event.currentTarget)}
                className="block text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
              >
                <span className="sr-only">Assistir vídeo: </span>
                <span className="-mb-[0.2em] -mt-[0.1em] block overflow-hidden pb-[0.2em] pt-[0.1em]">
                  {/* Sobe da máscara ao entrar na tela; no hover desliza
                      um pouco para a direita. */}
                  <motion.span
                    variants={{ hidden: { y: "110%" }, show: { y: 0 } }}
                    transition={TRANSITION.slow}
                    className="block"
                  >
                    <span className="block transition-transform duration-(--dur-base) ease-cine group-hover:translate-x-4">
                      {video.badge ?? video.title}
                    </span>
                  </motion.span>
                </span>
                <span className="sr-only"> — {video.title}</span>
              </button>
            </h3>

            {/* Thumbnail dentro da linha: só na interface de toque. Com
                mouse fica display:none (e, sendo lazy, nem é baixada). */}
            <motion.div
              layoutId={canHover ? undefined : layoutIdOf(video)}
              aria-hidden="true"
              className="relative col-span-2 aspect-video overflow-hidden bg-black can-hover:hidden md:col-span-5 lg:col-span-2 lg:col-start-9"
            >
              <Image
                src={video.thumbnailUrl}
                alt=""
                fill
                sizes={THUMB_SIZES}
                className="object-cover"
              />
            </motion.div>

            {/* Título do vídeo + "Assistir", alinhados à base do nome. */}
            <motion.div
              aria-hidden="true"
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={TRANSITION.base}
              className="col-span-2 flex flex-col gap-3 text-sm leading-snug md:col-span-6 md:col-start-7 lg:col-span-2 lg:col-start-11 can-hover:lg:col-span-3 can-hover:lg:col-start-10"
            >
              <p>{video.title}</p>
              <p className="flex items-center gap-2 text-label font-medium uppercase tracking-credits">
                Assistir
                <span className="inline-block transition-transform duration-(--dur-base) ease-cine group-hover:translate-x-1">
                  →
                </span>
              </p>
            </motion.div>
          </motion.article>
        ))}
      </div>

      {/* Preview que segue o cursor (só interface de mouse). Fica fora do
          fluxo (fixed) e não recebe clique. As 3 thumbnails ficam
          empilhadas e a da linha atual aparece por cima (troca por
          opacidade). Some quando um vídeo está aberto: a caixa do player
          "herda" o layoutId dele e cresce a partir daqui. */}
      {canHover && armed && !active && (
        <div
          ref={(node) => {
            previewRef.current = node;
            // Ao (re)montar, já nasce na última posição conhecida.
            const { drawnX, drawnY } = follow.current;
            if (node) node.style.transform = `translate3d(${drawnX}px, ${drawnY}px, 0)`;
          }}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40"
        >
          <motion.div
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6 }}
            transition={TRANSITION.base}
            className="-translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              layoutId={hovered ? layoutIdOf(hovered) : undefined}
              transition={TRANSITION.base}
              className="relative aspect-video w-[clamp(240px,24vw,400px)] overflow-hidden bg-black"
            >
              {videos.map((video) => (
                <Image
                  key={video.id}
                  src={video.thumbnailUrl}
                  alt=""
                  fill
                  sizes={THUMB_SIZES}
                  className={`object-cover transition-opacity duration-(--dur-fast) ${
                    hovered?.id === video.id ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      )}

      <AnimatePresence>
        {active && (
          <VideoLightbox
            key={active.id}
            embedUrl={active.embedUrl}
            title={active.title}
            onClose={closeVideo}
            returnFocusRef={triggerRef}
            layoutId={fromThumb ? layoutIdOf(active) : undefined}
            thumbnailUrl={active.thumbnailUrl}
          />
        )}
      </AnimatePresence>
    </>
  );
}
