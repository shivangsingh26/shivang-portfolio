"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Download, ExternalLink, FileText } from "lucide-react";
import { profile } from "@/lib/data";
import { track } from "@/lib/telemetry";

const OPEN_RESUME_EVENT = "shivang:open-resume";

export function dispatchOpenResume() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_RESUME_EVENT));
  }
}

export function ResumeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      track("resume_download", { location: "modal_open" });
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener(OPEN_RESUME_EVENT, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_RESUME_EVENT, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-background/85 backdrop-blur"
            onClick={() => setOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-modal
            aria-label="Resume preview"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 z-[100] mx-auto flex max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-[0_40px_100px_rgba(0,0,0,0.7)] sm:inset-8"
          >
            <header className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card">
                  <FileText className="h-4 w-4 text-[var(--primary)]" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Resume · {profile.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    resume.pdf · {profile.role}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("resume_download", { location: "modal_open_tab" })}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/60 px-2.5 py-1.5 text-xs font-medium transition hover:border-foreground/40"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Open
                </a>
                <a
                  href="/resume.pdf"
                  download
                  onClick={() => track("resume_download", { location: "modal_download" })}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-2.5 py-1.5 text-xs font-medium text-background transition hover:bg-foreground/90"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="ml-1 grid h-8 w-8 place-items-center rounded-lg border border-border bg-card/60 transition hover:border-foreground/40"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-hidden bg-[oklch(0.08_0_0)]">
              <object
                data="/resume.pdf#view=FitH&toolbar=0&navpanes=0"
                type="application/pdf"
                className="h-full w-full"
                aria-label="Resume PDF"
              >
                <div className="flex h-full items-center justify-center p-8 text-center text-muted-foreground">
                  Your browser can&apos;t preview PDFs inline.{" "}
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="ml-1 text-[var(--primary)] underline"
                  >
                    Open in a new tab
                  </a>
                  .
                </div>
              </object>
            </div>

            <footer className="border-t border-border px-5 py-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                <kbd className="mr-1 rounded border border-border bg-background/60 px-1.5 py-0.5">
                  ESC
                </kbd>
                to close · click outside · download for offline reading
              </div>
            </footer>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
