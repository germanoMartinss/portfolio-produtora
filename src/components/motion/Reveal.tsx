"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { TRANSITION, VIEWPORT } from "@/lib/motion";

// Wrappers de animação ("ilhas" client). Assim as seções continuam sendo
// Server Components (sem JS próprio no navegador) e só estes invólucros
// carregam o framer-motion. Recebem children e qualquer prop de motion.div
// serializável (className, style...), para poderem ser usados direto em
// Server Components.

type RevealProps = HTMLMotionProps<"div"> & {
  // Distância (px) que o elemento sobe ao aparecer.
  y?: number;
  duration?: number;
};

// Sobe e aparece suavemente quando entra na área visível da tela
// (whileInView), uma vez só (viewport.once).
export function Reveal({ y = 24, duration = 0.6, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, ease: "easeOut" }}
      {...props}
    />
  );
}

// Container de lista: os RevealItem filhos entram com um pequeno atraso
// entre si (staggerChildren), criando um efeito de cascata.
export function RevealGroup({
  stagger = 0.1,
  ...props
}: HTMLMotionProps<"div"> & { stagger?: number }) {
  return (
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      {...props}
    />
  );
}

// Item de um RevealGroup: herda os estados "hidden"/"show" do container.
export function RevealItem({ y = 16, duration = 0.5, ...props }: RevealProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration, ease: "easeOut" } },
      }}
      {...props}
    />
  );
}

// Revelação por máscara (títulos): o texto sobe de dentro de uma "janela"
// com overflow hidden, como um letreiro entrando em quadro. O whileInView
// fica na máscara (o texto, deslocado para fora dela, teria interseção zero
// com a tela e nunca dispararia); a máscara passa o estado ao texto via
// variants. O py/-my negativo dá folga para não cortar acentos e
// descendentes com line-height apertado. Renderiza <span> (block), para
// poder ficar dentro de <h2>/<h3>.
// Com "reduzir movimento", o MotionConfig pula o deslocamento: o texto já
// aparece no lugar.
export function MaskReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className={`-mb-[0.2em] -mt-[0.1em] block overflow-hidden pb-[0.2em] pt-[0.1em] ${className}`}
    >
      <motion.span
        className="block"
        variants={{
          hidden: { y: "110%" },
          show: { y: 0, transition: { ...TRANSITION.slow, delay } },
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
