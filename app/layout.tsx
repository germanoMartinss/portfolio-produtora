import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MotionProvider from "@/components/motion/MotionProvider";
import SmoothScroll from "@/components/motion/SmoothScroll";
import CustomCursor from "@/components/motion/CustomCursor";
import { PRODUCER_NAME, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

// Fonte serifada (títulos, nome, destaques) — Fraunces variável, carregada
// via next/font/google e exposta como "--font-serif" (ver app/globals.css).
// Sem "weight": um arquivo só cobre todos os pesos (eixo wght). Dos eixos
// extras, só o tamanho óptico (opsz: desenho mais fino e contrastado nos
// títulos gigantes, automático) e o SOFT (utilitário soft-*) — o WONK
// ficaria de fora de qualquer jeito e só pesaria o arquivo.
const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  style: "normal",
  axes: ["opsz", "SOFT"],
});

// Itálico da Fraunces para palavras de destaque nos títulos (<em> dentro de
// .font-serif). Arquivo separado e SEM preload: só o regular é pré-carregado,
// para o itálico não disputar banda com o LCP (Hero). Até ele chegar, o
// navegador mostra o itálico sintetizado da fonte de fallback.
const frauncesItalic = Fraunces({
  variable: "--font-serif-italic",
  subsets: ["latin"],
  style: "italic",
  axes: ["opsz", "SOFT"],
  preload: false,
});

// Fonte sans-serif (corpo de texto) — exposta como "--font-sans".
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

// Metadados globais (aba do navegador, Google e compartilhamento em redes).
// Textos e URL vêm de src/lib/site.ts. A imagem de compartilhamento é
// gerada por app/opengraph-image.tsx (e app/twitter-image.tsx) — o Next
// adiciona as tags og:image/twitter:image automaticamente.
export const metadata: Metadata = {
  // Base para transformar caminhos relativos ("/", imagens) em URLs
  // absolutas nas tags de Open Graph e no canonical.
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    // Para páginas futuras: "Contato | Bruna Rodriguez", por exemplo.
    template: `%s | ${PRODUCER_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: PRODUCER_NAME, url: SITE_URL }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: PRODUCER_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

// Layout raiz do Next.js (App Router): envolve todas as páginas do site.
// Aqui ficam as tags <html>/<body>, as fontes e os componentes fixos
// que aparecem em toda página (Header no topo, Footer no rodapé).
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${frauncesItalic.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {/* Link "pular para o conteúdo": invisível até receber foco pelo
            teclado (primeiro Tab da página), leva direto ao <main>. */}
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>
          <Header />
          {/* Conteúdo específico de cada página (ex.: app/page.tsx) */}
          {children}
          <Footer />
          {/* Acabamento só para mouse (cada um se desliga sozinho no toque
              e com "reduzir movimento" — ver os componentes). */}
          <SmoothScroll />
          <CustomCursor />
        </MotionProvider>
      </body>
    </html>
  );
}
