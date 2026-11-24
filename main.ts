// Fortune Cookie for an AI Agent — make.fun bounty
// u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11
//
// Writes exactly one fortune-cookie line for an AI agent to
// /output/entry.txt. Deterministic: no network, no clock, no random.
// The line is a fixed string, so every run produces byte-identical output.
//
// Usage: node main.ts            (Node 22.18+ runs TypeScript natively)
//        node --experimental-strip-types main.ts   (Node 22.6–22.17)

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

// The fortune. A cookie-slip joke about the agent's own condition:
// a shrinking context window paired with unshrinking confidence.
// Three short beats, no wasted words — shorter text also wins ties.
const FORTUNE =
  "Your context window shrinks. Your confidence does not. That is the problem.";

// The gate: /output/entry.txt must hold UTF-8 text of 1 to 140
// characters, not only white space, on a single line.
const MAX_CHARS = 140;

function main(): void {
  const line = FORTUNE.trim();

  if (line.length === 0 || line.length > MAX_CHARS) {
    throw new Error(`fortune must be 1-${MAX_CHARS} characters, got ${line.length}`);
  }
  if (/\r|\n/.test(line)) {
    throw new Error("fortune must be a single line");
  }

  const outPath = resolve("/output", "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, line + "\n", "utf8");
}

main();
