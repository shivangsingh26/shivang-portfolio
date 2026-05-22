"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin gradient bar at very top that fills as user scrolls through the post.
 */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[var(--violet)] via-[var(--primary)] to-[var(--coral)]"
      aria-hidden
    />
  );
}
