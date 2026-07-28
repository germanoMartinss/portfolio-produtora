"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PRODUCER_NAME } from "@/lib/site";

// PLACEHOLDER: nome, formação, tempo de carreira e qualidades técnicas fictícios.
// Substituir pelo texto real de apresentação assim que estiver definido.
export default function Hero() {
  return (
    <section className="flex w-full items-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 sm:px-12 sm:py-32 lg:grid-cols-2 lg:gap-16"
      >
        <div className="order-2 flex flex-col gap-8 lg:order-1">
          <p className="text-sm font-medium uppercase tracking-widest text-muted">
            Produtora audiovisual
          </p>
          <h1 className="font-serif text-6xl font-medium leading-[1.05] tracking-tight sm:text-7xl">
            {PRODUCER_NAME}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            Formada em Cinema e Audiovisual, com mais de 10 anos de
            experiência na produção de vídeos institucionais, documentários e
            conteúdo para marcas. Especialista em contar histórias com
            sensibilidade técnica, unindo direção, fotografia e edição para
            entregar narrativas que conectam com o público.
          </p>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="w-64 -rotate-3 bg-white p-3 pb-8 shadow-xl sm:w-72">
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
