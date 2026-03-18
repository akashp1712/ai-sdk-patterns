import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import type { LanguageModel } from "ai";

export function getModel(id?: string): LanguageModel {
  const modelId = id || process.env.DEFAULT_MODEL || "anthropic:claude-sonnet-4-5";
  const [provider, ...rest] = modelId.split(":");
  const model = rest.join(":");

  switch (provider) {
    case "anthropic":
      return anthropic(model) as unknown as LanguageModel;
    case "openai":
      return openai(model) as unknown as LanguageModel;
    case "google":
      return google(model) as unknown as LanguageModel;
    default:
      return anthropic(model) as unknown as LanguageModel;
  }
}
