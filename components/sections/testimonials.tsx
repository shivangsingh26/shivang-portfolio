"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SplitTextSegmented } from "@/components/motion/split-text";
import { testimonials } from "@/lib/testimonials";

const ACCENTS = ["var(--primary)", "var(--violet)", "var(--coral)", "var(--teal)"];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative w-full py-28 sm:py-36">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-px w-8 bg-[var(--coral)]" />
            ★ Words from people I&apos;ve worked with
          </div>
        </Reveal>
        <h2 className="mt-8 font-display text-balance text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
          <SplitTextSegmented
            segments={[
              { text: "Real signal," },
              { text: " from real teams.", className: "aurora-text" },
            ]}
          />
        </h2>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="group relative flex h-full flex-col rounded-2xl border border-border bg-card/40 p-6 backdrop-blur transition-colors hover:border-foreground/20"
              >
                <Quote
                  className="absolute right-5 top-5 h-6 w-6 opacity-30 transition-opacity group-hover:opacity-60"
                  style={{ color: accent }}
                />
                <blockquote className="text-[15px] leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-border/60 pt-4">
                  <div className="font-semibold tracking-tight">{t.name}</div>
                  <div className="mt-0.5 text-sm text-muted-foreground">
                    {t.role} · {t.company}
                  </div>
                  <div
                    className="mt-3 inline-block rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em]"
                    style={{ borderColor: `${accent}50`, color: accent }}
                  >
                    {t.context}
                  </div>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
