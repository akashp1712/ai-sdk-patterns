"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function HeroCTA({ patternCount }: { patternCount: number }) {
  return (
    <Link href="#patterns">
      <ShimmerButton
        shimmerColor="#a1a1aa"
        shimmerSize="0.05em"
        background="hsl(var(--primary))"
        borderRadius="8px"
        className="text-sm font-medium gap-2 px-5 py-2.5"
      >
        Preview {patternCount} patterns
        <ArrowRight className="h-3.5 w-3.5" />
      </ShimmerButton>
    </Link>
  );
}
