"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { composePatterns } from "@/lib/compose";
import { getPatternIllustration } from "@/components/patterns/pattern-illustrations";
import { cn } from "@/lib/utils";
import {
  Download,
  Check,
  Copy,
  Package,
  FolderOpen,
  ChevronDown,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ExternalLink,
  File,
  Minus,
} from "lucide-react";

interface PatternSummary {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  fileCount: number;
  badges?: string[];
}

const categoryOrder = ["core", "chat", "agents", "tools", "workflows"];

const categoryLabels: Record<string, string> = {
  core: "Core / SDK",
  chat: "Chat",
  agents: "Agents",
  tools: "Tools",
  workflows: "Workflows",
};

function groupByCategory(patterns: PatternSummary[]) {
  const grouped: Record<string, PatternSummary[]> = {};
  for (const p of patterns) {
    (grouped[p.category] ??= []).push(p);
  }
  return categoryOrder
    .filter((cat) => grouped[cat]?.length)
    .map((cat) => ({ category: cat, items: grouped[cat] }));
}

function buildTree(files: { path: string }[]) {
  const tree: Record<string, string[]> = {};
  for (const f of files) {
    const parts = f.path.split("/");
    if (parts.length === 1) {
      (tree["root"] ??= []).push(parts[0]);
    } else {
      const folder = parts.slice(0, -1).join("/");
      (tree[folder] ??= []).push(parts[parts.length - 1]);
    }
  }
  return tree;
}

const extColor: Record<string, string> = {
  tsx: "text-foreground/70",
  ts: "text-foreground/50",
  json: "text-muted-foreground",
  css: "text-muted-foreground",
  md: "text-muted-foreground",
};

function getExt(path: string) {
  return path.split(".").pop() || "";
}

