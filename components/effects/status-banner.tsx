"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, ArrowUpRight } from "lucide-react";

const STORAGE_KEY = "ss-banner-dismissed-v1";

export function StatusBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) !== "1") setShow(true);
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem(STORAGE_KEY, "1");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 top-0 z-[55] flex items-center justify-center px-4 py-2"
        >
          <div className="relative flex items-center gap-3 overflow-hidden rounded-full border border-border bg-background/85 px-4 py-1.5 backdrop-blur-xl shadow-[var(--shadow-cinema-hover)]">
            <span
              aria-hidden
              className="absolute inset-0 -z-10 opacity-60"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(0.72 0.20 250 / 0.18), transparent)",
                backgroundSize: "200% 100%",
                animation: "shimmer 4s linear infinite",
              }}
            />
            <Sparkles className="h-3.5 w-3.5 text-[var(--coral)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-[11px]">
              Open to senior AI roles ·
            </span>
            <a
              href="#contact"
              data-cursor="hover"
              className="group inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground sm:text-[11px]"
            >
              Let&apos;s talk
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="ml-1 grid h-5 w-5 place-items-center rounded-full transition hover:bg-foreground/10"
            >
              <X className="h-3 w-3 text-muted-foreground" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
