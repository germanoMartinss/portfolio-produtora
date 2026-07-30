"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { featuredVideos } from "@/data/videos";
import { FeaturedVideo } from "@/types/project";
import VideoCard from "@/components/project/VideoCard";
import VideoLightbox from "@/components/project/VideoLightbox";

// Configuração de animação do grid: os cards filhos entram com um pequeno
// atraso entre si (staggerChildren), criando um efeito de cascata.
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Seção "Vídeos em Destaque": grid de 3 vídeos com marcas grandes.
// id="trabalhos" é o alvo de âncoras internas do site (ex.: um link
// "ver trabalhos" em outra seção poderia apontar para #trabalhos).
export default function FeaturedVideos() {
  // Guarda qual vídeo está "aberto" no momento (null = nenhum, modal fechado).
  const [activeVideo, setActiveVideo] = useState<FeaturedVideo | null>(null);

  return (
    <section id="trabalhos" className="w-full px-6 py-16 sm:py-20">
      {/* Cabeçalho centralizado da seção. */}
      <div className="mx-auto mb-10 flex max-w-xl flex-col items-center gap-3 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">
          Vídeos em Destaque
        </p>
        <h2 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          Trabalhos com Grandes Marcas
        </h2>
      </div>

      {/* Grid full-bleed: 1 coluna no mobile, 3 colunas a partir de "sm". */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {featuredVideos.map((video) => (
          <VideoCard key={video.id} video={video} onOpen={setActiveVideo} />
        ))}
      </motion.div>

      {/* O modal só é renderizado quando há um vídeo ativo. */}
      {activeVideo && (
        <VideoLightbox
          embedUrl={activeVideo.embedUrl}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </section>
  );
}
