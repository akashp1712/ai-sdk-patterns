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
    case "text-generation":
      return <TextGenerationInteractive />;
    case "image-generation":
      return <ImageGenerationInteractive />;
    case "multi-step-agent":
      return <MultiStepAgentInteractive />;
    case "web-search":
      return <WebSearchInteractive />;
    case "markdown-chat":
      return <MarkdownChatInteractive />;
    case "reasoning-display":
      return <ReasoningDisplayInteractive />;
    case "chat-with-citations":
      return <ChatWithCitationsInteractive />;
    case "multimodal-chat":
      return <MultiModalChatInteractive />;
    case "human-in-the-loop":
      return <HumanInTheLoopInteractive />;
    case "routing-agent":
      return <RoutingAgentInteractive />;
    case "durable-chat-agent":
      return <DurableChatAgentInteractive />;
    case "mcp-client":
      return <MCPClientInteractive />;
    case "text-to-sql":
      return <TextToSQLInteractive />;
    case "workflow-approval":
      return <WorkflowApprovalInteractive />;
    case "streaming-object":
      return <StreamingObjectInteractive />;
    case "json-renderer":
      return <JsonRendererInteractive />;
    case "code-artifact":
      return <CodeArtifactInteractive />;
    case "form-generator":
      return <FormGeneratorInteractive />;
    case "csv-editor":
      return <CsvEditorInteractive />;
    case "rag-pipeline":
      return <RagPipelineInteractive />;
    case "orchestrator-agent":
      return <OrchestratorAgentInteractive />;
    case "evaluator-optimizer":
      return <EvaluatorOptimizerInteractive />;
    case "sequential-workflow":
      return <SequentialWorkflowInteractive />;
    case "parallel-workflow":
      return <ParallelWorkflowInteractive />;
    case "scheduled-workflow":
      return <ScheduledWorkflowInteractive />;
    case "refinement-loop":
      return <RefinementLoopInteractive />;
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

function OrchestratorAgentInteractive() {
  const [input, setInput] = useState("Analyze this startup idea: AI-powered recipe generator");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [agents, setAgents] = useState<Array<{name: string, status: "pending" | "running" | "done", result: string}>>([]);
  const [finalAnalysis, setFinalAnalysis] = useState("");

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setAgents([]);
    setFinalAnalysis("");

    setTimeout(() => {
      setAgents([
        { name: "Market Researcher", status: "running", result: "" },
        { name: "Technical Analyst", status: "pending", result: "" },
        { name: "Business Strategist", status: "pending", result: "" },
      ]);
    }, 300);

    const results = ["Growing market, $12B by 2027", "Feasible with current AI APIs", "Freemium model recommended"];
    setTimeout(() => setAgents(prev => prev.map((a, i) => i === 0 ? { ...a, status: "done", result: results[0] } : i === 1 ? { ...a, status: "running" } : a)), 800);
    setTimeout(() => setAgents(prev => prev.map((a, i) => i === 1 ? { ...a, status: "done", result: results[1] } : i === 2 ? { ...a, status: "running" } : a)), 1300);
    setTimeout(() => setAgents(prev => prev.map((a, i) => i === 2 ? { ...a, status: "done", result: results[2] } : a)), 1800);
    setTimeout(() => {
      setFinalAnalysis("This AI-powered recipe generator shows strong potential. The market is expanding rapidly, the technology stack is mature and accessible, and a freemium business model provides a sustainable growth path.");
      setIsAnalyzing(false);
    }, 2300);
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-5 overflow-y-auto">
      <div>
        <label className="text-sm font-medium mb-2 block">Startup Idea</label>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} disabled={isAnalyzing} className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm" />
      </div>
      <button onClick={handleAnalyze} disabled={isAnalyzing} className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium w-fit disabled:opacity-50">
        {isAnalyzing ? "Analyzing..." : "Analyze"}
      </button>
      {agents.length > 0 && (
        <div className="space-y-3">
          <div className="text-sm font-medium">Orchestrator dispatched 3 sub-agents:</div>
          {agents.map((agent, i) => (
            <div key={i} className="rounded border border-border/60 bg-background p-2.5 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-foreground">{agent.name}</span>
                {agent.status === "running" && <div className="w-3.5 h-3.5 rounded border-2 border-border border-t-foreground animate-spin" />}
                {agent.status === "done" && <span className="text-foreground/60">done</span>}
              </div>
              {agent.result && <div className="text-muted-foreground">{agent.result}</div>}
            </div>
          ))}
        </div>
      )}
      {finalAnalysis && (
        <div className="rounded-lg border border-border/60 bg-muted p-4">
          <div className="text-xs font-medium text-muted-foreground mb-2">Merged analysis</div>
          <div className="text-sm text-foreground/80 leading-relaxed">{finalAnalysis}</div>
        </div>
      )}
      <p className="text-xs text-muted-foreground">🔒 Demo mode - orchestrator pattern coordinates multiple AI agents</p>
    </div>
  );
}

