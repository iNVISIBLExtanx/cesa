# How to work on CESA

This is the operating manual. Read it once. It answers: "I opened VS Code. Now what?"

---

## The one rule

**You write the concept. Claude explains and critiques. Claude never writes the
concept for you.**

Concept code = the agentic loop, hooks, MCP tools, schemas, retry loops, chunking,
retrieval, eval scoring, escalation criteria. That is what the exam tests and what an
interviewer will probe. If Claude types it, you did not learn it.

Scaffolding (config, types, boilerplate, fixtures, CI) — let Claude do it. That is not
what is being tested.

---

## The failure-first method

For every concept, in this exact order:

1. **Build it wrong on purpose**, in `experiments/NN-name/`.
2. **Run it and measure how it fails.** Write down a NUMBER.
3. **Build it right**, in `src/`.
4. **Measure again.** Write down the new NUMBER.
5. **Log it** in `LEARNING_LOG.md` and the experiment's README.

Why: the exam does not ask "how do you write a hook." It asks *"what is the most
effective FIRST step"* and gives you four plausible options. You reject the wrong ones
instantly only once you have personally watched them fail. Reading cannot give you that.

---

## The daily loop (60 minutes)

| Time | What |
|---|---|
| 40 min | Build the current phase task. Concept by hand, scaffolding delegated. |
| 15 min | **Explain it back.** Out loud or in writing, as if to an interviewer. Cannot explain it? That is tomorrow's re-study, not a commit. |
| 5 min | One line in `LEARNING_LOG.md`. Commit. |

**Never fake-commit to protect a streak.** A hollow commit corrupts the only signal
that matters.

---

## Starting any session

Open the integrated terminal in VS Code, run `claude`, then type:

```
Read PHASES.md. Tell me the current status and the next unchecked task.
Do not write any code yet.
```

Claude reads `CLAUDE.md` (always loaded), which points at `PHASES.md`. It will tell
you exactly where you are.

## Ending any phase

```
/phase-quiz 1
```

Five CCAR-F-style scenario questions on what you actually built, one at a time. It
scores you and says ADVANCE (4/5+) or REVIEW. **Do not start the next phase on a
REVIEW.**

---

## Git workflow

```bash
git checkout -b phase-1-agentic-loop     # branch per phase
# ...work, commit as you go...
git push -u origin phase-1-agentic-loop
# open PR on GitHub, check CI is green, squash-merge
git checkout main && git pull
git tag phase-1 && git push --tags       # snapshot the phase
git branch -d phase-1-agentic-loop       # delete local
git push origin --delete phase-1-agentic-loop   # delete remote
```

Commit messages: Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `test:`).

**Keep branches clean.** One live branch at a time — the phase you are on. Every merged
branch gets deleted. The phase tags are the permanent history, not the branches.

---

## What Claude Code features to use, and when

| Feature | Use it for | CCAR-F |
|---|---|---|
| **Plan mode** (Shift+Tab twice) | Multi-file, architectural work. Phase 4's refactor. | D3.4 |
| **Direct execution** | Single-file, clear-scope fixes. | D3.4 |
| `/memory` | See which CLAUDE.md / rules files are actually loaded. | D3.1 |
| `/compact` | Long session, context filling up. | D5.4 |
| `/resume` | Continue yesterday's named session. | D1.7 |
| `/fork` | Try two approaches from one baseline (e.g. two chunking strategies). | D1.7 |
| `/phase-quiz N` | End of every phase. Non-negotiable. | all |
| `/new-experiment name` | Scaffold the next `experiments/NN-name/` folder. | — |

You are not just *using* these. Using them **is** how you study Domain 3 (20% of the exam).

---

## Phase 1 walkthrough — do exactly this

**Goal:** understand the agentic loop deeply enough to defend it against three wrong
alternatives. Covers CCAR-F D1.1.

### Day 1 — Understand (no code)
```
I am on Phase 1: the agentic loop. Do NOT write code.
Explain how the Anthropic Messages API tool-use loop works: what stop_reason values
exist, what I do on each, and how tool results get appended to the conversation.
Then explain the three termination anti-patterns and why each fails.
Quiz me on it before we move on.
```
End of session: write 3 sentences in `LEARNING_LOG.md` explaining the loop in your own
words. If you cannot, repeat Day 1.

### Day 2 — Build it WRONG
```
/new-experiment naive-loop
```
Then, by hand, in `experiments/01-naive-loop/index.ts`, write a loop that terminates by
checking whether the assistant's text contains "done" or similar. Give it 2-3 tools.
**Claude may not write this for you.** Ask it to review after.

### Day 3 — Watch it fail, get the number
Run it against ~20 varied questions. Count:
- How many terminated early (stopped before finishing the task)?
- How many never terminated (looped until you killed them)?

Write the numbers down. This number is the entire point of the phase. Something like:
`regex termination: 6/20 stopped early, 2/20 never terminated.`

### Day 4 — Build it RIGHT
By hand, in `src/loop/agentic-loop.ts`: branch on `stop_reason`.
- `"tool_use"` → execute the tool, append the result as a `tool_result` block, continue.
- `"end_turn"` → stop, return the final message.
- Keep an iteration cap, but ONLY as a safety net — never as the primary stop.

Run the same 20 questions. Expect `0/20` failures. Write that number down.

### Day 5 — Lock it in
- Fill in `experiments/01-naive-loop/README.md`: naive approach → measured failure →
  fix → result → tradeoff → CCAR-F link.
- Add the `LEARNING_LOG.md` entry.
- Write a Vitest test that mocks the Anthropic client and asserts the loop continues on
  `tool_use` and stops on `end_turn`.
- Tick Phase 1 in `PHASES.md`, update the "Current status" line.
- `/phase-quiz 1`. Score 4/5+ to advance.
- Commit, PR, merge, `git tag phase-1`.

**When you can explain why an iteration cap is a safety net and not a stop condition —
and why parsing text for "done" is not just fragile but categorically wrong — Phase 1
is done.**
