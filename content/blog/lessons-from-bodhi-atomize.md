---
title: "What I Learned Shipping a Multimodal GenAI Platform to Production"
date: "2026-05-15"
excerpt: "Bodhi Atomize processes 10,000+ marketing assets for Eli Lilly. Here's what actually broke, what scaled, and what I'd build differently next time."
tags: ["genai", "production", "llm", "publicis-sapient"]
---

When I joined Publicis Sapient last June, I inherited a brief: *take an internal AI proof-of-concept and make it survive enterprise traffic.* Bodhi Atomize is what we built — a multimodal GenAI platform that decomposes images, videos, and GIFs into structured JSON signals at scale.

Eleven months later, it's processed over 10,000 assets for Eli Lilly with ~95% reduction in manual analysis time. But the path from POC to production was, predictably, a parade of surprises. These are the lessons that stuck.

## 1. Token budgets are infrastructure, not optimization

The first version of Atomize used Gemini 2.5 Pro for every stage of the pipeline — perception, structured extraction, validation. It worked beautifully on individual assets. It melted the second we ran it concurrently.

LLM API providers don't fail loudly when you exceed rate limits. They fail in slow, surprising ways: latency spikes, partial responses, occasionally just silence. Our first outage in staging was a request queue that grew unboundedly because we kept retrying. Classic.

What fixed it:

- **Token-aware request budgeting.** Each call carries a cost estimate. The orchestrator refuses to enqueue if the rolling-window budget would be exceeded.
- **Exponential backoff with jitter.** Standard, but the jitter matters — otherwise retries cluster and re-trigger the rate limit.
- **Backpressure into Celery.** When the LLM pool saturates, we slow the producer instead of dropping work.

> The takeaway: treat your LLM provider like a flaky upstream service. Build for failure modes, not just happy paths.

## 2. Structured outputs are not "free"

Pydantic-validated structured outputs are wonderful. They turn an LLM into something you can plug into deterministic code. They are also, in their failure mode, *worse* than plain text — because a malformed structured output blocks the entire downstream pipeline.

We had a stretch where ~3% of Gemini responses parsed as syntactically valid JSON but failed semantic validation (missing required fields, wrong enum values). The fix wasn't more validation. It was:

1. A **retry with feedback** loop — re-prompt the model with the validation error included.
2. A **fallback parser** that extracts what it can from malformed responses.
3. A **graceful degradation** path that routes irrecoverable failures to a human review queue.

Roughly: prefer 99.5% with a clean escape hatch over 99.9% with hidden silent failures.

## 3. Eval is a product surface, not a one-time task

DeepEval (LLM-as-judge, G-Eval) became the heartbeat of our deployment process. Every PR that touches a prompt or model runs against a frozen golden dataset. Drift on any metric blocks merge.

But the real value isn't gating merges. It's the **dashboards**. Stakeholders trust the system because they can see week-over-week correctness scores. When we swapped Gemini for a newer release mid-quarter, we caught a 4% regression on emotion-detection within 24 hours — not from a customer complaint, from the metric.

Build eval before you need it.

## 4. The CV + LLM combination compounds

Atomize uses YOLO and PaddleOCR as a pre-processing layer before the LLM ever sees an asset. This is not glamorous. It does most of the work.

The LLM is brilliant at reasoning over structured inputs. It is mediocre and expensive at raw perception. Letting a 5MB YOLO model extract bounding boxes for $0.0001 per image, then passing structured crops to Gemini, is roughly 10× cheaper than feeding the raw image and asking the LLM to find things.

The general principle: **let cheap, specialized models do the perception. Let the LLM do the reasoning.**

## 5. KEDA is the unsung hero

The traffic pattern on Atomize is bursty — large client uploads come in waves. Static replica counts either wasted compute or buckled under load.

KEDA (Kubernetes Event-Driven Autoscaling) reads our Redis queue depth and scales FastAPI workers between 2 and 40 replicas based on actual demand. The result is sub-second response under steady state and graceful degradation (not outage) under burst.

If your workload has any kind of queue, you want event-driven scaling. Static HPA is a 2019 solution.

---

## What I'd do differently

If I rebuilt Atomize from scratch tomorrow:

- **Start with the eval harness.** Not the pipeline. Eval first, prompt second.
- **Tighter typing on the orchestration layer.** Our pipeline is mostly typed, but the agent-orchestrator config grew into a dictionary-of-dictionaries swamp. I'd reach for Pydantic models from day one.
- **Bias toward smaller, fine-tuned models for the deterministic stages.** Gemini for reasoning. A fine-tuned Phi-3 or similar for the dozen "is this image a person or a product?" calls per asset.

Building AI systems is a software engineering problem more than a machine learning one. The model is the easy part. The retries, the queues, the budgets, the eval, the gracefully-degrading-under-load — that's the actual product.

More notes from the trenches soon.
