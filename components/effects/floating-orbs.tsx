"use client";

/**
 * Decorative ambient orbs drifting in the background.
 * Pure CSS, GPU-friendly, behind all content (-z-10), pointer-events-none.
 * Renders 3 large blurred radial gradients that drift on slow independent loops.
 */
export function FloatingOrbs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <span className="orb orb-a" />
      <span className="orb orb-b" />
      <span className="orb orb-c" />
      <style jsx>{`
        .orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(80px);
          mix-blend-mode: screen;
          will-change: transform;
        }
        .orb-a {
          width: 32vw;
          height: 32vw;
          left: -8vw;
          top: 30vh;
          background: radial-gradient(circle, oklch(0.66 0.18 254 / 0.28), transparent 70%);
          animation: drift-a 40s ease-in-out infinite alternate;
          opacity: 0.55;
        }
        .orb-b {
          width: 30vw;
          height: 30vw;
          right: -6vw;
          top: 60vh;
          background: radial-gradient(circle, oklch(0.68 0.22 290 / 0.25), transparent 70%);
          animation: drift-b 48s ease-in-out infinite alternate;
          opacity: 0.5;
        }
        .orb-c {
          width: 26vw;
          height: 26vw;
          left: 38vw;
          top: 120vh;
          background: radial-gradient(circle, oklch(0.72 0.20 18 / 0.22), transparent 70%);
          animation: drift-c 56s ease-in-out infinite alternate;
          opacity: 0.45;
        }
        @keyframes drift-a {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(20vw, -8vh) scale(1.15); }
        }
        @keyframes drift-b {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-18vw, 10vh) scale(1.1); }
        }
        @keyframes drift-c {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-12vw, -14vh) scale(1.2); }
        }
        @media (prefers-reduced-motion: reduce) {
          .orb { animation: none; }
        }
      `}</style>
    </div>
  );
}
