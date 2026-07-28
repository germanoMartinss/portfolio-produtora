import { PRODUCER_NAME } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-black/5">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-12">
        <div className="flex flex-col gap-1">
          <span className="font-serif text-lg">{PRODUCER_NAME}</span>
          {/* PLACEHOLDER: e-mail, telefone e redes sociais fictícios, substituir pelos reais. */}
          <p className="text-sm text-muted">
            contato@anaficticia.com.br &middot; @brurodriguezz
          </p>
          <p className="text-sm text-muted">+55 (13) 99999-9999</p>
        </div>
        <p className="text-xs text-muted">
          &copy; {year} {PRODUCER_NAME}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
