---
name: mock-exam
description: Full CCAR-F mock exam — 60 questions, 4 scenarios, 120 minutes, scored to
  the real 720/1000 bar. Use at Phase 8 when the human says "mock exam", "full exam",
  "final exam", or "am I ready for the certification".
context: fork
allowed-tools: Read, Grep, Glob, Edit
argument-hint: [optional: "full" (60Q) or "half" (30Q)]
---
# Full mock exam — CCAR-F simulation

A faithful simulation of the real exam. Default: 60 questions, 120 minutes.
`half` → 30 questions, 60 minutes.

## Structure — match the real exam
- Build **4 scenarios**, drawn at random from the real bank of 6:
  1. Customer Support Resolution Agent (D1, D2, D5)
  2. Code Generation with Claude Code (D3, D5)
  3. Multi-Agent Research System (D1, D2, D5)
  4. Developer Productivity with Claude (D2, D3, D1)
  5. Claude Code for Continuous Integration (D3, D4)
  6. Structured Data Extraction (D4, D5)
- Present each scenario's context ONCE, then ask its questions as a group.
- Weight the 60 questions to the real domain weights:
  **D1 27% (~16) · D2 18% (~11) · D3 20% (~12) · D4 20% (~12) · D5 15% (~9)**
- Read `exams/BLUEPRINT.md` first and **over-sample any row with a weak `Best` score or a
  low `Tested` count.** The mock exists to find holes, not to flatter.

## Then, separately: the SENIOR SECTION
After the 60 CCAR-F questions, run **15 additional senior AI engineering questions** from
Part B of the blueprint — clearly labelled and scored separately, so the exam simulation
stays faithful while still preparing them for the Gapstars interview.

## Conduct
- One question at a time. No hints. No answers until the section ends.
- Allow "FLAG" to defer a question; return to flagged items before scoring.
- Track elapsed questions and warn at the halfway point (real exam: ~2 min/question).
- Do NOT explain anything mid-exam. This is a timed simulation, not a tutorial.

## Scoring — after all questions
1. **Raw:** X/60. **Scaled estimate:** map to the 100–1000 scale (**720 = pass**).
2. **Domain breakdown** vs the real weights — flag any domain below 70%.
3. **Senior section:** X/15, separately.
4. **Full review of every missed question:** the right answer, and why each wrong option
   was wrong.
5. **Repeated traps:** if they fell for the same distractor pattern more than once, name
   it explicitly (e.g. "you chose 'strengthen the system prompt' three times — you are
   still reaching for probabilistic fixes where the scenario demands a deterministic one").
6. **Verdict:** READY (≥720 scaled AND no domain below 70%) or NOT READY — and if not
   ready, the exact study plan: which task statements, which repo files, in what order.

## Then update the trackers
Update `exams/BLUEPRINT.md` (`Tested`, `Best`) and append the full result to
`exams/SCORES.md`. Touch nothing else.
