"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
};

/**
 * Tilt — 3D perspective tilt on mouse-move. Respects reduced motion.
 */
export function Tilt({ children, className, max = 7, scale = 1.01 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const s = useMotionValue(1);
  const sx = useSpring(rx, { stiffness: 220, damping: 22, mass: 0.5 });
  const sy = useSpring(ry, { stiffness: 220, damping: 22, mass: 0.5 });
  const ss = useSpring(s, { stiffness: 220, damping: 22, mass: 0.5 });
  const transform = useTransform(
    [sx, sy, ss],
    ([x, y, z]) => `perspective(1100px) rotateX(${y}deg) rotateY(${x}deg) scale(${z})`
  );

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(px * max * 2);
    ry.set(-py * max * 2);
    s.set(scale);
  };

  const leave = () => {
    rx.set(0);
    ry.set(0);
    s.set(1);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ transform }}
      className={cn("tilt-card", className)}
    >
      {children}
    </motion.div>
  );
}
