import Hero from "@/components/sections/Hero";
import Awards from "@/components/sections/Awards";
import FeaturedWorks from "@/components/sections/FeaturedWorks";
import Brands from "@/components/sections/Brands";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Awards />
      <FeaturedWorks />
      <Brands />
    </main>
  );
}
