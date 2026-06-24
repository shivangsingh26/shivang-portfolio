"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Target = { id: number; x: number; y: number; born: number };

const LIFETIME = 1600;
const SPAWN_MS = 700;
const GAME_MS = 30000;

export function TargetGame() {
  const [targets, setTargets] = useState<Target[]>([]);
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_MS);
  const boardRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    const spawnId = window.setInterval(() => {
      const board = boardRef.current;
      if (!board) return;
      const r = board.getBoundingClientRect();
      const x = 30 + Math.random() * (r.width - 60);
      const y = 30 + Math.random() * (r.height - 60);
      const id = ++idRef.current;
      setTargets((t) => [...t, { id, x, y, born: performance.now() }]);
    }, SPAWN_MS);

    const cleanId = window.setInterval(() => {
      const now = performance.now();
      setTargets((t) => t.filter((it) => now - it.born < LIFETIME));
    }, 100);

    const timerId = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 100) {
          setRunning(false);
          return 0;
        }
        return t - 100;
      });
    }, 100);

    return () => {
      window.clearInterval(spawnId);
      window.clearInterval(cleanId);
      window.clearInterval(timerId);
    };
  }, [running]);

  const start = () => {
    setScore(0);
    setTargets([]);
    setTimeLeft(GAME_MS);
    setRunning(true);
  };

  const hit = (id: number) => {
    setScore((s) => s + 1);
    setTargets((t) => t.filter((it) => it.id !== id));
  };

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        <span>
          Score · <span className="text-foreground tabular-nums">{score}</span>
        </span>
        <span>
          {running
            ? `${Math.ceil(timeLeft / 1000)}s left`
            : timeLeft === 0
              ? "time up"
              : "ready"}
        </span>
      </div>
      <div
        ref={boardRef}
        className="relative h-64 overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <AnimatePresence>
          {targets.map((t) => (
            <motion.button
              key={t.id}
              type="button"
              onClick={() => hit(t.id)}
              data-cursor="hover"
              aria-label="Hit target"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{ left: t.x - 14, top: t.y - 14 }}
              className="absolute h-7 w-7 rounded-full"
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--coral)]/40" />
              <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[var(--coral)] to-[var(--primary)] shadow-[0_0_14px_var(--coral)]" />
            </motion.button>
          ))}
        </AnimatePresence>
        {!running && (
          <div className="absolute inset-0 grid place-items-center">
            <button
              type="button"
              onClick={start}
              data-cursor="hover"
              className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:gap-3"
            >
              {timeLeft === 0 ? `Play again — final ${score}` : "Start 30s"}
            </button>
          </div>
        )}
      </div>
      <div className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
        Tap the targets before they vanish
      </div>
    </div>
  );
}
