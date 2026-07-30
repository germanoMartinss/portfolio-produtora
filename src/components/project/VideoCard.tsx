"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
import { FeaturedVideo } from "@/types/project";

interface VideoCardProps {
  video: FeaturedVideo;
  onOpen: (video: FeaturedVideo) => void;
}

export default function VideoCard({ video, onOpen }: VideoCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(video)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group flex flex-col text-left"
    >
      <div className="relative aspect-[6/5] w-full overflow-hidden bg-black">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-white/90 shadow-lg">
            <Play
              className="ml-0.5 h-5 w-5 text-foreground"
              fill="currentColor"
              strokeWidth={0}
            />
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-4">
        {video.badge && (
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            {video.badge}
          </p>
        )}
        <p className="font-serif text-lg font-medium leading-snug">
          {video.title}
        </p>
      </div>
    </motion.button>
  );
}
