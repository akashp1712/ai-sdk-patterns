import { HarnessClient } from "./harness-client";

export const metadata = {
  title: "Harness — Build Agents Step by Step",
  description:
    "A progressive tutorial for building production AI agents with Mastra. Start with a basic agent, then layer on tools, memory, workflows, guardrails, and multi-agent coordination.",
  openGraph: {
    title: "Harness — Build Agents Step by Step",
    description:
      "Progressive tutorial: basic agent → tools → memory → workflows → guardrails → multi-agent. Copy-paste ready.",
  },
};

export default function HarnessPage() {
  return <HarnessClient />;
}
