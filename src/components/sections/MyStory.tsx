"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PRODUCER_NAME } from "@/lib/site";

// Texto da bio completa, dividido em 3 parágrafos (trajetória/funções,
// clientes/orçamentos, filmes autorais premiados).
const PARAGRAPHS = [
  `Produtora audiovisual e de eventos — MKT Virtual/ Mokotó Filmes. Responsável por coordenar todas as produções da empresa, entre suas funções estão produção de base e set, alimentação, objetos, figurino e elenco. Sua principal função é dar vida a todas as ideias, pautas e briefings, cuidando de toda equipe, fornecedores, logística e qualquer item necessário para que o produto audiovisual seja materializado com sucesso entre a pré, a pós e durante a produção.`,
  `É responsável pela elaboração de parte dos orçamentos da casa e de todas as programações de pagamentos. Em alguns vídeos atua como diretora de cena (especialmente os com entrevistas), assistente de direção e produção executiva. Participa das reuniões de criação, briefing e organização, e atua na tratativa direta com clientes como Copag, Mary Kay, Estrella Galicia, Natura, Hospital Albert Einstein, Santa Helena, Galápagos, Sistema Anglo de Ensino, Aunt Jackie's, entre muitas outras.`,
  `Realizou dois filmes autorais premiados: "Os Demônios de Maxwell", em coparceria com o cineasta de Los Angeles Marcos Vaz, e o documentário "Pink Panther", contemplado no 6º FACULT da cidade de Santos (Setembro 2016 / Outubro 2023).`,
];

// Seção "Minha História": texto biográfico completo à esquerda, foto à
// direita. A foto usa "sticky" para acompanhar o scroll enquanto o texto
// (mais alto) rola por baixo dela.
// PLACEHOLDER: reaproveitando a foto do Hero até termos a foto real desta seção.
export default function MyStory() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-16 sm:py-20">
      {/* items-start (em vez de "center") é importante aqui: com um texto
          longo, centralizar verticalmente causaria sobreposição visual com
          a seção seguinte da página. */}
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-5"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            Trajetória
          </p>
          <h2 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
            Minha História
          </h2>
          {PARAGRAPHS.map((paragraph, index) => (
            <p key={index} className="text-[15px] leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* "sticky top-24": a foto gruda a 96px do topo da tela e acompanha
            o scroll até o fim da coluna de texto (que é mais alta). */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="sticky top-24 aspect-[3/4] w-full overflow-hidden rounded-2xl bg-black/5"
        >
          <Image
            src="/images/bruna-hero.png"
            alt={`Foto de ${PRODUCER_NAME}`}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
