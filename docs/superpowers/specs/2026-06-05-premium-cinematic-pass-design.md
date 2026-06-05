# Premium Cinematic Pass — Design

**Date:** 2026-06-05
**Owner:** Shivang
**Target aesthetic:** Apple / Arc — soft cinematic, layered depth, generous space.

## Goal

Transform the portfolio from "many effects piled on" into a cohesive, premium, cinematic single-page experience. The site should read as the work of a senior AI engineer with taste — restrained, deep, and warm — not as a tech demo.

## Diagnosis (current state)

- **Background stacking:** the hero section composes 7 background layers (Aurora, Neural canvas, Dot grid, Hero spotlight, Orbit ring, Hero3D scene, Globe) plus corner brackets. The eye has no resting point.
- **Color sprawl:** 5 accent hues (primary, violet, coral, teal, amber) are used decoratively across cards, icons, and dividers without a semantic system.
- **Effect density:** confetti, target game, easter egg, cursor trail, holographic tilt — these pull the framing toward "playful demo" instead of "serious builder."
- **Section seams:** glyph dividers (★ ◆ ✦), section watermarks, marquee strip, and tightly stacked sections create constant visual chatter.
- **Type system:** `aurora-text` is applied to many headings; there is no single eyebrow style; heading scales drift between sections.

## Scope

Curate and cohere the existing site. No new sections, no rebuild of layout. Edits are limited to:

1. Page composition (`app/page.tsx`) — remove/reorder.
2. Hero section (`components/sections/hero.tsx`) — strip background stack.
3. Color tokens (`app/globals.css`) — semantic system + deeper bg.
4. Section eyebrows, dividers, type scale — cohesion pass.
5. Cinematic motion additions (scroll-pin hero, scale reveals, scroll-linked nav, scroll temp shift).

Explicitly out of scope:

- New sections or content.
- Backend, blog, chat, AI concierge logic.
- Mobile-specific redesign (responsive must continue to work, but no new breakpoint design).

## Decisions (approved)

### Cull from page

- `Confetti`, `TargetGame`, `EasterEgg`, `CursorTrail` — unmount from page. Files stay in repo for now.
- Hero background layers: drop `NeuralCanvas`, `DotGrid`, `Hero3D`, corner brackets. Keep `AuroraBg` (toned) + `OrbitRing` + `Globe` + `HeroSpotlight` (toned).
- `FloatingShapes3D` in Bento — remove.
- `HolographicCard` wrapping MegaStats tiles — swap for flat glass surface with subtle hover lift.
- `SectionDivider` glyphs (`★ ◆ ✦`) between sections — replace with a thin gradient hairline component.
- `Marquee` strip between Hero and MegaStats — remove from main flow. (May reappear near footer if needed; not in this pass.)

### Color system — 2-hue semantic

- `--primary` (cool blue): brand, CTAs, links, focus rings, active nav.
- `--violet`: AI/intelligence accent — model names, AI-related labels, "thinking" indicators, AI Concierge.
- `--coral`, `--teal`, `--amber`: demoted to **data-viz only** (stat numbers, sparklines, chart series, status dots). No decorative use in icons, borders, or backgrounds.
- Background: deeper near-black. `--background: oklch(0.055 0 0)`.
- Surface tiers:
  - `--card: oklch(0.085 0 0)` (default surface)
  - `--card-elevated: oklch(0.11 0 0)` (hover / popovers)
- Borders: tighten globally to `oklch(1 0 0 / 0.06)` (currently 0.10).
- New token: `--shadow-cinema` — layered ambient shadow `0 1px 0 oklch(1 0 0 / 0.04) inset, 0 20px 60px -20px oklch(0 0 0 / 0.6), 0 8px 24px -12px oklch(0 0 0 / 0.4)`.

### Cinematic motion

- **Hero sticky pin:** wrap hero content in a sticky container for the first viewport. As user scrolls the first ~80vh, aurora drifts (`translateY` + `opacity`), globe scales `1 → 0.92`, headline opacity easing. Single coordinated scene driven by `useScroll` + `useTransform` (motion/react).
- **Section reveal:** replace y-translate fades with `scale: 0.96 → 1` + `opacity: 0 → 1` + soft shadow grow (`--shadow-cinema` fades in). Applied via the existing `Reveal` component or a new `CinemaReveal`.
- **Scroll-linked nav:** nav shrinks (`py-4 → py-2`) and a hairline border `oklch(1 0 0 / 0.08)` fades in at `scrollY > 24`. Logo and link size reduce slightly.
- **Background temperature shift:** wrap `<main>` in a CSS variable driven by scroll progress. Cool (`hue ~250`) at top → slightly warmer (`hue ~270`) at mid → cool again at bottom. Applied to the aurora gradient hue tokens only — extremely subtle, ~10° hue drift.

