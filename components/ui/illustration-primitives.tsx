/**
 * Illustration Primitives
 *
 * Reusable building blocks for creating pattern/feature illustrations.
 * Compose these to build unique visuals for each card — no images needed.
 *
 * Usage:
 *   <IllustrationCanvas>
 *     <ChatBubble align="right">Hello!</ChatBubble>
 *     <ChatBubble align="left"><SkeletonLines count={3} color="sky" pulse /></ChatBubble>
 *   </IllustrationCanvas>
 */
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// ── Color tokens ────────────────────────────────────────────────────
export type AccentColor = "sky" | "emerald" | "amber" | "red" | "cyan" | "rose" | "violet";

const colorMap: Record<AccentColor, { bg: string; border: string; text: string; line: string }> = {
  sky:     { bg: "bg-sky-500/20",     border: "border-sky-500/30",     text: "text-sky-500/80",     line: "bg-sky-500" },
  emerald: { bg: "bg-emerald-500/20", border: "border-emerald-500/30", text: "text-emerald-500/80", line: "bg-emerald-500" },
  amber:   { bg: "bg-amber-500/20",   border: "border-amber-500/30",   text: "text-amber-500/80",   line: "bg-amber-500" },
  red:     { bg: "bg-red-500/20",     border: "border-red-500/30",     text: "text-red-500/80",     line: "bg-red-500" },
  cyan:    { bg: "bg-cyan-500/20",    border: "border-cyan-500/30",    text: "text-cyan-500/80",    line: "bg-cyan-500" },
  rose:    { bg: "bg-rose-500/20",    border: "border-rose-500/30",    text: "text-rose-500/80",    line: "bg-rose-500" },
  violet:  { bg: "bg-violet-500/20",  border: "border-violet-500/30",  text: "text-violet-500/80",  line: "bg-violet-500" },
};

export function getColor(color: AccentColor) {
  return colorMap[color];
}

// ── Layout ──────────────────────────────────────────────────────────

/** Centered flex container — wraps all illustration content */
export function IllustrationCanvas({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("h-full flex items-center justify-center", className)}>
      {children}
    </div>
  );
}

// ── Skeleton / Placeholder Lines ────────────────────────────────────

/** Animated placeholder lines (like loading content) */
export function SkeletonLines({
  count = 3,
  color,
  pulse = false,
  widths,
}: {
  count?: number;
  color?: AccentColor;
  pulse?: boolean;
  widths?: string[];
}) {
  const defaultWidths = ["w-full", "w-3/4", "w-5/6", "w-1/2", "w-2/3"];
  const c = color ? getColor(color) : null;
  return (
    <div className="space-y-1">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-1 rounded-full",
            widths?.[i] ?? defaultWidths[i % defaultWidths.length],
            c ? `${c.line}/25` : "bg-foreground/12",
            pulse && i === count - 1 && "animate-pulse"
          )}
        />
      ))}
    </div>
  );
}

// ── Chat Bubble ─────────────────────────────────────────────────────

export function ChatBubble({
  children,
  align = "left",
}: {
  children: ReactNode;
  align?: "left" | "right";
}) {
  return (
    <div className={cn("flex", align === "right" ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "rounded-lg px-2.5 py-1.5 text-[9px] text-muted-foreground",
          align === "right"
            ? "bg-foreground/12"
            : "border border-border/50 bg-card"
        )}
      >
        {children}
      </div>
    </div>
  );
}

// ── Node / Circle ───────────────────────────────────────────────────

/** Small labeled circle (like "AI", step numbers, etc.) */
export function NodeCircle({
  label,
  color,
  size = "md",
}: {
  label: string;
  color?: AccentColor;
  size?: "sm" | "md" | "lg";
}) {
  const c = color ? getColor(color) : null;
  const sizes = {
    sm: "h-5 w-5 text-[6px]",
    md: "h-7 w-7 text-[7px]",
    lg: "h-10 w-10 text-[10px]",
  };
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-mono shrink-0",
        sizes[size],
        c
          ? `${c.bg} ${c.border} border ${c.text}`
          : "border border-border/50 bg-card text-muted-foreground"
      )}
    >
      {label}
    </div>
  );
}

// ── Connector Lines (SVG) ───────────────────────────────────────────

