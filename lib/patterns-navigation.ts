export interface NavItem {
  title: string;
  href: string;
  external?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const patternsNavigation: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/patterns" },
    ],
  },
  {
    title: "Core Patterns",
    items: [
      { title: "Streaming Chat", href: "/patterns/streaming-chat" },
      { title: "Tool Calling", href: "/patterns/tool-calling" },
      { title: "Structured Output", href: "/patterns/structured-output" },
      { title: "Generative UI", href: "/patterns/generative-ui" },
    ],
  },
  {
    title: "Advanced Patterns",
    items: [
      { title: "Multi-Step Agent", href: "/patterns/multi-step-agent" },
      { title: "Multi-Agent", href: "/patterns/multi-agent" },
      { title: "RAG Pipeline", href: "/patterns/rag-pipeline" },
      { title: "Human in the Loop", href: "/patterns/human-in-the-loop" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "AI SDK Docs", href: "https://ai-sdk.dev", external: true },
      { title: "GitHub", href: "https://github.com/akashp1712/ai-sdk-patterns", external: true },
    ],
  },
];

export const allPatternsPages = patternsNavigation.flatMap((section) => section.items);
