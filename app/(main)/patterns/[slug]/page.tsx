import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { patterns, getPattern } from "@/lib/patterns";
import { PatternDetail } from "./pattern-detail";

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
    author: { "@type": "Person", name: "Akash Kumar", url: "https://github.com/AkashKumar7902" },
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
            className="text-xs font-medium px-2.5 py-1 rounded-md bg-foreground/[0.06] text-foreground hover:bg-foreground/[0.1] transition-colors"
          >
            {pattern.category}
          </Link>
          <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-foreground/[0.06] text-muted-foreground">
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
