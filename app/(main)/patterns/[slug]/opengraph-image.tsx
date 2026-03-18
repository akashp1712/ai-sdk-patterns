import { ImageResponse } from "next/og";
import { patterns, getPattern } from "@/lib/patterns";

export const alt = "AI SDK Pattern";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return patterns.map((p) => ({ slug: p.id }));
}

const difficultyColor: Record<string, string> = {
  beginner: "#16a34a",
  intermediate: "#ca8a04",
  advanced: "#dc2626",
};

const difficultyBg: Record<string, string> = {
  beginner: "#f0fdf4",
  intermediate: "#fefce8",
  advanced: "#fef2f2",
};

export default async function PatternOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pattern = getPattern(slug);

  if (!pattern) {
    return new ImageResponse(
      (
        <div
          style={{
            background: "#fafafa",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#a3a3a3",
            fontSize: "32px",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Pattern not found
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "#fafafa",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          {/* Badges */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
            <div
              style={{
                background: "#f0f0f0",
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
                padding: "6px 16px",
                fontSize: "15px",
                color: "#525252",
                textTransform: "capitalize",
                display: "flex",
              }}
            >
              {pattern.category}
            </div>
            <div
              style={{
                background: difficultyBg[pattern.difficulty],
                border: `1px solid ${difficultyColor[pattern.difficulty]}33`,
                borderRadius: "8px",
                padding: "6px 16px",
                fontSize: "15px",
                color: difficultyColor[pattern.difficulty],
                textTransform: "capitalize",
                display: "flex",
              }}
            >
              {pattern.difficulty}
            </div>
            <div
              style={{
                background: "#f0f0f0",
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
                padding: "6px 16px",
                fontSize: "15px",
                color: "#525252",
                display: "flex",
              }}
            >
              {pattern.files.length} files
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "#0a0a0a",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              marginBottom: "24px",
              display: "flex",
            }}
          >
            {pattern.title}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "22px",
              color: "#737373",
              lineHeight: 1.5,
              maxWidth: "800px",
              display: "flex",
            }}
          >
            {pattern.description}
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "80px",
            right: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "18px", color: "#a3a3a3", display: "flex" }}>
            AI SDK Patterns
          </div>
          <div style={{ fontSize: "16px", color: "#a3a3a3", display: "flex" }}>
            npx shadcn add .../r/{pattern.id}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