/** Arrow pointing right: → */
export function ArrowConnector({
  color,
  width = 14,
  height = 8,
}: {
  color?: AccentColor;
  width?: number;
  height?: number;
}) {
  const c = color ? getColor(color) : null;
  return (
    <svg width={width} height={height} className={c ? c.text : "text-foreground/20"}>
      <path
        d={`M0 ${height / 2}h${width}m-${Math.round(height * 0.4)}-${Math.round(height * 0.4)}l${Math.round(height * 0.4)} ${Math.round(height * 0.4)}-${Math.round(height * 0.4)} ${Math.round(height * 0.4)}`}
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Fan-out lines from one point to multiple targets */
export function FanOutConnector({
  count = 3,
  colors,
  width = 24,
  height = 36,
}: {
  count?: number;
  colors?: string[];
  width?: number;
  height?: number;
}) {
  const defaultColors = ["#ef4444", "#f59e0b", "#22d3ee"];
  const c = colors ?? defaultColors;
  const step = height / (count - 1 || 1);
  return (
    <svg width={width} height={height}>
      {Array.from({ length: count }).map((_, i) => (
        <line
          key={i}
          x1="0"
          y1={height / 2}
          x2={width}
          y2={i * step}
          stroke={c[i % c.length]}
          strokeWidth="1"
          opacity="0.5"
        />
      ))}
    </svg>
  );
}

// ── Pill / Tag ──────────────────────────────────────────────────────

/** Small labeled pill (for function names, status labels, etc.) */
export function Pill({
  children,
  color,
  mono = false,
}: {
  children: ReactNode;
  color?: AccentColor;
  mono?: boolean;
}) {
  const c = color ? getColor(color) : null;
  return (
    <div
      className={cn(
        "h-4 px-2 rounded flex items-center justify-center text-[6px]",
        mono && "font-mono",
        c
          ? `${c.bg} ${c.border} border ${c.text}`
          : "border border-border/50 bg-card text-muted-foreground"
      )}
    >
      {children}
    </div>
  );
}

// ── Mini Card / Panel ───────────────────────────────────────────────

/** Small bordered card for showing content blocks */
export function MiniCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded border border-border/50 bg-card", className)}>
      {children}
    </div>
  );
}

// ── Code Block ──────────────────────────────────────────────────────

/** Mini JSON/code representation */
export function MiniCode({
  lines,
}: {
  lines: { indent?: number; key?: string; value?: string; keyColor?: AccentColor; valueColor?: AccentColor }[];
}) {
  return (
    <div className="rounded border border-border/40 bg-card px-2.5 py-2 font-mono text-[8px] leading-relaxed">
      <span className="text-foreground/30">{"{"}</span>
      <br />
      {lines.map((line, i) => {
        const kc = line.keyColor ? getColor(line.keyColor) : null;
        const vc = line.valueColor ? getColor(line.valueColor) : null;
        return (
          <span key={i}>
            <span style={{ marginLeft: (line.indent ?? 1) * 8 }} className={kc?.text ?? "text-sky-500/50"}>
              &quot;{line.key}&quot;
            </span>
            <span className="text-foreground/20">:</span>{" "}
            <span className={vc?.text ?? "text-emerald-500/50"}>{line.value}</span>
            <br />
          </span>
        );
      })}
      <span className="text-foreground/30">{"}"}</span>
    </div>
  );
}

// ── Step Chain ───────────────────────────────────────────────────────

/** Horizontal chain of numbered/labeled steps connected by dashes */
export function StepChain({
  steps,
  label,
}: {
  steps: { label: string; color: AccentColor }[];
  label?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-1">
        {steps.map((step, i) => (
          <span key={i} className="contents">
            {i > 0 && (
              <div className={cn("w-4 h-px", `${getColor(step.color).line}/20`)} />
            )}
            <NodeCircle label={step.label} color={step.color} size="sm" />
          </span>
        ))}
      </div>
      {label && (
        <div className="text-[7px] text-muted-foreground/40 mt-1">{label}</div>
      )}
    </div>
  );
}

// ── Window Chrome ───────────────────────────────────────────────────

/** Fake macOS-style window wrapper with traffic light dots */
export function WindowChrome({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-lg border border-border/40 bg-card shadow-sm overflow-hidden", className)}>
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/30">
        <span className="h-2 w-2 rounded-full bg-red-400/60" />
        <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
        <span className="h-2 w-2 rounded-full bg-green-400/60" />
      </div>
      <div className="px-3 py-3">{children}</div>
    </div>
  );
}

// ── Search Bar ──────────────────────────────────────────────────────

export function MiniSearchBar({ color }: { color?: AccentColor }) {
  const c = color ? getColor(color) : null;
  return (
    <div className="rounded border border-border/40 bg-card px-2 py-1.5 flex items-center gap-1.5">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className={c?.text ?? "text-sky-500/40"}>
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="h-1 w-full rounded-full bg-foreground/6" />
    </div>
  );
}
