"use client";

export function DotGrid({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle, oklch(1 0 0 / 0.08) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
        maskImage:
          "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        animation: "dot-pulse 6s ease-in-out infinite",
      }}
    >
      <style jsx>{`
        @keyframes dot-pulse {
          0%,
          100% {
            opacity: 0.55;
          }
          50% {
            opacity: 0.85;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
