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

export function JsonRendererIll() {
  return (
    <IllustrationCanvas>
      <div className="flex items-center gap-1.5">
        <MiniCard className="px-1.5 py-1 font-mono text-[7px] text-muted-foreground/40">
          {"{ }"}
        </MiniCard>
        <ArrowConnector color="amber" />
        <MiniCard className="border-amber-500/30 bg-amber-500/10 p-1.5">
          <div className="h-2 w-8 rounded-sm bg-amber-500/15 mb-1" />
          <div className="h-2 w-12 rounded-sm bg-amber-500/15" />
        </MiniCard>
      </div>
    </IllustrationCanvas>
  );
}

export function MarkdownChatIll() {
  return (
    <IllustrationCanvas>
      <MiniCard className="w-full max-w-[130px] p-2 space-y-1">
        <div className="h-1.5 w-10 rounded-full bg-foreground/12" />
        <SkeletonLines count={2} />
        <MiniCard className="bg-sky-500/10 border-sky-500/20 px-1.5 py-1 mt-1">
          <SkeletonLines count={2} color="sky" widths={["w-16", "w-10"]} />
        </MiniCard>
      </MiniCard>
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

export function TextGenerationIll() {
  return (
    <IllustrationCanvas>
      <div className="flex items-center gap-1.5">
        <NodeCircle label="AI" color="sky" size="md" />
        <ArrowConnector color="sky" />
        <MiniCard className="px-2 py-1.5 max-w-[80px]">
          <SkeletonLines count={3} color="sky" pulse />
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

export function StreamingObjectIll() {
  return (
    <IllustrationCanvas>
      <MiniCode
        lines={[
          { key: "title", value: '"..."', keyColor: "sky", valueColor: "emerald" },
          { key: "tags", value: "[...]", keyColor: "sky", valueColor: "emerald" },
          { key: "body", value: "█", keyColor: "sky", valueColor: "emerald" },
        ]}
      />
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

export function RoutingAgentIll() {
  return (
    <IllustrationCanvas>
      <div className="flex items-center gap-2">
        <NodeCircle label="?" size="md" />
        <ArrowConnector />
        <NodeCircle label="R" size="md" />
        <FanOutConnector count={3} />
        <div className="flex flex-col gap-1">
          <Pill mono>code</Pill>
          <Pill mono>math</Pill>
          <Pill mono>write</Pill>
        </div>
      </div>
    </IllustrationCanvas>
  );
}

export function OrchestratorAgentIll() {
  return (
    <IllustrationCanvas>
      <div className="flex flex-col items-center gap-1.5">
        <NodeCircle label="O" size="md" />
        <div className="flex items-center gap-2">
          <NodeCircle label="A" size="sm" />
          <NodeCircle label="B" size="sm" />
          <NodeCircle label="C" size="sm" />
        </div>
        <ArrowConnector />
        <Pill mono>merged</Pill>
      </div>
    </IllustrationCanvas>
  );
}

export function EvaluatorOptimizerIll() {
  return (
    <IllustrationCanvas>
      <StepChain
        steps={[
          { label: "G", color: "sky" },
          { label: "E", color: "amber" },
          { label: "O", color: "emerald" },
        ]}
        label="generate → evaluate → optimize"
      />
    </IllustrationCanvas>
  );
}

export function SequentialWorkflowIll() {
  return (
    <IllustrationCanvas>
      <StepChain
        steps={[
          { label: "1", color: "sky" },
          { label: "2", color: "sky" },
          { label: "3", color: "sky" },
          { label: "4", color: "sky" },
        ]}
        label="research → summarize → translate → format"
      />
    </IllustrationCanvas>
  );
}

export function ParallelWorkflowIll() {
  return (
    <IllustrationCanvas>
      <div className="flex items-center gap-2">
        <NodeCircle label="IN" size="md" />
        <FanOutConnector count={3} />
        <div className="flex flex-col gap-1">
          <Pill mono>task A</Pill>
          <Pill mono>task B</Pill>
          <Pill mono>task C</Pill>
        </div>
        <ArrowConnector />
        <NodeCircle label="M" size="md" />
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

export function FormGeneratorIll() {
  return (
    <IllustrationCanvas>
      <div className="flex items-center gap-1.5">
        <MiniCard className="px-2 py-1.5 text-[7px] text-muted-foreground max-w-[55px] leading-tight">
          Describe form...
        </MiniCard>
        <ArrowConnector />
        <MiniCard className="p-2 space-y-1">
          <div className="h-2 w-12 rounded bg-foreground/10" />
          <div className="h-3 w-16 rounded border border-foreground/10" />
          <div className="h-2 w-10 rounded bg-foreground/10" />
          <div className="h-3 w-16 rounded border border-foreground/10" />
        </MiniCard>
      </div>
    </IllustrationCanvas>
  );
}

export function CsvEditorIll() {
  return (
    <IllustrationCanvas>
      <MiniCard className="p-1.5">
        <div className="grid grid-cols-3 gap-px">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-2.5 w-7 rounded-sm bg-foreground/8" />
          ))}
        </div>
      </MiniCard>
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

export function WorkflowApprovalIll() {
  return (
    <IllustrationCanvas>
      <div className="flex items-center gap-2">
        <NodeCircle label="AI" size="md" />
        <ArrowConnector />
        <MiniCard className="px-2 py-1 text-[7px] text-amber-500/80 border-amber-500/30 bg-amber-500/15">
          ⏸️ Paused
        </MiniCard>
        <ArrowConnector />
        <div className="flex gap-1.5">
          <Pill color="emerald">✓ Approve</Pill>
          <Pill color="red">✕ Reject</Pill>
        </div>
      </div>
    </IllustrationCanvas>
  );
}

export function ScheduledWorkflowIll() {
  return (
    <IllustrationCanvas>
      <div className="flex items-center gap-2">
        <NodeCircle label="Start" size="sm" />
        <ArrowConnector />
        <MiniCard className="px-2 py-1 text-[7px] text-blue-500/80 border-blue-500/30 bg-blue-500/15">
          ⏰ Sleep
        </MiniCard>
        <ArrowConnector />
        <NodeCircle label="Run" size="sm" />
      </div>
    </IllustrationCanvas>
  );
}

export function RefinementLoopIll() {
  return (
    <IllustrationCanvas>
      <StepChain
        steps={[
          { label: "G", color: "sky" },
          { label: "E", color: "amber" },
          { label: "O", color: "emerald" },
        ]}
        label="generate → evaluate → refine"
      />
    </IllustrationCanvas>
  );
}

// ── Registry ────────────────────────────────────────────────────────
// Add new pattern illustrations here. Key = pattern id from lib/patterns.ts

const illustrationMap: Record<string, React.ReactNode> = {
  "streaming-chat": <StreamingChatIll />,
  "structured-output": <StructuredOutputIll />,
  "tool-calling": <ToolCallingIll />,
  "generative-ui": <GenerativeUiIll />,
  "multi-step-agent": <MultiStepAgentIll />,
  "web-search": <WebSearchIll />,
  "human-in-the-loop": <HumanInTheLoopIll />,
  "rag-pipeline": <RagPipelineIll />,
  "json-renderer": <JsonRendererIll />,
  "markdown-chat": <MarkdownChatIll />,
  "reasoning-display": <ReasoningDisplayIll />,
  "text-generation": <TextGenerationIll />,
  "image-generation": <ImageGenerationIll />,
  "streaming-object": <StreamingObjectIll />,
  "code-artifact": <CodeArtifactIll />,
  "routing-agent": <RoutingAgentIll />,
  "orchestrator-agent": <OrchestratorAgentIll />,
  "evaluator-optimizer": <EvaluatorOptimizerIll />,
  "sequential-workflow": <SequentialWorkflowIll />,
  "parallel-workflow": <ParallelWorkflowIll />,
  "chat-with-citations": <ChatWithCitationsIll />,
  "form-generator": <FormGeneratorIll />,
  "csv-editor": <CsvEditorIll />,
  "durable-chat-agent": <DurableChatAgentIll />,
  "workflow-approval": <WorkflowApprovalIll />,
  "scheduled-workflow": <ScheduledWorkflowIll />,
  "refinement-loop": <RefinementLoopIll />,
};

export function getPatternIllustration(patternId: string): React.ReactNode {
  return illustrationMap[patternId] ?? null;
}
