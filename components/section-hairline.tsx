"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function SectionHairline({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0, 1, 1, 0.4]);

  return (
    <div
      ref={ref}
      className={`relative mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16 ${className}`}
    >
      <motion.div
        style={{ scaleX, opacity }}
        className="section-hairline origin-center"
      />
    </div>
  );
}
