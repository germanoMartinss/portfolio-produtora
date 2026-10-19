"use client";

import { useEffect } from "react";

// Ilha client da seção Minha História (MyStory.tsx): não renderiza nada,
// só observa os marcadores invisíveis da seção e marca qual parágrafo está
// ativo (data-active). A troca visual (fade de 0,6 s, só no desktop) é CSS.
// IntersectionObserver em vez de animação ligada ao scroll: a troca acontece
// por tempo ao cruzar cada marco, então nunca fica um texto em opacidade
// parcial com a página parada.
export default function StoryObserver({ sectionId }: { sectionId: string }) {
  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    const markers = [...section.querySelectorAll<HTMLElement>("[data-story-marker]")];
    const steps = [...section.querySelectorAll<HTMLElement>("[data-story-step]")];
    const labels = [...section.querySelectorAll<HTMLElement>("[data-story-label]")];
    const fill = section.querySelector<HTMLElement>("[data-story-fill]");

    function activate(index: number) {
      steps.forEach((step, i) => (step.dataset.active = String(i === index)));
      labels.forEach((label, i) => (label.dataset.active = String(i === index)));
      // Linha do tempo: enche até o trecho do parágrafo ativo.
      if (fill) fill.style.transform = `scaleX(${(index + 1) / steps.length})`;
    }

    // Linha de referência a ~12% do topo (logo abaixo do Header, onde a
    // foto gruda): o marcador que a cruza define o parágrafo ativo. Os
    // marcadores só existem no desktop (display: none no resto), então no
    // celular nada muda — lá os parágrafos ficam todos visíveis.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) activate(markers.indexOf(entry.target as HTMLElement));
        }
      },
      { rootMargin: "-12% 0px -88% 0px" },
    );
    markers.forEach((marker) => observer.observe(marker));
    return () => observer.disconnect();
  }, [sectionId]);

  return null;
}
