import { generateObject } from "ai";
import { z } from "zod";
import { getModel } from "@/lib/model";

const recipeSchema = z.object({
  name: z.string().describe("The name of the recipe"),
  ingredients: z.array(
    z.object({
      name: z.string(),
      amount: z.string(),
    })
  ),
  steps: z.array(z.string()).describe("Step-by-step cooking instructions"),
});

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

  const { topic } = await req.json();

  const { object } = await generateObject({
    model: getModel(),
    schema: recipeSchema,
    prompt: `Generate a recipe for: ${topic}`,
  });

  return Response.json(object);
}
