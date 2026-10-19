import Image from "next/image";
import SectionLabel from "@/components/layout/SectionLabel";
import { bio, highlights } from "@/data/about";
import { BioSegment } from "@/types/project";

// Faixa do scroll (em % da passagem do bloco pela tela, "cover") em que a
// bio vai do cinza ao preto: a primeira palavra começa a escurecer quando o
// bloco já subiu 8% e a última termina aos 50% — a "leitura" acontece
// enquanto o texto atravessa a metade de baixo da tela.
const REVEAL_START = 8;
const REVEAL_END = 50;
// Cada palavra leva o tempo de ~4 palavras para escurecer: as faixas se
// sobrepõem e o preto "escorre" pelo texto em vez de piscar palavra a palavra.
const WORD_SPAN = 4;

const TOTAL_WORDS = bio
  .flat()
  .reduce((total, segment) => total + textOf(segment).split(/\s+/).filter(Boolean).length, 0);

function textOf(segment: BioSegment) {
  return typeof segment === "string" ? segment : segment.strong;
}

// Parágrafos da bio. Com "words", cada palavra vira um <span> com a sua
// faixa de scroll (--a/--b) — usado só na camada de cima (preta). Os
// espaços ficam fora dos spans, então as duas camadas quebram as linhas
// exatamente nos mesmos lugares.
function BioText({ words = false }: { words?: boolean }) {
  let index = 0;
  const step = (REVEAL_END - REVEAL_START) / TOTAL_WORDS;

  const renderText = (text: string) =>
    !words
      ? text
      : text.split(/(\s+)/).map((part, i) => {
          if (!part.trim()) return part;
          const start = REVEAL_START + index * step;
          const end = Math.min(REVEAL_END, start + step * WORD_SPAN);
          index += 1;
          return (
            <span
              key={i}
              className="bio-word"
              style={
                {
                  "--a": `cover ${start.toFixed(2)}%`,
                  "--b": `cover ${end.toFixed(2)}%`,
                } as React.CSSProperties
              }
            >
              {part}
            </span>
          );
        });

  return bio.map((paragraph, p) => (
    <p key={p}>
      {paragraph.map((segment, s) =>
        typeof segment === "string" ? (
          <span key={s}>{renderText(segment)}</span>
        ) : (
          // Nome de marca: negrito, sem cor.
          <strong key={s} className="font-semibold">
            {renderText(segment.strong)}
          </strong>
        ),
      )}
    </p>
  ));
}

// Seção 02 — Sobre. Server Component sem JavaScript: todas as animações
// (bio palavra a palavra, contagem dos números) são CSS ligado ao scroll
// (ver app/globals.css). Composição em lg, tudo na mesma linha do rótulo:
// foto nas colunas 3–7 com o título "recortado" sobre a borda de cima; bio
// nas colunas 8–12, alinhada à base da foto; números abaixo, a partir da
// coluna 3. (Os row-start-1 explícitos impedem o auto-placement de jogar a
// bio para uma linha nova.)
export default function Bio() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="py-section">
      <div className="page-grid gap-y-12 lg:gap-y-20">
        <SectionLabel index={2} label="Sobre" />

        {/* Foto com o título atravessando a borda de cima. O título fica
            numa faixa branca (bg-background, uma por linha com
            box-decoration-break) que "morde" a foto: é o recorte
            editorial, e garante contraste — o texto nunca fica sobre a
            imagem. O pt reserva a metade do título que fica acima da foto.
            Tamanho text-section (não display): o título ocupa ~50–70% da
            largura da foto em todas as telas — maior que isso, a faixa
            branca cobriria a borda inteira e o recorte sumiria. No tablet
            (md), 8 das 12 colunas: na largura toda a foto ficaria enorme. */}
        <div className="relative col-span-full pt-[calc(var(--text-section)*0.5)] md:col-span-8 lg:col-span-5 lg:col-start-3 lg:row-start-1">
          <h2
            id="sobre-titulo"
            className="absolute left-0 top-0 z-10 font-serif text-section"
          >
            <span className="bg-background pr-[0.25em] [box-decoration-break:clone]">
              Sobre <em>mim</em>
            </span>
          </h2>
          {/* Recorte 4:5 (o arquivo é 3:4) puxado para baixo, centrando o
              monitor da câmera — o assunto da foto. */}
          <div className="relative aspect-[4/5] overflow-hidden bg-black/5">
            <Image
              src="/images/bruna-bio.jpeg"
              alt="Bastidores de uma gravação: o monitor de uma câmera de cinema mostra uma mulher de óculos fazendo pose descontraída diante de um fundo com um navio de carga."
              fill
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 66vw, 100vw"
              className="object-cover object-[50%_70%]"
            />
          </div>
        </div>

        {/* Bio: camada cinza real + camada preta revelada no scroll. A de
            cima é aria-hidden e não recebe clique (a seleção de texto
            continua indo para a de baixo, que é a "verdadeira"). */}
        <div className="bio-reveal relative col-span-full self-end font-serif text-lead lg:col-span-5 lg:col-start-8 lg:row-start-1">
          <div className="flex flex-col gap-6 text-muted">
            <BioText />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex select-none flex-col gap-6 text-foreground"
          >
            <BioText words />
          </div>
        </div>

        {/* Números de destaque. O valor real fica no HTML (.count-final) e
            para leitores de tela (sr-only); o contador visual (.count::after)
            só substitui o número onde o scroll-driven é suportado e sem
            "reduzir movimento". Os dois ocupam a mesma célula de um
            inline-grid: o número final (invisível durante a contagem)
            reserva a largura exata, então a contagem não empurra o "+". */}
        <ul className="stats col-span-full grid grid-cols-3 gap-grid border-t border-line pt-8 lg:col-span-10 lg:col-start-3">
          {highlights.map((highlight) => (
            <li key={highlight.label} className="flex flex-col gap-3">
              <span aria-hidden="true" className="font-serif text-display tabular-nums">
                <span
                  className="count"
                  style={{ "--to": highlight.value } as React.CSSProperties}
                >
                  <span className="count-final">{highlight.value}</span>
                </span>
                {highlight.suffix && <em>{highlight.suffix}</em>}
              </span>
              <span className="text-label font-medium uppercase tracking-credits">
                <span className="sr-only">
                  {highlight.value}
                  {highlight.suffix}{" "}
                </span>
                {highlight.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
