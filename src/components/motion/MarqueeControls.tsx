"use client";

import { useState } from "react";

// Controle do marquee de marcas (ilha client mínima): envolve as fileiras
// (vindas do servidor como children) e oferece o botão "Pausar marcas".
// O movimento em si é CSS (classes marquee-* em app/globals.css); este
// componente só liga data-paused, que pausa as animações.
// Movimento automático com mais de 5 s precisa de um jeito de pausar
// (WCAG 2.2.2) — pausar no hover não atende teclado nem toque. Com
// "reduzir movimento" as fileiras viram uma grade parada e o botão some
// (motion-reduce:hidden).
// aria-pressed: o rótulo fica fixo ("Pausar marcas") e o estado é
// anunciado como "pressionado" / "não pressionado".
export default function MarqueeControls({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);

  return (
    <div data-paused={paused} className="marquee-area flex flex-col gap-6">
      <div className="px-gutter">
        <button
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
          className="marquee-toggle flex min-h-11 motion-reduce:hidden items-center gap-3 text-label font-medium uppercase tracking-credits text-white focus-visible:outline-white"
        >
          {/* Ícone de estado: duas barras (tocando) ou triângulo (pausado). */}
          <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center border border-line-on-dark">
            {paused ? (
              <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="currentColor">
                <path d="M2 1l7 4-7 4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="currentColor">
                <path d="M2 1h2v8H2zM6 1h2v8H6z" />
              </svg>
            )}
          </span>
          Pausar marcas
        </button>
      </div>
      {children}
    </div>
  );
}
