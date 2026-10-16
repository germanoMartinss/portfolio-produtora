"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
import { FeaturedVideo } from "@/types/project";
import VideoLightbox from "@/components/project/VideoLightbox";

// Card do trailer (ilha de interatividade da seção AwardsWithTrailer):
// thumbnail clicável que abre o filme no VideoLightbox. Mesma estrutura
// acessível do VideoCard: título em <h3> com o <button> dentro, esticado
// sobre o card inteiro via pseudo-elemento "after".
export default function TrailerCard({ video }: { video: FeaturedVideo }) {
  // Controla se o modal do trailer está aberto.
  const [open, setOpen] = useState(false);
  // O foco volta para este botão quando o modal fecha.
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      {/* A partir de "lg" a imagem usa "flex-1" (sem aspect-ratio fixo)
          para esticar exatamente até a altura da lista de prêmios ao lado
          — isso depende do grid de 2 colunas do desktop, que dá uma altura
          de referência para o "flex-1" preencher. No mobile o grid vira 1
          coluna e não existe essa altura de referência, então usamos um
          aspect-ratio fixo (aspect-[3/4]) para a imagem não colapsar para
          0px. */}
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="group relative flex flex-col gap-3 text-left lg:h-full"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-foreground lg:aspect-auto lg:flex-1">
          {/* Decorativa (alt=""): o título abaixo já identifica o trailer. */}
          <Image
            src={video.thumbnailUrl}
            alt=""
            fill
            // Coluna 0.9fr do grid contido em max-w-6xl: ~445px no máximo.
            sizes="(min-width: 1152px) 445px, (min-width: 1024px) 40vw, 100vw"
            className="object-cover opacity-75 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white/90 shadow-lg">
              <Play
                className="ml-0.5 h-6 w-6 text-foreground"
                fill="currentColor"
                strokeWidth={0}
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
          {video.badge}
        </p>
        <h3 className="font-serif text-lg font-medium">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen(true)}
            className="block w-full text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
          >
            <span className="sr-only">Assistir trailer: </span>
            {video.title}
          </button>
        </h3>
      </motion.article>

      {open && (
        <VideoLightbox
          embedUrl={video.embedUrl}
          title={`${video.title} — Trailer`}
          onClose={() => setOpen(false)}
          returnFocusRef={buttonRef}
        />
      )}
    </>
  );
}
