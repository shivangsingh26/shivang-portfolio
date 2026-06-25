import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Github, ChevronRight } from "lucide-react";
import { projects, projectBySlug, profile } from "@/lib/data";
import { BlogNav } from "@/components/blog-nav";
import { FooterMini } from "@/components/footer-mini";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return { title: "Not found" };
  const og = `/api/og?title=${encodeURIComponent(project.name)}&subtitle=${encodeURIComponent(project.tagline)}&kind=post`;
  return {
    title: `${project.name} — case study`,
    description: project.tagline,
    openGraph: {
      title: `${project.name} — ${project.tagline}`,
      description: project.caseStudy?.problem ?? project.description,
      type: "article",
      authors: [profile.name],
      images: [{ url: og, width: 1200, height: 630, alt: project.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — case study`,
      description: project.tagline,
      images: [og],
    },
    alternates: { canonical: `/work/${slug}` },
  };
}

export default async function WorkCaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const cs = project.caseStudy;
  const idx = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(idx + 1) % projects.length];

  return (
    <main className="relative min-h-screen">
      <BlogNav suffix="work" />

      {/* Hero glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[360px] w-[640px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, color-mix(in oklch, var(--primary) 20%, transparent), transparent 72%)",
        }}
      />

      <div className="mx-auto w-full max-w-4xl px-4 pt-32 pb-24 sm:px-6 md:pt-40">
        <Link
          href="/#projects"
          data-cursor="hover"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          back to work
        </Link>

        {/* Header */}
        <header className="mt-10">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="rounded-full border border-border bg-secondary px-2.5 py-1">
              Case study
            </span>
            {cs?.role && <span>{cs.role}</span>}
          </div>
          <h1 className="mt-6 font-display text-balance text-[clamp(2.25rem,6vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
            {project.name}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            {project.tagline}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
              >
                <Github className="h-4 w-4" />
                View source
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
            <Link
              href="/#contact"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-5 py-2.5 text-sm font-medium backdrop-blur transition hover:border-foreground/40"
            >
              Discuss this work
            </Link>
          </div>
        </header>

        {/* Results */}
        {cs?.results && (
          <section className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {cs.results.map((r) => (
              <div key={r.label} className="cinema-card rounded-2xl p-4 sm:p-5">
                <div className="font-display text-2xl font-semibold tracking-tight text-[var(--primary)] sm:text-3xl">
                  {r.value}
                </div>
                <div className="mt-1.5 text-xs leading-snug text-muted-foreground">
                  {r.label}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Architecture flow */}
        {cs?.architecture && (
          <section className="mt-16">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Pipeline
            </h2>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {cs.architecture.map((step, i) => (
                <span key={step} className="inline-flex items-center gap-2">
                  <span className="rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground shadow-[var(--shadow-cinema)]">
                    {step}
                  </span>
                  {i < cs.architecture!.length - 1 && (
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                  )}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Problem */}
        {cs?.problem && (
          <section className="mt-16">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              The problem
            </h2>
            <p className="mt-5 max-w-3xl text-pretty text-lg leading-relaxed text-foreground/90">
              {cs.problem}
            </p>
          </section>
        )}

        {/* Approach */}
        {cs?.approach && (
          <section className="mt-16">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Approach
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {cs.approach.map((a, i) => (
                <div key={a.title} className="cinema-card rounded-2xl p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-border bg-secondary font-mono text-xs text-[var(--primary)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {a.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {a.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Stack */}
        <section className="mt-16">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Stack
          </h2>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-border bg-card px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* Next project */}
        <Link
          href={`/work/${nextProject.slug}`}
          data-cursor="hover"
          className="cinema-card group mt-20 flex items-center justify-between gap-4 rounded-2xl p-6 sm:p-8"
        >
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Next case study
            </div>
            <div className="mt-2 font-display text-xl font-semibold tracking-tight sm:text-2xl">
              {nextProject.name}
            </div>
            <div className="mt-0.5 text-sm text-muted-foreground">{nextProject.tagline}</div>
          </div>
          <ArrowUpRight className="h-6 w-6 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--primary)]" />
        </Link>
      </div>

      <FooterMini />
    </main>
  );
}
