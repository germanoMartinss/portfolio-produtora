// Tokens de movimento para o framer-motion. ESPELHAM os de app/globals.css
// (--ease-cine, --dur-*): o framer-motion não lê variáveis CSS, então os
// valores ficam duplicados aqui — ao mudar um lado, mude o outro.
//
// Movimento reduzido não precisa de tratamento aqui: o MotionConfig
// reducedMotion="user" (MotionProvider.tsx) já desliga deslocamento e
// escala, e os componentes que fazem algo além disso (parallax, marquee,
// scroll suave) checam a preferência por conta própria.

// Curvas de easing (cubic-bezier) — iguais a --ease-cine e --ease-cine-in-out.
export const EASE = {
  // Desaceleração longa: revelações, entradas, máscaras.
  cine: [0.16, 1, 0.3, 1],
  // Começa e termina parado: cortinas, trocas de estado, preloader.
  cineInOut: [0.65, 0, 0.35, 1],
} as const;

// Durações em segundos — iguais a --dur-fast/base/slow/reveal.
export const DURATION = {
  fast: 0.2,
  base: 0.6,
  slow: 1,
  reveal: 1.2,
} as const;

// Atraso entre itens de uma lista que entra em cascata.
export const STAGGER = {
  tight: 0.06,
  base: 0.1,
} as const;

// Viewport padrão das entradas por scroll: dispara uma vez, quando 20% do
// elemento está visível.
export const VIEWPORT = { once: true, amount: 0.2 } as const;

// Transições prontas, para não repetir { duration, ease } nos componentes.
export const TRANSITION = {
  fast: { duration: DURATION.fast, ease: EASE.cine },
  base: { duration: DURATION.base, ease: EASE.cine },
  slow: { duration: DURATION.slow, ease: EASE.cine },
  reveal: { duration: DURATION.reveal, ease: EASE.cine },
} as const;
