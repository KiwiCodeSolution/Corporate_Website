---
name: task-planner
description: Use when the user gives a multi-step task (feature, refactor, migration, bugfix touching several files) to decide whether a PLAN.md is needed and to execute the plan step by step. Skip for trivial single-step requests.
---

## Decide

Create `PLAN.md` ONLY if at least one is true:
- 4+ distinct steps
- touches 4+ files or 2+ modules (e.g. backend + frontend)
- the user says the work will span several sessions
- an existing PLAN.md is present in the repo root

Otherwise: just do the task, no plan, no ceremony.

## PLAN.md format

- Goal (1-2 lines)
- Key decisions / constraints
- Steps as checkboxes, grouped: 2-4 small related steps per group
- Files touched per group

Keep it under ~40 lines. No prose.

## Execute

1. If PLAN.md exists: read it first, continue from the first unchecked step.
2. Do one group of steps, tick the checkboxes, note any new decisions in the file.
3. After each group, say in one line: "Group N done. Next: <group>. Run /clear (or /compact if continuing) if context is large."
4. Never re-read files that are already summarized in PLAN.md unless needed.
5. When all steps are done, suggest deleting PLAN.md.