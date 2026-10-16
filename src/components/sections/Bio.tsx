import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

// Números de destaque mostrados como selos abaixo da bio.
const HIGHLIGHTS = [
  "10+ anos de experiência",
  "2 filmes premiados",
  "20+ marcas atendidas",
];

// Pequeno helper para destacar o nome de uma marca dentro do parágrafo de
// bio (deixa o texto em negrito, sem usar cor, para não competir com o
// azul de destaque usado em outros elementos da página).
function Brand({ children }: { children: string }) {
  return <span className="font-semibold">{children}</span>;
}

// Seção "Bio": foto à esquerda, texto de apresentação + selos de destaque
// à direita. Fica logo acima de "Prêmios e Reconhecimentos" na home.
export default function Bio() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-16 sm:py-14">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
        <Reveal className="order-2 aspect-[3/4] w-full overflow-hidden rounded-2xl bg-black/5 lg:order-1"
        >
          <Image
            src="/images/bruna-bio.jpeg"
            alt="Bastidores de uma gravação: o monitor de uma câmera de cinema mostra uma mulher de óculos fazendo pose descontraída diante de um fundo com um navio de carga."
            width={960}
            height={1280}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="h-full w-full object-cover"
          />
        </Reveal>

        <Reveal className="order-1 flex flex-col gap-8 lg:order-2"
        >
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium uppercase tracking-widest text-accent">
              Sobre
            </p>
            <h2 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
              Sobre mim
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-lg leading-relaxed text-muted">
              Com mais de 10 anos de estrada na produção audiovisual, já
              passei por praticamente todas as etapas de um set: produção,
              coordenação e direção de produção, produção executiva e
              assistência de direção. Esse trânsito entre funções resultou
              em projetos para marcas como <Brand>Starbucks</Brand>,{" "}
              <Brand>Disney</Brand>, <Brand>Natura</Brand>,{" "}
              <Brand>Copag</Brand>, <Brand>Mary Kay</Brand> e{" "}
              <Brand>Hospital Albert Einstein</Brand>, além de dois filmes
              autorais premiados internacionalmente.
            </p>
            <p className="text-lg leading-relaxed text-muted">
              Formada em Cinema e Audiovisual, atualmente curso
              pós-graduação em Produção Audiovisual Multiplataforma.
            </p>
          </div>

          {/* Selos com números de destaque — estilo discreto (contorno
              azul, fundo branco), sem cor sólida, para não parecerem
              botões. */}
          <div className="flex flex-wrap gap-3">
            {HIGHLIGHTS.map((highlight) => (
              <span
                key={highlight}
                className="rounded-full border border-accent-blue/60 bg-white px-4 py-2 text-xs font-medium uppercase tracking-wide text-accent-blue"
              >
                {highlight}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
