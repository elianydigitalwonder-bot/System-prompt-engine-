import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    // 1. Check API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "OPENAI_API_KEY missing in environment variables" },
        { status: 500 }
      );
    }

    // 2. Read body
    const body = await req.json();
    const prompt = body?.prompt;

    if (!prompt || !prompt.trim()) {
      return NextResponse.json(
        { ok: false, error: "Prompt is required" },
        { status: 400 }
      );
    }

    // 3. Init OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // 4. Generate image
    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    const imageBase64 = result.data[0].b64_json;

    if (!imageBase64) {
      throw new Error("No image returned from OpenAI");
    }

    // 5. Return image
    return NextResponse.json({
      ok: true,
      imageUrl: `data:image/png;base64,${imageBase64}`,
    });
  } catch (err) {
    console.error("IMAGE GENERATION ERROR:", err);

    return NextResponse.json(
      {
        ok: false,
        error: err.message || "Server error",
        hint: "Check OPENAI_API_KEY and redeploy",
      },
      { status: 500 }
    );
  }
}
