"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  FileDown,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Search,
} from "lucide-react";
import { navLinks, profile, projects } from "@/lib/data";
import { cn } from "@/lib/utils";
import { OPEN_PALETTE_EVENT } from "@/lib/events";
import { track } from "@/lib/telemetry";

type Action = {
  id: string;
  label: string;
  hint?: string;
  icon: typeof Search;
  run: () => void;
  group: "Navigate" | "Connect" | "Projects" | "Actions";
};

export function CommandPalette({ onOpenChat }: { onOpenChat: () => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const actions: Action[] = useMemo(() => {
    const close = () => setOpen(false);
    const nav: Action[] = navLinks.map((l) => ({
      id: `nav-${l.id}`,
      label: `Jump to ${l.label}`,
      icon: ArrowRight,
      group: "Navigate",
      run: () => {
        close();
        document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" });
      },
    }));
    const connect: Action[] = [
      {
        id: "email",
        label: "Email Shivang",
        hint: profile.email,
        icon: Mail,
        group: "Connect",
        run: () => {
          close();
          window.location.href = `mailto:${profile.email}`;
        },
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        hint: `/in/${profile.linkedin}`,
        icon: Linkedin,
        group: "Connect",
        run: () => {
          close();
          window.open(`https://linkedin.com/in/${profile.linkedin}`, "_blank");
        },
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: `@${profile.github}`,
        icon: Github,
        group: "Connect",
        run: () => {
          close();
          window.open(`https://github.com/${profile.github}`, "_blank");
        },
      },
    ];
    const proj: Action[] = projects.map((p) => ({
      id: `proj-${p.name}`,
      label: p.name,
      hint: p.tagline,
      icon: ArrowRight,
      group: "Projects",
      run: () => {
        close();
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      },
    }));
    const acts: Action[] = [
      {
        id: "chat",
        label: "Talk to Shivang's AI",
        hint: "open chat",
        icon: MessageSquare,
        group: "Actions",
        run: () => {
          close();
          onOpenChat();
        },
      },
      {
        id: "resume",
        label: "Download resume",
        hint: "resume.pdf",
        icon: FileDown,
        group: "Actions",
        run: () => {
          close();
          window.open("/resume.pdf", "_blank");
        },
      },
    ];
    return [...nav, ...acts, ...connect, ...proj];
  }, [onOpenChat]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(q) ||
        a.hint?.toLowerCase().includes(q) ||
        a.group.toLowerCase().includes(q)
    );
  }, [actions, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) track("palette_open", {});
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query, open]);

  const onKeyNav = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    }
  };

  const grouped = filtered.reduce<Record<string, Action[]>>((acc, a) => {
    (acc[a.group] ||= []).push(a);
    return acc;
  }, {});

  let idx = 0;

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[80] bg-background/70 backdrop-blur"
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="palette"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-1/2 top-[12vh] z-[90] w-[min(560px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-border/60 glass shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
              role="dialog"
              aria-modal
            >
              <div className="flex items-center gap-3 border-b border-border/40 px-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyNav}
                  placeholder="Search anywhere · navigate · run actions"
                  className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
                />
                <kbd className="rounded-md border border-border/60 bg-background/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  ESC
                </kbd>
              </div>

              <div className="max-h-[55vh] overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                    No results
                  </div>
                )}
                {Object.entries(grouped).map(([group, items]) => (
                  <div key={group} className="mb-1">
                    <div className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {group}
                    </div>
                    {items.map((a) => {
                      const myIdx = idx++;
                      const isActive = myIdx === active;
                      return (
                        <button
                          key={a.id}
                          type="button"
                          onMouseEnter={() => setActive(myIdx)}
                          onClick={() => a.run()}
                          className={cn(
                            "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition",
                            isActive ? "bg-foreground/10 text-foreground" : "text-muted-foreground"
                          )}
                        >
                          <a.icon
                            className={cn(
                              "h-4 w-4 shrink-0 transition",
                              isActive ? "text-primary" : "text-muted-foreground"
                            )}
                          />
                          <span className="flex-1 truncate">{a.label}</span>
                          {a.hint && (
                            <span className="truncate font-mono text-[11px] text-muted-foreground">
                              {a.hint}
                            </span>
                          )}
                          {isActive && (
                            <kbd className="rounded-md border border-border/60 bg-background/80 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                              ↵
                            </kbd>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-border/40 px-4 py-2 font-mono text-[10px] text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <kbd className="rounded border border-border/60 bg-background/60 px-1">↑↓</kbd>
                    nav
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <kbd className="rounded border border-border/60 bg-background/60 px-1">↵</kbd>
                    select
                  </span>
                </div>
                <span>Shivang Singh · portfolio</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
