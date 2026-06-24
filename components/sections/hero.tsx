"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, MapPin, Sparkles, Cpu, BadgeCheck } from "lucide-react";
import { profile } from "@/lib/data";
import { Magnetic } from "@/components/motion/magnetic";
import { TypingText } from "@/components/motion/typing-text";
import { AuroraBg } from "@/components/hero/aurora-bg";
import { HeroSpotlight } from "@/components/effects/hero-spotlight";
import { HeroPanel } from "@/components/hero/hero-panel";
import { dispatchOpenChat } from "@/lib/events";
import { track } from "@/lib/telemetry";

const ROLES = ["AI Engineer", "GenAI Architect", "ML Systems Builder", "LLM Infra Engineer"];

export function Hero({ onOpenChat = dispatchOpenChat }: { onOpenChat?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Cinematic scroll-driven scene. Disabled on reduce-motion.
  const auroraY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "-15%"]);
  const auroraOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.6, 0.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "-10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.6, 0]);
  const panelScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 0.9]);
  const panelY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "6%"]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden"
    >
      {/* Aurora — sole background field, drifts on scroll */}
      <motion.div
        style={{ y: auroraY, opacity: auroraOpacity }}
        className="absolute inset-0 -z-10"
      >
        <AuroraBg />
      </motion.div>

      {/* Subtle cursor spotlight kept — adds responsive depth, not noise */}
      <HeroSpotlight />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 pt-32 sm:px-6 md:pt-36 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-8"
      >
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

          {/* Name — last name is the ONLY aurora-text on the page */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-balance text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[1.02] tracking-[-0.045em]"
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
                <span className="absolute inset-0 -z-10 translate-y-full bg-gradient-to-tr from-[var(--violet)] to-[var(--primary)] transition-transform duration-500 group-hover:translate-y-0" />
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
                <Sparkles className="h-4 w-4 text-[var(--violet)]" />
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

        {/* RIGHT: Pipeline console — bespoke signature visual, scroll-scaled */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ scale: panelScale, y: panelY }}
          className="relative flex items-center justify-center lg:justify-end"
        >
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-10 -z-10 rounded-full opacity-60 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklch, var(--primary) 20%, transparent), transparent 70%)",
              }}
            />
            <HeroPanel />
          </div>
        </motion.div>
      </motion.div>

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
