"use client";

const GLYPHS = ["{ }", "</>", "→", "λ", "∑", "{...}", "()", "[]"];
const POSITIONS = [
  { top: "12%", left: "6%", delay: 0, size: 18, dur: 22 },
  { top: "28%", left: "92%", delay: 3, size: 14, dur: 28 },
  { top: "55%", left: "4%", delay: 6, size: 16, dur: 26 },
  { top: "72%", left: "88%", delay: 1.5, size: 20, dur: 30 },
  { top: "40%", left: "50%", delay: 8, size: 12, dur: 34 },
  { top: "85%", left: "20%", delay: 4.5, size: 15, dur: 24 },
  { top: "18%", left: "70%", delay: 7, size: 14, dur: 32 },
  { top: "62%", left: "62%", delay: 2, size: 13, dur: 28 },
];

export function FloatingGlyphs() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden"
    >
      {POSITIONS.map((p, i) => (
        <span
          key={i}
          className="absolute select-none font-mono text-foreground/[0.045]"
          style={{
            top: p.top,
            left: p.left,
            fontSize: `${p.size}px`,
            animation: `glyph-drift ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        >
          {GLYPHS[i % GLYPHS.length]}
        </span>
      ))}
      <style jsx>{`
        @keyframes glyph-drift {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(20px, -30px) rotate(8deg);
            opacity: 0.5;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          span {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
