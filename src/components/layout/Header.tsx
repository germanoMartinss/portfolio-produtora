import { PRODUCER_NAME } from "@/lib/site";

// Links do menu: âncoras para as seções de trabalhos e de contato (rolagem
// suave com o Lenis, ver SmoothScroll.tsx). O e-mail fica na seção Contato.
// "Trabalhos" some abaixo de 640px: em 375px não cabem nome + 2 links com
// o espaçamento dos créditos (e o "Role" do Hero já leva à mesma seção).
const LINKS = [
  { label: "Trabalhos", href: "#trabalhos", className: "hidden sm:block" },
  { label: "Contato", href: "#contato", className: "" },
];

// Cabeçalho fixo e transparente, por cima do Hero (montado em
// app/layout.tsx). Texto branco com mix-blend-difference: sobre o vídeo
// escuro ele aparece claro, sobre o fundo branco das seções ele inverte e
// aparece preto — legível nos dois sem fundo nem blur.
// Por causa do blend, nada aqui usa o azul: ele seria invertido (vira
// laranja sobre o branco). O hover é um traço que se desenha (transform) e
// o contorno de foco é branco (invertido, fica visível em qualquer fundo).
export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
      {/* px-gutter: mesma margem lateral do grid, para o nome aqui em cima
          ficar alinhado com o nome monumental do Hero. */}
      <div className="flex items-center justify-between px-gutter">
        <span className="text-label font-medium uppercase tracking-credits">{PRODUCER_NAME}</span>
        <nav aria-label="Principal">
          <ul className="flex gap-6 sm:gap-10">
            {LINKS.map((link) => (
              <li key={link.href} className={link.className}>
                {/* py-4 + texto de 12px: alvo de toque com ~44px de altura.
                    O traço (after) cresce da esquerda no hover e recolhe
                    para a direita ao sair. */}
                <a
                  href={link.href}
                  className="relative block py-4 text-label font-medium uppercase tracking-credits after:absolute after:inset-x-0 after:bottom-3 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-(--dur-base) after:ease-cine after:content-[''] hover:after:origin-left hover:after:scale-x-100 focus-visible:outline-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
