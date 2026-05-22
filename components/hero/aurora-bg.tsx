"use client";

/**
 * Aurora gradient mesh — 4 huge blurred radial gradients drifting on slow loops.
 * Pure CSS, GPU-friendly, respects reduced-motion.
 */
export function AuroraBg() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="aurora-blob aurora-blob-4" />
      {/* Vignette to keep text legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background" />
      <style jsx>{`
        .aurora-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.55;
          will-change: transform;
          mix-blend-mode: screen;
        }
        .aurora-blob-1 {
          width: 60vw;
          height: 60vw;
          left: -20vw;
          top: -20vh;
          background: radial-gradient(circle, oklch(0.65 0.22 270) 0%, transparent 70%);
          animation: drift-1 24s ease-in-out infinite alternate;
        }
        .aurora-blob-2 {
          width: 55vw;
          height: 55vw;
          right: -15vw;
          top: -10vh;
          background: radial-gradient(circle, oklch(0.72 0.20 250) 0%, transparent 70%);
          animation: drift-2 28s ease-in-out infinite alternate;
        }
        .aurora-blob-3 {
          width: 65vw;
          height: 65vw;
          left: 15vw;
          bottom: -30vh;
          background: radial-gradient(circle, oklch(0.68 0.22 12) 0%, transparent 70%);
          animation: drift-3 30s ease-in-out infinite alternate;
          opacity: 0.45;
        }
        .aurora-blob-4 {
          width: 50vw;
          height: 50vw;
          right: -10vw;
          bottom: -20vh;
          background: radial-gradient(circle, oklch(0.78 0.18 180) 0%, transparent 70%);
          animation: drift-4 26s ease-in-out infinite alternate;
          opacity: 0.4;
        }
        @keyframes drift-1 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(15vw, 10vh) scale(1.15); }
        }
        @keyframes drift-2 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-12vw, 12vh) scale(1.1); }
        }
        @keyframes drift-3 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-10vw, -8vh) scale(1.2); }
        }
        @keyframes drift-4 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(8vw, -10vh) scale(1.1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora-blob { animation: none; }
        }
      `}</style>
    </div>
  );
}
