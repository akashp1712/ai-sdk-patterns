import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Block AI-powered API routes in production to avoid costly serverless invocations.
// The app works as a fully static site — patterns are browsed, copied, and downloaded client-side.
// Set ENABLE_AI_ROUTES=true in Vercel env vars when you're ready to enable live previews.
const AI_ROUTES_ENABLED = process.env.ENABLE_AI_ROUTES === "true";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Block /api/chat and /api/generate unless explicitly enabled
  if (
    !AI_ROUTES_ENABLED &&
    (pathname.startsWith("/api/chat") || pathname.startsWith("/api/generate"))
  ) {
    return NextResponse.json(
      {
        error:
          "AI routes are disabled on this deployment. Download the pattern and run it locally with your own API key.",
      },
      { status: 503 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/chat", "/api/generate"],
};
