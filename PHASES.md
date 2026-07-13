# CESA Phase Tracker

> Claude: read this FIRST. The "Current status" line tells you where we are.
> After completing a task, tick it, append a LEARNING_LOG.md entry, and update
> the Current status line. Tag each phase completion in git: `git tag phase-N`.

## Current status: PHASE 0 — complete, ready to start PHASE 1

## Phase 0 — Repo & tooling  (tag: phase-0)
- [x] Public repo created, MIT LICENSE, README, medical disclaimer
- [x] pnpm + TS strict + ESLint + Prettier + Vitest
- [x] .gitignore, .env.example, secret scanning + push protection enabled
- [x] Claude Code files: CLAUDE.md, .claude/rules/, one skill, one command, .mcp.json
- [x] CI: claude-review.yml (claude -p) + lint/typecheck workflow
Covers: CCAR-F D3

## Phase 1 — Claude API + agentic loop  (tag: phase-1)
- [ ] Minimal agentic loop: send → inspect stop_reason → run tool → append result → repeat
- [ ] experiments/01-naive-loop: wrong version that stops on assistant text / iteration cap
- [ ] Correct loop terminates on end_turn; documented in LEARNING_LOG
Covers: CCAR-F D1.1

## Phase 2 — Tools + custom PubMed MCP server  (tag: phase-2)
- [ ] servers/pubmed MCP server (esearch, efetch) over stdio
- [ ] Tool descriptions with inputs/edge cases; two similar tools disambiguated
- [ ] Structured error responses (errorCategory, isRetryable, isError)
- [ ] tool_choice experiments (auto / any / forced)
- [ ] .mcp.json wires the server with ${PUBMED_API_KEY}
Covers: CCAR-F D2

## Phase 3 — RAG over abstracts  (tag: phase-3)
- [ ] Supabase/pgvector ingestion; chunk + embed abstracts with provenance metadata
- [ ] experiments/02-fixed-chunking (naive 500-char) vs recursive vs semantic
- [ ] Hybrid retrieval (dense + keyword) + reranker
- [ ] RAGAS-style eval: faithfulness, answer relevancy, context precision/recall
Covers: interview RAG depth; CCAR-F D5 provenance

## Phase 4 — Multi-agent orchestration  (tag: phase-4)
- [ ] Coordinator + 4 subagents (search/analyze/synthesize/report)
- [ ] Explicit context passing; scoped tools per subagent
- [ ] Parallel subagent spawning; iterative refinement loop for coverage gaps
- [ ] Structured handoff on escalation (ambiguous question → ask user)
Covers: CCAR-F D1.2–1.6

## Phase 5 — Structured output + validation  (tag: phase-5)
- [ ] JSON-Schema tool_use for the evidence-summary object
- [ ] Zod validation + retry loop on schema failure
- [ ] Few-shot examples for the extraction format
- [ ] Batch processing path for large PMID sets
Covers: CCAR-F D4

## Phase 6 — Hooks, enforcement, sessions  (tag: phase-6)
- [ ] PostToolUse hook normalizes PubMed date formats
- [ ] PreToolUse gate blocks report step until citation-coverage check passes
- [ ] Session resume/fork demo documented
Covers: CCAR-F D1.5, D1.7

## Phase 7 — Guardrails, security, evals, observability  (tag: phase-7)
- [ ] Prompt-injection tests on retrieved abstracts (OWASP LLM01); indirect-injection eval
- [ ] Output guardrail: no-citation → block; medical-advice refusal check
- [ ] LLM-as-judge eval (validated against a small hand-labeled set)
- [ ] Tracing (Langfuse) on every agent/tool/retrieval step; cost + latency dashboard
- [ ] Prompt caching + model routing (Haiku for search/extract, Sonnet/Opus for synth)
Covers: interview production topics; CCAR-F D5 reliability

## Phase 8 — Lead-level artifacts  (tag: phase-8)
- [ ] docs/adr/ with 3+ ADRs (chunking choice, topology, model routing)
- [ ] Architecture diagram + demo GIF in README
- [ ] "Naive → measured failure → fix → tradeoff" writeups linked from README
Covers: Lead interview signals