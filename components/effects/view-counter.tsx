"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const KEY = "ss-views-v1";

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

type Props = { slug: string; baseline?: number };

export function ViewCounter({ slug, baseline }: Props) {
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    const seed = baseline ?? 120 + (hash(slug) % 480);
    const raw = localStorage.getItem(KEY);
    const map: Record<string, number> = raw ? JSON.parse(raw) : {};
    const lastVisitKey = `${KEY}-visit-${slug}`;
    const lastVisit = sessionStorage.getItem(lastVisitKey);
    const current = (map[slug] ?? seed) + (lastVisit ? 0 : 1);
    if (!lastVisit) sessionStorage.setItem(lastVisitKey, "1");
    map[slug] = current;
    localStorage.setItem(KEY, JSON.stringify(map));
    setN(current);
  }, [slug, baseline]);

  if (n === null) return null;

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
      <Eye className="h-3 w-3" />
      <span className="tabular-nums">{n.toLocaleString()}</span>
      <span className="text-muted-foreground/60">views</span>
    </span>
  );
}
