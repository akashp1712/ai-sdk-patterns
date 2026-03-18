import { Suspense } from "react";
import { patterns } from "@/lib/patterns";
import { PatternsClient } from "./patterns-client";

export const metadata = {
  title: "Browse All Patterns",
  description:
    "Browse 23+ production-ready AI SDK patterns for streaming chat, tool calling, agents, RAG, structured output, workflows, and more. Each pattern includes full Next.js source code — copy, download, or install via CLI.",
  openGraph: {
    title: "Browse All AI SDK Patterns",
    description:
      "23+ full-stack patterns for building AI apps with the Vercel AI SDK. Streaming, agents, tool calling, RAG, and more.",
  },
};

export default function PatternsPage() {
  return (
    <Suspense>
      <PatternsClient patterns={patterns} />
    </Suspense>
  );
}
