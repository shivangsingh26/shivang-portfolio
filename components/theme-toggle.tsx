"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { track } from "@/lib/telemetry";

type DocumentVT = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    track("theme_toggle", { to: next });

    const doc = document as DocumentVT;
    if (reduce || typeof doc.startViewTransition !== "function") {
      setTheme(next);
      return;
    }

    // Circular reveal of the new theme, expanding from the click point.
    const x = e.clientX;
    const y = e.clientY;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const vt = doc.startViewTransition(() => setTheme(next));
    vt.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 480,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      data-cursor="hover"
      className={
        "relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground transition hover:border-foreground/30 hover:text-foreground " +
        className
      }
    >
      {/* Render nothing theme-specific until mounted to avoid hydration mismatch. */}
      <Sun
        className={`h-4 w-4 transition-all duration-300 ${
          mounted && !isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
        }`}
      />
      <Moon
        className={`absolute h-4 w-4 transition-all duration-300 ${
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
        }`}
      />
    </button>
  );
}
