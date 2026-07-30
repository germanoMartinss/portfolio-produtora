import { PRODUCER_NAME } from "@/lib/site";

// Rodapé fixo no fim de toda página (montado em app/layout.tsx).
// Mostra nome, contatos e o aviso de copyright com o ano atual.
export default function Footer() {
  // Calcula o ano atual dinamicamente, para o copyright nunca ficar desatualizado.
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-black/5">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-12">
        <div className="flex flex-col gap-1">
          <span className="font-serif text-lg">{PRODUCER_NAME}</span>
          {/* PLACEHOLDER: e-mail, telefone e redes sociais fictícios, substituir pelos reais. */}
          <p className="text-sm text-muted">
            brunarodriguez_@hotmail.com &middot; @brurodriguezz
          </p>
          <p className="text-sm text-muted">+55 (13) 99116-4282</p>
        </div>
        <p className="text-xs text-muted">
          &copy; {year} {PRODUCER_NAME}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
