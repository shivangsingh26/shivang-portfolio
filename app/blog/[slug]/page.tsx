import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { listPosts, getPost, formatDate } from "@/lib/blog";
import { BlogNav } from "@/components/blog-nav";
import { Markdown } from "@/components/markdown";
import { profile } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await listPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: `${post.title} — ${profile.name}`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <main className="relative min-h-screen">
      <BlogNav />
      <article className="mx-auto w-full max-w-3xl px-4 pt-32 pb-24 sm:px-6 md:pt-40">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          back to blog
        </Link>

        <div className="mt-10">
          <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              {post.readingTime}
            </span>
          </div>
          <h1 className="mt-5 font-display text-balance text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-md border border-border bg-background/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-border" />

        <div className="mt-12 prose-blog">
          <Markdown content={post.content} />
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Written by
          </div>
          <div className="mt-2 font-display text-lg font-semibold">{profile.name}</div>
          <p className="mt-1 text-sm text-muted-foreground">
            {profile.role} at {profile.company}
          </p>
          <div className="mt-4 flex gap-3 font-mono text-xs">
            <a
              href={`mailto:${profile.email}`}
              className="text-muted-foreground transition hover:text-[var(--primary)]"
            >
              email ↗
            </a>
            <a
              href={`https://linkedin.com/in/${profile.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground transition hover:text-[var(--primary)]"
            >
              linkedin ↗
            </a>
            <a
              href={`https://github.com/${profile.github}`}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground transition hover:text-[var(--primary)]"
            >
              github ↗
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
