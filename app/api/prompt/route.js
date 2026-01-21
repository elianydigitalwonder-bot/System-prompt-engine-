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
const prompt = `
A high-quality semi-realistic chibi character illustration with balanced proportions (no oversized head).

Body proportions:
- Feminine silhouette with a defined waist
- Curvy upper body, elegant and stylized
- Proportions appropriate for chibi style (cute, tasteful, non-exaggerated)
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
  nailStyle = "none",            // e.g. "long acrylic nails", "French tips", "rhinestone nails"
  makeupLevel = "natural",        // "natural" | "soft glam" | "bold glam"

  // Fashion
  fashionEra = "modern",          // "1980s" | "1990s" | "early 2000s" | "modern"
  vibe = "stylish",
  outfitCategory = "User-selected",
  artStyle = "semi-realistic airbrushed chibi",

  // Clothing + cultural styling
  clothingStyle = "User-selected",           // general description
  modestAttire = "none",                     // "none" | "muslim_modest" | "christian_modest" | "catholic_modest"
  muslimAttire = "none",                     // "none" | "hijab" | "abaya" | "modest_long_dress_with_hijab"
  bollywoodOutfit = "none",                  // "none" | "lehenga" | "saree_modern_drape" | "anarkali" | "embellished_set"
  culturalNotes = "none",                    // optional free text: "festival look", "wedding guest", etc.

  // Footwear
  footwear = "User-selected",

  // Accessories
  accessories = "User-selected",
  doggyBagGlamour = false,                   // true/false
  dogCarrierStyle = "User-selected",
  dogStyleDetails = "User-selected",

  // Faith jewelry / symbols (OPTIONAL, only if user chooses)
  faithJewelry = "none",                     // "none" | "christian" | "catholic"
  faithJewelryItems = "User-selected",       // e.g. "cross necklace, rosary bracelet, medallion"

  // Actions / props
  actionPose = "none",
  prop = "none",

  // Output format
  renderFormat = "waist-up",                 // "waist-up" | "full-body" | "sticker"
  transparentBackground = "optional"
} = body;
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
  lipStyle = "glossy lips",
  nailStyle = "User-selected (optional)",
  makeupLevel = "User-selected (optional)",

  // Fashion
  fashionEra = "modern",
  vibe = "stylish",
  outfitCategory = "User-selected",
  artStyle = "semi-realistic airbrushed chibi",

  // Footwear
  footwear = "User-selected",

  // Accessories
  accessories = "User-selected",
  doggyBagGlamour = "off", // "off" | "on"
  dogCarrierStyle = "User-selected (optional)",
  dogStyleDetails = "User-selected (optional)",

  // Faith jewelry
  faithJewelry = "none", // "none" | "christian_catholic"

  // Actions / poses
  actionPose = "User-selected (optional)",
  prop = "User-selected (optional)",

  // Output format
  renderFormat = "waist-up", // "waist-up" | "full-body" | "sticker"
  transparentBackground = "optional"
} = body;
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
const prompt = `
A high-quality semi-realistic chibi character illustration with balanced proportions (no oversized head).

Body proportions:
- Feminine silhouette with a defined waist
- Curvy upper body, elegant and stylized
- Proportions appropriate for chibi style (cute, tasteful, non-exaggerated)

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
