"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { brands } from "@/data/brands";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Brands() {
  return (
    <section className="w-full bg-foreground py-10 sm:py-14">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-12">
        <div className="mb-6 flex flex-col gap-3">
          <span className="h-1.5 w-12 rounded-full bg-accent-blue" aria-hidden="true" />
          <p className="text-xs font-medium uppercase tracking-widest text-accent-blue">
            Trajetória
          </p>
          <h2 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl">
            Marcas com quem já trabalhei
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.id}
              variants={item}
              className="flex h-24 items-center justify-center rounded-xl bg-white p-6 shadow-md transition-transform duration-300 hover:-translate-y-1 sm:h-28"
            >
              <div
                className="relative h-full w-full"
                style={{
                  transform: `scale(${brand.logoScale ?? 1})`,
                  clipPath: brand.clipPath,
                }}
              >
                <Image
                  src={brand.logoSrc}
                  alt={brand.name}
                  fill
                  sizes="160px"
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
