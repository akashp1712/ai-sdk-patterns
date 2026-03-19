import Link from "next/link";
import { ArrowRight, Sparkles, Terminal as TerminalIcon } from "lucide-react";
import { patterns } from "@/lib/patterns";
import { HeroTerminal } from "./hero-terminal";
import { HeroGrid } from "./hero-grid";
import { HeroHighlight } from "./hero-highlight";
import { FeaturesBento } from "./features-bento";
import { PatternCards } from "./pattern-cards";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI SDK Patterns",
    description: `${patterns.length}+ production-ready patterns for building AI apps with the Vercel AI SDK.`,
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://ai-sdk-patterns.vercel.app",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@type": "Person", name: "Akash Panchal", url: "https://github.com/akashp1712" },
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <HeroGrid />
        <div className="absolute inset-0 bg-linear-to-b from-background/0 via-background/50 to-background pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 sm:pt-36 sm:pb-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Link
                href="/compose"
                className="group mb-8 inline-flex items-center rounded-full border border-border/60 bg-card/80 backdrop-blur-sm px-4 py-1.5 text-sm transition-all hover:border-border hover:bg-accent/50"
              >
                <Sparkles className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                <AnimatedShinyText>
                  Introducing Composer
                </AnimatedShinyText>
                <ArrowRight className="ml-2 h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
                AI SDK Patterns
                <br />
                <HeroHighlight>that compose into apps</HeroHighlight>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed mb-10">
                {patterns.length}+ open-source, composable AI SDK patterns — chat, agents, tools, workflows.
                Pick patterns, generate a full-stack Next.js app.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link
                  href="/patterns"
                  className="inline-flex items-center gap-2.5 rounded-lg bg-primary text-primary-foreground px-6 py-3 text-[15px] font-medium shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm"
                >
                  Browse patterns
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/compose"
                  className="inline-flex items-center gap-2.5 rounded-lg border border-border/60 bg-card/80 backdrop-blur-sm px-6 py-3 text-[15px] font-medium transition-all duration-200 hover:bg-accent hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Sparkles className="h-4 w-4" />
                  Compose
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <HeroTerminal />
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-border/60 bg-card/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-center">
          {[
            { value: String(patterns.length), label: "Patterns" },
            { value: String(new Set(patterns.map((p) => p.category)).size), label: "Categories" },
            { value: "3", label: "Providers" },
            { value: "100%", label: "Free & OSS" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-xl font-bold tracking-tight">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Provider logos */}
      <section className="border-b border-border/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col items-center gap-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Provider-agnostic — works with any AI SDK provider</p>
          <div className="flex items-center gap-6 sm:gap-10 flex-wrap justify-center">
            {/* Anthropic / Claude */}
            <div className="flex items-center gap-2 text-muted-foreground/70 hover:text-foreground transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M16.5 3h-3.2L6 21h3.2l1.6-4h6.4l1.6 4H22L16.5 3zm-4.3 11L14.5 8l2.3 6h-4.6z" fill="currentColor" />
              </svg>
              <span className="text-sm font-medium">Anthropic</span>
            </div>
            {/* OpenAI */}
            <div className="flex items-center gap-2 text-muted-foreground/70 hover:text-foreground transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
              </svg>
              <span className="text-sm font-medium">OpenAI</span>
            </div>
            {/* Google */}
            <div className="flex items-center gap-2 text-muted-foreground/70 hover:text-foreground transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 11h8.533c.044.385.067.78.067 1.184 0 2.734-.98 5.036-2.678 6.6-1.485 1.371-3.518 2.175-5.922 2.175A8.976 8.976 0 0 1 3 12a8.976 8.976 0 0 1 9-8.959c2.42 0 4.473.89 6.064 2.36L16.1 7.236C15.013 6.216 13.608 5.7 12 5.7 8.522 5.7 5.7 8.523 5.7 12S8.522 18.3 12 18.3c2.947 0 5.023-1.593 5.538-3.8H12V11z" />
              </svg>
              <span className="text-sm font-medium">Google</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features — BentoGrid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Interactive feature showcase
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Explore core AI SDK capabilities with animated examples. Click any card
            to see the actual pattern implementation.
          </p>
        </div>
        <FeaturesBento />
      </section>

      {/* Patterns — compact, info-dense cards grouped by category */}
      <section id="patterns" className="border-t border-border/60 bg-card/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                {patterns.length} patterns, free and composable
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Use individually or combine them into one app with the Composer
              </p>
            </div>
            <Link
              href="/patterns"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm shrink-0 w-full sm:w-auto"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <PatternCards
            patterns={patterns.map((p) => ({
              id: p.id,
              title: p.title,
              description: p.description,
              category: p.category,
              difficulty: p.difficulty,
              fileCount: p.files.length,
            }))}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/60 bg-card/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            One pattern or many — your call
          </h2>
          <p className="text-base text-muted-foreground mb-8 max-w-lg mx-auto">
            Install a single pattern via CLI, or use the Composer to merge
            several into one integrated Next.js app.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="inline-flex items-center gap-3 rounded-xl border border-border/60 bg-background px-4 sm:px-6 py-3.5 font-mono text-xs sm:text-sm text-muted-foreground shadow-sm overflow-x-auto max-w-[calc(100vw-3rem)]">
              <TerminalIcon className="h-4 w-4 shrink-0 text-foreground/50" />
              <code className="whitespace-nowrap shrink-0">npx shadcn add {process.env.NEXT_PUBLIC_SITE_URL || "https://ai-sdk-patterns.vercel.app"}/r/streaming-chat</code>
            </div>
            <Link
              href="/compose"
              className="inline-flex items-center gap-2.5 rounded-lg bg-foreground text-background px-6 py-3 text-[15px] font-medium transition-all duration-200 hover:bg-foreground/90 hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="h-4 w-4" />
              Open Composer
            </Link>
          </div>
          <p className="text-xs text-muted-foreground/50 mt-4">100% open source — no accounts, no paywalls</p>
        </div>
      </section>

    </div>
  );
}