function EvaluatorOptimizerInteractive() {
  const [input, setInput] = useState("Write a product description for wireless earbuds");
  const [isGenerating, setIsGenerating] = useState(false);
  const [iterations, setIterations] = useState<Array<{iteration: number, score: number, feedback: string}>>([]);
  const [finalOutput, setFinalOutput] = useState("");

  const handleGenerate = () => {
    setIsGenerating(true);
    setIterations([]);
    setFinalOutput("");

    const iterationData = [
      { iteration: 1, score: 6, feedback: "Too generic, lacks specific features" },
      { iteration: 2, score: 8, feedback: "Good detail, needs stronger CTA" },
      { iteration: 3, score: 9, feedback: "Meets quality threshold ✓" },
    ];
    iterationData.forEach((data, i) => {
      setTimeout(() => {
        setIterations(prev => [...prev, data]);
        if (i === iterationData.length - 1) {
          setTimeout(() => {
            setFinalOutput("Experience immersive sound with our AirPods Pro — featuring active noise cancellation, spatial audio, and 30-hour battery life. Sweat-resistant, seamlessly integrated with all your devices. Order now with free shipping!");
            setIsGenerating(false);
          }, 500);
        }
      }, (i + 1) * 800);
    });
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-5 overflow-y-auto">
      <div>
        <label className="text-sm font-medium mb-2 block">Task</label>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} disabled={isGenerating} className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm" />
      </div>
      <button onClick={handleGenerate} disabled={isGenerating} className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium w-fit disabled:opacity-50">
        {isGenerating ? "Optimizing..." : "Generate & Optimize"}
      </button>
      {iterations.length > 0 && (
        <div className="space-y-3">
          {iterations.map((iter) => (
            <div key={iter.iteration} className="rounded border border-border/60 bg-card p-3 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-foreground">Iteration {iter.iteration}</span>
                <span className="text-muted-foreground font-mono">{iter.score}/10</span>
              </div>
              <div className="text-muted-foreground">{iter.feedback}</div>
            </div>
          ))}
        </div>
      )}
      {finalOutput && (
        <div className="rounded-lg border border-border/60 bg-card p-4 text-sm leading-relaxed">
          <div className="text-xs text-muted-foreground mb-2">Final output (9/10)</div>
          {finalOutput}
        </div>
      )}
      <p className="text-xs text-muted-foreground">🔒 Demo mode - evaluator optimizes output through iterative refinement</p>
    </div>
  );
}

