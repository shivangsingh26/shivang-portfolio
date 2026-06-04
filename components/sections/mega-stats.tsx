"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Counter } from "@/components/motion/counter";
import { HolographicCard } from "@/components/effects/holographic-card";

const STATS = [
  { value: "10K+", label: "assets processed", sub: "multimodal pipeline", hue: "var(--primary)" },
  { value: "95%", label: "manual time cut", sub: "for Eli Lilly team", hue: "var(--violet)" },
  { value: "1K+", label: "concurrent reqs", sub: "KEDA-autoscaled", hue: "var(--coral)" },
  { value: "$0.04", label: "per Dossier run", sub: "8-agent pipeline", hue: "var(--amber)" },
];

export function MegaStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      aria-label="Key metrics"
      className="relative w-full py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground"
        >
          <span className="h-px w-8 bg-[var(--coral)]" />
          ◆ Production impact
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.7,
                delay: 0.08 * i,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <HolographicCard className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-6 backdrop-blur transition hover:border-foreground/25 sm:p-7">
                <span
                  aria-hidden
                  className="absolute right-0 top-0 h-20 w-20 rounded-full opacity-30 blur-3xl"
                  style={{ background: s.hue }}
                />
                <div className="relative">
                  <div
                    className="font-display text-5xl font-semibold leading-none tracking-tighter sm:text-6xl"
                    style={{ color: s.hue }}
                  >
                    <Counter value={s.value} />
                  </div>
                  <div className="mt-4 text-sm font-medium text-foreground">
                    {s.label}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {s.sub}
                  </div>
                </div>
              </HolographicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
