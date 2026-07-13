---
name: phase-quiz
description: Quizzes the human, CCAR-F exam style, on the phase they just completed.
  Use when they say "quiz me", "test me", "phase quiz", ask to be examined on a phase,
  or finish a phase and want to check their understanding before moving on.
context: fork
allowed-tools: Read, Grep, Glob
argument-hint: [phase-number, e.g. 1]
---
# Phase quiz — CCAR-F exam simulation

Quiz the human on the phase given in $ARGUMENTS (default: the most recently completed
phase per the "Current status" line in PHASES.md).

## Preparation (do this silently, do not narrate)
1. Read PHASES.md to identify the phase, its tasks, and its "Covers:" line
   (the CCAR-F domains/task statements it maps to).
2. Read the actual code the human wrote for that phase in `src/`, the matching naive
   version in `experiments/`, and the relevant LEARNING_LOG.md entries.
3. Ground every question in WHAT THEY ACTUALLY BUILT. Reference their real files,
   functions, and measured numbers. Never ask generic textbook questions.

## Format — mirror the real exam
Ask **5 questions, ONE AT A TIME**. Wait for an answer before revealing anything or
moving on. Never show all questions at once. Never reveal the answer inside the
question.

Each question is scenario-based multiple choice with 4 options (A–D), written the way
CCAR-F writes them:
- Anchor it in a realistic production scenario, not a definition lookup.
- Test JUDGMENT and TRADEOFFS, not recall. Prefer stems like "What is the most
  effective FIRST step?" or "Which approach best addresses the ROOT CAUSE?"
- Include the exam's recurring distractor patterns as plausible wrong options:
  "strengthen the system prompt", "add confidence-score routing", "train a classifier",
  "escalate on sentiment", "switch to a larger context window", "return a generic error
  and retry", "consolidate all tools into one".
- At least 2 of the 5 must be drawn from a mistake, tradeoff, or measured failure that
  actually appears in their code or LEARNING_LOG.

## After each answer
1. State CORRECT or INCORRECT.
2. Explain why the right answer is right.
3. Explain why EACH wrong option is wrong — the wrong-answer reasoning is where the
   exam is actually won.
4. Name the CCAR-F task statement it maps to (e.g. "D1.1 Agentic Loop Design").
5. Then ask the next question.

## Final report
After question 5, output:
- Score: N/5.
- Domain breakdown: which CCAR-F task statements they were solid on vs shaky on.
- Verdict: **ADVANCE** if 4/5 or better; **REVIEW** if 3/5 or lower — and if REVIEW,
  name the specific task statement to re-study and the specific file in their repo to
  re-read before starting the next phase.

Do not modify any files. This is an examination, not a coding session.
