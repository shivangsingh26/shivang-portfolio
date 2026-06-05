"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { SplitTextSegmented } from "@/components/motion/split-text";
import { SectionWatermark } from "@/components/effects/section-watermark";
import { Eyebrow } from "@/components/eyebrow";
import { skills, certifications } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="relative w-full py-32 sm:py-44">
      <SectionWatermark num="04" align="left" />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <Eyebrow>04 · Toolkit</Eyebrow>
        </Reveal>
        <h2 className="mt-8 font-display text-balance text-[clamp(2.25rem,5.5vw,4rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
          <SplitTextSegmented
            segments={[
              { text: "The stack I" },
              { text: " reach for.", className: "text-[var(--primary)]" },
            ]}
          />
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {Object.entries(skills).map(([cat, items], catIdx) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: catIdx * 0.08 }}
              className="cinema-card group relative overflow-hidden rounded-2xl p-6 backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold tracking-tight">{cat}</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {(items as string[]).length} items
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {(items as string[]).map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIdx * 0.08 + i * 0.03, duration: 0.4 }}
                    whileHover={{ y: -2 }}
                    className="cursor-default rounded-lg border border-border bg-background/40 px-2.5 py-1 font-mono text-xs text-muted-foreground transition hover:border-foreground/30 hover:text-foreground"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10">
          <div className="cinema-card rounded-2xl p-6 backdrop-blur">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Certifications
            </div>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {certifications.map((c) => (
                <div key={c} className="text-sm text-muted-foreground">
                  <span className="text-primary">›</span> {c}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
