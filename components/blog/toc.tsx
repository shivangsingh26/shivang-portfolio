"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Heading = { id: string; text: string; level: number };

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * TOC — reads the rendered article's h2/h3, auto-assigns IDs if missing,
 * highlights the active heading via IntersectionObserver. Sticky on desktop.
 */
export function TOC({ containerSelector = ".prose-blog" }: { containerSelector?: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const hs = Array.from(container.querySelectorAll<HTMLHeadingElement>("h2, h3"));
    const list: Heading[] = hs.map((el) => {
      if (!el.id) el.id = slugify(el.textContent ?? "");
      return {
        id: el.id,
        text: el.textContent ?? "",
        level: el.tagName === "H2" ? 2 : 3,
      };
    });
    setHeadings(list);

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    hs.forEach((h) => obs.observe(h));
    return () => obs.disconnect();
  }, [containerSelector]);

  if (headings.length < 2) return null;

  return (
    <aside
      aria-label="Table of contents"
      className="hidden xl:block xl:sticky xl:top-32 xl:max-h-[calc(100vh-10rem)] xl:overflow-y-auto xl:pl-8"
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        On this page
      </div>
      <nav className="mt-4 space-y-1.5 border-l border-border">
        {headings.map((h) => {
          const isActive = h.id === active;
          return (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={cn(
                "relative block py-1 pl-4 text-sm leading-snug transition-colors",
                h.level === 3 && "pl-7 text-[13px]",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <span
                  className="absolute -left-px top-0 h-full w-px bg-[var(--primary)]"
                  aria-hidden
                />
              )}
              {h.text}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
