import { PRODUCER_NAME } from "@/lib/site";

// Cabeçalho fixo no topo da página (montado em app/layout.tsx, aparece em
// todas as rotas). "sticky top-0" faz ele grudar no topo ao rolar a página,
// com fundo semitransparente + blur para dar a sensação de vidro fosco.
// PLACEHOLDER: e-mail de contato fictício, substituir pelo real.
export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-background/80 backdrop-blur-md">
      {/* Padding horizontal (px-16 em telas grandes) alinhado propositalmente
          com o padding da coluna esquerda do Hero, para o nome aqui em cima
          ficar na mesma linha vertical do nome no banner. */}
      <div className="flex items-center justify-between px-6 py-4 sm:px-16">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-foreground">
          {PRODUCER_NAME}
        </span>
        {/* Link de contato: muda de cor (cinza -> azul de destaque) no hover. */}
        <a
          href="mailto:brunarodriguez_@hotmail.com"
          className="text-xs font-medium uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
        >
          Contato
        </a>
      </div>
    </header>
  );
}
