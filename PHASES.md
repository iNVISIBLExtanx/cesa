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
- [x] Smoke test passes — `pnpm tsx scripts/smoke-test.ts` prints `stop_reason: end_turn`

### Covers: NOTHING. And that is deliberate.

This phase was **scaffolded, not learned.** The `.claude/` config here was generated, not
reasoned out. You cannot defend a decision you did not make — and the exam tests exactly
that reasoning: *why* a glob-scoped rule instead of a subdirectory CLAUDE.md, *why*
`context: fork` on that skill, *why* project scope rather than user scope. Reciting
someone else's answer is not knowing it.

**Domain 3 is earned in Phase 8**, failure-first, by breaking every piece of this config
and rebuilding it. Until then, treat every file under `.claude/` as someone else's
homework that happens to be sitting in your repo.

The one thing genuinely learned in Phase 0 came from the CI bot breaking: `-p` for
non-interactive mode, why an advisory step must never gate a merge, and why an `.mcp.json`
pointing at a nonexistent binary fails on every session. That was accidental failure-first
learning. It counts — log it.

**Baseline diagnostic (do this):** run `/phase-exam 0`. Expect to score badly. That score
is your first honest number, and it is the proof that generated config is not learned
config.

---

## Phase 1 — The agentic loop  (tag: phase-1)
Hand-write the loop. Highest-weight domain, and the first phase where you actually learn.

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
- [ ] `.mcp.json` with `${PUBMED_API_KEY:-}` expansion — **write it yourself.** Read
      docs/mcp-servers.md once, close it, then do it from memory.
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

## Phase 8 — Claude Code MASTERY, sessions, ADRs  (tag: phase-8)

**This is where you actually earn Domain 3 (20% of the exam).** Phase 0 handed you a
working `.claude/` config for free. Here you break every piece of it, watch it fail, and
rebuild it from your own reasoning. Nothing below is a re-read — every line is a
deliberate breakage.

- [ ] **Naive first:** move the project standards into `~/.claude/CLAUDE.md` → clone the
      repo into a fresh folder → watch the standards VANISH (user-level is not
      version-controlled). Move them back. Verify with `/memory`. **[D3.1]**
- [ ] **Naive first:** strip `context: fork` from a skill → watch verbose output flood the
      main conversation. Restore it. Then add `allowed-tools` and probe whether it is
      actually enforced. **[D3.2]**
- [ ] **Naive first:** try to enforce test conventions with a subdirectory CLAUDE.md when
      test files live under BOTH `src/**` and `evals/**` → watch it fail to span them.
      Rebuild as a `.claude/rules/` glob. **[D3.3]**
- [ ] **Naive first:** move a team slash command to `~/.claude/commands/` → confirm a
      collaborator cannot see it. **[D3.2]**
- [ ] Rewrite `.mcp.json` from scratch, from memory: project vs user scope, `${VAR:-}`
      expansion, and why a secret never lands in the file. **[D2.4]**
- [ ] Grep vs Glob vs Read/Write; force an `Edit` failure on a non-unique anchor →
      Read+Write fallback. **[D2.5]**
- [ ] Resume a stale session → wrong citations → fresh session + structured summary.
      `/fork` to compare two synthesis strategies. **[D1.7]**
- [ ] Long exploration → agent cites "typical patterns" instead of your real classes →
      scratchpad + `/compact` + state manifests + crash recovery. **[D5.4]**
- [ ] `docs/adr/` — 3+ ADRs (chunking choice, topology, model routing). **[S20]**
- [ ] **Senior:** port the eval harness to Python. **[S19]**
- [ ] **FINAL GATE:** `/mock-exam` → READY (≥720 scaled, no domain below 70%)

**Covers:** D3.1, D3.2, D3.3, D3.4, D2.4, D2.5, D1.7, D5.4 · **Senior:** S19, S20

---

## Before you book the real exam

`exams/BLUEPRINT.md` Part A: every row `Tested ≥ 2` and `Best ≥ 4`.
`/mock-exam` verdict: READY.
Then, and only then, register.
