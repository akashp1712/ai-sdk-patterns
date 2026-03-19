"use client";

import { IllustrationCard, IllustrationGrid } from "@/components/ui/illustration-card";
import { motion } from "motion/react";
import { Download, Code, Sparkles, Terminal, Copy, ArrowRight, Zap, GitBranch, Wrench } from "lucide-react";
import { patterns } from "@/lib/patterns";

function DownloadablePatternsIllustration() {
  return (
    <div className="relative h-full flex items-center justify-center">
      <div className="flex items-center gap-4">
        <motion.div 
          className="flex flex-col gap-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="flex items-center gap-2 bg-sky-500/10 border border-sky-500/30 rounded-lg px-3 py-2"
            whileHover={{ scale: 1.05 }}
          >
            <Terminal className="h-4 w-4 text-sky-500" />
            <code className="text-xs font-mono text-sky-500">npx shadcn add...</code>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2"
            whileHover={{ scale: 1.05 }}
            transition={{ delay: 0.1 }}
          >
            <Copy className="h-4 w-4 text-emerald-500" />
            <span className="text-xs font-mono text-emerald-500">Copy code</span>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="relative"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="w-16 h-16 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 flex items-center justify-center">
            <Download className="h-6 w-6 text-primary" />
          </div>
          <motion.div 
            className="absolute -bottom-2 -right-2 w-4 h-4 bg-emerald-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </div>
  );
}

function AiSdk6Illustration() {
  return (
    <div className="relative h-full flex items-center justify-center">
      <div className="flex items-center gap-3">
        <motion.div 
          className="relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-12 h-12 rounded-lg bg-background border-2 border-foreground/20 flex items-center justify-center text-foreground font-bold text-lg">
            AI
          </div>
          <motion.div 
            className="absolute inset-0 rounded-lg border-2 border-blue-500/30"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        
        <div className="flex flex-col gap-2">
          <motion.div 
            className="flex items-center gap-2 text-xs font-mono bg-foreground/5 rounded px-2 py-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Code className="h-3 w-3" />
            <span>useChat</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2 text-xs font-mono bg-foreground/5 rounded px-2 py-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            <Code className="h-3 w-3" />
            <span>streamText</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2 text-xs font-mono bg-foreground/5 rounded px-2 py-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            <Code className="h-3 w-3" />
            <span>tool()</span>
          </motion.div>
        </div>
        
        <motion.div 
          className="text-green-500"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </div>
    </div>
  );
}

