"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, type ComponentProps } from "react";

export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  // Enable cross-theme color transitions only AFTER first paint, so the
  // initial light/dark resolution doesn't animate (no flash).
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      document.documentElement.classList.add("theme-ready")
    );
    return () => cancelAnimationFrame(id);
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
