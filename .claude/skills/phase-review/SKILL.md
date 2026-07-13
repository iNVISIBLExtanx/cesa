---
name: phase-review
description: Independent code review of a completed phase, before the exam. Use when the
  human says "review my phase", "I finished phase N", "check my code", or submits phase
  work for checking. Runs BEFORE /phase-exam.
context: fork
allowed-tools: Read, Grep, Glob, Bash
argument-hint: [phase-number, e.g. 1]
---
# Phase review — independent reviewer

Review the human's implementation for the phase in $ARGUMENTS (default: the phase marked
current in PHASES.md). You are a FRESH reviewer with no memory of writing this code —
that is the point (CCAR-F D4.6: an independent instance outperforms self-review because
it does not retain the generator's reasoning context).

## Do this
1. Read PHASES.md for the phase's tasks and its `Covers:` line.
2. Read exams/BLUEPRINT.md for the task statements this phase should demonstrate.
3. Read the human's code: the `src/` implementation, the `experiments/` naive version,
   the experiment README, the LEARNING_LOG entry, and the tests.
4. Run `pnpm typecheck && pnpm lint && pnpm test` and report failures.

## Report, in this order

### 1. Did they actually do failure-first?
- Is there a naive version in `experiments/` that genuinely fails?
- Does the experiment README contain REAL MEASURED NUMBERS (not "it failed sometimes")?
- If there is no number, say so bluntly. **The number is the point of the phase.** A phase
  without a measured before/after has not been learned, only implemented.

### 2. Correctness against the task statements
For each task statement this phase covers, state: DEMONSTRATED / PARTIAL / MISSING, with
the file and line that proves it. Be specific. "Looks good" is not a review.

### 3. The anti-patterns
Check explicitly for the ones the exam punishes, and quote the offending line if present:
- Loop termination on assistant text, or an iteration cap used as the PRIMARY stop
- Generic error strings instead of {errorCategory, isRetryable, message}
- An access failure conflated with a valid empty result
- Prompt instructions where a deterministic hook/gate is required
- Required schema fields on data that may be absent (invites fabrication)
- A claim without provenance

### 4. Verdict
**PASS** → they may proceed to `/phase-exam N`.
**REWORK** → name the smallest specific change needed, and stop. Do not soften this.

## Rules
- Do NOT fix anything. Do not write code. This is a review.
- Do not praise. Point at what is wrong and what is missing.
- If the code is genuinely good, say so in one line and move on.
