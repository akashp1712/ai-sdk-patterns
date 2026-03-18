import { patterns, type PatternMeta } from "./patterns";

interface ComposedFile {
  path: string;
  content: string;
}

export function composePatterns(patternIds: string[]): ComposedFile[] {
  const selected = patternIds
    .map((id) => patterns.find((p) => p.id === id))
    .filter(Boolean) as PatternMeta[];

  if (selected.length === 0) return [];

  const files: ComposedFile[] = [];

  // 1. package.json — merged deps
  files.push({
    path: "package.json",
    content: generatePackageJson(selected),
  });

  // 2. Shared model helper
  files.push({
    path: "lib/model.ts",
    content: `import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";

export function getModel(id?: string) {
  const modelId =
    id || process.env.DEFAULT_MODEL || "anthropic:claude-sonnet-4-5";
  const [provider, ...rest] = modelId.split(":");
  const model = rest.join(":");

  switch (provider) {
    case "anthropic":
      return anthropic(model);
    case "openai":
      return openai(model);
    case "google":
      return google(model);
    default:
      return anthropic(model);
  }
}`,
  });

  // 3. Root layout
  files.push({
    path: "app/layout.tsx",
    content: generateLayout(selected),
  });

  // 4. Root page with navigation
  files.push({
    path: "app/page.tsx",
    content: generateHomePage(selected),
  });

  // 5. globals.css
  files.push({
    path: "app/globals.css",
    content: `@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: Arial, Helvetica, sans-serif;
}
`,
  });

  // 6. Each pattern gets its own route group
  for (const pattern of selected) {
    const slug = pattern.id;

    for (const file of pattern.files) {
      // Remap paths: app/page.tsx → app/[slug]/page.tsx
      // but API routes stay as app/api/[slug-specific]/route.ts
      let remappedPath = file.path;

      if (file.path === "app/page.tsx") {
        remappedPath = `app/${slug}/page.tsx`;
      } else if (file.path.startsWith("app/api/")) {
        // Namespace API routes under the pattern slug to avoid collisions
        const apiSubPath = file.path.replace("app/api/", "");
        remappedPath = `app/api/${slug}/${apiSubPath}`;
      } else if (file.path.startsWith("app/")) {
        remappedPath = `app/${slug}/${file.path.replace("app/", "")}`;
      } else if (file.path === "lib/model.ts") {
        // Already added as shared
        continue;
      } else if (file.path.startsWith("lib/")) {
        remappedPath = file.path;
      } else {
        remappedPath = `${slug}/${file.path}`;
      }

      // Fix API route references in page files
      let content = file.content;
      if (file.path === "app/page.tsx") {
        // Update API endpoint references if the pattern uses a custom API path
        // Most patterns use /api/chat or /api/generate which we keep as-is
      }

      files.push({ path: remappedPath, content });
    }
  }

  // 7. .env.local template
  files.push({
    path: ".env.local",
    content: `# Add your API key for your preferred provider
# The DEFAULT_MODEL format is "provider:model-name"
DEFAULT_MODEL=anthropic:claude-sonnet-4-5

ANTHROPIC_API_KEY=sk-ant-...
# OPENAI_API_KEY=sk-...
# GOOGLE_GENERATIVE_AI_API_KEY=...
${selected.some((p) => p.id === "web-search") ? "\n# For web search pattern\n# TAVILY_API_KEY=tvly-...\n" : ""}`,
  });

  // 8. README
  files.push({
    path: "README.md",
    content: generateReadme(selected),
  });

  // 9. tsconfig.json
  files.push({
    path: "tsconfig.json",
    content: JSON.stringify(
      {
        compilerOptions: {
          target: "ES2017",
          lib: ["dom", "dom.iterable", "esnext"],
          allowJs: true,
          skipLibCheck: true,
          strict: true,
          noEmit: true,
          esModuleInterop: true,
          module: "esnext",
          moduleResolution: "bundler",
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: "preserve",
          incremental: true,
          plugins: [{ name: "next" }],
          paths: { "@/*": ["./*"] },
        },
        include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
        exclude: ["node_modules"],
      },
      null,
      2
    ),
  });

  // 10. postcss.config.mjs
  files.push({
    path: "postcss.config.mjs",
    content: `const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
`,
  });

  // 11. next.config.ts
  files.push({
    path: "next.config.ts",
    content: `import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
`,
  });

  return files;
}

