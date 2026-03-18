import { NextResponse } from "next/server";
import { patterns } from "@/lib/patterns";

// Registry index — lists all available patterns
// GET /r
// Force static: pre-render at build time, zero serverless cost
export const dynamic = "force-static";

export async function GET() {
  const items = patterns.map((p) => ({
    name: p.id,
    type: "registry:block",
    title: p.title,
    description: p.description,
    category: p.category,
    difficulty: p.difficulty,
    tags: p.tags,
    files: p.files.length,
    registryUrl: `/r/${p.id}`,
  }));

  return NextResponse.json({
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "ai-sdk-patterns",
    description: "Production-ready AI SDK patterns registry",
    items,
  });
}
