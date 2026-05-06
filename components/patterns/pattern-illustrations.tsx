"use client";

import {
  IllustrationCanvas,
  ChatBubble,
  SkeletonLines,
  NodeCircle,
  FanOutConnector,
  Pill,
  MiniCard,
  MiniCode,
  StepChain,
  MiniSearchBar,
  ArrowConnector,
  WindowChrome,
} from "@/components/ui/illustration-primitives";

// ── Pattern Illustrations ───────────────────────────────────────────
// Each illustration is composed from reusable primitives.
// To add a new one: compose primitives, add to illustrationMap below.

export function StreamingChatIll() {
  return (
    <IllustrationCanvas>
      <div className="w-full max-w-[140px] space-y-2">
        <ChatBubble align="right">Hello!</ChatBubble>
        <ChatBubble align="left">
          <SkeletonLines count={3} color="sky" pulse />
        </ChatBubble>
      </div>
    </IllustrationCanvas>
  );
}

export function StructuredOutputIll() {
  return (
    <IllustrationCanvas>
      <MiniCode
        lines={[
          { key: "name", value: '"..."', keyColor: "sky", valueColor: "emerald" },
          { key: "score", value: "42", keyColor: "sky", valueColor: "amber" },
        ]}
      />
    </IllustrationCanvas>
  );
}

export function ToolCallingIll() {
  return (
    <IllustrationCanvas>
      <div className="flex items-center gap-2">
        <NodeCircle label="AI" size="md" />
        <FanOutConnector count={3} />
        <div className="flex flex-col gap-1">
          <Pill color="red" mono>fn()</Pill>
          <Pill color="amber" mono>api()</Pill>
          <Pill color="cyan" mono>db()</Pill>
        </div>
      </div>
    </IllustrationCanvas>
  );
}

export function GenerativeUiIll() {
  return (
    <IllustrationCanvas>
      <div className="w-full max-w-[130px] space-y-1.5">
        <MiniCard className="px-2 py-1.5 text-[8px] text-muted-foreground">
          Show weather
        </MiniCard>
        <MiniCard className="p-2">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="h-4 w-4 rounded bg-gradient-to-br from-sky-400/30 to-cyan-400/30 flex items-center justify-center text-[6px]">
              ☀
            </div>
            <div className="h-1 w-10 rounded-full bg-foreground/12" />
          </div>
          <div className="text-[8px] font-mono text-cyan-500/70">72°F</div>
        </MiniCard>
      </div>
    </IllustrationCanvas>
  );
}

export function MultiStepAgentIll() {
  return (
    <IllustrationCanvas>
      <StepChain
        steps={[
          { label: "1", color: "sky" },
          { label: "2", color: "amber" },
          { label: "3", color: "emerald" },
        ]}
        label="think → act → repeat"
      />
    </IllustrationCanvas>
  );
}

export function WebSearchIll() {
  return (
    <IllustrationCanvas>
      <div className="w-full max-w-[130px]">
        <div className="mb-2">
          <MiniSearchBar color="sky" />
        </div>
        <SkeletonLines count={3} color="sky" />
      </div>
    </IllustrationCanvas>
  );
}

export function HumanInTheLoopIll() {
  return (
    <IllustrationCanvas>
      <div className="flex flex-col items-center gap-1.5">
        <MiniCard className="px-2 py-1 text-[7px] text-amber-500/80 border-amber-500/30 bg-amber-500/15">
          Approve action?
        </MiniCard>
        <div className="flex gap-1.5">
          <Pill color="emerald">✓ Yes</Pill>
          <Pill color="red">✕ No</Pill>
        </div>
      </div>
    </IllustrationCanvas>
  );
}

export function RagPipelineIll() {
  return (
    <IllustrationCanvas>
      <div className="flex items-center gap-1.5">
        <div className="flex flex-col gap-0.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-3 w-8 rounded-sm bg-emerald-500/20 border border-emerald-500/30" />
          ))}
        </div>
        <ArrowConnector color="emerald" />
        <NodeCircle label="AI" color="emerald" size="md" />
      </div>
    </IllustrationCanvas>
  );
}

export function ReasoningDisplayIll() {
  return (
    <IllustrationCanvas>
      <div className="w-full max-w-[130px] space-y-1.5">
        <MiniCard className="border-amber-500/30 bg-amber-500/10 px-2 py-1.5">
          <div className="text-[7px] text-amber-500/70 mb-1">Thinking...</div>
          <SkeletonLines count={2} color="amber" />
        </MiniCard>
        <MiniCard className="px-2 py-1.5">
          <SkeletonLines count={2} />
        </MiniCard>
      </div>
    </IllustrationCanvas>
  );
}

