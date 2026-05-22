"use client";

import { motion } from "motion/react";
import { Sparkles, Code2, Coffee, Music2, Github, Zap, MapPin, Cpu } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SplitTextSegmented } from "@/components/motion/split-text";

const NOW_STACK = ["Gemini 2.5 Pro", "Claude 4.6", "FastAPI", "Kubernetes", "PyTorch", "Pydantic"];

function Cell({
  className = "",
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur transition-colors hover:border-foreground/20 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function Bento() {
  return (
    <section className="relative w-full py-28 sm:py-36">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-px w-8 bg-[var(--coral)]" />
            ★ Snapshot
          </div>
        </Reveal>
        <h2 className="mt-8 font-display text-balance text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
          <SplitTextSegmented
            segments={[
              { text: "A quick" },
              { text: " look", className: "aurora-text" },
              { text: " at where I am." },
            ]}
          />
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-[auto_auto_auto] md:gap-5">
          {/* Big — Currently building */}
          <Cell className="md:col-span-2 md:row-span-2 p-6 sm:p-8">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-60 blur-3xl"
              style={{ background: "radial-gradient(circle, oklch(0.68 0.22 290 / 0.35), transparent 70%)" }} />
            <div className="relative">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <Cpu className="h-3.5 w-3.5 text-[var(--violet)]" /> Currently building
              </div>
              <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                <span className="aurora-text">Bodhi Atomize</span>
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                Production multimodal GenAI platform decomposing 10,000+ marketing assets
                into 50+ structured signals per asset for Eli Lilly. Multi-stage LLM pipelines
                with token budgeting, backpressure, and KEDA-autoscaled microservices.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {NOW_STACK.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.04, duration: 0.4 }}
                    className="rounded-md border border-border bg-background/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
              <div className="mt-7 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> shipping
                </span>
                <span>· prod traffic since Jun 2025</span>
              </div>
            </div>
          </Cell>

          {/* Location */}
          <Cell className="p-6" delay={0.05}>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-[var(--coral)]" /> Based in
            </div>
            <div className="mt-3 font-display text-2xl font-semibold tracking-tight">
              Bengaluru, IN
            </div>
            <div className="mt-1 font-mono text-[11px] text-muted-foreground">
              IST · UTC+5:30
            </div>
            <div className="mt-4 grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="h-3 rounded-sm"
                  style={{
                    background:
                      i % 3 === 0
                        ? "oklch(0.66 0.18 254 / 0.8)"
                        : i % 2 === 0
                        ? "oklch(0.66 0.18 254 / 0.4)"
                        : "oklch(1 0 0 / 0.06)",
                  }}
                />
              ))}
            </div>
            <div className="mt-2 font-mono text-[10px] text-muted-foreground">
              Last 7d focus
            </div>
          </Cell>

          {/* Open source */}
          <Cell className="p-6" delay={0.1}>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <Github className="h-3.5 w-3.5 text-foreground" /> Recent ship
            </div>
            <a
              href="https://github.com/shivangsingh26"
              target="_blank"
              rel="noreferrer"
              className="mt-3 block font-display text-xl font-semibold tracking-tight transition-colors hover:text-[var(--primary)]"
            >
              Dossier
            </a>
            <p className="mt-1 text-sm leading-snug text-muted-foreground">
              7-agent autonomous job intel pipeline · $0.06/app · LaTeX resume gen
            </p>
            <div className="mt-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
              <span>GPT-5</span>
              <span>· Claude 4.6</span>
              <span>· Tavily</span>
            </div>
          </Cell>

          {/* Stack */}
          <Cell className="p-6" delay={0.15}>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <Code2 className="h-3.5 w-3.5 text-[var(--teal)]" /> Daily driver
            </div>
            <div className="mt-3 font-display text-2xl font-semibold tracking-tight">
              Python
            </div>
            <div className="mt-1 font-mono text-[11px] text-muted-foreground">
              PyTorch · FastAPI · Pydantic
            </div>
            <div className="mt-4 flex gap-1.5">
              {["py", "ts", "go", "sql"].map((t, i) => (
                <span
                  key={t}
                  className="rounded-md border border-border bg-background/60 px-2 py-1 font-mono text-[10px] uppercase"
                  style={{ opacity: i === 0 ? 1 : 0.55 }}
                >
                  {t}
                </span>
              ))}
            </div>
          </Cell>

          {/* Now reading / vibe */}
          <Cell className="p-6" delay={0.2}>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <Coffee className="h-3.5 w-3.5 text-[var(--amber)]" /> Currently
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground">
              Obsessed with{" "}
              <span className="text-[var(--primary)]">structured outputs</span>,{" "}
              <span className="text-[var(--violet)]">LLM evaluation</span>, and{" "}
              <span className="text-[var(--coral)]">production reliability</span>{" "}
              under burst traffic.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
              <Zap className="h-3 w-3 text-[var(--amber)]" /> Shipping daily
            </div>
          </Cell>

          {/* Music — small fun cell */}
          <Cell className="p-6" delay={0.25}>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <Music2 className="h-3.5 w-3.5 text-[var(--violet)]" /> Coding to
            </div>
            <div className="mt-3 text-sm text-foreground">
              Lo-fi · electronica · The xx
            </div>
            <div className="mt-4 flex items-end gap-1 h-6">
              {[0.5, 0.8, 0.3, 0.9, 0.6, 0.7, 0.4, 0.85, 0.55].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ scaleY: [h, h * 0.4, h] }}
                  transition={{
                    duration: 1 + (i % 3) * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.07,
                  }}
                  className="w-1 origin-bottom rounded-full bg-gradient-to-t from-[var(--violet)] to-[var(--coral)]"
                  style={{ height: `${h * 100}%` }}
                />
              ))}
            </div>
          </Cell>

          {/* Stats compact */}
          <Cell className="md:col-span-3 p-6 sm:p-7" delay={0.3}>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { v: "95%", l: "manual time cut", c: "var(--primary)" },
                { v: "10K+", l: "assets analyzed", c: "var(--violet)" },
                { v: "1K+", l: "concurrent req", c: "var(--coral)" },
                { v: "$0.06", l: "per Dossier app", c: "var(--amber)" },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.5 }}
                  className="flex flex-col"
                >
                  <span
                    className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
                    style={{ color: s.c }}
                  >
                    {s.v}
                  </span>
                  <span className="mt-1 text-xs text-muted-foreground">{s.l}</span>
                </motion.div>
              ))}
            </div>
          </Cell>
        </div>
      </div>
    </section>
  );
}
