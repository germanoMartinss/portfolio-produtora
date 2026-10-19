"use client";

import { useEffect, useId, useRef, type RefObject } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { pauseSmoothScroll, resumeSmoothScroll } from "@/lib/smooth-scroll";

interface VideoLightboxProps {
  // URL de embed do player (YouTube, Vimeo) SEM o parâmetro de autoplay —
  // este componente adiciona "autoplay=1" automaticamente.
  embedUrl: string;
  title: string;
  onClose: () => void;
  // Elemento que abriu o modal (normalmente o botão do card). Ao fechar, o
  // foco volta para ele — sem isso, quem navega por teclado "cai" no topo
  // da página.
  returnFocusRef?: RefObject<HTMLElement | null>;
}

// Modal (dialog acessível) em tela cheia que reproduz um vídeo dentro de
// um <iframe>. Usado por todas as seções que têm cards de vídeo clicáveis.
//
// Acessibilidade:
// - role="dialog" + aria-modal + título acessível (aria-labelledby);
// - renderizado via portal no <body>, e o resto da página recebe "inert"
//   enquanto ele está aberto (nada fora do modal recebe foco/clique);
// - o foco vai para o botão Fechar ao abrir e fica preso dentro do modal
//   (sentinelas de foco antes/depois, necessárias porque o iframe é de
//   outra origem e não dá para interceptar o Tab dentro dele);
// - Esc fecha; o foco volta ao card que abriu; o scroll do fundo é
//   bloqueado.
export default function VideoLightbox({
  embedUrl,
  title,
  onClose,
  returnFocusRef,
}: VideoLightboxProps) {
  const titleId = useId();
  // Acrescenta autoplay=1 preservando parâmetros que a URL já tenha
  // (ex.: "?dnt=1" do Vimeo).
  const src = new URL(embedUrl);
  src.searchParams.set("autoplay", "1");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Título acessível do dialog (lido por leitores de tela, invisível). */}
      <h2 id={titleId} className="sr-only">
        {title}
      </h2>

      {/* Sentinela: Shift+Tab a partir do botão Fechar leva ao iframe. */}
      <span tabIndex={0} onFocus={() => iframeRef.current?.focus()} />

      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Fechar vídeo"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-2xl text-white/80 transition hover:text-white sm:right-8 sm:top-8"
      >
        &times;
      </button>

      {/* Caixa do vídeo em si. stopPropagation evita que um clique aqui
          dentro feche o modal (só clicar fora, no fundo escuro, fecha). */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-lg bg-black"
        onClick={(event) => event.stopPropagation()}
      >
        <iframe
          ref={iframeRef}
          src={src.toString()}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          allowFullScreen
        />
      </motion.div>

      {/* Sentinela: Tab saindo do iframe volta para o botão Fechar. */}
      <span tabIndex={0} onFocus={() => closeButtonRef.current?.focus()} />
    </motion.div>,
    document.body,
  );
}