export function ImageGenerationIll() {
  return (
    <IllustrationCanvas>
      <div className="flex items-center gap-1.5">
        <MiniCard className="px-2 py-1.5 text-[7px] text-cyan-500/80 border-cyan-500/30 bg-cyan-500/20 max-w-[50px] leading-tight">
          A sunset...
        </MiniCard>
        <ArrowConnector color="cyan" />
        <div className="h-10 w-12 rounded border border-rose-500/30 bg-gradient-to-br from-cyan-500/20 to-rose-500/20 shrink-0" />
      </div>
    </IllustrationCanvas>
  );
}

export function CodeArtifactIll() {
  return (
    <IllustrationCanvas>
      <div className="w-full max-w-[130px]">
        <WindowChrome>
          <SkeletonLines count={4} color="violet" />
        </WindowChrome>
      </div>
    </IllustrationCanvas>
  );
}

export function ChatWithCitationsIll() {
  return (
    <IllustrationCanvas>
      <div className="w-full max-w-[140px] space-y-2">
        <ChatBubble align="left">
          <SkeletonLines count={2} />
          <div className="flex gap-1 mt-1">
            <Pill mono>[1]</Pill>
            <Pill mono>[2]</Pill>
          </div>
        </ChatBubble>
      </div>
    </IllustrationCanvas>
  );
}

export function DurableChatAgentIll() {
  return (
    <IllustrationCanvas>
      <div className="flex items-center gap-2">
        <NodeCircle label="AI" size="md" />
        <FanOutConnector count={2} />
        <div className="flex flex-col gap-1">
          <Pill color="sky" mono>calc()</Pill>
          <Pill color="emerald" mono>search()</Pill>
        </div>
      </div>
    </IllustrationCanvas>
  );
}

export function MCPClientIll() {
  return (
    <IllustrationCanvas>
      <div className="flex items-center gap-2">
        <NodeCircle label="AI" size="md" />
        <ArrowConnector color="cyan" />
        <MiniCard className="px-2 py-1.5 border-cyan-500/30 bg-cyan-500/10">
          <div className="text-[7px] text-cyan-500/80 mb-1">MCP</div>
          <div className="flex flex-col gap-0.5">
            <Pill color="cyan" mono>fn()</Pill>
            <Pill color="cyan" mono>api()</Pill>
          </div>
        </MiniCard>
      </div>
    </IllustrationCanvas>
  );
}

export function TextToSQLIll() {
  return (
    <IllustrationCanvas>
      <div className="flex items-center gap-1.5">
        <ChatBubble align="right">
          <div className="text-[7px]">Show top sales</div>
        </ChatBubble>
        <ArrowConnector color="amber" />
        <MiniCard className="px-1.5 py-1 font-mono text-[7px] text-amber-500/80 border-amber-500/30 bg-amber-500/10">
          SELECT *
        </MiniCard>
        <ArrowConnector color="amber" />
        <MiniCard className="p-1">
          <div className="grid grid-cols-2 gap-px">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-2 w-5 rounded-sm bg-amber-500/15" />
            ))}
          </div>
        </MiniCard>
      </div>
    </IllustrationCanvas>
  );
}

export function MultiModalChatIll() {
  return (
    <IllustrationCanvas>
      <div className="w-full max-w-[140px] space-y-2">
        <ChatBubble align="right">
          <div className="flex items-center gap-1">
            <div className="h-5 w-6 rounded bg-gradient-to-br from-sky-400/30 to-rose-400/30 shrink-0" />
            <div className="text-[7px]">What is this?</div>
          </div>
        </ChatBubble>
        <ChatBubble align="left">
          <SkeletonLines count={2} color="sky" pulse />
        </ChatBubble>
      </div>
    </IllustrationCanvas>
  );
}

// ── Registry ────────────────────────────────────────────────────────
// Add new pattern illustrations here. Key = pattern id from lib/patterns.ts

// ── Mastra Pattern Illustrations ─────────────────────────────────────────────

export function MastraAgentIll() {
  return (
    <IllustrationCanvas>
      <div className="flex items-center gap-3">
        <NodeCircle label="Agent" size="lg" color="sky" />
        <ArrowConnector />
        <div className="flex flex-col gap-1">
          <Pill color="emerald" mono>generate()</Pill>
          <Pill color="amber" mono>stream()</Pill>
        </div>
      </div>
    </IllustrationCanvas>
  );
}

export function MastraToolIll() {
  return (
    <IllustrationCanvas>
      <MiniCode
        lines={[
          { key: "id", value: '"search"', keyColor: "sky", valueColor: "emerald" },
          { key: "input", value: "z.object()", keyColor: "sky", valueColor: "amber" },
          { key: "execute", value: "async →", keyColor: "sky", valueColor: "red" },
        ]}
      />
    </IllustrationCanvas>
  );
}

