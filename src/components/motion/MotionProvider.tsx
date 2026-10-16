"use client";

import { MotionConfig } from "framer-motion";

// Configuração global do framer-motion. reducedMotion="user": se o sistema
// do visitante pede "reduzir movimento", as animações de deslocamento/escala
// são desligadas (sobram só os fades de opacidade).
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
