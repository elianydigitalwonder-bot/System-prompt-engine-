import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt || !prompt.trim()) {
      return NextResponse.json(
        { ok: false, error: "Prompt is required" },
        { status: 400 }
      );
    }

    const image = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    return NextResponse.json({
      ok: true,
      image: image.data[0].b64_json,
    });

  } catch (err) {
    console.error("IMAGE ERROR:", err);

    return NextResponse.json(
      {
        ok: false,
        error: err.message || "Image generation failed",
      },
      { status: 500 }
    );
  }
}
