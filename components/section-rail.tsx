"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

const RAIL = [{ id: "hero", label: "Top" }, ...navLinks];

export function SectionRail() {
  const [active, setActive] = useState<string>("hero");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const ids = RAIL.map((r) => r.id);
    const observers = ids
      .map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActive(id);
          },
          { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
        );
        obs.observe(el);
        return obs;
      })
      .filter(Boolean) as IntersectionObserver[];

    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <motion.aside
      aria-label="Section navigation"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: show ? 1 : 0, x: show ? 0 : 12 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
    >
      {RAIL.map((r) => {
        const isActive = active === r.id;
        return (
          <a
            key={r.id}
            href={`#${r.id}`}
            aria-label={r.label}
            data-cursor="hover"
            className="group relative flex items-center justify-end"
          >
            <span
              className={cn(
                "mr-3 origin-right rounded-md border border-border/60 bg-background/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] backdrop-blur transition-all duration-300",
                isActive
                  ? "opacity-100 text-foreground"
                  : "opacity-0 -translate-x-1 text-muted-foreground group-hover:translate-x-0 group-hover:opacity-100"
              )}
            >
              {r.label}
            </span>
            <span
              className={cn(
                "relative h-2 w-2 rounded-full border transition-all duration-300",
                isActive
                  ? "border-primary bg-primary scale-100"
                  : "border-foreground/40 scale-75 group-hover:scale-100 group-hover:border-foreground"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="rail-glow"
                  className="absolute -inset-1.5 rounded-full bg-primary/30 blur-sm"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </span>
          </a>
        );
      })}
    </motion.aside>
  );
}
