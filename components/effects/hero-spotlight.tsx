"use client";

import { useEffect, useRef } from "react";

export function HeroSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let raf = 0;
    let tx = 50;
    let ty = 50;
    let cx = 50;
    let cy = 50;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width) * 100;
      ty = ((e.clientY - rect.top) / rect.height) * 100;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty("--sx", `${cx}%`);
      el.style.setProperty("--sy", `${cy}%`);
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-[4] transition-opacity duration-700"
      style={{
        background:
          "radial-gradient(600px circle at var(--sx, 50%) var(--sy, 50%), oklch(0.72 0.20 250 / 0.14), transparent 55%)",
      }}
    />
  );
}
