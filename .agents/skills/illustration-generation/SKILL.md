# Skill: Pattern Illustration Generation

Generate SVG-based card illustrations for AI SDK patterns using the project's illustration primitives system. No images — pure CSS/SVG composed from reusable building blocks.

## When to Use

When adding a new pattern to `lib/patterns.ts`, you MUST also:
1. Create an illustration component in `components/patterns/pattern-illustrations.tsx`
2. Register it in the `illustrationMap` at the bottom of that file

## Primitives Reference

All primitives live in `components/ui/illustration-primitives.tsx`. Import what you need:

```tsx
import {
  IllustrationCanvas,  // Centered flex wrapper — ALWAYS wrap your illustration in this
  ChatBubble,          // Chat message bubble (align="left"|"right")
  SkeletonLines,       // Placeholder lines (count, color, pulse, widths)
  NodeCircle,          // Labeled circle — "AI", "1", "2" (color, size="sm"|"md"|"lg")
  FanOutConnector,     // SVG lines fanning from center to N targets
  ArrowConnector,      // Simple → arrow (color, width, height)
  Pill,                // Small labeled pill — "fn()", "✓ Yes" (color, mono)
  MiniCard,            // Bordered card container (className for overrides)
  MiniCode,            // JSON-like code block (lines with key/value/colors)
  StepChain,           // Horizontal 1→2→3 step chain (steps, label)
  MiniSearchBar,       // Search input mockup (color)
  WindowChrome,        // macOS window with traffic light dots
} from "@/components/ui/illustration-primitives";
```

## Available Colors

Type: `AccentColor = "sky" | "emerald" | "amber" | "red" | "cyan" | "rose" | "violet"`

Each color generates four tokens at low opacity:
- `bg-{color}-500/10` — subtle background fill
- `border-{color}-500/20` — subtle border
- `text-{color}-500/60` — readable but muted text
- `bg-{color}-500` — used for skeleton lines at /15 opacity

## Design Rules

1. **Keep it tiny** — illustrations render at h-28 (112px) on pattern cards and h-48 (192px) on feature cards. Everything must be miniature.
2. **Subtlety over flash** — use opacity `/5`, `/10`, `/15`, `/20` ranges. Never use full-strength colors. This is Vercel aesthetic: monochrome first, accents are whispers.
3. **Max 2 accent colors per illustration** — e.g. sky + amber, or emerald only. Too many colors = visual noise.
4. **Font sizes**: `text-[6px]` to `text-[9px]` for labels inside illustrations. Never larger.
5. **No external assets** — everything is divs, spans, and inline SVGs. No `<img>`, no icon libraries inside illustrations.
6. **Represent the concept, not the code** — show what the pattern DOES visually (streaming = typing indicator, tools = fan-out connections, RAG = documents → AI).
7. **One animation max** — use `animate-pulse` on ONE element to draw the eye. Most illustrations are static.
8. **Always use IllustrationCanvas** as the outermost wrapper.
9. **Max width** — constrain content width with `max-w-[130px]` or `max-w-[140px]` to prevent overflow.

## Step-by-Step: Adding a New Pattern Illustration

### 1. Identify the visual metaphor

Ask: "What does this pattern look like if I drew it on a napkin?"

| Pattern Type | Visual Metaphor |
|---|---|
| Chat/streaming | Chat bubbles + typing indicator |
| Data transformation | Input → Arrow → Output |
| Agent/multi-step | Numbered step chain |
| Tool usage | Node → fan-out → function pills |
| Search/retrieval | Search bar + result lines |
| Approval/confirmation | Prompt + Yes/No buttons |
| Pipeline/flow | Boxes → Arrow → Circle |
| Code/structured | Mini JSON block |

### 2. Compose from primitives

```tsx
// Example: A new "file-upload" pattern
export function FileUploadIll() {
  return (
    <IllustrationCanvas>
      <div className="flex items-center gap-1.5">
        <MiniCard className="p-1.5">
          <div className="flex flex-col gap-0.5">
            <Pill color="sky" mono>.pdf</Pill>
            <Pill color="emerald" mono>.csv</Pill>
          </div>
        </MiniCard>
        <ArrowConnector color="sky" />
        <NodeCircle label="AI" color="sky" size="md" />
      </div>
    </IllustrationCanvas>
  );
}
```

### 3. Register it

Add to `illustrationMap` in `components/patterns/pattern-illustrations.tsx`:

```tsx
const illustrationMap: Record<string, React.ReactNode> = {
  // ... existing entries
  "file-upload": <FileUploadIll />,
};
```

### 4. Verify

Run `pnpm build` — illustrations are used in both:
- `app/(main)/pattern-cards.tsx` (homepage, h-28)
- `app/(main)/patterns/patterns-client.tsx` (browse page, h-28)

## Examples: How Existing Illustrations Map to Concepts

| Pattern | Primitives Used | Why |
|---|---|---|
| streaming-chat | `ChatBubble` × 2, `SkeletonLines(pulse)` | Shows real-time typing effect |
| tool-calling | `NodeCircle("AI")`, `FanOutConnector`, `Pill` × 3 | AI dispatching to multiple functions |
| structured-output | `MiniCode` with colored keys/values | Typed JSON output |
| multi-step-agent | `StepChain` with 3 colored steps | Sequential reasoning loop |
| web-search | `MiniSearchBar`, `SkeletonLines` | Search → results |
| human-in-the-loop | `MiniCard` + `Pill("✓ Yes")` + `Pill("✕ No")` | Approval prompt |
| rag-pipeline | Document boxes → `ArrowConnector` → `NodeCircle("AI")` | Docs feeding into model |
| reasoning-display | Nested `MiniCard` with "Thinking..." label | Chain-of-thought visualization |

## Anti-patterns

- Do NOT use `lucide-react` or other icon libraries inside illustrations — use simple SVG or text
- Do NOT make illustrations interactive or clickable
- Do NOT use `motion.div` or animation libraries — just `animate-pulse` from Tailwind
- Do NOT use gradients heavier than `from-{color}/20 to-{color}/20`
- Do NOT hard-code hex colors — always use the AccentColor system or Tailwind tokens
