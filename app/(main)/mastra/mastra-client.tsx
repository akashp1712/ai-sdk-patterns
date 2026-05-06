"use client";

import Link from "next/link";
import {
  Bot,
  Wrench,
  Workflow,
  Brain,
  Database,
  Users,
  ArrowRight,
  Terminal,
  ExternalLink,
} from "lucide-react";
import type { PatternMeta } from "@/lib/patterns";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ReactNode> = {
  "mastra-agent-basic": <Bot className="h-5 w-5" />,
  "mastra-tool": <Wrench className="h-5 w-5" />,
  "mastra-workflow": <Workflow className="h-5 w-5" />,
  "mastra-memory": <Brain className="h-5 w-5" />,
  "mastra-rag": <Database className="h-5 w-5" />,
  "mastra-multi-agent": <Users className="h-5 w-5" />,
};

const COLORS: Record<string, string> = {
  "mastra-agent-basic": "text-blue-600/70 dark:text-blue-400/70 bg-blue-500/5",
  "mastra-tool": "text-amber-600/70 dark:text-amber-400/70 bg-amber-500/5",
  "mastra-workflow": "text-purple-600/70 dark:text-purple-400/70 bg-purple-500/5",
  "mastra-memory": "text-pink-600/70 dark:text-pink-400/70 bg-pink-500/5",
  "mastra-rag": "text-emerald-600/70 dark:text-emerald-400/70 bg-emerald-500/5",
  "mastra-multi-agent": "text-orange-600/70 dark:text-orange-400/70 bg-orange-500/5",
};

export function MastraClient({ patterns }: { patterns: PatternMeta[] }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center">
            <Bot className="h-4 w-4 text-background" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Mastra Patterns</h1>
        </div>
        <p className="text-base text-muted-foreground max-w-2xl">
          Production-ready patterns for building AI agents with{" "}
          <a
            href="https://mastra.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
          >
            Mastra
          </a>
          . Each pattern is registry-downloadable — install with one command, customize, deploy.
        </p>
      </div>

      {/* Install hint */}
      <div className="mb-8 rounded-lg border border-border bg-card/50 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Terminal className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Install any pattern</span>
        </div>
        <code className="block text-sm font-mono text-muted-foreground">
          npx shadcn add https://ai-sdk-patterns.dev/r/mastra-agent-basic
        </code>
      </div>

      {/* Pattern grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patterns.map((pattern) => (
          <Link
            key={pattern.id}
            href={`/patterns/${pattern.id}`}
            className="group relative flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all duration-200 hover:border-foreground/20 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20"
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg",
                    COLORS[pattern.id] ?? "text-foreground bg-foreground/10",
                  )}
                >
                  {ICONS[pattern.id] ?? <Bot className="h-5 w-5" />}
                </div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider bg-foreground/[0.04] text-muted-foreground">
                  {pattern.difficulty}
                </span>
              </div>

              <h3 className="text-[15px] font-semibold mb-1.5 group-hover:text-foreground transition-colors">
                {pattern.title}
              </h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                {pattern.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {pattern.tags
                    .filter((t) => t !== "mastra")
                    .slice(0, 3)
                    .map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-foreground/[0.04] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="font-mono">{pattern.files.length} files</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer links */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
        <a
          href="https://mastra.ai/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Mastra Docs
        </a>
        <span className="hidden sm:inline">&middot;</span>
        <Link
          href="/patterns"
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          View all {patterns.length + 16} patterns
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
