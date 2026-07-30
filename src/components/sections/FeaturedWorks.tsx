"use client";

import { useState } from "react";
import { works } from "@/data/works";
import { Work } from "@/types/project";
import WorkCard from "@/components/project/WorkCard";
import VideoLightbox from "@/components/project/VideoLightbox";

export default function FeaturedWorks() {
  const [activeWork, setActiveWork] = useState<Work | null>(null);

  const featuredWorks = works.filter((work) => work.featured);
  const otherWorks = works.filter((work) => !work.featured);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-12 sm:py-14">
      <div className="mb-6 flex flex-col gap-3">
        <span className="h-1.5 w-12 rounded-full bg-accent-blue" aria-hidden="true" />
        <p className="text-xs font-medium uppercase tracking-widest text-accent">
          Portfólio
        </p>
        <h2 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          Trabalhos em Destaque
        </h2>
      </div>

      {featuredWorks.length > 0 && (
        <div className="mb-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          {featuredWorks.map((work, index) => (
            <WorkCard
              key={work.id}
              work={work}
              size="large"
              accentIndex={index}
              onOpen={setActiveWork}
            />
          ))}
        </div>
      )}

      {otherWorks.length > 0 && (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {otherWorks.map((work) => (
            <WorkCard
              key={work.id}
              work={work}
              size="compact"
              onOpen={setActiveWork}
            />
          ))}
        </div>
      )}

      {activeWork && (
        <VideoLightbox
          embedUrl={activeWork.videoEmbedUrl ?? activeWork.videoSrc ?? ""}
          title={activeWork.title}
          onClose={() => setActiveWork(null)}
        />
      )}
    </section>
  );
}
