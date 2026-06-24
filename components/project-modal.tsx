"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { X, Github, ArrowUpRight, ArrowRight } from "lucide-react";
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
              className="absolute -inset-px -z-10 rounded-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(800px circle at 50% 0%, color-mix(in oklch, var(--primary) 18%, transparent), transparent 60%)",
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
              <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                <span>Case study</span>
                {project.caseStudy?.role && (
                  <>
                    <span className="text-muted-foreground/40">·</span>
                    <span>{project.caseStudy.role}</span>
                  </>
                )}
              </div>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
                {project.name}
              </h2>
              <p className="mt-2 text-base text-[var(--primary)]">{project.tagline}</p>

              {/* Real results */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {(project.caseStudy?.results ?? [project.metric]).map((r) => (
                  <div key={r.label} className="rounded-2xl border border-border bg-secondary/60 p-4">
                    <div className="font-display text-xl font-semibold tracking-tight text-[var(--primary)] sm:text-2xl">
                      {r.value}
                    </div>
                    <div className="mt-1 text-xs leading-snug text-muted-foreground">
                      {r.label}
                    </div>
                  </div>
                ))}
              </div>

              <section className="mt-8">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  The problem
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/90 sm:text-[15px]">
                  {project.caseStudy?.problem ?? project.description}
                </p>
              </section>

              {project.caseStudy?.approach && (
                <section className="mt-8">
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    Approach
                  </h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {project.caseStudy.approach.map((a, i) => (
                      <div key={a.title} className="rounded-2xl border border-border bg-secondary/40 p-4">
                        <div className="flex items-center gap-2.5">
                          <span className="grid h-7 w-7 place-items-center rounded-full border border-border bg-card font-mono text-[11px] text-[var(--primary)]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h4 className="text-sm font-semibold tracking-tight">{a.title}</h4>
                        </div>
                        <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">
                          {a.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="mt-8">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Stack
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[10px] text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </section>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href={`/work/${project.slug}`}
                  data-cursor="hover"
                  onClick={onClose}
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90"
                >
                  Read full case study
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-5 py-3 text-sm font-medium backdrop-blur transition hover:border-foreground/40"
                  >
                    <Github className="h-4 w-4" />
                    View source
                    <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
