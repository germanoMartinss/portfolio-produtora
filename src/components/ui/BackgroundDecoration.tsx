interface OrbProps {
  color: "blue" | "pink";
  className: string;
}

function Orb({ color, className }: OrbProps) {
  return (
    <div
      className={`absolute rounded-full blur-[100px] ${
        color === "blue" ? "bg-accent-blue/25" : "bg-accent-pink/25"
      } ${className}`}
    />
  );
}

export default function BackgroundDecoration() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <Orb color="blue" className="left-[-10%] top-[2%] h-[26rem] w-[26rem]" />
      <Orb color="pink" className="right-[-8%] top-[10%] h-[22rem] w-[22rem]" />
      <Orb color="pink" className="left-[-6%] top-[32%] h-[24rem] w-[24rem]" />
      <Orb color="blue" className="right-[-10%] top-[48%] h-[28rem] w-[28rem]" />
      <Orb color="blue" className="left-[-8%] top-[68%] h-[24rem] w-[24rem]" />
      <Orb color="pink" className="right-[-6%] top-[88%] h-[22rem] w-[22rem]" />
    </div>
  );
}
