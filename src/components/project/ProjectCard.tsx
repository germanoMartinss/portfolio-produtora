"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/project";
import ProjectGallery from "@/components/project/ProjectGallery";
import ProjectVideo from "@/components/project/ProjectVideo";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const number = String(index + 1).padStart(2, "0");
  const isReversed = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-16"
    >
      <div
        className={`flex flex-col gap-4 ${
          isReversed ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <div className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-8 left-0 select-none font-serif text-[7rem] leading-none text-foreground/5 sm:-top-10 sm:text-[9rem]"
          >
            {number}
          </span>
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-widest text-accent">
              Produção {number}
            </p>
            <div className="mt-3 mb-4 h-px w-12 bg-accent" />
            <h3 className="font-serif text-3xl font-medium sm:text-4xl">
              {project.title}
            </h3>
            {project.year && (
              <p className="mt-1 text-sm text-muted">{project.year}</p>
            )}
          </div>
        </div>
        <p className="text-sm text-muted">
          <span className="text-accent">Produtora:</span> {project.producer}
        </p>
        <p className="text-base leading-relaxed text-muted">
          <span className="text-sm text-accent">Descrição:</span>{" "}
          {project.description}
        </p>
        <ProjectVideo videoUrl={project.videoUrl} />
      </div>

      <div className={isReversed ? "lg:order-1" : "lg:order-2"}>
        <ProjectGallery images={project.images} title={project.title} />
      </div>
    </motion.article>
  );
}
