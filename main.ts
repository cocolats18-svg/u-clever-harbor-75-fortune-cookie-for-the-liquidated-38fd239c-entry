// Fortune Cookie for the Liquidated Trader — entry program (program/v1).
// Writes a single original fortune cookie line for a crypto trader who
// has just been liquidated to /output/entry.txt. Node 22+ stdlib only,
// no network, no randomness: the same line every run, so the two grading
// runs are byte-identical.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Your margin is gone, but the cookie kept your courage: you were liquidated, not lost.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The gate seals it: 1 to 160 characters, one line, at most 20 words,
// not only whitespace.
const body = LINE.trim();
const words = body.split(/\s+/).length;
if (body.length < 1 || body.length > 160 || words > 20 || body.includes("\n")) {
  throw new Error(
    `entry line fails the gate at ${body.length} characters / ${words} words`,
  );
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), body + "\n", "utf8");
