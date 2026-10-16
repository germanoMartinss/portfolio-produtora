import { featuredVideos } from "@/data/videos";
import VideoGallery from "@/components/project/VideoGallery";

// Seção "Vídeos em Destaque": grid de 3 vídeos com marcas grandes.
// id="trabalhos" é o alvo de âncoras internas do site (ex.: um link
// "ver trabalhos" em outra seção poderia apontar para #trabalhos).
// Server Component: só o grid (VideoGallery) roda no navegador.
export default function FeaturedVideos() {
  return (
    <section id="trabalhos" className="w-full px-6 py-8 sm:py-14">
      {/* Cabeçalho centralizado da seção. */}
      <div className="mx-auto mb-10 flex max-w-xl flex-col items-center gap-3 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">
          Vídeos em Destaque
        </p>
        <h2 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          Trabalhos com Grandes Marcas
        </h2>
      </div>

      {/* Grid full-bleed: 1 coluna no mobile, 3 colunas a partir de "sm". */}
      <VideoGallery
        videos={featuredVideos}
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        sizes="(min-width: 640px) 33vw, 100vw"
      />
    </section>
  );
}
