"use client";

import { motion } from "framer-motion";
import { PRODUCER_NAME } from "@/lib/site";

const [firstName, ...restName] = PRODUCER_NAME.split(" ");
const lastName = restName.join(" ");

const HIGHLIGHTS = [
  "10+ anos de experiência",
  "2 filmes premiados",
  "20+ marcas atendidas",
];

function Brand({ children }: { children: string }) {
  return <span className="font-semibold">{children}</span>;
}

export default function Hero() {
  return (
    <section className="grid w-full grid-cols-1 lg:min-h-[560px] lg:grid-cols-2">
      <div className="flex flex-col items-start gap-6 border-black/8 px-6 pb-12 pt-12 sm:px-16 sm:pt-16 lg:border-r">
        <h1 className="font-serif text-[clamp(48px,6vw,80px)] font-semibold leading-[1.05] tracking-tight">
          {firstName}
          <br />
          {lastName}
        </h1>
      </div>

      <div className="flex flex-col items-start gap-8 px-6 pb-12 pt-12 sm:px-16 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="flex max-w-xl flex-col gap-4"
        >
          <p className="text-lg leading-relaxed text-muted">
            Com mais de 10 anos de estrada na produção audiovisual, já passei
            por praticamente todas as etapas de um set: produção,
            coordenação e direção de produção, produção executiva e
            assistência de direção. Esse trânsito entre funções resultou em
            projetos para marcas como <Brand>Starbucks</Brand>,{" "}
            <Brand>Disney</Brand>, <Brand>Natura</Brand>,{" "}
            <Brand>Copag</Brand>, <Brand>Mary Kay</Brand> e{" "}
            <Brand>Hospital Albert Einstein</Brand>, além de dois filmes
            autorais premiados internacionalmente.
          </p>
          <p className="text-lg leading-relaxed text-muted">
            Formada em Cinema e Audiovisual, atualmente curso
            pós-graduação em Produção Audiovisual Multiplataforma.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3">
          {HIGHLIGHTS.map((highlight) => (
            <span
              key={highlight}
              className="rounded-full border border-accent-blue/60 bg-white px-4 py-2 text-xs font-medium uppercase tracking-wide text-accent-blue"
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
