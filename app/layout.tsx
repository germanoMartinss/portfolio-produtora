import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

// Fonte serifada (títulos, nome, destaques) — carregada via next/font/google
// e exposta como variável CSS "--font-serif" (ver app/globals.css).
const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Fonte sans-serif (corpo de texto) — exposta como "--font-sans".
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

// Metadados globais da página (título da aba do navegador, descrição para SEO).
// PLACEHOLDER: título e descrição a substituir pelo texto real de apresentação.
export const metadata: Metadata = {
  title: "Portfólio | Produtora Audiovisual",
  description:
    "Portfólio de produção audiovisual: vídeos institucionais, documentários e conteúdo para marcas.",
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
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Header />
        {/* Conteúdo específico de cada página (ex.: app/page.tsx) */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
