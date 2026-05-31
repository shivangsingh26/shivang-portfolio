---
title: "Dossier: An 8-Agent Job-Search Pipeline That Survives Production at ~$0.04 per Run"
date: "2026-05-22"
excerpt: "Why I stopped building a job board and started building a quality-first agentic pipeline. The architecture, the cost discipline, and the SaaS layer I wrapped around it."
tags: ["agents", "llm", "side-project", "dossier", "saas"]
---

The modern job search is a quantity game. Tools optimize for *more* — more applications, more matches, more boards. The result is a perfect machine for generating noise.

I wanted the opposite. Dossier is built on a single thesis: **send 10 targeted applications with full context on each company, and get 5 responses.** It's a quality-first agentic pipeline that finds, scores, researches, and surfaces the roles most worth your time — wrapped in a multi-user SaaS so anyone can onboard and run their own pipeline from a browser.

This post is the design diary. What's in it, why it works, and what I'd build differently from scratch.

## The 8 agents

Eight agents working together. Each one is independently useful. All live in `sdk/dossier_sdk/agents/` and are **domain-aware** — the same agent code serves ML/AI, SDE, and Data Science profiles based on `profile.role_domain`.

| Agent | What it does | Cost / run |
|---|---|---|
| **Persona Builder** | Resume + LinkedIn PDF parse → questionnaire → 13-question quiz → LLM synthesis into `profile.json` (schema v2) | ~$0 |
| **Job Discovery** | Multi-source keyword search (Indeed + LinkedIn). Pre-filter drops ~60% before any LLM call. Parallel score against the user's `role_domain` | ~$0.04 |
| **Watchlist Agent** | Company-specific fetch across **79 hand-picked companies** via LinkedIn `f_C=`, Greenhouse, Lever. Catches promoted listings keyword search never surfaces. | ~$0.01 |
| **Company Intel** | For every job scoring ≥ 7/10: Tavily + Wikipedia + GPT-5.4-mini → structured `intel.json` (funding, headcount, ML focus, risk flags) | ~$0.02/job |
| **Gap Analysis** | Semantic skill extraction across all accumulated JDs. Not keyword matching — reasons about capability equivalence | ~$0.73 one-time |
| **Market Intel** | Monitors YourStory / Inc42 / TechCrunch for new AI/ML funding rounds. Routes companies to watchlist or cold outreach. | ~$0.01 |
| **Resume Agent** | 3-pass self-evaluation: Sonnet tailor → Haiku critic → Sonnet revise. ATS keyword mirroring + hallucination guard enforced. | ~$0.08–0.14/app |
| **Referral Finder** | 3-tier contact search: warm LinkedIn → cold Tavily → personalised LLM cold message. Confidence-scored, seniority-aware. | ~$0.02/job |

A daily run currently costs around **$0.04 total** on the keyword-discovery stage, with company intel + resume tailoring on demand for jobs you actually like.

The key insight: **most agents don't need a frontier model.** Discovery and filtering use GPT-5.4-mini. Reasoning and writing use Claude Sonnet 4.6. The cost curve is a step function, not a smooth slope.

## Cost discipline: pre-filter drops ~60% before any LLM token

The naive version called the LLM on every job pulled from Indeed/LinkedIn. That's ~550 calls per run. Most are non-starters — wrong seniority, wrong location, service companies, off-domain titles.

So I added a **rule-based pre-filter** between discovery and scoring. It's a hundred lines of Python checking, in cost order:

```
is_hard_no()              ← service cos (TCS · Infosys · NTT DATA · Happiest Minds...)
                            IT staffing, job aggregators
description < 100 chars   ← no content = no signal
is_seniority_mismatch()   ← profile-driven: Senior · Staff · VP · Intern
classify_job_function()   ← domain-aware: ML/DS titles → off_domain for SDE users (0 pts)
                            SDE/backend titles → off_domain for ML users
                            support_ops (SRE / DevOps / pure Infra) → cap at 3
extract_years_required()  ← > exp_band max → hard reject
extract_degree_required() ← PhD → hard reject · Masters → soft penalty
is_job_seen(url)          ← per-user SQLite dedup → skip
```

