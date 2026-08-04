"use client";

import { motion } from "framer-motion";
import { PRODUCER_NAME } from "@/lib/site";

// Separa "Bruna Rodriguez" em primeiro nome / sobrenome para exibir o
// título em duas linhas (ver <h1> abaixo).
const [firstName, ...restName] = PRODUCER_NAME.split(" ");
const lastName = restName.join(" ");

// Seção de topo da home: banner full-bleed (ocupa a largura toda da tela)
// com o vídeo institucional em loop e o nome sobreposto. A bio e os selos
// de destaque ficam na seção "Bio" (src/components/sections/Bio.tsx).
export default function Hero() {
  return (
    <section className="relative min-h-[480px] w-full overflow-hidden bg-black">
      {/* Vídeo vertical em loop (mudo, sem controles, a pedido da cliente)
          ocupando toda a largura da seção, em preto e branco, com o nome
          sobreposto em branco sobre um gradiente inferior para garantir
          legibilidade. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <video
          src="/video/video-prod.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.08]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/75" />
      </motion.div>

      <div className="absolute inset-x-6 bottom-8 sm:inset-x-12 sm:bottom-12">
        <h1 className="font-serif text-[clamp(40px,6vw,80px)] font-semibold leading-[1.05] tracking-tight text-white">
          {firstName}
          <br />
          {lastName}
        </h1>
      </div>
    </section>
  );
}
