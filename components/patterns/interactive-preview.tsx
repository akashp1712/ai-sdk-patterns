"use client";

import { Suspense, useState } from "react";
import { cn } from "@/lib/utils";
import type { PatternMeta } from "@/lib/patterns";

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
    case "text-generation":
      return <TextGenerationInteractive />;
    case "image-generation":
      return <ImageGenerationInteractive />;
    default:
      return <ComingSoonPreview patternId={pattern.id} />;
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

function TextGenerationInteractive() {
  const [prompt, setPrompt] = useState("Write a haiku about programming");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");

  const handleGenerate = () => {
    setIsGenerating(true);
    setResult("");
    
    const haiku = "Semicolons fall\nLike autumn leaves in the wind —\nThe code compiles clean";
    let currentChar = 0;
    
    const interval = setInterval(() => {
      if (currentChar < haiku.length) {
        setResult(prev => prev + haiku[currentChar]);
        currentChar++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 50);
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-5">
      <div>
        <label className="text-sm font-medium mb-2 block">Prompt</label>
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
        {isGenerating ? 'Generating...' : 'Generate'}
      </button>
      <div className="flex-1 rounded-lg border border-border/60 bg-card p-5 overflow-auto">
        <div className="text-xs text-muted-foreground mb-3">Generated text</div>
        <div className="text-sm leading-relaxed italic text-foreground/80 whitespace-pre-wrap">
          {result || <span className="text-muted-foreground">Click generate to see streaming text...</span>}
          {isGenerating && <span className="inline-block w-1.5 h-4 bg-foreground/50 animate-pulse ml-0.5 -mb-0.5 rounded-sm" />}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        🔒 Demo mode - uses `generateText` with real AI providers
      </p>
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
