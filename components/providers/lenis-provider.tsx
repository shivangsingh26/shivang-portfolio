"use client";

/**
 * Lenis disabled — native scroll feels snappier on most systems.
 * Keep this provider as pass-through so layout import stays valid.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
