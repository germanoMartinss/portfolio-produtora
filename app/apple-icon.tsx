import { renderMonogram } from "@/lib/monogram";

// Ícone para "Adicionar à tela de início" no iOS (o sistema arredonda os
// cantos sozinho, então aqui o fundo é quadrado).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return renderMonogram(180, 0);
}