Result: ~60% of raw jobs eliminated before they cost an API call. **Cost per run dropped from ~$0.10 to ~$0.04** without any quality loss.

> The principle: LLMs are expensive lookup tables. If a rule can answer the question, use the rule.

## Domain-aware scoring: same agent, three personas

`build_scoring_system_prompt` is generic. It reads `target.roles` and `role_domain` from the user's profile and assembles a domain-specific prompt at runtime. The same `score_job` function serves:

| Profile | `role_domain` | Targeted titles | Off-domain titles |
|---|---|---|---|
| Shivang, Krishna | `ml_ai` | ML Engineer, AI Engineer, Data Scientist, LLM Engineer | SDE, Backend, Frontend |
| Anushthan | `sde` | Backend Engineer, SDE-1, Software Engineer | ML Engineer, Data Scientist |
| (future) | `data` | Analytics Engineer, Data Engineer, BI | ML Engineer, SDE |

Experience derives from `full_time_months` (with `intern_months` fallback). The switch_months countdown computes from `target.target_by` — no hardcoded dates.

The benefit: **one codebase, many users.** Adding a new role domain is a 30-line addition to the prompt builder, not a fork.

## Semantic gap analysis — how the matching works

The gap agent doesn't keyword-match. It sends your full profile summary alongside every JD and asks the LLM to reason about capability equivalence.

```
JD says "PyTorch"
  + profile has "Computer Vision [can_architect]: YOLO, RF-DETR, MobileNetV2"
  → candidate HAS PyTorch  ✓  (domain at architect depth implies the core framework)

JD says "RAG"
  + profile has "RAG Systems [can_architect]: LlamaIndex, LangChain, ChromaDB, FAISS"
  → candidate HAS RAG  ✓  (exact alias match)

JD says "SQL"
  + profile has no SQL alias anywhere
  → candidate MISSING SQL  ✗  (never inferred from Python/ML background alone)
```

Six categories per JD: `technical` · `tools_platforms` · `domain` · `research_methods` · `behavioral` · `certifications`.

Each job gets a `gap.json` with `candidate_has_required` and `candidate_missing_required` lists. The resume agent reads these to decide which bullets to lead with.

**Current market signal across 193 JDs:**

| Required gap | % of JDs | | Strong match | % of JDs |
|---|---|---|---|---|
| SQL | 42% | | Python | 79% |
| Cross-functional collab | 38% | | AWS | 37% |
| NLP (domain) | 24% | | RAG | 27% |
| TensorFlow | 22% | | GCP | 21% |

The market is telling me what to learn next. That's the agent's real product.

## The Resume Agent's 3-pass self-eval

The most expensive call in the pipeline. Runs three sequential LLM passes:

1. **Tailor pass** (Claude Sonnet 4.6) — given gap.json + profile + JD, generate a tailored LaTeX resume. 10 hard rules: no fabrication, ATS keywords mirrored, `candidate_has_required` leads, hidden skills hidden.
2. **Critique pass** (Claude Haiku 4.5) — cheaper model audits the resume against 4 checks: keyword mirroring, hallucination, LaTeX validity, bullet ordering.
3. **Revise pass** (Sonnet again, only if critic fails any check) — surgical fix on the specific issue. Max 1 revise loop.

Cost: $0.08 if the tailor passes audit on first try, $0.14 if it needs the revise. Average ~$0.10/application.

The critique pass catches things the tailor pass routinely misses — generic action verbs, absent ATS keywords, bullet ordering against the gap signal. It's the difference between resumes that read like an LLM wrote them and resumes that read like a human did.

## The watchlist — why company-specific beats keyword search

Keyword search returns jobs that LinkedIn and Indeed want to show you. Company-specific `f_C=` search returns **every current opening** at that company, including promoted listings, internal transfers, and roles posted without common ML keywords.

