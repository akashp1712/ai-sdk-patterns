"use client";

import { cn } from "@/lib/utils";

// ── Shared Primitives ─────────────────────────────────────────────

function PreviewShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("h-[520px] bg-background rounded-xl border-2 border-border overflow-hidden flex flex-col", className)}>
      {children}
    </div>
  );
}

function ChatMessage({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  return (
    <div className={cn("flex", role === "user" ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2.5 text-sm leading-relaxed",
          role === "user"
            ? "bg-foreground text-background"
            : "bg-muted"
        )}
      >
        {children}
      </div>
    </div>
  );
}

function ChatInput({ placeholder }: { placeholder?: string }) {
  return (
    <div className="border-t border-border/60 p-4 flex gap-2">
      <div className="flex-1 rounded-md border border-border/60 bg-background px-3 py-2 text-sm text-muted-foreground">
        {placeholder || "Type a message..."}
      </div>
      <div className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium">
        Send
      </div>
    </div>
  );
}

function ToolCallCard({ name, result }: { name: string; result: string }) {
  return (
    <div className="rounded-md border border-border/60 bg-background p-3 text-xs my-2">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="font-mono text-muted-foreground">{name}</span>
      </div>
      <div className="font-mono text-foreground/70 pl-0">{result}</div>
    </div>
  );
}

function CodeInline({ children }: { children: React.ReactNode }) {
  return <code className="text-xs bg-foreground/[0.06] px-1 py-0.5 rounded font-mono">{children}</code>;
}

// ── Pattern Previews ──────────────────────────────────────────────

function StreamingChatPreview() {
  return (
    <PreviewShell>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <ChatMessage role="user">What is the AI SDK?</ChatMessage>
        <ChatMessage role="assistant">
          The AI SDK is a TypeScript toolkit designed for building AI-powered applications
          with React, Next.js, Vue, Svelte, and other frameworks. It provides a unified API
          that works across multiple AI providers including OpenAI, Anthropic, and Google,
          so you can switch between models without changing your application code.
        </ChatMessage>
        <ChatMessage role="user">How does streaming work?</ChatMessage>
        <ChatMessage role="assistant">
          Streaming in the AI SDK uses the <CodeInline>streamText</CodeInline> function
          on the server and the <CodeInline>useChat</CodeInline> hook
          on the client. Tokens are sent as they{"'"}re generated, so users see the response
          building up in real-time rather than waiting for the full response.
          <span className="inline-block w-1.5 h-4 bg-foreground/50 animate-pulse ml-0.5 -mb-0.5 rounded-sm" />
        </ChatMessage>
      </div>
      <ChatInput />
    </PreviewShell>
  );
}

function StructuredOutputPreview() {
  return (
    <PreviewShell>
      <div className="flex-1 p-6 space-y-5">
        <div>
          <label className="text-sm font-medium mb-2 block">Topic</label>
          <div className="rounded-md border border-border/60 bg-background px-3 py-2 text-sm text-muted-foreground">
            Chocolate Chip Cookies
          </div>
        </div>
        <div className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium w-fit">
          Generate
        </div>
        <div className="rounded-lg border border-border/60 bg-muted p-4 font-mono text-xs leading-relaxed">
          <div className="text-muted-foreground">{"{"}</div>
          <div className="pl-4">
            <span className="text-foreground/60">{'"name"'}</span>: <span className="text-foreground">{'"Classic Chocolate Chip Cookies"'}</span>,
          </div>
          <div className="pl-4">
            <span className="text-foreground/60">{'"ingredients"'}</span>: [
          </div>
          <div className="pl-8 text-foreground/80">
            {"{ "}{'"name"'}: {'"butter"'}, {'"amount"'}: {'"1 cup"'}{" }"},
          </div>
          <div className="pl-8 text-foreground/80">
            {"{ "}{'"name"'}: {'"sugar"'}, {'"amount"'}: {'"3/4 cup"'}{" }"},
          </div>
          <div className="pl-8 text-foreground/80">
            {"{ "}{'"name"'}: {'"flour"'}, {'"amount"'}: {'"2 1/4 cups"'}{" }"},
          </div>
          <div className="pl-8 text-muted-foreground">...</div>
          <div className="pl-4">],</div>
          <div className="pl-4">
            <span className="text-foreground/60">{'"steps"'}</span>: [{'"Preheat oven to 375°F"'}, ...]
          </div>
          <div className="text-muted-foreground">{"}"}</div>
        </div>
      </div>
    </PreviewShell>
  );
}

function ToolCallingPreview() {
  return (
    <PreviewShell>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <ChatMessage role="user">What{"'"}s the weather in San Francisco and calculate 15% tip on $85</ChatMessage>
        <ChatMessage role="assistant">
          Let me check the weather and calculate that for you.
          <ToolCallCard name="getWeather({ city: 'San Francisco' })" result='{ "temp": 62, "condition": "Foggy" }' />
          <ToolCallCard name="calculate({ expression: '85 * 0.15' })" result="12.75" />
          The weather in San Francisco is 62°F and foggy. A 15% tip on $85 would be $12.75, making your total $97.75.
        </ChatMessage>
      </div>
      <ChatInput />
    </PreviewShell>
  );
}

function GenerativeUiPreview() {
  return (
    <PreviewShell>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <ChatMessage role="user">Show me the weather in Tokyo and AAPL stock</ChatMessage>
        <div className="flex justify-start">
          <div className="max-w-[80%] space-y-2">
            <div className="bg-muted rounded-lg px-4 py-2.5 text-sm">Here{"'"}s the current data:</div>
            {/* Weather card */}
            <div className="rounded-lg border border-border/60 bg-card p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">☀️</div>
                <div>
                  <div className="font-medium text-sm">Tokyo, Japan</div>
                  <div className="text-xs text-muted-foreground">Clear skies</div>
                </div>
              </div>
              <div className="text-2xl font-bold">24°C</div>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                <span>Humidity: 45%</span>
                <span>Wind: 12 km/h</span>
              </div>
            </div>
            {/* Stock card */}
            <div className="rounded-lg border border-border/60 bg-card p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-medium text-sm">AAPL</div>
                  <div className="text-xs text-muted-foreground">Apple Inc.</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">$198.50</div>
                  <div className="text-xs text-muted-foreground">+2.3%</div>
                </div>
              </div>
              <div className="h-8 flex items-end gap-px">
                {[40, 45, 42, 50, 55, 48, 60, 65, 58, 70, 75, 80].map((h, i) => (
                  <div key={i} className="flex-1 bg-foreground/10 rounded-t" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatInput />
    </PreviewShell>
  );
}

function MultiStepAgentPreview() {
  return (
    <PreviewShell>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <ChatMessage role="user">Research the latest AI SDK features and summarize them</ChatMessage>
        <div className="flex justify-start">
          <div className="max-w-[85%] bg-muted rounded-lg px-4 py-3 text-sm space-y-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-5 w-5 rounded-full bg-foreground/[0.06] flex items-center justify-center text-[10px] font-bold">1</div>
              <span>Searching the web...</span>
              <span className="text-foreground">done</span>
            </div>
            <ToolCallCard name="webSearch({ query: 'AI SDK v4 features' })" result="Found 5 results" />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-5 w-5 rounded-full bg-foreground/[0.06] flex items-center justify-center text-[10px] font-bold">2</div>
              <span>Reading documentation...</span>
              <span className="text-foreground">done</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-5 w-5 rounded-full bg-foreground/[0.06] flex items-center justify-center text-[10px] font-bold">3</div>
              <span>Generating summary...</span>
              <span className="text-foreground">done</span>
            </div>
            <div className="pt-2 border-t border-border/60 leading-relaxed">
              The AI SDK now supports multi-step agent loops with <CodeInline>maxSteps</CodeInline>,
              structured output streaming via <CodeInline>streamObject</CodeInline>,
              and provider-agnostic tool calling across OpenAI, Anthropic, and Google models.
            </div>
          </div>
        </div>
      </div>
      <ChatInput />
    </PreviewShell>
  );
}

function WebSearchPreview() {
  return (
    <PreviewShell>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <ChatMessage role="user">What are the latest developments in quantum computing?</ChatMessage>
        <div className="flex justify-start">
          <div className="max-w-[85%] bg-muted rounded-lg px-4 py-3 text-sm space-y-3">
            <ToolCallCard name="webSearch({ query: 'quantum computing 2025' })" result="3 results found" />
            <div className="leading-relaxed">
              Recent breakthroughs in quantum computing include Google{"'"}s advances in error correction
              and IBM{"'"}s 1000+ qubit processors.
            </div>
            <div className="space-y-2 pt-1">
              {[
                { title: "Google Quantum AI Blog", url: "blog.google/quantum", snippet: "New error correction milestone achieved..." },
                { title: "IBM Quantum Roadmap 2025", url: "ibm.com/quantum", snippet: "Scaling to 100,000 qubits by 2033..." },
              ].map((source) => (
                <div key={source.url} className="rounded border border-border/60 bg-background p-2.5 text-xs">
                  <div className="font-medium text-foreground">{source.title}</div>
                  <div className="text-muted-foreground/50 text-[10px] mb-1">{source.url}</div>
                  <div className="text-muted-foreground">{source.snippet}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ChatInput />
    </PreviewShell>
  );
}

function HumanInTheLoopPreview() {
  return (
    <PreviewShell>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <ChatMessage role="user">Send an email to the team about the project update</ChatMessage>
        <div className="flex justify-start">
          <div className="max-w-[85%] bg-muted rounded-lg px-4 py-3 text-sm">
            I{"'"}d like to send this email. Please approve:
          </div>
        </div>
        {/* Approval card */}
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-lg border border-border bg-card p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-foreground">
              <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              Action requires approval
            </div>
            <div className="text-xs space-y-1.5 text-muted-foreground">
              <div><span>Action:</span> <span className="text-foreground font-medium">sendEmail</span></div>
              <div><span>To:</span> <span className="text-foreground">team@company.com</span></div>
              <div><span>Subject:</span> <span className="text-foreground">Q4 Project Update</span></div>
              <div className="line-clamp-2">Body: Hi team, here{"'"}s a quick update on our Q4 progress...</div>
            </div>
            <div className="flex gap-2 pt-1">
              <div className="rounded-md bg-foreground text-background px-4 py-1.5 text-xs font-medium">Approve</div>
              <div className="rounded-md border border-border/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">Deny</div>
            </div>
          </div>
        </div>
      </div>
      <ChatInput />
    </PreviewShell>
  );
}

function RagPipelinePreview() {
  return (
    <PreviewShell>
      <div className="flex-1 p-6 space-y-5 overflow-y-auto">
        <div>
          <label className="text-sm font-medium mb-2 block">Ask a question about the AI SDK docs</label>
          <div className="rounded-md border border-border/60 bg-background px-3 py-2 text-sm text-muted-foreground">
            How do I use tools with streamText?
          </div>
        </div>
        <div className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium w-fit">
          Search &amp; Answer
        </div>
        <div className="space-y-3">
          <div className="text-xs font-medium text-muted-foreground">Retrieved documents (3)</div>
          <div className="space-y-2">
            {[
              { score: "0.94", text: "streamText supports tool calling via the tools parameter..." },
              { score: "0.87", text: "Tools are defined with Zod parameter schemas and execute functions..." },
              { score: "0.82", text: "The maxSteps option enables multi-step tool loops..." },
            ].map((doc, i) => (
              <div key={i} className="rounded border border-border/60 bg-muted p-3 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-muted-foreground">Document {i + 1}</span>
                  <span className="text-foreground/60 font-mono">{doc.score}</span>
                </div>
                <div className="text-foreground/80">{doc.text}</div>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-border/60 bg-card p-4 text-sm leading-relaxed">
            To use tools with <CodeInline>streamText</CodeInline>, pass
            a <CodeInline>tools</CodeInline> object with Zod schemas defining
            each tool{"'"}s parameters. Set <CodeInline>maxSteps</CodeInline> to
            enable multi-step tool execution loops.
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function ReasoningDisplayPreview() {
  return (
    <PreviewShell>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <ChatMessage role="user">What{"'"}s the probability of rolling at least one 6 in four dice rolls?</ChatMessage>
        <div className="flex justify-start">
          <div className="max-w-[85%] space-y-2">
            {/* Thinking section */}
            <div className="rounded-lg border border-border bg-muted/50 px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Thinking
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed space-y-1">
                <p>P(not rolling a 6) = 5/6 per roll</p>
                <p>P(no 6 in four rolls) = (5/6)^4 = 625/1296</p>
                <p>P(at least one 6) = 1 - 625/1296 = 671/1296</p>
              </div>
            </div>
            {/* Answer */}
            <div className="bg-muted rounded-lg px-4 py-3 text-sm leading-relaxed">
              The probability of rolling at least one 6 in four dice rolls
              is <strong>671/1296 ≈ 51.77%</strong>. This is slightly better than a coin flip!
              This is actually a famous probability problem studied by the Chevalier de Méré in the 17th century.
            </div>
          </div>
        </div>
      </div>
      <ChatInput />
    </PreviewShell>
  );
}

function ImageGenerationPreview() {
  return (
    <PreviewShell>
      <div className="flex-1 p-6 space-y-5">
        <div>
          <label className="text-sm font-medium mb-2 block">Image prompt</label>
          <div className="rounded-md border border-border/60 bg-background px-3 py-2 text-sm text-muted-foreground">
            A serene mountain landscape at sunset with a calm lake reflection
          </div>
        </div>
        <div className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium w-fit">
          Generate Image
        </div>
        <div className="rounded-lg border border-border/60 overflow-hidden">
          <div className="aspect-video bg-muted flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="relative w-48 h-28 mx-auto">
                {/* Minimal monochrome mountain silhouette */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-10 bg-foreground/[0.04] rounded-full blur-sm" />
                <div className="absolute bottom-3 left-8 w-0 h-0 border-l-[40px] border-r-[40px] border-b-[50px] border-l-transparent border-r-transparent border-b-foreground/[0.08]" />
                <div className="absolute bottom-3 left-20 w-0 h-0 border-l-[30px] border-r-[30px] border-b-[40px] border-l-transparent border-r-transparent border-b-foreground/[0.06]" />
                <div className="absolute top-2 right-8 w-8 h-8 rounded-full bg-foreground/[0.06]" />
              </div>
              <div className="text-xs text-muted-foreground">512 × 512 · Generated with DALL·E 3</div>
            </div>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function CodeArtifactPreview() {
  return (
    <PreviewShell>
      <div className="flex-1 flex">
        {/* Chat side */}
        <div className="w-1/2 border-r border-border/60 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <ChatMessage role="user">Create a React counter component with increment and decrement</ChatMessage>
            <ChatMessage role="assistant">
              Here{"'"}s a counter component with increment and decrement buttons, styled with Tailwind CSS.
            </ChatMessage>
          </div>
          <ChatInput placeholder="Ask for changes..." />
        </div>
        {/* Code side */}
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
            <div><span className="text-muted-foreground">{"'use client'"}</span>;</div>
            <div className="mt-2"><span className="text-muted-foreground">import</span> {"{ useState }"} <span className="text-muted-foreground">from</span> {'"react"'};</div>
            <div className="mt-2"><span className="text-muted-foreground">export default function</span> Counter() {"{"}</div>
            <div className="pl-4"><span className="text-muted-foreground">const</span> [count, setCount] = useState(0);</div>
            <div className="pl-4 mt-2"><span className="text-muted-foreground">return</span> (</div>
            <div className="pl-6">&lt;div className={'"flex gap-4"'}&gt;</div>
            <div className="pl-8">&lt;button onClick={"{() => setCount(c => c - 1)}"}&gt;</div>
            <div className="pl-10">-</div>
            <div className="pl-8">&lt;/button&gt;</div>
            <div className="pl-8">&lt;span&gt;{"{count}"}&lt;/span&gt;</div>
            <div className="pl-8">&lt;button onClick={"{() => setCount(c => c + 1)}"}&gt;</div>
            <div className="pl-10">+</div>
            <div className="pl-8">&lt;/button&gt;</div>
            <div className="pl-6">&lt;/div&gt;</div>
            <div className="pl-4">);</div>
            <div>{"}"}</div>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function ChatWithCitationsPreview() {
  return (
    <PreviewShell>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <ChatMessage role="user">What are the benefits of TypeScript over JavaScript?</ChatMessage>
        <div className="flex justify-start">
          <div className="max-w-[85%] bg-muted rounded-lg px-4 py-3 text-sm space-y-3">
            <div className="leading-relaxed">
              TypeScript offers several key advantages over JavaScript:
            </div>
            <div className="leading-relaxed">
              <strong>Static typing</strong> catches errors at compile time rather than runtime,
              reducing bugs by up to 15% according to studies <span className="text-foreground/60 font-mono text-xs">[1]</span>.
              The type system also enables better <strong>IDE support</strong> with autocompletion
              and refactoring tools <span className="text-foreground/60 font-mono text-xs">[2]</span>.
            </div>
            <div className="space-y-1.5 pt-2 border-t border-border/60">
              <div className="text-xs text-muted-foreground mb-1.5">Sources</div>
              {[
                { id: "1", title: "To Type or Not to Type — UCL Study", url: "ucl.ac.uk/research" },
                { id: "2", title: "TypeScript Documentation — Microsoft", url: "typescriptlang.org/docs" },
              ].map((source) => (
                <div key={source.id} className="rounded border border-border/60 bg-background p-2 text-xs">
                  <span className="text-foreground/60 font-mono mr-1.5">[{source.id}]</span>
                  <span className="font-medium">{source.title}</span>
                  <div className="text-muted-foreground/50 text-[10px] mt-0.5">{source.url}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ChatInput />
    </PreviewShell>
  );
}

function DurableChatAgentPreview() {
  return (
    <PreviewShell>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <ChatMessage role="user">Calculate 15% tip on $85 and search for current AI trends</ChatMessage>
        <div className="flex justify-start">
          <div className="max-w-[85%] bg-muted rounded-lg px-4 py-3 text-sm space-y-3">
            <ToolCallCard name="calculator({ expression: '85 * 0.15' })" result="12.75" />
            <ToolCallCard name="webSearch({ query: 'AI trends 2025' })" result="Found 5 sources" />
            <div className="leading-relaxed">
              Your tip is $12.75, making the total $97.75. Current AI trends include increased adoption of multi-modal models and edge AI deployment.
            </div>
            <div className="text-xs text-muted-foreground border-t border-border/60 pt-2 mt-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Session persisted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatInput />
    </PreviewShell>
  );
}

function MCPClientPreview() {
  return (
    <PreviewShell>
      <div className="flex flex-col h-full">
        {/* MCP Server Config */}
        <div className="border-b border-border/60 p-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">MCP Server:</span>
            <div className="flex-1 rounded-md border border-border/60 bg-background px-2 py-1 text-xs font-mono text-muted-foreground">
              http://localhost:3001/mcp
            </div>
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-[10px] text-muted-foreground">Connected</span>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {["getWeather", "calculate", "convertUnits"].map((tool) => (
              <span key={tool} className="text-[10px] px-1.5 py-0.5 rounded bg-foreground/[0.06] font-mono text-muted-foreground">
                {tool}
              </span>
            ))}
          </div>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <ChatMessage role="user">What{"'"}s the weather in Paris and convert 25°C to Fahrenheit?</ChatMessage>
          <div className="flex justify-start">
            <div className="max-w-[85%] bg-muted rounded-lg px-4 py-3 text-sm space-y-2">
              <ToolCallCard name='getWeather({ city: "Paris" })' result='{ "city": "Paris", "temperature": 22, "condition": "Sunny" }' />
              <ToolCallCard name='convertUnits({ value: 25, from: "C", to: "F" })' result="25 C = 77.00 F" />
              <div className="leading-relaxed">
                It{"'"}s 22°C and sunny in Paris. And 25°C converts to 77°F — a beautiful day!
              </div>
            </div>
          </div>
        </div>
        <ChatInput />
      </div>
    </PreviewShell>
  );
}

function TextToSQLPreview() {
  return (
    <PreviewShell>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-border/60 p-4">
          <div className="text-sm font-medium mb-2">Ask questions about your data</div>
          <div className="flex gap-1.5 flex-wrap">
            {["employees", "departments", "projects"].map((t) => (
              <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-foreground/[0.06] font-mono text-muted-foreground">{t}</span>
            ))}
          </div>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <ChatMessage role="user">Show the top 3 highest paid employees</ChatMessage>
          <div className="flex justify-start">
            <div className="max-w-[90%] space-y-2">
              {/* SQL */}
              <div className="rounded-lg border border-border/60 overflow-hidden">
                <div className="px-3 py-1.5 border-b bg-muted/50">
                  <code className="text-[10px] font-mono text-muted-foreground">
                    SELECT name, title, salary FROM employees ORDER BY salary DESC LIMIT 3
                  </code>
                </div>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      {["name", "title", "salary"].map((h) => (
                        <th key={h} className="text-left px-3 py-1.5 text-[10px] font-medium text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Henry Park", "Principal Engineer", "$155,000"],
                      ["Carol Wu", "Staff Engineer", "$140,000"],
                      ["Alice Chen", "Senior Engineer", "$125,000"],
                    ].map((row, i) => (
                      <tr key={i} className="border-b last:border-0">
                        {row.map((cell, j) => (
                          <td key={j} className="px-3 py-1.5 text-[11px]">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-3 py-1 border-t text-[10px] text-muted-foreground bg-muted/30">3 rows</div>
              </div>
              <div className="bg-muted rounded-lg px-4 py-2 text-sm">
                The top 3 highest paid employees are Henry Park ($155K), Carol Wu ($140K), and Alice Chen ($125K) — all from Engineering.
              </div>
            </div>
          </div>
        </div>
        <ChatInput placeholder="Ask about the data..." />
      </div>
    </PreviewShell>
  );
}

function MultiModalChatPreview() {
  return (
    <PreviewShell>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-lg px-4 py-2 text-sm bg-primary text-primary-foreground space-y-2">
              {/* Image thumbnail */}
              <div className="rounded border border-primary-foreground/20 overflow-hidden">
                <div className="h-24 bg-primary-foreground/10 flex items-center justify-center">
                  <div className="text-center space-y-1">
                    <div className="text-2xl">🏔️</div>
                    <div className="text-[10px] opacity-70">landscape.jpg</div>
                  </div>
                </div>
              </div>
              What mountain is this?
            </div>
          </div>
          <ChatMessage role="assistant">
            This appears to be a mountain landscape. The snow-capped peaks, alpine meadows, and distinctive
            ridgeline suggest this could be in the Swiss Alps or the Canadian Rockies. The lighting indicates
            this was taken during golden hour, giving the peaks a warm glow.
          </ChatMessage>
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-lg px-4 py-2 text-sm bg-primary text-primary-foreground space-y-2">
              <div className="flex items-center gap-2 text-xs bg-primary-foreground/10 rounded px-2 py-1">
                <span>📎</span>
                <span>report.pdf</span>
              </div>
              Summarize the key findings
            </div>
          </div>
          <ChatMessage role="assistant">
            Based on the report, the key findings are: revenue grew 23% year-over-year,
            customer retention improved to 94%, and the new product line exceeded targets
            by 15%. The report recommends expanding into two new markets in Q2.
            <span className="inline-block w-1.5 h-4 bg-foreground/50 animate-pulse ml-0.5 -mb-0.5 rounded-sm" />
          </ChatMessage>
        </div>
        <div className="border-t border-border/60 p-4 flex gap-2">
          <div className="rounded-md border border-border/60 px-3 py-2 text-sm text-muted-foreground cursor-pointer hover:bg-accent transition-colors">
            📎
          </div>
          <div className="flex-1 rounded-md border border-border/60 bg-background px-3 py-2 text-sm text-muted-foreground">
            Type a message or paste an image...
          </div>
          <div className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium">
            Send
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

// ── Registry ──────────────────────────────────────────────

const previewMap: Record<string, React.ReactNode> = {
  "streaming-chat": <StreamingChatPreview />,
  "structured-output": <StructuredOutputPreview />,
  "tool-calling": <ToolCallingPreview />,
  "generative-ui": <GenerativeUiPreview />,
  "multi-step-agent": <MultiStepAgentPreview />,
  "web-search": <WebSearchPreview />,
  "human-in-the-loop": <HumanInTheLoopPreview />,
  "rag-pipeline": <RagPipelinePreview />,
  "reasoning-display": <ReasoningDisplayPreview />,
  "image-generation": <ImageGenerationPreview />,
  "code-artifact": <CodeArtifactPreview />,
  "chat-with-citations": <ChatWithCitationsPreview />,
  "durable-chat-agent": <DurableChatAgentPreview />,
  "mcp-client": <MCPClientPreview />,
  "text-to-sql": <TextToSQLPreview />,
  "multimodal-chat": <MultiModalChatPreview />,
};

export function getPatternPreview(patternId: string): React.ReactNode | null {
  return previewMap[patternId] ?? null;
}
