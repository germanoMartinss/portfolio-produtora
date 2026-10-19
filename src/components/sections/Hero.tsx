import Image from "next/image";
import HeroVideo from "@/components/sections/HeroVideo";
import { PRODUCER_LOCATION, PRODUCER_NAME, PRODUCER_ROLE } from "@/lib/site";

// Separa "Bruna Rodriguez" em primeiro nome / sobrenome: cada um vira uma
// linha do nome monumental, revelada por máscara (ver <h1> abaixo).
const [firstName, ...restName] = PRODUCER_NAME.split(" ");
const lastName = restName.join(" ");

// Marcas de canto de visor de câmera (decorativas), uma por canto.
const VIEWFINDER = [
  "left-gutter top-[calc(var(--gutter)+2.75rem)] border-l border-t",
  "right-gutter top-[calc(var(--gutter)+2.75rem)] border-r border-t",
  "left-gutter bottom-gutter border-b border-l",
  "right-gutter bottom-gutter border-b border-r",
];

// Abertura da home: o "plano de abertura" do filme. Vídeo P&B em tela cheia,
// nome monumental no canto inferior esquerdo, REC/timecode no canto
// superior direito, marcas de visor nos cantos e o convite para rolar.
// Server Component: só o vídeo (HeroVideo) roda no navegador. O efeito de
// scroll (o quadro encolhe e escurece ao sair da tela) é CSS puro: classes
// hero / hero-stage / hero-veil em app/globals.css.
export default function Hero() {
  return (
    // h-svh: altura da tela visível no celular (sem pular quando a barra do
    // navegador some). Fundo branco: quando o palco encolhe no scroll, a
    // borda que aparece em volta é a própria página.
    <section className="hero relative h-svh min-h-[560px] w-full bg-background">
      {/* Palco: tudo que encolhe junto no scroll (vídeo, nome, créditos) —
          o nome fica dentro para nunca cair sobre a borda branca. */}
      <div className="hero-stage absolute inset-0 overflow-hidden bg-black">
        {/* "animate-hero-in": fade + leve zoom de entrada, em CSS (ver
            app/globals.css) para não atrasar o LCP esperando o JS. */}
        <div className="absolute inset-0 animate-hero-in">
          {/* Primeiro quadro do vídeo como imagem estática, por baixo dele:
              aparece enquanto o vídeo carrega (é o elemento LCP da página)
              e fica no lugar do vídeo quando ele está pausado (movimento
              reduzido). Única imagem do site com "preload" (Next 16 —
              substitui o antigo "priority"). Decorativa, como o vídeo. */}
          <Image
            src="/images/hero-poster.jpg"
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover grayscale contrast-[1.08]"
          />
          <HeroVideo
            src="/video/video-prod.mp4"
            className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.08]"
          />
          {/* Gradiente inferior: garante a leitura do nome e dos créditos. */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/75" />
        </div>

        {VIEWFINDER.map((position) => (
          <span
            key={position}
            aria-hidden="true"
            className={`pointer-events-none absolute h-5 w-5 border-white/70 ${position}`}
          />
        ))}

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-8 px-gutter pb-[calc(var(--gutter)+1.5rem)] text-white">
          {/* Nome monumental, revelado linha a linha: cada linha sobe de
              dentro de uma máscara (overflow-hidden) — animação "hero-line"
              em CSS. O py/-my negativo dá folga para a máscara não cortar
              acentos e descendentes (o "g" de Rodriguez) com o line-height apertado.
              Contraste de pesos: primeiro nome leve, sobrenome mais pesado.
              O espaço entre as linhas mantém o nome acessível como
              "Bruna Rodriguez". */}
          <h1 className="font-serif text-monument">
            <span className="-mb-[0.25em] -mt-[0.1em] block overflow-hidden pb-[0.25em] pt-[0.1em]">
              <span
                className="hero-line block font-light"
                style={{ "--line-delay": "0.15s" } as React.CSSProperties}
              >
                {firstName}
              </span>
            </span>{" "}
            <span className="-mb-[0.25em] -mt-[0.1em] block overflow-hidden pb-[0.25em] pt-[0.1em]">
              <span
                className="hero-line block font-medium"
                style={{ "--line-delay": "0.3s" } as React.CSSProperties}
              >
                {lastName}
              </span>
            </span>
          </h1>

          {/* Linha de créditos: função/cidades à esquerda, convite para rolar
              à direita (link para os trabalhos, com alvo de toque ≥ 44px). */}
          <div className="flex items-end justify-between gap-6 text-label font-medium uppercase tracking-credits">
            {/* No celular, função e cidades em duas linhas (em uma só, a
                quebra caía no meio de "São Paulo"); a barra só aparece
                quando cabem lado a lado. */}
            <p className="flex flex-col gap-1 sm:flex-row sm:gap-0">
              <span>{PRODUCER_ROLE}</span>
              <span aria-hidden="true" className="mx-3 hidden sm:inline">
                /
              </span>{" "}
              <span>{PRODUCER_LOCATION}</span>
            </p>
            <a
              href="#trabalhos"
              className="flex min-h-11 shrink-0 items-center gap-3 focus-visible:outline-white"
            >
              <span>
                Role<span className="sr-only"> até os trabalhos</span>
              </span>
              <span aria-hidden="true" className="scroll-cue block h-10 w-px bg-white/30" />
            </a>
          </div>
        </div>
        {/* Véu preto que escurece o quadro no scroll (opacidade 0 → 0,65). */}
        <div aria-hidden="true" className="hero-veil pointer-events-none absolute inset-0 bg-black opacity-0" />
      </div>
    </section>
  );
}
