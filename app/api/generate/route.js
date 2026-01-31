import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    // 1. Check API key
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "OPENAI_API_KEY missing in environment variables",
        }),
        { status: 500 }
      );
    }

    // 2. Read prompt
    const body = await req.json();
    const prompt = body?.prompt?.trim();

    if (!prompt) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Prompt is missing",
        }),
        { status: 400 }
      );
    }

    // 3. Generate image
    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    const b64 = result?.data?.[0]?.b64_json;

    if (!b64) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "No image returned from OpenAI",
        }),
        { status: 500 }
      );
    }

    // 4. Return image
    return new Response(
      JSON.stringify({
        ok: true,
        imageUrl: `data:image/png;base64,${b64}`,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: err?.message || "Server error",
        hint: "Check OPENAI_API_KEY and redeploy",
      }),
      { status: 500 }
    );
  }
}
