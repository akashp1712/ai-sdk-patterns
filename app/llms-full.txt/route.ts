import { patterns } from "@/lib/patterns";

export const dynamic = "force-static";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ai-sdk-patterns.dev";

export async function GET() {
  const header = `# AI SDK Patterns — full source

Every pattern's source code inlined for LLM context.
Generated from ${BASE_URL}/r — keep in sync via the registry endpoint.

`;

  const blocks = patterns
    .map((p) => {
      const fileBlocks = p.files
        .map(
          (f) =>
            `#### \`${f.path}\`\n\n\`\`\`${f.lang}\n${f.content}\n\`\`\``,
        )
        .join("\n\n");

      return `---

## ${p.title} (\`${p.id}\`)

${p.description}

- Category: ${p.category}
- Difficulty: ${p.difficulty}
- Tags: ${p.tags.join(", ")}
- Install: \`npx shadcn add ${BASE_URL}/r/${p.id}\`
- Details: ${BASE_URL}/patterns/${p.id}

### Files

${fileBlocks}
`;
    })
    .join("\n");

  return new Response(header + blocks, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
