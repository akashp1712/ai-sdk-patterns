import type { MetadataRoute } from "next";
import { patterns } from "@/lib/patterns";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ai-sdk-patterns.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const patternPages = patterns.map((p) => ({
    url: `${BASE_URL}/patterns/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/patterns`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/compose`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...patternPages,
  ];
}
