import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      // Identity
      ethnicity = "User-selected",
      skinTone = "User-selected",
      ageGroup = "30-year-old",
      genderPresentation = "woman",

      // Hair
      hairType = "User-selected",
      hairStyle = "User-selected",
      hairColor = "User-selected",

      // Face / beauty
      lipStyle = "User-selected",
      nailStyle = "none",
      makeupLevel = "natural",

      // Fashion
      fashionEra = "modern",
      vibe = "stylish",
      outfitCategory = "User-selected",
      artStyle = "semi-realistic airbrushed chibi",

      // Clothing & cultural styling
      clothingStyle = "User-selected",
      modestAttire = "none",
      muslimAttire = "none",
      bollywoodOutfit = "none",
      culturalNotes = "none",

      // Footwear
      footwear = "User-selected",

      // Accessories
      accessories = "User-selected",

      // Doggy bag glamour
      doggyBagGlamour = false,
      dogCarrierStyle = "User-selected",
      dogStyleDetails = "User-selected",

      // Faith jewelry
      faithJewelry = "none",
      faithJewelryItems = "none",

      // Action / props
      actionPose = "none",
      prop = "none",

      // Output
      renderFormat = "waist-up",
      transparentBackground = false,
    } = body;

    const prompt = `
A high-quality semi-realistic chibi character illustration
(cute proportions, NOT an oversized head).

Body proportions:
- Feminine silhouette with defined waist
- Balanced chibi proportions, elegant and stylized
- Render format: ${renderFormat}

Character details:
- Age group: ${ageGroup}
- Gender presentation: ${genderPresentation}
- Ethnicity: ${ethnicity}
- Skin tone: ${skinTone}
- Hair texture: ${hairType}
- Hair style: ${hairStyle}
- Hair color: ${hairColor}

Facial & beauty details:
- Large expressive eyes with glossy highlights
- Makeup level: ${makeupLevel}
- Lip style: ${lipStyle}
- Nail style: ${nailStyle}

Fashion era & vibe:
- Fashion era: ${fashionEra}
- Overall vibe: ${vibe}

Clothing & outfit:
- Outfit category: ${outfitCategory}
- Clothing style notes: ${clothingStyle}

Modest & cultural attire:
- Modest attire: ${modestAttire}
- Muslim attire: ${muslimAttire}
- Bollywood outfit: ${bollywoodOutfit}
- Cultural notes: ${culturalNotes}

Footwear:
- ${footwear}

Accessories:
- ${accessories}

Doggy Bag Glamour:
- Enabled: ${doggyBagGlamour}
- Dog carrier style: ${dogCarrierStyle}
- Dog styling details: ${dogStyleDetails}

Faith-based jewelry (ONLY if selected):
- Faith type: ${faithJewelry}
- Jewelry items: ${faithJewelryItems}

Action & lifestyle:
- Pose/action: ${actionPose}
- Prop: ${prop}

Sticker & render rules:
- Clean bold outlines if sticker format
- Simplified shading
- Transparent background: ${transparentBackground}

Art direction:
- Style: ${artStyle}
- Soft airbrushed shading
- Clean linework
- Premium lighting
- No text
- No watermark
- No distortion
`.trim();

    return NextResponse.json({
      success: true,
      prompt,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
