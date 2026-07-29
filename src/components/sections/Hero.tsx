"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PRODUCER_NAME } from "@/lib/site";
import { accentForIndex } from "@/lib/palette";

const HIGHLIGHTS = [
  "10+ anos de experiência",
  "2 filmes premiados internacionalmente",
  "20+ marcas atendidas",
];

export default function Hero() {
  return (
    <section className="flex w-full items-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-2 lg:gap-16"
      >
        <div className="order-2 flex flex-col gap-8 lg:order-1">
          <p className="text-sm font-medium uppercase tracking-widest text-muted">
            Produtora e Diretora de Produção Audiovisual
          </p>
          <h1 className="font-serif text-6xl font-medium leading-[1.05] tracking-tight sm:text-7xl">
            {PRODUCER_NAME}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            Com mais de 10 anos de estrada na produção audiovisual, Bruna já
            passou por praticamente todas as etapas de um set: produção,
            coordenação e direção de produção, produção executiva e
            assistência de direção. Esse trânsito entre funções resultou em
            projetos para marcas como Starbucks, Disney, Natura, Copag, Mary
            Kay e Hospital Albert Einstein, além de dois filmes autorais
            premiados internacionalmente. Formada em Cinema e Audiovisual,
            atualmente cursa pós-graduação em Produção Audiovisual
            Multiplataforma.
          </p>
          <div className="flex flex-wrap gap-3">
            {HIGHLIGHTS.map((highlight, index) => (
              <span
                key={highlight}
                className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wide shadow-sm ${
                  accentForIndex(index).solid
                }`}
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="w-64 -rotate-3 border border-black/10 bg-white p-3 pb-8 shadow-xl sm:w-72">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/5">
              <Image
                src="/images/bruna-hero.png"
                alt={`Retrato de ${PRODUCER_NAME}`}
                fill
                sizes="(min-width: 1024px) 18rem, 16rem"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
