"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
import { Work } from "@/types/project";
import { accentForIndex } from "@/lib/palette";

interface WorkCardProps {
  work: Work;
  onOpen: (work: Work) => void;
  // "large": card em destaque (maior, com borda colorida e badge do papel
  // desempenhado). "compact": card pequeno em grade, usado para os demais
  // trabalhos que não são destaque.
  size?: "large" | "compact";
  // Índice usado para alternar a cor de destaque entre os cards (ver
  // src/lib/palette.ts). Só é relevante quando size="large".
  accentIndex?: number;
}

// Card de trabalho usado pela seção FeaturedWorks (portfólio "clássico" de
// vídeos com cliente/papel/ano). Não é usado na home atual, mas é mantido
// para preservar a seção antiga caso volte a ser exibida.
export default function WorkCard({
  work,
  onOpen,
  size = "compact",
  accentIndex = 0,
}: WorkCardProps) {
  const isLarge = size === "large";
  const accent = accentForIndex(accentIndex);

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(work)}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group flex flex-col gap-3 text-left"
    >
      <div
        className={`relative w-full overflow-hidden rounded-xl bg-black/5 ${
          isLarge ? `aspect-video border-2 ${accent.border}` : "aspect-[4/3]"
        }`}
      >
        <Image
          src={work.thumbnailUrl}
          alt={work.title}
          fill
          sizes={isLarge ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Botão de play que só aparece no hover (compact) — some por
            padrão (opacity-0) e aparece com o "group-hover" do <button> pai. */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
          <span className="flex h-12 w-12 scale-90 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
            <Play
              className="ml-0.5 h-5 w-5 text-foreground"
              fill="currentColor"
              strokeWidth={0}
            />
          </span>
        </div>
        {/* Badge com o papel desempenhado no trabalho, só nos cards grandes. */}
        {isLarge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide backdrop-blur-sm ${accent.tag}`}
          >
            {work.role}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h3
          className={`font-serif font-medium leading-snug ${
            isLarge ? "text-xl sm:text-2xl" : "text-base"
          }`}
        >
          {work.title}
        </h3>
        <p className="text-sm text-muted">
          {work.client}
          {work.year && <span className="text-muted/70"> &middot; {work.year}</span>}
        </p>
        {/* Nos cards compactos o papel aparece como texto simples abaixo,
            já que não há espaço para o badge sobreposto na imagem. */}
        {!isLarge && (
          <p className="text-xs uppercase tracking-wide text-accent">
            {work.role}
          </p>
        )}
      </div>
    </motion.button>
  );
}
