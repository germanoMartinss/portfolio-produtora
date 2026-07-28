// Curvas decorativas de fundo, orgânicas, espalhadas ao longo de toda a
// extensão da página. Todas seguem o mesmo padrão: cor, espessura e opacidade
// consistentes, com os traços sempre começando/terminando além dos limites do
// contêiner (que por sua vez extrapola a viewport), para nunca mostrar uma
// ponta solta na tela. Posicionadas em absolute (relativo ao <body>, que já é
// position:relative) para acompanhar a rolagem, com z-index negativo para
// ficarem sempre atrás do conteúdo.
const STROKE_STYLE = {
  stroke: "var(--deco-terracota)",
  strokeWidth: 2,
  opacity: 0.4,
} as const;

export default function BackgroundDecoration() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Curva atrás do Hero, visível em todas as telas */}
      <svg
        className="absolute -top-32 -left-[15%] h-[90vh] w-[130vw] max-w-none sm:h-[100vh]"
        viewBox="0 0 1600 1000"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M -150 350 C 250 100, 550 550, 850 300 S 1350 80, 1750 380"
          {...STROKE_STYLE}
        />
      </svg>

      {/* Curva entre o Hero e a lista de projetos */}
      <svg
        className="absolute top-[55vh] -left-[15%] h-[65vh] w-[130vw] max-w-none"
        viewBox="0 0 1600 900"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M -150 700 C 300 850, 650 300, 950 500 S 1450 200, 1750 350"
          {...STROKE_STYLE}
        />
      </svg>

      {/* Curva larga, primeiros projetos */}
      <svg
        className="absolute top-[115vh] -left-[15%] h-[70vh] w-[130vw] max-w-none"
        viewBox="0 0 1600 900"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M -150 500 C 250 150, 650 800, 1000 400 S 1450 200, 1750 450"
          {...STROKE_STYLE}
        />
      </svg>

      {/* Curva discreta, apenas em telas médias/grandes */}
      <svg
        className="absolute top-[185vh] -left-[15%] hidden h-[55vh] w-[130vw] max-w-none sm:block"
        viewBox="0 0 1600 800"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M -150 200 C 250 500, 550 50, 850 350 S 1350 600, 1750 300"
          {...STROKE_STYLE}
        />
      </svg>

      {/* Curva entre projetos, meio da página */}
      <svg
        className="absolute top-[245vh] -left-[15%] h-[65vh] w-[130vw] max-w-none"
        viewBox="0 0 1600 850"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M -150 400 C 250 700, 600 100, 950 450 S 1400 700, 1750 350"
          {...STROKE_STYLE}
        />
      </svg>

      {/* Curva final, perto do rodapé, apenas em telas grandes */}
      <svg
        className="absolute top-[305vh] -left-[15%] hidden h-[70vh] w-[130vw] max-w-none lg:block"
        viewBox="0 0 1600 900"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M -150 450 C 300 150, 700 750, 1000 400 S 1500 550, 1750 250"
          {...STROKE_STYLE}
        />
      </svg>
    </div>
  );
}
