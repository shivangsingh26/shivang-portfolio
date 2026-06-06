import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Clock } from "lucide-react";
import { listPosts, formatDate } from "@/lib/blog";
import { BlogNav } from "@/components/blog-nav";
import { Eyebrow } from "@/components/eyebrow";
import { FooterMini } from "@/components/footer-mini";
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
      <section className="relative mx-auto w-full max-w-4xl px-4 pt-32 pb-24 sm:px-6 md:pt-40">
        {/* Soft hero glow — premium ambient depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.68 0.16 254 / 0.20), oklch(0.70 0.18 295 / 0.10) 50%, transparent 75%)",
          }}
        />

        <Eyebrow>Blog · field notes</Eyebrow>
        <h1 className="mt-6 font-display text-balance text-[clamp(2.5rem,6.5vw,5rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
          Building in <span className="text-[var(--primary)]">production.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Notes from shipping GenAI systems, scaling LLM pipelines, and learning what survives
          real traffic. Mostly things I wish I&apos;d known earlier.
        </p>

        {posts.length === 0 ? (
          <div className="cinema-card mt-16 rounded-2xl p-10 text-center backdrop-blur">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Draft in progress
            </div>
            <p className="mt-3 text-foreground">First post coming soon.</p>
          </div>
        ) : (
          <ul className="mt-16 divide-y divide-border/60 border-y border-border/60">
            {posts.map((p, i) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group relative block py-8 transition-colors hover:bg-foreground/[0.02]"
                  data-cursor="hover"
                >
                  {/* Hover hairline accent */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-gradient-to-b from-[var(--primary)] via-[var(--violet)] to-transparent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                  />
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
                          className="rounded-md border border-border bg-background/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors group-hover:border-foreground/20"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--primary)]" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-20 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            data-cursor="hover"
          >
            ← back home
          </Link>
        </div>
      </section>

      <FooterMini />
    </main>
  );
}
