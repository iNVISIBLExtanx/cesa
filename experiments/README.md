# experiments/

This folder holds deliberately naive or broken implementations, kept on purpose.
Each experiment is a numbered folder documenting a "naive → measured failure → fix"
cycle. The FIXED version lives in `src/`; the experiment preserves the learning.

## Rules
- Nothing here is imported by `src/` or shipped to the UI.
- Every experiment folder has its own README using the LEARNING_LOG template.
- `main` stays green: experiments are excluded from the build (see tsconfig excludes)
  and may fail their own local checks by design.
- When an experiment is superseded, DO NOT delete it. Add a "Superseded by" line.

## Index
- `01-naive-loop/` — agentic loop that stops on assistant text (wrong). Fix: stop_reason.
- `02-fixed-chunking/` — 500-char fixed chunks. Fix: recursive/semantic + rerank.
- (add more)