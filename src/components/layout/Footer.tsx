import { CONTACT, PRODUCER_NAME } from "@/lib/site";

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
          {/* Contatos centralizados em src/lib/site.ts. Uma string só (em
              vez de vários pedaços de texto) para o navegador renderizar a
              linha como um bloco único, igual ao texto fixo de antes. */}
          <p className="text-sm text-muted">
            {`${CONTACT.email} · @${CONTACT.instagram}`}
          </p>
          <p className="text-sm text-muted">{CONTACT.phone}</p>
        </div>
        <p className="text-xs text-muted">
          &copy; {year} {PRODUCER_NAME}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
