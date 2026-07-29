export const ACCENT_PALETTE = [
  {
    solid: "bg-accent-blue text-white",
    soft: "bg-accent-blue/15",
    border: "border-accent-blue/70",
    tag: "bg-accent-blue/90 text-white",
    bar: "bg-accent-blue",
  },
  {
    solid: "bg-accent-pink text-white",
    soft: "bg-accent-pink/15",
    border: "border-accent-pink/70",
    tag: "bg-accent-pink/90 text-white",
    bar: "bg-accent-pink",
  },
] as const;

export function accentForIndex(index: number) {
  return ACCENT_PALETTE[index % ACCENT_PALETTE.length];
}
