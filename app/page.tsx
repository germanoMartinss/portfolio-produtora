import Hero from "@/components/sections/Hero";
import FeaturedVideos from "@/components/sections/FeaturedVideos";
import AwardsWithTrailer from "@/components/sections/AwardsWithTrailer";
import MyStory from "@/components/sections/MyStory";
import BehindTheScenes from "@/components/sections/BehindTheScenes";
import Brands from "@/components/sections/Brands";

// Página inicial (rota "/"). Só monta as seções na ordem em que devem
// aparecer na home — cada seção é um componente independente em
// src/components/sections/.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <FeaturedVideos />
      <AwardsWithTrailer />
      <MyStory />
      <BehindTheScenes />
      <Brands />
    </main>
  );
}