function generatePackageJson(selected: PatternMeta[]): string {
  const deps: Record<string, string> = {
    ai: "^6.0.0",
    "@ai-sdk/anthropic": "^3.0.0",
    "@ai-sdk/openai": "^2.0.0",
    "@ai-sdk/google": "^1.0.0",
    "@ai-sdk/react": "^2.0.0",
    next: "^16.0.0",
    react: "^19.0.0",
    "react-dom": "^19.0.0",
    zod: "^4.0.0",
  };

  // Add pattern-specific deps

  const name = selected.length === 1
    ? `ai-sdk-${selected[0].id}`
    : `ai-sdk-composed-${selected.map((p) => p.id.split("-")[0]).join("-")}`;

  return JSON.stringify(
    {
      name,
      version: "0.1.0",
      private: true,
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
      },
      dependencies: deps,
      devDependencies: {
        typescript: "^5.0.0",
        "@types/react": "^19.0.0",
        "@types/node": "^22.0.0",
        tailwindcss: "^4.0.0",
        "@tailwindcss/postcss": "^4.0.0",
      },
    },
    null,
    2
  );
}

function generateLayout(selected: PatternMeta[]): string {
  return `import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI SDK Composed App",
  description: "Generated from AI SDK Patterns: ${selected.map((p) => p.title).join(", ")}",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}`;
}

function generateHomePage(selected: PatternMeta[]): string {
  const links = selected
    .map(
      (p) =>
        `          <a
            key="${p.id}"
            href="/${p.id}"
            className="group block rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 transition-all hover:border-neutral-700 hover:bg-neutral-900"
          >
            <h2 className="text-lg font-semibold mb-2">${p.title}</h2>
            <p className="text-sm text-neutral-400">${p.description}</p>
            <span className="mt-3 inline-flex items-center text-xs text-neutral-500 group-hover:text-neutral-300">
              Open pattern →
            </span>
          </a>`
    )
    .join("\n");

  return `export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          AI SDK Composed App
        </h1>
        <p className="text-neutral-400">
          This app was generated from ${selected.length} AI SDK patterns.
          Each pattern is a working example you can customize.
        </p>
      </div>
      <div className="grid gap-4">
${links}
      </div>
      <div className="mt-12 pt-8 border-t border-neutral-800 text-xs text-neutral-500">
        <p>Generated by AI SDK Patterns — ${process.env.NEXT_PUBLIC_SITE_URL || "https://ai-sdk-patterns.vercel.app"}</p>
      </div>
    </div>
  );
}`;
}

function generateReadme(selected: PatternMeta[]): string {
  const patternList = selected
    .map((p) => `- **${p.title}** — ${p.description}`)
    .join("\n");

  return `# AI SDK Composed App

This application was generated by [AI SDK Patterns](https://${process.env.NEXT_PUBLIC_SITE_URL || "https://ai-sdk-patterns.vercel.app"}) by composing ${selected.length} patterns.

## Included Patterns

${patternList}

## Getting Started

1. Install dependencies:
   \`\`\`bash
   pnpm install
   \`\`\`

2. Set up your environment:
   \`\`\`bash
   cp .env.local.example .env.local
   # Add your API keys
   \`\`\`

3. Run the development server:
   \`\`\`bash
   pnpm dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000)

## Provider Support

This app is provider-agnostic. Set \`DEFAULT_MODEL\` in \`.env.local\`:

- \`anthropic:claude-sonnet-4-5\` (default)
- \`openai:gpt-4o\`
- \`google:gemini-2.0-flash\`

## Learn More

- [AI SDK Documentation](https://ai-sdk.dev)
- [AI SDK Patterns](https://${process.env.NEXT_PUBLIC_SITE_URL || "https://ai-sdk-patterns.vercel.app"})
`;
}
