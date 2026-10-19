// Rótulo numerado de seção, no estilo de crédito de filme: "01 — Trabalhos".
// Server Component. Por padrão ocupa a coluna da esquerda do page-grid
// (col-span-full no mobile, 2 colunas a partir de md), deixando o conteúdo
// da seção começar na coluna 3 ou 4 — passe className para mudar isso.

interface SectionLabelProps {
  // Número da seção na ordem da página (1 → "01").
  index: number;
  label: string;
  // "dark" para seções com fundo preto: usa o azul claro (--accent-on-dark),
  // porque o azul padrão não tem contraste suficiente sobre preto.
  tone?: "light" | "dark";
  className?: string;
}

export default function SectionLabel({
  index,
  label,
  tone = "light",
  className = "col-span-full md:col-span-2",
}: SectionLabelProps) {
  const number = String(index).padStart(2, "0");

  return (
    <p
      className={`flex items-baseline gap-3 text-label font-medium uppercase tracking-credits ${
        tone === "dark" ? "text-white" : "text-foreground"
      } ${className}`}
    >
      {/* Só o número fica azul: é a "marca" do crédito; o nome da seção
          fica neutro para não competir com o título. */}
      <span className={`tabular-nums ${tone === "dark" ? "text-accent-on-dark" : "text-accent"}`}>
        {number}
      </span>
      {/* Travessão decorativo: leitores de tela leem só "01 Trabalhos". */}
      <span aria-hidden="true" className="h-px w-6 self-center bg-current opacity-40" />
      <span>{label}</span>
    </p>
  );
}
