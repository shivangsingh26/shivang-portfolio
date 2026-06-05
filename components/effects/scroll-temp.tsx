"use client";

import { useEffect } from "react";

/**
 * Drives a subtle scroll-linked hue shift on --bg-hue.
 * Cool (254) at top → warmer (282) mid → cool (254) bottom.
 * Affects --primary, --ring, --glow which are all bound to var(--bg-hue).
 * Reduced-motion: stays at 254.
 */
export function ScrollTemp() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    let raf = 0;
    const root = document.documentElement;

    const update = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      // Smooth triangle: 0 → 1 → 0 across the page
      const t = 1 - Math.abs(p * 2 - 1);
      const hue = 254 + t * 28;
      root.style.setProperty("--bg-hue", hue.toFixed(2));
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
