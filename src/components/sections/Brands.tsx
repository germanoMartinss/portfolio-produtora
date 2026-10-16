import Image from "next/image";
import { brands } from "@/data/brands";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

// Última seção da home: grade de logos das marcas atendidas, sobre um
// fundo escuro (bg-foreground) para destacar os logos brancos/coloridos.
export default function Brands() {
  return (
    <section className="w-full bg-foreground py-8 sm:py-14">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-12">
        <div className="mb-6 flex flex-col gap-3">
          <span className="h-1.5 w-12 rounded-full bg-accent-blue" aria-hidden="true" />
          <p className="text-xs font-medium uppercase tracking-widest text-accent-blue">
            Trajetória
          </p>
          <h2 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl">
            Marcas com quem já trabalhei
          </h2>
        </div>

        <RevealGroup
          stagger={0.06}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          {brands.map((brand) => (
            // Cada logo fica num cartão branco (os arquivos de logo em si
            // costumam ter fundo transparente ou variar de proporção).
            <RevealItem
              key={brand.id}
              className="flex h-24 items-center justify-center rounded-xl bg-white p-6 shadow-md transition-transform duration-300 hover:-translate-y-1 sm:h-28"
            >
              <div
                className="relative h-full w-full"
                style={{
                  // logoScale ajusta o zoom de cada logo individualmente
                  // (alguns arquivos vêm com bastante espaço em branco ao
                  // redor e ficam pequenos demais sem esse ajuste).
                  transform: `scale(${brand.logoScale ?? 1})`,
                  // clipPath (opcional) recorta a imagem numa forma
                  // específica, para esconder partes indesejadas de um
                  // arquivo de logo. Nenhuma marca usa hoje.
                  clipPath: brand.clipPath,
                }}
              >
                <Image
                  src={brand.logoSrc}
                  alt={brand.name}
                  fill
                  sizes="160px"
                  className="object-contain"
                />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
