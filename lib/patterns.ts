export type PatternCategory = "chat" | "core" | "agents" | "workflows" | "tools";
export type PatternDifficulty = "beginner" | "intermediate" | "advanced";

export interface PatternFile {
  path: string;
  content: string;
  lang: "typescript" | "tsx";
}

export interface PatternMeta {
  id: string;
  title: string;
  description: string;
  category: PatternCategory;
  difficulty: PatternDifficulty;
  tags: string[];
  files: PatternFile[];
  relatedPatterns: string[];
}

export const patterns: PatternMeta[] = [
  {
    id: "streaming-chat",
    title: "Streaming Chat",
    description:
      "Stream text responses from AI models in real-time using streamText and the useChat hook.",
    category: "chat",
    difficulty: "beginner",
    tags: ["streaming", "chat", "useChat", "streamText"],
    relatedPatterns: ["structured-output", "tool-calling"],
    files: [
      {
        path: "app/page.tsx",
        lang: "tsx",
        content: `"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input?.trim()) return;
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-20">
            Send a message to start the conversation.
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={\`flex \${message.role === "user" ? "justify-end" : "justify-start"}\`}
          >
            <div
              className={\`max-w-[80%] rounded-lg px-4 py-2 text-sm \${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }\`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2 text-sm text-muted-foreground">
              Thinking...
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !input?.trim()}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}`,
      },
      {
        path: "app/api/chat/route.ts",
        lang: "typescript",
        content: `import { streamText } from "ai";
import { getModel } from "@/lib/model";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: getModel(),
    messages,
  });

  return result.toUIMessageStreamResponse();
}`,
      },
      {
        path: "lib/model.ts",
        lang: "typescript",
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
      },
    ],
  },
  {
    id: "structured-output",
    title: "Structured Output",
    description:
      "Generate typed, validated JSON data using Zod schemas and the generateObject function.",
    category: "core",
    difficulty: "beginner",
    tags: ["structured-output", "zod", "generateObject", "schema"],
    relatedPatterns: ["streaming-chat", "tool-calling"],
    files: [
      {
        path: "app/page.tsx",
        lang: "tsx",
        content: `"use client";

import { useState } from "react";

interface Recipe {
  name: string;
  ingredients: { name: string; amount: string }[];
  steps: string[];
}

export default function StructuredOutputPage() {
  const [topic, setTopic] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setRecipe(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      if (!res.ok) throw new Error("Failed to generate");

      const data = await res.json();
      setRecipe(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a dish name..."
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={loading || !topic.trim()}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Recipe"}
        </button>
      </form>

      {recipe && (
        <div className="rounded-lg border p-6 space-y-4">
          <h2 className="text-xl font-semibold">{recipe.name}</h2>
          <div>
            <h3 className="font-medium mb-2">Ingredients</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>
                  {ing.amount} {ing.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Steps</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              {recipe.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}`,
      },
      {
        path: "app/api/generate/route.ts",
        lang: "typescript",
        content: `import { generateText, Output } from "ai";
import { z } from "zod";
import { getModel } from "@/lib/model";

const recipeSchema = z.object({
  name: z.string().describe("The name of the recipe"),
  ingredients: z.array(
    z.object({
      name: z.string(),
      amount: z.string(),
    })
  ),
  steps: z.array(z.string()).describe("Step-by-step cooking instructions"),
});

export async function POST(req: Request) {
  const { topic } = await req.json();

  const { output } = await generateText({
    model: getModel(),
    output: Output.object({ schema: recipeSchema }),
    prompt: \`Generate a recipe for: \${topic}\`,
  });

  return Response.json(output);
}`,
      },
    ],
  },
  {
    id: "tool-calling",
    title: "Tool Calling",
    description:
      "Let the AI model call functions and use external tools with the multi-step tool loop.",
    category: "agents",
    difficulty: "intermediate",
    tags: ["tools", "function-calling", "agent", "multi-step"],
    relatedPatterns: ["streaming-chat", "multi-step-agent"],
    files: [
      {
        path: "app/page.tsx",
        lang: "tsx",
        content: `"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, isToolUIPart } from "ai";
import { useState } from "react";

export default function ToolCallingPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input?.trim()) return;
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-20">
            <p>Try asking about the weather or doing calculations.</p>
            <p className="text-xs mt-2">
              e.g. &quot;What&apos;s the weather in Tokyo?&quot; or &quot;Calculate 42 * 17&quot;
            </p>
          </div>
        )}
        {messages.map((message) => (
          <div key={message.id} className="space-y-2">
            <div
              className={\`flex \${message.role === "user" ? "justify-end" : "justify-start"}\`}
            >
              <div
                className={\`max-w-[80%] rounded-lg px-4 py-2 text-sm \${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }\`}
              >
                {message.content}
              </div>
            </div>
            {message.parts?.map((part, i) => {
              if (isToolUIPart(part)) {
                return (
                  <div
                    key={i}
                    className="ml-2 rounded border px-3 py-2 text-xs text-muted-foreground font-mono"
                  >
                    <span className="font-medium">Tool: {part.toolName}</span>
                    {part.state === "output-available" && (
                      <pre className="mt-1 whitespace-pre-wrap">
                        {JSON.stringify(part.output, null, 2)}
                      </pre>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2 text-sm text-muted-foreground">
              Thinking...
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about weather or math..."
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !input?.trim()}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}`,
      },
      {
        path: "app/api/chat/route.ts",
        lang: "typescript",
        content: `import { streamText, tool, stepCountIs } from "ai";
import { z } from "zod";
import { getModel } from "@/lib/model";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: getModel(),
    messages,
    tools: {
      weather: tool({
        description: "Get the current weather for a location",
        inputSchema: z.object({
          location: z.string().describe("The city name"),
        }),
        execute: async ({ location }) => {
          // Simulated weather data
          const conditions = ["sunny", "cloudy", "rainy", "snowy"];
          const temp = Math.floor(Math.random() * 30) + 5;
          return {
            location,
            temperature: \`\${temp}°C\`,
            condition: conditions[Math.floor(Math.random() * conditions.length)],
          };
        },
      }),
      calculator: tool({
        description: "Perform a mathematical calculation",
        inputSchema: z.object({
          expression: z.string().describe("The math expression to evaluate"),
        }),
        execute: async ({ expression }) => {
          try {
            // Simple safe eval for basic math
            const result = Function(\`"use strict"; return (\${expression})\`)();
            return { expression, result: String(result) };
          } catch {
            return { expression, error: "Invalid expression" };
          }
        },
      }),
    },
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}`,
      },
    ],
  },
  {
    id: "generative-ui",
    title: "Generative UI",
    description:
      "Render dynamic React components from AI tool calls using streamText and useChat.",
    category: "core",
    difficulty: "intermediate",
    tags: ["generative-ui", "tool-calling", "react", "useChat"],
    relatedPatterns: ["streaming-chat", "tool-calling"],
    files: [
      {
        path: "app/page.tsx",
        lang: "tsx",
        content: `"use client";

import { useChat } from "@ai-sdk/react";

function WeatherCard({ city, temp, condition }: { city: string; temp: number; condition: string }) {
  return (
    <div className="rounded-lg border p-4 space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{city}</h3>
        <span className="text-2xl font-bold">{temp}°C</span>
      </div>
      <p className="text-sm text-muted-foreground capitalize">{condition}</p>
    </div>
  );
}

function StockCard({ symbol, price, change }: { symbol: string; price: number; change: number }) {
  return (
    <div className="rounded-lg border p-4 space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-mono font-medium">{symbol}</h3>
        <span className="text-2xl font-bold">\${price.toFixed(2)}</span>
      </div>
      <p className={\`text-sm \${change >= 0 ? "text-green-500" : "text-red-500"}\`}>
        {change >= 0 ? "+" : ""}{change.toFixed(2)}%
      </p>
    </div>
  );
}

function ToolResult({ name, args }: { name: string; args: Record<string, unknown> }) {
  switch (name) {
    case "showWeather":
      return <WeatherCard city={args.city as string} temp={args.temp as number} condition={args.condition as string} />;
    case "showStock":
      return <StockCard symbol={args.symbol as string} price={args.price as number} change={args.change as number} />;
    default:
      return <pre className="text-xs bg-muted p-2 rounded">{JSON.stringify(args, null, 2)}</pre>;
  }
}

export default function GenerativeUIPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/generative-ui/chat",
  });

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-20">
            <p>Ask for a UI component and it will be streamed to you.</p>
            <p className="text-xs mt-2">e.g. &quot;Show me a weather card for Tokyo&quot;</p>
          </div>
        )}
        {messages.map((message) => (
          <div key={message.id} className={\`flex \${message.role === "user" ? "justify-end" : "justify-start"}\`}>
            <div className={\`max-w-[80%] rounded-lg px-4 py-2 text-sm \${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}\`}>
              {message.parts?.map((part, i) => {
                if (part.type === "text") return <span key={i}>{part.text}</span>;
                if (part.type === "tool-invocation") {
                  return <ToolResult key={i} name={part.toolInvocation.toolName} args={part.toolInvocation.args} />;
                }
                return null;
              }) ?? message.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4 flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask for a UI component..."
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !input?.trim()}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}`,
      },
      {
        path: "app/api/generative-ui/chat/route.ts",
        lang: "tsx",
        content: `import { streamText, tool } from "ai";
import { z } from "zod";
import { getModel } from "@/lib/model";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: getModel(),
    system:
      "You are a helpful assistant that can show weather and stock data using UI components. " +
      "When asked about weather, use the showWeather tool. When asked about stocks, use the showStock tool.",
    messages,
    tools: {
      showWeather: tool({
        description: "Show a weather card for a city",
        parameters: z.object({
          city: z.string(),
          temp: z.number(),
          condition: z.string(),
        }),
      }),
      showStock: tool({
        description: "Show a stock price card",
        parameters: z.object({
          symbol: z.string(),
          price: z.number(),
          change: z.number(),
        }),
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}`,
      },
    ],
  },
  {
    id: "multi-step-agent",
    title: "Multi-Step Agent",
    description:
      "Build an agent that orchestrates multiple tool calls in sequence, using the AI SDK's maxSteps and automatic tool result forwarding.",
    category: "agents",
    difficulty: "advanced",
    tags: ["agent", "multi-step", "orchestration", "maxSteps"],
    relatedPatterns: ["tool-calling", "human-in-the-loop"],
    files: [
      {
        path: "app/page.tsx",
        lang: "tsx",
        content: `"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, isToolUIPart } from "ai";
import { useState } from "react";

export default function MultiStepAgentPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading } = useChat({
    transport: new DefaultChatTransport({ api: "/api/agent" }),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input?.trim()) return;
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-20">
            <p className="font-medium">Multi-Step Agent</p>
            <p className="text-xs mt-2">
              Ask complex questions that require multiple steps.
            </p>
            <p className="text-xs mt-1 text-muted-foreground/60">
              e.g. &quot;Research the weather in Tokyo and New York, then compare them&quot;
            </p>
          </div>
        )}
        {messages.map((message) => (
          <div key={message.id} className="space-y-2">
            <div
              className={\`flex \${message.role === "user" ? "justify-end" : "justify-start"}\`}
            >
              <div
                className={\`max-w-[80%] rounded-lg px-4 py-2 text-sm \${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }\`}
              >
                {message.content}
              </div>
            </div>
            {message.parts?.map((part, i) => {
              if (isToolUIPart(part)) {
                return (
                  <div
                    key={i}
                    className="ml-2 rounded border border-border/60 px-3 py-2 text-xs font-mono"
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span className="font-medium text-muted-foreground">
                        {part.toolName}
                      </span>
                      <span className="text-muted-foreground/50">
                        Step {i + 1}
                      </span>
                    </div>
                    {part.state === "output-available" && (
                      <pre className="mt-1.5 whitespace-pre-wrap text-muted-foreground/70 text-[11px]">
                        {JSON.stringify(part.output, null, 2)}
                      </pre>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2 text-sm text-muted-foreground animate-pulse">
              Agent working...
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a multi-step question..."
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !input?.trim()}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}`,
      },
      {
        path: "app/api/agent/route.ts",
        lang: "typescript",
        content: `import { streamText, tool, stepCountIs } from "ai";
import { z } from "zod";
import { getModel } from "@/lib/model";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: getModel(),
    system: \`You are a research assistant. Use the available tools to gather
information step by step, then synthesize a final answer. Always explain
your reasoning and which tools you're using.\`,
    messages,
    tools: {
      searchWeb: tool({
        description: "Search the web for information on a topic",
        inputSchema: z.object({
          query: z.string().describe("The search query"),
        }),
        execute: async ({ query }) => {
          // Simulated search results
          return {
            query,
            results: [
              { title: \`Latest info about \${query}\`, snippet: \`Comprehensive overview of \${query} with recent data and analysis.\` },
              { title: \`\${query} - In Depth\`, snippet: \`Detailed exploration of \${query} covering key aspects and trends.\` },
            ],
          };
        },
      }),
      getWeather: tool({
        description: "Get current weather for a location",
        inputSchema: z.object({
          location: z.string().describe("City name"),
        }),
        execute: async ({ location }) => {
          const temp = Math.floor(Math.random() * 35) + 5;
          const conditions = ["sunny", "partly cloudy", "overcast", "rainy"];
          return {
            location,
            temperature: \`\${temp}°C\`,
            condition: conditions[Math.floor(Math.random() * conditions.length)],
            humidity: \`\${Math.floor(Math.random() * 40) + 40}%\`,
          };
        },
      }),
      calculate: tool({
        description: "Perform a calculation",
        inputSchema: z.object({
          expression: z.string().describe("Math expression"),
        }),
        execute: async ({ expression }) => {
          try {
            const result = Function(\`"use strict"; return (\${expression})\`)();
            return { expression, result: String(result) };
          } catch {
            return { expression, error: "Invalid expression" };
          }
        },
      }),
    },
    stopWhen: stepCountIs(10), // Allow up to 10 tool calls in sequence
  });

  return result.toUIMessageStreamResponse();
}`,
      },
      {
        path: "lib/model.ts",
        lang: "typescript",
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
      },
    ],
  },
  {
    id: "web-search",
    title: "Web Search Agent",
    description:
      "Integrate third-party search APIs (Tavily, Exa) with the AI SDK to build a grounded search agent with source citations.",
    category: "tools",
    difficulty: "intermediate",
    tags: ["search", "tavily", "exa", "citations", "grounding"],
    relatedPatterns: ["tool-calling", "multi-step-agent"],
    files: [
      {
        path: "app/page.tsx",
        lang: "tsx",
        content: `"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, isToolUIPart } from "ai";
import { useState } from "react";

export default function WebSearchPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading } = useChat({
    transport: new DefaultChatTransport({ api: "/api/search" }),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input?.trim()) return;
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-20">
            <p className="font-medium">Web Search Agent</p>
            <p className="text-xs mt-2">
              Ask questions and get answers grounded in real web search results.
            </p>
            <p className="text-xs mt-1 text-muted-foreground/60">
              e.g. &quot;What are the latest developments in AI?&quot;
            </p>
          </div>
        )}
        {messages.map((message) => (
          <div key={message.id} className="space-y-2">
            <div
              className={\`flex \${message.role === "user" ? "justify-end" : "justify-start"}\`}
            >
              <div
                className={\`max-w-[80%] rounded-lg px-4 py-2 text-sm \${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }\`}
              >
                {message.content}
              </div>
            </div>
            {message.parts?.map((part, i) => {
              if (isToolUIPart(part) && part.state === "output-available") {
                const result = part.output as {
                  sources?: { title: string; url: string }[];
                };
                if (result.sources) {
                  return (
                    <div key={i} className="ml-2 space-y-1">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground/50 font-medium">
                        Sources
                      </p>
                      {result.sources.map((src, j) => (
                        <a
                          key={j}
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-xs text-blue-400 hover:text-blue-300 truncate"
                        >
                          [{j + 1}] {src.title}
                        </a>
                      ))}
                    </div>
                  );
                }
              }
              return null;
            })}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2 text-sm text-muted-foreground animate-pulse">
              Searching the web...
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search the web..."
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !input?.trim()}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          Search
        </button>
      </form>
    </div>
  );
}`,
      },
      {
        path: "app/api/search/route.ts",
        lang: "typescript",
        content: `import { streamText, tool, stepCountIs } from "ai";
import { z } from "zod";
import { getModel } from "@/lib/model";

// Replace with your actual Tavily API key
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

async function tavilySearch(query: string) {
  // If no API key, return simulated results
  if (!TAVILY_API_KEY) {
    return {
      results: [
        {
          title: \`Search result for: \${query}\`,
          url: "https://example.com/result-1",
          content: \`Detailed information about \${query}. This is a simulated search result. Add your TAVILY_API_KEY to .env.local for real results.\`,
        },
        {
          title: \`\${query} — Overview\`,
          url: "https://example.com/result-2",
          content: \`A comprehensive overview of \${query} with recent analysis and key findings.\`,
        },
      ],
    };
  }

  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: TAVILY_API_KEY,
      query,
      max_results: 5,
      include_answer: false,
    }),
  });

  return response.json();
}

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: getModel(),
    system: \`You are a helpful search assistant. Use the search tool to find
information, then synthesize a clear answer with source citations.
Always cite your sources using [1], [2], etc.\`,
    messages,
    tools: {
      search: tool({
        description: "Search the web for current information",
        inputSchema: z.object({
          query: z.string().describe("The search query"),
        }),
        execute: async ({ query }) => {
          const data = await tavilySearch(query);
          return {
            results: data.results.map((r: { content: string }) => r.content).join("\\n\\n"),
            sources: data.results.map((r: { title: string; url: string }) => ({
              title: r.title,
              url: r.url,
            })),
          };
        },
      }),
    },
    stopWhen: stepCountIs(3),
  });

  return result.toUIMessageStreamResponse();
}`,
      },
      {
        path: "lib/model.ts",
        lang: "typescript",
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
      },
    ],
  },
  {
    id: "human-in-the-loop",
    title: "Human-in-the-Loop",
    description:
      "Pause AI execution to get human approval before executing sensitive tool calls. Uses tool confirmation flow with the AI SDK.",
    category: "workflows",
    difficulty: "intermediate",
    tags: ["approval", "human-review", "confirmation", "safety"],
    relatedPatterns: ["tool-calling", "multi-step-agent"],
    files: [
      {
        path: "app/page.tsx",
        lang: "tsx",
        content: `"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, isToolUIPart } from "ai";
import { useState } from "react";

export default function HumanInTheLoopPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading, addToolOutput } = useChat({
    transport: new DefaultChatTransport({ api: "/api/approval" }),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input?.trim()) return;
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-20">
            <p className="font-medium">Human-in-the-Loop</p>
            <p className="text-xs mt-2">
              The AI will ask for your approval before executing actions.
            </p>
            <p className="text-xs mt-1 text-muted-foreground/60">
              e.g. &quot;Send an email to the team about the meeting&quot;
            </p>
          </div>
        )}
        {messages.map((message) => (
          <div key={message.id} className="space-y-2">
            <div
              className={\`flex \${message.role === "user" ? "justify-end" : "justify-start"}\`}
            >
              <div
                className={\`max-w-[80%] rounded-lg px-4 py-2 text-sm \${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }\`}
              >
                {message.content}
              </div>
            </div>
            {message.parts?.map((part, i) => {
              if (isToolUIPart(part)) {
                if (part.state === "input-available") {
                  return (
                    <div
                      key={i}
                      className="ml-2 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-xs font-medium text-amber-500">
                          Approval Required
                        </span>
                      </div>
                      <p className="text-sm">
                        The AI wants to execute:{" "}
                        <code className="font-mono text-xs bg-secondary px-1.5 py-0.5 rounded">
                          {part.toolName}
                        </code>
                      </p>
                      <pre className="text-xs text-muted-foreground bg-secondary/50 rounded p-2">
                        {JSON.stringify(part.input, null, 2)}
                      </pre>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            addToolOutput({
                              tool: part.toolName,
                              toolCallId: part.toolCallId,
                              output: { approved: true, message: "User approved the action" },
                            })
                          }
                          className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            addToolOutput({
                              tool: part.toolName,
                              toolCallId: part.toolCallId,
                              output: { approved: false, message: "User rejected the action" },
                            })
                          }
                          className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  );
                }
                if (part.state === "output-available") {
                  const result = part.output as { approved: boolean; message: string };
                  return (
                    <div
                      key={i}
                      className={\`ml-2 rounded border px-3 py-2 text-xs \${
                        result.approved
                          ? "border-emerald-500/30 text-emerald-500"
                          : "border-red-500/30 text-red-500"
                      }\`}
                    >
                      {result.approved ? "✓ Approved" : "✗ Rejected"}: {result.message}
                    </div>
                  );
                }
              }
              return null;
            })}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2 text-sm text-muted-foreground animate-pulse">
              Processing...
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the agent to do something..."
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !input?.trim()}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}`,
      },
      {
        path: "app/api/approval/route.ts",
        lang: "typescript",
        content: `import { streamText, tool, stepCountIs } from "ai";
import { z } from "zod";
import { getModel } from "@/lib/model";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: getModel(),
    system: \`You are a helpful assistant that can send emails and manage
calendar events. Always use the appropriate tool when the user asks
you to perform an action. These tools require human approval before
execution.\`,
    messages,
    tools: {
      sendEmail: tool({
        description: "Send an email to a recipient (requires approval)",
        inputSchema: z.object({
          to: z.string().describe("Email recipient"),
          subject: z.string().describe("Email subject"),
          body: z.string().describe("Email body content"),
        }),
        // No execute function — this creates a "confirmation" tool call
        // The client must provide the output via addToolOutput
      }),
      scheduleEvent: tool({
        description: "Schedule a calendar event (requires approval)",
        inputSchema: z.object({
          title: z.string().describe("Event title"),
          date: z.string().describe("Event date"),
          attendees: z.array(z.string()).describe("List of attendees"),
        }),
        // No execute — requires human approval
      }),
    },
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}`,
      },
    ],
  },
  {
    id: "rag-pipeline",
    title: "RAG Pipeline",
    description:
      "Retrieval-Augmented Generation: embed documents, store in a vector database, and retrieve context for grounded AI responses.",
    category: "tools",
    difficulty: "advanced",
    tags: ["rag", "embeddings", "vector-search", "retrieval"],
    relatedPatterns: ["web-search", "tool-calling"],
    files: [
      {
        path: "app/page.tsx",
        lang: "tsx",
        content: `"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

export default function RAGPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading } = useChat({
    transport: new DefaultChatTransport({ api: "/api/rag" }),
  });
  const [indexing, setIndexing] = useState(false);
  const [indexed, setIndexed] = useState(false);

  async function indexDocuments() {
    setIndexing(true);
    await fetch("/api/rag/index", { method: "POST" });
    setIndexed(true);
    setIndexing(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input?.trim()) return;
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto">
      {!indexed && (
        <div className="border-b p-4 flex items-center justify-between bg-secondary/30">
          <div>
            <p className="text-sm font-medium">Document Index</p>
            <p className="text-xs text-muted-foreground">
              Index sample documents before querying
            </p>
          </div>
          <button
            onClick={indexDocuments}
            disabled={indexing}
            className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground disabled:opacity-50"
          >
            {indexing ? "Indexing..." : "Index Documents"}
          </button>
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-20">
            <p className="font-medium">RAG Pipeline</p>
            <p className="text-xs mt-2">
              Ask questions about the indexed documents.
            </p>
            <p className="text-xs mt-1 text-muted-foreground/60">
              Documents are embedded and retrieved using cosine similarity.
            </p>
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={\`flex \${message.role === "user" ? "justify-end" : "justify-start"}\`}
          >
            <div
              className={\`max-w-[80%] rounded-lg px-4 py-2 text-sm \${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }\`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2 text-sm text-muted-foreground animate-pulse">
              Retrieving & generating...
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about the documents..."
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !input?.trim()}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          Ask
        </button>
      </form>
    </div>
  );
}`,
      },
      {
        path: "app/api/rag/route.ts",
        lang: "typescript",
        content: `import { streamText } from "ai";
import { getModel } from "@/lib/model";
import { retrieve } from "@/lib/vector-store";

export async function POST(req: Request) {
  const { messages } = await req.json();
  if (!messages?.length) {
    return new Response("No messages provided", { status: 400 });
  }
  const lastMessage = messages[messages.length - 1];

  // Retrieve relevant documents
  const context = await retrieve(lastMessage.content, 3);
  const contextText = context
    .map((doc, i) => \`[Document \${i + 1}]: \${doc.content}\`)
    .join("\\n\\n");

  const result = streamText({
    model: getModel(),
    system: \`You are a helpful assistant. Answer questions based on the
provided context. If the context doesn't contain relevant information,
say so. Always cite which document(s) you're referencing.

Context:
\${contextText}\`,
    messages,
  });

  return result.toUIMessageStreamResponse();
}`,
      },
      {
        path: "app/api/rag/index/route.ts",
        lang: "typescript",
        content: `import { indexDocuments } from "@/lib/vector-store";

// Sample documents to index
const documents = [
  {
    id: "1",
    content: \`The AI SDK is a TypeScript toolkit for building AI-powered
applications. It provides a unified API for working with different AI
providers including OpenAI, Anthropic, and Google.\`,
  },
  {
    id: "2",
    content: \`streamText is the primary function for streaming text
generation. It supports tool calling, multi-step agent loops, and
returns a DataStreamResponse for use with useChat on the client.\`,
  },
  {
    id: "3",
    content: \`generateObject uses Zod schemas to produce structured,
type-safe JSON output from AI models. It validates the output against
the schema and returns typed data.\`,
  },
  {
    id: "4",
    content: \`The useChat hook provides a complete chat interface with
automatic message management, streaming support, and tool call handling.
It works with any AI SDK backend route.\`,
  },
  {
    id: "5",
    content: \`Tool calling allows AI models to invoke functions during
generation. Tools are defined with Zod parameter schemas and execute
functions. The maxSteps option enables multi-step tool loops.\`,
  },
];

export async function POST() {
  await indexDocuments(documents);
  return Response.json({ indexed: documents.length });
}`,
      },
      {
        path: "lib/vector-store.ts",
        lang: "typescript",
        content: `import { embed, embedMany } from "ai";
import { getModel } from "@/lib/model";

// Simple in-memory vector store for demonstration
// In production, use Pinecone, Weaviate, pgvector, etc.

interface Document {
  id: string;
  content: string;
  embedding?: number[];
}

const store: Document[] = [];

// Cosine similarity between two vectors
function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function indexDocuments(
  documents: { id: string; content: string }[]
) {
  // Note: In production, use an embedding model like:
  //   openai.embedding("text-embedding-3-small")
  // For this demo, we use a simple hash-based embedding
  for (const doc of documents) {
    const embedding = simpleEmbed(doc.content);
    store.push({ ...doc, embedding });
  }
}

export async function retrieve(
  query: string,
  topK: number = 3
): Promise<Document[]> {
  const queryEmbedding = simpleEmbed(query);

  const scored = store
    .filter((doc) => doc.embedding)
    .map((doc) => ({
      ...doc,
      score: cosineSimilarity(queryEmbedding, doc.embedding!),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return scored;
}

// Simple deterministic embedding for demo purposes
// Replace with real embeddings in production
function simpleEmbed(text: string): number[] {
  const dims = 64;
  const embedding = new Array(dims).fill(0);
  const words = text.toLowerCase().split(/\\s+/);
  for (const word of words) {
    for (let i = 0; i < word.length; i++) {
      const idx = (word.charCodeAt(i) * (i + 1)) % dims;
      embedding[idx] += 1;
    }
  }
  // Normalize
  const norm = Math.sqrt(embedding.reduce((s, v) => s + v * v, 0));
  return embedding.map((v) => (norm > 0 ? v / norm : 0));
}`,
      },
    ],
  },
  {
    id: "json-renderer",
    title: "JSON Renderer",
    description:
      "AI generates structured JSON data that's automatically rendered as interactive visual components — cards, charts, tables, and more.",
    category: "core",
    difficulty: "advanced",
    tags: ["json", "rendering", "generateObject", "visual", "components"],
    relatedPatterns: ["structured-output", "generative-ui"],
    files: [
      {
        path: "app/page.tsx",
        lang: "tsx",
        content: `"use client";

import { useState } from "react";

type Block =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "stat"; label: string; value: string; change?: string }
  | { type: "list"; title: string; items: string[] }
  | { type: "code"; language: string; code: string }
  | { type: "table"; headers: string[]; rows: string[][] };

function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "heading":
      return <h2 className="text-xl font-bold mt-6 mb-2">{block.text}</h2>;
    case "paragraph":
      return <p className="text-muted-foreground leading-relaxed mb-4">{block.text}</p>;
    case "stat":
      return (
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">{block.label}</p>
          <p className="text-2xl font-bold mt-1">{block.value}</p>
          {block.change && (
            <p className={\`text-sm mt-1 \${
              block.change.startsWith("+") ? "text-emerald-500" : "text-red-500"
            }\`}>
              {block.change}
            </p>
          )}
        </div>
      );
    case "list":
      return (
        <div className="mb-4">
          <h3 className="font-medium mb-2">{block.title}</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {block.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      );
    case "code":
      return (
        <pre className="rounded-lg bg-secondary p-4 overflow-x-auto mb-4">
          <code className="text-sm">{block.code}</code>
        </pre>
      );
    case "table":
      return (
        <div className="rounded-lg border overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary">
                {block.headers.map((h, i) => (
                  <th key={i} className="text-left px-4 py-2 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-t">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2 text-muted-foreground">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export default function JSONRendererPage() {
  const [prompt, setPrompt] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setBlocks([]);

    try {
      const res = await fetch("/api/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("Failed to render");

      const data = await res.json();
      setBlocks(data.blocks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to see... e.g. 'A dashboard about climate change'"
          className="flex-1 rounded-lg border bg-background px-4 py-3 text-sm"
        />
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {loading ? "Generating..." : "Render"}
        </button>
      </form>

      {blocks.length > 0 && (
        <div className="rounded-xl border p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {blocks.filter((b) => b.type === "stat").map((b, i) => (
              <RenderBlock key={i} block={b} />
            ))}
          </div>
          {blocks.filter((b) => b.type !== "stat").map((b, i) => (
            <RenderBlock key={i} block={b} />
          ))}
        </div>
      )}
    </div>
  );
}`,
      },
      {
        path: "app/api/render/route.ts",
        lang: "typescript",
        content: `import { generateText, Output } from "ai";
import { z } from "zod";
import { getModel } from "@/lib/model";

const blockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("heading"), text: z.string() }),
  z.object({ type: z.literal("paragraph"), text: z.string() }),
  z.object({
    type: z.literal("stat"),
    label: z.string(),
    value: z.string(),
    change: z.string().optional(),
  }),
  z.object({
    type: z.literal("list"),
    title: z.string(),
    items: z.array(z.string()),
  }),
  z.object({
    type: z.literal("code"),
    language: z.string(),
    code: z.string(),
  }),
  z.object({
    type: z.literal("table"),
    headers: z.array(z.string()),
    rows: z.array(z.array(z.string())),
  }),
]);

const responseSchema = z.object({
  blocks: z.array(blockSchema).describe(
    "An array of visual blocks to render. Use a mix of headings, paragraphs, stats, lists, code, and tables to create a rich visual layout."
  ),
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const { output } = await generateText({
    model: getModel(),
    output: Output.object({ schema: responseSchema }),
    prompt: \`Generate a rich visual document about: \${prompt}

Create a mix of block types for visual variety:
- Use "stat" blocks for key metrics (include change like "+12%" or "-3%")
- Use "heading" and "paragraph" for narrative sections
- Use "table" for comparative data
- Use "list" for enumerations
- Use "code" for technical examples

Generate 8-12 blocks total for a comprehensive layout.\`,
  });

  return Response.json(output);
}`,
      },
      {
        path: "lib/model.ts",
        lang: "typescript",
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
      },
    ],
  },
  {
    id: "markdown-chat",
    title: "Markdown Chat",
    description:
      "A polished chat interface with rich markdown rendering — code blocks with syntax highlighting, tables, lists, headings, and inline formatting.",
    category: "chat",
    difficulty: "intermediate",
    tags: ["markdown", "chat", "rich-text", "syntax-highlighting"],
    relatedPatterns: ["streaming-chat", "reasoning-display"],
    files: [
      {
        path: "app/page.tsx",
        lang: "tsx",
        content: `"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

// Simple markdown renderer — in production, use react-markdown + rehype
function Markdown({ content }: { content: string }) {
  // Handle code blocks
  const parts = content.split(/(^\`\`\`[\\s\\S]*?^\`\`\`)/gm);

  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      {parts.map((part, i) => {
        if (part.startsWith("\`\`\`")) {
          const lines = part.split("\\n");
          const lang = lines[0].replace("\`\`\`", "").trim();
          const code = lines.slice(1, -1).join("\\n");
          return (
            <pre key={i} className="rounded-lg bg-secondary/80 p-4 overflow-x-auto my-3">
              {lang && (
                <div className="text-xs text-muted-foreground mb-2 font-mono">{lang}</div>
              )}
              <code className="text-sm font-mono">{code}</code>
            </pre>
          );
        }
        // Handle inline markdown
        return (
          <div key={i} className="whitespace-pre-wrap">
            {part.split("\\n").map((line, j) => {
              if (line.startsWith("### ")) return <h3 key={j} className="text-base font-semibold mt-4 mb-2">{line.slice(4)}</h3>;
              if (line.startsWith("## ")) return <h2 key={j} className="text-lg font-semibold mt-4 mb-2">{line.slice(3)}</h2>;
              if (line.startsWith("# ")) return <h1 key={j} className="text-xl font-bold mt-4 mb-2">{line.slice(2)}</h1>;
              if (line.startsWith("- ")) return <li key={j} className="ml-4 text-muted-foreground">{line.slice(2)}</li>;
              if (line.startsWith("> ")) return <blockquote key={j} className="border-l-2 border-border pl-4 italic text-muted-foreground my-2">{line.slice(2)}</blockquote>;
              if (line.trim() === "") return <br key={j} />;
              return <p key={j} className="text-sm leading-relaxed my-1">{line}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default function MarkdownChatPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input?.trim()) return;
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-20">
            <p className="font-medium">Markdown Chat</p>
            <p className="text-sm mt-2">
              Ask for code, explanations, or documentation — responses render as rich markdown.
            </p>
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={\`flex \${message.role === "user" ? "justify-end" : "justify-start"}\`}
          >
            <div
              className={\`max-w-[85%] rounded-xl px-4 py-3 \${
                message.role === "user"
                  ? "bg-primary text-primary-foreground text-sm"
                  : "bg-muted"
              }\`}
            >
              {message.role === "user" ? (
                message.content
              ) : (
                <Markdown content={message.content} />
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-xl px-4 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4 flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for code, explanations, documentation..."
          className="flex-1 rounded-lg border bg-background px-4 py-3 text-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !input?.trim()}
          className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}`,
      },
      {
        path: "app/api/chat/route.ts",
        lang: "typescript",
        content: `import { streamText } from "ai";
import { getModel } from "@/lib/model";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: getModel(),
    system: \`You are a helpful assistant. Format your responses using markdown:
- Use headings (##, ###) to organize sections
- Use code blocks with language tags for code
- Use bullet points and numbered lists
- Use tables when comparing things
- Use blockquotes for important notes
- Use bold and italic for emphasis\`,
    messages,
  });

  return result.toUIMessageStreamResponse();
}`,
      },
    ],
  },
  {
    id: "reasoning-display",
    title: "Reasoning Display",
    description:
      "Show the AI's chain-of-thought reasoning in a collapsible thinking section, then display the final answer — like Claude's extended thinking.",
    category: "chat",
    difficulty: "intermediate",
    tags: ["reasoning", "thinking", "chain-of-thought", "transparency"],
    relatedPatterns: ["streaming-chat", "markdown-chat"],
    files: [
      {
        path: "app/page.tsx",
        lang: "tsx",
        content: `"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";
import { ChevronDown, ChevronRight, Brain } from "lucide-react";

function ThinkingBlock({ thinking }: { thinking: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-border/60 overflow-hidden mb-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground hover:bg-accent/30 transition-colors"
      >
        <Brain className="h-4 w-4 text-violet-400" />
        <span className="font-medium">Thinking</span>
        {expanded ? (
          <ChevronDown className="h-3.5 w-3.5 ml-auto" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5 ml-auto" />
        )}
      </button>
      {expanded && (
        <div className="px-4 py-3 border-t border-border/60 bg-secondary/30">
          <p className="text-sm text-muted-foreground/80 whitespace-pre-wrap leading-relaxed">
            {thinking}
          </p>
        </div>
      )}
    </div>
  );
}

function parseThinking(content: string): { thinking: string | null; answer: string } {
  const thinkMatch = content.match(/<thinking>([\s\S]*?)<\\/thinking>/);
  if (thinkMatch) {
    const thinking = thinkMatch[1].trim();
    const answer = content.replace(/<thinking>[\\s\\S]*?<\\/thinking>/, "").trim();
    return { thinking, answer };
  }
  return { thinking: null, answer: content };
}

export default function ReasoningDisplayPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading } = useChat({
    transport: new DefaultChatTransport({ api: "/api/reasoning" }),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input?.trim()) return;
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-20">
            <p className="font-medium">Reasoning Display</p>
            <p className="text-sm mt-2">
              Ask complex questions — the AI will show its thinking process.
            </p>
            <p className="text-xs mt-1 text-muted-foreground/60">
              e.g. "Explain the tradeoffs between REST and GraphQL"
            </p>
          </div>
        )}
        {messages.map((message) => {
          if (message.role === "user") {
            return (
              <div key={message.id} className="flex justify-end">
                <div className="max-w-[80%] rounded-xl bg-primary text-primary-foreground px-4 py-3 text-sm">
                  {message.content}
                </div>
              </div>
            );
          }

          const { thinking, answer } = parseThinking(message.content);

          return (
            <div key={message.id} className="space-y-2">
              {thinking && <ThinkingBlock thinking={thinking} />}
              <div className="rounded-xl bg-muted px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap">
                {answer}
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="space-y-2">
            <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 px-4 py-2.5 flex items-center gap-2">
              <Brain className="h-4 w-4 text-violet-400 animate-pulse" />
              <span className="text-sm text-violet-400">Thinking...</span>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4 flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a complex question..."
          className="flex-1 rounded-lg border bg-background px-4 py-3 text-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !input?.trim()}
          className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}`,
      },
      {
        path: "app/api/reasoning/route.ts",
        lang: "typescript",
        content: `import { streamText } from "ai";
import { getModel } from "@/lib/model";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: getModel(),
    system: \`You are a thoughtful assistant that shows your reasoning process.

For every response, structure your output as:

<thinking>
Your step-by-step reasoning process here. Break down the problem,
consider different angles, weigh tradeoffs, and show your work.
</thinking>

Then provide your final, clear answer after the thinking block.

The thinking section should be genuine reasoning, not just restating the question.\`,
    messages,
  });

  return result.toUIMessageStreamResponse();
}`,
      },
    ],
  },
  {
    id: "text-generation",
    title: "Text Generation",
    description:
      "Basic non-streaming text generation with generateText. Submit a topic and get a generated paragraph — the simplest AI SDK pattern.",
    category: "core",
    difficulty: "beginner",
    tags: ["generateText", "non-streaming", "basic", "text"],
    relatedPatterns: ["streaming-chat", "structured-output"],
    files: [
      {
        path: "app/page.tsx",
        lang: "tsx",
        content: `"use client";

import { useState } from "react";

export default function TextGenerationPage() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      if (!res.ok) throw new Error("Failed to generate");

      const data = await res.json();
      setResult(data.text);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic... e.g. 'quantum computing'"
          className="flex-1 rounded-lg border bg-background px-4 py-3 text-sm"
        />
        <button
          type="submit"
          disabled={loading || !topic.trim()}
          className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {result && (
        <div className="rounded-xl border p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {result}
          </p>
        </div>
      )}

      {!result && !loading && (
        <div className="text-center text-muted-foreground mt-12">
          <p className="font-medium">Text Generation</p>
          <p className="text-sm mt-2">
            Enter a topic and click Generate to create a paragraph.
          </p>
          <p className="text-xs mt-1 text-muted-foreground/60">
            Uses generateText for simple, non-streaming generation.
          </p>
        </div>
      )}
    </div>
  );
}`,
      },
      {
        path: "app/api/generate/route.ts",
        lang: "typescript",
        content: `import { generateText } from "ai";
import { getModel } from "@/lib/model";

export async function POST(req: Request) {
  const { topic } = await req.json();

  // generateText returns the full result once complete (no streaming)
  const { text } = await generateText({
    model: getModel(),
    prompt: \`Write a concise, informative paragraph about: \${topic}\`,
  });

  return Response.json({ text });
}`,
      },
    ],
  },
  {
    id: "image-generation",
    title: "Image Generation",
    description:
      "Generate images from text prompts using generateImage. Enter a description, click generate, and see the AI-created image.",
    category: "core",
    difficulty: "intermediate",
    tags: ["generateImage", "image", "dall-e", "visual"],
    relatedPatterns: ["text-generation", "structured-output"],
    files: [
      {
        path: "app/page.tsx",
        lang: "tsx",
        content: `"use client";

import { useState } from "react";

export default function ImageGenerationPage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setImageUrl("");

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(\`HTTP error! status: \${res.status}\`);
      }

      const data = await res.json();
      // The API returns a base64-encoded image with its media type
      if (data?.mediaType && data?.base64) {
        setImageUrl(\`data:\${data.mediaType};base64,\${data.base64}\`);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Failed to generate image:", error);
      // You could also set an error state here to display to the user
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe an image... e.g. 'A futuristic city at sunset'"
          className="flex-1 rounded-lg border bg-background px-4 py-3 text-sm"
        />
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center space-y-3">
            <div className="h-8 w-8 mx-auto rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <p className="text-sm text-muted-foreground">
              Creating your image...
            </p>
          </div>
        </div>
      )}

      {imageUrl && (
        <div className="rounded-xl border overflow-hidden">
          <img
            src={imageUrl}
            alt={prompt}
            className="w-full h-auto"
          />
          <div className="p-4 border-t bg-secondary/30">
            <p className="text-xs text-muted-foreground">{prompt}</p>
          </div>
        </div>
      )}

      {!imageUrl && !loading && (
        <div className="text-center text-muted-foreground mt-12">
          <p className="font-medium">Image Generation</p>
          <p className="text-sm mt-2">
            Describe an image and click Generate to create it with AI.
          </p>
          <p className="text-xs mt-1 text-muted-foreground/60">
            Uses generateImage with DALL-E 3 via the AI SDK.
          </p>
        </div>
      )}
    </div>
  );
}`,
      },
      {
        path: "app/api/generate-image/route.ts",
        lang: "typescript",
        content: `import { generateImage } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  // generateImage uses an image model (not a language model)
  // Anthropic doesn't support image generation, so we use OpenAI's DALL-E 3
  const { image } = await generateImage({
    model: openai.image("dall-e-3"),
    prompt,
    size: "1024x1024",
  });

  // Return base64-encoded image data
  return Response.json({
    base64: image.base64,
    mediaType: image.mediaType,
  });
}`,
      },
    ],
  },
  {
    id: "streaming-object",
    title: "Streaming Object",
    description:
      "Stream structured JSON output in real-time using streamText with Output.object and a Zod schema. Watch a recipe build up field-by-field as the AI generates it.",
    category: "core",
    difficulty: "intermediate",
    tags: ["streamText", "Output.object", "zod", "structured-output", "streaming"],
    relatedPatterns: ["structured-output", "text-generation", "streaming-chat"],
    files: [
      {
        path: "app/page.tsx",
        lang: "tsx",
        content: `"use client";

import { useObject } from "@ai-sdk/react";
import { useState } from "react";
import { z } from "zod";

// Schema must match the server-side schema exactly
const recipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  prepTime: z.string(),
  cookTime: z.string(),
  servings: z.number(),
  ingredients: z.array(
    z.object({
      name: z.string(),
      amount: z.string(),
    })
  ),
  steps: z.array(z.string()),
});

export default function StreamingObjectPage() {
  const [prompt, setPrompt] = useState("");
  const { object, submit, isLoading } = useObject({
    api: "/api/stream-object",
    schema: recipeSchema,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;
    submit(prompt);
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a dish... e.g. 'spicy ramen'"
          className="flex-1 rounded-lg border bg-background px-4 py-3 text-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {isLoading ? "Streaming..." : "Generate Recipe"}
        </button>
      </form>

      {object && (
        <div className="rounded-xl border p-6 space-y-4">
          {/* Title and description stream in first */}
          {object.title && (
            <h2 className="text-xl font-bold">{object.title}</h2>
          )}
          {object.description && (
            <p className="text-sm text-muted-foreground">
              {object.description}
            </p>
          )}

          {/* Metadata row */}
          {(object.prepTime || object.cookTime || object.servings) && (
            <div className="flex gap-4 text-xs text-muted-foreground border-b pb-3">
              {object.prepTime && <span>Prep: {object.prepTime}</span>}
              {object.cookTime && <span>Cook: {object.cookTime}</span>}
              {object.servings && <span>Servings: {object.servings}</span>}
            </div>
          )}

          {/* Ingredients stream in as array builds up */}
          {object.ingredients && object.ingredients.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm mb-2">Ingredients</h3>
              <ul className="space-y-1">
                {object.ingredients.map((ing, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted-foreground flex gap-2"
                  >
                    <span className="font-medium text-foreground">
                      {ing?.amount}
                    </span>
                    <span>{ing?.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Steps stream in one by one */}
          {object.steps && object.steps.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm mb-2">Steps</h3>
              <ol className="space-y-2">
                {object.steps.map((step, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-3">
                    <span className="font-mono text-xs font-bold text-primary mt-0.5">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}

      {!object && !isLoading && (
        <div className="text-center text-muted-foreground mt-12">
          <p className="font-medium">Streaming Object</p>
          <p className="text-sm mt-2">
            Enter a dish name to generate a recipe that streams in real-time.
          </p>
          <p className="text-xs mt-1 text-muted-foreground/60">
            Uses streamText + Output.object to stream structured JSON.
          </p>
        </div>
      )}
    </div>
  );
}`,
      },
      {
        path: "app/api/stream-object/route.ts",
        lang: "typescript",
        content: `import { streamText, Output } from "ai";
import { z } from "zod";
import { getModel } from "@/lib/model";

// Define the recipe schema with Zod
const recipeSchema = z.object({
  title: z.string().describe("The recipe title"),
  description: z.string().describe("A brief description of the dish"),
  prepTime: z.string().describe("Preparation time, e.g. '15 minutes'"),
  cookTime: z.string().describe("Cooking time, e.g. '30 minutes'"),
  servings: z.number().describe("Number of servings"),
  ingredients: z.array(
    z.object({
      name: z.string().describe("Ingredient name"),
      amount: z.string().describe("Amount with unit, e.g. '2 cups'"),
    })
  ),
  steps: z.array(z.string().describe("A single instruction step")),
});

export async function POST(req: Request) {
  const context = await req.json();

  // streamText + Output.object streams structured JSON incrementally
  // The client receives partial objects as they build up
  const result = streamText({
    model: getModel(),
    output: Output.object({ schema: recipeSchema }),
    prompt: \`Generate a detailed recipe for: \${context}\`,
  });

  // toTextStreamResponse sends the raw text stream for useObject to parse
  return result.toTextStreamResponse();
}`,
      },
    ],
  },
  {
    id: "code-artifact",
    title: "Code Artifact",
    description:
      "AI-powered code generation with syntax highlighting and copy support. Describe what you need, and the AI generates clean, runnable code.",
    category: "core",
    difficulty: "advanced",
    tags: ["code-generation", "syntax-highlighting", "generateText", "artifact"],
    relatedPatterns: ["text-generation", "streaming-chat", "markdown-chat"],
    files: [
      {
        path: "app/page.tsx",
        lang: "tsx",
        content: `"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

// Extract code blocks from markdown-formatted responses
function extractCodeBlock(content: string): {
  language: string;
  code: string;
} | null {
  const match = content.match(/\`\`\`(\\w+)?\\n([\\s\\S]*?)\`\`\`/);
  if (match) {
    return { language: match[1] || "text", code: match[2].trim() };
  }
  return null;
}

function CodeBlock({
  language,
  code,
}: {
  language: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-secondary border-b">
        <span className="text-xs font-mono text-muted-foreground">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="text-xs px-2 py-1 rounded hover:bg-accent transition-colors text-muted-foreground"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto bg-secondary/30">
        <code className="text-sm font-mono">{code}</code>
      </pre>
    </div>
  );
}

export default function CodeArtifactPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading } = useChat({
    transport: new DefaultChatTransport({ api: "/api/code-artifact" }),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input?.trim()) return;
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <div className="flex flex-col h-[600px] max-w-3xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-20">
            <p className="font-medium">Code Artifact</p>
            <p className="text-sm mt-2">
              Describe what you want to build and get generated code.
            </p>
            <p className="text-xs mt-1 text-muted-foreground/60">
              e.g. &quot;A React hook for debouncing input&quot;
            </p>
          </div>
        )}
        {messages.map((message) => {
          if (message.role === "user") {
            return (
              <div key={message.id} className="flex justify-end">
                <div className="max-w-[80%] rounded-xl bg-primary text-primary-foreground px-4 py-3 text-sm">
                  {message.content}
                </div>
              </div>
            );
          }

          // Try to extract a code block from the assistant's response
          const codeBlock = extractCodeBlock(message.content);
          // Get the explanation text (everything outside the code block)
          const explanation = message.content
            .replace(/\`\`\`\\w*\\n[\\s\\S]*?\`\`\`/g, "")
            .trim();

          return (
            <div key={message.id} className="space-y-3">
              {explanation && (
                <div className="rounded-xl bg-muted px-4 py-3 text-sm leading-relaxed">
                  {explanation}
                </div>
              )}
              {codeBlock && (
                <CodeBlock
                  language={codeBlock.language}
                  code={codeBlock.code}
                />
              )}
            </div>
          );
        })}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-xl px-4 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4 flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe the code you want..."
          className="flex-1 rounded-lg border bg-background px-4 py-3 text-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !input?.trim()}
          className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          Generate
        </button>
      </form>
    </div>
  );
}`,
      },
      {
        path: "app/api/code-artifact/route.ts",
        lang: "typescript",
        content: `import { streamText } from "ai";
import { getModel } from "@/lib/model";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: getModel(),
    system: \`You are an expert code generator. When the user describes
what they want, generate clean, well-commented, runnable code.

Rules:
- Always wrap code in a markdown code block with the language tag
- Add brief comments explaining key parts
- Keep code minimal and focused on the request
- If the user doesn't specify a language, default to TypeScript
- Include imports and type definitions where needed
- After the code block, add a short explanation of how it works\`,
    messages,
  });

  return result.toUIMessageStreamResponse();
}`,
      },
    ],
  },
  {
    id: "routing-agent",
    title: "Routing Agent",
    description:
      "Routes user queries to specialized sub-agents based on content analysis. A classifier agent determines intent and delegates to the appropriate specialist.",
    category: "agents",
    difficulty: "advanced",
    tags: ["agent", "routing", "classification", "multi-agent"],
    relatedPatterns: ["multi-step-agent", "tool-calling"],
    files: [
      {
        path: "app/page.tsx",
        lang: "tsx",
        content: `"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

export default function RoutingAgentPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading } = useChat({
    transport: new DefaultChatTransport({ api: "/api/route-agent" }),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input?.trim()) return;
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-20">
            <p className="text-lg font-medium">Routing Agent</p>
            <p className="text-sm mt-2">
              Ask anything — your query will be routed to the best specialist
              (code, math, writing, or general knowledge).
            </p>
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={\`flex \${message.role === "user" ? "justify-end" : "justify-start"}\`}
          >
            <div
              className={\`max-w-[80%] rounded-lg px-4 py-2 text-sm \${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }\`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2 text-sm text-muted-foreground animate-pulse">
              Routing to specialist...
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a coding, math, writing, or general question..."
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input?.trim()}
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}`,
      },
      {
        path: "app/api/route-agent/route.ts",
        lang: "typescript",
        content: `import { streamText, generateText, tool } from "ai";
import { getModel } from "@/lib/model";
import { z } from "zod";

// Classify user intent to determine which specialist to use
async function classifyIntent(query: string) {
  const { object } = await generateText({
    model: getModel(),
    system: \`You are a query classifier. Analyze the user query and determine the best specialist to handle it.
Respond with a JSON object: { "route": "code" | "math" | "writing" | "general", "reason": "brief explanation" }
- code: programming, debugging, software architecture
- math: calculations, equations, statistics, data analysis
- writing: creative writing, editing, summarization, translation
- general: everything else\`,
    prompt: query,
  });
  try {
    const parsed = JSON.parse(object as unknown as string);
    return parsed.route as string;
  } catch {
    return "general";
  }
}

// Specialist system prompts
const specialists: Record<string, string> = {
  code: \`You are an expert software engineer. Provide clear, well-structured code solutions with explanations. Use TypeScript by default. Always include error handling and best practices.\`,
  math: \`You are an expert mathematician and data scientist. Show your work step-by-step. Use precise notation and verify your calculations. Explain concepts clearly.\`,
  writing: \`You are an expert writer and editor. Provide polished, engaging prose. Pay attention to tone, structure, and clarity. Offer constructive suggestions for improvement.\`,
  general: \`You are a knowledgeable AI assistant. Provide accurate, helpful responses. Cite sources when possible and acknowledge uncertainty.\`,
};

export async function POST(req: Request) {
  const { messages } = await req.json();
  if (!messages?.length) {
    return new Response("No messages provided", { status: 400 });
  }
  const lastMessage = messages[messages.length - 1];
  const query = typeof lastMessage.content === "string"
    ? lastMessage.content
    : lastMessage.content.map((p: { text?: string }) => p.text || "").join(" ");

  // Step 1: Classify the intent
  const route = await classifyIntent(query);
  const systemPrompt = specialists[route] || specialists.general;

  // Step 2: Stream from the specialist
  const result = streamText({
    model: getModel(),
    system: \`[Routed to: \${route} specialist]\\n\\n\${systemPrompt}\`,
    messages,
  });

  return result.toUIMessageStreamResponse();
}`,
      },
    ],
  },
  {
    id: "orchestrator-agent",
    title: "Orchestrator Agent",
    description:
      "A parent agent that decomposes complex tasks, delegates subtasks to specialized child agents via tools, and merges their results into a cohesive response.",
    category: "agents",
    difficulty: "advanced",
    tags: ["orchestration", "sub-agents", "delegation", "multi-agent"],
    relatedPatterns: ["routing-agent", "multi-step-agent"],
    files: [
      {
        path: "app/page.tsx",
        lang: "tsx",
        content: `"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

export default function OrchestratorPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading } = useChat({
    transport: new DefaultChatTransport({ api: "/api/orchestrate" }),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input?.trim()) return;
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-20">
            <p className="text-lg font-medium">Orchestrator Agent</p>
            <p className="text-sm mt-2">
              Give me a complex task. I will break it down, delegate to
              specialist agents, and merge the results.
            </p>
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={\`flex \${message.role === "user" ? "justify-end" : "justify-start"}\`}
          >
            <div
              className={\`max-w-[80%] rounded-lg px-4 py-2 text-sm whitespace-pre-wrap \${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }\`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2 text-sm text-muted-foreground animate-pulse">
              Orchestrating sub-agents...
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe a complex task to orchestrate..."
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input?.trim()}
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}`,
      },
      {
        path: "app/api/orchestrate/route.ts",
        lang: "typescript",
        content: `import { streamText, generateText, tool } from "ai";
import { getModel } from "@/lib/model";
import { z } from "zod";
import { runSubAgent } from "@/lib/agents";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: getModel(),
    system: \`You are an orchestrator agent. When given a complex task:
1. Break it into subtasks
2. Use the available tools to delegate each subtask to a specialist
3. Synthesize the results into a unified, coherent response

Always use the delegate tools to gather information before responding.
After all tool calls complete, provide a final merged summary.\`,
    messages,
    tools: {
      delegateResearch: tool({
        description: "Delegate a research subtask to the research specialist agent",
        parameters: z.object({
          task: z.string().describe("The research question or topic to investigate"),
        }),
        execute: async ({ task }) => {
          return runSubAgent("research", task);
        },
      }),
      delegateAnalysis: tool({
        description: "Delegate an analysis subtask to the analysis specialist agent",
        parameters: z.object({
          task: z.string().describe("The data or topic to analyze"),
        }),
        execute: async ({ task }) => {
          return runSubAgent("analysis", task);
        },
      }),
      delegateWriting: tool({
        description: "Delegate a writing subtask to the writing specialist agent",
        parameters: z.object({
          task: z.string().describe("The content to write or edit"),
          style: z.enum(["formal", "casual", "technical"]).optional(),
        }),
        execute: async ({ task, style }) => {
          return runSubAgent("writing", \`\${task} (style: \${style || "formal"})\`);
        },
      }),
    },
    maxSteps: 5,
  });

  return result.toUIMessageStreamResponse();
}`,
      },
      {
        path: "lib/agents.ts",
        lang: "typescript",
        content: `import { generateText } from "ai";
import { getModel } from "@/lib/model";

const agentPrompts: Record<string, string> = {
  research: \`You are a research specialist. Provide thorough, factual information on the given topic. Include key facts, context, and nuances. Be concise but comprehensive.\`,
  analysis: \`You are an analysis specialist. Break down the given topic with critical thinking. Identify patterns, pros/cons, trade-offs, and implications. Use structured reasoning.\`,
  writing: \`You are a writing specialist. Produce polished, well-structured prose. Adapt your tone to the requested style. Focus on clarity, engagement, and proper formatting.\`,
};

export async function runSubAgent(
  agentType: string,
  task: string
): Promise<string> {
  const system = agentPrompts[agentType] || agentPrompts.research;

  const { text } = await generateText({
    model: getModel(),
    system,
    prompt: task,
  });

  return text;
}`,
      },
    ],
  },
  {
    id: "evaluator-optimizer",
    title: "Evaluator-Optimizer",
    description:
      "Generate-evaluate-iterate loop that self-improves output quality. Generates a draft, evaluates it against criteria, and regenerates until the quality threshold is met.",
    category: "agents",
    difficulty: "advanced",
    tags: ["evaluation", "optimization", "self-improvement", "iterative"],
    relatedPatterns: ["text-generation", "structured-output"],
    files: [
      {
        path: "app/page.tsx",
        lang: "tsx",
        content: `"use client";

import { useState } from "react";

interface Iteration {
  attempt: number;
  draft: string;
  score: number;
  feedback: string;
}

export default function EvaluatorOptimizerPage() {
  const [prompt, setPrompt] = useState("");
  const [iterations, setIterations] = useState<Iteration[]>([]);
  const [finalResult, setFinalResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setIterations([]);
    setFinalResult(null);

    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setIterations(data.iterations);
      setFinalResult(data.finalResult);
    } catch (error) {
      console.error("Optimization failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-lg font-medium">Evaluator-Optimizer</h1>
        <p className="text-sm text-muted-foreground mt-1">
          AI generates, evaluates, and iterates until quality threshold is met.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want generated (e.g., 'Write a professional bio for a software engineer')"
          className="w-full rounded-md border bg-background px-3 py-2 text-sm min-h-[80px] resize-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="w-full rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"
        >
          {isLoading ? "Optimizing..." : "Generate & Optimize"}
        </button>
      </form>

      {iterations.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-medium">Iterations</h2>
          {iterations.map((iter) => (
            <div key={iter.attempt} className="rounded-lg border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Attempt {iter.attempt}
                </span>
                <span
                  className={\`text-xs px-2 py-1 rounded-full \${
                    iter.score >= 8
                      ? "bg-green-500/10 text-green-500"
                      : iter.score >= 5
                        ? "bg-yellow-500/10 text-yellow-500"
                        : "bg-red-500/10 text-red-500"
                  }\`}
                >
                  Score: {iter.score}/10
                </span>
              </div>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {iter.draft}
              </p>
              {iter.feedback && (
                <p className="text-xs text-muted-foreground italic border-t pt-2">
                  Feedback: {iter.feedback}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {finalResult && (
        <div className="rounded-lg border-2 border-green-500/30 p-4">
          <h2 className="text-sm font-medium text-green-500 mb-2">
            Final Optimized Result
          </h2>
          <p className="text-sm whitespace-pre-wrap">{finalResult}</p>
        </div>
      )}
    </div>
  );
}`,
      },
      {
        path: "app/api/optimize/route.ts",
        lang: "typescript",
        content: `import { generateText } from "ai";
import { getModel } from "@/lib/model";
import { NextResponse } from "next/server";

const MAX_ITERATIONS = 3;
const QUALITY_THRESHOLD = 8;

async function generateDraft(
  prompt: string,
  feedback?: string
): Promise<string> {
  const system = feedback
    ? \`You are a skilled writer. Improve the following based on this feedback: \${feedback}\`
    : \`You are a skilled writer. Generate high-quality content for the given request.\`;

  const { text } = await generateText({
    model: getModel(),
    system,
    prompt,
  });

  return text;
}

async function evaluateDraft(
  draft: string,
  originalPrompt: string
): Promise<{ score: number; feedback: string }> {
  const { text } = await generateText({
    model: getModel(),
    system: \`You are a strict content evaluator. Evaluate the draft against the original request.
Respond ONLY with valid JSON: { "score": <1-10>, "feedback": "<specific improvement suggestions>" }

Scoring criteria:
- Relevance to the original request (0-3 points)
- Quality of writing and structure (0-3 points)
- Completeness and depth (0-2 points)
- Clarity and readability (0-2 points)\`,
    prompt: \`Original request: \${originalPrompt}\\n\\nDraft to evaluate:\\n\${draft}\`,
  });

  try {
    return JSON.parse(text);
  } catch {
    return { score: 5, feedback: "Could not parse evaluation. Try again." };
  }
}

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const iterations: {
    attempt: number;
    draft: string;
    score: number;
    feedback: string;
  }[] = [];

  let currentDraft = "";
  let lastFeedback = "";

  for (let i = 1; i <= MAX_ITERATIONS; i++) {
    // Generate or improve draft
    currentDraft = await generateDraft(
      i === 1 ? prompt : \`Original request: \${prompt}\\n\\nPrevious draft: \${currentDraft}\`,
      lastFeedback || undefined
    );

    // Evaluate the draft
    const evaluation = await evaluateDraft(currentDraft, prompt);

    iterations.push({
      attempt: i,
      draft: currentDraft,
      score: evaluation.score,
      feedback: evaluation.feedback,
    });

    // If quality threshold met, stop iterating
    if (evaluation.score >= QUALITY_THRESHOLD) {
      break;
    }

    lastFeedback = evaluation.feedback;
  }

  return NextResponse.json({
    iterations,
    finalResult: currentDraft,
  });
}`,
      },
    ],
  },
  {
    id: "sequential-workflow",
    title: "Sequential Workflow",
    description:
      "Chain multiple AI calls in sequence, passing the output of one step as input to the next. Implements a research-summarize-translate-format pipeline.",
    category: "workflows",
    difficulty: "intermediate",
    tags: ["workflow", "sequential", "pipeline", "chain"],
    relatedPatterns: ["multi-step-agent", "parallel-workflow"],
    files: [
      {
        path: "app/page.tsx",
        lang: "tsx",
        content: `"use client";

import { useState } from "react";

interface PipelineStep {
  name: string;
  status: "pending" | "running" | "done";
  result?: string;
}

export default function SequentialWorkflowPage() {
  const [topic, setTopic] = useState("");
  const [targetLang, setTargetLang] = useState("Spanish");
  const [steps, setSteps] = useState<PipelineStep[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!topic.trim() || isLoading) return;

    setIsLoading(true);
    setSteps([
      { name: "Research", status: "pending" },
      { name: "Summarize", status: "pending" },
      { name: "Translate", status: "pending" },
      { name: "Format", status: "pending" },
    ]);

    try {
      const res = await fetch("/api/sequential", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, targetLang }),
      });
      const data = await res.json();

      setSteps(
        data.steps.map((s: { name: string; result: string }) => ({
          ...s,
          status: "done" as const,
        }))
      );
    } catch (error) {
      console.error("Pipeline failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-lg font-medium">Sequential Workflow</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Research &rarr; Summarize &rarr; Translate &rarr; Format
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a research topic..."
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          disabled={isLoading}
        />
        <select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          disabled={isLoading}
        >
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
          <option>Japanese</option>
          <option>Portuguese</option>
        </select>
        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="w-full rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"
        >
          {isLoading ? "Processing Pipeline..." : "Run Pipeline"}
        </button>
      </form>

      {steps.length > 0 && (
        <div className="space-y-3">
          {steps.map((step, i) => (
            <div key={step.name} className="rounded-lg border p-4">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={\`h-2 w-2 rounded-full \${
                    step.status === "done"
                      ? "bg-green-500"
                      : step.status === "running"
                        ? "bg-yellow-500 animate-pulse"
                        : "bg-muted-foreground/30"
                  }\`}
                />
                <span className="text-sm font-medium">
                  Step {i + 1}: {step.name}
                </span>
              </div>
              {step.result && (
                <p className="text-sm text-muted-foreground whitespace-pre-wrap pl-4 border-l-2 border-muted">
                  {step.result}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}`,
      },
      {
        path: "app/api/sequential/route.ts",
        lang: "typescript",
        content: `import { generateText } from "ai";
import { getModel } from "@/lib/model";
import { NextResponse } from "next/server";

async function runStep(system: string, prompt: string): Promise<string> {
  const { text } = await generateText({
    model: getModel(),
    system,
    prompt,
  });
  return text;
}

export async function POST(req: Request) {
  const { topic, targetLang } = await req.json();

  // Step 1: Research
  const research = await runStep(
    "You are a research assistant. Provide detailed, factual information about the given topic. Include key facts, history, and current relevance. Write 2-3 paragraphs.",
    \`Research the following topic thoroughly: \${topic}\`
  );

  // Step 2: Summarize
  const summary = await runStep(
    "You are a summarization expert. Condense the given text into a clear, concise summary. Preserve all key points. Target 3-5 bullet points.",
    \`Summarize the following research:\\n\\n\${research}\`
  );

  // Step 3: Translate
  const translated = await runStep(
    \`You are a professional translator. Translate the given text to \${targetLang}. Maintain the formatting, tone, and meaning. Only output the translation.\`,
    \`Translate this to \${targetLang}:\\n\\n\${summary}\`
  );

  // Step 4: Format
  const formatted = await runStep(
    "You are a formatting specialist. Take the given content and format it as a polished, well-structured document with a title, sections, and clean markdown formatting.",
    \`Format this translated content into a polished document:\\n\\n\${translated}\`
  );

  return NextResponse.json({
    steps: [
      { name: "Research", result: research },
      { name: "Summarize", result: summary },
      { name: "Translate", result: translated },
      { name: "Format", result: formatted },
    ],
  });
}`,
      },
    ],
  },
  {
    id: "parallel-workflow",
    title: "Parallel Workflow",
    description:
      "Run multiple AI calls concurrently with Promise.all and merge the results. Performs sentiment analysis, entity extraction, and summarization in parallel.",
    category: "workflows",
    difficulty: "advanced",
    tags: ["workflow", "parallel", "concurrent", "merge"],
    relatedPatterns: ["sequential-workflow", "orchestrator-agent"],
    files: [
      {
        path: "app/page.tsx",
        lang: "tsx",
        content: `"use client";

import { useState } from "react";

interface AnalysisResult {
  sentiment: string;
  entities: string;
  summary: string;
  merged: string;
}

export default function ParallelWorkflowPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/parallel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-lg font-medium">Parallel Workflow</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Three AI analyses run concurrently, then results are merged.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text to analyze in parallel (e.g., a news article, essay, or report)..."
          className="w-full rounded-md border bg-background px-3 py-2 text-sm min-h-[120px] resize-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className="w-full rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"
        >
          {isLoading ? "Analyzing in Parallel..." : "Analyze"}
        </button>
      </form>

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-lg border p-4">
              <h3 className="text-sm font-medium mb-2">Sentiment</h3>
              <p className="text-sm text-muted-foreground">{result.sentiment}</p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="text-sm font-medium mb-2">Entities</h3>
              <p className="text-sm text-muted-foreground">{result.entities}</p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="text-sm font-medium mb-2">Summary</h3>
              <p className="text-sm text-muted-foreground">{result.summary}</p>
            </div>
          </div>
          <div className="rounded-lg border-2 border-primary/20 p-4">
            <h3 className="text-sm font-medium mb-2">Merged Analysis</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {result.merged}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}`,
      },
      {
        path: "app/api/parallel/route.ts",
        lang: "typescript",
        content: `import { generateText } from "ai";
import { getModel } from "@/lib/model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text } = await req.json();

  // Run three analyses in parallel
  const [sentimentResult, entitiesResult, summaryResult] = await Promise.all([
    generateText({
      model: getModel(),
      system:
        "You are a sentiment analysis expert. Analyze the emotional tone of the text. Identify the overall sentiment (positive/negative/neutral/mixed), key emotional indicators, and confidence level. Be concise.",
      prompt: text,
    }),
    generateText({
      model: getModel(),
      system:
        "You are an entity extraction expert. Identify and list all named entities (people, organizations, locations, dates, monetary values, etc.) from the text. Categorize each entity. Be concise.",
      prompt: text,
    }),
    generateText({
      model: getModel(),
      system:
        "You are a summarization expert. Provide a concise summary of the text in 2-3 sentences. Capture the main point and key supporting details.",
      prompt: text,
    }),
  ]);

  // Merge results with a final synthesis call
  const { text: merged } = await generateText({
    model: getModel(),
    system:
      "You are an analysis synthesizer. Combine the following three analyses into a cohesive intelligence briefing. Structure it clearly with key takeaways.",
    prompt: \`Sentiment Analysis:\\n\${sentimentResult.text}\\n\\nEntity Extraction:\\n\${entitiesResult.text}\\n\\nSummary:\\n\${summaryResult.text}\\n\\nSynthesize these into a unified analysis.\`,
  });

  return NextResponse.json({
    sentiment: sentimentResult.text,
    entities: entitiesResult.text,
    summary: summaryResult.text,
    merged,
  });
}`,
      },
    ],
  },
  {
    id: "chat-with-citations",
    title: "Chat with Citations",
    description:
      "A chat interface that includes inline source citations with expandable source cards. Responses include numbered references that link to source details.",
    category: "chat",
    difficulty: "intermediate",
    tags: ["citations", "sources", "references", "chat"],
    relatedPatterns: ["web-search", "rag-pipeline", "streaming-chat"],
    files: [
      {
        path: "app/page.tsx",
        lang: "tsx",
        content: `"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

interface Citation {
  id: number;
  title: string;
  url: string;
  snippet: string;
}

function parseCitations(text: string): { cleanText: string; citations: Citation[] } {
  const citations: Citation[] = [];
  const citationRegex = /\\[SOURCE_(\\d+)\\|([^|]+)\\|([^|]+)\\|([^\\]]+)\\]/g;

  let match;
  while ((match = citationRegex.exec(text)) !== null) {
    citations.push({
      id: parseInt(match[1]),
      title: match[2],
      url: match[3],
      snippet: match[4],
    });
  }

  const cleanText = text
    .replace(citationRegex, "")
    .replace(/\\n{3,}/g, "\\n\\n")
    .trim();

  return { cleanText, citations };
}

function CitationCard({ citation }: { citation: Citation }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className="text-left w-full rounded-md border px-3 py-2 text-xs hover:bg-muted/50 transition-colors"
    >
      <div className="flex items-center gap-2">
        <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
          {citation.id}
        </span>
        <span className="font-medium truncate">{citation.title}</span>
      </div>
      {expanded && (
        <div className="mt-2 pl-7 space-y-1">
          <p className="text-muted-foreground">{citation.snippet}</p>
          <p className="text-primary/70 truncate">{citation.url}</p>
        </div>
      )}
    </button>
  );
}

export default function CitationsPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading } = useChat({
    transport: new DefaultChatTransport({ api: "/api/citations" }),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input?.trim()) return;
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-20">
            <p className="text-lg font-medium">Chat with Citations</p>
            <p className="text-sm mt-2">
              Ask a question and get answers with inline source citations.
            </p>
          </div>
        )}
        {messages.map((message) => {
          if (message.role === "user") {
            return (
              <div key={message.id} className="flex justify-end">
                <div className="max-w-[80%] rounded-lg px-4 py-2 text-sm bg-primary text-primary-foreground">
                  {message.content}
                </div>
              </div>
            );
          }

          const { cleanText, citations } = parseCitations(
            typeof message.content === "string" ? message.content : ""
          );

          return (
            <div key={message.id} className="flex justify-start">
              <div className="max-w-[80%] space-y-3">
                <div className="rounded-lg px-4 py-2 text-sm bg-muted whitespace-pre-wrap">
                  {cleanText}
                </div>
                {citations.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground px-1">
                      Sources
                    </p>
                    {citations.map((c) => (
                      <CitationCard key={c.id} citation={c} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2 text-sm text-muted-foreground animate-pulse">
              Researching with sources...
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question to get a cited answer..."
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input?.trim()}
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}`,
      },
      {
        path: "app/api/citations/route.ts",
        lang: "typescript",
        content: `import { streamText } from "ai";
import { getModel } from "@/lib/model";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: getModel(),
    system: \`You are a knowledgeable assistant that always cites sources in your responses.

Rules for citations:
1. Use inline numbered references like [1], [2], etc. in your response text
2. At the END of your response, include source metadata in this exact format for each citation:
   [SOURCE_1|Title of Source|https://example.com/url|Brief snippet describing what this source says]
   [SOURCE_2|Another Source|https://example.com/other|Another snippet]

3. Always include at least 2-3 citations for factual claims
4. Make citations realistic and relevant to the topic
5. The snippet should be a brief quote or description of the relevant content
6. Place all [SOURCE_*] tags at the very end of your response, each on its own line

Example response format:
According to recent studies, AI adoption has increased by 35% [1]. This growth is driven primarily by improvements in natural language processing [2].

[SOURCE_1|AI Industry Report 2025|https://example.com/ai-report|Annual survey showing 35% year-over-year growth in enterprise AI adoption]
[SOURCE_2|NLP Advances Review|https://example.com/nlp-review|Comprehensive review of transformer architecture improvements driving adoption]\`,
    messages,
  });

  return result.toUIMessageStreamResponse();
}`,
      },
    ],
  },
  {
    id: "form-generator",
    title: "Form Generator",
    description:
      "AI generates dynamic forms from natural language descriptions using generateObject with Zod schemas. Describe a form in plain English and get a fully rendered, interactive form.",
    category: "core",
    difficulty: "advanced",
    tags: ["form-generation", "dynamic-ui", "generateObject", "zod"],
    relatedPatterns: ["structured-output", "generative-ui"],
    files: [
      {
        path: "app/page.tsx",
        lang: "tsx",
        content: `"use client";

import { useState } from "react";

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "number" | "textarea" | "select" | "checkbox" | "date";
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: string;
}

interface GeneratedForm {
  title: string;
  description: string;
  fields: FormField[];
}

export default function FormGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [form, setForm] = useState<GeneratedForm | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string | boolean>>({});
  const [isLoading, setIsLoading] = useState(false);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setForm(null);
    setFormValues({});

    try {
      const res = await fetch("/api/generate-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setForm(data);

      // Initialize form values
      const initial: Record<string, string | boolean> = {};
      data.fields.forEach((f: FormField) => {
        initial[f.name] = f.type === "checkbox" ? false : "";
      });
      setFormValues(initial);
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function updateField(name: string, value: string | boolean) {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Form submitted:\\n" + JSON.stringify(formValues, null, 2));
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-lg font-medium">Form Generator</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Describe a form in plain English and AI will generate it.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="space-y-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Create a job application form with name, email, resume upload, years of experience, preferred role (frontend/backend/fullstack), and a cover letter field"
          className="w-full rounded-md border bg-background px-3 py-2 text-sm min-h-[80px] resize-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="w-full rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"
        >
          {isLoading ? "Generating Form..." : "Generate Form"}
        </button>
      </form>

      {form && (
        <form onSubmit={handleFormSubmit} className="rounded-lg border p-6 space-y-4">
          <div>
            <h2 className="text-lg font-medium">{form.title}</h2>
            <p className="text-sm text-muted-foreground">{form.description}</p>
          </div>

          {form.fields.map((field) => (
            <div key={field.name} className="space-y-1">
              <label className="text-sm font-medium">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  value={formValues[field.name] as string}
                  onChange={(e) => updateField(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm min-h-[80px] resize-none"
                />
              ) : field.type === "select" ? (
                <select
                  value={formValues[field.name] as string}
                  onChange={(e) => updateField(field.name, e.target.value)}
                  required={field.required}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select...</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : field.type === "checkbox" ? (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formValues[field.name] as boolean}
                    onChange={(e) => updateField(field.name, e.target.checked)}
                    className="rounded border"
                  />
                  <span className="text-sm text-muted-foreground">
                    {field.placeholder}
                  </span>
                </div>
              ) : (
                <input
                  type={field.type}
                  value={formValues[field.name] as string}
                  onChange={(e) => updateField(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
          >
            Submit Form
          </button>
        </form>
      )}
    </div>
  );
}`,
      },
      {
        path: "app/api/generate-form/route.ts",
        lang: "typescript",
        content: `import { generateObject } from "ai";
import { getModel } from "@/lib/model";
import { z } from "zod";
import { NextResponse } from "next/server";

const formSchema = z.object({
  title: z.string().describe("A concise title for the form"),
  description: z.string().describe("A brief description of the form purpose"),
  fields: z.array(
    z.object({
      name: z
        .string()
        .describe("camelCase field identifier, e.g. firstName"),
      label: z.string().describe("Human-readable label"),
      type: z
        .enum(["text", "email", "number", "textarea", "select", "checkbox", "date"])
        .describe("The input type for this field"),
      placeholder: z
        .string()
        .optional()
        .describe("Placeholder text or helper text for checkboxes"),
      required: z.boolean().describe("Whether this field is required"),
      options: z
        .array(z.string())
        .optional()
        .describe("Options for select fields"),
      validation: z
        .string()
        .optional()
        .describe("Validation rule description"),
    })
  ),
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const { object } = await generateObject({
    model: getModel(),
    schema: formSchema,
    system: \`You are a form designer. Generate a well-structured form based on the user's description.

Guidelines:
- Use appropriate input types (email for emails, number for numeric values, etc.)
- Add helpful placeholder text
- Mark critical fields as required
- Use select fields when there's a fixed set of options
- Use textarea for long-form text
- Order fields logically
- Generate 3-10 fields depending on the request complexity
- Use camelCase for field names\`,
    prompt: \`Generate a form for: \${prompt}\`,
  });

  return NextResponse.json(object);
}`,
      },
    ],
  },
  {
    id: "csv-editor",
    title: "CSV Editor",
    description:
      "AI-assisted tabular data editing. Paste CSV data, ask AI to transform, analyze, or clean it, and see the results in an editable table with AI suggestions.",
    category: "core",
    difficulty: "advanced",
    tags: ["csv", "table", "data-editing", "generateObject"],
    relatedPatterns: ["structured-output", "form-generator"],
    files: [
      {
        path: "app/page.tsx",
        lang: "tsx",
        content: `"use client";

import { useState } from "react";

interface TableData {
  headers: string[];
  rows: string[][];
}

function parseCSV(csv: string): TableData {
  const lines = csv.trim().split("\\n");
  if (lines.length === 0) return { headers: [], rows: [] };

  const headers = lines[0].split(",").map((h) => h.trim());
  const rows = lines.slice(1).map((line) =>
    line.split(",").map((cell) => cell.trim())
  );

  return { headers, rows };
}

function toCSV(data: TableData): string {
  const headerLine = data.headers.join(",");
  const rowLines = data.rows.map((row) => row.join(","));
  return [headerLine, ...rowLines].join("\\n");
}

export default function CSVEditorPage() {
  const [csvInput, setCsvInput] = useState(
    "name,age,city,role\\nAlice,30,NYC,Engineer\\nBob,25,SF,Designer\\nCarol,35,LA,Manager"
  );
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [instruction, setInstruction] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState("");

  function handleParse() {
    setTableData(parseCSV(csvInput));
    setExplanation("");
  }

  async function handleAIEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!instruction.trim() || !tableData || isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/csv-edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          csv: toCSV(tableData),
          instruction,
        }),
      });
      const data = await res.json();
      setTableData({ headers: data.headers, rows: data.rows });
      setExplanation(data.explanation);
      setInstruction("");
    } catch (error) {
      console.error("AI edit failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function updateCell(rowIdx: number, colIdx: number, value: string) {
    if (!tableData) return;
    const newRows = tableData.rows.map((row, ri) =>
      ri === rowIdx
        ? row.map((cell, ci) => (ci === colIdx ? value : cell))
        : [...row]
    );
    setTableData({ ...tableData, rows: newRows });
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-lg font-medium">CSV Editor</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Paste CSV data, then use AI to transform and analyze it.
        </p>
      </div>

      {!tableData ? (
        <div className="space-y-3">
          <textarea
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            placeholder="Paste your CSV data here..."
            className="w-full rounded-md border bg-background px-3 py-2 text-sm font-mono min-h-[160px] resize-none"
          />
          <button
            onClick={handleParse}
            disabled={!csvInput.trim()}
            className="w-full rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"
          >
            Parse CSV
          </button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  {tableData.headers.map((header, i) => (
                    <th
                      key={i}
                      className="px-3 py-2 text-left font-medium text-xs uppercase tracking-wide"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.rows.map((row, ri) => (
                  <tr key={ri} className="border-b last:border-0">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-1 py-1">
                        <input
                          value={cell}
                          onChange={(e) => updateCell(ri, ci, e.target.value)}
                          className="w-full bg-transparent px-2 py-1 text-sm rounded hover:bg-muted/30 focus:bg-muted/50 outline-none"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {explanation && (
            <div className="rounded-md border border-primary/20 bg-primary/5 px-4 py-3">
              <p className="text-sm text-muted-foreground">{explanation}</p>
            </div>
          )}

          <form onSubmit={handleAIEdit} className="flex gap-2">
            <input
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Ask AI to transform data (e.g., 'add a salary column', 'sort by age', 'capitalize all names')..."
              className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !instruction.trim()}
              className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50 whitespace-nowrap"
            >
              {isLoading ? "Editing..." : "AI Edit"}
            </button>
          </form>

          <button
            onClick={() => {
              setTableData(null);
              setExplanation("");
            }}
            className="text-sm text-muted-foreground hover:text-foreground underline"
          >
            Start over with new CSV
          </button>
        </>
      )}
    </div>
  );
}`,
      },
      {
        path: "app/api/csv-edit/route.ts",
        lang: "typescript",
        content: `import { generateObject } from "ai";
import { getModel } from "@/lib/model";
import { z } from "zod";
import { NextResponse } from "next/server";

const tableSchema = z.object({
  headers: z.array(z.string()).describe("Column headers for the table"),
  rows: z
    .array(z.array(z.string()))
    .describe("2D array of cell values, each inner array is a row"),
  explanation: z
    .string()
    .describe("Brief explanation of what changes were made"),
});

export async function POST(req: Request) {
  const { csv, instruction } = await req.json();

  const { object } = await generateObject({
    model: getModel(),
    schema: tableSchema,
    system: \`You are a data transformation assistant. You receive CSV data and an instruction to modify it.

Rules:
- Parse the CSV input and apply the requested transformation
- Return the modified data as structured headers and rows
- Preserve existing data unless the instruction says to remove it
- When adding columns, generate realistic placeholder data
- When sorting, maintain data integrity across columns
- When filtering, only include matching rows
- Provide a brief explanation of what you changed
- All cell values must be strings\`,
    prompt: \`CSV Data:\\n\${csv}\\n\\nInstruction: \${instruction}\`,
  });

  return NextResponse.json(object);
}`,
      },
    ],
  },
  {
    id: "durable-chat-agent",
    title: "Durable Multi-Turn Chat Agent",
    description:
      "Stateful conversation agent with Workflow DevKit that persists messages across pauses/resumes, calls tools, and streams responses using DurableAgent.",
    category: "workflows",
    difficulty: "advanced",
    tags: ["workflow", "durable", "stateful", "tool-calling", "workflow-devkit"],
    relatedPatterns: ["tool-calling", "human-in-the-loop"],
    files: [
      {
        path: "app/workflows/chat-agent.ts",
        lang: "typescript",
        content: `"use server";

import { openai } from "@ai-sdk/openai";
import { generateText, tool } from "ai";
import { sleep, defineHook } from "workflow";
import { z } from "zod";

// Example tools (expand as needed)
const calculator = tool({
  description: "Calculate math expressions",
  parameters: z.object({ expression: z.string() }),
  execute: async ({ expression }) => eval(expression).toString(), // ⚠️ use safe eval in prod
});

const webSearch = tool({
  description: "Search the web for current info",
  parameters: z.object({ query: z.string() }),
  execute: async ({ query }) => \`Mock search results for "\${query}"...\`, // replace with real search
});

export async function durableChatAgent({
  sessionId,
  userMessage,
  previousMessages = [],
}: {
  sessionId: string;
  userMessage: string;
  previousMessages: { role: "user" | "assistant"; content: string }[];
}) {
  "use workflow";

  // Full message history is persisted automatically via workflow replay
  const messages = [...previousMessages, { role: "user" as const, content: userMessage }];

  // Optional: sleep if you want delayed response simulation
  // await sleep("30 seconds");

  const result = await generateText({
    model: openai("gpt-4o-mini"),
    messages,
    tools: { calculator, webSearch },
    maxSteps: 5, // prevent infinite loops
  });

  const response = result.text;
  const toolResults = result.toolResults; // if any tools were called

  // Add assistant response to history for next turn
  messages.push({ role: "assistant" as const, content: response });

  return {
    response,
    updatedHistory: messages,
    toolResults,
  };
}`,
      },
      {
        path: "app/api/chat/route.ts",
        lang: "typescript",
        content: `import { createStreamableValue } from "ai/rsc";
import { durableChatAgent } from "@/app/workflows/chat-agent";
import { sleep } from "workflow";

export async function POST(req: Request) {
  const { sessionId, userMessage, previousMessages } = await req.json();
  
  const stream = createStreamableValue();
  
  // Start the workflow in background
  (async () => {
    try {
      const result = await durableChatAgent({
        sessionId,
        userMessage,
        previousMessages,
      });
      
      stream.done(result);
    } catch (error) {
      stream.error(error);
    }
  })();

  return new Response(stream.value);
}`,
      },
      {
        path: "lib/model.ts",
        lang: "typescript",
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
      },
    ],
  },
  {
    id: "workflow-approval",
    title: "Human-in-the-Loop Approval Workflow",
    description:
      "AI generates content, pauses via workflow hook until human approves/rejects via webhook. On approval, sends/finalizes; on reject, refines with feedback.",
    category: "workflows",
    difficulty: "advanced",
    tags: ["workflow", "approval", "human-in-the-loop", "hooks", "workflow-devkit"],
    relatedPatterns: ["human-in-the-loop", "durable-chat-agent"],
    files: [
      {
        path: "app/workflows/email-approval.ts",
        lang: "typescript",
        content: `import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { defineHook, FatalError } from "workflow";
import { z } from "zod";

const approvalHook = defineHook<{
  decision: "approved" | "rejected";
  feedback?: string;
}>();

export async function emailApprovalWorkflow({
  topic,
  recipient,
  hookToken,
}: {
  topic: string;
  recipient: string;
  hookToken: string; // unique per run, e.g. crypto.randomUUID()
}) {
  "use workflow";

  // Step 1: Generate draft
  const { object: draft } = await generateObject({
    model: openai("gpt-4o"),
    schema: z.object({
      subject: z.string(),
      body: z.string(),
    }),
    prompt: \`Write a professional email about \${topic} to \${recipient}.\`,
  });

  // Create hook instance and pause here
  const hook = approvalHook.create({ token: hookToken });

  // Workflow suspends — no compute used while waiting
  const { decision, feedback } = await hook; // resumes when POSTed to webhook URL

  if (decision === "rejected") {
    // Refine with feedback (loop or one-shot)
    const refined = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: z.object({ subject: z.string(), body: z.string() }),
      prompt: \`Refine this email draft based on feedback: \${feedback}\\n\\nOriginal:\\n\${draft.subject}\\n\${draft.body}\`,
    });
    return { status: "refined", draft: refined.object };
  }

  // Approved → send or finalize
  // await sendEmail(draft); // your send step

  return { status: "approved", draft };
}`,
      },
      {
        path: "app/api/approval/webhook/[token]/route.ts",
        lang: "typescript",
        content: `import { NextRequest, NextResponse } from "next/server";
import { approvalHook } from "@/app/workflows/email-approval";

export async function POST(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  const { decision, feedback } = await req.json();
  
  // Resume the workflow with the decision
  await approvalHook.resume(params.token, { decision, feedback });
  
  return NextResponse.json({ success: true });
}`,
      },
      {
        path: "app/api/approval/start/route.ts",
        lang: "typescript",
        content: `import { NextResponse } from "next/server";
import { emailApprovalWorkflow } from "@/app/workflows/email-approval";
import { approvalHook } from "@/app/workflows/email-approval";

export async function POST(req: Request) {
  const { topic, recipient } = await req.json();
  
  // Generate unique token for this workflow run
  const hookToken = crypto.randomUUID();
  
  // Start workflow in background
  (async () => {
    try {
      await emailApprovalWorkflow({
        topic,
        recipient,
        hookToken,
      });
    } catch (error) {
      console.error("Workflow failed:", error);
    }
  })();

  // Return webhook URL for human interaction
  const webhookUrl = \`\${process.env.NEXT_PUBLIC_SITE_URL}/api/approval/webhook/\${hookToken}\`;
  
  return NextResponse.json({
    webhookUrl,
    message: "Workflow started. Use the webhook URL to approve or reject.",
  });
}`,
      },
    ],
  },
  {
    id: "scheduled-workflow",
    title: "Scheduled/Delayed AI Task",
    description:
      "Durable workflow that sleeps for 7 days, then runs AI summarization/RAG on new data and generates a report. Uses 'use workflow' and sleep().",
    category: "workflows",
    difficulty: "intermediate",
    tags: ["workflow", "scheduled", "delayed", "sleep", "workflow-devkit"],
    relatedPatterns: ["durable-chat-agent", "sequential-workflow"],
    files: [
      {
        path: "app/workflows/weekly-report.ts",
        lang: "typescript",
        content: `import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { sleep } from "workflow";

export async function weeklyReportWorkflow(userId: string) {
  "use workflow";

  // Immediate: initial setup or first run
  console.log(\`Starting weekly report for user \${userId}\`);

  // Wait 7 days (zero cost while sleeping)
  await sleep("7 days");

  // Run AI generation after delay
  const { text: report } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: \`Generate a personalized weekly AI news summary for user \${userId}. Include key trends.\`,
  });

  // await sendReportEmail(userId, report); // your step

  return { status: "delivered", report };
}`,
      },
      {
        path: "app/api/schedule/route.ts",
        lang: "typescript",
        content: `import { NextResponse } from "next/server";
import { weeklyReportWorkflow } from "@/app/workflows/weekly-report";

export async function POST(req: Request) {
  const { userId } = await req.json();
  
  // Start the scheduled workflow
  (async () => {
    try {
      const result = await weeklyReportWorkflow(userId);
      console.log("Weekly report completed:", result);
    } catch (error) {
      console.error("Weekly report failed:", error);
    }
  })();

  return NextResponse.json({
    message: "Weekly report workflow scheduled",
    userId,
  });
}`,
      },
    ],
  },
  {
    id: "refinement-loop",
    title: "Refinement Loop",
    description:
      "AI refinement loop inside a durable workflow: generate → evaluate score → if low, refine and loop (max 3 times). Uses 'use step' for each phase.",
    category: "workflows",
    difficulty: "advanced",
    tags: ["workflow", "refinement", "evaluation", "iteration", "workflow-devkit"],
    relatedPatterns: ["evaluator-optimizer", "scheduled-workflow"],
    files: [
      {
        path: "app/workflows/refinement-loop.ts",
        lang: "typescript",
        content: `import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const MAX_ITERATIONS = 3;

export async function contentRefinementWorkflow(prompt: string) {
  "use workflow";

  let current = await generateDraft(prompt);
  let iteration = 0;

  while (iteration < MAX_ITERATIONS) {
    const evaluation = await evaluateContent(current);

    if (evaluation.score >= 8) {
      return { final: current, score: evaluation.score, iterations: iteration + 1 };
    }

    current = await refineContent(current, evaluation.feedback);
    iteration++;
  }

  return { final: current, score: 6, iterations: MAX_ITERATIONS, note: "max iterations reached" };
}

async function generateDraft(prompt: string) {
  "use step";
  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: z.object({ content: z.string() }),
    prompt: \`Generate high-quality content: \${prompt}\`,
  });
  return object.content;
}

async function evaluateContent(content: string) {
  "use step";
  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: z.object({ score: z.number().min(1).max(10), feedback: z.string() }),
    prompt: \`Rate this content 1-10 for quality, clarity, accuracy:\\n\\n\${content}\`,
  });
  return object;
}

async function refineContent(content: string, feedback: string) {
  "use step";
  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: z.object({ improvedContent: z.string() }),
    prompt: \`Improve this content based on feedback: \${feedback}\\n\\nOriginal: \${content}\`,
  });
  return object.improvedContent;
}`,
      },
      {
        path: "app/api/refine/route.ts",
        lang: "typescript",
        content: `import { NextResponse } from "next/server";
import { contentRefinementWorkflow } from "@/app/workflows/refinement-loop";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  
  // Start the refinement workflow
  (async () => {
    try {
      const result = await contentRefinementWorkflow(prompt);
      console.log("Refinement completed:", result);
    } catch (error) {
      console.error("Refinement failed:", error);
    }
  })();

  return NextResponse.json({
    message: "Refinement workflow started",
    prompt,
  });
}`,
      },
    ],
  },
];

export function getPattern(id: string): PatternMeta | undefined {
  return patterns.find((p) => p.id === id);
}

export function getPatternsByCategory(category?: PatternCategory): PatternMeta[] {
  if (!category) return patterns;
  return patterns.filter((p) => p.category === category);
}
