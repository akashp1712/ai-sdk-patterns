import { Suspense } from "react";
import { patterns } from "@/lib/patterns";
import { MastraClient } from "./mastra-client";

export const metadata = {
  title: "Mastra Agent Patterns",
  description:
    "Production-ready Mastra agent patterns — agents, tools, workflows, memory, RAG, and multi-agent systems. Each pattern includes full source code, downloadable via CLI.",
  openGraph: {
    title: "Mastra Agent Patterns",
    description:
      "Build AI agents with Mastra. Ready-to-use patterns for agents, tools, workflows, memory, and RAG.",
  },
};

export default function MastraPage() {
  const mastraPatterns = patterns.filter((p) =>
    p.tags.includes("mastra"),
  );

  return (
    <Suspense>
      <MastraClient patterns={mastraPatterns} />
    </Suspense>
  );
}
