import Link from "next/link";
import { ArrowLeft, Home, MessageSquare, FileDown } from "lucide-react";
import { AuroraBg } from "@/components/hero/aurora-bg";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden">
      <AuroraBg />

      <div className="relative z-10 mx-auto w-full max-w-2xl px-4 text-center sm:px-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Error · not found
        </div>

        <h1 className="mt-6 font-display text-[clamp(5rem,18vw,14rem)] font-semibold leading-[0.95] tracking-[-0.06em]">
          <span className="aurora-text">404.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
          This page doesn&apos;t exist — or the model hallucinated it. Either way, let&apos;s
          get you somewhere useful.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:gap-3"
          >
            <Home className="h-4 w-4" />
            Back home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-5 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-foreground/40"
          >
            Read the blog
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-5 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-foreground/40"
          >
            <FileDown className="h-4 w-4" />
            Resume
          </a>
        </div>

        <div className="mt-16 inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-4 py-2 backdrop-blur">
          <MessageSquare className="h-3.5 w-3.5 text-[var(--coral)]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Or open chat (bottom-right) and ask my AI
          </span>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" />
            shivang.dev
          </Link>
        </div>
      </div>
    </main>
  );
}
