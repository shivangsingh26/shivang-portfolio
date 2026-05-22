"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SplitTextSegmented } from "@/components/motion/split-text";
import { Tilt } from "@/components/motion/tilt";
import { projects, type Project } from "@/lib/data";

function ProjectCard({ p, idx }: { p: Project; idx: number }) {
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const bg = useTransform([mx, my], ([x, y]) =>
    `radial-gradient(380px circle at ${x}% ${y}%, oklch(0.72 0.20 250 / 0.18), transparent 60%)`
  );

  const handle = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <Tilt max={5} className="h-full">
    <motion.div
      onMouseMove={handle}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-full overflow-hidden rounded-2xl border border-border/40 bg-card/40 p-6 backdrop-blur transition hover:border-primary/40 sm:p-8"
    >
      <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: bg }} aria-hidden />
      <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-primary/20" aria-hidden />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            / project {String(idx + 1).padStart(2, "0")}
          </div>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {p.name}
          </h3>
          <p className="mt-1 text-sm text-primary/90 sm:text-base">{p.tagline}</p>
        </div>
        <div className="shrink-0 rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-right backdrop-blur">
          <div className="font-display text-lg font-semibold tracking-tight">
            <span className="gradient-text">{p.metric.value}</span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {p.metric.label}
          </div>
        </div>
      </div>

      <p className="relative mt-5 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
        {p.description}
      </p>

      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {p.stack.map((s) => (
          <span
            key={s}
            className="rounded-md border border-border/60 bg-background/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground transition group-hover:border-primary/30"
          >
            {s}
          </span>
        ))}
      </div>

      {p.github && (
        <a
          href={p.github}
          target="_blank"
          rel="noreferrer"
          data-cursor="hover"
          className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-primary"
        >
          <Github className="h-4 w-4" />
          View source
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      )}
    </motion.div>
    </Tilt>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative w-full py-32 sm:py-44">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-px w-8 bg-primary" />
            03 · Selected projects
          </div>
        </Reveal>
        <h2 className="mt-8 font-display text-balance text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
          <SplitTextSegmented
            segments={[
              { text: "Things I've" },
              { text: " shipped.", className: "gradient-text" },
            ]}
          />
        </h2>

        <div className="mt-16 grid gap-5 sm:gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} p={p} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
