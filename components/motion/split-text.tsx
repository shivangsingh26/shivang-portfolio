"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/**
 * SplitText — splits children into words, each wrapped in an overflow-hidden mask.
 * Words slide up from below on view. Preserves layout via spaces.
 */
export function SplitText({
  children,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
  once = true,
  as = "span",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-50px" });
  const words = children.split(" ");
  const Tag = motion[as] as typeof motion.span;

  return (
    <Tag ref={ref as never} className={cn("inline-block", className)} aria-label={children}>
      {words.map((word, i) => (
        <span
          key={i}
          className="reveal-mask"
          aria-hidden
          style={{ marginRight: i < words.length - 1 ? "0.25em" : 0 }}
        >
          <motion.span
            className={cn("inline-block will-change-transform", wordClassName)}
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.75,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

type Segment = { text: string; className?: string };

/**
 * SplitTextSegmented — animates mixed segments.
 * Plain segments: per-word reveal-mask animation.
 * Gradient/aurora segments: single-block fade-up to preserve `background-clip: text`
 *   (descendants of a gradient span can't paint the parent's background).
 */
export function SplitTextSegmented({
  segments,
  className,
  delay = 0,
  stagger = 0.045,
  once = true,
}: {
  segments: Segment[];
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-50px" });

  let globalIdx = 0;
  const totalWords = segments.reduce((acc, s) => {
    if (isGradient(s.className)) return acc + 1; // single block counts as 1
    return acc + s.text.split(" ").length;
  }, 0);

  return (
    <span
      ref={ref}
      className={cn("inline-block", className)}
      aria-label={segments.map((s) => s.text).join(" ")}
    >
      {segments.map((seg, segIdx) => {
        if (isGradient(seg.className)) {
          const idx = globalIdx++;
          // Inline (not inline-block) keeps baseline aligned with surrounding text.
          // Transforms don't apply to inline; use opacity-only fade.
          return (
            <motion.span
              key={segIdx}
              className={seg.className}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: 0.9,
                delay: delay + idx * stagger * 4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {seg.text}
            </motion.span>
          );
        }

        const words = seg.text.split(" ");
        return (
          <span key={segIdx} className={seg.className}>
            {words.map((word, i) => {
              if (!word) return null;
              const idx = globalIdx++;
              const isLastInSeg = i === words.length - 1;
              return (
                <span
                  key={`${segIdx}-${i}`}
                  className="reveal-mask"
                  aria-hidden
                  style={{ marginRight: idx < totalWords - 1 && isLastInSeg ? "0.25em" : i < words.length - 1 ? "0.25em" : 0 }}
                >
                  <motion.span
                    className="inline-block will-change-transform"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
                    transition={{
                      duration: 0.75,
                      delay: delay + idx * stagger,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

function isGradient(className?: string): boolean {
  if (!className) return false;
  return className.includes("gradient-text") || className.includes("aurora-text");
}

export function MaskedReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <span ref={ref} className="reveal-mask">
      <motion.span
        className="inline-block will-change-transform"
        initial={{ y: "110%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
        transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
