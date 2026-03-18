"use client";

import { useState } from "react";
import { Copy, Download, Check } from "lucide-react";
import type { PatternMeta } from "@/lib/patterns";

function ShadcnIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className={className}>
      <line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
      <line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
    </svg>
  );
}

function ClaudeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className}>
      <path d="m3.127 10.604 3.135-1.76.053-.153-.053-.085H6.11l-.525-.032-1.791-.048-1.554-.065-1.505-.08-.38-.081L0 7.832l.036-.234.32-.214.455.04 1.009.069 1.513.105 1.097.064 1.626.17h.259l.036-.105-.089-.065-.068-.064-1.566-1.062-1.695-1.121-.887-.646-.48-.327-.243-.306-.104-.67.435-.48.585.04.15.04.593.456 1.267.981 1.654 1.218.242.202.097-.068.012-.049-.109-.181-.9-1.626-.96-1.655-.428-.686-.113-.411a2 2 0 0 1-.068-.484l.496-.674L4.446 0l.662.089.279.242.411.94.666 1.48 1.033 2.014.302.597.162.553.06.17h.105v-.097l.085-1.134.157-1.392.154-1.792.052-.504.25-.605.497-.327.387.186.319.456-.045.294-.19 1.23-.37 1.93-.243 1.29h.142l.161-.16.654-.868 1.097-1.372.484-.545.565-.601.363-.287h.686l.505.751-.226.775-.707.895-.585.759-.839 1.13-.524.904.048.072.125-.012 1.897-.403 1.024-.186 1.223-.21.553.258.06.263-.218.536-1.307.323-1.533.307-2.284.54-.028.02.032.04 1.029.098.44.024h1.077l2.005.15.525.346.315.424-.053.323-.807.411-3.631-.863-.872-.218h-.12v.073l.726.71 1.331 1.202 1.667 1.55.084.383-.214.302-.226-.032-1.464-1.101-.565-.497-1.28-1.077h-.084v.113l.295.432 1.557 2.34.08.718-.112.234-.404.141-.444-.08-.911-1.28-.94-1.44-.759-1.291-.093.053-.448 4.821-.21.246-.484.186-.403-.307-.214-.496.214-.98.258-1.28.21-1.016.19-1.263.112-.42-.008-.028-.092.012-.953 1.307-1.448 1.957-1.146 1.227-.274.109-.477-.247.045-.44.266-.39 1.586-2.018.956-1.25.617-.723-.004-.105h-.036l-4.212 2.736-.75.096-.324-.302.04-.496.154-.162 1.267-.871z" />
    </svg>
  );
}

function DownloadSpinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

const btnBase =
  "inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card px-3 sm:px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:border-border hover:shadow-sm hover:-translate-y-px active:translate-y-0 active:shadow-none";

const btnPrimary =
  "inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-3 sm:px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-foreground/90 hover:shadow-sm hover:-translate-y-px active:translate-y-0 active:shadow-none";

function generatePrompt(pattern: PatternMeta): string {
  const fileList = pattern.files.map((f) => f.path).join(", ");
  return `I want to implement the "${pattern.title}" pattern using the Vercel AI SDK v6 in a Next.js app.

## Description
${pattern.description}

## Files needed
${fileList}

## Source code

${pattern.files.map((f) => `### ${f.path}\n\`\`\`\n${f.content}\n\`\`\``).join("\n\n")}

## Instructions
- Integrate these files into my existing Next.js project
- Use the AI SDK v6 (\`ai\` package) with provider-agnostic model setup
- Adapt imports and paths to match my project structure
- Add any missing dependencies to package.json
`;
}

function generateReadme(pattern: PatternMeta): string {
  const deps = [
    "ai",
    "@ai-sdk/anthropic",
    "@ai-sdk/openai",
    "@ai-sdk/google",
  ];
  if (pattern.tags.includes("zod") || pattern.files.some((f) => f.content.includes("from \"zod\""))) {
    deps.push("zod");
  }
  if (pattern.files.some((f) => f.content.includes("clsx") || f.content.includes("cn("))) {
    deps.push("clsx", "tailwind-merge");
  }

  return `# ${pattern.title}

${pattern.description}

## Setup

1. Install dependencies:

\`\`\`bash
pnpm add ${deps.join(" ")}
\`\`\`

2. Copy the files into your Next.js project:
${pattern.files.map((f) => `   - \`${f.path}\``).join("\n")}
   - \`lib/model.ts\` (provider-agnostic model helper)

3. Add your API key to \`.env.local\`:

\`\`\`
ANTHROPIC_API_KEY=sk-ant-...
# Or use another provider:
# OPENAI_API_KEY=sk-...
# GOOGLE_GENERATIVE_AI_API_KEY=...
\`\`\`

4. Run your app:

\`\`\`bash
pnpm dev
\`\`\`

## Alternative: Install via registry

\`\`\`bash
npx shadcn add ${process.env.NEXT_PUBLIC_SITE_URL || "https://ai-sdk-patterns.vercel.app"}/r/${pattern.id}
\`\`\`

---
Category: ${pattern.category} | Difficulty: ${pattern.difficulty}
Tags: ${pattern.tags.join(", ")}
`;
}

