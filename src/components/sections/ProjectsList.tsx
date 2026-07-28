import { projects } from "@/data/projects";
import ProjectCard from "@/components/project/ProjectCard";

export default function ProjectsList() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-28 sm:px-12">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </section>
  );
}
