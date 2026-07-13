# CESA — Clinical Evidence Synthesis Agent

Multi-agent system that searches PubMed, analyzes abstracts, and synthesizes
cited evidence summaries. Learning lab for the Anthropic CCAR-F blueprint AND a
portfolio piece for Senior/Lead Gen AI roles. TypeScript throughout.

## Golden rules
- This tool synthesizes PUBLISHED LITERATURE ONLY. It does not diagnose, does not
  give treatment advice, and always attaches provenance (PMID + title) to claims.
- Every generated claim MUST cite the PMID it came from. No citation → no claim.
- Never invent study results. If retrieval returns nothing, say so.

## LEARNING MODE — read this before writing any code
This repo exists so the human LEARNS, not so code gets produced fast.
- The human hand-writes all CORE concept code: the agentic loop, hooks, MCP server,
  tool schemas, retry loops, retrieval logic, eval scoring, escalation criteria.
- Claude may write SCAFFOLDING: config, boilerplate, types, fixtures, UI, CI YAML.
- If asked to implement a core concept, DO NOT just write it. First ask what approach
  they intend, then review what they wrote. Explain, question, critique — do not
  hand over the answer.
- Every phase follows FAILURE-FIRST: build the naive version in `experiments/`,
  measure how it fails (with real numbers), THEN build the correct version in `src/`.

## Tech stack
- Runtime: Node 20+, TypeScript (strict), pnpm
- LLM: @anthropic-ai/sdk, @anthropic-ai/claude-agent-sdk (added Phase 1)
- MCP: @modelcontextprotocol/sdk — custom PubMed server (added Phase 2)
- Data: Supabase + pgvector; embeddings via Voyage/OpenAI (added Phase 3)
- Web: Next.js (App Router) in app/ (added Phase 7)
- Evals: RAGAS-style metrics + LLM-as-judge in evals/ (added Phase 3+)

## Commands (run these, do not guess)
- Install: `pnpm install`
- Test: `pnpm test` (Vitest)
- Lint: `pnpm lint` · Format: `pnpm format` · Format check: `pnpm format:check`
- Typecheck: `pnpm typecheck`
- NOT YET AVAILABLE — do not run: `pnpm dev` (Phase 7), `pnpm eval` (Phase 3)

## Project layout
Only `src/` and `experiments/` exist today. Directories below are created in the phase
that needs them — do not assume they exist.
- `src/` shipped, correct implementations
- `experiments/` deliberately naive versions — DO NOT "fix" in place
- `servers/pubmed/` custom MCP server (Phase 2)
- `evals/` datasets, metrics, LLM-judge prompts (Phase 3+)
- `docs/adr/` architecture decision records (Phase 8)

## Conventions
- Named exports only. Files < 300 lines; split if larger.
- Zod schemas for every tool input/output and every LLM structured output.
- Agentic loop terminates on `stop_reason === "end_turn"`, continues on "tool_use".
  NEVER parse natural-language for loop termination or use a hard iteration cap as
  the primary stop.
- Subagents get context via explicit prompt injection — they do NOT inherit history.

## Where to look first
- Current phase + next task: @PHASES.md
- Architecture + data flow: @ARCHITECTURE.md
- What we tried and learned: @LEARNING_LOG.md

## Safety / repo hygiene
- Secrets ONLY via env vars. Never write a real key to any file. See .env.example.
- experiments/ may contain broken code on purpose. main must stay green.
