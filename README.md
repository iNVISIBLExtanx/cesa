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
justify the code** — because that is what the CCAR-F exam and senior interviews actually
test.

The exam almost never asks *"how do you write a hook."* It asks *"what is the most
effective **first step**"* and hands you four plausible options. You reject the wrong
ones instantly only once you have personally watched them fail. So every concept here is
built **failure-first**:

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

**Phase 0 is the cautionary tale.** Its `.claude/` config was scaffolded, not reasoned
out — so it teaches **nothing**, and `PHASES.md` says so explicitly. You cannot defend a
decision you did not make, and the exam tests exactly that reasoning. Domain 3 is *earned*
in Phase 8, by breaking every piece of that config and rebuilding it. Treat generated code
as someone else's homework that happens to be sitting in your repo.

---

## Fork this and use it as your own exam prep

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
#    - PHASES.md          -> untick Phases 1-8, set status to "PHASE 0 — complete"
#    - LEARNING_LOG.md    -> delete my entries, keep the template
#    - exams/SCORES.md    -> delete my entries, keep the template
#    - exams/BLUEPRINT.md -> reset every Tested to 0 and every Best to —

# 5. Open in VS Code with the Claude Code extension, run `claude`, then:
#    "Read PHASES.md. Tell me the current status and the next unchecked task."
```

Then read **[docs/HOW_TO_WORK.md](docs/HOW_TO_WORK.md)** once. It is the operating manual
and it answers "I opened VS Code, now what?"

**Optional first move:** run `/phase-exam 0` before you write a line. It examines you on
the config you were *handed*. Expect to score badly. That is the point, and it is your
first honest number.

---

## The learning loop

```
   you write the code
          │
          ▼
  /phase-review N   ── independent reviewer, fresh context.
          │             Demands a real measured number. PASS or REWORK.
          ▼
  /phase-exam N     ── 10 scenario questions, one at a time.
          │             7 CCAR-F + 3 senior AI engineering.
          │             Explains why every WRONG option is wrong.
          ▼             ADVANCE at 8/10.
  tick PHASES.md · git tag phase-N
          │
          ▼
    ... phase 8 ...
          │
          ▼
   /mock-exam       ── 60 questions · 4 of 6 scenarios · 120 min
                       scored against the real 720/1000 bar,
                       plus a separate 15-question senior section.
```

**No spoilers.** `exams/BLUEPRINT.md` tracks *coverage* — all 30 CCAR-F task statements
and 20 senior topics, with `Tested` and `Best` columns — but contains **no questions**.
Questions are generated fresh each run from the blueprint plus the code you actually
wrote, and the trackers deliberately over-sample your weakest rows.

**The bar:** do not sit the real exam until every Part A row shows `Tested ≥ 2` and
`Best ≥ 4`. Do not walk into a senior AI interview until Part B does too.

---

## What gets built, and what it teaches

| Phase | Build | Earns |
|---|---|---|
| 0 | Repo, tooling, Claude Code config, CI | **Nothing — this was scaffolded, not learned.** See PHASES.md. |
| 1 | The agentic loop, by hand | D1.1 — `stop_reason`, termination anti-patterns |
| 2 | Custom PubMed MCP server + tools | D2.1–D2.4 — descriptions, structured errors, `tool_choice`, `.mcp.json` |
| 3 | Intake, escalation, RAG over abstracts | D5.2, D4.1 · S1–S6, S12 (chunking, hybrid search, reranking) |
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
.claude/       CLAUDE.md hierarchy, rules/, skills/, commands/  ← earned in Phase 8
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

## Commands

```bash
pnpm test          # Vitest
pnpm typecheck     # tsc --noEmit
pnpm lint          # ESLint
pnpm format        # Prettier
```

## Data source

PubMed via [NCBI E-utilities](https://www.ncbi.nlm.nih.gov/books/NBK25501/) — open,
free, no patient data. Rate limits: 3 req/sec without a key, 10 req/sec with one.
See [DISCLAIMER.md](DISCLAIMER.md) for NCBI attribution terms.

## License

MIT — see [LICENSE](LICENSE). Not affiliated with or endorsed by Anthropic, NLM, or NIH.
