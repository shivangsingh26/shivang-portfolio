# Premium Light Redesign — Design Spec

**Date:** 2026-06-25
**Branch:** `feat/premium-light-redesign`
**Goal:** Shift the portfolio from a heavy near-black theme to a restrained, premium **light-default** aesthetic (Linear / Vercel / Stripe energy) with a working dark toggle, prune effect bloat, and ship four advanced features.

## Problem (from end-to-end evaluation)

1. **No light theme exists.** `next-themes` is installed but unused. `app/layout.tsx` hardcodes `className="dark"`; `globals.css` defines only a near-black palette (`--background: oklch(0.055)`) and forces `color-scheme: dark`.
2. **Effect kitchen-sink.** 36 effect/motion modules; 11 are dead (never imported). Global overlay soup (grain + vignette + floating-orbs + custom cursor + scroll-temp hue drift) fights a premium look and costs performance.
3. **Busy palette.** Saturated aurora/conic gradients in violet/coral/teal/amber — contradicts the code's own "data-viz only" comments. Reads dated, not premium.
4. **Performance risk.** 64 client components, ~entire page client-rendered, 5–6 three.js scenes defined.

What's good and kept: content/IA, telemetry, OG images, RSS, AI concierge, blog (TOC/reading-progress), command palette, reduced-motion handling.

## Design system

Single restrained accent (**indigo**) in both modes. Light is the default; dark is a toggle.

### Light (default) — warm paper + ink
```
--background       oklch(0.985 0.004 95)   warm ivory
--card             oklch(1 0 0)            white, lifted by soft shadow
--card-elevated    oklch(0.995 0.002 95)
--foreground       oklch(0.22 0.012 60)    warm ink
--muted-foreground oklch(0.50 0.01 60)
--border           oklch(0.22 0 0 / 0.08)  hairline
--primary          oklch(0.54 0.17 264)    indigo — used sparingly
--ring             indigo @ lower alpha
shadows: soft, layered, low-opacity
```

### Dark (toggle) — refined charcoal (lifted from #050505)
```
--background       oklch(0.165 0.006 265)  slate-charcoal
--card             oklch(0.205 0.006 265)
--foreground       oklch(0.96 0 0)
--primary          oklch(0.66 0.17 264)    brighter indigo
--border           white / 0.08
```

Typography: keep Geist (sans + mono). Tighten scale, more whitespace.
Remove decorative multi-hue gradients (`aurora-text`, `conic-glow`); name uses a single indigo→ink treatment.

## Prune (premium-minimal)

- **Delete dead files:** cursor-trail, dot-grid, easter-egg, floating-glyphs, floating-shapes-3d, hero-3d, holographic-card, neural-canvas, page-curtain, particles-3d, cinema-reveal.
- **Remove overlay soup:** grain, page-vignette, floating-orbs, custom cursor, scroll-temp.
- **Keep:** thin scroll-progress, reveal-on-scroll, magnetic CTA, tilt cards, command palette.

## Features (phased — each phase is a review checkpoint)

| Phase | Feature | Deliverable |
|---|---|---|
| 1 | Design system + theme toggle + prune | Light/dark tokens, `ThemeProvider` (next-themes, attribute=class, default light, system-aware), animated toggle in nav (View Transitions circular reveal + reduced-motion fallback), all sections re-themed, dead code removed |
| 2 | Hero refresh | Replace heavy globe with a lighter signature visual + scroll storytelling; both themes |
| 3 | Project case studies | Extend `Project` type (problem/approach/architecture/results/links); dedicated `/work/[slug]` pages + polished quick-view modal |
| 4 | Live GitHub | Server-fetched real stats + contribution graph, cached |
| 5 | AI concierge upgrade | Suggested prompts, streaming polish, citations. Read ai-sdk docs before touching `app/api/chat/route.ts` |

## Decisions

- Accent: **indigo** (neutral-premium, senior).
- Font: keep **Geist** (no serif added).
- Case studies: **real pages** (`/work/[slug]`), not just modals — SEO + shareability.
- Toggle default: **light**, system-aware, persisted.

## Success criteria

- Light default loads with no flash; dark toggle persists across reloads and routes.
- Zero dead effect files; no grain/vignette/orbs/custom-cursor.
- `tsc --noEmit` clean; `next build` succeeds.
- Visual parity check in both themes across all sections + blog + /now + 404.
- No saturated multi-hue decorative gradients; single indigo accent throughout.
