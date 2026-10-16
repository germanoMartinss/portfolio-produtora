import { renderMonogram } from "@/lib/monogram";

// Favicon (aba do navegador), gerado no build a partir do monograma.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return renderMonogram(64, 12);
}
