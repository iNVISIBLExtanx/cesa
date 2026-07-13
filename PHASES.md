# CESA Phase Tracker

> **Claude: read this FIRST.** The "Current status" line tells you where we are.
> After completing a task, tick it, append a LEARNING_LOG.md entry, and update the
> Current status line.
>
> **Forked this repo?** Reset "Current status" to `PHASE 0 — complete`, untick Phases
> 1–8, clear LEARNING_LOG.md and exams/SCORES.md, and zero the counters in
> exams/BLUEPRINT.md. The record should be yours, not the original author's.

## Current status: PHASE 0 — complete. Phase 1 not started.

---

## The gate — every phase ends the same way

No phase is done when the code runs. A phase is done when:

1. `experiments/NN-*/README.md` contains a **real measured number** for the naive failure
   AND the fix. No number → the phase was implemented, not learned.
2. `LEARNING_LOG.md` has the entry.
3. **`/phase-review N`** returns **PASS** (independent reviewer, fresh context).
4. **`/phase-exam N`** returns **ADVANCE** (8/10 or better).
5. `git tag phase-N && git push --tags`

A REWORK or a REVIEW verdict means you do not start the next phase. That is the whole
mechanism. Skipping the gate defeats the purpose of the repo.

---

## Phase 0 — Repo & tooling  (tag: phase-0)
- [x] Public repo, MIT LICENSE, README, medical disclaimer
- [x] pnpm + TS strict + ESLint + Prettier + Vitest
- [x] .gitignore, .env.example, secret scanning + push protection
- [x] Claude Code config: CLAUDE.md, .claude/rules/, skills, commands, .mcp.json
- [x] CI: build (lint + typecheck + test). Claude review bot PARKED until Phase 7.
- [x] Exam system: exams/BLUEPRINT.md, exams/SCORES.md, phase-review, phase-exam, mock-exam
- [ ] **Smoke test passes** — `pnpm tsx scripts/smoke-test.ts` prints `stop_reason: end_turn`

**Covers:** D3.1, D3.2, D3.3

---

## Phase 1 — The agentic loop  (tag: phase-1)
Hand-write the loop. This is the highest-weight domain's foundation.

- [ ] `experiments/01-naive-loop/` — loop that terminates by looking for "done" in the
      assistant's TEXT. Build it wrong on purpose.
- [ ] Run it on ~20 varied questions. **Record the numbers:** how many stopped early,
      how many never terminated.
- [ ] `src/loop/agentic-loop.ts` — branch on `stop_reason`. `"tool_use"` → execute tool,
      append `tool_result`, continue. `"end_turn"` → stop. Iteration cap ONLY as a safety
      net, never as the primary stop.
- [ ] Re-run the same 20. Record the new number (expect 0 failures).
- [ ] Vitest: mock the Anthropic client; assert continue-on-`tool_use`, stop-on-`end_turn`.
- [ ] Experiment README + LEARNING_LOG entry
- [ ] **GATE:** `/phase-review 1` → PASS · `/phase-exam 1` → ADVANCE · tag

**Covers:** D1.1
**You are done when** you can explain, without notes, why an iteration cap is a safety net
and not a stop condition — and why parsing text for "done" is not merely fragile but
categorically wrong.

---

## Phase 2 — Tools + custom PubMed MCP server  (tag: phase-2)
- [ ] `servers/pubmed/` MCP server over stdio: `pubmed_search`, `fetch_abstract`
      (NCBI E-utilities)
- [ ] **Naive first:** two vaguely-described overlapping tools. Log misroutes over 20
      queries. Then differentiate the descriptions. Re-measure.
- [ ] **Naive first:** generic `"Operation failed"` errors. Watch the agent give up.
      Then `{errorCategory, isRetryable, message}`. Distinguish an access failure from a
      **valid empty result**.
- [ ] `tool_choice` experiments: `"auto"` vs `"any"` vs forced
- [ ] `.mcp.json` with `${PUBMED_API_KEY:-}` expansion (see docs/mcp-servers.md)
- [ ] **GATE:** review → exam → tag

**Covers:** D2.1, D2.2, D2.3, D2.4

---

## Phase 3 — Intake, escalation & RAG  (tag: phase-3)
- [ ] Intake layer: out-of-scope (treatment advice) → refuse + escalate; ambiguous → ASK,
      never guess; explicit human request → escalate immediately; no evidence → structured
      handoff
- [ ] **Naive first:** escalate on urgency/sentiment cues. Measure how wrong it is. Then
      replace with explicit categorical criteria + few-shot.
- [ ] Ingest an open-access abstract corpus → chunk → embed → pgvector →
      `retrieve_passages` tool. Hand-write chunking and retrieval.
- [ ] **Ablate:** chunk size (256/512/1024) and k. Publish the recall@k table.
- [ ] Hybrid retrieval (dense + BM25) + a reranker. Measure the delta.
- [ ] **GATE:** review → exam → tag

**Covers:** D5.2, D4.1 · **Senior:** S1–S6, S12

---

