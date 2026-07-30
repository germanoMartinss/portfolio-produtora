"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
import { awards } from "@/data/awards";
import { trailerVideo } from "@/data/videos";
import VideoLightbox from "@/components/project/VideoLightbox";

// Animações do container (lista de prêmios) e de cada item individual.
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

// Seção "Prêmios e Reconhecimentos": lista de prêmios à esquerda e o
// trailer do filme "Demônio de Maxwell" à direita, lado a lado.
export default function AwardsWithTrailer() {
  // Controla se o modal do trailer está aberto.
  const [trailerOpen, setTrailerOpen] = useState(false);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-16 sm:py-20">
      {/* Grid com 2 colunas desiguais: lista de prêmios um pouco mais larga
          (1.1fr) que a coluna do trailer (0.9fr). */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col">
          <div className="mb-6 flex flex-col gap-3">
            <p className="text-xs font-medium uppercase tracking-widest text-accent">
              Reconhecimento
            </p>
            <h2 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
              Prêmios e Reconhecimentos
            </h2>
          </div>

          {/* Lista de prêmios: cada item é separado por uma linha fina no
              topo (border-t), estilo editorial, sem cards com fundo/borda
              arredondada. "flex-1" faz esta lista esticar para preencher
              a mesma altura da coluna do trailer ao lado. */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-1 flex-col"
          >
            {awards.map((award) => (
              <motion.div
                key={award.id}
                variants={item}
                className="flex flex-col gap-2 border-t border-black/8 py-5"
              >
                <h3 className="font-serif text-base font-medium leading-snug">
                  <span aria-hidden="true">🏆 </span>
                  {award.title}
                </h3>
                <p className="text-sm text-muted">{award.project}</p>
                {award.year && (
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                    {award.year}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Card do trailer: a imagem usa "flex-1" (sem aspect-ratio fixo)
            para esticar exatamente até a altura da lista de prêmios ao lado,
            em qualquer largura de tela — por isso o card também é
            "h-full" (ocupa toda a altura da célula do grid). */}
        <motion.button
          type="button"
          onClick={() => setTrailerOpen(true)}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="group flex h-full flex-col gap-3 text-left"
        >
          <div className="relative w-full flex-1 overflow-hidden bg-foreground">
            <Image
              src={trailerVideo.thumbnailUrl}
              alt={`Trailer ${trailerVideo.title}`}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover opacity-75 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white/90 shadow-lg">
                <Play
                  className="ml-0.5 h-6 w-6 text-foreground"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </span>
            </div>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            {trailerVideo.badge}
          </p>
          <p className="font-serif text-lg font-medium">{trailerVideo.title}</p>
        </motion.button>
      </div>

      {trailerOpen && (
        <VideoLightbox
          embedUrl={trailerVideo.embedUrl}
          title={`${trailerVideo.title} — Trailer`}
          onClose={() => setTrailerOpen(false)}
        />
      )}
    </section>
  );
}
