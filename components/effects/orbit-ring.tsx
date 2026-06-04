"use client";

type Props = { size?: number };

export function OrbitRing({ size = 620 }: Props) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -z-[1] -translate-x-1/2 -translate-y-1/2"
      style={{ width: size, height: size }}
    >
      {/* Outer dashed ring, counter-rotating */}
      <div
        className="absolute inset-0 rounded-full border border-dashed border-foreground/[0.08]"
        style={{ animation: "ring-rot 60s linear infinite reverse" }}
      />
      {/* Inner dashed ring */}
      <div
        className="absolute rounded-full border border-dashed border-foreground/[0.06]"
        style={{
          inset: "8%",
          animation: "ring-rot 90s linear infinite",
        }}
      />
      {/* Glow arc — single conic slice that spins */}
      <div
        className="absolute inset-[3%] rounded-full opacity-60"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, oklch(0.72 0.20 250 / 0.35) 30deg, oklch(0.68 0.22 290 / 0.25) 70deg, transparent 110deg, transparent 360deg)",
          mask: "radial-gradient(circle, transparent 64%, black 64.5%, black 66%, transparent 66.5%)",
          WebkitMask:
            "radial-gradient(circle, transparent 64%, black 64.5%, black 66%, transparent 66.5%)",
          animation: "ring-rot 14s linear infinite",
        }}
      />
      {/* Tiny orbiting satellite */}
      <div
        className="absolute inset-0"
        style={{ animation: "ring-rot 18s linear infinite" }}
      >
        <span
          className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full"
          style={{
            width: 6,
            height: 6,
            background: "var(--coral)",
            boxShadow: "0 0 18px var(--coral)",
          }}
        />
      </div>
      <style jsx>{`
        @keyframes ring-rot {
          to {
            transform: rotate(360deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
