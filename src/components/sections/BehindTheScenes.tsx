import { behindTheScenesVideos } from "@/data/videos";
import VideoGallery from "@/components/project/VideoGallery";

// Seção "Direção de Cena e Depoimentos": mesmo padrão visual de card da
// seção FeaturedVideos, mas contida em max-w-6xl (não full-bleed) —
// diferença intencional entre as duas seções de vídeo da home.
export default function BehindTheScenes() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-16 sm:py-14">
      <div className="mb-10 flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">
          Bastidores
        </p>
        <h2 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          Direção de Cena e Depoimentos
        </h2>
      </div>

      <VideoGallery
        videos={behindTheScenesVideos}
        className="grid grid-cols-1 gap-2 sm:grid-cols-3"
      />
    </section>
  );
}
