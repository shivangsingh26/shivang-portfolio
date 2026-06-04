"use client";

import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function HolographicCard({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    const rx = (y - 50) * -0.06;
    const ry = (x - 50) * 0.06;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group/holo relative ${className}`}
      style={
        {
          transformStyle: "preserve-3d",
          perspective: "900px",
          transform:
            "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
          transition: "transform 0.25s ease",
        } as React.CSSProperties
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 opacity-0 transition-opacity duration-500 group-hover/holo:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), oklch(0.85 0.18 320 / 0.18), oklch(0.78 0.18 200 / 0.12) 30%, transparent 60%)",
          borderRadius: "inherit",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover/holo:opacity-70"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, oklch(1 0 0 / 0.16) 45%, oklch(0.85 0.18 250 / 0.18) 50%, oklch(0.85 0.18 320 / 0.18) 55%, transparent 70%)",
          backgroundSize: "200% 200%",
          backgroundPosition: "calc(var(--mx, 50%) - 50%) calc(var(--my, 50%) - 50%)",
          borderRadius: "inherit",
        }}
      />
      {children}
    </div>
  );
}
