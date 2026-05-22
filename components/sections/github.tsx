"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Github, Star, GitFork, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SplitTextSegmented } from "@/components/motion/split-text";
import { profile, projects } from "@/lib/data";

export function GitHubSection() {
  return (
    <section id="github" className="relative w-full py-32 sm:py-44">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-px w-8 bg-primary" />
            05 · Open source
          </div>
        </Reveal>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
            <SplitTextSegmented
              segments={[
                { text: "Live from" },
                { text: " GitHub.", className: "gradient-text" },
              ]}
            />
          </h2>
            <a
              href={`https://github.com/${profile.github}`}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
            >
              <Github className="h-4 w-4" />@{profile.github}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-border/40 bg-card/40 p-6 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Contribution graph
              </div>
              <div className="font-mono text-[11px] text-muted-foreground">live</div>
            </div>
            <div className="mt-5 -mx-2 overflow-x-auto">
              <div className="min-w-[700px] px-2">
                <Image
                  src={`https://ghchart.rshah.org/6366f1/${profile.github}`}
                  alt={`${profile.github} GitHub contributions chart`}
                  width={720}
                  height={120}
                  className="h-auto w-full opacity-90 [filter:drop-shadow(0_0_24px_oklch(0.72_0.20_250/0.25))]"
                  unoptimized
                />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              <span>less</span>
              <span className="h-2.5 w-2.5 rounded-sm bg-foreground/10" />
              <span className="h-2.5 w-2.5 rounded-sm bg-primary/30" />
              <span className="h-2.5 w-2.5 rounded-sm bg-primary/55" />
              <span className="h-2.5 w-2.5 rounded-sm bg-primary/80" />
              <span className="h-2.5 w-2.5 rounded-sm bg-primary" />
              <span>more</span>
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p, i) => (
            <motion.a
              key={p.name}
              href={p.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -3 }}
              className="group rounded-xl border border-border/40 bg-card/40 p-5 backdrop-blur transition hover:border-primary/40"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Github className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono">{profile.github}/{p.name.toLowerCase()}</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{p.tagline}</p>
              <div className="mt-4 flex items-center gap-4 font-mono text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Star className="h-3 w-3" />featured</span>
                <span className="inline-flex items-center gap-1"><GitFork className="h-3 w-3" />public</span>
                <span className="ml-auto rounded-md border border-border/60 bg-background/40 px-1.5 py-0.5">
                  {p.stack[0]}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
