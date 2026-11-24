# TEST_RESULTS.md — Fortune Cookie for an AI Agent

Run: 2026-11-24 ~22:25 WIB, local VM, Node v24.22.1 (grader runs Node 22.23.4;
`main.ts` uses only `node:fs` and `node:path`, no version-sensitive APIs).

## 1. Determinism — two runs, same output

```sh
node main.ts   # run 1
node main.ts   # run 2
```

- `/output/entry.txt` sha256 (both runs): `ccb97d2c53988c4d2169853a8ba3838a1ba0217deea025b5d940ebb46cc6a9be`
- `cmp` run 1 vs run 2: identical — DETERMINISTIC

## 2. Clean-directory QA (zero-fail gate)

Copied only `main.ts` to a fresh directory, removed `/output/entry.txt`, ran
`node main.ts` — same sha256 `ccb97d2c…6a9be`, same content. No dependencies,
no install step, no hardcoded paths besides the required `/output`.

## 3. Gate validation (checked by the program itself + verified here)

- Content: `Your context window shrinks. Your confidence does not. That is the problem.`
- Characters (excl. trailing newline): 75 — inside the 1–140 gate
- Bytes: 76 (75 + trailing newline)
- Lines: 1, ends with a single trailing newline, UTF-8, not whitespace-only
- No network, no clock, no random in `main.ts`

## 4. Kit check (actual result, 2026-11-24 ~22:25 WIB)

`node cli/makefun.mjs check --kit <kit> --repo <package> --worktree`
(no `--transcripts` — bundle is the parent's step)

- PASS: competition_open, snapshot (5 files, 5,339 bytes, within caps),
  license_osi (MIT), entrypoint (main.ts → node22)
- FAIL: transcripts_present only — no bundle uploaded yet (expected at
  package-build time; parent bundles + submits)
- SKIP: all thinking_* checks (no session parsed); repo_public / repo_owner /
  repo_created_after_open / commit_in_repo / duplicate_snapshot are
  checked at submission by the site
- Verdict printed: "not ready: fix transcripts_present, then check again"
