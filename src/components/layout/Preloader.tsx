import { PRODUCER_NAME, PRODUCER_ROLE } from "@/lib/site";

// Script inline (roda antes do primeiro paint, ver app/layout.tsx) que
// decide se a claquete aparece: só na primeira visita da sessão e nunca com
// "reduzir movimento". Marca <html data-intro="on"> — o CSS em
// app/globals.css mostra o preloader e atrasa o nome do Hero. Qualquer
// tecla ou clique pula (data-intro="off" esconde na hora). Sem JS, ou se o
// sessionStorage estiver bloqueado, não há preloader.
export const INTRO_SCRIPT = `(function(){try{
var d=document.documentElement;
if(matchMedia("(prefers-reduced-motion: reduce)").matches||sessionStorage.getItem("intro"))return;
sessionStorage.setItem("intro","1");
d.dataset.intro="on";
var skip=function(){d.dataset.intro="off";off()};
var off=function(){removeEventListener("keydown",skip,true);removeEventListener("pointerdown",skip,true)};
addEventListener("keydown",skip,true);addEventListener("pointerdown",skip,true);
setTimeout(off,1200);
}catch(e){}})();`;

// Claquete de abertura, em CSS puro (Server Component, sem JS próprio):
// a haste bate, e a tela inteira sobe como uma cortina em 1,2 s. Fica
// escondida (display: none) até o script acima ligá-la. Decorativa
// (aria-hidden) — o conteúdo real já está renderizado por baixo, então o
// pôster do Hero (o LCP) é pintado e baixado normalmente durante a abertura.
export default function Preloader() {
  return (
    <div
      aria-hidden="true"
      className="preloader fixed inset-0 z-[80] flex-col items-center justify-center bg-foreground px-gutter text-white"
    >
      <div className="w-full max-w-sm">
        {/* Haste da claquete: listras diagonais pretas e brancas. */}
        <div className="clapper-arm h-6 bg-[repeating-linear-gradient(-45deg,#fff_0_14px,#0a0a0a_14px_28px)]" />
        <div className="mt-1 h-6 bg-[repeating-linear-gradient(45deg,#fff_0_14px,#0a0a0a_14px_28px)]" />
        {/* Quadro da claquete, com os "créditos" da abertura. */}
        <div className="grid grid-cols-2 border border-t-0 border-white/40 text-label uppercase tracking-credits">
          <div className="col-span-2 border-b border-white/40 p-4">
            <span className="block text-accent-on-dark">Produção</span>
            <span className="mt-1 block font-serif text-title normal-case tracking-normal">
              {PRODUCER_NAME}
            </span>
          </div>
          <div className="border-r border-white/40 p-4">
            <span className="block text-accent-on-dark">Cena</span>
            <span className="mt-1 block tabular-nums">01</span>
          </div>
          <div className="p-4">
            <span className="block text-accent-on-dark">Take</span>
            <span className="mt-1 block tabular-nums">01</span>
          </div>
          <div className="col-span-2 border-t border-white/40 p-4">{PRODUCER_ROLE}</div>
        </div>
      </div>
    </div>
  );
}
