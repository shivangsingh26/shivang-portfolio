"use client";

import { motion } from "motion/react";
import { Sparkles, ArrowUpRight, MessageSquare } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SplitTextSegmented } from "@/components/motion/split-text";
import { dispatchOpenChat } from "@/lib/events";
import { track } from "@/lib/telemetry";

const SAMPLE_PROMPTS = [
  "Walk me through Bodhi Atomize.",
  "What's Dossier and why $0.04 per run?",
  "Why should I hire you?",
  "How do you handle LLM failures in production?",
  "Tell me about your federated-learning thesis.",
  "What's your most expensive production bug?",
];

export function AIConcierge() {
  const open = (prompt?: string) => {
    track("chat_open", { source: "other" });
    if (prompt) {
      try {
        sessionStorage.setItem("shivang.chat.prefill", prompt);
      } catch {
        // ignore
      }
    }
    dispatchOpenChat();
  };

  return (
    <section id="ai-concierge" className="relative w-full py-28 sm:py-36">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-px w-8 bg-[var(--coral)]" />
            ★ AI Concierge
          </div>
        </Reveal>

        <div className="relative mt-8 overflow-hidden rounded-3xl border border-border bg-card/40 backdrop-blur">
          {/* animated aurora border */}
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl">
            <div
              className="absolute -inset-px rounded-3xl opacity-60"
              style={{
                background:
                  "conic-gradient(from 0deg, oklch(0.66 0.18 254 / 0.4), oklch(0.68 0.22 290 / 0.5), oklch(0.72 0.20 18 / 0.4), oklch(0.78 0.15 70 / 0.3), oklch(0.66 0.18 254 / 0.4))",
                animation: "spin 14s linear infinite",
              }}
            />
            <div className="absolute inset-[1px] rounded-3xl bg-background/95" />
          </div>

          {/* inner glow blob */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, oklch(0.68 0.22 290 / 0.5), transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -bottom-20 h-56 w-56 rounded-full opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, oklch(0.72 0.20 18 / 0.5), transparent 70%)",
            }}
          />

          <div className="relative grid gap-10 p-7 sm:p-10 md:grid-cols-[1.1fr_1fr] md:gap-12">
            {/* LEFT: pitch */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 backdrop-blur">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Live · grounded on resume
                </span>
              </div>

              <h2 className="mt-5 font-display text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
                <SplitTextSegmented
                  segments={[
                    { text: "Don't read the resume." },
                    { text: " Talk to it.", className: "aurora-text" },
                  ]}
                />
              </h2>

              <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Skip the scrolling. Ask my AI anything about my production GenAI
                work, side projects, hiring fit, or technical decisions.
                Streams answers grounded only on my real experience.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <motion.button
                  type="button"
                  onClick={() => open()}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  data-cursor="hover"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-3 text-sm font-medium text-background transition"
                >
                  <span className="absolute inset-0 -z-10 bg-gradient-to-tr from-[var(--violet)] via-[var(--primary)] to-[var(--coral)]" />
                  <Sparkles className="h-4 w-4" />
                  Start chatting
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.button>
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  <MessageSquare className="h-3 w-3" />
                  Free · instant · no signup
                </div>
              </div>
            </div>

            {/* RIGHT: sample prompts */}
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Try one of these
              </div>
              <div className="mt-4 space-y-2">
                {SAMPLE_PROMPTS.map((p, i) => (
                  <motion.button
                    key={p}
                    type="button"
                    onClick={() => open(p)}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    whileHover={{ x: 4 }}
                    className="group flex w-full items-center gap-3 rounded-xl border border-border bg-background/40 px-3.5 py-3 text-left text-sm text-muted-foreground transition hover:border-[var(--primary)]/40 hover:text-foreground"
                  >
                    <span
                      aria-hidden
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-border bg-card/60 transition group-hover:border-[var(--primary)]/40"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-[var(--primary)]" />
                    </span>
                    <span className="flex-1 leading-snug">{p}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--primary)]" />
                  </motion.button>
                ))}
              </div>
              <div className="mt-4 font-mono text-[10px] text-muted-foreground/70">
                Powered by Claude Sonnet 4.6 · streaming via Vercel
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
