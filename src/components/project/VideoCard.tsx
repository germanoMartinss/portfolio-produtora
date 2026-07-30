"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
import { FeaturedVideo } from "@/types/project";

interface VideoCardProps {
  video: FeaturedVideo;
  // Callback disparado ao clicar no card — quem usa este componente decide
  // o que fazer (normalmente: abrir o VideoLightbox com este vídeo).
  onOpen: (video: FeaturedVideo) => void;
}

// Card de vídeo usado nas seções "Vídeos em Destaque" e "Direção de Cena e
// Depoimentos" (FeaturedVideos.tsx e BehindTheScenes.tsx). Mostra a
// thumbnail com um botão de play sobreposto e, abaixo da imagem, o nome do
// cliente (badge, opcional) e o título do vídeo.
export default function VideoCard({ video, onOpen }: VideoCardProps) {
  return (
    // O card inteiro é um <button>, então qualquer clique nele abre o vídeo.
    <motion.button
      type="button"
      onClick={() => onOpen(video)}
      // Animação de entrada: o card sobe e aparece suavemente quando entra
      // na área visível da tela (whileInView), uma vez só (viewport.once).
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group flex flex-col text-left"
    >
      {/* Thumbnail do vídeo, com proporção fixa 6:5. */}
      <div className="relative aspect-[6/5] w-full overflow-hidden bg-black">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          // "group-hover:scale-105": dá um leve zoom na imagem quando o
          // mouse passa por cima do card (o "group" é o <button> pai).
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Botão de play (visual apenas — o clique real é no <button> pai). */}
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

      {/* Badge do cliente (ex.: "Copag") + título do vídeo, abaixo da imagem. */}
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
