"use client";

/**
 * Counter — was previously an animated count-up. Caused stuck-at-zero bugs
 * when useInView didn't fire reliably. Now renders the final value directly.
 * Keeping the component (and same API) so call sites don't change.
 */
export function Counter({
  value,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  return <span className={className}>{value}</span>;
}
