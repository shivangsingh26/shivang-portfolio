import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";

/**
 * Slim shared footer for non-home routes (blog, post, now, 404).
 * Anchors the page and ties the cross-route experience together.
 */
export function FooterMini() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-20 border-t border-border/60">
      {/* Hairline aurora glow at top edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.68 0.16 254 / 0.5) 30%, oklch(0.70 0.18 295 / 0.5) 70%, transparent)",
        }}
      />
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              © {year} {profile.name} · Bengaluru, IN
            </span>
          </div>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em]">
            <Link
              href="/"
              data-cursor="hover"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/blog"
              data-cursor="hover"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Blog
            </Link>
            <Link
              href="/now"
              data-cursor="hover"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Now
            </Link>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="hover"
              className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-[var(--primary)]"
            >
              Contact <ArrowUpRight className="h-3 w-3" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
