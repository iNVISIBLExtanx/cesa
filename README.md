# CESA — Clinical Evidence Synthesis Agent

[badges: build | license MIT | TypeScript | Claude Agent SDK]

> A multi-agent system that searches PubMed, analyzes abstracts, and synthesizes
> **fully-cited** evidence summaries. Built in public as a learning lab for the
> Anthropic Claude Certified Architect blueprint and as a production-minded
> portfolio piece.

**⚠️ Not medical advice.** See [DISCLAIMER](#medical-disclaimer). CESA summarizes
published literature only; it does not diagnose or recommend treatment.

## Demo
![demo](docs/demo.gif)

## Architecture
![architecture](docs/architecture.png)
(see ARCHITECTURE.md)

## What this demonstrates
- Coordinator + subagent orchestration (Claude Agent SDK)
- Custom MCP server (PubMed E-utilities)
- Hybrid RAG over pgvector with reranking + RAGAS-style eval
- Structured output (tool_use + JSON Schema + Zod + retry)
- Guardrails, prompt-injection tests (OWASP LLM Top 10), tracing, cost/latency work

## Build log
This repo is built phase-by-phase — see PHASES.md, LEARNING_LOG.md, and the
experiments/ folder for the naive→measured-failure→fix→tradeoff writeups.

## Quickstart
`pnpm install` → copy `.env.example` to `.env` → `pnpm dev`

## Medical disclaimer
(full text below)

## License
MIT — see LICENSE. Uses open PubMed data via NCBI E-utilities; see NCBI Disclaimer.