"use client";

import { useEffect } from "react";

// Ilha client da seção Minha História (MyStory.tsx): não renderiza nada,
// só acompanha os marcos de rolagem da seção e marca qual parágrafo está
// ativo (data-active). A troca visual (fade de 0,6 s, só no desktop) é CSS.
// Troca por tempo ao cruzar cada marco (e não animação ligada ao scroll):
// nunca fica um texto em opacidade parcial com a página parada.
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

    // Linha de referência a 12% do topo (logo abaixo do Header, onde a foto
    // gruda). O parágrafo ativo é calculado pela POSIÇÃO do trilho em
    // relação a essa linha — e não por "qual marcador avisou": num salto
    // (tecla End, link de âncora, rolagem muito rápida) a linha pode passar
    // por cima de todos os marcadores sem nenhum deles avisar.
    // Os marcadores só existem no desktop (display: none no resto), então
    // no celular nada muda — lá os parágrafos ficam todos visíveis.
    let current = -1;
    function update() {
      const top = markers[0];
      const step = top?.offsetHeight ?? 0;
      if (!step) return;
      const offset = window.innerHeight * 0.12 - top.getBoundingClientRect().top;
      const index = Math.min(markers.length - 1, Math.max(0, Math.floor(offset / step)));
      if (index !== current) {
        current = index;
        activate(index);
      }
    }

    // O IntersectionObserver diz quando o trilho está na tela; só enquanto
    // ele está, um listener de scroll passivo (um cálculo por quadro, via
    // requestAnimationFrame) atualiza o parágrafo. Avisos do observer
    // sozinhos (por marcador ou por limiar) deixam saltos sem cobertura; o
    // scroll fora da seção não custa nada.
    let frame = 0;
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };
    const rail = markers[0]?.parentElement;
    const observer = new IntersectionObserver(([entry]) => {
      update();
      if (entry.isIntersecting) window.addEventListener("scroll", onScroll, { passive: true });
      else window.removeEventListener("scroll", onScroll);
    });
    if (rail) observer.observe(rail);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [sectionId]);

  return null;
}
