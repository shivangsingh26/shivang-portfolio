import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Download,
  Mail,
  Linkedin,
  Check,
  MapPin,
  Clock,
} from "lucide-react";
import { BlogNav } from "@/components/blog-nav";
import { FooterMini } from "@/components/footer-mini";
import { profile, stats, experiences, projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "For recruiters",
  description: `${profile.name} — ${profile.role}. 20-second scan: impact, stack, availability, resume.`,
  openGraph: {
    title: `${profile.name} — for recruiters`,
    description: `${profile.role} · ${profile.company}. Production GenAI, LLM infra, MLOps. Available.`,
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("For recruiters")}&subtitle=${encodeURIComponent(`${profile.name} · ${profile.role}`)}&kind=post`,
        width: 1200,
        height: 630,
        alt: `${profile.name} — for recruiters`,
      },
    ],
  },
  alternates: { canonical: "/recruiters" },
};

const COMPETENCIES = [
  {
    title: "Production GenAI",
    detail: "LLM pipelines handling real traffic — structured outputs, evals, not demos.",
  },
  {
    title: "LLM infrastructure",
    detail: "Token budgeting, exponential-backoff retries, backpressure, KEDA autoscaling.",
  },
  {
    title: "Multimodal CV + LLM",
    detail: "YOLO / PaddleOCR fused into Gemini workflows — 50+ typed signals per asset.",
  },
  {
    title: "MLOps & backend",
    detail: "FastAPI · Kubernetes · Redis · Celery — shipped, observed, on production traffic.",
  },
];

const CORE_STACK = [
  "Python",
  "FastAPI",
  "Kubernetes",
  "Gemini 2.5 Pro",
  "Claude",
  "LangChain",
  "PyTorch",
  "Redis",
  "Docker",
  "GCP / AWS",
];

const SELECTED = projects.filter((p) => p.slug === "dossier" || p.highlight).slice(0, 1);

export default function RecruitersPage() {
  const current = experiences.find((e) => e.current) ?? experiences[0];

  return (
    <main className="relative min-h-screen">
      <BlogNav suffix="recruiters" />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[360px] w-[640px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(ellipse, color-mix(in oklch, var(--primary) 20%, transparent), transparent 72%)" }}
      />

      <div className="mx-auto w-full max-w-4xl px-4 pt-32 pb-24 sm:px-6 md:pt-40">
        {/* Header */}
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Available
          </span>
          <span>For recruiters · 20-second scan</span>
        </div>

        <h1 className="mt-6 font-display text-balance text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
          {profile.firstName} <span className="text-[var(--primary)]">{profile.lastName}.</span>
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {profile.role} · {profile.company}
        </p>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-foreground/90">
          {profile.summary}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> {profile.location} · open to remote
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> AI / ML · GenAI · LLM-infra roles
          </span>
        </div>

        {/* Quick actions */}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
          >
            <Download className="h-4 w-4" />
            Download résumé
          </a>
          <a
            href={`mailto:${profile.email}?subject=${encodeURIComponent("Role for you")}`}
            data-cursor="hover"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-5 py-2.5 text-sm font-medium backdrop-blur transition hover:border-foreground/40"
          >
            <Mail className="h-4 w-4" /> Email
          </a>
          <a
            href={`https://linkedin.com/in/${profile.linkedin}`}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-5 py-2.5 text-sm font-medium backdrop-blur transition hover:border-foreground/40"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
        </div>

        {/* Impact metrics */}
        <section className="mt-14">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Impact
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {stats.map((s) => (
              <div key={s.label} className="cinema-card rounded-2xl p-4 sm:p-5">
                <div className="font-display text-2xl font-semibold tracking-tight text-[var(--primary)] sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1.5 text-xs leading-snug text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* What I bring */}
        <section className="mt-14">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            What I bring
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4">
            {COMPETENCIES.map((c) => (
              <div key={c.title} className="flex gap-3 rounded-2xl border border-border bg-card/50 p-4">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--primary)]/12 text-[var(--primary)]">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <div>
                  <div className="text-sm font-semibold tracking-tight">{c.title}</div>
                  <div className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{c.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core stack */}
        <section className="mt-14">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Core stack
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {CORE_STACK.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* Current role + selected work */}
        <section className="mt-14 grid gap-4 md:grid-cols-2">
          <div className="cinema-card rounded-2xl p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Current
            </div>
            <div className="mt-2 text-base font-semibold tracking-tight">{current.company}</div>
            <div className="text-sm text-[var(--primary)]">{current.role}</div>
            <div className="mt-1 font-mono text-[11px] text-muted-foreground">{current.period}</div>
            <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{current.bullets[0]}</p>
          </div>

          {SELECTED.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              data-cursor="hover"
              className="cinema-card group rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Flagship build
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--primary)]" />
              </div>
              <div className="mt-2 text-base font-semibold tracking-tight">{p.name}</div>
              <div className="text-sm text-[var(--primary)]">{p.tagline}</div>
              <div className="mt-3 inline-flex items-baseline gap-1.5">
                <span className="font-display text-xl font-semibold tracking-tight">{p.metric.value}</span>
                <span className="text-xs text-muted-foreground">{p.metric.label}</span>
              </div>
            </Link>
          ))}
        </section>

        {/* Bottom CTA */}
        <section className="cinema-card mt-16 flex flex-col items-start justify-between gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <div className="font-display text-xl font-semibold tracking-tight">Think I&apos;m a fit?</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Résumé is one click. Or email me directly — I reply fast.
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
            >
              <Download className="h-4 w-4" /> Résumé
            </a>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-5 py-2.5 text-sm font-medium transition hover:border-foreground/40"
            >
              <Mail className="h-4 w-4" /> {profile.email}
            </a>
          </div>
        </section>

        <Link
          href="/"
          data-cursor="hover"
          className="mt-10 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition hover:text-foreground"
        >
          ← full portfolio
        </Link>
      </div>

      <FooterMini />
    </main>
  );
}
