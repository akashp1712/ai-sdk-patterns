"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Copy,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

function CodeBlock({ filename, children }: { filename: string; children: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="my-6 rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between bg-zinc-900 dark:bg-zinc-950 px-4 py-2.5 border-b border-border">
        <span className="text-[13px] font-mono text-zinc-400">{filename}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-[12px] text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 bg-zinc-950 text-[13px] leading-6 text-zinc-300">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-lg border-l-4 border-border bg-muted/40 px-5 py-4 text-[14px] leading-relaxed text-foreground/80">
      {children}
    </div>
  );
}

function SectionNav({ sections, activeId, onSelect }: { sections: Section[]; activeId: string; onSelect: (id: string) => void }) {
  return (
    <nav className="hidden xl:block fixed top-28 right-8 w-52">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        On this page
      </p>
      <ul className="space-y-1.5">
        {sections.map((s) => (
          <li key={s.id}>
            <button
              onClick={() => {
                onSelect(s.id);
                document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={cn(
                "block text-[13px] leading-snug transition-colors text-left",
                activeId === s.id
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {s.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const SECTIONS: Section[] = [
  {
    id: "what-is-harness",
    title: "What is Harness?",
    content: null,
  },
  {
    id: "setup",
    title: "Setup",
    content: null,
  },
  {
    id: "modes",
    title: "Modes",
    content: null,
  },
  {
    id: "tools-and-permissions",
    title: "Tools & Permissions",
    content: null,
  },
  {
    id: "memory",
    title: "Memory & State",
    content: null,
  },
  {
    id: "human-in-the-loop",
    title: "Human-in-the-Loop",
    content: null,
  },
  {
    id: "subagents",
    title: "Subagents",
    content: null,
  },
  {
    id: "full-example",
    title: "Full Example",
    content: null,
  },
];

export function HarnessClient() {
  const [activeSection, setActiveSection] = useState("what-is-harness");

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 xl:py-16">
      <SectionNav sections={SECTIONS} activeId={activeSection} onSelect={setActiveSection} />

      {/* Title */}
      <div className="mb-12">
        <p className="text-sm font-medium text-muted-foreground mb-2">Guide</p>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Building Agents with Harness
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          The Mastra <code className="text-[15px] px-1.5 py-0.5 rounded bg-muted font-mono">Harness</code> class
          orchestrates multiple agent modes, shared state, memory, and storage into a
          single runtime. Think of it as the control layer between your UI and your agents.
        </p>
      </div>

      {/* What is Harness */}
      <section id="what-is-harness" className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">What is Harness?</h2>
        <p className="text-[15px] leading-7 text-foreground/80 mb-4">
          A plain <code className="px-1 py-0.5 rounded bg-muted font-mono text-[13px]">Agent</code> handles
          one conversation in one mode. The <code className="px-1 py-0.5 rounded bg-muted font-mono text-[13px]">Harness</code> wraps
          multiple agents and adds what production apps need:
        </p>
        <ul className="text-[15px] leading-7 text-foreground/80 space-y-2 ml-5 list-disc">
          <li><strong>Modes</strong> — switch between "plan," "build," "research" agents mid-conversation</li>
          <li><strong>Shared state</strong> — validated with a schema, persisted across sessions</li>
          <li><strong>Thread management</strong> — create, switch, list conversation threads</li>
          <li><strong>Tool approvals</strong> — human-in-the-loop for dangerous operations</li>
          <li><strong>Permissions</strong> — grant/deny tool categories per session</li>
          <li><strong>Subagents</strong> — spawn focused agents that fork the parent context</li>
          <li><strong>Observational memory</strong> — background consolidation of conversation history</li>
        </ul>

        <Callout>
          <strong>When to use Harness vs Agent:</strong> Use <code className="font-mono text-[13px]">Agent</code> for
          simple single-turn or chat use cases. Use <code className="font-mono text-[13px]">Harness</code> when
          you need modes, persistent threads, tool approvals, or subagent delegation.
        </Callout>
      </section>

      {/* Setup */}
      <section id="setup" className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Setup</h2>
        <p className="text-[15px] leading-7 text-foreground/80 mb-4">
          Install the packages:
        </p>
        <CodeBlock filename="terminal">
{`pnpm add @mastra/core @mastra/memory @mastra/libsql`}
        </CodeBlock>
        <p className="text-[15px] leading-7 text-foreground/80 mb-4">
          Create your first harness with a single mode:
        </p>
        <CodeBlock filename="src/mastra/harness.ts">
{`import { Harness } from '@mastra/core/harness';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';

const storage = new LibSQLStore({
  url: process.env.DATABASE_URL ?? 'file:./local.db',
});

const memory = new Memory({
  storage,
  options: {
    lastMessages: 30,
    workingMemory: { enabled: true },
  },
});

const planAgent = new Agent({
  id: 'plan',
  name: 'Planner',
  instructions: 'You break down tasks into clear steps.',
  model: 'openai/gpt-4o-mini',
});

const buildAgent = new Agent({
  id: 'build',
  name: 'Builder',
  instructions: 'You implement code based on a plan.',
  model: 'openai/gpt-4o-mini',
});

export const harness = new Harness({
  modes: [
    { id: 'plan', agent: planAgent, default: true },
    { id: 'build', agent: buildAgent },
  ],
  storage,
  memory,
});`}
        </CodeBlock>
      </section>

      {/* Modes */}
      <section id="modes" className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Modes</h2>
        <p className="text-[15px] leading-7 text-foreground/80 mb-4">
          Modes are agent configurations the harness can switch between. Each mode has its own
          agent with distinct instructions, tools, and model. The user (or your UI) triggers switches.
        </p>
        <CodeBlock filename="src/app/api/chat/route.ts">
{`import { harness } from '@/mastra/harness';

export async function POST(req: Request) {
  const { message, threadId, mode } = await req.json();

  await harness.init();
  await harness.selectOrCreateThread(threadId);

  // Switch mode if requested
  if (mode) {
    await harness.switchMode({ modeId: mode });
  }

  const response = await harness.sendMessage({ content: message });
  return Response.json({ text: response.text });
}`}
        </CodeBlock>
        <p className="text-[15px] leading-7 text-foreground/80">
          The harness preserves conversation context across mode switches — the builder
          agent sees what the planner discussed.
        </p>
      </section>

      {/* Tools & Permissions */}
      <section id="tools-and-permissions" className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Tools &amp; Permissions</h2>
        <p className="text-[15px] leading-7 text-foreground/80 mb-4">
          Register tools globally (available to all modes) or per-mode. The permission system
          controls which tools run automatically vs. which need user approval.
        </p>
        <CodeBlock filename="src/mastra/harness.ts">
{`import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

const fileTool = createTool({
  id: 'write-file',
  description: 'Write content to a file',
  inputSchema: z.object({
    path: z.string(),
    content: z.string(),
  }),
  outputSchema: z.object({ success: z.boolean() }),
  execute: async (inputData) => {
    // In production: write to workspace filesystem
    console.log(\`Writing \${inputData.path}\`);
    return { success: true };
  },
});

export const harness = new Harness({
  modes: [
    { id: 'plan', agent: planAgent, default: true },
    { id: 'build', agent: buildAgent },
  ],
  tools: { fileTool },
  storage,
  memory,
});

// After init, set permission policies:
// await harness.grantSessionCategory({ category: 'read' });
// await harness.setPermissionForTool({ toolId: 'write-file', policy: 'ask' });`}
        </CodeBlock>
        <p className="text-[15px] leading-7 text-foreground/80">
          When a tool has <code className="px-1 py-0.5 rounded bg-muted font-mono text-[13px]">policy: &apos;ask&apos;</code>,
          the harness pauses execution and emits an approval event. Your UI presents the request,
          the user approves/denies, and you call <code className="px-1 py-0.5 rounded bg-muted font-mono text-[13px]">respondToToolApproval()</code>.
        </p>
      </section>

      {/* Memory & State */}
      <section id="memory" className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Memory &amp; State</h2>
        <p className="text-[15px] leading-7 text-foreground/80 mb-4">
          The harness manages two persistence layers: <strong>memory</strong> (conversation history,
          semantic recall, working memory) and <strong>state</strong> (application-level data like
          current model, user preferences).
        </p>
        <CodeBlock filename="src/mastra/harness.ts">
{`import { toJsonSchema } from 'zod-to-json-schema';

const stateSchema = toJsonSchema(z.object({
  currentModelId: z.string().default('openai/gpt-4o-mini'),
  projectName: z.string().default('untitled'),
  lastActivity: z.string().optional(),
}));

export const harness = new Harness({
  modes: [
    { id: 'plan', agent: planAgent, default: true },
    { id: 'build', agent: buildAgent },
  ],
  storage,
  memory,
  stateSchema,
});

// Read/write state:
// const state = await harness.getState();
// await harness.setState({ projectName: 'my-agent' });`}
        </CodeBlock>

        <Callout>
          <strong>Observational Memory:</strong> The harness can run a background observer that
          consolidates long message histories into dense observations. Enable it
          with <code className="font-mono text-[13px]">observationalMemory: {'{ enabled: true }'}</code> in
          the memory config. This keeps the context window lean as conversations grow.
        </Callout>
      </section>

      {/* Human-in-the-Loop */}
      <section id="human-in-the-loop" className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Human-in-the-Loop</h2>
        <p className="text-[15px] leading-7 text-foreground/80 mb-4">
          Three interaction points where the harness pauses for human input:
        </p>
        <ol className="text-[15px] leading-7 text-foreground/80 space-y-3 ml-5 list-decimal mb-6">
          <li><strong>Tool approvals</strong> — agent wants to run a guarded tool, user approves/denies</li>
          <li><strong>Questions</strong> — agent uses <code className="font-mono text-[13px]">ask_user</code> tool, user answers</li>
          <li><strong>Plan approvals</strong> — agent submits a plan, user approves before execution</li>
        </ol>
        <CodeBlock filename="src/app/api/approve/route.ts">
{`import { harness } from '@/mastra/harness';

export async function POST(req: Request) {
  const { type, id, decision, answer } = await req.json();

  switch (type) {
    case 'tool':
      await harness.respondToToolApproval({
        toolCallId: id,
        decision, // 'approve' | 'deny'
      });
      break;

    case 'question':
      await harness.respondToQuestion({
        questionId: id,
        answer,
      });
      break;

    case 'plan':
      await harness.respondToPlanApproval({
        planId: id,
        decision,
      });
      break;
  }

  return Response.json({ ok: true });
}`}
        </CodeBlock>
      </section>

      {/* Subagents */}
      <section id="subagents" className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Subagents</h2>
        <p className="text-[15px] leading-7 text-foreground/80 mb-4">
          Spawn focused agents for specific subtasks. A <strong>forked</strong> subagent
          clones the parent thread so it has full conversation context — and preserves
          prompt-cache hits.
        </p>
        <CodeBlock filename="src/mastra/harness.ts">
{`const researchSubagent = new Agent({
  id: 'research-sub',
  name: 'Researcher',
  instructions: 'You research topics using web search. Return facts only.',
  model: 'openai/gpt-4o-mini',
  tools: { searchTool },
});

export const harness = new Harness({
  modes: [
    { id: 'plan', agent: planAgent, default: true },
    { id: 'build', agent: buildAgent },
  ],
  subagents: [
    {
      agent: researchSubagent,
      forked: true, // inherits parent conversation context
    },
  ],
  tools: { fileTool },
  storage,
  memory,
});`}
        </CodeBlock>
        <p className="text-[15px] leading-7 text-foreground/80">
          The main agent can delegate to a subagent by calling a tool — or your UI can
          explicitly dispatch to one. Forked subagent threads are hidden
          from <code className="px-1 py-0.5 rounded bg-muted font-mono text-[13px]">listThreads()</code> by
          default to keep the thread list clean.
        </p>
      </section>

      {/* Full Example */}
      <section id="full-example" className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Full Example</h2>
        <p className="text-[15px] leading-7 text-foreground/80 mb-4">
          Putting it all together — a harness with two modes, tools with permissions,
          memory, state, and a subagent:
        </p>
        <CodeBlock filename="src/mastra/harness.ts">
{`import { Harness } from '@mastra/core/harness';
import { Agent } from '@mastra/core/agent';
import { createTool } from '@mastra/core/tools';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { z } from 'zod';
import { toJsonSchema } from 'zod-to-json-schema';

// Storage
const storage = new LibSQLStore({
  url: process.env.DATABASE_URL ?? 'file:./local.db',
});

// Memory with observational memory
const memory = new Memory({
  storage,
  options: {
    lastMessages: 30,
    workingMemory: { enabled: true },
    semanticRecall: { topK: 5 },
    observationalMemory: { enabled: true, consolidateAfter: 25 },
  },
});

// Tools
const searchTool = createTool({
  id: 'web-search',
  description: 'Search the web',
  inputSchema: z.object({ query: z.string() }),
  outputSchema: z.object({ results: z.string() }),
  execute: async (inputData) => {
    const res = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: inputData.query,
        max_results: 5,
        api_key: process.env.TAVILY_API_KEY,
      }),
    });
    const data = await res.json();
    return {
      results: (data.results ?? [])
        .map((r: { title: string; content: string }) =>
          \`- \${r.title}: \${r.content?.slice(0, 200)}\`)
        .join('\\n'),
    };
  },
});

const fileTool = createTool({
  id: 'write-file',
  description: 'Write a file to the project',
  inputSchema: z.object({ path: z.string(), content: z.string() }),
  outputSchema: z.object({ success: z.boolean() }),
  execute: async (inputData) => {
    // workspace write in production
    return { success: true };
  },
});

// Agents
const planner = new Agent({
  id: 'plan',
  name: 'Planner',
  instructions: \`You are a planning agent. Break tasks into clear steps.
Never write code directly — delegate to the builder.\`,
  model: 'openai/gpt-4o-mini',
});

const builder = new Agent({
  id: 'build',
  name: 'Builder',
  instructions: \`You implement code. Use write-file to create files.
Follow the plan from the planner. Be precise.\`,
  model: 'openai/gpt-4o-mini',
});

const researcher = new Agent({
  id: 'research-sub',
  name: 'Researcher',
  instructions: 'Research topics. Return concise facts with sources.',
  model: 'openai/gpt-4o-mini',
  tools: { searchTool },
});

// State schema
const stateSchema = toJsonSchema(z.object({
  currentModelId: z.string().default('openai/gpt-4o-mini'),
  projectName: z.string().default('untitled'),
}));

// Harness
export const harness = new Harness({
  modes: [
    { id: 'plan', agent: planner, default: true },
    { id: 'build', agent: builder },
  ],
  subagents: [
    { agent: researcher, forked: true },
  ],
  tools: { fileTool },
  storage,
  memory,
  stateSchema,
});`}
        </CodeBlock>

        <CodeBlock filename="src/app/api/chat/route.ts">
{`import { harness } from '@/mastra/harness';

export async function POST(req: Request) {
  const { message, threadId, mode } = await req.json();

  await harness.init();
  await harness.selectOrCreateThread(threadId ?? 'default');

  if (mode) await harness.switchMode({ modeId: mode });

  // Grant read tools auto-approval, require ask for writes
  await harness.grantSessionCategory({ category: 'read' });
  await harness.setPermissionForTool({ toolId: 'write-file', policy: 'ask' });

  const response = await harness.sendMessage({ content: message });
  return Response.json({
    text: response.text,
    mode: harness.getCurrentModeId(),
  });
}`}
        </CodeBlock>
      </section>

      {/* Next steps */}
      <section className="mb-8 rounded-xl border border-border bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-emerald-500/5 p-6">
        <h3 className="text-lg font-semibold mb-2">Next steps</h3>
        <ul className="text-[14px] leading-7 text-foreground/80 space-y-2">
          <li className="flex items-start gap-2">
            <ArrowRight className="h-4 w-4 mt-1 shrink-0 text-muted-foreground" />
            <span>Browse the <Link href="/mastra" className="underline underline-offset-4 font-medium">Mastra Patterns</Link> for copy-paste implementations</span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="h-4 w-4 mt-1 shrink-0 text-muted-foreground" />
            <span>Read the <a href="https://mastra.ai/reference/harness/harness-class" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 font-medium">Harness API Reference</a> for all methods</span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="h-4 w-4 mt-1 shrink-0 text-muted-foreground" />
            <span>Use <Link href="/compose" className="underline underline-offset-4 font-medium">Compose</Link> to bundle patterns into a deployable project</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
