import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Download, Code, Play, Lightbulb } from "lucide-react";
import { patterns, getPattern } from "@/lib/patterns";
import { getPatternUseCases } from "@/lib/pattern-use-cases";
import { PatternDetail } from "./pattern-detail";
import { PatternActionsSimple } from "@/components/patterns/pattern-actions-simple";
import { PackageManagerTabs } from "./package-manager-tabs";

export function generateStaticParams() {
  return patterns.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pattern = getPattern(slug);
  if (!pattern) return {};

  const title = `${pattern.title} — AI SDK Pattern`;
  const description = `${pattern.description} Full Next.js source code with ${pattern.files.length} files. ${pattern.difficulty} difficulty. Install via CLI or download.`;

  return {
    title: pattern.title,
    description,
    keywords: [
      ...pattern.tags,
      "AI SDK",
      "Vercel AI SDK",
      "Next.js",
      pattern.category,
      `${pattern.difficulty} AI pattern`,
    ],
    openGraph: {
      title,
      description: pattern.description,
    },
    alternates: {
      canonical: `/patterns/${pattern.id}`,
    },
  };
}


export default async function PatternPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pattern = getPattern(slug);

  if (!pattern) notFound();

  const relatedPatterns = pattern.relatedPatterns
    .map((id) => getPattern(id))
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: pattern.title,
    description: pattern.description,
    proficiencyLevel: pattern.difficulty === "beginner" ? "Beginner" : pattern.difficulty === "intermediate" ? "Expert" : "Advanced",
    keywords: pattern.tags.join(", "),
    author: { "@type": "Person", name: "Akash Panchal", url: "https://github.com/akashp1712" },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          {pattern.title}
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          {pattern.description}
        </p>

        {/* Meta chips */}
        <div className="flex flex-wrap items-center gap-2 mt-5">
          <Link
            href={`/patterns?category=${pattern.category}`}
            className="text-xs font-medium px-2.5 py-1 rounded-md bg-foreground/6 text-foreground hover:bg-foreground/10 transition-colors"
          >
            {pattern.category}
          </Link>
          <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-foreground/6 text-muted-foreground">
            {pattern.difficulty}
          </span>
          {pattern.tags.map((tag) => (
            <Link
              key={tag}
              href={`/patterns?search=${encodeURIComponent(tag)}`}
              className="text-xs px-2.5 py-1 rounded-md border border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Detail with tabs */}
      <PatternDetail pattern={pattern} />

      {/* Installation & Usage */}
      <div className="mt-16 space-y-12">
        {/* Installation */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Download className="h-5 w-5" />
            Installation
          </h2>
          <div className="space-y-6">
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-base font-medium mb-4">Option 1: Install via CLI</h3>
              <PackageManagerTabs patternId={pattern.id} />
              <p className="text-sm text-muted-foreground mt-4">
                Automatically installs the pattern and its dependencies in your project.
              </p>
            </div>
            
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-base font-medium mb-4">Option 2: Copy or Download</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Download the complete pattern as a standalone Next.js project.
              </p>
              <PatternActionsSimple pattern={pattern} />
            </div>
          </div>
        </section>

        {/* Usage */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Play className="h-5 w-5" />
            Usage
          </h2>
          <div className="space-y-6">
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-base font-medium mb-4">1. Set up environment variables</h3>
              <div className="bg-muted rounded-md p-4 font-mono text-sm mb-4">
                <div># .env.local</div>
                <div>ANTHROPIC_API_KEY=your_anthropic_key</div>
                <div>OPENAI_API_KEY=your_openai_key</div>
                <div>GOOGLE_GENERATIVE_AI_API_KEY=your_google_key</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Add your AI provider API key to enable real functionality.
              </p>
            </div>

            <div className="border border-border rounded-lg p-6">
              <h3 className="text-base font-medium mb-4">2. Run the development server</h3>
              <div className="bg-muted rounded-md p-4 font-mono text-sm mb-4">
                <div>npm run dev</div>
                <div># or</div>
                <div>pnpm dev</div>
                <div># or</div>
                <div>yarn dev</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Open <code className="text-xs bg-foreground/10 px-1 rounded">http://localhost:3000</code> to see the pattern in action.
              </p>
            </div>

            <div className="border border-border rounded-lg p-6">
              <h3 className="text-base font-medium mb-4">3. Customize for your needs</h3>
              <p className="text-sm text-muted-foreground mb-4">
                The pattern is ready to use. Modify the components, API routes, and styling to fit your application.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>Update the UI components in <code className="text-xs bg-foreground/10 px-1 rounded">app/page.tsx</code></li>
                <li>Modify API logic in <code className="text-xs bg-foreground/10 px-1 rounded">app/api/</code></li>
                <li>Adjust styling with Tailwind CSS classes</li>
                <li>Add your own business logic and data sources</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Use Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getPatternUseCases(pattern.id).map((useCase, index: number) => (
              <div key={index} className="border border-border rounded-lg p-6">
                <h3 className="text-base font-medium mb-3">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{useCase.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Details */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Code className="h-5 w-5" />
            Technical Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-base font-medium mb-4">Dependencies</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <div>• Next.js 16+ (App Router)</div>
                <div>• AI SDK v6</div>
                <div>• React 18+</div>
                <div>• Tailwind CSS</div>
                <div>• TypeScript</div>
              </div>
            </div>
            
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-base font-medium mb-4">Files Included</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                {pattern.files.map((file) => (
                  <div key={file.path}>• {file.path}</div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Related */}
      {relatedPatterns.length > 0 && (
        <div className="mt-20 pt-10 border-t border-border/60">
          <h2 className="text-lg font-semibold mb-5">Related patterns</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedPatterns.map((rp) => (
              <Link
                key={rp!.id}
                href={`/patterns/${rp!.id}`}
                className="group flex items-center justify-between rounded-lg border border-border/60 bg-card p-5 transition-all hover:border-border hover:shadow-sm"
              >
                <div>
                  <h3 className="text-[15px] font-medium mb-1">{rp!.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {rp!.description}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors shrink-0 ml-4" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
