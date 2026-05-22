"use client";

import { track as vercelTrack } from "@vercel/analytics";

export type TrackEvent =
  | { name: "cta_click"; props: { target: string; location: string } }
  | { name: "resume_download"; props: { location: string } }
  | { name: "blog_open"; props: { slug: string } }
  | { name: "chat_open"; props: { source: "fab" | "hero_cta" | "palette" | "other" } }
  | { name: "chat_message"; props: { length: number } }
  | { name: "palette_open"; props: Record<string, never> }
  | { name: "social_click"; props: { network: string } };

export function track<E extends TrackEvent>(name: E["name"], props?: E["props"]) {
  try {
    vercelTrack(name as string, (props ?? {}) as Record<string, string | number | boolean | null>);
  } catch {
    // analytics best-effort
  }
}
