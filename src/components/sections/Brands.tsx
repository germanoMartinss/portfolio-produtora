import Image from "next/image";
import { brands } from "@/data/brands";
import SectionLabel from "@/components/layout/SectionLabel";
import { MaskReveal } from "@/components/motion/Reveal";
import MarqueeControls from "@/components/motion/MarqueeControls";
import { Brand } from "@/types/project";

// Duas fileiras (metade das marcas cada), em sentidos opostos.
const half = Math.ceil(brands.length / 2);
const ROWS = [
  { items: brands.slice(0, half), reverse: false, duration: "48s" },
  { items: brands.slice(half), reverse: true, duration: "42s" },
];
// Cópias de cada fileira: o loop anda 1/3 (uma cópia) e recomeça. Com 3
// cópias, sempre há logos cobrindo a tela inteira, mesmo em 1920px.
const COPIES = 3;

// Um logo num cartão branco (os arquivos têm fundo transparente ou branco
// e proporções variadas). Cantos retos, como as outras mídias do site.
function Logo({ brand, decorative }: { brand: Brand; decorative: boolean }) {
  return (
    <li className="flex h-16 w-32 shrink-0 items-center justify-center bg-white p-4 sm:h-20 sm:w-40">
      <div
        className="relative h-full w-full"
        style={{
          // Zoom individual (alguns arquivos têm muita margem em branco) e
          // recorte opcional — ver src/data/brands.ts.
          transform: `scale(${brand.logoScale ?? 1})`,
          clipPath: brand.clipPath,
        }}
      >
        {/* Nas cópias do loop o logo é decorativo (alt=""): a lista já foi
            lida na primeira cópia. */}
        <Image src={brand.logoSrc} alt={decorative ? "" : brand.name} fill sizes="160px" className="object-contain" />
      </div>
    </li>
  );
}

// Seção 06 — Marcas: a única com fundo escuro. Duas fileiras de logos
// correndo em sentidos opostos (marquee em CSS puro, ver marquee-* em
// app/globals.css), de ponta a ponta da tela. Pausa no hover e no botão
// "Pausar marcas"; com "reduzir movimento", vira uma grade parada.
// Server Component: só o botão (MarqueeControls) roda no navegador.
// mt-section + py-section: as outras seções só têm padding de cima, mas o
// fundo escuro precisa de respiro dentro dele, em cima e embaixo.
export default function Brands() {
  return (
    <section
      id="marcas"
      aria-labelledby="marcas-titulo"
      className="mt-section w-full bg-foreground py-section text-white"
    >
      <div className="page-grid gap-y-12 pb-12 lg:gap-y-20 lg:pb-20">
        <SectionLabel index={6} label="Marcas" tone="dark" />
        <h2
          id="marcas-titulo"
          className="col-span-full font-serif text-section lg:col-span-10 lg:col-start-3"
        >
          <MaskReveal>
            Marcas com quem já <em>trabalhei</em>
          </MaskReveal>
        </h2>
      </div>

      <MarqueeControls>
        <div className="marquee flex flex-col gap-4">
          {ROWS.map((row, r) => (
            <div key={r} className="marquee-row">
              <div
                className="marquee-track"
                data-direction={row.reverse ? "reverse" : undefined}
                style={{ "--marquee-duration": row.duration } as React.CSSProperties}
              >
                {Array.from({ length: COPIES }, (_, copy) => (
                  // Só a 1ª cópia é lida por leitores de tela; as outras
                  // existem só para o loop não ter emenda.
                  <ul
                    key={copy}
                    aria-hidden={copy > 0 ? "true" : undefined}
                    aria-label={copy === 0 ? (r === 0 ? "Marcas" : "Mais marcas") : undefined}
                    // Movimento reduzido (motion-reduce:): só a 1ª cópia, em
                    // grade quebrando linha (shrink: sem ele a lista não fica
                    // mais estreita que o conteúdo e não quebra). Variantes do Tailwind, não CSS em
                    // @layer components — lá elas perderiam para flex/pr-4.
                    className={`marquee-copy flex shrink-0 gap-4 pr-4 motion-reduce:min-w-0 motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0 ${
                      copy > 0 ? "motion-reduce:hidden" : ""
                    }`}
                  >
                    {row.items.map((brand) => (
                      <Logo key={brand.id} brand={brand} decorative={copy > 0} />
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
      </MarqueeControls>
    </section>
  );
}
