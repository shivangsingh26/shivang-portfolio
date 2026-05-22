import { ArrowUpRight, Clock } from "lucide-react";
import { listPosts, formatDate } from "@/lib/blog";
import { BlogCardLink } from "@/components/blog-card-link";

export async function LatestBlog() {
  const posts = (await listPosts()).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="relative w-full py-28 sm:py-36">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          <span className="h-px w-8 bg-[var(--coral)]" />
          ✎ Writing
        </div>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
            Latest from the <span className="aurora-text">blog.</span>
          </h2>
          <BlogCardLink href="/blog" slug="__index__" className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground">
            All posts <ArrowUpRight className="h-3.5 w-3.5" />
          </BlogCardLink>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {posts.map((p, i) => (
            <BlogCardLink
              key={p.slug}
              href={`/blog/${p.slug}`}
              slug={p.slug}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/40 p-6 backdrop-blur transition-colors hover:border-foreground/20"
            >
              <div
                aria-hidden
                className="absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    i % 3 === 0
                      ? "radial-gradient(circle, oklch(0.66 0.18 254 / 0.4), transparent 70%)"
                      : i % 3 === 1
                      ? "radial-gradient(circle, oklch(0.68 0.22 290 / 0.4), transparent 70%)"
                      : "radial-gradient(circle, oklch(0.72 0.20 18 / 0.4), transparent 70%)",
                }}
              />
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                <span>{formatDate(p.date)}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {p.readingTime}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-[var(--primary)]">
                {p.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.excerpt}
              </p>
              <div className="mt-5 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {p.tags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="rounded border border-border bg-background/60 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--primary)]" />
              </div>
            </BlogCardLink>
          ))}
        </div>
      </div>
    </section>
  );
}