### Type cohesion

- New `Eyebrow` component: mono micro-uppercase + hairline left rule. Replaces inline eyebrow markup across sections.
- Heading scale tokens:
  - `hero` — `clamp(3rem, 9vw, 7.5rem)`, tracking `-0.045em`
  - `section` — `clamp(2.25rem, 5.5vw, 4rem)`, tracking `-0.03em`
  - `sub` — `clamp(1.25rem, 2vw, 1.5rem)`
- `aurora-text` reserved for exactly one element — the last name in the hero. Removed elsewhere (bento title, section titles).

### Page order

```
Hero → MegaStats → Bento → About → Experience → Projects → Skills → AIConcierge → LatestBlog → Contact → ChatRoot
```

No `Marquee`, no glyph `SectionDivider`s.

### Global polish

- Corner vignette: a single full-page pseudo-element with a soft radial mask at corners. ~6% opacity.
- Noise overlay: keep the existing `grain` utility but reduce opacity to ~3% globally via `<body class="grain">`.

## Component & file changes

### Modify

- `app/page.tsx` — remove imports/elements for Marquee, SectionDivider, plus mount any new global wrappers (vignette / scroll temp).
- `app/globals.css` — update color tokens, add `--shadow-cinema`, add Eyebrow utility classes, adjust grain opacity, add scroll-temp CSS var hook.
- `components/sections/hero.tsx` — strip background stack to AuroraBg + OrbitRing + Globe + HeroSpotlight (toned). Add sticky-pin scroll scene.
- `components/sections/mega-stats.tsx` — remove `HolographicCard`. Use plain glass card with hover lift + cinema shadow.
- `components/sections/bento.tsx` — remove `FloatingShapes3D`. Standardize eyebrow + title. Adjust hover hues to use only primary/violet.
- `components/sections/about.tsx`, `experience.tsx`, `projects.tsx`, `skills.tsx`, `latest-blog.tsx`, `contact.tsx`, `ai-concierge.tsx` — swap inline eyebrows for `<Eyebrow>`, demote decorative coral/teal/amber to primary/violet, ensure section reveal uses CinemaReveal.
- `components/nav.tsx` — add scroll-linked shrink + hairline border on threshold.
- `components/hero/aurora-bg.tsx` — soften intensity (lower opacity, smaller blur radius if too bright).
- `components/effects/hero-spotlight.tsx` — reduce intensity to taste.

### Add

- `components/eyebrow.tsx` — single eyebrow component.
- `components/section-hairline.tsx` — replacement for glyph divider (subtle gradient hairline). Used sparingly between thematic groups, not between every section.
- `components/motion/cinema-reveal.tsx` — viewport reveal with scale + shadow.
- `components/effects/page-vignette.tsx` — soft corner vignette overlay.
- `components/effects/scroll-temp.tsx` — listens to scroll position, sets `--bg-hue` CSS var on root.

### Unmount / remove from page (files stay)

- `components/effects/confetti.tsx`
- `components/effects/target-game.tsx`
- `components/effects/easter-egg.tsx`
- `components/effects/cursor-trail.tsx`
- `components/effects/holographic-card.tsx` (still referenced, just not from MegaStats)
- `components/effects/neural-canvas.tsx`
- `components/effects/dot-grid.tsx`
- `components/effects/hero-3d.tsx`
- `components/effects/floating-shapes-3d.tsx`
- `components/section-divider.tsx`
- `components/marquee.tsx`

## Data flow

No new data sources. All changes are presentational. Scroll-driven values flow through `useScroll`/`useTransform` (motion/react) — no global state, each scene self-contained.

## Error handling

N/A — presentational change. Reduced-motion respected by motion/react's `useReducedMotion` and existing `prefers-reduced-motion` rules in `globals.css`.

## Testing & verification

- Manual: visual diff in browser, verify each section. Run dev server, scroll start → end.
- Verify type-check + lint pass.
- Verify reduced-motion: all scroll-driven scenes degrade to static fade.
- Verify mobile breakpoints: hero pin disabled below `md`; reveal animations preserved.

## Risk / rollback

- Each removed effect file stays in repo; rollback = re-mount in `page.tsx`.
- Color token change is a single CSS file edit; rollback = revert one file.
- Sticky hero pin is the most novel addition. If it causes jank on lower-end devices, gate behind `useReducedMotion` only (already planned) and add a `prefers-reduced-data` check.

## Out of scope (explicit)

- New sections, new content, copy rewrites.
- Backend / API.
- Mobile redesign beyond keeping existing responsive intact.
- Dark/light toggle (site stays dark).
- Performance regression hunting (separate pass if needed).