function ComposerIllustration() {
  return (
    <div className="relative h-full flex items-center justify-center">
      <div className="flex items-center gap-3">
        <motion.div 
          className="flex flex-col gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {[
            { label: "chat", color: "sky" },
            { label: "tools", color: "amber" },
            { label: "rag", color: "emerald" }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className={`h-4 w-12 rounded border border-${item.color}-500/30 bg-${item.color}-500/10 text-[8px] font-mono text-${item.color}-500/80 flex items-center justify-center`}
              animate={{ 
                x: [0, 20, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay: index * 0.3 
              }}
            >
              {item.label}
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="h-8 w-8 text-primary" />
          <motion.div 
            className="absolute inset-0"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="h-8 w-8 text-primary/20" />
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="w-14 h-14 rounded-xl bg-linear-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Code className="h-6 w-6 text-primary" />
        </motion.div>
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
            <motion.div 
              className="h-6 w-6 rounded bg-linear-to-br from-sky-500/30 to-cyan-500/30" 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
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

function StreamingChatIllustration() {
  return (
    <div className="relative h-full flex items-center justify-center">
      <motion.div 
        className="w-48 rounded-lg border border-border/50 bg-card shadow-sm p-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <motion.div 
            className="w-6 h-6 rounded-full bg-sky-500"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs font-medium text-foreground">AI Assistant</span>
        </div>
        <div className="space-y-2">
          <motion.div 
            className="h-1 w-full rounded-full bg-sky-500/30"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <motion.div 
            className="h-1 w-4/5 rounded-full bg-sky-500/20"
            initial={{ width: "0%" }}
            animate={{ width: "80%" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.div 
            className="h-1 w-3/5 rounded-full bg-sky-500/10"
            initial={{ width: "0%" }}
            animate={{ width: "60%" }}
            transition={{ duration: 1, delay: 0.7 }}
          />
        </div>
        
        <motion.div 
          className="flex items-center gap-1.5 mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.div 
            className="w-1 h-1 bg-muted-foreground/50 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.div 
            className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div 
            className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

function ComposeIllustration() {
  return (
    <div className="relative h-full flex items-center justify-center">
      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-1.5">
          <motion.div 
            className="h-5 w-14 rounded border border-sky-500/30 bg-sky-500/10 text-[8px] font-mono text-sky-500/80 flex items-center justify-center"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          >chat</motion.div>
          <motion.div 
            className="h-5 w-14 rounded border border-amber-500/30 bg-amber-500/10 text-[8px] font-mono text-amber-500/80 flex items-center justify-center"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          >tools</motion.div>
          <motion.div 
            className="h-5 w-14 rounded border border-emerald-500/30 bg-emerald-500/10 text-[8px] font-mono text-emerald-500/80 flex items-center justify-center"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          >rag</motion.div>
        </div>
        <svg width="30" height="50">
          <motion.line 
            x1="0" y1="8" x2="30" y2="25" 
            stroke="#0ea5e9" 
            strokeWidth="1" 
            opacity="0.45"
            animate={{ pathLength: [0, 1] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
          />
          <motion.line 
            x1="0" y1="25" x2="30" y2="25" 
            stroke="#f59e0b" 
            strokeWidth="1" 
            opacity="0.45"
            animate={{ pathLength: [0, 1] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 3, delay: 0.3 }}
          />
          <motion.line 
            x1="0" y1="42" x2="30" y2="25" 
            stroke="#10b981" 
            strokeWidth="1" 
            opacity="0.45"
            animate={{ pathLength: [0, 1] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 3, delay: 0.6 }}
          />
        </svg>
        <motion.div 
          className="h-14 w-14 rounded-lg border border-border/50 bg-card shadow-sm flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-foreground/40">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 9h18M9 3v18" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

function GithubIllustration() {
  return (
    <div className="relative h-full flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-900 dark:bg-gray-100 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white dark:text-gray-900">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </div>
        
        <div className="flex flex-col gap-2">
          <motion.div 
            className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded px-2 py-1"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono text-emerald-500">MIT License</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2 bg-sky-500/10 border border-sky-500/30 rounded px-2 py-1"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <div className="w-2 h-2 rounded-full bg-sky-500" />
            <span className="text-xs font-mono text-sky-500">100% Free</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    title: `${patterns.length} Downloadable Patterns`,
    description: "Install any pattern via CLI or copy code instantly. No setup required.",
    illustration: <DownloadablePatternsIllustration />,
    href: "/patterns",
    className: "col-span-3 lg:col-span-1",
  },
  {
    title: "Composition Engine",
    description: "Select patterns, generate one integrated application.",
    illustration: <ComposeIllustration />,
    href: "/compose",
    className: "col-span-3 lg:col-span-1",
  },
  {
    title: "AI SDK Compatible",
    description: "Built with the latest AI SDK. Modern hooks, streaming, and tool calling.",
    illustration: <AiSdk6Illustration />,
    href: "/patterns",
    className: "col-span-3 lg:col-span-1",
  },
  {
    title: "Generative UI",
    description: "Stream React components from server to client.",
    illustration: <GenerativeUiIllustration />,
    href: "/patterns/generative-ui",
    className: "col-span-3 lg:col-span-1",
  },
  {
    title: "Streaming Chat",
    description: "Real-time token streaming with smooth typing animations.",
    illustration: <StreamingChatIllustration />,
    href: "/patterns/streaming-chat",
    className: "col-span-3 lg:col-span-1",
  },
  {
    title: "OpenSource",
    description: "Fully opensource with MIT license.",
    illustration: <GithubIllustration />,
    href: "https://github.com/akashp1712/ai-sdk-patterns",
    className: "col-span-3 lg:col-span-1",
  },
];

export function FeaturesBento() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <IllustrationGrid>
        {features.map((f, index) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={f.className}
          >
            <IllustrationCard {...f} />
          </motion.div>
        ))}
      </IllustrationGrid>
    </motion.div>
  );
}
