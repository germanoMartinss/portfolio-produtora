import Image from "next/image";
import SectionLabel from "@/components/layout/SectionLabel";
import { MaskReveal } from "@/components/motion/Reveal";
import StoryObserver from "@/components/sections/StoryObserver";
import { story } from "@/data/about";
import { PRODUCER_NAME } from "@/lib/site";

const number = (index: number) => String(index + 1).padStart(2, "0");

// Altura de rolagem de cada parágrafo no desktop (marcadores abaixo).
const STEP = "55svh";

// Seção 04 — Minha História: narrativa em scroll.
// - Desktop (lg): foto e texto ficam juntos num "palco" sticky; os 3
//   parágrafos ocupam o MESMO lugar ao lado da foto e trocam com fade
//   (0,6 s) quando a rolagem cruza cada marco — o visitante nunca vê espaço
//   vazio entre eles. A seção mantém a altura de rolagem (3 × 55% da tela)
//   para dar o ritmo. A linha 01/02/03 sob a foto marca o parágrafo ativo.
// - Celular/tablet: tudo empilhado, todos os parágrafos visíveis.
// Server Component: só o StoryObserver (que marca o ativo) roda no navegador.
export default function MyStory() {
  return (
    <section id="historia" aria-labelledby="historia-titulo" className="pt-section">
      <StoryObserver sectionId="historia" />
      {/* Sem JavaScript, os parágrafos não trocariam: volta tudo a ser
          visível, empilhado. */}
      <noscript
        dangerouslySetInnerHTML={{
          __html:
            "<style>[data-story-step]{grid-area:auto!important;opacity:1!important}[data-story-marker],[data-story-progress]{display:none!important}</style>",
        }}
      />
      <div className="page-grid gap-y-12 lg:gap-y-20">
        <SectionLabel index={4} label="História" />
        <h2
          id="historia-titulo"
          className="col-span-full font-serif text-section lg:col-span-10 lg:col-start-3"
        >
          <MaskReveal>
            Minha <em>história</em>
          </MaskReveal>
        </h2>

        {/* Trilho de rolagem: o palco (sticky) + um espaçador com a altura
            de 3 passos. O palco fica grudado enquanto o espaçador passa. Os
            marcadores (absolutos, a cada 55svh a partir do topo do trilho)
            coincidem com o trecho em que o palco está grudado: cada
            parágrafo ganha o mesmo tanto de rolagem. */}
        <div className="relative col-span-full grid grid-cols-subgrid">
          {story.map((_, index) => (
            <div
              key={index}
              data-story-marker
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 hidden lg:block"
              style={{ top: `calc(${STEP} * ${index})`, height: STEP }}
            />
          ))}

          {/* Palco: foto + texto. "self-start" + sticky: grudado logo
              abaixo do Header; items-center centraliza o parágrafo na
              altura da foto. */}
          <div className="col-span-full grid grid-cols-subgrid gap-y-10 lg:sticky lg:top-[calc(var(--gutter)+3.5rem)] lg:items-center lg:self-start">
            {/* Tablet (md): 8 das 12 colunas — na largura toda, a foto 3:4
                passaria de 900px de altura. */}
            <div className="col-span-full md:col-span-8 lg:col-span-5">
              {/* No desktop a largura é limitada pela altura da tela (3:4 →
                  largura = 75% da altura disponível), para o palco inteiro
                  caber na tela enquanto gruda. */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/5 lg:max-w-[calc((100svh-var(--gutter)-10rem)*0.75)]">
                <Image
                  src="/images/bruna-hero-pb.jpeg"
                  alt={`${PRODUCER_NAME} em um set de filmagem, em preto e branco, olhando para cima sob a luz de um softbox enquanto segura a embalagem de um produto.`}
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 66vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Linha do tempo (desktop): decorativa — os números também
                  estão em cada parágrafo. O trecho do parágrafo ativo fica
                  azul (scaleX) e o número dele, preto; os outros, cinza
                  (#6b6b6b, AA). */}
              <div
                data-story-progress
                aria-hidden="true"
                className="mt-6 hidden lg:block lg:max-w-[calc((100svh-var(--gutter)-10rem)*0.75)]"
              >
                <div className="relative h-px bg-line">
                  <div
                    data-story-fill
                    className="absolute inset-0 origin-left bg-accent transition-transform duration-(--dur-base) ease-cine"
                    style={{ transform: `scaleX(${1 / story.length})` }}
                  />
                </div>
                <div className="mt-3 grid grid-cols-3 text-label font-medium tracking-credits tabular-nums">
                  {story.map((_, index) => (
                    <span
                      key={index}
                      data-story-label
                      data-active={index === 0}
                      className="text-muted data-[active=true]:text-foreground"
                    >
                      {number(index)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Parágrafos. No desktop ficam todos na mesma célula do grid
                (empilhados) e só o ativo aparece; a troca é um fade de
                opacidade (com "reduzir movimento", instantânea). Os
                inativos continuam no HTML e acessíveis a leitores de tela. */}
            <ol className="col-span-full flex flex-col gap-12 lg:col-span-6 lg:col-start-7 lg:grid">
              {story.map((paragraph, index) => (
                <li
                  key={index}
                  data-story-step
                  data-active={index === 0}
                  className="flex flex-col gap-4 lg:[grid-area:1/1] lg:opacity-0 lg:transition-opacity lg:duration-(--dur-base) lg:ease-cine lg:data-[active=true]:opacity-100"
                >
                  {/* Número maior e semibold: em 12px o azul ficava quase
                      invisível (passava no AA, mas sumia na leitura). */}
                  <span className="text-body font-semibold text-accent tabular-nums">
                    {number(index)}
                  </span>
                  <p className="text-lead">{paragraph}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Espaçador (desktop): a altura de rolagem dos 3 passos. */}
          <div
            aria-hidden="true"
            className="col-span-full hidden lg:block"
            style={{ height: `calc(${STEP} * ${story.length})` }}
          />
        </div>
      </div>
    </section>
  );
}
