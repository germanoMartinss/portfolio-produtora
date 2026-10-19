// Folhas de um ramo do louro: [x, y, ângulo, comprimento], num quadro de
// 32×32. Calculadas ao longo da curva do ramo (o <path> abaixo): cada
// folha nasce no caule e aponta para a ponta, alternando para fora e para
// dentro, e diminui em direção ao topo.
const LEAVES = [
  [12.83, 28.65, -194.24, 5.2],
  [12.83, 28.65, -126.24, 4.16],
  [9.36, 26.32, -173.77, 4.75],
  [9.36, 26.32, -105.77, 3.8],
  [6.93, 22.93, -153.94, 4.3],
  [6.93, 22.93, -85.94, 3.44],
  [5.61, 18.61, -136.84, 3.85],
  [5.61, 18.61, -68.84, 3.08],
  [5.48, 13.53, -122.83, 3.4],
  [5.48, 13.53, -54.83, 2.72],
  [6.62, 7.82, -111.31, 2.95],
  [8, 4, -67.07, 3],
] as const;

// Um ramo: o caule e as folhas (cada folha é um "olho" com pontas finas).
function Branch() {
  return (
    <>
      <path
        d="M15.5 29.5C6 27.5 2.5 17 8 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {LEAVES.map(([x, y, angle, length]) => {
        const l = length * 1.2;
        const w = l * 0.38;
        return (
          <path
            key={`${x}-${angle}`}
            d={`M0 0Q${l / 2} ${-w} ${l} 0Q${l / 2} ${w} 0 0Z`}
            transform={`translate(${x} ${y}) rotate(${angle})`}
          />
        );
      })}
    </>
  );
}

// Louro de festival (os "laurels" dos cartazes de cinema), usado na lista
// de prêmios. Decorativo (aria-hidden): o nome do prêmio está no texto.
// Usa currentColor — fica preto e acompanha o azul da linha no hover.
// Dois ramos espelhados, desenhados duas vezes (sem <use>/id, para não
// repetir ids na página com vários louros).
export default function Laurel({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <Branch />
      <g transform="matrix(-1 0 0 1 32 0)">
        <Branch />
      </g>
    </svg>
  );
}
