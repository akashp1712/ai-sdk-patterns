import { patterns } from "@/lib/patterns";

export const dynamic = "force-static";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ai-sdk-patterns.dev";

const CATEGORY_ORDER = ["core", "chat", "agents", "tools", "workflows"] as const;
const CATEGORY_LABEL: Record<(typeof CATEGORY_ORDER)[number], string> = {
  core: "Core",
  chat: "Chat",
  agents: "Agents",
  tools: "Tools",
  workflows: "Workflows",
};

export async function GET() {
  const byCategory = Object.fromEntries(
    CATEGORY_ORDER.map((c) => [c, patterns.filter((p) => p.category === c)]),
  ) as Record<(typeof CATEGORY_ORDER)[number], typeof patterns>;

  const sections = CATEGORY_ORDER.filter((c) => byCategory[c].length > 0)
    .map((c) => {
      const items = byCategory[c]
        .map(
          (p) =>
            `- ${p.id}: ${p.description}\n  - Difficulty: ${p.difficulty}\n  - Install: npx shadcn add ${BASE_URL}/r/${p.id}\n  - Details: ${BASE_URL}/patterns/${p.id}`,
        )
        .join("\n\n");
      return `### ${CATEGORY_LABEL[c]}\n\n${items}`;
    })
    .join("\n\n");

  const body = `# AI SDK Patterns

> Production-ready patterns for building AI applications with the Vercel AI SDK v6.

## About

${patterns.length} full-stack patterns for chat, tool calling, agent loops, RAG, MCP, and workflows. Each pattern is a complete Next.js app (API route + React UI) you can install, download, or copy.

- Website: ${BASE_URL}
- GitHub: https://github.com/akashp1712/ai-sdk-patterns
- Stack: Next.js 16, AI SDK v6, React 19, shadcn/ui, Tailwind CSS v4
- Providers: Anthropic Claude, OpenAI, Google Gemini (swap via DEFAULT_MODEL)

## Install a pattern

\`\`\`
npx shadcn add ${BASE_URL}/r/<pattern-id>
\`\`\`

## Registry index

One JSON with every pattern's metadata and registry URL:

\`\`\`
GET ${BASE_URL}/r
\`\`\`

Per-pattern shadcn-compatible endpoint:

\`\`\`
GET ${BASE_URL}/r/<pattern-id>
\`\`\`

## Full context

Every file of every pattern inlined in one document (for LLM context):

\`\`\`
GET ${BASE_URL}/llms-full.txt
\`\`\`

## Patterns

${sections}

## Composition Engine

Select multiple patterns and generate an integrated Next.js app with shared routing, model helpers, and merged dependencies.

- URL: ${BASE_URL}/compose

## Key APIs

- streamText, generateText, generateObject, streamObject, streamUI
- tool() + Zod input schemas; stopWhen + stepCountIs for multi-step agents
- @ai-sdk/react: useChat, DefaultChatTransport
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
