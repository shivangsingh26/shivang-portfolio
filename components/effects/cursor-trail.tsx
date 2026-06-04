"use client";

import { useEffect, useRef } from "react";

type Pt = { x: number; y: number; life: number };

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const points: Pt[] = [];
    let lx = -9999;
    let ly = -9999;

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lx;
      const dy = e.clientY - ly;
      const dist = Math.hypot(dx, dy);
      if (dist > 3) {
        points.push({ x: e.clientX, y: e.clientY, life: 1 });
        lx = e.clientX;
        ly = e.clientY;
        if (points.length > 60) points.shift();
      }
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.life -= 0.025;
        if (p.life <= 0) {
          points.splice(i, 1);
          i--;
          continue;
        }
        const r = 14 * p.life;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        grad.addColorStop(0, `oklch(0.72 0.20 250 / ${p.life * 0.45})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[55]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
