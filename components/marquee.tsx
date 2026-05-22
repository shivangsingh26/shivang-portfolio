"use client";

const TOKENS = [
  "Gemini 2.5 Pro",
  "GPT-5",
  "Claude Sonnet 4.6",
  "FastAPI",
  "Kubernetes",
  "KEDA",
  "Redis",
  "Celery",
  "PyTorch",
  "YOLO",
  "PaddleOCR",
  "LangGraph",
  "Pydantic",
  "DeepEval",
  "AWS Bedrock",
  "RAG",
];

/**
 * Marquee — pure CSS infinite scroll. Slow, decorative, no JS jitter.
 * Duplicates content twice and slides by -50% over `--duration` (80s) on infinite loop.
 * Respects prefers-reduced-motion via globals.css `.marquee-x` rule.
 */
export function Marquee() {
  const items = [...TOKENS, ...TOKENS];
  return (
    <section
      aria-hidden
      className="relative w-full overflow-hidden border-y border-border bg-background py-6"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
      <div
        className="marquee-x flex w-max items-center gap-8 whitespace-nowrap"
        style={{ animationDuration: "90s" }}
      >
        {items.map((t, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground/80 sm:text-sm">
              {t}
            </span>
            <span className="h-1 w-1 rounded-full bg-primary/40" />
          </div>
        ))}
      </div>
    </section>
  );
}
