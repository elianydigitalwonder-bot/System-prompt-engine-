import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();

  return NextResponse.json({
    imageUrl: `https://placehold.co/600x600/png?text=Chibi+Preview`,
  });
}
