"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Github, ArrowUpRight, Zap, Cpu, Gauge } from "lucide-react";
import type { Project } from "@/lib/data";

type Props = { project: Project | null; onClose: () => void };

export function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[120] bg-background/80 backdrop-blur-xl"
          />
          <motion.div
            layoutId={`project-${project.name}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 top-[5vh] z-[130] mx-auto max-h-[90vh] w-[min(960px,calc(100vw-1.5rem))] overflow-y-auto rounded-3xl border border-border bg-card/95 backdrop-blur-xl shadow-[var(--shadow-cinema-hover)]"
          >
            <div
              aria-hidden
              className="absolute -inset-px -z-10 rounded-3xl opacity-50"
              style={{
                background:
                  "radial-gradient(800px circle at 50% 0%, oklch(0.72 0.20 250 / 0.18), transparent 60%)",
              }}
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-border bg-card/80 backdrop-blur transition hover:border-foreground/40"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-6 sm:p-10">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Case study
              </div>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
                {project.name}
              </h2>
              <p className="mt-2 text-base text-[var(--primary)]">{project.tagline}</p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    <Zap className="h-3 w-3 text-[var(--amber)]" /> Headline
                  </div>
                  <div className="mt-2 font-display text-2xl font-semibold tracking-tight">
                    <span className="gradient-text">{project.metric.value}</span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {project.metric.label}
                  </div>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    <Cpu className="h-3 w-3 text-[var(--violet)]" /> Stack depth
                  </div>
                  <div className="mt-2 font-display text-2xl font-semibold tracking-tight">
                    {project.stack.length}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    components in pipeline
                  </div>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    <Gauge className="h-3 w-3 text-[var(--coral)]" /> Status
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> shipping
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">production traffic</div>
                </div>
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <section>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    Problem
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                    {project.description}
                  </p>
                </section>
                <section>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    Approach
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--primary)]" />
                      Designed multi-stage pipeline with backpressure + retry
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--violet)]" />
                      Token-budgeted LLM calls with structured Pydantic output
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--coral)]" />
                      KEDA-autoscaled microservices on Kubernetes
                    </li>
                  </ul>
                </section>
              </div>

              <section className="mt-8">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Stack
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-border/60 bg-background/50 px-2 py-1 font-mono text-[10px] text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </section>

              {project.github && (
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
                  >
                    <Github className="h-4 w-4" />
                    View source
                    <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
