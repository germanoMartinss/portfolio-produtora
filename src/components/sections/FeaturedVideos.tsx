"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { featuredVideos } from "@/data/videos";
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

export default function FeaturedVideos() {
  const [activeVideo, setActiveVideo] = useState<FeaturedVideo | null>(null);

  return (
    <section id="trabalhos" className="w-full px-6 py-16 sm:py-20">
      <div className="mx-auto mb-10 flex max-w-xl flex-col items-center gap-3 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">
          Vídeos em Destaque
        </p>
        <h2 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          Trabalhos com Grandes Marcas
        </h2>
      </div>

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
