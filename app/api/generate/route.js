import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    return NextResponse.json({
      ok: true,
      message: "API route is working ✅",
      received: body,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON or request" },
      { status: 400 }
    );
  }
}
