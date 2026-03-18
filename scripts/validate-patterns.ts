#!/usr/bin/env npx tsx
/**
 * Pattern Validation Script
 *
 * Extracts each pattern into a temp directory with all shared files,
 * runs TypeScript type-checking, and reports errors.
 *
 * Usage: npx tsx scripts/validate-patterns.ts
 */

import { patterns } from "../lib/patterns";
import { composePatterns } from "../lib/compose";
import { mkdirSync, writeFileSync, rmSync, existsSync } from "fs";
import { dirname, join } from "path";
import { execSync } from "child_process";

const TEMP_ROOT = join(process.cwd(), ".pattern-validate-tmp");

// Shared tsconfig for validation
const TSCONFIG = {
  compilerOptions: {
    target: "ES2017",
    lib: ["dom", "dom.iterable", "esnext"],
    allowJs: true,
    skipLibCheck: true,
    strict: false, // lenient — we just want to catch syntax/import errors
    noEmit: true,
    esModuleInterop: true,
    module: "esnext",
    moduleResolution: "bundler",
    resolveJsonModule: true,
    isolatedModules: true,
    jsx: "preserve",
    plugins: [{ name: "next" }],
    paths: { "@/*": ["./*"] },
  },
  include: ["**/*.ts", "**/*.tsx"],
  exclude: ["node_modules"],
};

// Minimal model.ts that type-checks without real deps
const MODEL_STUB = `
export function getModel(id?: string): any {
  return {} as any;
}
`;

// Minimal utils.ts
const UTILS_STUB = `
export function cn(...inputs: any[]): string {
  return inputs.filter(Boolean).join(" ");
}
`;

function writeFile(base: string, filePath: string, content: string) {
  const full = join(base, filePath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, "utf-8");
}

function validateSinglePattern(pattern: (typeof patterns)[0]): string[] {
  const dir = join(TEMP_ROOT, pattern.id);

  // Clean previous
  if (existsSync(dir)) rmSync(dir, { recursive: true });
  mkdirSync(dir, { recursive: true });

  // Write tsconfig
  writeFile(dir, "tsconfig.json", JSON.stringify(TSCONFIG, null, 2));

  // Write shared stubs
  writeFile(dir, "lib/model.ts", MODEL_STUB);
  writeFile(dir, "lib/utils.ts", UTILS_STUB);

  // Write pattern files
  for (const file of pattern.files) {
    writeFile(dir, file.path, file.content);
  }

  // Run tsc
  try {
    execSync("npx tsc --noEmit --pretty 2>&1", {
      cwd: dir,
      encoding: "utf-8",
      timeout: 30000,
    });
    return [];
  } catch (err: any) {
    const output = err.stdout || err.stderr || err.message || "Unknown error";
    // Parse errors — each line starting with a path
    return output
      .split("\n")
      .filter((line: string) => line.includes("error TS"))
      .map((line: string) => line.trim());
  }
}

function validateComposed(): string[] {
  // Test a composed app with 3 patterns from different categories
  const testIds = ["streaming-chat", "structured-output", "tool-calling"];
  const dir = join(TEMP_ROOT, "__composed__");

  if (existsSync(dir)) rmSync(dir, { recursive: true });
  mkdirSync(dir, { recursive: true });

  const composedFiles = composePatterns(testIds);

  // Write tsconfig
  writeFile(dir, "tsconfig.json", JSON.stringify(TSCONFIG, null, 2));

  // Write all composed files
  for (const file of composedFiles) {
    writeFile(dir, file.path, file.content);
  }

  // Also need stubs for composed app since it references real packages
  writeFile(dir, "lib/model.ts", MODEL_STUB);
  writeFile(dir, "lib/utils.ts", UTILS_STUB);

  try {
    execSync("npx tsc --noEmit --pretty 2>&1", {
      cwd: dir,
      encoding: "utf-8",
      timeout: 30000,
    });
    return [];
  } catch (err: any) {
    const output = err.stdout || err.stderr || err.message || "Unknown error";
    return output
      .split("\n")
      .filter((line: string) => line.includes("error TS"))
      .map((line: string) => line.trim());
  }
}

// ─── Main ───

console.log(`\nValidating ${patterns.length} patterns...\n`);

let totalErrors = 0;
const results: { id: string; errors: string[] }[] = [];

for (const pattern of patterns) {
  process.stdout.write(`  ${pattern.id} ... `);
  const errors = validateSinglePattern(pattern);
  results.push({ id: pattern.id, errors });

  if (errors.length === 0) {
    console.log("OK");
  } else {
    console.log(`FAIL (${errors.length} errors)`);
    totalErrors += errors.length;
  }
}

// Test composed app
process.stdout.write(`\n  [composed: streaming-chat + structured-output + tool-calling] ... `);
const composedErrors = validateComposed();
if (composedErrors.length === 0) {
  console.log("OK");
} else {
  console.log(`FAIL (${composedErrors.length} errors)`);
  totalErrors += composedErrors.length;
}

// ─── Report ───

console.log("\n" + "─".repeat(60));

const failed = results.filter((r) => r.errors.length > 0);

if (failed.length === 0 && composedErrors.length === 0) {
  console.log(
    `\n  All ${patterns.length} patterns + composed app validated successfully!\n`
  );
} else {
  console.log(`\n  ${failed.length} pattern(s) with errors:\n`);
  for (const r of failed) {
    console.log(`  ${r.id}:`);
    for (const err of r.errors) {
      console.log(`    ${err}`);
    }
    console.log();
  }

  if (composedErrors.length > 0) {
    console.log(`  [composed app]:`);
    for (const err of composedErrors) {
      console.log(`    ${err}`);
    }
    console.log();
  }

  console.log(`  Total: ${totalErrors} errors\n`);
}

// Cleanup
rmSync(TEMP_ROOT, { recursive: true, force: true });

process.exit(totalErrors > 0 ? 1 : 0);
