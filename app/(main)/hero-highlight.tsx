"use client";

import { Highlighter } from "@/components/ui/highlighter";

export function HeroHighlight({ children }: { children: React.ReactNode }) {
  return (
    <Highlighter
      action="underline"
      color="hsl(var(--foreground))"
      strokeWidth={2}
      animationDuration={800}
      iterations={1}
      isView
    >
      {children}
    </Highlighter>
  );
}
