import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ai-sdk-patterns.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "AI SDK Patterns — Compose AI Apps from Open-Source Patterns",
    template: "%s | AI SDK Patterns",
  },
  description:
    "30+ open-source AI SDK patterns you can mix, match, and compose into full-stack Next.js apps. Chat, agents, tool calling, RAG, workflows — install individually or combine with the Composer. Free, provider-agnostic, no paywalls.",
  keywords: [
    "AI SDK",
    "Vercel AI SDK",
    "AI patterns",
    "AI SDK examples",
    "streaming chat",
    "tool calling",
    "structured output",
    "generative UI",
    "multi-agent",
    "AI agent patterns",
    "RAG pipeline",
    "Next.js AI",
    "Next.js AI app",
    "AI SDK v6",
    "Claude AI SDK",
    "OpenAI SDK",
    "shadcn registry",
    "AI code examples",
    "LLM patterns",
    "AI workflow",
  ],
  openGraph: {
    title: "AI SDK Patterns — Compose AI Apps from Open-Source Patterns",
    description:
      "30+ open-source AI SDK patterns. Install one or compose many into a full Next.js app. Chat, agents, tools, workflows — free and provider-agnostic.",
    url: BASE_URL,
    siteName: "AI SDK Patterns",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI SDK Patterns — Compose AI Apps from Open-Source Patterns",
    description:
      "30+ composable AI SDK patterns. Install one or combine many into a full Next.js app. Free and provider-agnostic.",
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
