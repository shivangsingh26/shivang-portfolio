"use client";

const ROW_A = [
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
];

const ROW_B = [
  "LangGraph",
  "Pydantic",
  "DeepEval",
  "PaddleOCR",
  "AWS Bedrock",
  "RAG",
  "Vector Search",
  "Pinecone",
  "Workflows",
  "OpenTelemetry",
];

function Row({
  items,
  duration,
  reverse,
}: {
  items: string[];
  duration: number;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div
        className="marquee-x flex w-max items-center gap-10 whitespace-nowrap"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((t, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground/70 sm:text-sm">
              {t}
            </span>
            <span className="h-1 w-1 rounded-full bg-primary/40" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <section
      aria-hidden
      className="relative w-full overflow-hidden border-y border-border/60 bg-background py-7"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-40 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-40 bg-gradient-to-l from-background to-transparent" />
      <div className="flex flex-col gap-4">
        <Row items={ROW_A} duration={80} />
        <Row items={ROW_B} duration={100} reverse />
      </div>
    </section>
  );
}
