# CESA — Clinical Evidence Synthesis Agent

Multi-agent system that searches PubMed, analyzes abstracts, and synthesizes
cited evidence summaries. Learning lab for the Anthropic CCAR-F blueprint AND a
portfolio piece for Senior/Lead Gen AI roles. TypeScript throughout.

## Golden rules
- This tool synthesizes PUBLISHED LITERATURE ONLY. It does not diagnose, does not
  give treatment advice, and always attaches provenance (PMID + title) to claims.
- Every generated claim MUST cite the PMID it came from. No citation → no claim.
- Never invent study results. If retrieval returns nothing, say so.

## Tech stack
- Runtime: Node 20+, TypeScript (strict), pnpm
- LLM: @anthropic-ai/sdk, @anthropic-ai/claude-agent-sdk
- MCP: @modelcontextprotocol/sdk (custom PubMed server in servers/pubmed)
- Data: Supabase + pgvector; embeddings via Voyage/OpenAI (see .env.example)
- Web: Next.js (App Router) in app/
- Evals: RAGAS-style metrics + LLM-as-judge in evals/

## Commands (run these, do not guess)
- Install: `pnpm install`
- Dev web: `pnpm dev`
- Test: `pnpm test` (Vitest)
- Lint/format: `pnpm lint` / `pnpm format` (ESLint + Prettier)
- Typecheck: `pnpm typecheck`
- Eval suite: `pnpm eval`

## Project layout
- `src/agents/` coordinator + subagents (search, analyze, synthesize, report)
- `src/tools/` tool definitions with JSON schemas + structured errors
- `servers/pubmed/` custom MCP server (ESearch/EFetch wrappers)
- `experiments/` deliberately naive versions — DO NOT "fix" without a LEARNING_LOG entry
- `evals/` datasets, metrics, LLM-judge prompts
- `app/` Next.js UI

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