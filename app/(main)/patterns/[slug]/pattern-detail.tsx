"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, Code2 } from "lucide-react";
import { CodeViewer } from "@/components/patterns/code-viewer";
import { PatternActions } from "@/components/patterns/pattern-actions";
import { InteractivePreview } from "@/components/patterns/interactive-preview";
import type { PatternMeta } from "@/lib/patterns";

interface PatternDetailProps {
  pattern: PatternMeta;
}

export function PatternDetail({ pattern }: PatternDetailProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary/50">
          <button
            onClick={() => setTab("preview")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
              tab === "preview"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Eye className="h-4 w-4" />
            Preview
          </button>
          <button
            onClick={() => setTab("code")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
              tab === "code"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Code2 className="h-4 w-4" />
            Code
          </button>
        </div>
        <PatternActions pattern={pattern} />
      </div>

      {/* Content */}
      {tab === "preview" ? (
        <InteractivePreview pattern={pattern} />
      ) : (
        <CodeViewer files={pattern.files} />
      )}
    </div>
  );
}