function SequentialWorkflowInteractive() {
  const [input, setInput] = useState("Quantum computing breakthrough at MIT");
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState<Array<{step: number, name: string, status: "running" | "done", output: string}>>([]);

  const handleRun = () => {
    setIsRunning(true);
    setSteps([]);

    const stepData = [
      { step: 1, name: "Research", output: "Found 5 sources on MIT quantum research..." },
      { step: 2, name: "Summarize", output: "MIT researchers achieved quantum error correction..." },
      { step: 3, name: "Translate", output: "MIT-Forscher erreichten Quanten-Fehlerkorrektur..." },
      { step: 4, name: "Format", output: "Formatted as blog post with headings and metadata" },
    ];

    stepData.forEach((data, i) => {
      setTimeout(() => {
        setSteps(prev => [...prev, { ...data, status: "running" }]);
        setTimeout(() => {
          setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: "done" } : s));
          if (i === stepData.length - 1) setIsRunning(false);
        }, 700);
      }, i * 1400);
    });
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-5 overflow-y-auto">
      <div>
        <label className="text-sm font-medium mb-2 block">Input text</label>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} disabled={isRunning} className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm" />
      </div>
      <button onClick={handleRun} disabled={isRunning} className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium w-fit disabled:opacity-50">
        {isRunning ? "Running..." : "Run Pipeline"}
      </button>
      {steps.length > 0 && (
        <div className="space-y-2">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3 rounded border border-border/60 bg-card p-3 text-xs">
              <div className={cn("h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5", step.status === "done" ? "bg-foreground/10" : "bg-muted")}>
                {step.step}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-foreground">{step.name}</span>
                  {step.status === "running"
                    ? <div className="w-3.5 h-3.5 rounded border-2 border-border border-t-foreground animate-spin" />
                    : <span className="text-foreground/60">done</span>
                  }
                </div>
                {step.status === "done" && <div className="text-muted-foreground truncate">{step.output}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-muted-foreground">🔒 Demo mode - sequential workflow processes data through multiple stages</p>
    </div>
  );
}

function ParallelWorkflowInteractive() {
  const [input, setInput] = useState("The new iPhone launch exceeded expectations with record sales...");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [tasks, setTasks] = useState<Array<{name: string, status: "running" | "done", result: {sentiment?: string, confidence?: number, entities?: string[], summary?: string}}>>([]);
  const [merged, setMerged] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setMerged(false);
    setTasks([
      { name: "Sentiment", status: "running", result: {} },
      { name: "Entities", status: "running", result: {} },
      { name: "Summary", status: "running", result: {} },
    ]);

    setTimeout(() => {
      setTasks([
        { name: "Sentiment", status: "done", result: { sentiment: "Positive", confidence: 0.92 } },
        { name: "Entities", status: "done", result: { entities: ["iPhone", "Apple"] } },
        { name: "Summary", status: "done", result: { summary: "Apple's iPhone launch achieved record-breaking sales, surpassing market expectations." } },
      ]);
      setTimeout(() => { setMerged(true); setIsAnalyzing(false); }, 400);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-5 overflow-y-auto">
      <div>
        <label className="text-sm font-medium mb-2 block">Text to analyze</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} disabled={isAnalyzing} className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm min-h-[60px] resize-none" />
      </div>
      <button onClick={handleAnalyze} disabled={isAnalyzing} className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium w-fit disabled:opacity-50">
        {isAnalyzing ? "Analyzing..." : "Analyze (Parallel)"}
      </button>
      {tasks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {tasks.map((task, i) => (
            <div key={i} className="rounded border border-border/60 bg-card p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-medium">{task.name}</div>
                {task.status === "running" && <div className="w-3 h-3 rounded border-2 border-border border-t-foreground animate-spin" />}
              </div>
              {task.status === "done" && (
                <div className="text-sm">
                  {task.name === "Sentiment" && <><div className="text-foreground font-medium">{task.result.sentiment}</div><div className="text-xs text-muted-foreground mt-1">Confidence: {task.result.confidence}</div></>}
                  {task.name === "Entities" && <div className="flex flex-wrap gap-1">{task.result.entities?.map((e, j) => <span key={j} className="text-xs px-1.5 py-0.5 rounded bg-foreground/[0.06]">{e}</span>)}</div>}
                  {task.name === "Summary" && <div className="text-xs text-muted-foreground leading-relaxed">{task.result.summary}</div>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {merged && (
        <div className="rounded-lg border border-border/60 bg-card p-4 text-sm leading-relaxed">
          <div className="text-xs text-muted-foreground mb-2">Merged result (3 tasks completed in parallel)</div>
          This article reports positively on Apple{"'"}s iPhone launch, highlighting record-breaking sales figures that surpassed market expectations.
        </div>
      )}
      <p className="text-xs text-muted-foreground">🔒 Demo mode - parallel workflow executes tasks simultaneously</p>
    </div>
  );
}

function ScheduledWorkflowInteractive() {
  const [userId, setUserId] = useState("user-123");
  const [status, setStatus] = useState<"idle" | "scheduling" | "scheduled" | "cancelled">("idle");
  const [statusSteps, setStatusSteps] = useState<Array<{label: string, color: string}>>([]);

  const handleSchedule = () => {
    setStatus("scheduling");
    setStatusSteps([]);

    const steps = [
      { label: "Started", color: "bg-green-500" },
      { label: "Sleeping for 7 days...", color: "bg-yellow-500" },
      { label: "Will resume on 2026-04-01", color: "bg-blue-500" },
    ];
    steps.forEach((step, i) => {
      setTimeout(() => {
        setStatusSteps(prev => [...prev, step]);
        if (i === steps.length - 1) setTimeout(() => setStatus("scheduled"), 300);
      }, (i + 1) * 600);
    });
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-5 overflow-y-auto">
      <div>
        <label className="text-sm font-medium mb-2 block">Schedule weekly report</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} disabled={status === "scheduling"} className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm" placeholder="User ID" />
      </div>
      <button onClick={handleSchedule} disabled={status === "scheduling" || status === "scheduled"} className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium w-fit disabled:opacity-50">
        {status === "scheduling" ? "Scheduling..." : "Schedule Workflow"}
      </button>
      {statusSteps.length > 0 && (
        <div className="rounded-lg border border-border/60 bg-card p-4 space-y-3">
          <div className="text-xs text-muted-foreground">Workflow Status</div>
          {statusSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={cn("h-2 w-2 rounded-full", step.color)} />
              <span className="text-xs">{step.label}</span>
            </div>
          ))}
        </div>
      )}
      {status === "scheduled" && (
        <div className="rounded-lg border border-border/60 bg-muted p-4">
          <div className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Workflow scheduled successfully</div>
          <div className="text-xs text-muted-foreground mb-3">Will run automatically after the sleep period</div>
          <button onClick={() => { setStatus("cancelled"); setStatusSteps([]); }} className="rounded-md border border-red-500/30 text-red-600 dark:text-red-400 px-3 py-1.5 text-xs font-medium">Cancel Workflow</button>
        </div>
      )}
      {status === "cancelled" && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <div className="text-sm font-medium text-red-600 dark:text-red-400">Workflow cancelled</div>
        </div>
      )}
      <p className="text-xs text-muted-foreground">🔒 Demo mode - scheduled workflow with sleep/resume capabilities</p>
    </div>
  );
}

function RefinementLoopInteractive() {
  const [input, setInput] = useState("Product description for wireless earbuds");
  const [isRefining, setIsRefining] = useState(false);
  const [iterations, setIterations] = useState<Array<{iteration: number, score: number, feedback: string}>>([]);
  const [finalOutput, setFinalOutput] = useState("");

  const handleRefine = () => {
    setIsRefining(true);
    setIterations([]);
    setFinalOutput("");

    const iterationData = [
      { iteration: 1, score: 6, feedback: "Too generic, lacks specific features" },
      { iteration: 2, score: 8, feedback: "Good detail, needs stronger CTA" },
      { iteration: 3, score: 9, feedback: "Meets quality threshold" },
    ];
    iterationData.forEach((data, i) => {
      setTimeout(() => {
        setIterations(prev => [...prev, data]);
        if (i === iterationData.length - 1) {
          setTimeout(() => {
            setFinalOutput("Premium wireless earbuds with active noise cancellation, 30-hour battery life, and IPX7 water resistance. Crystal-clear calls powered by 6-mic array. Instant pairing with any device. Order now with free shipping and 30-day returns!");
            setIsRefining(false);
          }, 500);
        }
      }, (i + 1) * 700);
    });
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-5 overflow-y-auto">
      <div>
        <label className="text-sm font-medium mb-2 block">Content to refine</label>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} disabled={isRefining} className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm" />
      </div>
      <button onClick={handleRefine} disabled={isRefining} className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium w-fit disabled:opacity-50">
        {isRefining ? "Refining..." : "Start Refinement Loop"}
      </button>
      {iterations.length > 0 && (
        <div className="space-y-3">
          {iterations.map((iter) => (
            <div key={iter.iteration} className="rounded border border-border/60 bg-card p-3 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-foreground">Iteration {iter.iteration}</span>
                <span className="text-muted-foreground font-mono">{iter.score}/10</span>
              </div>
              <div className="text-muted-foreground">{iter.feedback}</div>
            </div>
          ))}
        </div>
      )}
      {finalOutput && (
        <div className="rounded-lg border border-border/60 bg-card p-4 text-sm leading-relaxed">
          <div className="text-xs text-muted-foreground mb-2">Final output (9/10)</div>
          {finalOutput}
        </div>
      )}
      <p className="text-xs text-muted-foreground">🔒 Demo mode - refinement loop iteratively improves content quality</p>
    </div>
  );
}

function StreamingObjectInteractive() {
  const [topic, setTopic] = useState("TypeScript");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedData, setStreamedData] = useState<Record<string, unknown>>({});
  const [fieldsReceived, setFieldsReceived] = useState(0);

  const handleStream = () => {
    setIsStreaming(true);
    setStreamedData({});
    setFieldsReceived(0);

    const fields = [
      { key: "title", value: `${topic}: A Complete Guide` },
      { key: "summary", value: `${topic} is a powerful technology that enables developers to...` },
      { key: "tags", value: [topic.toLowerCase(), "programming", "development"] },
      { key: "difficulty", value: "intermediate" },
      { key: "sections", value: [{ heading: "Getting Started", body: "Introduction to the fundamentals..." }] },
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < fields.length) {
        setStreamedData(prev => ({ ...prev, [fields[i].key]: fields[i].value }));
        setFieldsReceived(prev => prev + 1);
        i++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 200);
  };

  const tags = streamedData.tags as string[] | undefined;
  const sections = streamedData.sections as Array<{heading: string, body: string}> | undefined;

  return (
    <div className="h-full flex flex-col p-6 space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Topic</label>
        <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} disabled={isStreaming} className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm" />
      </div>
      <button onClick={handleStream} disabled={isStreaming} className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium w-fit disabled:opacity-50">
        {isStreaming ? "Streaming..." : "Stream Object"}
      </button>
      <div className="flex-1 rounded-lg border border-border/60 bg-muted p-4 font-mono text-xs leading-relaxed overflow-auto">
        {Object.keys(streamedData).length === 0 ? (
          <span className="text-muted-foreground">Click "Stream Object" to see streaming data...</span>
        ) : (
          <>
            <div className="text-muted-foreground">{"{"}</div>
            {streamedData.title && <div className="pl-4"><span className="text-foreground/60">{'"title"'}</span>: <span className="text-foreground">{`"${streamedData.title}"`}</span>,</div>}
            {streamedData.summary && <div className="pl-4"><span className="text-foreground/60">{'"summary"'}</span>: <span className="text-foreground">{`"${streamedData.summary}"`}</span>,</div>}
            {tags && <div className="pl-4"><span className="text-foreground/60">{'"tags"'}</span>: [{tags.map((t, i) => <span key={i} className="text-foreground">{`"${t}"`}{i < tags.length - 1 ? ", " : ""}</span>)}],</div>}
            {streamedData.difficulty && <div className="pl-4"><span className="text-foreground/60">{'"difficulty"'}</span>: <span className="text-foreground">{`"${streamedData.difficulty}"`}</span>,</div>}
            {sections && (
              <>
                <div className="pl-4"><span className="text-foreground/60">{'"sections"'}</span>: [</div>
                <div className="pl-8 text-foreground/80">{"{ "}{'"heading"'}: {`"${sections[0].heading}"`}, {'"body"'}: {`"${sections[0].body}"`}{isStreaming && <span className="inline-block w-1.5 h-3 bg-foreground/40 animate-pulse rounded-sm ml-0.5" />}{" }"}</div>
                <div className="pl-4">]</div>
              </>
            )}
            <div className="text-muted-foreground">{"}"}</div>
          </>
        )}
      </div>
      {isStreaming && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="h-2 w-2 rounded-full bg-foreground/40 animate-pulse" />
          Streaming... {fieldsReceived} of ~8 fields received
        </div>
      )}
      <p className="text-xs text-muted-foreground">🔒 Demo mode - uses `streamObject` with real AI providers</p>
    </div>
  );
}

