import { awards } from "@/data/awards";
import { trailerVideo } from "@/data/videos";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import TrailerCard from "@/components/project/TrailerCard";

// Seção "Prêmios e Reconhecimentos": lista de prêmios à esquerda e o
// trailer do filme "Demônio de Maxwell" à direita, lado a lado.
// Server Component: só o card do trailer (TrailerCard) tem estado.
export default function AwardsWithTrailer() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-16 sm:py-14">
      {/* Grid com 2 colunas desiguais: lista de prêmios um pouco mais larga
          (1.1fr) que a coluna do trailer (0.9fr). */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col">
          <div className="mb-6 flex flex-col gap-3">
            <p className="text-xs font-medium uppercase tracking-widest text-accent">
              Reconhecimento
            </p>
            <h2 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
              Prêmios e Reconhecimentos
            </h2>
          </div>

          {/* Lista de prêmios: cada item é separado por uma linha fina no
              topo (border-t), estilo editorial, sem cards com fundo/borda
              arredondada. "flex-1" faz esta lista esticar para preencher
              a mesma altura da coluna do trailer ao lado. */}
          <RevealGroup stagger={0.08} className="flex flex-1 flex-col">
            {awards.map((award) => (
              <RevealItem
                key={award.id}
                className="flex flex-col gap-2 border-t border-black/8 py-5"
              >
                <h3 className="font-serif text-base font-medium leading-snug">
                  <span aria-hidden="true">🏆 </span>
                  {award.title}
                </h3>
                <p className="text-sm text-muted">{award.project}</p>
                {award.year && (
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                    {award.year}
                  </p>
                )}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <TrailerCard video={trailerVideo} />
      </div>
    </section>
  );
}
