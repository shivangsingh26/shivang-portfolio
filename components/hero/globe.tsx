"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import createGlobe from "cobe";
import { motion, useReducedMotion } from "motion/react";

type City = {
  name: string;
  lat: number;
  lng: number;
  size: number;
  accent?: string;
  home?: boolean;
};

const CITIES: City[] = [
  { name: "Bengaluru", lat: 12.9716, lng: 77.5946, size: 0.14, accent: "var(--coral)", home: true },
  { name: "San Francisco", lat: 37.7749, lng: -122.4194, size: 0.06, accent: "var(--primary)" },
  { name: "New York", lat: 40.7128, lng: -74.006, size: 0.06, accent: "var(--primary)" },
  { name: "London", lat: 51.5074, lng: -0.1278, size: 0.05, accent: "var(--violet)" },
  { name: "Singapore", lat: 1.3521, lng: 103.8198, size: 0.05, accent: "var(--teal)" },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503, size: 0.05, accent: "var(--teal)" },
  { name: "Berlin", lat: 52.52, lng: 13.405, size: 0.04, accent: "var(--violet)" },
  { name: "Sydney", lat: -33.8688, lng: 151.2093, size: 0.04, accent: "var(--teal)" },
  { name: "Dubai", lat: 25.276, lng: 55.2962, size: 0.04, accent: "var(--coral)" },
];

const THETA = 0.32;

type Projected = {
  x: number;
  y: number;
  visible: boolean;
  scale: number;
};

function project(lat: number, lng: number, phi: number, theta: number, radius: number): Projected {
  const latR = (lat * Math.PI) / 180;
  const lngR = (lng * Math.PI) / 180;
  const x0 = Math.cos(latR) * Math.sin(lngR);
  const y0 = Math.sin(latR);
  const z0 = Math.cos(latR) * Math.cos(lngR);
  const cp = Math.cos(phi);
  const sp = Math.sin(phi);
  const x1 = x0 * cp + z0 * sp;
  const z1 = -x0 * sp + z0 * cp;
  const ct = Math.cos(theta);
  const st = Math.sin(theta);
  const y2 = y0 * ct + z1 * st;
  const z2 = -y0 * st + z1 * ct;
  return {
    x: radius + x1 * radius,
    y: radius - y2 * radius,
    visible: z2 > -0.05,
    scale: Math.max(0, z2),
  };
}

type Props = { size?: number };

