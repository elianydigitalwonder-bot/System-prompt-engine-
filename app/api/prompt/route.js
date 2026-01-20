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
A high-quality semi-realistic chibi character illustration with balanced proportions (no oversized head).

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
- Soft airbrushed shading, polished finish
- Clean linework, premium lighting
- No text, no watermark, no distortion
`.trim();

  return NextResponse.json({
    success: true,
    prompt
  });
}
