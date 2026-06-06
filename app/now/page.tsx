import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, BookOpen, Code2, Music2, MessageSquare, Coffee } from "lucide-react";
import { BlogNav } from "@/components/blog-nav";
import { Eyebrow } from "@/components/eyebrow";
import { FooterMini } from "@/components/footer-mini";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Now",
  description: `What ${profile.firstName} is shipping, reading, and thinking about right now.`,
};

const LAST_UPDATED = "May 2026";

type Section = {
  icon: typeof Sparkles;
  label: string;
  items: { text: string; sub?: string }[];
};

const SECTIONS: Section[] = [
  {
    icon: Code2,
    label: "Shipping",
    items: [
      {
        text: "Bodhi Atomize multimodal pipeline expansion",
        sub: "Scaling video-asset analysis to 50k+ items/month at Publicis Sapient",
      },
      {
        text: "Dossier v2 — async agent orchestration",
        sub: "Moving from ThreadPoolExecutor to a proper DAG runner",
      },
      { text: "This portfolio site — adding more interactive pieces", sub: "shivangsingh.dev" },
    ],
  },
  {
    icon: BookOpen,
    label: "Reading",
    items: [
      { text: "Anthropic's recent papers on constitutional AI + agentic eval" },
      { text: "Designing ML Systems — Chip Huyen" },
      { text: "Daily: Hacker News, /r/MachineLearning, AI papers feed" },
    ],
  },
  {
    icon: Sparkles,
    label: "Learning",
    items: [
      { text: "Production LLM evaluation patterns (LLM-as-judge, G-Eval, DeepEval)" },
      { text: "Workflow orchestration (Temporal, Vercel Workflow DevKit, Inngest)" },
      { text: "Better prompt-engineering for structured outputs at scale" },
    ],
  },
  {
    icon: MessageSquare,
    label: "Thinking about",
    items: [
      { text: "Where the line is between agentic pipelines and orchestrated workflows" },
      { text: "Cost-vs-quality tradeoffs across frontier vs fine-tuned small models" },
      { text: "What ML infra looks like when every dev ships an LLM feature" },
    ],
  },
  {
    icon: Music2,
    label: "Listening",
    items: [
      { text: "Lo-fi · The xx · Bonobo for deep work" },
      { text: "Podcasts: Latent Space, Practical AI, Lex Fridman on systems" },
    ],
  },
  {
    icon: Coffee,
    label: "Life",
    items: [
      { text: "Bengaluru, IN · IST" },
      { text: "Open to AI Engineer / ML Engineer roles — full-time or contract" },
      { text: "Always up for a chat about GenAI systems in production" },
    ],
  },
];

export default function Now() {
  return (
    <main className="relative min-h-screen">
      <BlogNav />
      <section className="relative mx-auto w-full max-w-4xl px-4 pt-32 pb-24 sm:px-6 md:pt-40">
        {/* Hero glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[360px] w-[640px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.70 0.18 295 / 0.18), oklch(0.68 0.16 254 / 0.12) 50%, transparent 75%)",
          }}
        />

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
          data-cursor="hover"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          home
        </Link>

        <div className="mt-10">
          <Eyebrow>Now · {LAST_UPDATED}</Eyebrow>
        </div>
        <h1 className="mt-6 font-display text-balance text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
          What I&apos;m up to <span className="text-[var(--primary)]">right now.</span>
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          A snapshot of the projects, ideas, and rabbit holes I&apos;m in. Inspired by{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noreferrer"
            className="border-b border-[var(--primary)]/40 text-[var(--primary)] transition-colors hover:border-[var(--primary)]"
          >
            /now pages
          </a>
          . Updated monthly.
        </p>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {SECTIONS.map((s, idx) => {
            // Alternate primary/violet only — semantic 2-hue system
            const isViolet = idx % 2 === 1;
            const hue = isViolet ? "var(--violet)" : "var(--primary)";
            return (
              <section
                key={s.label}
                className="cinema-card group relative overflow-hidden rounded-2xl p-6 backdrop-blur sm:p-7"
              >
                <span
                  aria-hidden
                  className="absolute right-0 top-0 h-24 w-24 rounded-full opacity-20 blur-3xl transition-opacity duration-700 group-hover:opacity-40"
                  style={{ background: hue }}
                />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-background/60"
                    >
                      <s.icon className="h-4 w-4" style={{ color: hue }} />
                    </span>
                    <h2 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                      {s.label}
                    </h2>
                  </div>
                  <ul className="mt-5 space-y-3">
                    {s.items.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed">
                        <span
                          className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: hue }}
                        />
                        <div>
                          <span className="text-foreground">{item.text}</span>
                          {item.sub && (
                            <div className="mt-1 text-xs text-muted-foreground">{item.sub}</div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>

        <div className="cinema-card mt-12 rounded-2xl p-6 backdrop-blur">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Last updated
          </div>
          <div className="mt-2 text-foreground">{LAST_UPDATED}</div>
          <div className="mt-1 text-sm text-muted-foreground">
            Want to chat about any of this? Email me at{" "}
            <a
              href={`mailto:${profile.email}`}
              className="border-b border-[var(--primary)]/40 text-[var(--primary)] transition-colors hover:border-[var(--primary)]"
            >
              {profile.email}
            </a>
            .
          </div>
        </div>
      </section>

      <FooterMini />
    </main>
  );
}
