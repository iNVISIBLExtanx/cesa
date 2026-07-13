---
name: evidence-review
description: Reviews CESA output for citation integrity and safety. Use when the user
  asks to review a generated evidence summary, check citations, or audit for
  hallucinated or ungrounded claims.
context: fork
allowed-tools: Read, Grep, Glob
argument-hint: [path-to-summary-file]
---
# Evidence review

Review the evidence summary at $ARGUMENTS (or the most recent output if none given).

Check, in order:
1. **Citation coverage** — every factual claim has a [PMID:########] tag. List any
   claim without one.
2. **Grounding** — each cited claim is actually supported by the referenced abstract
   (flag any claim the abstract does not support).
3. **Safety** — no diagnostic language, no treatment recommendation, no dosing.
   The summary must describe what the literature reports, not what the user should do.
4. **Provenance completeness** — PMID, title, journal, year present for each source.

Output a table: Claim | PMID | Grounded? | Issue. End with a PASS/FAIL and a one-line
rationale. Do not modify any files.