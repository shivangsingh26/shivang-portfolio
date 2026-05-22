"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
};

/**
 * TypingText — cycles through a list of words, typing/deleting each.
 * Cursor blinks. Respects reduced-motion (shows first word static).
 */
export function TypingText({
  words,
  className,
  typeSpeed = 80,
  deleteSpeed = 40,
  pause = 1600,
}: Props) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) {
      setText(words[0]);
      return;
    }
    const word = words[idx % words.length];

    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(
      () => {
        setText((prev) => {
          if (deleting) return prev.slice(0, -1);
          return word.slice(0, prev.length + 1);
        });
      },
      deleting ? deleteSpeed : typeSpeed
    );
    return () => clearTimeout(t);
  }, [text, deleting, idx, words, typeSpeed, deleteSpeed, pause, reduced]);

  return (
    <span className={cn("inline-flex items-center gap-1", className)} aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx + (deleting ? "-d" : "")}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          className="inline-block"
        >
          {text}
        </motion.span>
      </AnimatePresence>
      <span className="inline-block h-[0.85em] w-[2px] translate-y-[0.1em] animate-pulse bg-current opacity-80" />
    </span>
  );
}
