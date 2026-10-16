import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { PRODUCER_NAME } from "@/lib/site";

// Imagem de compartilhamento (Open Graph: WhatsApp, LinkedIn, Facebook...),
// gerada no build em 1200x630. Segue a identidade do site: fundo preto,
// nome em Fraunces branca, detalhe azul (#2563eb) e a foto P&B do set.
// As fontes ficam em assets/fonts em .woff (o gerador não lê .woff2).
//
// Saída em JPEG, não PNG: o ImageResponse só gera PNG (~390 KB com a foto),
// e o WhatsApp ignora imagens de prévia acima de ~300 KB. Por isso o PNG é
// convertido com sharp para ficar bem abaixo desse limite (~95 KB).

export const alt = `${PRODUCER_NAME} — Produtora Audiovisual`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

export default async function OpengraphImage() {
  const [fraunces, inter, photo] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/fraunces-latin-600-normal.woff")),
    readFile(join(process.cwd(), "assets/fonts/inter-latin-500-normal.woff")),
    readFile(join(process.cwd(), "public/images/bruna-hero-pb.jpeg")),
  ]);
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const [firstName, ...rest] = PRODUCER_NAME.split(" ");

  const png = new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0a0a0a" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 700,
            padding: "0 72px",
          }}
        >
          <div style={{ width: 56, height: 8, borderRadius: 999, background: "#2563eb" }} />
          <div
            style={{
              marginTop: 28,
              fontFamily: "Inter",
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#2563eb",
            }}
          >
            Produtora Audiovisual
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 16,
              fontFamily: "Fraunces",
              fontSize: 104,
              lineHeight: 1.02,
              color: "#ffffff",
            }}
          >
            <span>{firstName}</span>
            <span>{rest.join(" ")}</span>
          </div>
          <div style={{ marginTop: 28, fontFamily: "Inter", fontSize: 26, color: "#a3a3a3" }}>
            10+ anos de set · 2 filmes premiados
          </div>
        </div>
        <img
          src={photoSrc}
          alt=""
          width={500}
          height={630}
          style={{ objectFit: "cover", objectPosition: "50% 30%" }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
        { name: "Inter", data: inter, weight: 500, style: "normal" },
      ],
    },
  );

  const jpeg = await sharp(Buffer.from(await png.arrayBuffer()))
    // JPEG "baseline" (não progressivo), o formato mais compatível com
    // crawlers de prévia. Sem a opção mozjpeg: ela força o modo progressivo.
    .jpeg({ quality: 85, progressive: false })
    .toBuffer();

  return new Response(new Uint8Array(jpeg), {
    headers: { "Content-Type": contentType },
  });
}
