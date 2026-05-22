"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { Menu, X, Search } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { cn } from "@/lib/utils";
import { dispatchOpenPalette } from "@/lib/events";
import { dispatchOpenResume } from "@/components/resume-modal";
import { track } from "@/lib/telemetry";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((n) => n.id);
    const observers = ids
      .map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActive(id);
          },
          { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
        );
        obs.observe(el);
        return obs;
      })
      .filter(Boolean) as IntersectionObserver[];
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-primary via-glow to-primary"
        style={{ scaleX: progress }}
      />
      <header
        className={cn(
          "fixed inset-x-0 top-3 z-40 mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-300 sm:px-6",
          scrolled && "top-2"
        )}
      >
        <div
          className={cn(
            "flex w-full items-center justify-between rounded-full border border-border/40 px-4 py-2 backdrop-blur-xl transition-all",
            scrolled ? "bg-background/70 shadow-[0_8px_30px_rgba(0,0,0,0.5)]" : "bg-background/40"
          )}
        >
          <Link href="#hero" className="group flex items-center gap-2 font-mono text-sm" data-cursor="hover">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-semibold tracking-tight">{profile.firstName.toLowerCase()}.</span>
            <span className="text-muted-foreground transition-colors group-hover:text-foreground">/dev</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                data-cursor="hover"
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-xs font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground",
                  active === link.id && "text-foreground"
                )}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-0 rounded-full bg-foreground/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={dispatchOpenPalette}
              aria-label="Open search (⌘K)"
              data-cursor="hover"
              className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1.5 text-xs text-muted-foreground transition hover:border-foreground/30 hover:text-foreground"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden font-mono uppercase tracking-[0.16em] sm:inline">Search</span>
              <kbd className="ml-1 hidden rounded-md border border-border bg-background/80 px-1.5 py-0.5 font-mono text-[10px] sm:inline">
                ⌘K
              </kbd>
            </button>
            <Link
              href="/blog"
              data-cursor="hover"
              onClick={() => track("cta_click", { target: "blog", location: "nav" })}
              className="hidden rounded-full px-3 py-1.5 text-xs font-medium tracking-tight text-muted-foreground transition hover:text-foreground md:inline-flex"
            >
              Blog
            </Link>
            <Link
              href="/now"
              data-cursor="hover"
              onClick={() => track("cta_click", { target: "now", location: "nav" })}
              className="hidden rounded-full px-3 py-1.5 text-xs font-medium tracking-tight text-muted-foreground transition hover:text-foreground lg:inline-flex"
            >
              Now
            </Link>
            <button
              type="button"
              onClick={() => {
                track("resume_download", { location: "nav_modal" });
                dispatchOpenResume();
              }}
              data-cursor="hover"
              className="hidden rounded-full border border-border bg-foreground/5 px-3 py-1.5 text-xs font-medium tracking-tight transition hover:border-primary/50 hover:text-primary md:inline-flex"
            >
              Resume ↗
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="rounded-full border border-border/60 p-2 md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 top-20 z-40 rounded-2xl border border-border/40 bg-background/95 p-4 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/blog"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              >
                Blog
              </Link>
              <Link
                href="/now"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              >
                Now
              </Link>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  dispatchOpenResume();
                }}
                className="mt-1 rounded-lg border border-border px-3 py-2 text-left text-sm font-medium"
              >
                Resume ↗
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
