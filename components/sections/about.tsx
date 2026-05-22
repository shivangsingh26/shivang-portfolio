"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SplitTextSegmented } from "@/components/motion/split-text";
import { Counter } from "@/components/motion/counter";
import { profile, stats } from "@/lib/data";

function StatCard({ value, label, idx }: { value: string; label: string; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/40 p-6 backdrop-blur transition hover:border-primary/40"
    >
      <div
        aria-hidden
        className="absolute -inset-px -z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(180px circle at var(--mx, 50%) var(--my, 50%), oklch(0.72 0.20 250 / 0.30), transparent 70%)",
        }}
      />
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        / {String(idx + 1).padStart(2, "0")}
      </div>
      <div className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
        <Counter value={value} className="gradient-text" />
      </div>
      <div className="mt-3 text-sm leading-snug text-muted-foreground">{label}</div>
    </motion.div>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), { stiffness: 120, damping: 30 });

  return (
    <section id="about" ref={ref} className="relative w-full py-32 sm:py-44">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-px w-8 bg-primary" />
            01 · About
          </div>
        </Reveal>

        <div className="mt-10 grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <motion.h2
              style={{ y }}
              className="font-display text-balance text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.1] tracking-[-0.03em]"
            >
              <SplitTextSegmented
                segments={[
                  { text: "I build LLM systems that" },
                  { text: " survive production traffic.", className: "gradient-text" },
                ]}
              />
            </motion.h2>
            <Reveal delay={0.3}>
              <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {profile.summary}
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                My work sits at the intersection of GenAI systems, computer vision, and production ML
                engineering — where latency, token limits, retries, backpressure, and failure modes
                matter as much as model quality.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "Building AI that reliably works in production",
                "Understanding failure modes early",
                "Writing clean, scalable ML + backend code",
                "Learning from real usage, not just papers",
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45 + i * 0.08, duration: 0.5 }}
                  className="flex items-center gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="h-px w-5 bg-primary/60" />
                  {t}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 self-start md:col-span-5 md:gap-4">
            {stats.map((s, i) => (
              <StatCard key={s.label} value={s.value} label={s.label} idx={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
