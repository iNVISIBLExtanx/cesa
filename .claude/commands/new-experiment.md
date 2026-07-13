---
description: Scaffold a new numbered experiment folder with a LEARNING_LOG-style README.
argument-hint: [short-experiment-name]
---
Create a new experiment folder under experiments/ with the next zero-padded number
and the slug $ARGUMENTS. Inside it:
1. Create README.md using the LEARNING_LOG template (Goal / Naive approach /
   Measured failure / Fix / Result / Tradeoff / CCAR-F link), pre-filled with the
   experiment name and today's date.
2. Add a placeholder index.ts with a TODO describing the naive approach to build.
3. Add the experiment to the Index list in experiments/README.md.
Do not touch src/. Report the path you created.