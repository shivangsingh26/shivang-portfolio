"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Github, Linkedin, FileDown, MessageSquare, ChevronUp } from "lucide-react";
import { profile } from "@/lib/data";
import { dispatchOpenChat } from "@/lib/events";
import { dispatchOpenResume } from "@/components/resume-modal";
import { track } from "@/lib/telemetry";

type Item = {
  label: string;
  icon: typeof Mail;
  onClick: () => void;
  hue: string;
};

export function QuickDock() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items: Item[] = [
    {
      label: "Chat with AI",
      icon: MessageSquare,
      onClick: () => {
        track("chat_open", { source: "other" });
        dispatchOpenChat();
      },
      hue: "var(--violet)",
    },
    {
      label: "Email",
      icon: Mail,
      onClick: () => {
        track("cta_click", { target: "email", location: "quick_dock" });
        window.location.href = `mailto:${profile.email}`;
      },
      hue: "var(--coral)",
    },
    {
      label: "GitHub",
      icon: Github,
      onClick: () => {
        track("social_click", { network: "github", location: "quick_dock" });
        window.open(`https://github.com/${profile.github}`, "_blank");
      },
      hue: "var(--primary)",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      onClick: () => {
        track("social_click", { network: "linkedin", location: "quick_dock" });
        window.open(`https://linkedin.com/in/${profile.linkedin}`, "_blank");
      },
      hue: "var(--teal)",
    },
    {
      label: "Resume",
      icon: FileDown,
      onClick: () => {
        track("resume_download", { location: "quick_dock" });
        dispatchOpenResume();
      },
      hue: "var(--amber)",
    },
  ];

  return (
    <motion.div
      aria-hidden={!show}
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 12 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 left-6 z-40 hidden flex-col items-start gap-2 md:flex"
      style={{ pointerEvents: show ? "auto" : "none" }}
    >
      <AnimatePresence>
        {open &&
          items.map((it, i) => (
            <motion.button
              key={it.label}
              type="button"
              onClick={it.onClick}
              data-cursor="hover"
              aria-label={it.label}
              initial={{ opacity: 0, x: -10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.9 }}
              transition={{
                delay: i * 0.04,
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex items-center gap-3 rounded-full border border-border bg-card/80 px-3 py-2 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition hover:border-foreground/40"
            >
              <span
                className="grid h-6 w-6 place-items-center rounded-full"
                style={{
                  background: `radial-gradient(circle, ${it.hue}40, transparent 70%)`,
                }}
              >
                <it.icon className="h-3.5 w-3.5" style={{ color: it.hue }} />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition group-hover:text-foreground">
                {it.label}
              </span>
            </motion.button>
          ))}
      </AnimatePresence>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close quick actions" : "Open quick actions"}
        data-cursor="hover"
        whileTap={{ scale: 0.92 }}
        animate={{ rotate: open ? 180 : 0 }}
        className="grid h-12 w-12 place-items-center rounded-full border border-border bg-card/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition hover:border-foreground/40"
      >
        <span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full opacity-40 blur-md"
          style={{
            background:
              "conic-gradient(from 0deg, var(--primary), var(--violet), var(--coral), var(--primary))",
          }}
        />
        <ChevronUp className="h-4 w-4" />
      </motion.button>
    </motion.div>
  );
}