export function MastraWorkflowIll() {
  return (
    <IllustrationCanvas>
      <StepChain
        steps={[
          { label: "1", color: "sky" },
          { label: "2", color: "violet" },
          { label: "3", color: "emerald" },
        ]}
        label="fetch → summarize → format"
      />
    </IllustrationCanvas>
  );
}

export function MastraMemoryIll() {
  return (
    <IllustrationCanvas>
      <div className="flex items-center gap-2">
        <NodeCircle label="🧠" size="md" />
        <div className="flex flex-col gap-1">
          <Pill color="rose" mono>history</Pill>
          <Pill color="violet" mono>working</Pill>
          <Pill color="cyan" mono>semantic</Pill>
        </div>
      </div>
    </IllustrationCanvas>
  );
}

export function MastraRagIll() {
  return (
    <IllustrationCanvas>
      <div className="flex items-center gap-2">
        <MiniSearchBar color="emerald" />
        <ArrowConnector />
        <div className="flex flex-col gap-0.5">
          <Pill color="emerald" mono>embed</Pill>
          <Pill color="sky" mono>search</Pill>
        </div>
      </div>
    </IllustrationCanvas>
  );
}

export function MastraMultiAgentIll() {
  return (
    <IllustrationCanvas>
      <div className="flex items-center gap-2">
        <NodeCircle label="S" size="md" color="amber" />
        <FanOutConnector count={2} />
        <div className="flex flex-col gap-1">
          <NodeCircle label="R" size="sm" color="sky" />
          <NodeCircle label="W" size="sm" color="emerald" />
        </div>
      </div>
    </IllustrationCanvas>
  );
}

export function MastraHumanInLoopIll() {
  return (
    <IllustrationCanvas>
      <StepChain
        steps={[
          { label: "1", color: "sky" },
          { label: "⏸", color: "amber" },
          { label: "3", color: "emerald" },
        ]}
        label="prepare → approve → execute"
      />
    </IllustrationCanvas>
  );
}

export function MastraObservationalIll() {
  return (
    <IllustrationCanvas>
      <div className="flex items-center gap-2">
        <NodeCircle label="💬" size="sm" />
        <ArrowConnector />
        <NodeCircle label="📝" size="sm" />
        <ArrowConnector />
        <Pill color="rose" mono>observe</Pill>
      </div>
    </IllustrationCanvas>
  );
}

export function MastraStructuredOutputIll() {
  return (
    <IllustrationCanvas>
      <MiniCode
        lines={[
          { key: "name", value: "string", keyColor: "sky", valueColor: "emerald" },
          { key: "email", value: "email", keyColor: "sky", valueColor: "amber" },
          { key: "topics", value: "string[]", keyColor: "sky", valueColor: "violet" },
        ]}
      />
    </IllustrationCanvas>
  );
}

export function MastraGuardrailsIll() {
  return (
    <IllustrationCanvas>
      <div className="flex items-center gap-2">
        <Pill color="red" mono>input</Pill>
        <ArrowConnector />
        <NodeCircle label="🛡" size="md" />
        <ArrowConnector />
        <Pill color="emerald" mono>output</Pill>
      </div>
    </IllustrationCanvas>
  );
}

const illustrationMap: Record<string, React.ReactNode> = {
  "streaming-chat": <StreamingChatIll />,
  "structured-output": <StructuredOutputIll />,
  "tool-calling": <ToolCallingIll />,
  "generative-ui": <GenerativeUiIll />,
  "multi-step-agent": <MultiStepAgentIll />,
  "web-search": <WebSearchIll />,
  "human-in-the-loop": <HumanInTheLoopIll />,
  "rag-pipeline": <RagPipelineIll />,
  "reasoning-display": <ReasoningDisplayIll />,
  "image-generation": <ImageGenerationIll />,
  "code-artifact": <CodeArtifactIll />,
  "chat-with-citations": <ChatWithCitationsIll />,
  "durable-chat-agent": <DurableChatAgentIll />,
  "mcp-client": <MCPClientIll />,
  "text-to-sql": <TextToSQLIll />,
  "multimodal-chat": <MultiModalChatIll />,
  "mastra-agent-basic": <MastraAgentIll />,
  "mastra-tool": <MastraToolIll />,
  "mastra-workflow": <MastraWorkflowIll />,
  "mastra-memory": <MastraMemoryIll />,
  "mastra-rag": <MastraRagIll />,
  "mastra-multi-agent": <MastraMultiAgentIll />,
  "mastra-human-in-loop": <MastraHumanInLoopIll />,
  "mastra-observational-memory": <MastraObservationalIll />,
  "mastra-structured-output": <MastraStructuredOutputIll />,
  "mastra-agent-guardrails": <MastraGuardrailsIll />,
};

export function getPatternIllustration(patternId: string): React.ReactNode {
  return illustrationMap[patternId] ?? null;
}
