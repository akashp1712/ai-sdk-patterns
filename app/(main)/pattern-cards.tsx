"use client";

import Link from "next/link";
import { ArrowRight, Blocks, Code2, Zap, GitBranch, Wrench, Workflow } from "lucide-react";
import { getPatternIllustration } from "@/components/patterns/pattern-illustrations";

interface PatternSummary {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  fileCount: number;
}

const categoryIcons: Record<string, React.ReactNode> = {
  chat: <Zap className="h-4 w-4" />,
  core: <Blocks className="h-4 w-4" />,
  agents: <GitBranch className="h-4 w-4" />,
  tools: <Wrench className="h-4 w-4" />,
  workflows: <Workflow className="h-4 w-4" />,
};


export function PatternCards({ patterns }: { patterns: PatternSummary[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {patterns.map((pattern) => {
        const illustration = getPatternIllustration(pattern.id);
        return (
          <Link
            key={pattern.id}
            href={`/patterns/${pattern.id}`}
            className="group rounded-xl border border-border/60 bg-card overflow-hidden transition-all duration-200 hover:border-border hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20 hover:-translate-y-0.5 flex flex-col"
          >
            {/* Illustration area */}
            {illustration && (
              <div className="h-28 border-b border-border/30 bg-background/50 px-4 py-3">
                {illustration}
              </div>
            )}
            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-muted-foreground/60">
                  {categoryIcons[pattern.category] ?? <Code2 className="h-4 w-4" />}
                </span>
                <h3 className="text-[15px] font-semibold text-foreground transition-colors flex-1">
                  {pattern.title}
                </h3>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">
                {pattern.description}
              </p>
              <div className="flex items-center gap-1.5">
                <span className="text-xs px-2 py-0.5 rounded-md bg-foreground/[0.06] text-foreground font-medium">
                  {pattern.category}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-foreground/[0.04] text-muted-foreground">
                  {pattern.difficulty}
                </span>
                <span className="text-xs text-muted-foreground font-mono ml-auto">
                  {pattern.fileCount} files
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
