"use client";

import { useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface PhotoLightboxProps {
  images: string[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function PhotoLightbox({
  images,
  index,
  onClose,
  onNavigate,
}: PhotoLightboxProps) {
  const goToPrevious = useCallback(() => {
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  const goToNext = useCallback(() => {
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goToPrevious();
      if (event.key === "ArrowRight") goToNext();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goToPrevious, goToNext]);

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
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

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goToPrevious();
              }}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-3xl text-white/80 transition hover:text-white sm:left-6"
            >
              &#8249;
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goToNext();
              }}
              aria-label="Próxima foto"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-3xl text-white/80 transition hover:text-white sm:right-6"
            >
              &#8250;
            </button>
          </>
        )}

        <motion.div
          key={images[index]}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative h-[80vh] w-full max-w-4xl"
          onClick={(event) => event.stopPropagation()}
        >
          <Image
            src={images[index]}
            alt={`Foto ${index + 1} em tamanho ampliado`}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
