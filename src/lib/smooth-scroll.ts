import type Lenis from "lenis";

// Referência à instância do Lenis (scroll suave), criada pelo SmoothScroll.tsx
// só em dispositivos com mouse e sem "reduzir movimento". Fica num módulo à
// parte para que outros componentes (ex.: o VideoLightbox) possam pausar o
// scroll sem importar o Lenis — o "import type" acima some no build.
let instance: Lenis | null = null;

export function setSmoothScroll(lenis: Lenis | null) {
  instance = lenis;
}

// Pausa/retoma o scroll suave (ex.: com um modal aberto, para a roda do
// mouse não rolar a página por trás). Sem Lenis ativo, não faz nada.
export function pauseSmoothScroll() {
  instance?.stop();
}

export function resumeSmoothScroll() {
  instance?.start();
}
