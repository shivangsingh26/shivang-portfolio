import { streamText, convertToModelMessages, type UIMessage, type LanguageModel } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { buildResumeContext } from "@/lib/resume-context";
import { logChatQuestion } from "@/lib/chat-log";

export const runtime = "nodejs";
export const maxDuration = 30;

function pickModel(): LanguageModel | null {
  // Priority: Vercel AI Gateway → Anthropic → OpenAI
  if (process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN) {
    return (process.env.AI_MODEL || "anthropic/claude-sonnet-4-6") as unknown as LanguageModel;
  }
  if (process.env.ANTHROPIC_API_KEY) {
    const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    return anthropic(process.env.AI_MODEL || "claude-sonnet-4-6");
  }
  if (process.env.OPENAI_API_KEY) {
    const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
    return openai(process.env.AI_MODEL || "gpt-4o-mini");
  }
  return null;
}

export async function POST(req: Request) {
  const model = pickModel();

  if (!model) {
    return new Response(
      JSON.stringify({
        error:
          "Chat not configured. Set AI_GATEWAY_API_KEY (recommended) or ANTHROPIC_API_KEY or OPENAI_API_KEY in .env.local.",
      }),
      { status: 503, headers: { "content-type": "application/json" } }
    );
  }

  const { messages }: { messages: UIMessage[] } = await req.json();
  const modelMessages = await convertToModelMessages(messages);

  // Log the latest user question for observability + analytics
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (lastUser) {
    const text = lastUser.parts
      .map((p) => (p.type === "text" ? p.text : ""))
      .join("")
      .trim();
    if (text) {
      const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        req.headers.get("x-real-ip") ||
        undefined;
      void logChatQuestion({
        ts: new Date().toISOString(),
        question: text.slice(0, 800),
        ip,
        userAgent: req.headers.get("user-agent") ?? undefined,
      });
    }
  }

  const result = streamText({
    model,
    system: buildResumeContext(),
    messages: modelMessages,
    temperature: 0.5,
  });

  return result.toUIMessageStreamResponse();
}
