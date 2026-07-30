import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

// PLACEHOLDER: título e descrição a substituir pelo texto real de apresentação.
export const metadata: Metadata = {
  title: "Portfólio | Produtora Audiovisual",
  description:
    "Portfólio de produção audiovisual: vídeos institucionais, documentários e conteúdo para marcas.",
};

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
        {children}
        <Footer />
      </body>
    </html>
  );
}
