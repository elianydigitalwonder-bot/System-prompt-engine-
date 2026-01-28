import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { ok: false, error: "Missing prompt" },
        { status: 400 }
      );
    }

    const r = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-image-1.5",
        prompt,
        n: 1,
        size: "1024x1024",
      }),
    });

    const data = await r.json();

    if (!r.ok) {
      return NextResponse.json(
        { ok: false, error: data?.error?.message || "OpenAI error" },
        { status: 500 }
      );
    }

    const b64 = data?.data?.[0]?.b64_json;
    if (!b64) {
      return NextResponse.json(
        { ok: false, error: "No image returned" },
        { status: 500 }
      );
    }

    // Send back a data URL that <img src="..."> can display immediately
    const imageUrl = `data:image/png;base64,${b64}`;
    return NextResponse.json({ ok: true, imageUrl });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
