import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI SDK Patterns — Production-Ready AI Code for Next.js";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                background: "#f0f0f0",
                border: "1px solid #e5e5e5",
                borderRadius: "9999px",
                padding: "8px 20px",
                fontSize: "16px",
                color: "#666",
                display: "flex",
              }}
            >
              23+ Open-Source Patterns
            </div>
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#0a0a0a",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "24px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>AI SDK</span>
            <span>Patterns</span>
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#737373",
              lineHeight: 1.5,
              maxWidth: "600px",
              display: "flex",
            }}
          >
            Production-ready code for chat, agents, tool calling, RAG, and workflows.
          </div>
        </div>
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
          <div style={{ display: "flex", gap: "24px", fontSize: "16px", color: "#a3a3a3" }}>
            <span>Next.js</span>
            <span>·</span>
            <span>AI SDK v6</span>
            <span>·</span>
            <span>shadcn/ui</span>
          </div>
          <div style={{ fontSize: "16px", color: "#a3a3a3", display: "flex" }}>
            ai-sdk-patterns.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
