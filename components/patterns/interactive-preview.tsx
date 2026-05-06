"use client";

import { Suspense, useState } from "react";
import { cn } from "@/lib/utils";
import type { PatternMeta } from "@/lib/patterns";
import { getPatternPreview } from "@/components/patterns/pattern-previews";

interface InteractivePreviewProps {
  pattern: PatternMeta;
  className?: string;
}

export function InteractivePreview({ pattern, className }: InteractivePreviewProps) {
  return (
    <div className={cn("h-[520px] bg-background rounded-xl border-2 border-border overflow-hidden", className)}>
      <Suspense fallback={<PreviewSkeleton />}>
        <PatternRenderer pattern={pattern} />
      </Suspense>
    </div>
  );
}

function PatternRenderer({ pattern }: { pattern: PatternMeta }) {
  switch (pattern.id) {
    case "streaming-chat":
      return <StreamingChatInteractive />;
    case "structured-output":
      return <StructuredOutputInteractive />;
    case "tool-calling":
      return <ToolCallingInteractive />;
    case "generative-ui":
      return <GenerativeUIInteractive />;
    case "image-generation":
      return <ImageGenerationInteractive />;
    case "multi-step-agent":
      return <MultiStepAgentInteractive />;
    case "web-search":
      return <WebSearchInteractive />;
    case "reasoning-display":
      return <ReasoningDisplayInteractive />;
    case "chat-with-citations":
      return <ChatWithCitationsInteractive />;
    case "multimodal-chat":
      return <MultiModalChatInteractive />;
    case "human-in-the-loop":
      return <HumanInTheLoopInteractive />;
    case "durable-chat-agent":
      return <DurableChatAgentInteractive />;
    case "mcp-client":
      return <MCPClientInteractive />;
    case "text-to-sql":
      return <TextToSQLInteractive />;
    case "code-artifact":
      return <CodeArtifactInteractive />;
    case "rag-pipeline":
      return <RagPipelineInteractive />;
    default: {
      const staticPreview = getPatternPreview(pattern.id);
      if (staticPreview) return <>{staticPreview}</>;
      return <ComingSoonPreview patternId={pattern.id} />;
    }
  }
}

// Interactive implementations with simulated behavior
function StreamingChatInteractive() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{role: "user" | "assistant", content: string}>>([
    { role: "assistant", content: "Hello! I'm a demo AI assistant. Try asking me something!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's an interesting question! In a real implementation, I would use the AI SDK to generate a response.",
        "Great point! The streaming chat pattern uses `useChat` hook and `streamText` for real-time responses.",
        "I see what you mean. With your API key, this would connect to actual AI models like GPT-4 or Claude.",
      ];
      const aiResponse = { 
        role: "assistant" as const, 
        content: responses[Math.floor(Math.random() * responses.length)] 
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <div key={i} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn(
              "max-w-[80%] rounded-lg px-4 py-2 text-sm leading-relaxed",
              message.role === "user" ? "bg-foreground text-background" : "bg-muted"
            )}>
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2 text-sm text-muted-foreground">
              Thinking<span className="inline-block w-1.5 h-4 bg-foreground/50 animate-pulse ml-0.5 -mb-0.5 rounded-sm" />
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-border/60 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message... (demo mode)"
            className="flex-1 rounded-md border border-border/60 bg-background px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          🔒 Demo mode - add API key to enable real AI responses
        </p>
      </form>
    </div>
  );
}

function StructuredOutputInteractive() {
  const [topic, setTopic] = useState("Chocolate Chip Cookies");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");

  const handleGenerate = () => {
    setIsGenerating(true);
    setResult("");
    
    // Simulate streaming JSON
    const jsonSteps = [
      '{\\n  "name": "',
      `${topic} Recipe`,
      '\\n  "ingredients": [',
      '\\n    { "name": "butter", "amount": "1 cup" },',
      '\\n    { "name": "sugar", "amount": "3/4 cup" },',
      '\\n    { "name": "flour", "amount": "2 1/4 cups" }',
      '\\n  ],\\n  "steps": [',
      '\\n    "Preheat oven to 375°F"',
      '\\n  ]\\n}'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < jsonSteps.length) {
        setResult(prev => prev + jsonSteps[currentStep]);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 200);
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Topic</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm"
        />
      </div>
      <button 
        onClick={handleGenerate}
        disabled={isGenerating}
        className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium w-fit disabled:opacity-50"
      >
        {isGenerating ? 'Generating...' : 'Generate'}
      </button>
      <div className="flex-1 rounded-lg border border-border/60 bg-muted p-4 font-mono text-xs leading-relaxed overflow-auto">
        {result || <span className="text-muted-foreground">Click generate to see structured output...</span>}
      </div>
      <p className="text-xs text-muted-foreground">
        🔒 Demo mode - uses `generateObject` with real AI providers
      </p>
    </div>
  );
}

