# Shivang Singh — Portfolio Design Spec

**Date**: 2026-05-22
**Owner**: Shivang Singh (AI Engineer @ Publicis Sapient)
**Status**: Approved, in implementation

## Goal

Best-in-class personal portfolio. Single-page scroll. Premium SaaS feel (Linear × Vercel × Raycast). Heavy frontend with fluid motion + 3D hero. Showcases AI/GenAI/LLM production work.

## Stack

- Next.js 16 (App Router, RSC, Turbopack) + TypeScript strict
- Tailwind v4 + shadcn/ui (style: new-york, base: zinc, dark default)
- Motion (`motion/react`) for component animation
- React Three Fiber + drei for hero 3D
- Lenis for smooth scroll
- AI SDK v5 + Vercel AI Gateway (chatbot) — scaffolded, key added later
- Lucide icons, Geist Sans + Geist Mono

## Visual System

```
--background  #050505    near-black
--card        #0A0A0A
--foreground  #FAFAFA
--muted-fg    zinc-400
--border      zinc-800
--primary     oklch(0.72 0.20 250)   electric indigo
--glow        #00D9FF                 cyan glow (gradient pair)
--radius      0.75rem
```

Type: Geist Sans display (clamp 48–120px hero), Geist Mono for tags/metrics/code.
Density: comfortable (gap-6, p-6, py-24 between sections).

## Sections (top → bottom)

1. **Hero** — 3D particle constellation (R3F instanced points, mouse parallax). Name + role + tagline. CTAs: View work / Talk to my AI. Scroll cue.
2. **About** — 2-col: bio paragraph (LinkedIn summary, condensed) + animated stat strip (95% time saved, 10K+ assets, 1K+ concurrent req, 1.21% EER).
3. **Experience** — vertical timeline. Publicis Sapient → Lincode → Omdena → Epoch/Matrix. Cards expand with bullet metrics.
4. **Projects** — 4 cards. Dossier, FedFV-CV, slackAgent, RAG-QA. Hover: gradient border sweep, tech chips, GH link, headline metric.
5. **Skills** — chip clusters by category (LLM/GenAI, CV, MLOps, Cloud, Programming, Certifications). Staggered viewport reveal.
6. **GitHub** — live contribution heatmap (github-contributions-api) + 3 featured repo cards.
7. **Contact** — email, LinkedIn, GitHub, location. Resume download + view-in-browser. Mailto CTA + magnetic button.
8. **Chatbot (floating)** — bottom-right pill → expands to shadcn `ai-elements` chat sheet. RAG-lite: resume serialized into system prompt. Streams via AI SDK + AI Gateway.

## Motion language

- Viewport-stagger reveals (60ms, ease-out, y:20→0, opacity:0→1)
- Magnetic CTAs (cursor pull, max 8px)
- Hero 3D: slow idle rotation + cursor parallax
- Lenis smooth scroll + section anchor
- Subtle dot cursor in hero only
- Marquee band for client logos (Eli Lilly, Publicis Sapient, etc — text only, no fake logos)

## Data architecture

`lib/data.ts` = single source of truth (TS const). Drives every section + the chatbot system prompt. No CMS.

## File layout

```
app/
  layout.tsx              fonts + theme + Lenis + Toaster
  page.tsx                composes sections
  api/chat/route.ts       AI SDK streamText
  globals.css             tokens + @theme inline
components/
  nav.tsx                 sticky anchor nav with progress
  sections/hero.tsx
  sections/about.tsx
  sections/experience.tsx
  sections/projects.tsx
  sections/skills.tsx
  sections/github.tsx
  sections/contact.tsx
  hero/particles-3d.tsx   R3F scene (lazy import)
  chat/chat-widget.tsx    floating widget
  chat/chat-sheet.tsx     Sheet with messages + input
  ui/...                  shadcn primitives
  motion/                 reveal, magnetic-button, marquee
lib/
  data.ts                 resume + projects + skills typed
  resume-context.ts       system-prompt builder
  utils.ts                cn helper
public/
  resume.pdf
```

## Performance budget

- LCP < 1.5s on 4G
- INP < 100ms
- Initial JS < 200KB (3D scene lazy after hero static render)
- All sections SSR'd, hydrate-on-idle for non-critical

## Accessibility

- Semantic landmarks, h1 → h6 order
- All interactives keyboard-reachable, focus ring uses --primary
- Prefers-reduced-motion: kills 3D rotation + scroll-trigger transforms
- Color contrast AAA on body text

## Out of scope (v1)

- Blog
- Light theme toggle (dark only)
- i18n
- CMS/dynamic data
