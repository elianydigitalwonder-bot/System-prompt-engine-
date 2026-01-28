import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const prompt = body?.prompt || "";

    // TEMP: placeholder image so your UI preview works now.
    // Later we’ll replace this with real image generation.
    const imageUrl =
      "https://placehold.co/768x768/png?text=Preview+Image";

    return NextResponse.json({
      ok: true,
      imageUrl,
      promptPreview: prompt,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "Bad request" },
      { status: 400 }
    );
  }
}
