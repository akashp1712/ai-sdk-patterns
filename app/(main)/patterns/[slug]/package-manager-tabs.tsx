"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface PackageManagerTabsProps {
  patternId: string;
}

export function PackageManagerTabs({ patternId }: PackageManagerTabsProps) {
  const [activeTab, setActiveTab] = useState("pnpm");
  
  // MagicUI exact commands for each package manager
  const commands = {
    pnpm: `pnpm dlx shadcn@latest add ${process.env.NEXT_PUBLIC_SITE_URL || "https://ai-sdk-patterns.vercel.app"}/r/${patternId}`,
    npm: `npx shadcn@latest add ${process.env.NEXT_PUBLIC_SITE_URL || "https://ai-sdk-patterns.vercel.app"}/r/${patternId}`,
    yarn: `yarn shadcn@latest add ${process.env.NEXT_PUBLIC_SITE_URL || "https://ai-sdk-patterns.vercel.app"}/r/${patternId}`,
    bun: `bunx --bun shadcn@latest add ${process.env.NEXT_PUBLIC_SITE_URL || "https://ai-sdk-patterns.vercel.app"}/r/${patternId}`
  };

  const packageManagers = [
    { id: "pnpm", name: "pnpm" },
    { id: "npm", name: "npm" },
    { id: "yarn", name: "yarn" },
    { id: "bun", name: "bun" }
  ];

  return (
    <div className="space-y-3">
      <div className="flex gap-1 p-1 rounded-lg bg-secondary/50 w-fit">
        {packageManagers.map((pm) => (
          <button
            key={pm.id}
            onClick={() => setActiveTab(pm.id)}
            className={cn(
              "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
              activeTab === pm.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {pm.name}
          </button>
        ))}
      </div>
      <div className="border border-border rounded-lg p-4 font-mono text-sm flex items-center justify-between bg-muted/30 overflow-hidden">
        <span 
          className="text-foreground truncate" 
          title={commands[activeTab as keyof typeof commands]}
        >
          {commands[activeTab as keyof typeof commands]}
        </span>
        <button
          onClick={() => navigator.clipboard.writeText(commands[activeTab as keyof typeof commands])}
          className="shrink-0 rounded border border-border/60 bg-background hover:bg-muted/80 p-2 text-muted-foreground hover:text-foreground transition-all duration-200 ml-2"
          title="Copy command"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
