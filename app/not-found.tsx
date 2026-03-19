"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import { ArrowRight } from "lucide-react";
import { getPatternIllustration } from "@/components/patterns/pattern-illustrations";
import { patterns } from "@/lib/patterns";

const suggestedPatterns = [
  "streaming-chat",
  "tool-calling", 
  "structured-output",
  "multi-step-agent"
];

export default function NotFound() {
  const patternList = patterns.filter(p => suggestedPatterns.includes(p.id));

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center gap-8 px-4 text-center">
        <div className="space-y-6 max-w-4xl w-full">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-6xl font-bold tracking-tight text-foreground">404</h1>
            <p className="text-lg text-muted-foreground">
              That pattern doesn't exist. Here are some popular ones you might like:
            </p>
          </div>

          {/* Pattern Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {patternList.map((pattern) => {
              const illustration = getPatternIllustration(pattern.id);
              return (
                <Link
                  key={pattern.id}
                  href={`/patterns/${pattern.id}`}
                  className="group rounded-xl border border-border bg-card overflow-hidden transition-all duration-200 hover:border-border hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20"
                >
                  {illustration && (
                    <div className="h-36 border-b border-border/40 bg-muted/20 flex items-center justify-center overflow-hidden">
                      <div className="scale-110 group-hover:scale-[1.15] transition-transform duration-200 pointer-events-none">
                        {illustration}
                      </div>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-[14px] font-semibold text-foreground group-hover:text-foreground transition-colors mb-1">
                      {pattern.title}
                    </h3>
                    <p className="text-[13px] text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                      {pattern.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-foreground/[0.06] text-foreground">
                          {pattern.category}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-foreground/[0.04] text-muted-foreground">
                          {pattern.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="font-mono">{pattern.files.length} files</span>
                        <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-border">
            <Link
              href="/patterns"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>Browse all patterns</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
