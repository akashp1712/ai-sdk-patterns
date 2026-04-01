"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Zap, Blocks, GitBranch, Wrench, ArrowRight,
  Search, Workflow, Code2,
} from "lucide-react";
import type { PatternMeta, PatternCategory } from "@/lib/patterns";
import { getPatternIllustration } from "@/components/patterns/pattern-illustrations";

const validCategories = ["chat", "core", "agents", "tools", "workflows"] as const;

const categories: { id: PatternCategory | "all"; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All Patterns", icon: <Code2 className="h-4 w-4" /> },
  { id: "chat", label: "Chat", icon: <Zap className="h-4 w-4" /> },
  { id: "core", label: "Core / SDK", icon: <Blocks className="h-4 w-4" /> },
  { id: "agents", label: "Agents", icon: <GitBranch className="h-4 w-4" /> },
  { id: "tools", label: "Tools", icon: <Wrench className="h-4 w-4" /> },
  { id: "workflows", label: "Workflows", icon: <Workflow className="h-4 w-4" /> },
];


export function PatternsClient({ patterns }: { patterns: PatternMeta[] }) {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<PatternCategory | "all">("all");
  const [search, setSearch] = useState("");

  // Sync URL params on mount
  useEffect(() => {
    const cat = searchParams.get("category");
    const q = searchParams.get("search");
    if (cat && (validCategories as readonly string[]).includes(cat)) {
      setActiveCategory(cat as PatternCategory);
    }
    if (q) {
      setSearch(q);
    }
  }, [searchParams]);

  const filtered = patterns.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Patterns</h1>
        <p className="text-base text-muted-foreground">
          {activeCategory === "all"
            ? `Browse all ${patterns.length} production-ready patterns`
            : `${filtered.length} patterns in ${activeCategory}`}
        </p>
      </div>

      {/* Mobile category pills */}
      <div className="flex gap-2 overflow-x-auto pb-4 lg:hidden mb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border",
              activeCategory === cat.id
                ? "bg-foreground text-background border-foreground"
                : "bg-card text-muted-foreground border-border hover:text-foreground"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Mobile search */}
      <div className="relative lg:hidden mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search patterns..."
          className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      {/* Pattern grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No patterns found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((pattern) => {
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
                  <div className="flex items-center gap-1.5 mb-1">
                    <h3 className="text-[14px] font-semibold text-foreground group-hover:text-foreground transition-colors">
                      {pattern.title}
                    </h3>
                    {pattern.badges?.includes("new") && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                        New
                      </span>
                    )}
                    {pattern.badges?.includes("popular") && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                        Popular
                      </span>
                    )}
                  </div>
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
      )}
    </div>
  );
}
