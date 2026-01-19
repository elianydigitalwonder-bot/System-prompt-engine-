import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  const {
    ethnicity,
    skinTone,
    hairStyle,
    hairColor,
    fashionEra,
    artStyle,
    vibe
  } = body;

  const prompt = `
Create a high-quality stylized character illustration.

Character details:
- Ethnicity: ${ethnicity}
- Skin tone: ${skinTone}
- Hair style: ${hairStyle}
- Hair color: ${hairColor}

Fashion:
- Era: ${fashionEra}
- Overall vibe: ${vibe}

Art direction:
- Style: ${artStyle}
- Semi-realistic, polished, high-detail
- Clean linework, soft lighting, premium finish
- No text, no watermark, no distortion
`.trim();

  return NextResponse.json({
    success: true,
    prompt
  });
}
