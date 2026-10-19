import { behindTheScenesVideos } from "@/data/videos";
import SectionLabel from "@/components/layout/SectionLabel";
import { MaskReveal } from "@/components/motion/Reveal";
import VideoMosaic from "@/components/project/VideoMosaic";

// Seção 05 — Bastidores: direção de cena e depoimentos, num mosaico
// assimétrico (ver VideoMosaic.tsx) — ritmo diferente da lista + tela de
// Trabalhos, com o mesmo sistema de mídia e lightbox.
// Server Component: só o mosaico roda no navegador.
export default function BehindTheScenes() {
  return (
    <section id="bastidores" aria-labelledby="bastidores-titulo" className="pt-section">
      <div className="page-grid gap-y-12 lg:gap-y-20">
        <SectionLabel index={5} label="Bastidores" />
        <h2
          id="bastidores-titulo"
          className="col-span-full font-serif text-section lg:col-span-10 lg:col-start-3"
        >
          <MaskReveal>
            Direção de cena e <em>depoimentos</em>
          </MaskReveal>
        </h2>
        <VideoMosaic videos={behindTheScenesVideos} />
      </div>
    </section>
  );
}
