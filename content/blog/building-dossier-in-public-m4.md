---
title: "Building Dossier in Public: The M4 Milestone"
date: "2026-05-29"
excerpt: "Four milestones in, Dossier is no longer a side project — it's an agentic job-search system with real users. Here's what shipped, what broke, and why I'm building it on LinkedIn."
tags: ["dossier", "build-in-public", "agentic", "saas"]
---

For the last six months I've been building **Dossier** — a quality-first agentic job-search system that does the parts of a job hunt I find soul-crushing, while keeping the parts that actually matter (the *decision*) firmly with the human.

Last week I shipped M4. Four users are on it. None of them are me. That feels like a real number now.

This post is the kind of update I'd normally fragment across LinkedIn. Here it's all in one place — what M0–M4 actually means in code, what surprised me, and why I'm building this with the founders' equivalent of the cameras rolling.

## What Dossier actually is

Dossier is **not** an auto-apply bot. It's the opposite of that — every place where you'd usually expect agents to "just send it," Dossier stops and asks you. The agent's job is to compress an exhausting search into a small number of high-quality decisions.

Today it can:

1. Discover roles from across the open web, normalize them, and score them against a richly-typed *persona*
2. Research a target company — funding stage, stack, recent shipping cadence — and surface what's interesting before you waste a Saturday on a take-home
3. Tailor a resume against a specific JD with diff visibility (so I can sanity-check the edits, not just trust the model)
4. Surface plausible referral paths via a small graph over LinkedIn-style connection signals

There is no Apply button. There never will be. That is the entire product positioning.

## The milestone shape

I'm running Dossier as a milestone-driven build rather than sprint-driven, because the product doesn't have a release cadence yet — it has a sequence of *capabilities* that need to exist before any of the next ones make sense.

- **M0** — Multi-user from day one. Auth, persona schema, persistence. Boring, load-bearing.
- **M1** — Discovery + scoring. The crawl-rank-score loop with eval harness.
- **M2** — Company research agent. Tool-use over a curated set of sources.
- **M3** — Resume tailoring with diff UI. Refused to ship until the diffs were trustworthy.
- **M4 (active)** — Referral graph + beta cohort onboarding. Real users, real feedback.

Every milestone has a kill criterion. M3 nearly got killed because the first three resume-tailoring approaches all produced text that was *technically* better but read like it had been laundered through a model. The version that shipped was the fourth attempt — constraint-driven prompting that edits at the *bullet* level, not the document level.

## What the M4 beta has taught me already

Four users sounds like nothing. It's plenty.

**1. The agent's confidence is itself a feature.** When the company-research step returned hedged language, beta users skipped reading it entirely. When it returned a confident one-line summary with a "show your work" expand, they engaged. Same data, same correctness. UX of certainty matters.

**2. Persona drift is real.** Two of my beta users wrote their persona in week one and never updated it. By week three, the scoring quality felt "off" to them — because *they'd* drifted, not the model. M5 is going to include a quiet quarterly nudge to revise the persona.

**3. The thing they want most is something I haven't built.** Every single beta user has, unprompted, asked for an interview-prep agent that uses the same company research context. I had this as M9. It's getting pulled forward.

## Stack notes, because someone always asks

- **Python SDK** (`dossier-sdk`) for the agentic core — tool use, persona scoring, eval harness
- **FastAPI** backend, deployed on a small managed K8s cluster — same stack as the day job, which keeps the cognitive switching cost low
- **Next.js 16 App Router** for the frontend, React 19, Tailwind v4, shadcn/ui
- Stripe is deliberately *not* in the stack yet. Monetization is gated on ≥20 Pro waitlist signups. I'd rather have zero billing code than billing code with no one to bill.

The Next.js side has been the most fun and the most humbling. Cache Components in 16 are genuinely lovely — but I learned the hard way that "stale-while-revalidate" intuitions from older React patterns don't map cleanly onto the new directive model. M4 has one panel that I rewrote three times before it cached correctly under concurrent navigations.

## Why build this in public

Two honest reasons.

The first is that I work at Publicis Sapient as an LLM Infra Engineer. The day job is great and pays well. But it doesn't, on its own, get me to the *thing* I want to be doing — which is sitting at the intersection of agentic systems and product, with my name on the work. Building Dossier publicly compresses the distance between what I do and what people know I can do.

The second is more selfish: I've been writing 6,900-LinkedIn-connections' worth of broadcasts about this work, and the feedback loop is shockingly tight. Two consulting leads came from a single post about M2's company-research agent. Build-in-public isn't *just* marketing — for a one-person product it's effectively a free distributed PM.

## What's next

- **M5** — Persona revision nudges + interview-prep agent (pulled forward from M9 based on beta signal)
- **M6** — Eval harness public dashboard. If I'm going to brag about quality, the numbers should be inspectable
- **M11** — Stripe + tiers, *only* once the waitlist threshold is met

If you want to be on the beta — or if you want to talk about how you'd use something like this — the [Contact](/#contact) page works, or [Talk to my AI](#) (the chat widget in the corner) is wired into a slim copy of the same Dossier context. It can answer most of what's in this post and more.

More updates as M4 graduates and M5 starts. As always — fewer dashboards, more decisions.
