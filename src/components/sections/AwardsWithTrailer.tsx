import { awards } from "@/data/awards";
import { trailerVideo } from "@/data/videos";
import SectionLabel from "@/components/layout/SectionLabel";
import { MaskReveal } from "@/components/motion/Reveal";
import TrailerPlayer from "@/components/project/TrailerPlayer";

// Seção 03 — Prêmios: lista tipográfica (ano grande em itálico + prêmio) e,
// abaixo, o trailer de "Demônio de Maxwell" em largura total.
// Server Component: só o trailer (TrailerPlayer) roda no navegador.
export default function AwardsWithTrailer() {
  return (
    <section id="premios" aria-labelledby="premios-titulo" className="pt-section">
      <div className="page-grid gap-y-12 lg:gap-y-20">
        <SectionLabel index={3} label="Prêmios" />
        <h2
          id="premios-titulo"
          className="col-span-full font-serif text-section lg:col-span-10 lg:col-start-3"
        >
          <MaskReveal>
            Prêmios e <em>reconhecimentos</em>
          </MaskReveal>
        </h2>

        {/* Lista em subgrid (as 12 colunas do page-grid): ano nas colunas
            1–3, prêmio nas 4–10, projeto nas 11–12. Linhas finas entre os
            itens, sem cards. A linha inteira fica azul no hover e quando
            algo dentro dela recebe foco (focus-within) — troca de cor
            instantânea, sem animar cor. */}
        <ol className="col-span-full grid grid-cols-subgrid border-b border-line">
          {awards.map((award) => {
            // "The Gold Movie Award – Melhor Filme": nome do prêmio em
            // destaque e a categoria logo abaixo, menor.
            const [name, category] = award.title.split(" – ");
            return (
              <li
                key={award.id}
                className="group col-span-full grid grid-cols-subgrid items-baseline gap-y-2 border-t border-line py-6 hover:text-accent focus-within:text-accent lg:py-8"
              >
                {award.year && (
                  <p className="col-span-full font-serif-italic text-section italic tabular-nums lg:col-span-3">
                    {award.year}
                  </p>
                )}
                <h3 className="col-span-full flex flex-col gap-1 lg:col-span-7 lg:col-start-4">
                  <span className="font-serif text-title">{name}</span>
                  {category && (
                    <span className="text-body text-muted group-hover:text-accent group-focus-within:text-accent">
                      {category}
                    </span>
                  )}
                </h3>
                <p className="col-span-full text-label font-medium uppercase tracking-credits text-muted group-hover:text-accent group-focus-within:text-accent lg:col-span-2 lg:col-start-11 lg:text-right">
                  {award.project}
                </p>
              </li>
            );
          })}
        </ol>

        <TrailerPlayer video={trailerVideo} />
      </div>
    </section>
  );
}
