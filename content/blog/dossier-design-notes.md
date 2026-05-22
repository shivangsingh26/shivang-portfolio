---
title: "Designing Dossier: A 7-Agent Job-Search Pipeline That Costs $0.06 per Application"
date: "2026-04-22"
excerpt: "I built an autonomous agentic system that researches companies, scores roles, finds referrals, and writes tailored resumes — for less than a coffee. Here's the architecture."
tags: ["agents", "llm", "side-project", "dossier"]
---

I built Dossier because the modern job search is a manual disaster. Search aggregators surface noise. Custom resumes take an hour each. "Find a referral" usually means scrolling LinkedIn until your eyes blur.

So I asked: what if the entire pipeline — discovery, research, scoring, resume tailoring, referral hunting — could run autonomously, end-to-end, for cents per application?

The answer is Dossier. It's a 7-agent system. Each application costs around $0.06 in API spend. End-to-end prep time dropped from hours to under 2 minutes.

This post is about the design decisions.

## The 7 agents

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ Job Discovery   │ ──▶ │ Watchlist       │ ──▶ │ Company Intel   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                         │
┌─────────────────┐     ┌─────────────────┐     ┌────────▼────────┐
│ Referral Finder │ ◀── │ Resume Agent    │ ◀── │ Gap Analysis    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                ▲
                        ┌───────┴───────┐
                        │ Market Intel  │
                        └───────────────┘
```

Each agent has one job:

| Agent | Input | Output | Model |
|-------|-------|--------|-------|
| Job Discovery | Search criteria | Raw job list (~550/run) | Tavily + GPT-5.4-mini |
| Watchlist | Raw jobs | Filtered candidates | Rule-based, no LLM |
| Company Intel | Company name | Funding, team, vibe | GPT-5 + Tavily |
| Market Intel | Role title | Salary range, demand | GPT-5.4-mini |
| Gap Analysis | JD + candidate | Skill gaps, fit score | Claude Haiku 4.5 |
| Resume Agent | JD + candidate + gaps | Tailored LaTeX resume | Claude Sonnet 4.6 (3-pass) |
| Referral Finder | Company + candidate | Warm intros | Tiered (see below) |

The key insight: **most agents don't need a frontier model.** Discovery and filtering use cheap models. Reasoning and writing use expensive ones. The cost curve is a step function, not a smooth slope.

## Cost discipline: pre-LLM filters cut 65% of API calls

The naive version of Dossier called the LLM on every job pulled from Tavily. That's ~550 calls per run. Most of those jobs are non-starters — wrong location, wrong seniority, wrong stack.

So I added a **rule-based filter** between Discovery and Watchlist. It's a hundred lines of Python checking:

- Location matches candidate preferences
- Title contains a keyword from a permissive synonym list
- Posted date < 14 days
- Company isn't on a blocklist (recruiting agencies, contract shops)

Result: roughly 65% of jobs are eliminated before they cost an API call. Cost per application dropped from ~$0.17 to ~$0.06 without any quality loss.

> **The principle:** LLMs are expensive lookup tables. If a rule can answer the question, use the rule.

## The Resume Agent's 3-pass self-eval

The Resume Agent is the only place I spend on Claude Sonnet 4.6. It runs in three passes:

1. **Tailor pass.** Given JD + candidate JSON, generate a LaTeX resume. Strict prompt: no fabrication, mirror JD keywords, keep within one page.
2. **Critique pass.** A second prompt evaluates the resume against the JD, looking for missing keywords, vague bullets, or anything that smells fabricated.
3. **Revise pass.** Take the critique and produce a final resume.

The critique pass catches things the tailor pass routinely misses — generic action verbs ("worked on", "responsible for"), absent ATS keywords, bullet ordering. It's the difference between resumes that read like an LLM wrote them and resumes that read like a human did.

Total cost: ~3,200 input tokens + ~1,800 output tokens per resume. Roughly $0.04. The other $0.02 is everything else combined.

## Referral Finder's tiered strategy

This was the agent I spent the most design time on, because warm intros are the hardest signal to extract from public data.

It runs three tiers:

**Tier 1 — Warm LinkedIn connections.** Read the candidate's exported LinkedIn graph. Filter to current employees of the target company. Surface top 3 by recency and overlap.

**Tier 2 — Tavily cold search.** Query for "[Company] engineers India" with strict validation: must mention the candidate's company in profile, must be India-based, must have a public email or LinkedIn URL.

**Tier 3 — GPT-5.4-mini outreach generation.** Given a target's profile and the candidate's background, draft a 4-sentence personalized DM. Tone: warm, specific, no asks beyond a 15-min chat.

Tier 1 fires for ~30% of applications. Tier 2 for ~50%. Tier 3 is the fallback for niche companies where the first two tiers come up empty.

## What I'd improve

- **Memory across runs.** Right now each Dossier session is stateless. A persistent memory of "you already applied to Acme Corp last month" would be useful.
- **Async pipeline.** The 7 agents currently run mostly sequentially. With proper dependency mapping, the Discovery → Watchlist → Company Intel + Market Intel branches could run in parallel.
- **Smaller models for Gap Analysis.** Haiku 4.5 is fine. A fine-tuned 3B model would be faster and cheaper.

---

## Profile-agnostic architecture

The thing I'm proudest of: Dossier loads all candidate data from a single JSON file at runtime. Want to run it for a different person? Swap the JSON. Zero code changes. The agents read from a shared context, and prompts are templated against that context.

This wasn't the original design. I refactored after a friend asked to try it. Now it's a property of the system, and it's the property I think will let Dossier eventually become a tool other people use.

The repo is on GitHub. The README walks through setup.

More agent design notes coming. The next one is probably about why I gave up on LangGraph for this and went back to plain `ThreadPoolExecutor` orchestration.
