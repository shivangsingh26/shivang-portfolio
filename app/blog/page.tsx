import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Clock } from "lucide-react";
import { listPosts, formatDate } from "@/lib/blog";
import { BlogNav } from "@/components/blog-nav";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: `Blog — ${profile.name}`,
  description: "Notes from building production GenAI systems, LLM infrastructure, and agentic pipelines.",
};

export default async function BlogIndex() {
  const posts = await listPosts();

  return (
    <main className="relative min-h-screen">
      <BlogNav />
      <section className="mx-auto w-full max-w-4xl px-4 pt-32 pb-24 sm:px-6 md:pt-40">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          <span className="h-px w-8 bg-[var(--coral)]" />
          Blog · field notes
        </div>
        <h1 className="mt-6 font-display text-balance text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
          Building in <span className="aurora-text">production.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Notes from shipping GenAI systems, scaling LLM pipelines, and learning what survives
          real traffic. Mostly things I wish I&apos;d known earlier.
        </p>

        {posts.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-border bg-card/40 p-10 text-center backdrop-blur">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Draft in progress
            </div>
            <p className="mt-3 text-foreground">First post coming soon.</p>
          </div>
        ) : (
          <div className="mt-16 divide-y divide-border/60 border-y border-border/60">
            {posts.map((p, i) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group block py-7 transition-colors hover:bg-card/30"
                data-cursor="hover"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")} · {formatDate(p.date)}
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                    <Clock className="h-3 w-3" /> {p.readingTime}
                  </div>
                </div>
                <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-[var(--primary)] sm:text-3xl">
                  {p.title}
                </h2>
                {p.excerpt && (
                  <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
                    {p.excerpt}
                  </p>
                )}
                <div className="mt-5 flex items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border bg-background/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--primary)]" />
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
          >
            ← back home
          </Link>
        </div>
      </section>
    </main>
  );
}
