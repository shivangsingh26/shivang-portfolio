import { Github, Star, GitFork, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SplitTextSegmented } from "@/components/motion/split-text";
import { profile } from "@/lib/data";
import { getGithubStats, getGithubActivity, type GhCell } from "@/lib/github";

function cellLevel(cell: GhCell, max: number): number {
  if (!cell) return -1;
  if (cell.count === 0) return 0;
  const r = cell.count / max;
  if (r >= 0.75) return 4;
  if (r >= 0.5) return 3;
  if (r >= 0.25) return 2;
  return 1;
}

const LEVEL_BG = [
  "bg-foreground/[0.06]",
  "bg-primary/30",
  "bg-primary/50",
  "bg-primary/75",
  "bg-primary",
];

export async function GitHubSection() {
  const [stats, activity] = await Promise.all([getGithubStats(), getGithubActivity()]);

  const statItems = [
    { value: stats ? String(stats.publicRepos) : "40+", label: "Public repos" },
    { value: stats ? String(stats.languages.length || 6) : "6", label: "Languages" },
    { value: activity ? String(activity.total) : "—", label: "Events · 90d" },
  ];

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
              segments={[{ text: "Live from" }, { text: " GitHub.", className: "text-[var(--primary)]" }]}
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

        {/* Stat strip */}
        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
            {statItems.map((s) => (
              <div key={s.label} className="cinema-card rounded-2xl p-5">
                <div className="font-display text-2xl font-semibold tracking-tight text-[var(--primary)] sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:text-[11px]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Contribution heatmap */}
        {activity && (
          <Reveal delay={0.2}>
            <div className="cinema-card mt-6 overflow-hidden rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Recent activity · last 90 days
                </div>
                <div className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                  <span className="relative inline-flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  live
                </div>
              </div>

              <div className="mt-5 -mx-2 overflow-x-auto px-2">
                <div className="flex min-w-max gap-1">
                  {activity.weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-1">
                      {week.map((cell, di) => {
                        const lvl = cellLevel(cell, activity.max);
                        return (
                          <span
                            key={di}
                            title={cell ? `${cell.count} event${cell.count === 1 ? "" : "s"} · ${cell.date}` : ""}
                            className={`h-3 w-3 rounded-sm ${lvl < 0 ? "bg-transparent" : LEVEL_BG[lvl]}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                <span>less</span>
                {LEVEL_BG.map((bg, i) => (
                  <span key={i} className={`h-2.5 w-2.5 rounded-sm ${bg}`} />
                ))}
                <span>more</span>
              </div>
            </div>
          </Reveal>
        )}

        {/* Real top repos */}
        {stats && stats.topRepos.length > 0 && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.topRepos.map((r) => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="cinema-card group rounded-2xl p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Github className="h-4 w-4 text-muted-foreground" />
                    <span className="font-mono">{r.name}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </div>
                <p className="mt-3 line-clamp-2 min-h-[2.5rem] text-sm text-muted-foreground">
                  {r.description ?? "—"}
                </p>
                <div className="mt-4 flex items-center gap-4 font-mono text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {r.stars}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitFork className="h-3 w-3" />
                    {r.forks}
                  </span>
                  {r.language && (
                    <span className="ml-auto rounded-md border border-border bg-secondary px-1.5 py-0.5">
                      {r.language}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