```
Greenhouse API    boards-api.greenhouse.io/v1/boards/{token}/jobs   (free JSON)
Lever API         api.lever.co/v0/postings/{handle}?mode=json        (free JSON)
LinkedIn f_C=     company-specific search with numeric ID filter
```

LinkedIn ID resolver caches `slug → numeric ID` in `data/linkedin_company_ids.json`, auto-grows to 45+ entries, falls back to the `/about/` page if the main page fails. The scraper uses `requests.Session()` for TCP reuse, exponential backoff on 429 (30s → 60s → 120s), ±40% jitter on all sleeps, and parallel description fetching with slot-based stagger — so LinkedIn doesn't see a burst pattern.

Result: I'm pulling 79 companies' full hiring feeds in ~3 minutes, without IP bans.

## The SaaS layer

The CLI works. But each new user used to mean cloning the repo, fixing env vars, and onboarding manually. M2 wrapped it in a proper multi-user web product.

The stack:

- **SDK** (`sdk/dossier_sdk`) — Python 3.12, OpenAI + Anthropic, JobSpy, rich. All 8 agents + `orchestrator.run_pipeline`.
- **Backend** (`backend/src/dossier_api`) — FastAPI 0.136, Pydantic 2, Clerk (`clerk-backend-api`), Svix HMAC webhooks, SSE progress, `fasteners` for atomic credit deduction.
- **Frontend** (`frontend/app`) — Next.js 16, React 19, TypeScript strict, Tailwind v4, shadcn/ui, Clerk, TanStack Query, react-hook-form + zod.
- **Worker** — long-running Python process. Atomic `pick_next_queued_run`. Dispatch table: `persona_synthesis` (M3) → `discovery` (M4) → all 8 agents (M5–M10).

**Auth model**: Clerk owns user identity. `user.created` webhook (Svix HMAC verified) provisions a `pending` row in `accounts.db`. Admin promotes pending → active and assigns tier + credits. `GET /me` returns 200/401/403/suspended/pending — drives the app-shell branching on the frontend.

**Credits model**: Each pipeline action has a cost and a min-tier gate.

| Agent | Cost (credits) | Min tier | Est. runtime |
|---|---:|:---:|---:|
| `discovery` | 5 | Lite | 2m |
| `watchlist` | 8 | Pro | 4m |
| `company_intel` | 3 | Pro | 3m |
| `gap_analysis` | 4 | Pro | 1m |
| `resume_tailor` | 12 | Max | 90s |
| `referral_finder` | 6 | Max | 2m |

`POST /pipeline/run` atomically deducts credits + INSERTs a `pipeline_runs` row. The worker picks it up, streams progress over SSE, refunds idempotently on failure (keyed on `(run_id, reason)` so retries are safe).

New accounts get **100 credits** on signup, **reset every 30 days**. Stripe/Razorpay integration is deferred until ≥20 Pro waitlist signups validate paying intent. Today the "Upgrade" button drops users into a `waitlist` row — proof of intent before I build the billing layer.

## What I'd improve

- **Memory across runs.** Each session is stateless. A persistent memory of "you already applied to Acme Corp last month" would prevent re-surfacing.
- **Async fan-out.** The pipeline runs mostly sequentially. With proper dependency mapping, Discovery + Watchlist + Market Intel could run in parallel.
- **Cheaper Gap Analysis.** Haiku 4.5 works. A fine-tuned 3B model would be faster and cheaper at scale.
- **Real billing.** When the waitlist crosses 20 Pro signups, Stripe goes in.

## The numbers right now

| | |
|---|---|
| Agents built | 8 |
| Target companies | 79 |
| Active users | 4 |
| Cost per discovery run | ~$0.04 |
| Pre-filter drop rate | ~60% |
| Milestone | M4 in progress |

Code: [github.com/shivangsingh26/dossier](https://github.com/shivangsingh26/dossier). The next post is probably about why I gave up on LangGraph for orchestration and went back to plain Python.
