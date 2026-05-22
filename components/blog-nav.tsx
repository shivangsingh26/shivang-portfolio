"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "motion/react";
import { profile } from "@/lib/data";

export function BlogNav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-[var(--violet)] via-[var(--primary)] to-[var(--coral)]"
        style={{ scaleX: progress }}
      />
      <header className="fixed inset-x-0 top-3 z-40 mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex w-full items-center justify-between rounded-full border border-border bg-background/70 px-4 py-2 backdrop-blur-xl">
          <Link
            href="/"
            className="group flex items-center gap-2 font-mono text-sm"
            data-cursor="hover"
          >
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--primary)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--primary)]" />
            </span>
            <span className="font-semibold tracking-tight">
              {profile.firstName.toLowerCase()}.
            </span>
            <span className="text-muted-foreground transition-colors group-hover:text-foreground">
              /blog
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link
              href="/"
              className="rounded-full px-3 py-1.5 text-xs font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="rounded-full px-3 py-1.5 text-xs font-medium tracking-tight text-foreground"
            >
              Blog
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="ml-1 hidden rounded-full border border-border bg-foreground/5 px-3 py-1.5 text-xs font-medium tracking-tight transition hover:border-[var(--primary)]/40 hover:text-[var(--primary)] sm:inline-flex"
            >
              Resume ↗
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
