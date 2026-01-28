import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const prompt = body?.prompt?.trim();

    if (!prompt) {
      return Response.json(
        { ok: false, error: "Missing prompt" },
        { status: 400 }
      );
    }

    // Generate image (base64)
    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    const b64 = result?.data?.[0]?.b64_json;

    if (!b64) {
      return Response.json(
        { ok: false, error: "No image returned from OpenAI" },
        { status: 500 }
      );
    }

    // Return a data URL so the browser can show it instantly
    const imageUrl = `data:image/png;base64,${b64}`;

    return Response.json({ ok: true, imageUrl });
  } catch (err) {
    return Response.json(
      { ok: false, error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
