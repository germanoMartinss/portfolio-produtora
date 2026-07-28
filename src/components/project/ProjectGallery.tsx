"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import PhotoLightbox from "@/components/project/PhotoLightbox";

interface ProjectGalleryProps {
  images: string[];
  title?: string;
}

// Rotação e deslocamento vertical fixos por índice (não aleatórios a cada
// render), para o efeito de fotos espalhadas sobre uma mesa. Aplicados dentro
// de uma grade, em vez de margens negativas encadeadas, para que o efeito
// continue estável com qualquer quantidade de fotos (sem estourar o card).
const ROTATIONS = [-6, 5, -3, 7, -7, 3, 6, -4, 4, -5];
const OFFSETS_Y = [6, -8, 3, -5, 8, -3, 5, -7, 4];

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 p-2 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-12 sm:p-4">
        {images.map((src, index) => {
          const rotation = ROTATIONS[index % ROTATIONS.length];
          const offsetY = OFFSETS_Y[index % OFFSETS_Y.length];

          return (
            <motion.button
              key={src}
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Abrir foto ${index + 1} em tamanho ampliado`}
              initial={{ rotate: rotation, y: offsetY }}
              whileHover={{ rotate: 0, scale: 1.08, y: 0, zIndex: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative w-full bg-white p-2 pb-5 shadow-md sm:shadow-lg"
              style={{ zIndex: index }}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5">
                <Image
                  src={src}
                  alt={
                    title
                      ? `Foto ${index + 1} do projeto ${title}`
                      : `Foto ${index + 1} do projeto`
                  }
                  fill
                  sizes="(min-width: 640px) 33vw, 45vw"
                  className="object-cover"
                />
              </div>
            </motion.button>
          );
        })}
      </div>

      {openIndex !== null && (
        <PhotoLightbox
          images={images}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}
