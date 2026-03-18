"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Zap, Blocks, GitBranch, Wrench, Workflow,
} from "lucide-react";
import type { PatternMeta, PatternCategory } from "@/lib/patterns";

const categoryMeta: Record<PatternCategory, { label: string; icon: React.ReactNode }> = {
  core: { label: "Core / SDK", icon: <Blocks className="h-4 w-4" /> },
  chat: { label: "Chat", icon: <Zap className="h-4 w-4" /> },
  agents: { label: "Agents", icon: <GitBranch className="h-4 w-4" /> },
  tools: { label: "Tools", icon: <Wrench className="h-4 w-4" /> },
  workflows: { label: "Workflows", icon: <Workflow className="h-4 w-4" /> },
};

const categoryOrder: PatternCategory[] = ["core", "chat", "agents", "tools", "workflows"];

export function PatternsSidebar({ patterns }: { patterns: PatternMeta[] }) {
  const pathname = usePathname();

  const grouped = categoryOrder
    .map((cat) => ({
      category: cat,
      ...categoryMeta[cat],
      items: patterns.filter((p) => p.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <aside className="w-56 shrink-0 hidden lg:block border-r border-border/60 pr-8">
      <nav className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-10">
        <Link
          href="/patterns"
          className={cn(
            "block px-3 py-2 rounded-md text-[13px] font-medium transition-colors",
            pathname === "/patterns"
              ? "text-foreground bg-secondary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          All Patterns
        </Link>

        <div className="mt-6 space-y-6">
          {grouped.map((group) => (
            <div key={group.category}>
              <div className="flex items-center gap-2.5 px-3 mb-2">
                <span className="text-foreground/70">{group.icon}</span>
                <h3 className="text-sm font-semibold text-foreground tracking-tight">
                  {group.label}
                </h3>
                <span className="text-[11px] text-muted-foreground/50 ml-auto tabular-nums">
                  {group.items.length}
                </span>
              </div>
              <ul className="space-y-px">
                {group.items.map((pattern) => {
                  const href = `/patterns/${pattern.id}`;
                  const isActive = pathname === href;
                  return (
                    <li key={pattern.id}>
                      <Link
                        href={href}
                        className={cn(
                          "block px-3 py-1.5 rounded-md text-[13px] transition-colors truncate",
                          isActive
                            ? "text-foreground bg-secondary font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                        )}
                      >
                        {pattern.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}
