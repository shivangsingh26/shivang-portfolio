"use client";

import { useEffect, useState } from "react";

function format(d: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(d);
}

export function LiveClock({ compact = false }: { compact?: boolean }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(format(new Date()));
    const id = window.setInterval(() => setTime(format(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
      <span className="relative inline-flex h-1.5 w-1.5">
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      <span className="tabular-nums">{time}</span>
      {!compact && <span className="text-muted-foreground/60">IST</span>}
    </span>
  );
}