const MODEL_TS = `import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import type { LanguageModel } from "ai";

export function getModel(id?: string): LanguageModel {
  const modelId = id || process.env.DEFAULT_MODEL || "anthropic:claude-sonnet-4-5";
  const [provider, ...rest] = modelId.split(":");
  const model = rest.join(":");

  switch (provider) {
    case "anthropic":
      return anthropic(model) as unknown as LanguageModel;
    case "openai":
      return openai(model) as unknown as LanguageModel;
    case "google":
      return google(model) as unknown as LanguageModel;
    default:
      return anthropic(model) as unknown as LanguageModel;
  }
}
`;

const UTILS_TS = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

interface PatternActionsProps {
  pattern: PatternMeta;
}

export function PatternActions({ pattern }: PatternActionsProps) {
  const [copied, setCopied] = useState(false);
  const [promptCopied, setPromptCopied] = useState(false);
  const [cliCopied, setCliCopied] = useState(false);
  const [showInstall, setShowInstall] = useState(false);
  const [downloading, setDownloading] = useState(false);

  async function copyFiles() {
    const allCode = pattern.files
      .map((f) => `// ${f.path}\n${f.content}`)
      .join("\n\n// ---\n\n");

    await navigator.clipboard.writeText(allCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function copyPrompt() {
    const prompt = generatePrompt(pattern);
    await navigator.clipboard.writeText(prompt);
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2000);
  }

  async function copyCliCommand() {
    const cliCommand = `npx shadcn add ${process.env.NEXT_PUBLIC_SITE_URL || "https://ai-sdk-patterns.vercel.app"}/r/${pattern.id}`;
    await navigator.clipboard.writeText(cliCommand);
    setCliCopied(true);
    setTimeout(() => setCliCopied(false), 2000);
  }

  async function downloadZip() {
    if (downloading) return;
    setDownloading(true);

    const [JSZipModule] = await Promise.all([
      import("jszip"),
      new Promise((r) => setTimeout(r, 1500)), // min 1.5s visual feedback
    ]);
    const JSZip = JSZipModule.default;
    const zip = new JSZip();

    // Pattern source files
    for (const file of pattern.files) {
      zip.file(file.path, file.content);
    }

    // Shared helpers
    zip.file("lib/model.ts", MODEL_TS);

    const usesUi = pattern.files.some(
      (f) => f.content.includes("cn(") || f.content.includes("clsx")
    );
    if (usesUi) {
      zip.file("lib/utils.ts", UTILS_TS);
    }

    // README with setup instructions
    zip.file("README.md", generateReadme(pattern));

    // .env template
    zip.file(
      ".env.local",
      `# Add your API key for your preferred provider\nANTHROPIC_API_KEY=\n# OPENAI_API_KEY=\n# GOOGLE_GENERATIVE_AI_API_KEY=\n`
    );

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ai-sdk-${pattern.id}.zip`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloading(false);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Primary: CLI install */}
      <div className="relative">
        <button
          onClick={() => setShowInstall(!showInstall)}
          className={btnPrimary}
        >
          <ShadcnIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Install</span>
        </button>

        {showInstall && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowInstall(false)} />
            <div className="fixed inset-x-4 bottom-4 sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-2 z-50 sm:w-96 rounded-lg border border-border/60 bg-popover p-5 shadow-xl">
              <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-medium">
                Install via shadcn CLI
              </p>
              <div className="flex items-start gap-2">
                <code className="flex-1 text-xs sm:text-sm font-mono bg-secondary rounded-lg px-4 py-3 text-foreground break-all">
                  npx shadcn add {process.env.NEXT_PUBLIC_SITE_URL || "https://ai-sdk-patterns.vercel.app"}/r/{pattern.id}
                </code>
                <button
                  onClick={copyCliCommand}
                  className="rounded-lg bg-background border border-border/60 p-2 text-muted-foreground hover:text-foreground transition-colors"
                  title="Copy command"
                >
                  {cliCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Adds pattern files + dependencies to your project automatically.
              </p>
              <button
                onClick={() => setShowInstall(false)}
                className="sm:hidden mt-3 w-full rounded-lg bg-secondary py-2.5 text-sm font-medium text-foreground"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>

      {/* Secondary actions */}
      <button onClick={copyFiles} className={btnBase}>
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
      </button>

      <button onClick={copyPrompt} className={btnBase} title="Copy prompt for Claude, Cursor, Windsurf, etc.">
        {promptCopied ? (
          <Check className="h-4 w-4" />
        ) : (
          <ClaudeIcon className="h-4 w-4 text-[#D97757]" />
        )}
        <span className="hidden sm:inline">{promptCopied ? "Copied" : "Prompt"}</span>
      </button>

      <button onClick={downloadZip} className={btnBase} disabled={downloading}>
        {downloading ? <DownloadSpinner /> : <Download className="h-4 w-4" />}
        <span className="hidden sm:inline">{downloading ? "Preparing…" : "Download"}</span>
      </button>
    </div>
  );
}
