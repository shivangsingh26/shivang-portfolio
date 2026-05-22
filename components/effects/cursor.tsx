"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 32, stiffness: 600, mass: 0.25 });
  const sy = useSpring(y, { damping: 32, stiffness: 600, mass: 0.25 });

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFine || reduced) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHovering(!!el?.closest("a, button, [data-cursor='hover'], input, textarea"));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200] mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="rounded-full bg-white"
        animate={{
          width: hovering ? 36 : 8,
          height: hovering ? 36 : 8,
          x: hovering ? -18 : -4,
          y: hovering ? -18 : -4,
          opacity: hovering ? 0.3 : 0.9,
        }}
        transition={{ type: "spring", damping: 26, stiffness: 380 }}
      />
    </motion.div>
  );
}
