import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, BookOpen, Code2, Music2, MessageSquare, Coffee } from "lucide-react";
import { BlogNav } from "@/components/blog-nav";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Now",
  description: `What ${profile.firstName} is shipping, reading, and thinking about right now.`,
};

const LAST_UPDATED = "May 2026";

type Section = {
  icon: typeof Sparkles;
  label: string;
  color: string;
  items: { text: string; sub?: string }[];
};

const SECTIONS: Section[] = [
  {
    icon: Code2,
    label: "Shipping",
    color: "var(--primary)",
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
    color: "var(--violet)",
    items: [
      { text: "Anthropic's recent papers on constitutional AI + agentic eval" },
      { text: "Designing ML Systems — Chip Huyen" },
      { text: "Daily: Hacker News, /r/MachineLearning, AI papers feed" },
    ],
  },
  {
    icon: Sparkles,
    label: "Learning",
    color: "var(--coral)",
    items: [
      { text: "Production LLM evaluation patterns (LLM-as-judge, G-Eval, DeepEval)" },
      { text: "Workflow orchestration (Temporal, Vercel Workflow DevKit, Inngest)" },
      { text: "Better prompt-engineering for structured outputs at scale" },
    ],
  },
  {
    icon: MessageSquare,
    label: "Thinking about",
    color: "var(--teal)",
    items: [
      {
        text: "Where the line is between agentic pipelines and orchestrated workflows",
      },
      {
        text: "Cost-vs-quality tradeoffs across frontier vs fine-tuned small models",
      },
      { text: "What ML infra looks like when every dev ships an LLM feature" },
    ],
  },
  {
    icon: Music2,
    label: "Listening",
    color: "var(--violet)",
    items: [
      { text: "Lo-fi · The xx · Bonobo for deep work" },
      { text: "Podcasts: Latent Space, Practical AI, Lex Fridman on systems" },
    ],
  },
  {
    icon: Coffee,
    label: "Life",
    color: "var(--amber)",
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
      <section className="mx-auto w-full max-w-3xl px-4 pt-32 pb-24 sm:px-6 md:pt-40">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          home
        </Link>

        <div className="mt-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          <span className="h-px w-8 bg-[var(--coral)]" />
          ★ Now · {LAST_UPDATED}
        </div>
        <h1 className="mt-6 font-display text-balance text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
          What I&apos;m up to <span className="aurora-text">right now.</span>
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          A snapshot of the projects, ideas, and rabbit holes I&apos;m in. Inspired by{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noreferrer"
            className="border-b border-[var(--primary)]/40 text-[var(--primary)]"
          >
            /now pages
          </a>
          . Updated monthly.
        </p>

        <div className="mt-16 space-y-12">
          {SECTIONS.map((s) => (
            <section key={s.label}>
              <div className="flex items-center gap-3">
                <s.icon className="h-4 w-4" style={{ color: s.color }} />
                <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                  {s.label}
                </h2>
              </div>
              <ul className="mt-5 space-y-3">
                {s.items.map((item, i) => (
                  <li key={i} className="flex gap-3 text-base leading-relaxed">
                    <span
                      className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: s.color }}
                    />
                    <div>
                      <span className="text-foreground">{item.text}</span>
                      {item.sub && (
                        <div className="mt-1 text-sm text-muted-foreground">{item.sub}</div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-20 rounded-2xl border border-border bg-card/30 p-6 backdrop-blur">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Last updated
          </div>
          <div className="mt-2 text-foreground">{LAST_UPDATED}</div>
          <div className="mt-1 text-sm text-muted-foreground">
            Want to chat about any of this? Email me at{" "}
            <a
              href={`mailto:${profile.email}`}
              className="border-b border-[var(--primary)]/40 text-[var(--primary)]"
            >
              {profile.email}
            </a>
            .
          </div>
        </div>
      </section>
    </main>
  );
}
