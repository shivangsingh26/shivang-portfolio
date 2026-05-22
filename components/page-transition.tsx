"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import type { ReactNode } from "react";

/**
 * Route-level crossfade + subtle slide. Respects reduced-motion via CSS class
 * (motion already honors prefers-reduced-motion globally).
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
