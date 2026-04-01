import { NextResponse } from "next/server";
import { patterns, type PatternMeta } from "@/lib/patterns";

function buildDependencies(pattern: PatternMeta): string[] {
  const deps = [
    "ai",
    "@ai-sdk/anthropic",
    "@ai-sdk/openai",
    "@ai-sdk/google",
    "@ai-sdk/react",
  ];

  const allContent = pattern.files.map((f) => f.content).join("\n");

  if (allContent.includes('from "zod"')) deps.push("zod");
  if (allContent.includes('from "lucide-react"')) deps.push("lucide-react");
  if (allContent.includes('from "better-sqlite3"')) deps.push("better-sqlite3");
  if (allContent.includes('@modelcontextprotocol/sdk')) {
    deps.push("@modelcontextprotocol/sdk");
  }

  return deps;
}

// shadcn registry-compatible JSON endpoint
// Usage: npx shadcn add <SITE_URL>/r/streaming-chat

// Pre-render all pattern routes at build time — zero serverless cost
export const dynamic = "force-static";

export function generateStaticParams() {
  return patterns.map((p) => ({ name: p.id }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const pattern = patterns.find((p) => p.id === name);

  if (!pattern) {
    return NextResponse.json(
      { error: `Pattern "${name}" not found` },
      { status: 404 }
    );
  }

  // Map pattern files to shadcn registry format
  const registryFiles = pattern.files.map((file) => ({
    path: file.path,
    target: file.path,
    content: file.content,
    type: "registry:file" as const,
  }));

  // Build shadcn-compatible registry item response
  const registryItem = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: pattern.id,
    type: "registry:block",
    title: pattern.title,
    description: pattern.description,
    dependencies: buildDependencies(pattern),
    files: registryFiles,
    meta: {
      category: pattern.category,
      difficulty: pattern.difficulty,
      tags: pattern.tags,
    },
  };

  return NextResponse.json(registryItem);
}
