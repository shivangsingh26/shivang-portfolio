"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import type { ReactNode } from "react";

/**
 * Cinematic route crossfade: gentle scale + blur in/out.
 * Honors prefers-reduced-motion via motion's global default.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, scale: 0.985, filter: "blur(6px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.99, filter: "blur(4px)" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
