"use client";

import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";

export function HeroGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <InteractiveGridPattern
        width={40}
        height={40}
        squares={[40, 20]}
        className="opacity-30 dark:opacity-20 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_20%,transparent_100%)]"
        squaresClassName="hover:fill-foreground/10 transition-colors duration-500"
      />
    </div>
  );
}
