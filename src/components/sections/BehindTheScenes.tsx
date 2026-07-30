"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { behindTheScenesVideos } from "@/data/videos";
import { FeaturedVideo } from "@/types/project";
import VideoCard from "@/components/project/VideoCard";
import VideoLightbox from "@/components/project/VideoLightbox";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Seção "Direção de Cena e Depoimentos": mesmo padrão visual de card da
// seção FeaturedVideos, mas contida em max-w-6xl (não full-bleed) —
// diferença intencional entre as duas seções de vídeo da home.
export default function BehindTheScenes() {
  const [activeVideo, setActiveVideo] = useState<FeaturedVideo | null>(null);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-16 sm:py-20">
      <div className="mb-10 flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">
          Bastidores
        </p>
        <h2 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          Direção de Cena e Depoimentos
        </h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 gap-2 sm:grid-cols-3"
      >
        {behindTheScenesVideos.map((video) => (
          <VideoCard key={video.id} video={video} onOpen={setActiveVideo} />
        ))}
      </motion.div>

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
