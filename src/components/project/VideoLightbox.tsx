"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface VideoLightboxProps {
  // URL de embed do player (YouTube, Vimeo, Google Drive) SEM o parâmetro
  // de autoplay — este componente adiciona "?autoplay=1" automaticamente.
  embedUrl: string;
  title: string;
  onClose: () => void;
}

// Modal em tela cheia que reproduz um vídeo dentro de um <iframe>.
// Usado por todas as seções que têm cards de vídeo clicáveis (Vídeos em
// Destaque, Prêmios + Trailer, Direção de Cena e Depoimentos, etc.).
export default function VideoLightbox({
  embedUrl,
  title,
  onClose,
}: VideoLightboxProps) {
  // Permite fechar o modal apertando a tecla Esc.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {/* Fundo escuro cobrindo a tela toda. Clicar nele fecha o modal. */}
      <motion.div
        key="video-lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
        onClick={onClose}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-2xl text-white/80 transition hover:text-white sm:right-8 sm:top-8"
        >
          &times;
        </button>

        {/* Caixa do vídeo em si. stopPropagation evita que um clique aqui
            dentro feche o modal (só clicar fora, no fundo escuro, fecha). */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-lg bg-black"
          onClick={(event) => event.stopPropagation()}
        >
          <iframe
            src={`${embedUrl}?autoplay=1`}
            title={title}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            allowFullScreen
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
