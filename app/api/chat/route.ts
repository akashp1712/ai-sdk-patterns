import { streamText } from "ai";
import { getModel } from "@/lib/model";

export async function POST(req: Request) {
  // Guard: require API key to be configured server-side
  if (
    !process.env.ANTHROPIC_API_KEY &&
    !process.env.OPENAI_API_KEY &&
    !process.env.GOOGLE_GENERATIVE_AI_API_KEY
  ) {
    return Response.json(
      {
        error:
          "No AI provider API key configured. Download this pattern and add your key to .env.local to run it locally.",
      },
      { status: 503 }
    );
  }

  const { messages } = await req.json();

  const result = streamText({
    model: getModel(),
    messages,
  });

  return result.toTextStreamResponse();
}
