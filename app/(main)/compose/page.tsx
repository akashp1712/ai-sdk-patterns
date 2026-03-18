import { patterns } from "@/lib/patterns";
import { ComposeClient } from "./compose-client";

export const metadata = {
  title: "Compose Patterns into a Full App",
  description:
    "Select multiple AI SDK patterns and generate an integrated Next.js application with shared routing, model helpers, and merged dependencies. Download a ready-to-run project.",
  openGraph: {
    title: "Compose AI SDK Patterns into a Full App",
    description:
      "Select patterns, generate an integrated Next.js app. Shared routing, model helpers, merged dependencies — ready to run.",
  },
};

export default function ComposePage() {
  const patternSummaries = patterns.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    category: p.category,
    difficulty: p.difficulty,
    fileCount: p.files.length,
  }));

  return <ComposeClient patterns={patternSummaries} />;
}
