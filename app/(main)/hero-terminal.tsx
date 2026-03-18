"use client";

import {
  Terminal,
  TypingAnimation,
  AnimatedSpan,
} from "@/components/ui/terminal";

export function HeroTerminal() {
  return (
    <Terminal className="max-w-lg w-full h-[340px] shadow-2xl shadow-black/10 dark:shadow-black/40">
      <TypingAnimation delay={200} duration={30}>
        {`import { streamText } from "ai";`}
      </TypingAnimation>
      <TypingAnimation delay={100} duration={30}>
        {`import { anthropic } from "@ai-sdk/anthropic";`}
      </TypingAnimation>

      <AnimatedSpan delay={2000} className="text-muted-foreground">
        {" "}
      </AnimatedSpan>

      <TypingAnimation delay={200} duration={30}>
        {`const result = streamText({`}
      </TypingAnimation>
      <TypingAnimation delay={100} duration={30}>
        {`  model: anthropic("claude-sonnet-4-5"),`}
      </TypingAnimation>
      <TypingAnimation delay={100} duration={30}>
        {`  system: "You are a helpful assistant.",`}
      </TypingAnimation>
      <TypingAnimation delay={100} duration={30}>
        {`  messages,`}
      </TypingAnimation>
      <TypingAnimation delay={100} duration={30}>
        {`});`}
      </TypingAnimation>

      <AnimatedSpan delay={4500} className="text-muted-foreground">
        {" "}
      </AnimatedSpan>

      <AnimatedSpan delay={5000} className="text-emerald-500">
        ✓ Streaming response ready
      </AnimatedSpan>
      <AnimatedSpan delay={5500} className="text-muted-foreground">
        Provider: anthropic | Model: claude-sonnet-4-5
      </AnimatedSpan>
    </Terminal>
  );
}
