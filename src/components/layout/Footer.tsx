import SectionLabel from "@/components/layout/SectionLabel";
import { CONTACT, PRODUCER_LOCATION, PRODUCER_NAME, PRODUCER_ROLE } from "@/lib/site";

// E-mail em duas partes para o <wbr> antes do "@": em telas estreitas a
// linha pode quebrar ali ("brunarodriguez_" / "@hotmail.com") em vez de
// estourar a largura.
const [emailUser, emailDomain] = CONTACT.email.split("@");

// Seção 07 — Contato, que também é o rodapé do site (montado em
// app/layout.tsx, depois do <main>). Os "créditos finais" do filme:
// chamada gigante, e-mail como link grande, Instagram e telefone (texto,
// até a cliente confirmar — ver CLAUDE.md) e o copyright.
// pb-gutter: a página termina com a margem lateral também embaixo (as
// seções só têm padding de cima).
export default function Footer() {
  // Ano atual, para o copyright nunca ficar desatualizado.
  const year = new Date().getFullYear();

  return (
    <footer id="contato" aria-labelledby="contato-titulo" className="pt-section pb-gutter">
      <div className="page-grid gap-y-12 lg:gap-y-20">
        <SectionLabel index={7} label="Contato" />
        <h2
          id="contato-titulo"
          className="col-span-full font-serif text-display lg:col-span-10 lg:col-start-3"
        >
          {/* Revelação por máscara em CSS (mask-reveal, ver globals.css), e
              não o MaskReveal do framer-motion: o rodapé fica no layout, e
              usar o "motion" ali dividia o framer-motion em dois arquivos
              (+5 KB de JS inicial). */}
          <span className="mask-reveal -mb-[0.2em] -mt-[0.1em] block overflow-hidden pb-[0.2em] pt-[0.1em]">
            <span className="block">
              Vamos fazer algo <em>juntos</em>?
            </span>
          </span>
        </h2>

        <div className="col-span-full flex flex-col gap-10 lg:col-span-10 lg:col-start-3">
          {/* E-mail: o único contato clicável. O traço embaixo se desenha da
              esquerda no hover/foco (transform), e a cor vira azul. */}
          <a
            href={`mailto:${CONTACT.email}`}
            className="group relative w-fit font-serif text-section after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-(--dur-base) after:ease-cine after:content-[''] hover:text-accent hover:after:origin-left hover:after:scale-x-100 focus-visible:text-accent focus-visible:after:scale-x-100"
          >
            {emailUser}
            <wbr />@{emailDomain}
          </a>

          {/* Instagram e telefone como texto (pendentes de confirmação). */}
          <dl className="grid gap-6 text-label font-medium uppercase tracking-credits sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-2">
              <dt className="text-muted">Instagram</dt>
              <dd className="text-body normal-case tracking-normal">@{CONTACT.instagram}</dd>
            </div>
            <div className="flex flex-col gap-2">
              <dt className="text-muted">Telefone</dt>
              <dd className="text-body normal-case tracking-normal">{CONTACT.phone}</dd>
            </div>
          </dl>
        </div>

        {/* Linha final de créditos. */}
        <div className="col-span-full flex flex-col gap-2 border-t border-line pt-6 text-label font-medium uppercase tracking-credits text-muted sm:flex-row sm:justify-between">
          <p>
            &copy; {year} {PRODUCER_NAME}. Todos os direitos reservados.
          </p>
          <p>
            {PRODUCER_ROLE} · {PRODUCER_LOCATION}
          </p>
        </div>
      </div>
    </footer>
  );
}
