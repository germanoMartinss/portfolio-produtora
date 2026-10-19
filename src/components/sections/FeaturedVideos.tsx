import { featuredVideos } from "@/data/videos";
import SectionLabel from "@/components/layout/SectionLabel";
import { MaskReveal } from "@/components/motion/Reveal";
import WorkList from "@/components/project/WorkList";

// Seção 01 — Trabalhos: lista tipográfica com os vídeos para grandes marcas
// (ver WorkList.tsx). id="trabalhos" é o alvo do link do Header e do
// "Role" do Hero.
// Server Component: só a lista (WorkList) roda no navegador.
export default function FeaturedVideos() {
  return (
    <section id="trabalhos" aria-labelledby="trabalhos-titulo" className="pt-section">
      {/* Composição do page-grid (a partir de lg): rótulo de crédito nas 2
          colunas da esquerda, título a partir da coluna 3; a lista ocupa as
          12 colunas (subgrid), para o número de cada linha cair na coluna
          do rótulo. Abaixo de lg, tudo empilhado na largura toda. */}
      <div className="page-grid gap-y-12 lg:gap-y-20">
        <SectionLabel index={1} label="Trabalhos" className="col-span-full lg:col-span-2 lg:pt-[0.9em]" />
        <h2
          id="trabalhos-titulo"
          className="col-span-full font-serif text-section lg:col-span-10 lg:col-start-3"
        >
          <MaskReveal>
            Trabalhos com grandes <em>marcas</em>
          </MaskReveal>
        </h2>
        <WorkList videos={featuredVideos} />
      </div>
    </section>
  );
}
