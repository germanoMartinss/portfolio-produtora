// Paleta de cores de destaque usada em vários componentes (Awards,
// WorkCard, FeaturedWorks...) através da função accentForIndex. Hoje tem
// só uma entrada (azul) — a página não usa mais rosa como cor de destaque.
// Cada variante do objeto é um conjunto de classes Tailwind prontas para
// diferentes usos: fundo sólido, fundo suave, borda, badge/tag e barra.
export const ACCENT_PALETTE = [
  {
    solid: "bg-accent-blue text-white",
    soft: "bg-accent-blue/15",
    border: "border-accent-blue/70",
    tag: "bg-accent-blue/90 text-white",
    bar: "bg-accent-blue",
  },
] as const;

// Retorna uma variante da paleta com base num índice (ex.: posição de um
// item numa lista). Como só existe uma cor hoje, sempre retorna a mesma —
// mas a função continua útil caso outra cor de destaque seja adicionada
// no futuro (o "% length" faz a alternância automaticamente).
export function accentForIndex(index: number) {
  return ACCENT_PALETTE[index % ACCENT_PALETTE.length];
}
