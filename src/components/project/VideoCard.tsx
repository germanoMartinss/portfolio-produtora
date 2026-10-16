"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
import { FeaturedVideo } from "@/types/project";

interface VideoCardProps {
  video: FeaturedVideo;
  // Callback disparado ao clicar no card — quem usa este componente decide
  // o que fazer (normalmente: abrir o VideoLightbox com este vídeo). Recebe
  // também o botão clicado, para o foco voltar a ele quando o modal fechar.
  onOpen: (video: FeaturedVideo, trigger: HTMLButtonElement) => void;
  // Atributo "sizes" da thumbnail (largura real do card em cada tela), para
  // o next/image baixar a menor imagem suficiente.
  sizes: string;
}

// Card de vídeo usado nas seções "Vídeos em Destaque" e "Direção de Cena e
// Depoimentos" (via VideoGallery). Mostra a thumbnail com um botão de play
// sobreposto e, abaixo da imagem, o nome do cliente (badge, opcional) e o
// título do vídeo.
//
// Estrutura acessível: o título é um <h3> (headings não podem ficar dentro
// de <button>), e o <button> fica dentro do título com um pseudo-elemento
// "after:absolute after:inset-0" que se estica sobre o card inteiro — então
// clicar em qualquer ponto do card continua abrindo o vídeo.
export default function VideoCard({ video, onOpen, sizes }: VideoCardProps) {
  return (
    <motion.article
      // Animação de entrada: o card sobe e aparece suavemente quando entra
      // na área visível da tela (whileInView), uma vez só (viewport.once).
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative flex flex-col text-left"
    >
      {/* Thumbnail do vídeo, com proporção fixa 6:5. Decorativa (alt=""):
          o título logo abaixo já descreve o vídeo. */}
      <div className="relative aspect-[6/5] w-full overflow-hidden bg-black">
        <Image
          src={video.thumbnailUrl}
          alt=""
          fill
          sizes={sizes}
          // "group-hover:scale-105": dá um leve zoom na imagem quando o
          // mouse passa por cima do card.
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Ícone de play (visual apenas — o clique real é no <button>). */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-white/90 shadow-lg">
            <Play
              className="ml-0.5 h-5 w-5 text-foreground"
              fill="currentColor"
              strokeWidth={0}
              aria-hidden="true"
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
        <h3 className="font-serif text-lg font-medium leading-snug">
          <button
            type="button"
            onClick={(event) => onOpen(video, event.currentTarget)}
            className="block w-full text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
          >
            <span className="sr-only">Assistir vídeo: </span>
            {video.title}
          </button>
        </h3>
      </div>
    </motion.article>
  );
}
