import { PRODUCER_NAME } from "@/lib/site";

// PLACEHOLDER: e-mail de contato fictício, substituir pelo real.
export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-12">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-foreground">
          {PRODUCER_NAME}
        </span>
        <a
          href="mailto:contato@anaficticia.com.br"
          className="text-xs font-medium uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
        >
          Contato
        </a>
      </div>
    </header>
  );
}
