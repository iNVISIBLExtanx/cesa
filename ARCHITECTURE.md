# CESA Architecture

## Goal
Given a clinical question, produce a concise, fully-cited evidence summary from
PubMed abstracts — reliable, measurable, and provenance-preserving.

## Topology: hub-and-spoke (coordinator + subagents)
User question
   │
   ▼
Coordinator agent  ── decomposes question, decides which subagents to call
   ├──► Search subagent   → MCP: pubmed.esearch / pubmed.efetch  (PMIDs + abstracts)
   ├──► Analyze subagent  → extracts claims, study type, sample size per abstract
   ├──► Synthesize subagent → merges claims, resolves agreement/conflict
   └──► Report subagent   → renders cited Markdown summary
   │
   ▼
Guardrails + eval gate (faithfulness, citation coverage) → UI (Next.js)

## Key decisions (see docs/adr/ for full ADRs)
- Coordinator routes ALL inter-agent communication (observability, consistent errors).
- Subagents have scoped tools only (search agent cannot synthesize, etc.) to keep
  tool-selection reliable.
- Context passed explicitly: search results + document metadata (PMID, title, journal,
  year) are injected into the synthesis prompt as structured data, separating content
  from provenance.
- Retrieval: hybrid (pgvector dense + keyword) → rerank → top-k into the LLM.
- Structured output enforced with tool_use + JSON Schema + Zod validation + retry loop.
- Deterministic enforcement (PreToolUse hook / prerequisite gate) blocks the report
  step until a citation-coverage check passes — prompt instructions alone are
  probabilistic.

## Data flow provenance
Every chunk carries {pmid, title, journal, year, section}. Provenance survives every
hop so the final summary can render [PMID:12345678] links.