"use client";

import { useEffect, useRef, useState } from "react";

// Cursor customizado: um círculo que segue o mouse e, sobre elementos com
// data-cursor="play" (vídeos), cresce e vira "Play".
// - Só existe com mouse de verdade (pointer: fine + hover): no toque não
//   há cursor, e nada no site depende dele (é só acabamento visual).
// - A seta nativa continua visível no resto da página; só some sobre os
//   vídeos, e só depois que este componente montou (classe
//   "has-custom-cursor" no <html>, ver app/globals.css).
// - A posição é aplicada direto no DOM (transform), sem re-render do React
//   a cada movimento do mouse.
// - Com "reduzir movimento", o círculo acompanha o mouse sem atraso.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Liga o cursor só em dispositivos com mouse (e acompanha mudanças, ex.:
  // tablet que recebe um mouse).
  useEffect(() => {
    const query = window.matchMedia("(pointer: fine) and (hover: hover)");
    const sync = () => setEnabled(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!enabled || !cursor) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Posição do mouse (alvo) e posição desenhada (que persegue o alvo).
    const target = { x: -100, y: -100 };
    const drawn = { x: -100, y: -100 };
    let frame = 0;

    const render = () => {
      // Interpolação: o círculo "flutua" atrás do mouse; sem ela com
      // movimento reduzido.
      const follow = reduced.matches ? 1 : 0.2;
      drawn.x += (target.x - drawn.x) * follow;
      drawn.y += (target.y - drawn.y) * follow;
      cursor.style.transform = `translate3d(${drawn.x}px, ${drawn.y}px, 0)`;
      const settled = Math.abs(target.x - drawn.x) < 0.1 && Math.abs(target.y - drawn.y) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      target.x = event.clientX;
      target.y = event.clientY;
      cursor.dataset.visible = "true";
      if (!frame) frame = requestAnimationFrame(render);
    };

    // Estado do cursor conforme o elemento sob o mouse: "play" sobre
    // vídeos, "link" sobre links/botões, "default" no resto.
    const onOver = (event: PointerEvent) => {
      const element = event.target as Element | null;
      if (element?.closest('[data-cursor="play"]')) cursor.dataset.state = "play";
      else if (element?.closest("a, button")) cursor.dataset.state = "link";
      else cursor.dataset.state = "default";
    };

    const onLeave = () => {
      cursor.dataset.visible = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    // O wrapper só se move (transform); o círculo dentro só escala — assim
    // as duas animações não brigam pela mesma propriedade.
    // mix-blend-difference fica no wrapper (o elemento "fixed" isola o
    // blend dos filhos): o círculo branco inverte o que está por baixo e
    // aparece tanto sobre o branco quanto sobre vídeos escuros. No estado
    // "play" o blend sai, para o círculo ficar branco e o texto legível.
    <div
      ref={cursorRef}
      aria-hidden="true"
      data-state="default"
      data-visible="false"
      className="group/cursor pointer-events-none fixed left-0 top-0 z-[70] opacity-0 mix-blend-difference transition-opacity duration-(--dur-fast) data-[state=play]:mix-blend-normal data-[visible=true]:opacity-100"
    >
      {/* Círculo de 88px desenhado em escala reduzida no estado normal (12px)
          — escalar para cima a partir de um círculo pequeno deixaria o
          texto "Play" borrado. */}
      <div className="flex h-[88px] w-[88px] -translate-x-1/2 -translate-y-1/2 scale-[0.136] items-center justify-center rounded-full bg-white transition-transform duration-(--dur-base) ease-cine group-data-[state=link]/cursor:scale-[0.45] group-data-[state=play]/cursor:scale-100">
        <span className="text-label font-medium uppercase tracking-credits text-black opacity-0 transition-opacity duration-(--dur-fast) group-data-[state=play]/cursor:opacity-100">
          Play
        </span>
      </div>
    </div>
  );
}
