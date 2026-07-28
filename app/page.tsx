import Hero from "@/components/sections/Hero";
import ProjectsList from "@/components/sections/ProjectsList";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <ProjectsList />
    </main>
  );
}
