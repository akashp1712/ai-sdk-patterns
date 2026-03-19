# AGENTS.md

> Instructions for AI agents (Claude Code, Cursor, Windsurf, Copilot, etc.) working on this codebase.

## Project Overview

AI SDK Patterns is an open-source collection of 23+ composable AI SDK v6 patterns. Users can browse, install via shadcn CLI, download as ZIP, or compose multiple patterns into a single integrated Next.js app.

**Live site**: ai-sdk-patterns.vercel.app

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **AI SDK v6** (`ai`, `@ai-sdk/react`, `@ai-sdk/anthropic`, `@ai-sdk/openai`, `@ai-sdk/google`)
- **shadcn/ui** (new-york style, Zinc palette)
- **Tailwind CSS v4** with `@tailwindcss/postcss`
- **Geist** fonts (Sans + Mono)
- **Shiki** for syntax highlighting
- **JSZip** for client-side ZIP generation
- **TypeScript** strict mode

## Architecture

```
app/
  (main)/              # Main layout group (header + footer)
    page.tsx           # Landing page
    patterns/          # Browse patterns
      [slug]/          # Pattern detail (preview + code)
    compose/           # Composer — select patterns, generate app
  r/                   # shadcn registry API
    [name]/route.ts    # Per-pattern JSON endpoint (statically pre-rendered)
  api/                 # AI routes (disabled by default via proxy.ts)

lib/
  patterns.ts          # ALL 23 pattern definitions with inline source code
  pattern-use-cases.ts # Pattern-specific use cases data and utilities
  compose.ts           # Composition engine — merges patterns into one app
  model.ts             # AI model helper for provider-agnostic usage
  patterns-navigation.ts # Navigation data for patterns page
  utils.ts             # cn() utility

components/
  patterns/            # Pattern-related components (actions, illustrations, code viewer, interactive previews)
  ui/                  # shadcn/ui components
  header.tsx           # Site header with nav + Cmd+K search
  command-search.tsx   # Cmd+K search dialog

proxy.ts               # Edge proxy — blocks AI routes unless ENABLE_AI_ROUTES=true
scripts/
  validate-patterns.ts # Extracts and type-checks all patterns as standalone apps
```

## Key Files

- **`lib/patterns.ts`** — The single source of truth for all patterns. Each pattern is an object with `id`, `title`, `description`, `category`, `difficulty`, `tags`, `files[]`, and `relatedPatterns[]`. File content is stored as template literal strings.
- **`lib/compose.ts`** — Takes pattern IDs, generates a complete Next.js app with shared routing, merged dependencies, model helper, Tailwind config, and README.
- **`app/r/[name]/route.ts`** — Serves patterns as shadcn-compatible registry JSON. Statically pre-rendered at build time.
- **`proxy.ts`** — Edge proxy that returns 503 for `/api/chat` and `/api/generate` unless `ENABLE_AI_ROUTES=true`. This keeps the app static and avoids serverless costs.

## Critical Rules

### Pattern Source Code in Template Literals
All pattern file content lives inside template literals in `lib/patterns.ts`. When editing pattern code:
- Backticks inside pattern content MUST be escaped: `` \` ``
- Dollar signs in template expressions MUST be escaped: `\${}`
- Do NOT double-escape (e.g., `\\\``) — that causes parse errors in downloaded files
- Run `pnpm validate` after any pattern changes to catch escaping issues

### AI SDK v6 Compatibility
- Use `@ai-sdk/react` for client hooks (`useChat`, `useObject`, `useCompletion`)
- Use `ai` for server functions (`streamText`, `generateText`, `generateObject`, `tool`)
- Do NOT use `ai/rsc` — it was removed in AI SDK v4
- Do NOT use `experimental_useObject` — it's now stable as `useObject`
- The `tool()` helper uses `parameters` (not `inputSchema`)
- Use `toUIMessageStreamResponse()` for routes consumed by `useChat`

