import Image from "next/image";
import SectionLabel from "@/components/layout/SectionLabel";
import { MaskReveal } from "@/components/motion/Reveal";
import { story } from "@/data/about";
import { PRODUCER_NAME } from "@/lib/site";

const number = (index: number) => String(index + 1).padStart(2, "0");

// Seção 04 — Minha História: narrativa em scroll. Server Component sem
// JavaScript: as transições são CSS ligado ao scroll (classes story-* em
// app/globals.css), só no desktop.
// - Desktop (lg): foto sticky na coluna da esquerda enquanto os 3
//   parágrafos passam à direita, cada um numa "tela" de rolagem; uma linha
//   do tempo fina sob a foto (01/02/03) enche conforme a leitura avança.
// - Celular/tablet: tudo empilhado, sem sticky e sem animação.
export default function MyStory() {
  return (
    <section id="historia" aria-labelledby="historia-titulo" className="pt-section">
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

        {/* Subgrid com as duas colunas. O sticky que não grudava no layout
            antigo: a coluna de texto tinha a mesma altura da foto, então
            não sobrava espaço para ela "andar". Agora cada parágrafo ocupa
            ~85% da altura da tela (lg:min-h), a coluna de texto fica bem
            mais alta que a foto e o sticky funciona. "self-start" é
            obrigatório: esticada na altura da linha (padrão do grid), a
            coluna da foto não teria para onde grudar. */}
        <div className="story col-span-full grid grid-cols-subgrid gap-y-10">
          {/* Tablet (md): 8 das 12 colunas — na largura toda, a foto 3:4
              passaria de 900px de altura. */}
          <div className="col-span-full md:col-span-8 lg:sticky lg:top-[calc(var(--gutter)+3.5rem)] lg:col-span-5 lg:self-start">
            {/* No desktop a largura é limitada pela altura da tela (3:4 →
                largura = 75% da altura disponível), para a foto inteira e
                a linha do tempo caberem na tela enquanto grudam. */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/5 lg:max-w-[calc((100svh-var(--gutter)-10rem)*0.75)]">
              <Image
                src="/images/bruna-hero-pb.jpeg"
                alt={`${PRODUCER_NAME} em um set de filmagem, em preto e branco, olhando para cima sob a luz de um softbox enquanto segura a embalagem de um produto.`}
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 66vw, 100vw"
                className="object-cover"
              />
            </div>

            {/* Linha do tempo: decorativa (os números também aparecem em
                cada parágrafo). Escondida onde o scroll-driven não existe
                — parada, não diria nada. */}
            <div
              aria-hidden="true"
              className="story-progress mt-6 lg:max-w-[calc((100svh-var(--gutter)-10rem)*0.75)]"
            >
              <div className="relative h-px bg-line">
                <div className="story-progress-fill absolute inset-0 origin-left bg-accent" />
              </div>
              <div className="mt-3 flex justify-between text-label font-medium tracking-credits tabular-nums">
                {story.map((_, index) => (
                  <span key={index}>{number(index)}</span>
                ))}
              </div>
            </div>
          </div>

          <ol className="story-steps col-span-full flex flex-col gap-12 lg:col-span-6 lg:col-start-7 lg:gap-0">
            {story.map((paragraph, index) => (
              <li key={index} className="lg:flex lg:min-h-[85svh] lg:items-center">
                <div className="story-step flex flex-col gap-4">
                  <span className="text-label font-medium uppercase tracking-credits text-accent tabular-nums">
                    {number(index)}
                  </span>
                  <p className="text-lead">{paragraph}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
