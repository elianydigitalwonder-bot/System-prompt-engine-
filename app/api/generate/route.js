import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // 1️⃣ Read request body
    const body = await request.json();

    // 2️⃣ VARIABLES (user-selectable options)
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

      // Clothing + cultural styling
      clothingStyle = "User-selected",
      modestAttire = "none",          // christian / catholic modest
      muslimAttire = "none",          // hijab / abaya
      bollywoodOutfit = "none",       // lehenga / saree / anarkali
      culturalNotes = "none",

      // Footwear
      footwear = "User-selected",

      // Accessories
      accessories = "User-selected",
      doggyBagGlamour = false,
      dogCarrierStyle = "User-selected",
      dogStyleDetails = "User-selected",

      // Faith jewelry (ONLY if user chooses)
      faithJewelry = "none",          // none | christian | catholic
      faithJewelryItems = "none",

      // Action / props
      actionPose = "none",
      prop = "none",

      // Output
      renderFormat = "waist-up",
      transparentBackground = "optional"
    } = body;

    // 3️⃣ PROMPT (this is what the AI sees)
    const prompt = `
A high-quality semi-realistic chibi character illustration
(cute proportions, NOT an oversized head).

Body proportions:
- Feminine silhouette with defined waist
- Balanced chibi proportions, elegant and stylized
- Render format: ${renderFormat}

Character details:
- Ethnicity: ${ethnicity}
- Skin tone: ${skinTone}
- Hair texture: ${hairType}
- Hair style: ${hairStyle}
- Hair color: ${hairColor}

Facial & beauty details:
- Large expressive eyes with glossy highlights
- Soft blush, freckles optional
- Lip style: ${lipStyle}
- Nail style: ${nailStyle}
- Makeup level: ${makeupLevel}

Fashion era & vibe:
- Fashion era: ${fashionEra}
- Overall vibe: ${vibe}

Clothing & cultural styling:
- Outfit category: ${outfitCategory}
- Clothing style: ${clothingStyle}
- Modest attire (Christian/Catholic): ${modestAttire}
- Muslim attire: ${muslimAttire}
- South Asian / Bollywood outfit: ${bollywoodOutfit}
- Cultural notes: ${culturalNotes}

Footwear:
- ${footwear}

Accessories:
- ${accessories}

Doggy Bag Glamour (optional):
- Enabled: ${doggyBagGlamour}
- Pet carrier style: ${dogCarrierStyle}
- Dog styling details: ${dogStyleDetails}

Faith-based jewelry (ONLY if selected):
- Faith type: ${faithJewelry}
- Jewelry items: ${faithJewelryItems}

Action & lifestyle:
- Pose: ${actionPose}
- Prop: ${prop}

Sticker & output rules:
- Transparent background: ${transparentBackground}

Art direction:
- Style: ${artStyle}
- Soft airbrushed shading
- Clean linework
- Premium lighting
- No text, no watermark, no distortion
    `.trim();

    // 4️⃣ Return prompt
    return NextResponse.json({
      success: true,
      prompt
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
