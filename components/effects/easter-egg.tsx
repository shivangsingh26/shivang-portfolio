"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X } from "lucide-react";
import { track } from "@/lib/telemetry";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const FUN_FACTS = [
  "I once debugged an LLM pipeline for 14 hours straight. The bug was a single space in the system prompt.",
  "I genuinely think token budgeting is more important than model choice 80% of the time.",
  "Hot take: most RAG systems should just be a SQL query with a re-ranker on top.",
  "I keep a Notion of every prompt-engineering trick that has shipped to prod. It's 47 pages long.",
  "Favorite production failure mode: the LLM hallucinated a perfectly valid JSON schema we'd never seen.",
];

export function EasterEgg() {
  const [active, setActive] = useState(false);
  const [fact, setFact] = useState(0);

  useEffect(() => {
    let buffer: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      // Skip when typing in inputs
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      buffer = [...buffer, e.key].slice(-KONAMI.length);
      const match = buffer.length === KONAMI.length && buffer.every((k, i) => k === KONAMI[i]);
      if (match) {
        setActive(true);
        setFact(Math.floor(Math.random() * FUN_FACTS.length));
        track("cta_click", { target: "konami", location: "easter_egg" });
        buffer = [];
      }
      // Secondary trigger: type "shivang" anywhere
      if (e.key.length === 1) {
        const s = buffer.slice(-7).join("").toLowerCase();
        if (s.endsWith("shivang")) {
          setActive(true);
          setFact(Math.floor(Math.random() * FUN_FACTS.length));
          track("cta_click", { target: "shivang_type", location: "easter_egg" });
          buffer = [];
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-background/80 backdrop-blur"
            onClick={() => setActive(false)}
          />
          <motion.div
            role="dialog"
            aria-label="You found the secret"
            initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 18, stiffness: 250 }}
            className="fixed left-1/2 top-1/2 z-[160] w-[min(440px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-border bg-background p-7 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
          >
            <div
              aria-hidden
              className="absolute -inset-20 -z-10 opacity-60 blur-3xl"
              style={{
                background:
                  "conic-gradient(from 0deg, oklch(0.66 0.18 254 / 0.4), oklch(0.68 0.22 290 / 0.4), oklch(0.72 0.20 18 / 0.4), oklch(0.66 0.18 254 / 0.4))",
              }}
            />
            <button
              type="button"
              onClick={() => setActive(false)}
              aria-label="Close"
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-lg border border-border bg-card/60 transition hover:border-foreground/40"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-[var(--coral)]" />
              You found the secret
            </div>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.03em]">
              <span className="aurora-text">Hello there.</span>
            </h2>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-foreground">
              {FUN_FACTS[fact]}
            </p>
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setFact((f) => (f + 1) % FUN_FACTS.length)}
                className="rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs transition hover:border-foreground/40"
              >
                Tell me another →
              </button>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                ↑↑↓↓←→←→ B A
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