export function Globe({ size = 520 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, dx: 0, down: false });
  const phiRef = useRef(0);
  const scrollPhiRef = useRef(0);
  const targetSpinRef = useRef(0.0025);
  const spinRef = useRef(0.0025);
  const lastPhiUpdateRef = useRef(0);
  const [phi, setPhi] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = 0;
    const onResize = () => {
      width = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const vh = window.innerHeight;
      const offset = (vh / 2 - center) / vh;
      scrollPhiRef.current = offset * 0.8;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    type CobeOpts = Parameters<typeof createGlobe>[1];
    const options = {
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: THETA,
      dark: 1,
      diffuse: 1.6,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.18, 0.22, 0.34],
      markerColor: [0.78, 0.85, 1],
      glowColor: [0.38, 0.48, 0.85],
      markers: CITIES.map((c) => ({ location: [c.lat, c.lng] as [number, number], size: c.size })),
      onRender: (state: { phi: number; width: number; height: number }) => {
        spinRef.current += (targetSpinRef.current - spinRef.current) * 0.06;
        if (!pointerRef.current.down && !reduceMotion) {
          phiRef.current += spinRef.current;
        }
        const next = phiRef.current + pointerRef.current.dx * 0.01 + scrollPhiRef.current;
        state.phi = next;
        state.width = width * 2;
        state.height = width * 2;
        const now = performance.now();
        if (now - lastPhiUpdateRef.current > 33) {
          lastPhiUpdateRef.current = now;
          setPhi(next);
        }
      },
    } as unknown as CobeOpts;

    const globe = createGlobe(canvas, options);

    const reveal = setTimeout(() => {
      if (canvas) canvas.style.opacity = "1";
    }, 80);

    return () => {
      clearTimeout(reveal);
      globe.destroy();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduceMotion]);

  const radius = size / 2;

  const projected = useMemo(
    () => CITIES.map((c) => ({ city: c, p: project(c.lat, c.lng, phi, THETA, radius) })),
    [phi, radius],
  );

  const home = projected[0];

  const arcs = useMemo(() => {
    if (!home.p.visible) return [];
    return projected.slice(1).map(({ city, p }) => {
      if (!p.visible) return null;
      const mx = (home.p.x + p.x) / 2;
      const my = (home.p.y + p.y) / 2;
      const dx = p.x - home.p.x;
      const dy = p.y - home.p.y;
      const dist = Math.hypot(dx, dy);
      const lift = Math.min(dist * 0.35, radius * 0.6);
      const nx = -dy / (dist || 1);
      const ny = dx / (dist || 1);
      const towardCenter = Math.sign((radius - mx) * nx + (radius - my) * ny) || 1;
      const cx = mx + nx * lift * towardCenter;
      const cy = my + ny * lift * towardCenter;
      const opacity = Math.min(home.p.scale, p.scale) * 0.85 + 0.1;
      return {
        name: city.name,
        d: `M ${home.p.x} ${home.p.y} Q ${cx} ${cy} ${p.x} ${p.y}`,
        opacity,
        accent: city.accent ?? "var(--primary)",
      };
    }).filter(Boolean) as { name: string; d: string; opacity: number; accent: string }[];
  }, [home, projected, radius]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative aspect-square w-full max-w-[600px]"
      style={{ width: size, height: size }}
      onMouseEnter={() => {
        if (!reduceMotion) targetSpinRef.current = 0.006;
      }}
      onMouseLeave={() => {
        targetSpinRef.current = reduceMotion ? 0 : 0.0025;
        setHovered(null);
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        onPointerDown={(e) => {
          pointerRef.current.down = true;
          pointerRef.current.x = e.clientX - pointerRef.current.dx;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerRef.current.down = false;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerRef.current.down = false;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerRef.current.down) {
            pointerRef.current.dx = e.clientX - pointerRef.current.x;
          }
        }}
        onTouchMove={(e) => {
          if (pointerRef.current.down && e.touches[0]) {
            pointerRef.current.dx = e.touches[0].clientX - pointerRef.current.x;
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 0.6s ease",
        }}
      />

      <svg
        aria-hidden
        viewBox={`0 0 ${size} ${size}`}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ overflow: "visible" }}
      >
        <defs>
          {arcs.map((arc, i) => (
            <linearGradient key={`g-${i}`} id={`arc-grad-${i}`}>
              <stop offset="0%" stopColor={arc.accent} stopOpacity="0.9" />
              <stop offset="100%" stopColor={arc.accent} stopOpacity="0.15" />
            </linearGradient>
          ))}
        </defs>
        {arcs.map((arc, i) => (
          <g key={arc.name} style={{ opacity: arc.opacity }}>
            <path
              d={arc.d}
              fill="none"
              stroke={`url(#arc-grad-${i})`}
              strokeWidth={1.1}
              strokeLinecap="round"
              strokeDasharray="3 5"
              style={{
                animation: reduceMotion ? undefined : `globe-arc-flow ${4 + (i % 3)}s linear infinite`,
              }}
            />
          </g>
        ))}
      </svg>

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {projected.map(({ city, p }) => {
          if (!p.visible) return null;
          const dotSize = 10 + city.size * 28;
          const ringSize = dotSize * 2.6;
          const isHome = city.home;
          return (
            <div
              key={city.name}
              className="absolute"
              style={{
                left: p.x,
                top: p.y,
                transform: "translate(-50%, -50%)",
                opacity: 0.4 + p.scale * 0.6,
              }}
            >
              {isHome && !reduceMotion && (
                <span
                  className="absolute left-1/2 top-1/2 inline-block -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: ringSize,
                    height: ringSize,
                    background: `radial-gradient(circle, ${city.accent}55 0%, transparent 65%)`,
                    animation: "globe-pulse 2.4s ease-out infinite",
                  }}
                />
              )}
              <span
                className="pointer-events-auto block rounded-full"
                onMouseEnter={() => setHovered(city.name)}
                onMouseLeave={() => setHovered((h) => (h === city.name ? null : h))}
                style={{
                  width: dotSize,
                  height: dotSize,
                  background: city.accent,
                  boxShadow: `0 0 ${dotSize * 1.2}px ${city.accent}`,
                  cursor: "default",
                }}
              />
              {hovered === city.name && (
                <span
                  className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground backdrop-blur"
                  style={{ zIndex: 10 }}
                >
                  {city.name}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes globe-pulse {
          0% {
            transform: translate(-50%, -50%) scale(0.6);
            opacity: 0.9;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.8);
            opacity: 0;
          }
        }
        @keyframes globe-arc-flow {
          to {
            stroke-dashoffset: -32;
          }
        }
      `}</style>
    </motion.div>
  );
}
