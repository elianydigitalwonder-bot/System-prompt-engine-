import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const image = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    return NextResponse.json({
      image: image.data[0].url,
    });

  } catch (error) {
    console.error("IMAGE ERROR:", error);

    return NextResponse.json(
      {
        error: "Image generation failed",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}
