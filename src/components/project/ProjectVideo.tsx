"use client";

import { useEffect, useRef, useState } from "react";

interface ProjectVideoProps {
  videoUrl: string;
}

export default function ProjectVideo({ videoUrl }: ProjectVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full overflow-hidden rounded-lg bg-black/5"
    >
      {isVisible ? (
        <iframe
          src={videoUrl}
          title="Vídeo do projeto"
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex animate-pulse items-center justify-center">
          <span className="text-sm text-muted">Carregando vídeo...</span>
        </div>
      )}
    </div>
  );
}
