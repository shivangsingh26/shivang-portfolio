"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type Props = { num: string; align?: "left" | "right" };

export function SectionWatermark({ num, align = "left" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 lg:block ${
        align === "left" ? "left-0" : "right-0"
      }`}
    >
      <motion.span
        style={{ y, opacity }}
        className="block font-display text-[14rem] font-bold leading-none tracking-tighter text-foreground/[0.025] xl:text-[18rem]"
      >
        {num}
      </motion.span>
    </div>
  );
}
