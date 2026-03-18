"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Zap,
  Blocks,
  GitBranch,
  Wrench,
  Workflow,
  Layers,
  Code2,
  Search,
} from "lucide-react";

interface PatternEntry {
  id: string;
  title: string;
  description: string;
  category: string;
}

const categoryIcons: Record<string, React.ReactNode> = {
  chat: <Zap className="h-4 w-4 text-muted-foreground" />,
  core: <Blocks className="h-4 w-4 text-muted-foreground" />,
  agents: <GitBranch className="h-4 w-4 text-muted-foreground" />,
  tools: <Wrench className="h-4 w-4 text-muted-foreground" />,
  workflows: <Workflow className="h-4 w-4 text-muted-foreground" />,
};

const pages = [
  { title: "Browse Patterns", href: "/patterns", icon: <Search className="h-4 w-4 text-muted-foreground" /> },
  { title: "Composition Engine", href: "/compose", icon: <Layers className="h-4 w-4 text-muted-foreground" /> },
];

export function CommandSearch({ patterns }: { patterns: PatternEntry[] }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  // Group patterns by category
  const grouped = patterns.reduce<Record<string, PatternEntry[]>>((acc, p) => {
    (acc[p.category] ??= []).push(p);
    return acc;
  }, {});

  return (
    <>
      {/* Trigger button for header */}
      <button
        onClick={() => setOpen(true)}
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/60 bg-card text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden md:inline">Search...</span>
        <kbd className="hidden md:inline-flex items-center gap-0.5 ml-2 text-[10px] font-mono text-muted-foreground/60 bg-secondary px-1.5 py-0.5 rounded">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search patterns, pages..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Pages">
            {pages.map((page) => (
              <CommandItem
                key={page.href}
                onSelect={() => navigate(page.href)}
                className="gap-3"
              >
                {page.icon}
                {page.title}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {Object.entries(grouped).map(([category, items]) => (
            <CommandGroup key={category} heading={category.charAt(0).toUpperCase() + category.slice(1)}>
              {items.map((pattern) => (
                <CommandItem
                  key={pattern.id}
                  onSelect={() => navigate(`/patterns/${pattern.id}`)}
                  className="gap-3"
                >
                  {categoryIcons[pattern.category] ?? <Code2 className="h-4 w-4 text-muted-foreground" />}
                  <div className="flex flex-col">
                    <span>{pattern.title}</span>
                    <span className="text-xs text-muted-foreground line-clamp-1">{pattern.description}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
