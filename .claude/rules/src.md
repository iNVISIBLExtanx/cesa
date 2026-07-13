---
paths:
  - "src/**"
---
# Core implementation conventions (src/)

## Learning-mode guard — this is the point of the repo
Code in `src/` is CORE CONCEPT code the human must hand-write to learn:
the agentic loop, hooks, MCP tool definitions, JSON/Zod schemas, retry loops,
chunking + retrieval, eval scoring, escalation criteria.

When asked to implement one of these:
1. Ask what approach they intend and why.
2. Let them write it.
3. Review, question, and critique what they wrote — point at the tradeoff they missed.
Do NOT hand over a finished implementation unless they explicitly say they have
already understood it and want it typed out.

Scaffolding (types, barrel files, fixtures, config) may be written freely.

## Conventions
- Named exports only. Files < 300 lines.
- Zod schema for every tool input/output and every structured LLM output.
- Every claim-bearing object carries provenance: { pmid, title, journal, year }.
- Loop control branches on `stop_reason`. Never parse assistant text to decide
  termination; never use an iteration cap as the primary stop (it is a safety net only).
