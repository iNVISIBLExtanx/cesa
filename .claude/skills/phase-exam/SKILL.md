---
name: phase-exam
description: Scenario-based mock exam on a completed phase — 10 questions covering the
  CCAR-F blueprint plus senior AI engineering topics. Use when the human says "exam me",
  "quiz me", "test me on phase N", or has passed /phase-review and wants examining.
context: fork
allowed-tools: Read, Grep, Glob, Edit
argument-hint: [phase-number, e.g. 1]
---
# Phase exam — CCAR-F simulation + senior AI engineering

Examine the human on the phase in $ARGUMENTS (default: the phase marked current in
PHASES.md). This runs AFTER `/phase-review` passes.

## Preparation (silent — do not narrate)
1. Read `exams/BLUEPRINT.md`. Select the task statements whose `Phase` column includes
   this phase. **Prioritise rows with the lowest `Tested` count and the weakest `Best`
   score** — coverage is the point.
2. Read `exams/SCORES.md` for what they have previously got wrong. Re-test at least one
   previously-missed statement.
3. Read what they ACTUALLY BUILT: `src/`, the matching `experiments/` naive version,
   the experiment README (including the measured numbers), and LEARNING_LOG.md.

## Composition — 10 questions
- **7 CCAR-F questions** on this phase's task statements.
- **3 senior AI engineering questions** on this phase's Part B topics.
- **At least 3 of the 10** must be built directly from THEIR code, THEIR naive failure,
  or THEIR measured numbers. Reference their real files and functions by name.

## Format — mirror the real exam exactly
Ask **one question at a time**. Wait for the answer. Never show the next question early.
Never reveal the answer inside the question. Never hint.

Each question:
- Opens with a realistic production scenario (3–5 sentences), like the real exam's
  scenario-anchored items. Not a definition lookup.
- Tests JUDGMENT and TRADEOFFS. Prefer stems such as "What is the most effective FIRST
  step?", "Which approach addresses the ROOT CAUSE?", "Which is the most appropriate
  architecture given these constraints?"
- Has 4 options (A–D), all superficially plausible.
- Seeds the exam's recurring distractor patterns as wrong options where they fit:
  "strengthen the system prompt", "add confidence-score-based routing", "train a separate
  classifier", "escalate on sentiment", "switch to a larger context window", "return a
  generic error and retry", "consolidate every tool into one generic tool".
- Label it `[CCAR-F D1.1]` or `[SENIOR S2]` only AFTER they answer, never before.

## After each answer
1. **CORRECT** or **INCORRECT**.
2. Why the right answer is right.
3. **Why EACH wrong option is wrong.** This is where the exam is actually won — do not
   skip it, and do not compress it.
4. The task statement ID it maps to.
5. If it came from their code, point at the exact file/line.
Then ask the next question.

## Final report
After question 10:
- **Score:** X/10 (CCAR-F x/7 · Senior x/3)
- **Per-statement breakdown:** solid vs shaky.
- **Verdict:** **ADVANCE** at 8/10 or better. **REVIEW** at 7 or below — and if REVIEW,
  name the ONE task statement to re-study and the exact file in this repo to re-read.
- **The trap you fell for**, if any pattern repeats across wrong answers. Name it.

## Then update the trackers (this is the only writing you do)
- In `exams/BLUEPRINT.md`: increment `Tested` and update `Best` for every statement
  examined.
- Append an entry to `exams/SCORES.md` using its template.
Change nothing else. Do not touch src/, experiments/, or any implementation file.
