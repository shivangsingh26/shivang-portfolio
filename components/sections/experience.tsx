"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SplitTextSegmented } from "@/components/motion/split-text";
import { experiences } from "@/lib/data";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const lineY = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  return (
    <section id="experience" className="relative w-full py-32 sm:py-44">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-px w-8 bg-primary" />
            02 · Experience
          </div>
        </Reveal>
        <h2 className="mt-8 font-display text-balance text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
          <SplitTextSegmented
            segments={[
              { text: "Production work," },
              { text: " at scale.", className: "gradient-text" },
            ]}
          />
        </h2>

        <div ref={ref} className="relative mt-16">
          <div aria-hidden className="absolute left-[18px] top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            aria-hidden
            style={{ scaleY: lineY }}
            className="absolute left-[18px] top-0 bottom-0 w-px origin-top bg-gradient-to-b from-primary via-glow to-transparent md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-12">
            {experiences.map((e, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={e.company + e.period}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative grid md:grid-cols-2 md:gap-12"
                >
                  <span
                    className="absolute left-[12px] top-2 z-10 grid h-3.5 w-3.5 place-items-center md:left-1/2 md:-translate-x-1/2"
                    aria-hidden
                  >
                    {e.current && (
                      <span className="absolute h-3.5 w-3.5 animate-ping rounded-full bg-primary/70" />
                    )}
                    <span className="relative h-2 w-2 rounded-full bg-primary ring-4 ring-background" />
                  </span>

                  <div
                    className={`relative pl-10 md:pl-0 ${
                      left ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"
                    }`}
                  >
                    <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/40 p-5 backdrop-blur transition hover:border-primary/40">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div className="font-display text-lg font-semibold tracking-tight">
                          {e.company}
                        </div>
                        {e.current && (
                          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-400">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">{e.role}</div>
                      <div className={`mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground/80 ${left ? "md:justify-end" : ""}`}>
                        <span>{e.period}</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{e.location}</span>
                      </div>

                      <ul className={`mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground ${left ? "md:text-right" : ""}`}>
                        {e.bullets.map((b, j) => (
                          <li key={j} className={`flex gap-2 ${left ? "md:flex-row-reverse" : ""}`}>
                            <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      {e.stack && (
                        <div className={`mt-4 flex flex-wrap gap-1.5 ${left ? "md:justify-end" : ""}`}>
                          {e.stack.map((s) => (
                            <span
                              key={s}
                              className="rounded-md border border-border/60 bg-background/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
