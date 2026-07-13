# Exam Blueprint & Coverage Tracker

This file guarantees COVERAGE. It does not contain questions — questions are generated
fresh at exam time from this blueprint plus the code you actually wrote, so there is
nothing to memorise and no answers to peek at.

**How it works**
- `/phase-exam N` reads this file, picks task statements whose phase has been completed
  and whose coverage is weakest, generates 10 fresh scenario questions, then updates the
  `Tested` and `Best` columns below and appends to `exams/SCORES.md`.
- By Phase 8 every row must show `Tested ≥ 2` and `Best ≥ 4/5`. Any row that does not is
  a hole in your preparation, and `/mock-exam` will target it.

**Legend** — `Tested`: how many times examined. `Best`: best score on that statement
(scale 1–5, where 4+ = solid). `—` = never tested.

---

## Part A — CCAR-F blueprint (all 30 task statements)

### Domain 1 — Agentic Architecture & Orchestration (27%, ~16 questions)
| ID | Task statement | Phase | Tested | Best |
|---|---|---|---|---|
| D1.1 | Agentic loop design; stop_reason; termination anti-patterns | 1 | 0 | — |
| D1.2 | Coordinator–subagent (hub-and-spoke); decomposition coverage | 4 | 0 | — |
| D1.3 | Subagent invocation (Task tool); explicit context passing; parallel spawning | 4 | 0 | — |
| D1.4 | Multi-step workflows; programmatic enforcement vs prompt guidance; structured handoff | 6 | 0 | — |
| D1.5 | Agent SDK hooks (PostToolUse, tool-call interception) | 6 | 0 | — |
| D1.6 | Task decomposition strategies (fixed chaining vs dynamic adaptive) | 4 | 0 | — |
| D1.7 | Session state, resumption, forking | 6 | 0 | — |

### Domain 2 — Tool Design & MCP Integration (18%, ~11 questions)
| ID | Task statement | Phase | Tested | Best |
|---|---|---|---|---|
| D2.1 | Effective tool descriptions; disambiguating similar tools | 2 | 0 | — |
| D2.2 | Structured error responses; isError; access failure vs valid empty result | 2 | 0 | — |
| D2.3 | Tool distribution (least privilege); tool_choice auto/any/forced | 2, 4 | 0 | — |
| D2.4 | MCP server configuration; project vs user scope; ${ENV_VAR} expansion | 2 | 0 | — |
| D2.5 | Built-in tools: Grep vs Glob vs Read/Write vs Edit; Edit fallback | 8 | 0 | — |

### Domain 3 — Claude Code Configuration & Workflows (20%, ~12 questions)
| ID | Task statement | Phase | Tested | Best |
|---|---|---|---|---|
| D3.1 | CLAUDE.md hierarchy; @import; /memory | 0, 8 | 0 | — |
| D3.2 | Custom slash commands & skills; context: fork; allowed-tools | 0, 8 | 0 | — |
| D3.3 | Path-specific rules; YAML paths globs vs subdirectory CLAUDE.md | 0, 8 | 0 | — |
| D3.4 | Plan mode vs direct execution; Explore subagent | 4, 8 | 0 | — |
| D3.5 | Iterative refinement; examples over prose; test-driven; interview pattern | 5 | 0 | — |
| D3.6 | CI/CD; -p / --print; --output-format json; independent review instances | 7 | 0 | — |

### Domain 4 — Prompt Engineering & Structured Output (20%, ~12 questions)
| ID | Task statement | Phase | Tested | Best |
|---|---|---|---|---|
| D4.1 | Explicit categorical criteria over vague instructions | 3, 5 | 0 | — |
| D4.2 | Few-shot prompting; 2–4 targeted examples; generalisation | 5 | 0 | — |
| D4.3 | Structured output via tool_use + JSON Schema; syntax vs semantic validity | 5 | 0 | — |
| D4.4 | Validation & retry loops; why retries fail on absent information | 5 | 0 | — |
| D4.5 | Batch processing; Message Batches API; custom_id; blocking vs latency-tolerant | 6 | 0 | — |
| D4.6 | Multi-instance & multi-pass review; self-review limitation; attention dilution | 6, 7 | 0 | — |

