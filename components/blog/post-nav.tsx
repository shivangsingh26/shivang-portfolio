import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { PostMeta } from "@/lib/blog";

export function PostNav({ prev, next }: { prev: PostMeta | null; next: PostMeta | null }) {
  if (!prev && !next) return null;
  return (
    <div className="mt-16 grid gap-3 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group rounded-2xl border border-border bg-card/30 p-5 transition hover:border-foreground/20"
        >
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <ArrowLeft className="h-3 w-3" /> Previous post
          </div>
          <div className="mt-2 font-display text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-[var(--primary)] sm:text-lg">
            {prev.title}
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group rounded-2xl border border-border bg-card/30 p-5 text-right transition hover:border-foreground/20"
        >
          <div className="flex items-center justify-end gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Next post <ArrowRight className="h-3 w-3" />
          </div>
          <div className="mt-2 font-display text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-[var(--primary)] sm:text-lg">
            {next.title}
          </div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
