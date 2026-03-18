"use client";

import { IllustrationCard, IllustrationGrid } from "@/components/ui/illustration-card";

function StreamingIllustration() {
  return (
    <div className="relative h-full flex items-center justify-center">
      <div className="w-48 rounded-lg border border-border/50 bg-card shadow-sm overflow-hidden">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/40">
          <span className="h-2 w-2 rounded-full bg-red-400/80" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
          <span className="h-2 w-2 rounded-full bg-green-400/80" />
        </div>
        <div className="px-3 py-3 space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-foreground/12" />
          <div className="h-1.5 w-3/4 rounded-full bg-foreground/12" />
          <div className="h-1.5 w-5/6 rounded-full bg-foreground/12" />
          <div className="h-1.5 w-1/2 rounded-full bg-sky-500/40 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function ToolCallingIllustration() {
  return (
    <div className="relative h-full flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full border border-border/50 bg-card flex items-center justify-center shadow-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/50" />
          </svg>
        </div>
        <svg width="40" height="60">
          <line x1="0" y1="10" x2="40" y2="0" stroke="#ef4444" strokeWidth="1" opacity="0.5" />
          <line x1="0" y1="30" x2="40" y2="30" stroke="#f59e0b" strokeWidth="1" opacity="0.5" />
          <line x1="0" y1="50" x2="40" y2="60" stroke="#22d3ee" strokeWidth="1" opacity="0.5" />
        </svg>
        <div className="flex flex-col gap-2">
          <div className="h-6 w-16 rounded border border-red-500/30 bg-red-500/10 text-[10px] font-mono text-red-500/80 flex items-center justify-center">fn()</div>
          <div className="h-6 w-16 rounded border border-amber-500/30 bg-amber-500/10 text-[10px] font-mono text-amber-500/80 flex items-center justify-center">api()</div>
          <div className="h-6 w-16 rounded border border-cyan-500/30 bg-cyan-500/10 text-[10px] font-mono text-cyan-500/80 flex items-center justify-center">db()</div>
        </div>
      </div>
    </div>
  );
}

function StructuredIllustration() {
  return (
    <div className="relative h-full flex items-center justify-center">
      <div className="w-44 rounded-lg border border-border/50 bg-card shadow-sm px-3 py-3 font-mono text-[10px] leading-relaxed">
        <span className="text-foreground/50">{"{"}</span><br />
        <span className="ml-3 text-sky-500/80">&quot;name&quot;</span>: <span className="text-emerald-500/80">&quot;...&quot;</span>,<br />
        <span className="ml-3 text-sky-500/80">&quot;items&quot;</span>: [<br />
        <span className="ml-6 text-amber-500/60">{"{ }"}</span>,<br />
        <span className="ml-3 text-foreground/40">]<br /></span>
        <span className="text-foreground/50">{"}"}</span>
      </div>
    </div>
  );
}

function GenerativeUiIllustration() {
  return (
    <div className="relative h-full flex items-center justify-center">
      <div className="space-y-2">
        <div className="rounded-lg border border-border/50 bg-card shadow-sm px-3 py-2 text-[11px] text-muted-foreground w-40">
          Make a music player
        </div>
        <div className="rounded-lg border border-border/50 bg-card shadow-sm p-3 w-40">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-6 w-6 rounded bg-gradient-to-br from-sky-500/30 to-cyan-500/30" />
            <div>
              <div className="h-1.5 w-16 rounded-full bg-foreground/14" />
              <div className="h-1.5 w-10 rounded-full bg-foreground/10 mt-1" />
            </div>
          </div>
          <div className="h-1 w-full rounded-full bg-foreground/8">
            <div className="h-1 w-2/5 rounded-full bg-cyan-500/50" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CopyIllustration() {
  return (
    <div className="relative h-full flex items-center justify-center">
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="absolute top-1 left-1 w-28 h-20 rounded border border-border/40 bg-card/50" />
          <div className="relative w-28 h-20 rounded border border-border/50 bg-card shadow-sm p-2">
            <div className="h-1.5 w-full rounded-full bg-foreground/10 mb-1.5" />
            <div className="h-1.5 w-3/4 rounded-full bg-foreground/10 mb-1.5" />
            <div className="h-1.5 w-5/6 rounded-full bg-foreground/10 mb-1.5" />
            <div className="h-1.5 w-1/2 rounded-full bg-foreground/10" />
          </div>
        </div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-emerald-500/60">
          <path d="M5 12h14m-4-4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="w-12 h-16 rounded border border-emerald-500/30 bg-emerald-500/10 shadow-sm flex items-center justify-center">
          <span className="text-[9px] font-mono text-emerald-500/80">.zip</span>
        </div>
      </div>
    </div>
  );
}

function ComposeIllustration() {
  return (
    <div className="relative h-full flex items-center justify-center">
      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-1.5">
          <div className="h-5 w-14 rounded border border-sky-500/30 bg-sky-500/10 text-[8px] font-mono text-sky-500/80 flex items-center justify-center">chat</div>
          <div className="h-5 w-14 rounded border border-amber-500/30 bg-amber-500/10 text-[8px] font-mono text-amber-500/80 flex items-center justify-center">tools</div>
          <div className="h-5 w-14 rounded border border-emerald-500/30 bg-emerald-500/10 text-[8px] font-mono text-emerald-500/80 flex items-center justify-center">rag</div>
        </div>
        <svg width="30" height="50">
          <line x1="0" y1="8" x2="30" y2="25" stroke="#0ea5e9" strokeWidth="1" opacity="0.45" />
          <line x1="0" y1="25" x2="30" y2="25" stroke="#f59e0b" strokeWidth="1" opacity="0.45" />
          <line x1="0" y1="42" x2="30" y2="25" stroke="#10b981" strokeWidth="1" opacity="0.45" />
        </svg>
        <div className="h-14 w-14 rounded-lg border border-border/50 bg-card shadow-sm flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-foreground/40">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 9h18M9 3v18" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    title: "Streaming Chat",
    description: "Real-time token streaming with useChat and streamText.",
    illustration: <StreamingIllustration />,
  },
  {
    title: "Tool Calling",
    description: "Let models call functions, query APIs, and run workflows.",
    illustration: <ToolCallingIllustration />,
  },
  {
    title: "Structured Output",
    description: "Generate typed JSON with Zod schemas and validation.",
    illustration: <StructuredIllustration />,
  },
  {
    title: "Generative UI",
    description: "Stream React components from server to client.",
    illustration: <GenerativeUiIllustration />,
  },
  {
    title: "Copy & Download",
    description: "One-click copy or download as a Next.js project.",
    illustration: <CopyIllustration />,
  },
  {
    title: "Composition Engine",
    description: "Select patterns, generate one integrated application.",
    illustration: <ComposeIllustration />,
  },
];

export function FeaturesBento() {
  return (
    <IllustrationGrid>
      {features.map((f) => (
        <IllustrationCard key={f.title} {...f} />
      ))}
    </IllustrationGrid>
  );
}
