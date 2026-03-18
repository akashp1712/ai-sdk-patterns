# Reddit Post

## Subreddits
- r/nextjs (primary)
- r/webdev
- r/artificial

## Title
I built an open-source registry of 23+ production-ready AI SDK patterns (streaming chat, agents, RAG, tool calling, workflows)

## Body

Hey everyone,

I've been working with the Vercel AI SDK and kept rewriting the same patterns — streaming chat, tool calling, structured output, agents. So I built a registry of 23+ production-ready patterns that you can browse, copy, or install directly into your Next.js project.

**What it is:**
- 23+ full-stack patterns (API route + React UI for each)
- Categories: Core, Chat, Agents, Tools, Workflows
- Provider-agnostic — works with Claude, GPT-4, Gemini (just swap the env var)
- Every pattern uses AI SDK v6 with the latest APIs

**How to use:**
- Browse code at ai-sdk-patterns.vercel.app
- Install any pattern: `npx shadcn add https://ai-sdk-patterns.vercel.app/r/streaming-chat`
- Or download as ZIP / copy code / copy as prompt for Cursor/Claude

**The Composer (the interesting part):**
Select multiple patterns → generate one integrated Next.js app with shared routing, merged deps, and a provider-agnostic model helper. I haven't seen anyone else do this.

**Some patterns included:**
- Streaming Chat (useChat + streamText)
- Tool Calling (multi-step tool loop)
- Routing Agent (classifies input → delegates to specialist)
- Orchestrator Agent (decomposes tasks → child agents)
- RAG Pipeline (embed → vector search → grounded generation)
- Human-in-the-Loop (pause for approval)
- Parallel Workflow (concurrent AI calls + merge)

100% free, 100% open source. No accounts, no paywalls.

GitHub: github.com/akashp1712/ai-sdk-patterns
Live: ai-sdk-patterns.vercel.app

Would love feedback on which patterns to add next. Thinking about voice (Pipecat/LiveKit) and workflow integrations (Inngest/Trigger.dev).

---

## Tips
- Post on weekdays for better visibility
- r/nextjs is the highest-signal sub for this audience
- Avoid sounding promotional — lead with the problem you solved
- Respond to every comment for algorithm boost
