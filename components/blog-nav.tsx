"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { profile } from "@/lib/data";
import { ThemeToggle } from "@/components/theme-toggle";

export function BlogNav({ suffix = "blog" }: { suffix?: string } = {}) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-[var(--violet)] to-[var(--primary)]"
        style={{ scaleX: progress }}
      />
      <header
        className={cn(
          "fixed inset-x-0 top-4 z-40 mx-auto flex items-center justify-between px-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-6",
          scrolled ? "top-2 max-w-5xl" : "max-w-6xl"
        )}
      >
        <div
          className={cn(
            "flex w-full items-center justify-between rounded-full backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled
              ? "border border-border bg-background/75 px-3.5 py-1.5 shadow-[var(--shadow-cinema-hover)]"
              : "border border-transparent bg-background/30 px-4 py-2"
          )}
        >
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
              /{suffix}
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            <ThemeToggle className="mr-1" />
            <Link
              href="/"
              data-cursor="hover"
              className="rounded-full px-3 py-1.5 text-xs font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/blog"
              data-cursor="hover"
              className="rounded-full px-3 py-1.5 text-xs font-medium tracking-tight text-foreground"
            >
              Blog
            </Link>
            <Link
              href="/now"
              data-cursor="hover"
              className="hidden rounded-full px-3 py-1.5 text-xs font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              Now
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
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
