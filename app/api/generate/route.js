import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  const {
    // Identity
    ethnicity = "User-selected",
    skinTone = "User-selected",
    ageGroup = "adult",
    genderPresentation = "woman",

    // Hair
    hairType = "User-selected",
    hairStyle = "User-selected",
    hairColor = "User-selected",

    // Beauty
    lipStyle = "User-selected",
    nailStyle = "none",
    makeupLevel = "natural",

    // Fashion
    fashionEra = "modern",
    vibe = "stylish",
    outfitCategory = "User-selected",
    artStyle = "semi-realistic airbrushed chibi",

    // Cultural & religious attire
    muslimAttire = "none",        // hijab | abaya | none
    christianAttire = "none",     // modest_dress | none
    catholicAttire = "none",      // modest_dress | none
    bollywoodOutfit = "none",     // lehenga | saree | anarkali | none

    // Footwear
    footwear = "User-selected",

    // Accessories
    accessories = "User-selected",

    // Doggy bag glamour
    doggyBagGlamour = false,
    dogCarrierStyle = "User-selected",
    dogStyleDetails = "User-selected",

    // Faith jewelry
    faithJewelry = "none",        // christian | catholic | none
    faithJewelryItems = "none",

    // Action / props
    actionPose = "none",
    prop = "none",

    // Render
    renderFormat = "waist-up",    // waist-up | full-body | sticker
    transparentBackground = false
  } = body;

  const prompt = `
A high-quality semi-realistic chibi character illustration
(cute, balanced proportions — NOT an oversized head).

Body & pose:
- Feminine silhouette with a defined waist
- ${renderFormat} composition
- Confident, elegant posture

Character details:
- Ethnicity: ${ethnicity}
- Skin tone: ${skinTone}
- Age group: ${ageGroup}
- Gender presentation: ${genderPresentation}

Hair & beauty:
- Hair texture: ${hairType}
- Hair style: ${hairStyle}
- Hair color: ${hairColor}
- Makeup level: ${makeupLevel}
- Lip style: ${lipStyle}
- Nail style: ${nailStyle}

Fashion & vibe:
- Fashion era: ${fashionEra}
- Overall vibe: ${vibe}
- Outfit category: ${outfitCategory}

Cultural & religious attire (only if selected):
- Muslim attire: ${muslimAttire}
- Christian attire: ${christianAttire}
- Catholic attire: ${catholicAttire}
- Bollywood style: ${bollywoodOutfit}

Footwear:
- ${footwear}

Accessories:
- ${accessories}

Faith jewelry (only if requested):
- ${faithJewelry}
- Items: ${faithJewelryItems}

Doggy bag glamour:
- Enabled: ${doggyBagGlamour}
- Carrier style: ${dogCarrierStyle}
- Dog styling: ${dogStyleDetails}

Action & props:
- Pose: ${actionPose}
- Prop: ${prop}

Art direction:
- Style: ${artStyle}
- Soft airbrushed shading
- Clean premium linework
- Editorial lighting
- No text, no watermark, no distortion
- Transparent background: ${transparentBackground}
`.trim();

  return NextResponse.json({
    success: true,
    prompt
  });
}