### Domain 5 — Context Management & Reliability (15%, ~9 questions — but appears in 4 of 6 scenarios)
| ID | Task statement | Phase | Tested | Best |
|---|---|---|---|---|
| D5.1 | Context preservation; progressive summarisation risk; lost-in-the-middle; case-facts block | 5 | 0 | — |
| D5.2 | Escalation & ambiguity resolution; explicit criteria over sentiment/confidence | 3 | 0 | — |
| D5.3 | Error propagation in multi-agent systems; structured error context; partial results | 4 | 0 | — |
| D5.4 | Large-codebase context management; scratchpads; /compact; crash recovery manifests | 8 | 0 | — |
| D5.5 | Human review & confidence calibration; aggregate metrics masking segments | 6 | 0 | — |
| D5.6 | Information provenance; claim-source mappings; conflicting sources; temporal data | 5 | 0 | — |

---

## Part B — Senior/Lead Gen AI Engineer topics (NOT on the exam, ON the interview)

These are explicitly OUT of scope for CCAR-F and firmly IN scope for the Gapstars
Senior/Lead Gen AI Developer role. `/phase-exam` mixes these in; `/mock-exam` keeps them
in a clearly-labelled separate section so the exam simulation stays faithful.

| ID | Topic | Phase | Tested | Best |
|---|---|---|---|---|
| S1 | RAG end-to-end pipeline; where it actually breaks (retrieval, not generation) | 3 | 0 | — |
| S2 | Chunking strategy tradeoffs (fixed / recursive / semantic / hierarchical) | 3 | 0 | — |
| S3 | Embedding model selection; dimensionality; domain fit | 3 | 0 | — |
| S4 | Hybrid search (dense + BM25); reciprocal rank fusion | 3 | 0 | — |
| S5 | Reranking (cross-encoder); when it earns its latency | 3 | 0 | — |
| S6 | Retrieval evaluation: recall@k, precision@k, MRR, NDCG | 3 | 0 | — |
| S7 | RAG evaluation: faithfulness, answer relevancy, context precision/recall (RAGAS) | 6 | 0 | — |
| S8 | Eval harness design; golden sets; regression testing for non-deterministic systems | 6 | 0 | — |
| S9 | LLM-as-judge; calibrating a judge against human labels; when judges fail | 6 | 0 | — |
| S10 | Hallucination mitigation as a pipeline: ground → constrain → verify → validate → gate | 5, 7 | 0 | — |
| S11 | Prompt injection: direct and INDIRECT (poisoned retrieved documents). OWASP LLM01 | 5 | 0 | — |
| S12 | Guardrails enforced outside the model; input and output filtering | 3, 7 | 0 | — |
| S13 | OWASP LLM Top 10 beyond injection: vector/embedding weaknesses, unbounded consumption | 7 | 0 | — |
| S14 | Cost engineering: token accounting, prompt caching, batching | 7 | 0 | — |
| S15 | Model routing / tiering (Haiku vs Sonnet vs Opus); quality-cost tradeoff | 7 | 0 | — |
| S16 | Latency engineering: p50/p95, streaming/SSE, perceived vs actual latency | 7 | 0 | — |
| S17 | Observability & tracing for multi-agent systems; failure taxonomies | 7 | 0 | — |
| S18 | LLMOps: versioning prompts, shadow deploys, rollback | 7 | 0 | — |
| S19 | System design: "design a RAG system for X at scale" — structure of a strong answer | 3, 8 | 0 | — |
| S20 | LEAD-level: architecture ownership, ADRs, tradeoff justification in business terms | 8 | 0 | — |

---

## Coverage rule

Do not sit the real exam until every row in Part A shows `Tested ≥ 2` and `Best ≥ 4`.
Do not walk into a Gapstars interview until every row in Part B does the same.
