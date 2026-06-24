import { Image as ImageIcon, Sparkles, ShieldCheck, Braces } from "lucide-react";

type Stage = {
  icon: typeof ImageIcon;
  label: string;
  sub: string;
};

const STAGES: Stage[] = [
  { icon: ImageIcon, label: "Ingest", sub: "image · video · gif" },
  { icon: Sparkles, label: "Gemini 2.5 Pro", sub: "multi-stage inference" },
  { icon: ShieldCheck, label: "Validate", sub: "Pydantic · retry · backpressure" },
  { icon: Braces, label: "Signals", sub: "50+ structured JSON" },
];

const CHIPS = ["≈2 min / asset", "1K+ rps", "95% faster"];

/**
 * Hero signature visual — a premium "production pipeline" console that mirrors
 * Shivang's actual domain (multimodal GenAI). Pure CSS motion, theme-aware,
 * lightweight. Replaces the old WebGL globe.
 */
export function HeroPanel() {
  return (
    <div
      className="relative w-full max-w-[440px] overflow-hidden rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-xl shadow-[var(--shadow-cinema)]"
    >
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
            Production · live
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80">
          BLR · 12.97°N
        </span>
      </div>

      <div className="relative mt-1.5">
        <span className="font-display text-sm font-semibold tracking-tight text-foreground">
          Bodhi Atomize
        </span>
        <span className="ml-2 font-mono text-[11px] text-muted-foreground">
          multimodal pipeline
        </span>
      </div>

      {/* Pipeline */}
      <div className="relative mt-6">
        {/* Rail + travelling signal, centered on the 40px node column. */}
        <div className="pointer-events-none absolute bottom-5 left-5 top-5 w-px -translate-x-1/2">
          <div className="absolute inset-0 bg-gradient-to-b from-border via-primary/40 to-border" />
          <span
            className="hero-comet absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary"
            style={{ boxShadow: "0 0 14px 2px color-mix(in oklch, var(--primary) 70%, transparent)" }}
          />
        </div>

        <ul className="relative flex flex-col gap-4">
          {STAGES.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <li key={stage.label} className="grid grid-cols-[40px_1fr] items-center gap-3">
                <span
                  className="hero-node relative z-10 grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-primary"
                  style={{ animationDelay: `${i}s` }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-foreground">
                    {stage.label}
                  </span>
                  <span className="block truncate font-mono text-[11px] text-muted-foreground">
                    {stage.sub}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Metric chips */}
      <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
        {CHIPS.map((c) => (
          <span
            key={c}
            className="rounded-full border border-border bg-secondary px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
