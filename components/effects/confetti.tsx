"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
  rot: number;
  vr: number;
};

const COLORS = ["#7a8eff", "#ff7e5a", "#9a7eff", "#5ae0c8", "#ffd66a"];

export function fireConfetti(x: number, y: number, count = 24) {
  const evt = new CustomEvent("ss-confetti", { detail: { x, y, count } });
  window.dispatchEvent(evt);
}

export function ConfettiLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onFire = (e: Event) => {
      const ce = e as CustomEvent<{ x: number; y: number; count: number }>;
      const { x, y, count } = ce.detail;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
        const speed = 3 + Math.random() * 4;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          life: 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 4 + Math.random() * 4,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.4,
        });
      }
    };
    window.addEventListener("ss-confetti", onFire);

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const list = particlesRef.current;
      for (let i = 0; i < list.length; i++) {
        const p = list[i];
        p.vy += 0.18;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.rot += p.vr;
        p.life -= 0.018;
        if (p.life <= 0) {
          list.splice(i, 1);
          i--;
          continue;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("ss-confetti", onFire);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[80]"
    />
  );
}
