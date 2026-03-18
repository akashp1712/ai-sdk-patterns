"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, Code2 } from "lucide-react";
import { CodeViewer } from "@/components/patterns/code-viewer";
import { PatternActions } from "@/components/patterns/pattern-actions";
import { getPatternPreview } from "@/components/patterns/pattern-previews";
import type { PatternMeta } from "@/lib/patterns";

interface PatternDetailProps {
  pattern: PatternMeta;
}

export function PatternDetail({ pattern }: PatternDetailProps) {
  const preview = getPatternPreview(pattern.id);
  const [tab, setTab] = useState<"preview" | "code">(preview ? "preview" : "code");

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
        preview ? (
          preview
        ) : (
          <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
            <div className="h-[520px] flex items-center justify-center">
              <div className="text-center max-w-md px-6">
                <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center mx-auto mb-5">
                  <Eye className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-base font-medium mb-2">Preview Coming Soon</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Download the project and add your provider key
                  to <code className="text-xs bg-foreground/10 px-1 rounded">.env.local</code> to try it locally.
                </p>
              </div>
            </div>
          </div>
        )
      ) : (
        <CodeViewer files={pattern.files} />
      )}
    </div>
  );
}