## Phase 4 — Multi-agent orchestration  (tag: phase-4)
- [ ] Coordinator (`allowedTools: ["Task"]`) + search / analysis / synthesis subagents
- [ ] **Naive first:** narrow decomposition → watch coverage silently collapse. Fix the
      COORDINATOR, not the subagents.
- [ ] **Naive first:** assume subagents inherit context → watch it fail. Then pass
      structured context explicitly.
- [ ] Parallel spawning: multiple Task calls in ONE response. Time it against sequential.
- [ ] **Naive first:** subagent timeout returns `[]` as success → silent under-coverage.
      Then structured error context → coordinator proceeds with partial results AND
      annotates the gap.
- [ ] Scoped tools per subagent (least privilege)
- [ ] Do this refactor in **plan mode**; contrast with direct-executing a one-file fix
- [ ] **GATE:** review → exam → tag

**Covers:** D1.2, D1.3, D1.6, D2.3, D5.3, D3.4

---

## Phase 5 — Structured output, provenance, hooks, injection  (tag: phase-5)
- [ ] `tool_use` + JSON Schema extraction. **Naive first:** required `sample_size` on an
      abstract that omits it → watch it FABRICATE. Then nullable → null.
- [ ] Prove syntax-valid ≠ semantically valid: extract `stated_total` vs `calculated_total`.
- [ ] Validation-retry loop. Prove it fixes format errors and **never** fixes absent data.
- [ ] 2–4 few-shot examples across abstract formats
- [ ] **THE CENTREPIECE:** enforce "no claim without a citation" via system prompt. Run 50
      queries. **COUNT THE LEAKS.** Then implement the interception hook → 0. Put the
      number in the README.
- [ ] PostToolUse hook normalising PubMed's date chaos
- [ ] Claim-source mappings through every synthesis hop; conflicting figures → keep BOTH,
      attributed and dated
- [ ] **Senior:** plant `"IGNORE PREVIOUS INSTRUCTIONS"` in a retrieved abstract. Watch it
      work. Then defend.
- [ ] **GATE:** review → exam → tag

**Covers:** D4.2, D4.3, D4.4, D1.4, D1.5, D5.1, D5.6 · **Senior:** S10, S11

---

## Phase 6 — Evals, confidence, batch  (tag: phase-6)
- [ ] Golden set (~20 questions → expected findings, citations, expected escalations)
- [ ] Score coverage, citation accuracy, hallucination rate, escalation precision/recall
- [ ] LLM-as-judge — **calibrate it against your own hand labels** and report where it
      disagrees with you
- [ ] Report 95% aggregate accuracy → then break it down by field and study type → find
      the segment where it collapses. **The aggregate lied.**
- [ ] Message Batches API for nightly re-extraction (`custom_id`, resubmit failures only).
      Confirm multi-turn tool calling is unsupported.
- [ ] Self-review vs independent-instance review: compare findings
- [ ] **GATE:** review → exam → tag

**Covers:** D4.5, D4.6, D5.5 · **Senior:** S7, S8, S9

---

## Phase 7 — CI, observability, cost, streaming  (tag: phase-7)
- [ ] **Un-park `claude-review.yml`.** Change the trigger back to `pull_request`.
      **Naive first:** run `claude` without `-p` → watch it hang. Then
      `-p --output-format json --json-schema`.
- [ ] Re-run with prior findings: "report only new issues"
- [ ] Tracing: per-run spans (agent, tool, tokens, cost, latency). p50/p95.
- [ ] Prompt caching on the stable prefix — measure the saving
- [ ] Model routing (Haiku extract / Sonnet synthesise) — publish the quality-cost table
- [ ] Stream the brief to a Next.js viewer
- [ ] **GATE:** review → exam → tag

**Covers:** D3.6 · **Senior:** S13–S18

---

## Phase 8 — Claude Code hardening, sessions, ADRs  (tag: phase-8)
- [ ] **Naive first:** put standards in `~/.claude/CLAUDE.md` → clone fresh → they VANISH
      (user-level is not version-controlled). Move to project level. Verify with `/memory`.
- [ ] Skill without `context: fork` → context pollution → add fork + `allowed-tools`
- [ ] Subdirectory CLAUDE.md cannot span `src/**` and `evals/**` → `.claude/rules/` globs
- [ ] Grep vs Glob vs Read/Write; force an `Edit` failure on a non-unique anchor →
      Read+Write fallback
- [ ] Resume a stale session → wrong citations → fresh session + structured summary.
      `/fork` to compare two synthesis strategies.
- [ ] Long exploration → agent cites "typical patterns" → scratchpad + `/compact` +
      state manifests + crash recovery
- [ ] `docs/adr/` — 3+ ADRs (chunking choice, topology, model routing)
- [ ] **Senior:** port the eval harness to Python
- [ ] **FINAL GATE:** `/mock-exam` → READY (≥720 scaled, no domain below 70%)

**Covers:** D2.5, D3.1–D3.4, D5.4 · **Senior:** S19, S20

---

## Before you book the real exam

`exams/BLUEPRINT.md` Part A: every row `Tested ≥ 2` and `Best ≥ 4`.
`/mock-exam` verdict: READY.
Then, and only then, register.
