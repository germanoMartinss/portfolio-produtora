"use client";

import { useEffect } from "react";
import { setSmoothScroll } from "@/lib/smooth-scroll";
import { DURATION } from "@/lib/motion";

// Scroll suave com Lenis. Não renderiza nada: só liga o Lenis quando faz
// sentido, sem pesar no carregamento inicial:
// - só com mouse (pointer: fine) — no toque o scroll nativo já é suave e
//   o Lenis atrapalharia a inércia do sistema;
// - nunca com "reduzir movimento";
// - o pacote é importado sob demanda (chunk separado), depois que a página
//   fica ociosa, então não entra no JS inicial nem atrasa o LCP.
// O Lenis mantém o scroll nativo da janela (não usa transform), então
// position: sticky, âncoras e a busca do navegador continuam funcionando.
export default function SmoothScroll() {
  useEffect(() => {
    const canSmooth = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches;
    if (!canSmooth) return;

    let cancelled = false;
    let destroy = () => {};

    const start = () => {
      void import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        const lenis = new Lenis({ autoRaf: true });
        setSmoothScroll(lenis);

        // Links internos (#ancora): rolagem suave até o alvo e, no fim,
        // foco nele — o comportamento nativo de mover o foco (que o skip
        // link "Pular para o conteúdo" depende) seria perdido com o
        // preventDefault, então é refeito aqui.
        const onClick = (event: MouseEvent) => {
          if (event.defaultPrevented || event.button !== 0) return;
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
          const id = link?.hash.slice(1);
          const target = id ? document.getElementById(decodeURIComponent(id)) : null;
          if (!link || !target) return;

          event.preventDefault();
          history.pushState(null, "", link.hash);
          lenis.scrollTo(target, {
            duration: DURATION.slow,
            onComplete: () => {
              // tabIndex -1 deixa qualquer alvo focável (o <main> já tem).
              if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
              target.focus({ preventScroll: true });
            },
          });
        };
        document.addEventListener("click", onClick);

        destroy = () => {
          document.removeEventListener("click", onClick);
          setSmoothScroll(null);
          lenis.destroy();
        };
      });
    };

    // requestIdleCallback não existe no Safari: cai para um timeout curto.
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle
      ? window.requestIdleCallback(start, { timeout: 2000 })
      : setTimeout(start, 200);

    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(idle as number);
      else clearTimeout(idle);
      destroy();
    };
  }, []);

  return null;
}
