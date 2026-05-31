"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/**
 * Animated divider — thin centered gradient line that scales-in on view,
 * tiny glyph in the middle that rotates slowly forever.
 * Used between major homepage sections to give visual rhythm.
 */
export function SectionDivider({ glyph = "·" }: { glyph?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scaleLeft = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const scaleRight = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-4xl px-4 py-2 sm:px-6">
      <motion.div
        style={{ opacity }}
        className="flex items-center justify-center gap-4"
      >
        <motion.span
          style={{ scaleX: scaleLeft }}
          className="h-px flex-1 origin-right bg-gradient-to-l from-foreground/20 via-foreground/8 to-transparent"
        />
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="grid h-7 w-7 place-items-center rounded-full border border-border bg-background/60 font-mono text-[10px] text-muted-foreground backdrop-blur"
        >
          {glyph}
        </motion.span>
        <motion.span
          style={{ scaleX: scaleRight }}
          className="h-px flex-1 origin-left bg-gradient-to-r from-foreground/20 via-foreground/8 to-transparent"
        />
      </motion.div>
    </div>
  );
}
