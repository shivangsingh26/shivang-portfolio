"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { profile } from "@/lib/data";

export function PageCurtain() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setDone(true), 1300);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[120] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 grid grid-cols-12">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="bg-background"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.35 + i * 0.025,
                  ease: [0.85, 0, 0.15, 1],
                }}
                style={{ transformOrigin: "top" }}
              />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none relative z-10 flex flex-col items-center gap-2"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              welcome
            </div>
            <div className="font-display text-3xl font-semibold tracking-tight gradient-text">
              {profile.firstName} {profile.lastName}
            </div>
            <div className="mt-2 h-px w-12 origin-left">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-glow"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
