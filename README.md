# CESA — Clinical Evidence Synthesis Agent

> A multi-agent system that searches PubMed, analyzes abstracts, and synthesizes
> **fully-cited** evidence briefs — built in public, phase by phase, as a hands-on
> curriculum for the **Anthropic Claude Certified Architect – Foundations (CCAR-F)**
> exam and for **Senior/Lead Gen AI Engineer** interviews.

**⚠️ Not medical advice.** CESA summarizes published literature only. It does not
diagnose and does not recommend treatment. See [DISCLAIMER.md](DISCLAIMER.md).

---

## This repo is a curriculum, not just a project

Most portfolio projects show you working code. This one shows you **the failures that
justify the code** — because that is what the exam and senior interviews actually test.

The exam almost never asks *"how do you write a hook."* It asks *"what is the most
effective **first step**"* and hands you four plausible options. You reject the wrong ones
instantly only once you have personally watched them fail. So every concept here is built
**failure-first**:

1. Build it **wrong**, on purpose, in `experiments/`
2. Run it and **measure the failure** — write down a real number
3. Build it **right**, in `src/`
4. **Measure again**
5. Log the before/after, and the tradeoff you would now defend

`main` is the working system. `experiments/` is the evidence.

### The rule that makes it work

**You write the concept. Claude explains and critiques. Claude never writes the concept
for you.**

The agentic loop, hooks, MCP tools, schemas, retry loops, retrieval, eval scoring — you
type those, or you did not learn them. Config, boilerplate, fixtures and UI can be
delegated freely.

**Phase 0 is the cautionary tale.** Its `.claude/` config was scaffolded, not reasoned out
— so it teaches **nothing**, and `PHASES.md` says so in plain text. You cannot defend a
decision you did not make. Domain 3 is *earned* in Phase 8, by breaking that config and
rebuilding it from your own reasoning.

---

## How it works: four tools, one job each

The repo ships four Claude Code skills. Each does exactly one thing, and **none of them
writes your concept code.**

| Command | Role | Writes your code? |
|---|---|---|
| `/phase-teach N` | **Teacher.** Explains the concepts before you build. Socratic — it asks you to predict, lets you be wrong, then explains. Draws control flow, shows API response shapes, writes pseudocode **with the key decision left as a hole for you to fill.** Names the exam's distractor patterns as it goes. Ends with READY TO BUILD or NOT YET. | **No.** Forbidden, even on direct request. |
| *(you, in your editor)* | **Builder.** The naive version, the measurement, the correct version. | You type it. |
| `/phase-review N` | **Reviewer.** A fresh instance with no memory of writing the code — which is itself the D4.6 lesson. Runs your tests, checks each task statement as DEMONSTRATED / PARTIAL / MISSING, hunts the exam's anti-patterns. **Demands a real measured number** in your experiment README. Returns PASS or REWORK. | No. It critiques. |
| `/phase-exam N` | **Examiner.** 10 scenario questions, one at a time — 7 CCAR-F + 3 senior AI engineering. Explains why the right answer is right **and why each wrong option is wrong.** Returns ADVANCE (8/10) or REVIEW, then updates your trackers. | No. It tests judgment. |

Plus `/mock-exam` at Phase 8: 60 questions, 4 of 6 scenarios, 120 minutes, scored against
the real 720/1000 bar, with a separate 15-question senior section.

One more skill, but not part of this loop: `/evidence-review` audits CESA's *own generated
output* (the cited evidence briefs it produces from Phase 3+) for citation coverage,
grounding, and safety language. It checks the product you're building, not your learning
progress — run it ad hoc once there's real output to check, starting around Phase 5.

### The loop, every phase, without exception

```
/phase-teach N     → understand it. Write no code today.
      │
      ▼
  YOU build the NAIVE version in experiments/
  YOU run it. YOU count the failures. YOU write the number down.
  YOU build the CORRECT version in src/. Measure again.
      │
      ▼
/phase-review N    → PASS or REWORK
      │
      ▼
/phase-exam N      → ADVANCE (8/10) or REVIEW
      │
      ▼
tick PHASES.md · git tag phase-N · next phase
```

**A REWORK or REVIEW verdict means you do not start the next phase.** That gate is the
entire mechanism. Skipping it turns this back into an ordinary coding project.

If `/phase-teach` refuses to write your loop at 11pm when Claude could do it in four
seconds — **that refusal is the product working.**

---

## How this maps to the actual exam — and what it does not claim

**What it does.** Every phase is mapped to the **published CCAR-F exam guide**: its five
domains, their weights, and all 30 task statements. `exams/BLUEPRINT.md` tracks every
single one, plus 20 Senior/Lead Gen AI interview topics that the exam explicitly puts
*out* of scope (RAG, embeddings, evals, streaming, cost/latency) but that interviewers
very much ask about.

Questions are written to the exam's real shape: scenario-anchored, four options, testing
**judgment over recall**, and deliberately seeded with the distractor patterns that recur
throughout the official sample questions — *"strengthen the system prompt"*, *"add
confidence-score routing"*, *"train a classifier"*, *"escalate on sentiment"*, *"switch to
a larger context window"*, *"return a generic error and retry"*. Learning to reject those
on sight is most of the exam.

**What it does not.** These are **not real exam questions**, and nobody outside Anthropic
has them. They are generated fresh by Claude from the published blueprint and from the
code you actually wrote. Treat them as high-fidelity practice, not as a leak, and not as a
guarantee. The blueprint may be revised; check the current official exam guide before you
register.

