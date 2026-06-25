import Link from "next/link";
import { Boxes, Workflow, ArrowUpRight, ArrowRight } from "lucide-react";

type Flagship = {
  name: string;
  tag: string;
  desc: string;
  sub: string;
  metrics: string[];
  href: string;
  icon: typeof Boxes;
};

const FLAGSHIPS: Flagship[] = [
  {
    name: "Bodhi Atomize",
    tag: "Production",
    desc: "Multimodal GenAI platform",
    sub: "Publicis Sapient · Eli Lilly",
    metrics: ["95% faster", "10K+ assets"],
    href: "/#experience",
    icon: Boxes,
  },
  {
    name: "Dossier",
    tag: "Solo build",
    desc: "Agentic job-search SaaS",
    sub: "8-agent pipeline",
    metrics: ["~$0.04 / run", "3-pass resumes"],
    href: "/work/dossier",
    icon: Workflow,
  },
];

/**
 * Hero signature visual — a premium "featured work" panel highlighting both
 * flagship builds (Bodhi Atomize + Dossier) equally. Theme-aware, lightweight.
 */
export function HeroPanel() {
  return (
    <div className="relative w-full max-w-[440px] overflow-hidden rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-xl shadow-[var(--shadow-cinema)]">
      {/* Ambient indigo wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-60 blur-3xl"
        style={{ background: "color-mix(in oklch, var(--primary) 22%, transparent)" }}
      />

      {/* Header */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Featured work
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80">
          BLR · 12.97°N
        </span>
      </div>

      {/* Flagships */}
      <div className="relative mt-5 space-y-3">
        {FLAGSHIPS.map((f) => {
          const Icon = f.icon;
          return (
            <Link
              key={f.name}
              href={f.href}
              data-cursor="hover"
              className="group block rounded-2xl border border-border bg-secondary/40 p-4 transition hover:border-[var(--primary)]/45 hover:bg-secondary/70"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card text-[var(--primary)] transition group-hover:border-[var(--primary)]/40">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold tracking-tight text-foreground">
                        {f.name}
                      </span>
                      <span className="rounded-full border border-border bg-card px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                        {f.tag}
                      </span>
                    </div>
                    <div className="mt-0.5 text-[13px] text-muted-foreground">{f.desc}</div>
                    <div className="font-mono text-[10px] text-muted-foreground/70">{f.sub}</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--primary)]" />
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {f.metrics.map((m) => (
                  <span
                    key={m}
                    className="rounded-full bg-[var(--primary)]/10 px-2 py-0.5 font-mono text-[10px] font-medium text-[var(--primary)]"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <Link
        href="/#projects"
        data-cursor="hover"
        className="group mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition hover:text-foreground"
      >
        All work
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
