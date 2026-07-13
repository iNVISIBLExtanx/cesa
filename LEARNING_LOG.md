# CESA Learning Log

Reverse-chronological. One entry per experiment or notable decision.
Template:

## [DATE] — <short title>  (phase-N, experiment NN)
**Goal:** what I was trying to do.
**Naive approach:** what I built first and why it seemed reasonable.
**Measured failure:** the metric/number that showed it was wrong
  (e.g. "recall@5 = 0.41; 3/10 answers ungrounded").
**Fix:** what changed.
**Result:** the after-number (e.g. "recall@5 = 0.67 after semantic chunk + rerank").
**Tradeoff:** what it cost (latency, complexity, $).
**CCAR-F / interview link:** which task statement or interview topic this maps to.

---

## [2026-07-13] — Repo bootstrap  (phase-0)
**Goal:** Turn the locally-scaffolded docs/config into a real, working Phase 0 repo.
**Naive approach:** N/A — this was infra setup, not an experiment.
**Decisions:**
- Confirmed there is no separate "PubMed API key": NCBI issues one account-level
  API key that authenticates all E-utilities calls (esearch/efetch, all Entrez
  DBs including PubMed). Stored as `PUBMED_API_KEY`.
- Created the Supabase project now (not deferred to Phase 3) since none existed:
  org `iCompany`, project `cesa`, ref `uybzawozvnoxbvcyjaez`, region `us-east-1`.
  Schema/pgvector setup is still Phase 3 work.
- Kept the hand-written project-specific `.gitignore` instead of GitHub's generic
  Node template — it already covers secrets and build artifacts correctly.
**Result:** Public repo live at github.com/iNVISIBLExtanx/cesa with secret
scanning + push protection enabled; `pnpm lint`/`typecheck`/`test` all green.
**Tradeoff:** None significant — pure setup.
**CCAR-F / interview link:** D3 (repo & tooling hygiene).