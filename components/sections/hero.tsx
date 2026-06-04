"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, MapPin, Sparkles, Cpu, BadgeCheck } from "lucide-react";
import { profile } from "@/lib/data";
import { Magnetic } from "@/components/motion/magnetic";
import { TypingText } from "@/components/motion/typing-text";
import { AuroraBg } from "@/components/hero/aurora-bg";
import { HeroSpotlight } from "@/components/effects/hero-spotlight";
import { OrbitRing } from "@/components/effects/orbit-ring";
import { DotGrid } from "@/components/effects/dot-grid";
import { NeuralCanvas } from "@/components/effects/neural-canvas";
import { Hero3D } from "@/components/effects/hero-3d";
import { dispatchOpenChat } from "@/lib/events";
import { track } from "@/lib/telemetry";

const Globe = dynamic(() => import("@/components/hero/globe").then((m) => m.Globe), {
  ssr: false,
  loading: () => null,
});

const ROLES = ["AI Engineer", "GenAI Architect", "ML Systems Builder", "LLM Infra Engineer"];

export function Hero({ onOpenChat = dispatchOpenChat }: { onOpenChat?: () => void }) {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden"
    >
      <AuroraBg />

      {/* Neural network constellation */}
      <NeuralCanvas className="-z-[6] opacity-70" />

      {/* Dot grid (replaces flat lines) */}
      <DotGrid className="-z-[5] opacity-50" />

      {/* Cursor-tracked spotlight */}
      <HeroSpotlight />

      {/* Corner brackets — terminal-style decoration */}
      <div aria-hidden className="pointer-events-none absolute inset-6 -z-[3] hidden lg:block">
        <span className="absolute left-0 top-0 h-6 w-6 border-l border-t border-foreground/15" />
        <span className="absolute right-0 top-0 h-6 w-6 border-r border-t border-foreground/15" />
        <span className="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-foreground/15" />
        <span className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-foreground/15" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 pt-32 sm:px-6 md:pt-36 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-8">
        {/* LEFT: text */}
        <div>
          {/* Status pill row */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-7 flex flex-wrap items-center gap-2"
          >
            <span className="gradient-border relative inline-flex items-center gap-2 rounded-full bg-card/60 px-3 py-1.5 backdrop-blur">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Available · open to roles
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/40 px-2.5 py-1 backdrop-blur">
              <BadgeCheck className="h-3 w-3 text-[var(--primary)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                @ {profile.company}
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/40 px-2.5 py-1 backdrop-blur">
              <Cpu className="h-3 w-3 text-[var(--violet)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Shipping Bodhi Atomize
              </span>
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-balance text-[clamp(2.75rem,8.5vw,7rem)] font-semibold leading-[1.02] tracking-[-0.045em]"
          >
            <span className="text-foreground">{profile.firstName} </span>
            <span className="aurora-text">{profile.lastName}.</span>
          </motion.h1>

          {/* Typing role */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 flex flex-wrap items-baseline gap-x-3 text-lg text-muted-foreground sm:text-xl"
          >
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground/70">
              &gt;
            </span>
            <span className="text-foreground/90">
              <TypingText words={ROLES} />
            </span>
            <span className="text-muted-foreground/60">at</span>
            <span className="text-foreground/90">{profile.company}</span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            I build and scale GenAI systems in production — where{" "}
            <span className="text-foreground">latency</span>,{" "}
            <span className="text-foreground">token limits</span>, and{" "}
            <span className="text-foreground">failure modes</span> matter as much as model
            quality.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={0.2}>
              <a
                href="#projects"
                data-cursor="hover"
                onClick={() => track("cta_click", { target: "view_work", location: "hero" })}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background shadow-[0_0_0_1px_oklch(1_0_0_/_0.08),0_8px_30px_-8px_oklch(0.66_0.18_254_/_0.5)] transition"
              >
                <span className="absolute inset-0 -z-10 translate-y-full bg-gradient-to-tr from-[var(--violet)] via-[var(--primary)] to-[var(--coral)] transition-transform duration-500 group-hover:translate-y-0" />
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 opacity-60"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.18), transparent)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 3.5s linear infinite",
                  }}
                />
                <span className="relative group-hover:text-white">View work</span>
                <ArrowUpRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <button
                type="button"
                onClick={() => {
                  track("chat_open", { source: "hero_cta" });
                  onOpenChat();
                }}
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-5 py-3 text-sm font-medium backdrop-blur transition-colors hover:border-foreground/40"
              >
                <Sparkles className="h-4 w-4 text-[var(--coral)]" />
                Talk to my AI
              </button>
            </Magnetic>
            <span className="ml-1 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80 sm:text-[11px]"
          >
            <span>Production GenAI</span>
            <span className="text-muted-foreground/30">·</span>
            <span>LLM Infra</span>
            <span className="text-muted-foreground/30">·</span>
            <span>Computer Vision</span>
            <span className="text-muted-foreground/30">·</span>
            <span>FastAPI · K8s</span>
          </motion.div>
        </div>

        {/* RIGHT: Globe — statement element */}
        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-10 -z-10 rounded-full opacity-60 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.66 0.18 254 / 0.25), oklch(0.68 0.22 290 / 0.15) 50%, transparent 80%)",
              }}
            />
            <OrbitRing size={620} />
            <div className="pointer-events-none absolute inset-0 -z-[2] opacity-50">
              <Hero3D />
            </div>
            <Globe size={520} />
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-border bg-background/80 px-3 py-1.5 backdrop-blur"
            >
              <div className="flex items-center gap-2">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[var(--coral)] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--coral)]" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Bengaluru · 12.97°N 77.59°E
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7, y: [0, 5, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.6 },
          y: { delay: 1.2, duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="group absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] opacity-70 group-hover:opacity-100">
          Scroll
        </span>
        <ArrowDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}
