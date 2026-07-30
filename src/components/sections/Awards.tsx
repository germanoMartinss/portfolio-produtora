"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { awards } from "@/data/awards";
import { accentForIndex } from "@/lib/palette";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

// Versão original da seção de prêmios: grid de cards com ícone de troféu.
// Não é usada na home atual (substituída por AwardsWithTrailer.tsx, que
// combina esta lista com o trailer do filme ao lado). Mantida no código
// para preservar o histórico do design anterior.
export default function Awards() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-12 sm:py-14">
      <div className="mb-6 flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">
          Reconhecimento
        </p>
        <h2 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          Prêmios e Reconhecimentos
        </h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {awards.map((award, index) => (
          <motion.div
            key={award.id}
            variants={item}
            className={`flex flex-col gap-4 rounded-2xl border border-black/5 p-6 shadow-sm ${
              accentForIndex(index).soft
            }`}
          >
            <Trophy
              className="h-6 w-6 text-accent"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <div className="flex flex-col gap-2">
              <h3 className="font-serif text-lg font-medium leading-snug">
                {award.title}
              </h3>
              <p className="text-sm text-muted">{award.project}</p>
              {award.year && (
                <p className="text-xs font-medium uppercase tracking-widest text-accent">
                  {award.year}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
