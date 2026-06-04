"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import { fireConfetti } from "@/components/effects/confetti";

type Props = { id: string; seed?: number };

const PREFIX = "ss-like-";

export function LikeButton({ id, seed = 0 }: Props) {
  const [count, setCount] = useState(seed);
  const [liked, setLiked] = useState(false);
  const [burst, setBurst] = useState(0);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(PREFIX + id);
    if (stored) {
      const { count: c, liked: l } = JSON.parse(stored);
      setCount(c);
      setLiked(l);
    }
  }, [id]);

  const toggle = () => {
    const next = !liked;
    const c = next ? count + 1 : Math.max(0, count - 1);
    setLiked(next);
    setCount(c);
    if (next) {
      setBurst((b) => b + 1);
      const r = btnRef.current?.getBoundingClientRect();
      if (r) fireConfetti(r.left + r.width / 2, r.top + r.height / 2, 28);
    }
    localStorage.setItem(PREFIX + id, JSON.stringify({ count: c, liked: next }));
  };

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggle();
      }}
      data-cursor="hover"
      aria-pressed={liked}
      aria-label="Like project"
      className="group/like relative inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition hover:border-[var(--coral)]/40 hover:text-[var(--coral)]"
    >
      <motion.span
        animate={liked ? { scale: [1, 1.4, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative inline-flex"
      >
        <Heart
          className={`h-3 w-3 transition-colors ${
            liked ? "fill-[var(--coral)] text-[var(--coral)]" : ""
          }`}
        />
        <AnimatePresence>
          {burst > 0 && (
            <motion.span
              key={burst}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2.4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 -z-10 rounded-full bg-[var(--coral)]/30 blur-sm"
            />
          )}
        </AnimatePresence>
      </motion.span>
      <span className="tabular-nums">{count}</span>
    </button>
  );
}