function JsonRendererInteractive() {
  const [prompt, setPrompt] = useState("Show me a dashboard for a SaaS startup");
  const [isGenerating, setIsGenerating] = useState(false);
  const [widgets, setWidgets] = useState<string[]>([]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setWidgets([]);

    const widgetOrder = ["mrr", "users", "churn", "nps", "chart"];
    let i = 0;
    const interval = setInterval(() => {
      if (i < widgetOrder.length) {
        setWidgets(prev => [...prev, widgetOrder[i]]);
        i++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 400);
  };

  const stats = [
    { id: "mrr", label: "MRR", value: "$48,200", change: "+12%" },
    { id: "users", label: "Users", value: "2,847", change: "+8%" },
    { id: "churn", label: "Churn", value: "3.2%", change: "-0.5%" },
    { id: "nps", label: "NPS", value: "72", change: "+4" },
  ];

  return (
    <div className="h-full flex flex-col p-6 space-y-5 overflow-y-auto">
      <div>
        <label className="text-sm font-medium mb-2 block">Prompt</label>
        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} disabled={isGenerating} className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm" />
      </div>
      <button onClick={handleGenerate} disabled={isGenerating} className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium w-fit disabled:opacity-50">
        {isGenerating ? "Generating..." : "Generate"}
      </button>
      {widgets.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-3">
            {stats.filter(s => widgets.includes(s.id)).map((stat) => (
              <div key={stat.id} className="rounded-lg border border-border/60 bg-card p-3.5">
                <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                <div className="text-lg font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.change}</div>
              </div>
            ))}
          </div>
          {widgets.includes("chart") && (
            <div className="rounded-lg border border-border/60 bg-card p-4">
              <div className="text-xs text-muted-foreground mb-3">Revenue Trend</div>
              <div className="h-20 flex items-end gap-1">
                {[30, 35, 40, 38, 45, 50, 48, 55, 60, 58, 65, 72].map((h, i) => (
                  <div key={i} className="flex-1 bg-foreground/10 rounded-t" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground/50 mt-1.5">
                <span>Jan</span><span>Jun</span><span>Dec</span>
              </div>
            </div>
          )}
        </>
      )}
      <p className="text-xs text-muted-foreground">🔒 Demo mode - generates React components dynamically</p>
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

function FormGeneratorInteractive() {
  const [prompt, setPrompt] = useState("A job application form with name, email, resume upload, and experience level");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFields, setGeneratedFields] = useState<string[]>([]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedFields([]);

    const fields = ["name", "email", "experience", "resume"];
    let i = 0;
    const interval = setInterval(() => {
      if (i < fields.length) {
        setGeneratedFields(prev => [...prev, fields[i]]);
        i++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 300);
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-5 overflow-y-auto">
      <div>
        <label className="text-sm font-medium mb-2 block">Describe the form you need</label>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} disabled={isGenerating} className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm min-h-[60px] resize-none" />
      </div>
      <button onClick={handleGenerate} disabled={isGenerating} className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium w-fit disabled:opacity-50">
        {isGenerating ? "Generating..." : "Generate Form"}
      </button>
      {generatedFields.length > 0 && (
        <div className="rounded-lg border border-border/60 bg-card p-5 space-y-4">
          <div className="text-xs text-muted-foreground mb-1">Generated form</div>
          {generatedFields.includes("name") && (
            <div><label className="text-xs font-medium mb-1.5 block">Full Name</label><div className="rounded-md border border-border/60 bg-background px-3 py-2 text-sm text-muted-foreground/50">John Doe</div></div>
          )}
          {generatedFields.includes("email") && (
            <div><label className="text-xs font-medium mb-1.5 block">Email Address</label><div className="rounded-md border border-border/60 bg-background px-3 py-2 text-sm text-muted-foreground/50">john@example.com</div></div>
          )}
          {generatedFields.includes("experience") && (
            <div>
              <label className="text-xs font-medium mb-1.5 block">Experience Level</label>
              <div className="rounded-md border border-border/60 bg-background px-3 py-2 text-sm text-muted-foreground/50 flex items-center justify-between">
                <span>Select...</span>
                <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          )}
          {generatedFields.includes("resume") && (
            <div><label className="text-xs font-medium mb-1.5 block">Resume</label><div className="rounded-md border border-dashed border-border bg-background px-3 py-4 text-xs text-muted-foreground text-center">Drag & drop or click to upload</div></div>
          )}
          {generatedFields.length === 4 && (
            <div className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium w-fit">Submit Application</div>
          )}
        </div>
      )}
      <p className="text-xs text-muted-foreground">🔒 Demo mode - generates form schema dynamically</p>
    </div>
  );
}

function CsvEditorInteractive() {
  const [command, setCommand] = useState("sort by salary descending");
  const [data, setData] = useState([
    { name: "Alice Chen", role: "Engineer", salary: "$120,000", dept: "Engineering" },
    { name: "Bob Smith", role: "Designer", salary: "$105,000", dept: "Design" },
    { name: "Carol Wu", role: "PM", salary: "$115,000", dept: "Product" },
    { name: "Dan Lee", role: "Engineer", salary: "$125,000", dept: "Engineering" },
    { name: "Eve Jones", role: "Data Sci", salary: "$130,000", dept: "Engineering" },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTransform = () => {
    if (!command.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      const cmd = command.toLowerCase();
      if (cmd.includes("sort")) {
        setData(prev => [...prev].sort((a, b) => parseInt(b.salary.replace(/[$,]/g, "")) - parseInt(a.salary.replace(/[$,]/g, ""))));
      } else if (cmd.includes("filter") || cmd.includes("engineering")) {
        setData(prev => prev.filter(row => row.dept === "Engineering"));
      } else {
        setData(prev => {
          const total = prev.reduce((sum, row) => sum + parseInt(row.salary.replace(/[$,]/g, "")), 0);
          return [...prev, { name: "Total", role: "", salary: `$${total.toLocaleString()}`, dept: "" }];
        });
      }
      setIsProcessing(false);
    }, 800);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto p-4">
        <div className="rounded-lg border border-border/60 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/60 bg-muted">
                {["Name", "Role", "Salary", "Department"].map((h) => (
                  <th key={h} className="text-left px-3 py-2 font-medium text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="border-b border-border/40 last:border-0">
                  <td className="px-3 py-2 text-foreground/80">{row.name}</td>
                  <td className="px-3 py-2 text-foreground/80">{row.role}</td>
                  <td className="px-3 py-2 text-foreground/80">{row.salary}</td>
                  <td className="px-3 py-2 text-foreground/80">{row.dept}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="border-t border-border/60 p-4 space-y-2">
        <div className="flex gap-2">
          <input type="text" value={command} onChange={(e) => setCommand(e.target.value)} placeholder="Try: sort, filter engineering, or add total" className="flex-1 rounded-md border border-border/60 bg-background px-3 py-2 text-sm" />
          <button onClick={handleTransform} disabled={isProcessing} className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium disabled:opacity-50">
            {isProcessing ? "Transforming..." : "Transform"}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">🔒 Demo mode - AI transforms CSV data in-place</p>
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

function RoutingAgentInteractive() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{type: string, content: string, routing?: {agent: string, reason: string}}>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    setMessages(prev => [...prev, { type: "user", content: input }]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const lower = input.toLowerCase();
      let agent = "general-agent";
      let reason = "General query — using default agent";
      let response = "I can help with that! In a real implementation, this routes to the appropriate specialized agent.";

      if (lower.includes("code") || lower.includes("write") || lower.includes("function") || lower.includes("program")) {
        agent = "code-agent"; reason = "Detected: code generation request";
        response = "Here's a Python sort function:\n\ndef merge_sort(lst):\n    if len(lst) <= 1: return lst\n    mid = len(lst) // 2\n    return merge(merge_sort(lst[:mid]), merge_sort(lst[mid:]))";
      } else if (lower.includes("search") || lower.includes("find") || lower.includes("look") || lower.includes("what is")) {
        agent = "search-agent"; reason = "Detected: search/lookup query";
        response = "I found several relevant sources. The AI SDK is a TypeScript toolkit for building AI applications with React and Next.js.";
      }

      setMessages(prev => [...prev,
        { type: "routing", content: "", routing: { agent, reason } },
        { type: "assistant", content: response }
      ]);
      setIsLoading(false);
    }, 800);
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
          if (message.type === "routing") return (
            <div key={i} className="flex justify-start">
              <div className="max-w-[85%] rounded-md border border-border/60 bg-background p-2.5 text-xs">
                <div className="text-muted-foreground mb-1">Routing decision</div>
                <div className="text-foreground font-medium font-mono">{message.routing!.agent}</div>
                <div className="text-muted-foreground mt-1">{message.routing!.reason}</div>
              </div>
            </div>
          );
          if (message.type === "assistant") return (
            <div key={i} className="flex justify-start">
              <div className="max-w-[85%] bg-muted rounded-lg px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
            </div>
          );
          return null;
        })}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2 text-sm text-muted-foreground">Routing to agent<span className="inline-block w-1.5 h-4 bg-foreground/50 animate-pulse ml-0.5 -mb-0.5 rounded-sm" /></div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-border/60 p-4">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about code, search, or anything... (demo)" className="flex-1 rounded-md border border-border/60 bg-background px-3 py-2 text-sm" />
          <button type="submit" disabled={isLoading || !input.trim()} className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium disabled:opacity-50">Send</button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">🔒 Demo mode - routes to specialized agents based on query type</p>
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

function WorkflowApprovalInteractive() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{type: string, content?: string, workflow?: {action: string, to: string, subject: string, body: string}}>>([]);
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
        { type: "assistant", content: "Email draft generated and waiting for approval..." },
        { type: "workflow", workflow: { action: "sendEmail", to: "team@company.com", subject: "Q1 Meeting Invitation", body: "Hi team, let's schedule our Q1 planning meeting..." } }
      ]);
      setHasPending(true);
      setIsLoading(false);
    }, 800);
  };

  const handleApprove = () => {
    setMessages(prev => [...prev, { type: "approved", content: "✓ Workflow resumed — email sent" }]);
    setHasPending(false);
  };

  const handleReject = () => {
    setMessages(prev => [...prev, { type: "rejected", content: "✗ Workflow cancelled" }]);
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
          if (message.type === "workflow") return (
            <div key={i} className="flex justify-start">
              <div className="max-w-[85%] rounded-lg border border-border bg-card p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-medium">
                  <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                  Workflow paused for approval
                </div>
                <div className="text-xs space-y-1.5 text-muted-foreground">
                  <div><span>Action:</span> <span className="text-foreground font-medium">{message.workflow!.action}</span></div>
                  <div><span>To:</span> <span className="text-foreground">{message.workflow!.to}</span></div>
                  <div><span>Subject:</span> <span className="text-foreground">{message.workflow!.subject}</span></div>
                  <div className="line-clamp-2">Body: {message.workflow!.body}</div>
                </div>
                <div className="flex gap-2 pt-1">
                  <button onClick={handleApprove} className="rounded-md bg-foreground text-background px-4 py-1.5 text-xs font-medium">Approve</button>
                  <button onClick={handleReject} className="rounded-md border border-border/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">Reject</button>
                </div>
              </div>
            </div>
          );
          if (message.type === "approved" || message.type === "rejected") return (
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
            <div className="bg-muted rounded-lg px-4 py-2 text-sm text-muted-foreground">Generating workflow<span className="inline-block w-1.5 h-4 bg-foreground/50 animate-pulse ml-0.5 -mb-0.5 rounded-sm" /></div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-border/60 p-4">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message... (demo mode)" disabled={isLoading || hasPending} className="flex-1 rounded-md border border-border/60 bg-background px-3 py-2 text-sm disabled:opacity-50" />
          <button type="submit" disabled={isLoading || !input.trim() || hasPending} className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium disabled:opacity-50">Send</button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">🔒 Demo mode - workflows pause for human approval</p>
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

function MarkdownChatInteractive() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsLoading(true);
    setStreamingContent("");

    const fullResponse = `**Getting Started with AI SDK**\n\nHere are the key features:\n\n- Use \`streamText\` for streaming responses\n- Use \`generateObject\` for structured data\n- Use \`tools\` parameter for function calling\n\nExample code:\n\`\`\`typescript\nconst result = await streamText({\n  model: openai('gpt-4'),\n  prompt: 'Hello!'\n});\n\`\`\``;

    let currentChar = 0;
    const interval = setInterval(() => {
      if (currentChar < fullResponse.length) {
        setStreamingContent(prev => prev + fullResponse[currentChar]);
        currentChar++;
      } else {
        clearInterval(interval);
        setMessages(prev => [...prev, { role: "assistant", content: fullResponse }]);
        setStreamingContent("");
        setIsLoading(false);
      }
    }, 18);
  };

  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-semibold mb-1">{line.slice(2, -2)}</p>;
      }
      if (line.startsWith('- ')) {
        const content = line.slice(2).replace(/`([^`]+)`/g, '<code>$1</code>');
        return <li key={i} className="ml-4 list-disc text-muted-foreground" dangerouslySetInnerHTML={{ __html: content }} />;
      }
      if (line.startsWith('```')) {
        return null;
      }
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-muted-foreground text-xs leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <div key={i} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn("max-w-[85%] rounded-lg px-4 py-2.5 text-sm", message.role === "user" ? "bg-foreground text-background" : "bg-muted space-y-1")}>
              {message.role === "user" ? message.content : renderMarkdown(message.content)}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] bg-muted rounded-lg px-4 py-2.5 text-sm space-y-1">
              {renderMarkdown(streamingContent)}
              <span className="inline-block w-1.5 h-4 bg-foreground/50 animate-pulse ml-0.5 -mb-0.5 rounded-sm" />
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-border/60 p-4">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask for formatted content... (demo)" className="flex-1 rounded-md border border-border/60 bg-background px-3 py-2 text-sm" />
          <button type="submit" disabled={isLoading || !input.trim()} className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium disabled:opacity-50">Send</button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">🔒 Demo mode - markdown rendering with code blocks</p>
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