### Provider Agnostic
- Never hardcode a specific AI provider
- Always use `getModel()` from `lib/model.ts`
- Support Anthropic, OpenAI, and Google via `DEFAULT_MODEL` env var
- Format: `provider:model-name` (e.g., `anthropic:claude-sonnet-4-5`)

### Static-First Architecture
- The site runs as a fully static app — no API keys needed to browse
- Registry routes (`/r/*`) are pre-rendered as static JSON
- AI routes are blocked by default via `proxy.ts`
- All pages use `loading.tsx` skeletons for smooth navigation
- Do NOT add features that require server-side API keys to browse patterns

### Design System
- Monochrome only — no colored accents in functional UI
- Dark-first design (`#09090b` background)
- Vercel aesthetic: Geist fonts, generous spacing, subtle borders
- Use shadcn/ui components, not custom alternatives
- Animations should be subtle (fade, scale) — no flashy effects

## Commands

```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Production build (validates all 80 routes)
pnpm validate     # Type-check all 23 patterns as standalone apps
pnpm lint         # ESLint
```

## Adding a New Pattern

1. Add the pattern object to `lib/patterns.ts` following the existing structure
2. Include all files needed: `app/page.tsx`, `app/api/.../route.ts`, any components
3. Add a static preview component in `components/patterns/pattern-previews.tsx`
4. Add an illustration in `components/patterns/pattern-illustrations.tsx`
5. Run `pnpm validate` to verify the pattern type-checks
6. Run `pnpm build` to verify all routes render

## Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=https://ai-sdk-patterns.vercel.app  # Required for registry URLs
ENABLE_AI_ROUTES=true                                      # Optional: enable AI API routes
DEFAULT_MODEL=anthropic:claude-sonnet-4-5                  # Optional: default AI model
ANTHROPIC_API_KEY=                                         # Optional: for live AI routes
OPENAI_API_KEY=                                            # Optional: for live AI routes
GOOGLE_GENERATIVE_AI_API_KEY=                              # Optional: for live AI routes
```

## Recent UI/UX Enhancements

### Pattern Details Page Improvements (March 2026)
- **Enhanced Use Cases**: Added pattern-specific use cases for all 23 patterns with practical real-world applications
- **Package Manager Tabs**: Implemented tabbed interface with distinct commands for pnpm, npm, yarn, bun
- **Visible Copy Buttons**: Always-visible copy buttons with proper borders and styling
- **CLI Command Fix**: Fixed command wrapping with truncate and tooltip for full command display
- **Clean Layout**: Removed redundant right sidebar for better focus
- **Installation Options**: Clear "Option 1: Install via CLI" and "Option 2: Copy or Download" structure
- **Hydration Fix**: Moved `suppressHydrationWarning` from `<html>` to `<body>` element
- **Code Organization**: Refactored use cases to separate `lib/pattern-use-cases.ts` file

### Design System
- **AI SDK Documentation Style**: Clean borders, proper spacing, monochrome aesthetic
- **Responsive Design**: Mobile-first approach with desktop enhancements
- **Accessibility**: Proper semantic HTML and ARIA support
- **Performance**: Optimized loading states and smooth transitions

## Common Pitfalls

| Pitfall | Solution |
|---|---|
| Template literal escaping in patterns.ts | Use `\`` and `\${}`, never `\\\`` — run `pnpm validate` |
| Missing deps in composed app | Add to `generatePackageJson()` in `lib/compose.ts` |
| Missing deps in registry install | Update `buildDependencies()` in `app/r/[name]/route.ts` |
| `input.trim()` crash on undefined | Always use `input?.trim()` with useChat |
| API route 503 errors | Set `ENABLE_AI_ROUTES=true` in `.env.local` |
| OG images 404 | Next.js adds hash suffix — use meta tags, not direct URLs |
| `middleware.ts` deprecation | Next.js 16 uses `proxy.ts` with `proxy()` function |