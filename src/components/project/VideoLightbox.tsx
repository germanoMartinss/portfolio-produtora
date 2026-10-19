"use client";

import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FeaturedVideo } from "@/types/project";
import { frameSrc } from "@/components/project/VideoFrame";
import { pauseSmoothScroll, resumeSmoothScroll } from "@/lib/smooth-scroll";
import { DURATION, TRANSITION } from "@/lib/motion";

interface VideoLightboxProps {
  // Vídeo a tocar: embedUrl SEM o parâmetro de autoplay (este componente
  // adiciona "autoplay=1") e o frame usado durante a transição.
  video: FeaturedVideo;
  onClose: () => void;
  // Elemento que abriu o modal (normalmente o botão do card). Ao fechar, o
  // foco volta para ele — sem isso, quem navega por teclado "cai" no topo
  // da página.
  returnFocusRef?: RefObject<HTMLElement | null>;
  // Transição de elemento compartilhado: se a thumbnail que abriu o vídeo
  // tem o mesmo layoutId, a caixa do player "nasce" dela e cresce até o
  // centro da tela. Sem layoutId (ex.: aberto pelo teclado, sem thumbnail
  // visível), a caixa só aparece com fade + leve zoom.
  layoutId?: string;
  // "sizes" do frame de origem. O frame aparece dentro da caixa enquanto
  // ela cresce (o iframe só entra no fim: escalado, ficaria distorcido);
  // com o mesmo sizes da origem, o navegador escolhe o mesmo arquivo do
  // srcset e a imagem já está em cache. Sem ele, a caixa abre vazia.
  frameSizes?: string;
}

// Modal (dialog acessível) em tela cheia que reproduz um vídeo dentro de
// um <iframe>. Usado por todas as seções que têm vídeos clicáveis. Para a
// animação de saída, quem usa deve envolvê-lo em <AnimatePresence>.
//
// Acessibilidade:
// - role="dialog" + aria-modal + título acessível (aria-labelledby);
// - renderizado via portal no <body>, e o resto da página recebe "inert"
//   enquanto ele está aberto (nada fora do modal recebe foco/clique);
// - o foco vai para o botão Fechar ao abrir e fica preso dentro do modal
//   (sentinelas de foco antes/depois, necessárias porque o iframe é de
//   outra origem e não dá para interceptar o Tab dentro dele);
// - Esc fecha; o foco volta ao elemento que abriu; o scroll do fundo é
//   bloqueado (inclusive o scroll suave do Lenis).
export default function VideoLightbox({
  video,
  onClose,
  returnFocusRef,
  layoutId,
  frameSizes,
}: VideoLightboxProps) {
  const { embedUrl, title } = video;
  const titleId = useId();
  const reduce = useReducedMotion();
  // Acrescenta autoplay=1 preservando parâmetros que a URL já tenha
  // (ex.: "?dnt=1" do Vimeo).
  const src = new URL(embedUrl);
  src.searchParams.set("autoplay", "1");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // O iframe só é montado quando a caixa terminou de crescer.
  const [ready, setReady] = useState(!layoutId);

  // Garantia: se a animação de layout não acontecer (movimento reduzido, ou
  // a thumbnail de origem não estava na tela), libera o iframe mesmo assim.
  useEffect(() => {
    if (ready) return;
    const timer = setTimeout(() => setReady(true), reduce ? 0 : DURATION.base * 1000 + 150);
    return () => clearTimeout(timer);
  }, [ready, reduce]);

  // Permite fechar o modal apertando a tecla Esc.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Ao abrir: foco no botão Fechar, página de fundo inerte e sem scroll.
  // Ao fechar (cleanup): desfaz tudo e devolve o foco a quem abriu.
  useEffect(() => {
    const dialog = dialogRef.current;
    const opener =
      returnFocusRef?.current ?? (document.activeElement as HTMLElement | null);

    const background = Array.from(document.body.children).filter(
      (el): el is HTMLElement =>
        el instanceof HTMLElement && !el.contains(dialog) && !el.inert,
    );
    background.forEach((el) => (el.inert = true));

    // Compensa a largura da barra de rolagem que some com overflow hidden,
    // para o layout do fundo não "pular" para o lado.
    const { overflow, paddingRight } = document.body.style;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    // O overflow hidden não segura o scroll suave (o Lenis rola a janela por
    // código), então ele é pausado enquanto o modal está aberto.
    pauseSmoothScroll();

    closeButtonRef.current?.focus();

    return () => {
      resumeSmoothScroll();
      background.forEach((el) => (el.inert = false));
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      opener?.focus();
    };
  }, [returnFocusRef]);

  return createPortal(
    // Fundo escuro cobrindo a tela toda. Clicar nele fecha o modal.
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={TRANSITION.fast}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Título acessível do dialog (lido por leitores de tela, invisível). */}
      <h2 id={titleId} className="sr-only">
        {title}
      </h2>

      {/* Sentinela: Shift+Tab a partir do botão Fechar leva ao iframe. */}
      <span tabIndex={0} onFocus={() => iframeRef.current?.focus()} />

      {/* 44px: alvo de toque mínimo. */}
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Fechar vídeo"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-2xl text-white transition-transform duration-(--dur-fast) hover:rotate-90 sm:right-8 sm:top-8"
      >
        &times;
      </button>

      {/* Caixa do vídeo em si. Com layoutId, o framer-motion a anima a
          partir da posição/tamanho da thumbnail de origem (só transform).
          stopPropagation evita que um clique aqui dentro feche o modal (só
          clicar fora, no fundo escuro, fecha). */}
      <motion.div
        layoutId={layoutId}
        initial={layoutId ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        // Saída curta (0,2 s): o foco só volta para quem abriu quando o
        // dialog termina de sair, então ela não pode se arrastar.
        exit={layoutId ? undefined : { opacity: 0, scale: 0.94, transition: TRANSITION.fast }}
        transition={TRANSITION.base}
        onLayoutAnimationComplete={() => setReady(true)}
        className="relative aspect-video w-full max-w-5xl overflow-hidden bg-black"
        onClick={(event) => event.stopPropagation()}
      >
        {frameSizes && (
          <Image src={frameSrc(video)} alt="" fill sizes={frameSizes} className="object-cover" />
        )}
        {ready && (
          <iframe
            ref={iframeRef}
            src={src.toString()}
            title={title}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            allowFullScreen
          />
        )}
      </motion.div>

      {/* Sentinela: Tab saindo do iframe volta para o botão Fechar. */}
      <span tabIndex={0} onFocus={() => closeButtonRef.current?.focus()} />
    </motion.div>,
    document.body,
  );
}
