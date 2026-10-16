import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Monograma "BR" (Fraunces branca sobre preto, como o nome no site), usado
// pelos ícones gerados no build: app/icon.tsx (aba do navegador) e
// app/apple-icon.tsx (atalho na tela inicial do iPhone).
export async function renderMonogram(size: number, radius: number) {
  const fraunces = await readFile(
    join(process.cwd(), "assets/fonts/fraunces-latin-600-normal.woff"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          borderRadius: radius,
          background: "#0a0a0a",
          color: "#ffffff",
          fontFamily: "Fraunces",
          fontSize: size * 0.5,
          letterSpacing: -size * 0.02,
          paddingBottom: size * 0.04,
        }}
      >
        BR
      </div>
    ),
    {
      width: size,
      height: size,
      fonts: [{ name: "Fraunces", data: fraunces, weight: 600, style: "normal" }],
    },
  );
}