**The honest bar:** if you can explain every row in `exams/BLUEPRINT.md` without notes,
and you have a measured before/after number for every experiment in this repo, you are
prepared — for the exam and for the interview. That is the claim. Nothing more.

---

## Fork this and use it as your own prep

You do **not** need permission — fork it and go.

```bash
# 1. Fork on GitHub, then:
git clone https://github.com/<you>/cesa.git && cd cesa
pnpm install

# 2. Add your key
cp .env.example .env        # then fill in ANTHROPIC_API_KEY

# 3. Verify the plumbing before anything else
pnpm tsx scripts/smoke-test.ts   # must print stop_reason: end_turn

# 4. Reset the trackers so the record is YOURS, not mine
#    - PHASES.md          -> untick Phases 1-8, status = "PHASE 0 — complete"
#    - LEARNING_LOG.md    -> delete my entries, keep the template
#    - exams/SCORES.md    -> delete my entries, keep the template
#    - exams/BLUEPRINT.md -> reset every Tested to 0 and every Best to —

# 5. Open in VS Code with the Claude Code extension, run `claude`:
#    "Read PHASES.md. Tell me the current status and the next unchecked task."
```

**Optional first move, and a revealing one:** run `/phase-exam 0` before you write a line.
It examines you on the config you were *handed*. Expect to score badly. That bad score is
your first honest number, and it is the whole thesis of this repo in one data point.

Then read **[docs/HOW_TO_WORK.md](docs/HOW_TO_WORK.md)** — the operating manual — and run
`/phase-teach 1`.

---

## What gets built, and what it earns

| Phase | Build | Earns |
|---|---|---|
| 0 | Repo, tooling, Claude Code config, CI | **Nothing — this was scaffolded, not learned.** |
| 1 | The agentic loop, by hand | D1.1 — `stop_reason`, termination anti-patterns |
| 2 | Custom PubMed MCP server + tools | D2.1–D2.4 — descriptions, structured errors, `tool_choice`, `.mcp.json` |
| 3 | Intake, escalation, RAG over abstracts | D5.2, D4.1 · S1–S6, S12 |
| 4 | Coordinator + subagents | D1.2, D1.3, D1.6, D2.3, D5.3, D3.4 |
| 5 | Structured output, provenance, hooks, prompt injection | D4.2–D4.4, D1.4, D1.5, D5.1, D5.6 · S10, S11 |
| 6 | Evals, LLM-as-judge, confidence calibration, batch | D4.5, D4.6, D5.5 · S7–S9 |
| 7 | CI/CD, observability, cost & latency, streaming | D3.6 · S13–S18 |
| 8 | **Break and rebuild the Phase 0 config**, sessions, ADRs, Python port | D3.1–D3.4, D2.4, D2.5, D1.7, D5.4 · S19, S20 |

Full detail: **[PHASES.md](PHASES.md)** · Architecture: **[ARCHITECTURE.md](ARCHITECTURE.md)**
· Coverage: **[exams/BLUEPRINT.md](exams/BLUEPRINT.md)**

---

## Architecture (target state)

```
  clinical question
        │
        ▼
  INTAKE ──── out of scope / ambiguous / no evidence → escalate (structured handoff)
        │
        ▼
  COORDINATOR  (allowedTools: ["Task"])  — decompose · delegate · check coverage
        ├──► SEARCH     subagent → PubMed MCP + hybrid retrieval
        ├──► ANALYSIS   subagent → JSON-schema extraction (nullable fields)
        └──► SYNTHESIS  subagent → merge, flag conflicts, keep provenance
        │
        ▼
  HOOKS: PostToolUse (normalize dates) · PreToolUse (BLOCK any claim without a PMID)
        │
        ▼
  cited evidence brief  →  eval gate  →  viewer
```

Every claim carries `{pmid, title, journal, year}`. Provenance survives every hop, or the
claim does not ship.

---

## Repo layout

```
src/           shipped, correct implementations   ← you hand-write these
experiments/   deliberately naive versions + measured failures  ← the evidence
exams/         BLUEPRINT.md (coverage) · SCORES.md (your record)
.claude/       skills, rules, commands — the teach/review/exam system
docs/          HOW_TO_WORK.md · mcp-servers.md · adr/
servers/       custom MCP servers (Phase 2)
evals/         golden set, metrics, LLM judge (Phase 6)
scripts/       smoke test and other plumbing
```

`experiments/` is excluded from the build, lint, and test config on purpose — it holds
broken code by design, and `main` stays green.

---

## Stack

TypeScript (strict) · Node 20+ · pnpm · `@anthropic-ai/sdk` · `@anthropic-ai/claude-agent-sdk`
· `@modelcontextprotocol/sdk` · Supabase + pgvector · Vitest · Next.js (Phase 7)

```bash
pnpm test          # Vitest
pnpm typecheck     # tsc --noEmit
pnpm lint          # ESLint
pnpm format        # Prettier
```

## Data source

PubMed via [NCBI E-utilities](https://www.ncbi.nlm.nih.gov/books/NBK25501/) — open, free,
no patient data. Rate limits: 3 req/sec without a key, 10 req/sec with one. See
[DISCLAIMER.md](DISCLAIMER.md) for NCBI attribution terms.

## License

MIT — see [LICENSE](LICENSE). Not affiliated with, endorsed by, or connected to Anthropic,
NLM, or NIH. "Claude" is a trademark of Anthropic.