export function ComposeClient({ patterns }: { patterns: PatternSummary[] }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [downloading, setDownloading] = useState(false);
  const [promptCopied, setPromptCopied] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set()
  );

  const groups = useMemo(() => groupByCategory(patterns), [patterns]);

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleCategory = useCallback(
    (category: string) => {
      setSelected((prev) => {
        const next = new Set(prev);
        const group = groups.find((g) => g.category === category);
        if (!group) return next;
        const allSelected = group.items.every((p) => next.has(p.id));
        for (const p of group.items) {
          if (allSelected) next.delete(p.id);
          else next.add(p.id);
        }
        return next;
      });
    },
    [groups]
  );

  const composedFiles = useMemo(() => {
    if (selected.size === 0) return [];
    return composePatterns(Array.from(selected));
  }, [selected]);

  const tree = useMemo(() => buildTree(composedFiles), [composedFiles]);
  const sortedFolders = useMemo(() => {
    return Object.keys(tree).sort((a, b) => {
      if (a === "root") return 1;
      if (b === "root") return -1;
      return a.localeCompare(b);
    });
  }, [tree]);

  const totalFileSize = useMemo(() => {
    const bytes = composedFiles.reduce((sum, f) => sum + f.content.length, 0);
    return bytes > 1024
      ? `${(bytes / 1024).toFixed(1)} KB`
      : `${bytes} bytes`;
  }, [composedFiles]);

  async function copyFiles() {
    if (composedFiles.length === 0) return;
    const allCode = composedFiles
      .map((f) => `// ${f.path}\n${f.content}`)
      .join("\n\n// ---\n\n");
    await navigator.clipboard.writeText(allCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function copyPrompt() {
    if (composedFiles.length === 0) return;

    const patternNames = selectedPatterns.map((p) => p.title).join(", ");
    const prompt = `I want to create a Next.js app that integrates these AI SDK patterns: ${patternNames}.

## Project Structure

${composedFiles.map((f) => `- ${f.path}`).join("\n")}

## Source Code

${composedFiles.map((f) => `### ${f.path}\n\`\`\`\n${f.content}\n\`\`\``).join("\n\n")}

## Instructions
- Set up this as a working Next.js project
- Install all dependencies: ai, @ai-sdk/react, @ai-sdk/anthropic, @ai-sdk/openai, @ai-sdk/google, zod
- The app uses Tailwind CSS v4 with @tailwindcss/postcss
- Each pattern has its own route (e.g. /streaming-chat, /tool-calling)
- The shared model helper at lib/model.ts supports multiple AI providers
- Add any missing dependencies you notice
- Make sure everything runs with pnpm dev
`;

    await navigator.clipboard.writeText(prompt);
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2000);
  }

  async function handleDownload() {
    if (composedFiles.length === 0) return;
    setDownloading(true);

    const [JSZipModule] = await Promise.all([
      import("jszip"),
      new Promise((r) => setTimeout(r, 1500)), // min 1.5s visual feedback
    ]);
    const JSZip = JSZipModule.default;
    const zip = new JSZip();

    for (const file of composedFiles) {
      zip.file(file.path, file.content);
    }

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    const name =
      selected.size === 1
        ? `ai-sdk-${Array.from(selected)[0]}`
        : `ai-sdk-composed-${selected.size}-patterns`;
    a.download = `${name}.zip`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloading(false);
  }

  const selectedPatterns = patterns.filter((p) => selected.has(p.id));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-5 w-5 text-muted-foreground" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Composer
          </h1>
        </div>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          Pick patterns, preview the output, download a working Next.js app.
          Selected patterns are merged with shared routing, model config,
          and deduplicated dependencies.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        {/* Left — Pattern cards */}
        <div>
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-border/60">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 text-sm font-medium tabular-nums",
                  selected.size > 0
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <span
                  className={cn(
                    "inline-flex items-center justify-center h-5 min-w-5 px-1 rounded text-xs font-semibold",
                    selected.size > 0
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {selected.size}
                </span>
                <span className="hidden sm:inline">
                  of {patterns.length} selected
                </span>
              </span>
            </div>
            <div className="flex items-center gap-1">
              {selected.size > 0 && (
                <button
                  onClick={() => setSelected(new Set())}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset
                </button>
              )}
              {selected.size < patterns.length && (
                <button
                  onClick={() =>
                    setSelected(new Set(patterns.map((p) => p.id)))
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  Select all
                </button>
              )}
            </div>
          </div>

          {/* Category groups with card grids */}
          <div className="space-y-8">
            {groups.map((group) => {
              const selectedInGroup = group.items.filter((p) =>
                selected.has(p.id)
              ).length;
              const allSelected = selectedInGroup === group.items.length;

              return (
                <div key={group.category}>
                  {/* Category header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-sm font-semibold text-foreground tracking-tight">
                        {categoryLabels[group.category] || group.category}
                      </h3>
                      <span className="text-xs text-muted-foreground/50 tabular-nums">
                        {group.items.length}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleCategory(group.category)}
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <div
                        className={cn(
                          "h-3.5 w-3.5 rounded border flex items-center justify-center transition-all",
                          allSelected
                            ? "border-foreground bg-foreground"
                            : selectedInGroup > 0
                              ? "border-foreground/40 bg-foreground/10"
                              : "border-border"
                        )}
                      >
                        {allSelected ? (
                          <Check className="h-2 w-2 text-background" />
                        ) : selectedInGroup > 0 ? (
                          <Minus className="h-2 w-2 text-foreground/60" />
                        ) : null}
                      </div>
                      {allSelected ? "Deselect" : "Select"} all
                    </button>
                  </div>

                  {/* Card grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {group.items.map((pattern) => {
                      const isSelected = selected.has(pattern.id);
                      const illustration = getPatternIllustration(pattern.id);

                      return (
                        <div
                          key={pattern.id}
                          className={cn(
                            "group relative rounded-lg border overflow-hidden transition-all duration-150",
                            isSelected
                              ? "border-foreground/20 bg-secondary/80 ring-1 ring-foreground/10"
                              : "border-border/60 bg-card hover:border-border hover:shadow-sm"
                          )}
                        >
                          {/* Illustration — clickable to toggle */}
                          <button
                            onClick={() => toggle(pattern.id)}
                            className={cn(
                              "w-full h-32 flex items-center justify-center border-b overflow-hidden transition-colors cursor-pointer",
                              isSelected
                                ? "bg-secondary border-foreground/10"
                                : "bg-muted/20 border-border/40"
                            )}
                          >
                            <div className="scale-110 group-hover:scale-[1.15] transition-transform duration-200 pointer-events-none">
                              {illustration}
                            </div>
                          </button>

                          {/* Content */}
                          <button
                            onClick={() => toggle(pattern.id)}
                            className="w-full text-left p-3 cursor-pointer"
                          >
                            <div className="flex items-start gap-2.5">
                              <div
                                className={cn(
                                  "mt-0.5 h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-all",
                                  isSelected
                                    ? "border-foreground bg-foreground"
                                    : "border-border group-hover:border-foreground/30"
                                )}
                              >
                                {isSelected && (
                                  <Check className="h-2.5 w-2.5 text-background" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-sm font-medium text-foreground truncate flex items-center gap-1.5">
                                  {pattern.title}
                                  {pattern.badges?.includes("new") && (
                                    <span className="text-[9px] font-semibold px-1 py-px rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider shrink-0">
                                      New
                                    </span>
                                  )}
                                  {pattern.badges?.includes("popular") && (
                                    <span className="text-[9px] font-semibold px-1 py-px rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 uppercase tracking-wider shrink-0">
                                      Popular
                                    </span>
                                  )}
                                </span>
                                <p className="text-[12px] text-muted-foreground leading-relaxed mt-0.5 line-clamp-1">
                                  {pattern.description}
                                </p>
                              </div>
                            </div>
                          </button>

                          {/* Footer: meta + view link */}
                          <div className="px-3 pb-2.5 flex items-center justify-between pl-9">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-muted-foreground/40 uppercase tracking-wider">
                                {pattern.difficulty}
                              </span>
                              <span className="text-muted-foreground/20">·</span>
                              <span className="text-[10px] text-muted-foreground/40 tabular-nums">
                                {pattern.fileCount} files
                              </span>
                            </div>
                            <Link
                              href={`/patterns/${pattern.id}`}
                              target="_blank"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-[11px] text-muted-foreground/40 hover:text-foreground transition-colors"
                            >
                              View
                              <ExternalLink className="h-2.5 w-2.5" />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right — Sticky panel: output + download */}
        <div className="lg:sticky lg:top-20 h-fit">
          <div className="flex flex-col rounded-lg border border-border/60 bg-card overflow-hidden">
            {/* Panel header with actions */}
            <div className="px-4 py-3 border-b border-border/60 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Output</span>
                  {composedFiles.length > 0 && (
                    <span className="text-[11px] text-muted-foreground tabular-nums">
                      · {composedFiles.length} files · {totalFileSize}
                    </span>
                  )}
                </div>
                {selected.size > 0 && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={copyFiles}
                      title="Copy all files"
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    >
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
                    </button>
                    <button
                      onClick={copyPrompt}
                      title="Copy prompt for Claude, Cursor, Windsurf"
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    >
                      {promptCopied ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 text-[#D97757]">
                          <path d="m3.127 10.604 3.135-1.76.053-.153-.053-.085H6.11l-.525-.032-1.791-.048-1.554-.065-1.505-.08-.38-.081L0 7.832l.036-.234.32-.214.455.04 1.009.069 1.513.105 1.097.064 1.626.17h.259l.036-.105-.089-.065-.068-.064-1.566-1.062-1.695-1.121-.887-.646-.48-.327-.243-.306-.104-.67.435-.48.585.04.15.04.593.456 1.267.981 1.654 1.218.242.202.097-.068.012-.049-.109-.181-.9-1.626-.96-1.655-.428-.686-.113-.411a2 2 0 0 1-.068-.484l.496-.674L4.446 0l.662.089.279.242.411.94.666 1.48 1.033 2.014.302.597.162.553.06.17h.105v-.097l.085-1.134.157-1.392.154-1.792.052-.504.25-.605.497-.327.387.186.319.456-.045.294-.19 1.23-.37 1.93-.243 1.29h.142l.161-.16.654-.868 1.097-1.372.484-.545.565-.601.363-.287h.686l.505.751-.226.775-.707.895-.585.759-.839 1.13-.524.904.048.072.125-.012 1.897-.403 1.024-.186 1.223-.21.553.258.06.263-.218.536-1.307.323-1.533.307-2.284.54-.028.02.032.04 1.029.098.44.024h1.077l2.005.15.525.346.315.424-.053.323-.807.411-3.631-.863-.872-.218h-.12v.073l.726.71 1.331 1.202 1.667 1.55.084.383-.214.302-.226-.032-1.464-1.101-.565-.497-1.28-1.077h-.084v.113l.295.432 1.557 2.34.08.718-.112.234-.404.141-.444-.08-.911-1.28-.94-1.44-.759-1.291-.093.053-.448 4.821-.21.246-.484.186-.403-.307-.214-.496.214-.98.258-1.28.21-1.016.19-1.263.112-.42-.008-.028-.092.012-.953 1.307-1.448 1.957-1.146 1.227-.274.109-.477-.247.045-.44.266-.39 1.586-2.018.956-1.25.617-.723-.004-.105h-.036l-4.212 2.736-.75.096-.324-.302.04-.496.154-.162 1.267-.871z" />
                        </svg>
                      )}
                      <span className="hidden sm:inline">{promptCopied ? "Copied" : "Prompt"}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Scrollable content area — capped height */}
            <div className="max-h-[320px] overflow-y-auto">
              {composedFiles.length === 0 ? (
                <div className="p-10 text-center">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-muted/50 mb-4">
                    <Package className="h-5 w-5 text-muted-foreground/30" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    No patterns selected
                  </p>
                  <p className="text-xs text-muted-foreground/50">
                    Pick patterns to preview the generated project
                  </p>
                </div>
              ) : (
                <div className="py-1.5">
                  {/* Selected chips */}
                  <div className="px-3 py-2 flex flex-wrap gap-1.5 border-b border-border/40">
                    {selectedPatterns.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => toggle(p.id)}
                        className="group inline-flex items-center gap-1 px-2 py-0.5 rounded bg-secondary text-[11px] font-medium text-foreground/80 hover:bg-destructive/10 hover:text-destructive transition-colors"
                      >
                        {p.title}
                        <span className="text-muted-foreground/40 group-hover:text-destructive">
                          ×
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* File tree */}
                  {sortedFolders.map((folder) => {
                    const files = tree[folder];
                    const isRoot = folder === "root";
                    const isOpen = isRoot || expandedFolders.has(folder);

                    return (
                      <div key={folder}>
                        {!isRoot && (
                          <button
                            onClick={() =>
                              setExpandedFolders((prev) => {
                                const next = new Set(prev);
                                if (next.has(folder)) next.delete(folder);
                                else next.add(folder);
                                return next;
                              })
                            }
                            className="w-full flex items-center gap-2 px-3 py-1 text-[13px] font-medium text-foreground/80 hover:bg-secondary/30 transition-colors"
                          >
                            <ChevronDown
                              className={cn(
                                "h-3 w-3 text-muted-foreground/40 transition-transform",
                                !isOpen && "-rotate-90"
                              )}
                            />
                            <FolderOpen className="h-3.5 w-3.5 text-muted-foreground/50" />
                            <span className="font-mono">{folder}/</span>
                            <span className="text-[10px] text-muted-foreground/30 ml-auto tabular-nums">
                              {files.length}
                            </span>
                          </button>
                        )}
                        {isOpen &&
                          files.map((fileName) => {
                            const ext = getExt(fileName);
                            return (
                              <div
                                key={`${folder}/${fileName}`}
                                className={cn(
                                  "flex items-center gap-2 py-1 text-[12px] font-mono text-muted-foreground",
                                  isRoot ? "px-3" : "px-3 pl-9"
                                )}
                              >
                                <File
                                  className={cn(
                                    "h-3 w-3 shrink-0",
                                    extColor[ext] || "text-muted-foreground/30"
                                  )}
                                />
                                <span className="truncate">{fileName}</span>
                                <span className="text-[10px] text-muted-foreground/25 ml-auto shrink-0 uppercase">
                                  {ext}
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* What's included — always visible */}
            {selected.size > 0 && (
              <div className="px-4 py-3 border-t border-border/60 bg-card/80 shrink-0">
                <div className="grid grid-cols-2 gap-1.5 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Check className="h-2.5 w-2.5 text-foreground/40" />
                    Shared model config
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="h-2.5 w-2.5 text-foreground/40" />
                    Merged dependencies
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="h-2.5 w-2.5 text-foreground/40" />
                    Route per pattern
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="h-2.5 w-2.5 text-foreground/40" />
                    .env + README
                  </span>
                </div>
              </div>
            )}

            {/* Download button — always at the bottom, never scrolls */}
            <div className="p-3 border-t border-border/60 bg-card shrink-0">
              <button
                onClick={handleDownload}
                disabled={selected.size === 0 || downloading}
                className={cn(
                  "w-full flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-all duration-200",
                  selected.size > 0
                    ? "bg-foreground text-background hover:bg-foreground/90 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                {downloading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    Generating...
                  </>
                ) : selected.size === 0 ? (
                  "Select patterns to compose"
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download{" "}
                    {selected.size === 1 ? "Pattern" : `${selected.size} Patterns`}
                    <ArrowRight className="h-3.5 w-3.5 ml-0.5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {selected.size === 0 && (
            <p className="text-xs text-center text-muted-foreground/40 mt-3">
              1 pattern = standalone download · multiple = composed app
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