function ToolCallingInteractive() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{role: string, content: string, toolCall?: {name: string, result: string}}>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      let toolCall = null;
      let response = "";

      if (input.toLowerCase().includes("weather")) {
        toolCall = { name: "getWeather", result: '{ "temp": 72, "condition": "Sunny", "city": "San Francisco" }' };
        response = "The weather in San Francisco is 72°F and sunny! ☀️";
      } else if (input.toLowerCase().includes("calculate") || input.includes("+") || input.includes("*")) {
        toolCall = { name: "calculate", result: "42" };
        response = "The calculation result is 42.";
      } else {
        response = "I can help with weather info and calculations. Try asking about the weather or a math problem!";
      }

      const aiMessage = { 
        role: "assistant", 
        content: response,
        ...(toolCall && { toolCall })
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <div key={i} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn("max-w-[85%] space-y-2", message.role === "user" ? "" : "w-full")}>
              {message.role === "user" ? (
                <div className="bg-foreground text-background rounded-lg px-4 py-2 text-sm">
                  {message.content}
                </div>
              ) : (
                <>
                  <div className="bg-muted rounded-lg px-4 py-2.5 text-sm">
                    {message.content}
                  </div>
                  {message.toolCall && (
                    <div className="rounded-md border border-border/60 bg-background p-3 text-xs">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-mono text-muted-foreground">{message.toolCall.name}()</span>
                      </div>
                      <div className="font-mono text-foreground/70">{message.toolCall.result}</div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2 text-sm text-muted-foreground">
              Using tools...<span className="inline-block w-1.5 h-4 bg-foreground/50 animate-pulse ml-0.5 -mb-0.5 rounded-sm" />
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-border/60 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about weather or calculations... (demo)"
            className="flex-1 rounded-md border border-border/60 bg-background px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          🔒 Demo mode - uses `tools` parameter with real AI providers
        </p>
      </form>
    </div>
  );
}

function GenerativeUIInteractive() {
  const [input, setInput] = useState("Show me the weather in Tokyo");
  const [isGenerating, setIsGenerating] = useState(false);
  const [widgets, setWidgets] = useState<Array<{type: string, data: any}>>([]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setWidgets([]);
    
    setTimeout(() => {
      if (input.toLowerCase().includes("weather")) {
        setWidgets([
          {
            type: "weather",
            data: { city: "Tokyo", temp: 24, condition: "Clear", humidity: 45, wind: 12 }
          }
        ]);
      } else if (input.toLowerCase().includes("stock")) {
        setWidgets([
          {
            type: "stock",
            data: { symbol: "AAPL", price: 198.50, change: 2.3, history: [40, 45, 42, 50, 55, 48, 60, 65, 58, 70, 75, 80] }
          }
        ]);
      }
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-lg px-4 py-2 text-sm bg-foreground text-background">
            {input}
          </div>
        </div>
        {isGenerating ? (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2.5 text-sm">
              Generating UI...<span className="inline-block w-1.5 h-4 bg-foreground/50 animate-pulse ml-0.5 -mb-0.5 rounded-sm" />
            </div>
          </div>
        ) : widgets.length > 0 ? (
          <div className="flex justify-start">
            <div className="max-w-[80%] space-y-2">
              <div className="bg-muted rounded-lg px-4 py-2.5 text-sm">Here's the data you requested:</div>
              {widgets.map((widget, i) => (
                <div key={i} className="rounded-lg border border-border/60 bg-card p-4">
                  {widget.type === "weather" && (
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-2xl">☀️</div>
                        <div>
                          <div className="font-medium text-sm">{widget.data.city}, Japan</div>
                          <div className="text-xs text-muted-foreground">{widget.data.condition}</div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold">{widget.data.temp}°C</div>
                      <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Humidity: {widget.data.humidity}%</span>
                        <span>Wind: {widget.data.wind} km/h</span>
                      </div>
                    </div>
                  )}
                  {widget.type === "stock" && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-medium text-sm">{widget.data.symbol}</div>
                          <div className="text-xs text-muted-foreground">Apple Inc.</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${widget.data.price}</div>
                          <div className="text-xs text-muted-foreground">+{widget.data.change}%</div>
                        </div>
                      </div>
                      <div className="h-8 flex items-end gap-px">
                        {widget.data.history.map((h: number, j: number) => (
                          <div key={j} className="flex-1 bg-foreground/10 rounded-t" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <div className="border-t border-border/60 p-4">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for weather or stock data... (demo)"
            className="flex-1 rounded-md border border-border/60 bg-background px-3 py-2 text-sm"
          />
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            Generate
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          🔒 Demo mode - uses generative UI with real AI providers
        </p>
      </div>
    </div>
  );
}

function ImageGenerationInteractive() {
  const [prompt, setPrompt] = useState("A serene mountain landscape at sunset with a calm lake reflection");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setShowResult(false);
    
    setTimeout(() => {
      setShowResult(true);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-5">
      <div>
        <label className="text-sm font-medium mb-2 block">Image prompt</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm min-h-[60px] resize-none"
        />
      </div>
      <button 
        onClick={handleGenerate}
        disabled={isGenerating}
        className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium w-fit disabled:opacity-50"
      >
        {isGenerating ? 'Generating...' : 'Generate Image'}
      </button>
      <div className="flex-1 rounded-lg border border-border/60 overflow-hidden">
        {isGenerating ? (
          <div className="aspect-video bg-muted flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="w-8 h-8 rounded border-2 border-border border-t-foreground animate-spin mx-auto" />
              <div className="text-xs text-muted-foreground">Generating image...</div>
            </div>
          </div>
        ) : showResult ? (
          <div className="aspect-video bg-muted flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="relative w-48 h-28 mx-auto">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-10 bg-foreground/[0.04] rounded-full blur-sm" />
                <div className="absolute bottom-3 left-8 w-0 h-0 border-l-[40px] border-r-[40px] border-b-[50px] border-l-transparent border-r-transparent border-b-foreground/[0.08]" />
                <div className="absolute bottom-3 left-20 w-0 h-0 border-l-[30px] border-r-[30px] border-b-[40px] border-l-transparent border-r-transparent border-b-foreground/[0.06]" />
                <div className="absolute top-2 right-8 w-8 h-8 rounded-full bg-foreground/[0.06]" />
              </div>
              <div className="text-xs text-muted-foreground">512 × 512 · Generated with DALL·E 3</div>
            </div>
          </div>
        ) : (
          <div className="aspect-video bg-muted flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center mx-auto mb-3">
                <div className="w-6 h-6 rounded bg-muted" />
              </div>
              <p className="text-sm">Click generate to create an image</p>
            </div>
          </div>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        🔒 Demo mode - uses image generation models with real AI providers
      </p>
    </div>
  );
}

function CodeArtifactInteractive() {
  const [input, setInput] = useState("Create a React counter component");
  const [messages, setMessages] = useState<Array<{role: "user" | "assistant", content: string}>>([]);
  const [code, setCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsGenerating(true);
    setCode("");

    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", content: "Here's your component:" }]);
      const codeText = `'use client';\n\nimport { useState } from 'react';\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div className="flex gap-4 items-center">\n      <button\n        onClick={() => setCount(c => c - 1)}\n        className="px-3 py-1 border rounded"\n      >\n        -\n      </button>\n      <span className="text-xl font-bold">\n        {count}\n      </span>\n      <button\n        onClick={() => setCount(c => c + 1)}\n        className="px-3 py-1 border rounded"\n      >\n        +\n      </button>\n    </div>\n  );\n}`;

      let i = 0;
      const interval = setInterval(() => {
        if (i < codeText.length) {
          setCode(prev => prev + codeText[i]);
          i++;
        } else {
          clearInterval(interval);
          setIsGenerating(false);
        }
      }, 15);
    }, 600);
  };

  return (
    <div className="h-full flex">
      <div className="w-1/2 border-r border-border/60 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[80%] rounded-lg px-4 py-2.5 text-sm leading-relaxed", msg.role === "user" ? "bg-foreground text-background" : "bg-muted")}>
                {msg.content}
              </div>
            </div>
          ))}
          {isGenerating && !code && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg px-4 py-2 text-sm text-muted-foreground">
                Generating<span className="inline-block w-1.5 h-4 bg-foreground/50 animate-pulse ml-0.5 -mb-0.5 rounded-sm" />
              </div>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="border-t border-border/60 p-4">
          <div className="flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask for changes..." className="flex-1 rounded-md border border-border/60 bg-background px-3 py-2 text-sm" />
            <button type="submit" disabled={isGenerating || !input.trim()} className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium disabled:opacity-50">Send</button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">🔒 Demo mode - AI code generation</p>
        </form>
      </div>
      <div className="w-1/2 flex flex-col bg-muted">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/60 text-xs">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
            <div className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
            <div className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          </div>
          <span className="text-muted-foreground font-mono">Counter.tsx</span>
        </div>
        <div className="flex-1 p-4 font-mono text-xs leading-relaxed overflow-auto">
          {code ? <pre className="whitespace-pre-wrap">{code}</pre> : <span className="text-muted-foreground">Code will appear here...</span>}
          {isGenerating && code && <span className="inline-block w-1.5 h-3 bg-foreground/40 animate-pulse ml-0.5 rounded-sm" />}
        </div>
      </div>
    </div>
  );
}

function RagPipelineInteractive() {
  const [query, setQuery] = useState("How do I use tools with streamText?");
  const [isSearching, setIsSearching] = useState(false);
  const [stage, setStage] = useState<"idle" | "retrieving" | "documents" | "generating" | "complete">("idle");
  const [documents, setDocuments] = useState<Array<{score: string, text: string}>>([]);
  const [answer, setAnswer] = useState("");

  const handleSearch = () => {
    setIsSearching(true);
    setStage("retrieving");
    setDocuments([]);
    setAnswer("");

    setTimeout(() => {
      setStage("documents");
      setDocuments([
        { score: "0.94", text: "streamText supports tool calling via the tools parameter..." },
        { score: "0.87", text: "Tools are defined with Zod parameter schemas and execute functions..." },
        { score: "0.82", text: "The maxSteps option enables multi-step tool loops..." },
      ]);
      setTimeout(() => {
        setStage("generating");
        setTimeout(() => {
          setStage("complete");
          setAnswer("To use tools with streamText, pass a tools object with Zod schemas defining each tool's parameters. Set maxSteps to enable multi-step tool execution loops.");
          setIsSearching(false);
        }, 800);
      }, 600);
    }, 600);
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-5 overflow-y-auto">
      <div>
        <label className="text-sm font-medium mb-2 block">Ask a question about the AI SDK docs</label>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} disabled={isSearching} className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm" />
      </div>
      <button onClick={handleSearch} disabled={isSearching} className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium w-fit disabled:opacity-50">
        {isSearching ? "Searching..." : "Search & Answer"}
      </button>
      {stage === "retrieving" && (
        <div className="text-sm text-muted-foreground">Retrieving documents<span className="inline-block w-1.5 h-4 bg-foreground/50 animate-pulse ml-0.5 -mb-0.5 rounded-sm" /></div>
      )}
      {(stage === "documents" || stage === "generating" || stage === "complete") && (
        <div className="space-y-3">
          <div className="text-xs font-medium text-muted-foreground">Retrieved documents (3)</div>
          <div className="space-y-2">
            {documents.map((doc, i) => (
              <div key={i} className="rounded border border-border/60 bg-muted p-3 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-muted-foreground">Document {i + 1}</span>
                  <span className="text-foreground/60 font-mono">{doc.score}</span>
                </div>
                <div className="text-foreground/80">{doc.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {stage === "generating" && (
        <div className="text-sm text-muted-foreground">Generating answer<span className="inline-block w-1.5 h-4 bg-foreground/50 animate-pulse ml-0.5 -mb-0.5 rounded-sm" /></div>
      )}
      {stage === "complete" && (
        <div className="rounded-lg border border-border/60 bg-card p-4 text-sm leading-relaxed">{answer}</div>
      )}
      <p className="text-xs text-muted-foreground">🔒 Demo mode - RAG with vector search and LLM generation</p>
    </div>
  );
}

function HumanInTheLoopInteractive() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{type: string, content?: string, approval?: {action: string, to: string, subject: string, body: string}}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPending, setHasPending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || hasPending) return;
    setMessages(prev => [...prev, { type: "user", content: input }]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      setMessages(prev => [...prev,
        { type: "assistant", content: "I'd like to send this email. Please approve:" },
        { type: "approval", approval: { action: "sendEmail", to: "team@company.com", subject: "Q4 Project Update", body: "Hi team, here's a quick update on our Q4 progress..." } }
      ]);
      setHasPending(true);
      setIsLoading(false);
    }, 800);
  };

  const handleApprove = () => {
    setMessages(prev => [...prev, { type: "approved", content: "✓ Action approved — Email sent successfully" }]);
    setHasPending(false);
  };

  const handleDeny = () => {
    setMessages(prev => [...prev, { type: "denied", content: "✗ Action denied — Email not sent" }]);
    setHasPending(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message, i) => {
          if (message.type === "user") return (
            <div key={i} className="flex justify-end">
              <div className="max-w-[80%] rounded-lg px-4 py-2 text-sm bg-foreground text-background">{message.content}</div>
            </div>
          );
          if (message.type === "assistant") return (
            <div key={i} className="flex justify-start">
              <div className="max-w-[85%] bg-muted rounded-lg px-4 py-3 text-sm">{message.content}</div>
            </div>
          );
          if (message.type === "approval") return (
            <div key={i} className="flex justify-start">
              <div className="max-w-[85%] rounded-lg border border-border bg-card p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-medium">
                  <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                  Action requires approval
                </div>
                <div className="text-xs space-y-1.5 text-muted-foreground">
                  <div><span>Action:</span> <span className="text-foreground font-medium">{message.approval!.action}</span></div>
                  <div><span>To:</span> <span className="text-foreground">{message.approval!.to}</span></div>
                  <div><span>Subject:</span> <span className="text-foreground">{message.approval!.subject}</span></div>
                  <div className="line-clamp-2">Body: {message.approval!.body}</div>
                </div>
                <div className="flex gap-2 pt-1">
                  <button onClick={handleApprove} className="rounded-md bg-foreground text-background px-4 py-1.5 text-xs font-medium">Approve</button>
                  <button onClick={handleDeny} className="rounded-md border border-border/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">Deny</button>
                </div>
              </div>
            </div>
          );
          if (message.type === "approved" || message.type === "denied") return (
            <div key={i} className="flex justify-start">
              <div className={cn("max-w-[85%] rounded-lg px-4 py-2 text-sm font-medium", message.type === "approved" ? "bg-green-500/10 text-green-700 dark:text-green-400" : "bg-red-500/10 text-red-700 dark:text-red-400")}>
                {message.content}
              </div>
            </div>
          );
          return null;
        })}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2 text-sm text-muted-foreground">Thinking<span className="inline-block w-1.5 h-4 bg-foreground/50 animate-pulse ml-0.5 -mb-0.5 rounded-sm" /></div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-border/60 p-4">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message... (demo mode)" disabled={isLoading || hasPending} className="flex-1 rounded-md border border-border/60 bg-background px-3 py-2 text-sm disabled:opacity-50" />
          <button type="submit" disabled={isLoading || !input.trim() || hasPending} className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium disabled:opacity-50">Send</button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">🔒 Demo mode - requires human approval for sensitive actions</p>
      </form>
    </div>
  );
}

function DurableChatAgentInteractive() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{type: string, content: string, tools?: Array<{name: string, result: string}>}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    setMessages(prev => [...prev, { type: "user", content: input }]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const lower = input.toLowerCase();
      const tools: Array<{name: string, result: string}> = [];
      let response = "I processed your request.";

      if (lower.includes("tip") || lower.includes("calculate") || lower.includes("%") || /\d+/.test(input)) {
        tools.push({ name: "calculator({ expression: '85 * 0.15' })", result: "12.75" });
        response = "Your tip is $12.75, making the total $97.75.";
      }
      if (lower.includes("search") || lower.includes("trend") || lower.includes("find")) {
        tools.push({ name: "webSearch({ query: 'AI trends 2025' })", result: "Found 5 sources" });
        response += " Current AI trends include increased adoption of multi-modal models and edge AI.";
      }
      if (tools.length === 0) {
        tools.push({ name: "webSearch({ query: 'general information' })", result: "Found 3 sources" });
        response = "I found some information that might help you.";
      }

      const newCount = messageCount + 1;
      setMessageCount(newCount);
      setMessages(prev => [...prev, { type: "assistant", content: response, tools }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message, i) => {
          if (message.type === "user") return (
            <div key={i} className="flex justify-end">
              <div className="max-w-[80%] rounded-lg px-4 py-2 text-sm bg-foreground text-background">{message.content}</div>
            </div>
          );
          if (message.type === "assistant") return (
            <div key={i} className="flex justify-start">
              <div className="max-w-[85%] bg-muted rounded-lg px-4 py-3 text-sm space-y-3">
                {message.tools && message.tools.map((tool, j) => (
                  <div key={j} className="rounded-md border border-border/60 bg-background p-3 text-xs">
                    <div className="font-mono text-muted-foreground mb-1.5">{tool.name}</div>
                    <div className="font-mono text-foreground/70">{tool.result}</div>
                  </div>
                ))}
                <div className="leading-relaxed">{message.content}</div>
                <div className="text-xs text-muted-foreground border-t border-border/60 pt-2">
                  <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-green-500" /><span>Session persisted · {messageCount} messages</span></div>
                </div>
              </div>
            </div>
          );
          return null;
        })}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2 text-sm text-muted-foreground">Using tools<span className="inline-block w-1.5 h-4 bg-foreground/50 animate-pulse ml-0.5 -mb-0.5 rounded-sm" /></div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-border/60 p-4">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Calculate tip, search trends... (demo)" className="flex-1 rounded-md border border-border/60 bg-background px-3 py-2 text-sm" />
          <button type="submit" disabled={isLoading || !input.trim()} className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium disabled:opacity-50">Send</button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">🔒 Demo mode - session state persisted across tool calls</p>
      </form>
    </div>
  );
}

function MCPClientInteractive() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{type: string, content: string, tools?: Array<{name: string, result: string}>}>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    setMessages(prev => [...prev, { type: "user", content: input }]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const lower = input.toLowerCase();
      const tools: Array<{name: string, result: string}> = [];
      let response = "Try asking about the weather, unit conversions, or calculations!";

      if (lower.includes("weather")) {
        const city = lower.includes("paris") ? "Paris" : lower.includes("tokyo") ? "Tokyo" : "San Francisco";
        tools.push({ name: `getWeather({ city: "${city}" })`, result: `{ "city": "${city}", "temperature": 22, "condition": "Sunny" }` });
        response = `It's 22°C and sunny in ${city}.`;
      }
      if (lower.includes("convert") || lower.includes("fahrenheit") || lower.includes("celsius")) {
        tools.push({ name: 'convertUnits({ value: 25, from: "C", to: "F" })', result: "25 C = 77.00 F" });
        response += " 25°C converts to 77°F — a beautiful day!";
      }
      if (lower.includes("calculate") || /\d+\s*[+\-*/]\s*\d+/.test(input)) {
        tools.push({ name: "calculate({ expression: '25 + 17' })", result: "42" });
        response = "The calculation result is 42.";
      }

      setMessages(prev => [...prev, { type: "assistant", content: response, tools }]);
      setIsLoading(false);
    }, 900);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border/60 p-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">MCP Server:</span>
          <div className="flex-1 rounded-md border border-border/60 bg-background px-2 py-1 text-xs font-mono text-muted-foreground">http://localhost:3001/mcp</div>
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-[10px] text-muted-foreground">Connected</span>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {["getWeather", "calculate", "convertUnits"].map((tool) => (
            <span key={tool} className="text-[10px] px-1.5 py-0.5 rounded bg-foreground/[0.06] font-mono text-muted-foreground">{tool}</span>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message, i) => {
          if (message.type === "user") return (
            <div key={i} className="flex justify-end">
              <div className="max-w-[80%] rounded-lg px-4 py-2 text-sm bg-foreground text-background">{message.content}</div>
            </div>
          );
          if (message.type === "assistant") return (
            <div key={i} className="flex justify-start">
              <div className="max-w-[85%] bg-muted rounded-lg px-4 py-3 text-sm space-y-2">
                {message.tools && message.tools.map((tool, j) => (
                  <div key={j} className="rounded-md border border-border/60 bg-background p-3 text-xs">
                    <div className="font-mono text-muted-foreground mb-1.5">{tool.name}</div>
                    <div className="font-mono text-foreground/70">{tool.result}</div>
                  </div>
                ))}
                <div className="leading-relaxed">{message.content}</div>
              </div>
            </div>
          );
          return null;
        })}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2 text-sm text-muted-foreground">Calling MCP tools<span className="inline-block w-1.5 h-4 bg-foreground/50 animate-pulse ml-0.5 -mb-0.5 rounded-sm" /></div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-border/60 p-4">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about weather, conversions, calculations... (demo)" className="flex-1 rounded-md border border-border/60 bg-background px-3 py-2 text-sm" />
          <button type="submit" disabled={isLoading || !input.trim()} className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium disabled:opacity-50">Send</button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">🔒 Demo mode - connects to MCP servers for tool access</p>
      </form>
    </div>
  );
}

function TextToSQLInteractive() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{type: string, content: string, sql?: string, results?: string[][], summary?: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    setMessages(prev => [...prev, { type: "user", content: input }]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const lower = input.toLowerCase();
      let sql = "SELECT * FROM employees LIMIT 5";
      let results: string[][] = [["Alice Chen", "Engineer", "$120,000"], ["Bob Smith", "Designer", "$105,000"], ["Carol Wu", "PM", "$115,000"]];
      let summary = "Here are 5 sample employees from the database.";

      if (lower.includes("highest") || lower.includes("top") || lower.includes("paid")) {
        sql = "SELECT name, title, salary FROM employees ORDER BY salary DESC LIMIT 3";
        results = [["Henry Park", "Principal Engineer", "$155,000"], ["Carol Wu", "Staff Engineer", "$140,000"], ["Alice Chen", "Senior Engineer", "$125,000"]];
        summary = "The top 3 highest paid employees are Henry Park ($155K), Carol Wu ($140K), and Alice Chen ($125K).";
      } else if (lower.includes("department") || lower.includes("count")) {
        sql = "SELECT department, COUNT(*) as count FROM employees GROUP BY department";
        results = [["Engineering", "12"], ["Product", "5"], ["Design", "4"]];
        summary = "Engineering has the most employees (12), followed by Product (5) and Design (4).";
      }

      setMessages(prev => [...prev, { type: "result", content: "", sql, results, summary }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border/60 p-4">
        <div className="text-sm font-medium mb-2">Ask questions about your data</div>
        <div className="flex gap-1.5 flex-wrap">
          {["employees", "departments", "projects"].map((t) => (
            <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-foreground/[0.06] font-mono text-muted-foreground">{t}</span>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message, i) => {
          if (message.type === "user") return (
            <div key={i} className="flex justify-end">
              <div className="max-w-[80%] rounded-lg px-4 py-2 text-sm bg-foreground text-background">{message.content}</div>
            </div>
          );
          if (message.type === "result") return (
            <div key={i} className="flex justify-start">
              <div className="max-w-[90%] space-y-2">
                <div className="rounded-lg border border-border/60 overflow-hidden">
                  <div className="px-3 py-1.5 border-b bg-muted/50">
                    <code className="text-[10px] font-mono text-muted-foreground">{message.sql}</code>
                  </div>
                  <table className="w-full text-xs">
                    <tbody>
                      {message.results && message.results.map((row, j) => (
                        <tr key={j} className="border-b last:border-0">
                          {row.map((cell, k) => <td key={k} className="px-3 py-1.5 text-[11px]">{cell}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-3 py-1 border-t text-[10px] text-muted-foreground bg-muted/30">{message.results?.length} rows</div>
                </div>
                <div className="bg-muted rounded-lg px-4 py-2 text-sm">{message.summary}</div>
              </div>
            </div>
          );
          return null;
        })}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2 text-sm text-muted-foreground">Generating SQL<span className="inline-block w-1.5 h-4 bg-foreground/50 animate-pulse ml-0.5 -mb-0.5 rounded-sm" /></div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-border/60 p-4">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about the data... (demo mode)" className="flex-1 rounded-md border border-border/60 bg-background px-3 py-2 text-sm" />
          <button type="submit" disabled={isLoading || !input.trim()} className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium disabled:opacity-50">Send</button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">🔒 Demo mode - converts natural language to SQL queries</p>
      </form>
    </div>
  );
}

function MultiStepAgentInteractive() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{role: string, content: string, steps?: Array<{name: string, status: string, result?: string}>}>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const steps = [
      { name: "webSearch", delay: 600, result: '{ "results": 3, "sources": ["docs.ai", "github.com"] }' },
      { name: "readDocs", delay: 800, result: '{ "pages": 5, "relevance": "high" }' },
      { name: "generateSummary", delay: 600, result: '{ "tokens": 250 }' }
    ];

    const agentMessage = {
      role: "assistant",
      content: "",
      steps: steps.map(s => ({ name: s.name, status: "pending" }))
    };
    setMessages(prev => [...prev, agentMessage]);

    let completedSteps = 0;
    const runSteps = () => {
      if (completedSteps < steps.length) {
        const currentStep = steps[completedSteps];
        setMessages(prev => prev.map((m, i) =>
          i === prev.length - 1
            ? { ...m, steps: m.steps?.map((s, j) => j === completedSteps ? { ...s, status: "running" } : s) }
            : m
        ));
        setTimeout(() => {
          setMessages(prev => prev.map((m, i) =>
            i === prev.length - 1
              ? { ...m, steps: m.steps?.map((s, j) => j === completedSteps ? { ...s, status: "done", result: currentStep.result } : s) }
              : m
          ));
          completedSteps++;
          runSteps();
        }, currentStep.delay);
      } else {
        setTimeout(() => {
          setMessages(prev => prev.map((m, i) =>
            i === prev.length - 1
              ? { ...m, content: "Based on my research across multiple sources, the AI SDK provides robust tools for building multi-step agents with tool calling and streaming capabilities." }
              : m
          ));
          setIsLoading(false);
        }, 400);
      }
    };
    runSteps();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <div key={i} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn("max-w-[85%] space-y-2", message.role === "user" ? "" : "w-full")}>
              {message.role === "user" ? (
                <div className="bg-foreground text-background rounded-lg px-4 py-2 text-sm">{message.content}</div>
              ) : (
                <>
                  {message.steps && message.steps.map((step, j) => (
                    <div key={j} className="rounded-md border border-border/60 bg-background p-3 text-xs my-2">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-mono text-muted-foreground">{step.name}()</span>
                        {step.status === "running" && <span className="text-foreground/50">...</span>}
                        {step.status === "done" && <span className="text-foreground/40">✓</span>}
                      </div>
                      {step.result && <div className="font-mono text-foreground/70">{step.result}</div>}
                    </div>
                  ))}
                  {message.content && (
                    <div className="bg-muted rounded-lg px-4 py-2.5 text-sm">{message.content}</div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role === "assistant" && !messages[messages.length - 1]?.content && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2 text-sm text-muted-foreground">
              Processing<span className="inline-block w-1.5 h-4 bg-foreground/50 animate-pulse ml-0.5 -mb-0.5 rounded-sm" />
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-border/60 p-4">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a complex question... (demo)" className="flex-1 rounded-md border border-border/60 bg-background px-3 py-2 text-sm" />
          <button type="submit" disabled={isLoading || !input.trim()} className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium disabled:opacity-50">Send</button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">🔒 Demo mode - multi-step agent with sequential tool execution</p>
      </form>
    </div>
  );
}

function WebSearchInteractive() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{role: string, content: string, sources?: Array<{title: string, url: string, snippet: string}>}>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsLoading(true);
    setMessages(prev => [...prev, { role: "assistant", content: "Searching" }]);

    setTimeout(() => {
      const sources = [
        { title: "AI SDK Documentation - Web Search Integration", url: "sdk.vercel.ai/docs", snippet: "Learn how to integrate web search capabilities using the AI SDK's tool calling features..." },
        { title: "Building Search-Augmented AI Apps", url: "vercel.com/blog/ai-sdk", snippet: "Combine real-time web search with AI responses to provide up-to-date, factual information..." },
      ];
      setMessages(prev => prev.map((m, i) =>
        i === prev.length - 1
          ? { role: "assistant", content: "I found several relevant results. The AI SDK provides comprehensive tools for building search-augmented applications.", sources }
          : m
      ));
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <div key={i} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn("max-w-[85%] space-y-2", message.role === "user" ? "" : "w-full")}>
              {message.role === "user" ? (
                <div className="bg-foreground text-background rounded-lg px-4 py-2 text-sm">{message.content}</div>
              ) : (
                <>
                  <div className="bg-muted rounded-lg px-4 py-2.5 text-sm">
                    {message.content}
                    {message.content === "Searching" && <span className="inline-block w-1.5 h-4 bg-foreground/50 animate-pulse ml-0.5 -mb-0.5 rounded-sm" />}
                  </div>
                  {message.sources && (
                    <div className="space-y-2 mt-2">
                      {message.sources.map((source, j) => (
                        <div key={j} className="rounded border border-border/60 bg-background p-2.5 text-xs">
                          <div className="font-medium text-foreground">{source.title}</div>
                          <div className="text-muted-foreground/50 text-[10px] mb-1">{source.url}</div>
                          <div className="text-muted-foreground">{source.snippet}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-border/60 p-4">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search anything... (demo)" className="flex-1 rounded-md border border-border/60 bg-background px-3 py-2 text-sm" />
          <button type="submit" disabled={isLoading || !input.trim()} className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium disabled:opacity-50">Search</button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">🔒 Demo mode - web search with source citations</p>
      </form>
    </div>
  );
}

function ReasoningDisplayInteractive() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{role: string, content: string, reasoning?: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentReasoning, setCurrentReasoning] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [phase, setPhase] = useState<"reasoning" | "answer" | "done">("done");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsLoading(true);
    setPhase("reasoning");
    setCurrentReasoning("");
    setCurrentAnswer("");

    const reasoningText = "Let me break this down step by step. First, I need to consider the context and requirements. The AI SDK provides several approaches for this. Given the constraints, the most efficient solution would be to use the streaming capabilities combined with tool calling.";
    const answerText = "I recommend using the `streamText` function with the `tools` parameter. This approach gives you real-time responses while maintaining the ability to call external functions for enhanced capabilities.";

    let rChar = 0;
    const reasoningInterval = setInterval(() => {
      if (rChar < reasoningText.length) {
        setCurrentReasoning(prev => prev + reasoningText[rChar]);
        rChar++;
      } else {
        clearInterval(reasoningInterval);
        setPhase("answer");
        let aChar = 0;
        const answerInterval = setInterval(() => {
          if (aChar < answerText.length) {
            setCurrentAnswer(prev => prev + answerText[aChar]);
            aChar++;
          } else {
            clearInterval(answerInterval);
            setMessages(prev => [...prev, { role: "assistant", content: answerText, reasoning: reasoningText }]);
            setPhase("done");
            setCurrentReasoning("");
            setCurrentAnswer("");
            setIsLoading(false);
          }
        }, 30);
      }
    }, 20);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <div key={i} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn("max-w-[85%] space-y-2", message.role === "user" ? "" : "w-full")}>
              {message.role === "user" ? (
                <div className="bg-foreground text-background rounded-lg px-4 py-2 text-sm">{message.content}</div>
              ) : (
                <>
                  {message.reasoning && (
                    <div className="rounded-lg border border-border/60 bg-muted/30 p-3 text-xs">
                      <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                        <span className="font-medium">Thinking</span>
                      </div>
                      <div className="text-muted-foreground/80 leading-relaxed">{message.reasoning}</div>
                    </div>
                  )}
                  <div className="bg-muted rounded-lg px-4 py-2.5 text-sm">{message.content}</div>
                </>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] w-full space-y-2">
              {(phase === "reasoning" || phase === "answer") && (
                <div className="rounded-lg border border-border/60 bg-muted/30 p-3 text-xs">
                  <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                    <span className="font-medium">Thinking</span>
                  </div>
                  <div className="text-muted-foreground/80 leading-relaxed">
                    {currentReasoning}
                    {phase === "reasoning" && <span className="inline-block w-1.5 h-4 bg-foreground/50 animate-pulse ml-0.5 -mb-0.5 rounded-sm" />}
                  </div>
                </div>
              )}
              {phase === "answer" && (
                <div className="bg-muted rounded-lg px-4 py-2.5 text-sm">
                  {currentAnswer}
                  <span className="inline-block w-1.5 h-4 bg-foreground/50 animate-pulse ml-0.5 -mb-0.5 rounded-sm" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-border/60 p-4">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question requiring reasoning... (demo)" className="flex-1 rounded-md border border-border/60 bg-background px-3 py-2 text-sm" />
          <button type="submit" disabled={isLoading || !input.trim()} className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium disabled:opacity-50">Send</button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">🔒 Demo mode - displays reasoning process before final answer</p>
      </form>
    </div>
  );
}

function ChatWithCitationsInteractive() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{role: string, content: string, citations?: Array<{id: number, title: string, url: string}>}>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const citations = [
        { id: 1, title: "AI SDK Core Documentation", url: "sdk.vercel.ai/docs/ai-sdk-core" },
        { id: 2, title: "Streaming Text Responses", url: "sdk.vercel.ai/docs/generating-text" },
        { id: 3, title: "Tool Calling Guide", url: "sdk.vercel.ai/docs/tools-and-tool-calling" },
      ];
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "The AI SDK provides comprehensive capabilities for building AI applications [1]. It supports streaming text responses for real-time interactions [2] and includes powerful tool calling features [3].",
        citations,
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <div key={i} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn("max-w-[85%] space-y-2", message.role === "user" ? "" : "w-full")}>
              {message.role === "user" ? (
                <div className="bg-foreground text-background rounded-lg px-4 py-2 text-sm">{message.content}</div>
              ) : (
                <>
                  <div className="bg-muted rounded-lg px-4 py-2.5 text-sm leading-relaxed">{message.content}</div>
                  {message.citations && (
                    <div className="space-y-1.5">
                      <div className="text-xs font-medium text-muted-foreground px-1">Sources</div>
                      {message.citations.map((citation) => (
                        <div key={citation.id} className="rounded border border-border/60 bg-background p-2.5 text-xs">
                          <div className="flex items-start gap-2">
                            <span className="font-mono text-muted-foreground/60 text-[10px] mt-0.5">[{citation.id}]</span>
                            <div>
                              <div className="font-medium text-foreground">{citation.title}</div>
                              <div className="text-muted-foreground/50 text-[10px] mt-0.5">{citation.url}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2 text-sm text-muted-foreground">
              Researching<span className="inline-block w-1.5 h-4 bg-foreground/50 animate-pulse ml-0.5 -mb-0.5 rounded-sm" />
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-border/60 p-4">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question... (demo)" className="flex-1 rounded-md border border-border/60 bg-background px-3 py-2 text-sm" />
          <button type="submit" disabled={isLoading || !input.trim()} className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium disabled:opacity-50">Send</button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">🔒 Demo mode - responses with inline citations and sources</p>
      </form>
    </div>
  );
}

function MultiModalChatInteractive() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{role: string, content: string, hasAttachment?: boolean}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAttachment, setHasAttachment] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const hadAttachment = hasAttachment;
    setMessages(prev => [...prev, { role: "user", content: input, hasAttachment: hadAttachment }]);
    setInput("");
    setHasAttachment(false);
    setIsLoading(true);

    setTimeout(() => {
      const response = hadAttachment
        ? "I can see a beautiful landscape image. The photo shows rolling hills with lush greenery, a winding path, and a vibrant sunset sky with orange and purple hues. The composition is well-balanced with natural lighting that creates a peaceful, serene atmosphere."
        : "I'd be happy to analyze images for you! Click the 📎 button to attach an image, then send your message.";
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <div key={i} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn("max-w-[85%] space-y-2", message.role === "user" ? "" : "")}>
              {message.role === "user" ? (
                <>
                  {message.hasAttachment && (
                    <div className="rounded-lg border border-border/60 bg-background p-2 mb-1.5">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-10 h-10 rounded bg-muted flex items-center justify-center text-lg">🖼️</div>
                        <div><div className="font-medium text-foreground">landscape.jpg</div><div className="text-muted-foreground/50 text-[10px]">1.2 MB · Image</div></div>
                      </div>
                    </div>
                  )}
                  <div className="bg-foreground text-background rounded-lg px-4 py-2 text-sm">{message.content}</div>
                </>
              ) : (
                <div className="bg-muted rounded-lg px-4 py-2.5 text-sm leading-relaxed">{message.content}</div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2 text-sm text-muted-foreground">
              Analyzing<span className="inline-block w-1.5 h-4 bg-foreground/50 animate-pulse ml-0.5 -mb-0.5 rounded-sm" />
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-border/60 p-4">
        {hasAttachment && (
          <div className="mb-2 rounded-lg border border-border/60 bg-background p-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-10 h-10 rounded bg-muted flex items-center justify-center text-lg">🖼️</div>
              <div className="flex-1"><div className="font-medium text-foreground">landscape.jpg</div><div className="text-muted-foreground/50 text-[10px]">1.2 MB · Image</div></div>
              <button type="button" onClick={() => setHasAttachment(false)} className="text-muted-foreground hover:text-foreground px-1">✕</button>
            </div>
          </div>
        )}
        <div className="flex gap-2">
          <button type="button" onClick={() => setHasAttachment(!hasAttachment)} disabled={isLoading} className={cn("rounded-md border border-border/60 px-3 py-2 text-sm disabled:opacity-50", hasAttachment ? "bg-foreground/10" : "bg-background")}>📎</button>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Describe what you want to analyze... (demo)" className="flex-1 rounded-md border border-border/60 bg-background px-3 py-2 text-sm" />
          <button type="submit" disabled={isLoading || !input.trim()} className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium disabled:opacity-50">Send</button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">🔒 Demo mode - multi-modal chat with image attachments</p>
      </form>
    </div>
  );
}

function ComingSoonPreview({ patternId }: { patternId: string }) {
  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center mx-auto mb-4">
          <div className="w-6 h-6 rounded bg-muted" />
        </div>
        <h3 className="text-base font-medium mb-2">Interactive Demo Coming Soon</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          The <code className="text-xs bg-foreground/10 px-1 rounded">{patternId}</code> pattern demo is being prepared.
        </p>
        <p className="text-xs text-muted-foreground">
          Download the pattern to try it with your API key
        </p>
      </div>
    </div>
  );
}

function PreviewSkeleton() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 rounded border-2 border-border border-t-foreground animate-spin mx-auto mb-4" />
        <p className="text-sm text-muted-foreground">Loading interactive preview...</p>
      </div>
    </div>
  );
}
