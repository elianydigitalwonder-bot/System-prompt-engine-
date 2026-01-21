import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 1) Read the incoming user selections
    const body = await req.json();

    // 2) Variables (user choices) with safe defaults
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
      artStyle = "semi-realistic airbrusheccd chibi",

      // Clothing + cultural styling
      clothingStyle = "User-selected",
      modestAttire = "none",
      muslimAttire = "none",
      bollywoodOutfit = "none",
      culturalNotes = "none",

      // Footwear / accessories / actions
      footwear = "User-selected",
      accessories = "User-selected",

      doggyBagGlamour = false,
      dogCarrierStyle = "User-selected",
      dogStyleDetails = "User-selected",

      faithJewelry = "none",
      faithJewelryItems = "User-selected",

      actionPose = "none",
      prop = "none",

      // Output format
      renderFormat = "waist-up",
      transparentBackground = "optional"
    } = body;

    // Optional blocks (only show when selected)
    const doggyBlock = doggyBagGlamour
      ? `
Doggy Bag Glamour 🐶✨ (optional):
- Pet carrier style: ${dogCarrierStyle}
- Dog styling details: ${dogStyleDetails}
`
      : "";

    const culturalBlock =
      modestAttire !== "none" ||
      muslimAttire !== "none" ||
      bollywoodOutfit !== "none" ||
      culturalNotes !== "none"
        ? `
Cultural & modest styling (optional, user-selected):
- Modest attire: ${modestAttire}
- Muslim attire: ${muslimAttire}
- Bollywood outfit: ${bollywoodOutfit}
- Cultural notes: ${culturalNotes}
`
        : "";
// Optional blocks (only show when selected)


const nailsSection = nails?.enabled
  ? `
Nails:
- Length: ${nails.length}
- Shape: ${nails.shape}
- Color: ${nails.color}
- Finish: ${nails.finish}
- Elegant, proportional to chibi hands
`
  : '';
const doggieSection = doggie?.enabled
  ? `
Dog Companion:
- Species: ${doggie.species ?? "dog"}
- Breed: ${doggie.breed ?? "unspecified"}
- Size: ${doggie.size ?? "small"}
- Color: ${doggie.color ?? "natural"}
- Personality: ${doggie.personality ?? "friendly"}
- Accessories: ${doggie.accessories ?? "none"}
- Cute, chibi-styled, proportional to chibi character scale
`
  : "";
  shoes = {
  enabled: true,
  type: "boots",
  style: "chunky",
  color: "black",
  material: "leather",
  details: "silver buckles"
}

const faithBlock =
  faithJewelry !== "none"
    ? `
Faith-based jewelry (optional, only if selected):
...
`
    : "";
    const faithBlock =
      faithJewelry !== "none"
        ? `
Faith-based jewelry (optional, only if selected):
- Faith jewelry: ${faithJewelry}
- Items: ${faithJewelryItems}
`
        : "";

    // 3) Build the master prompt (this is what the user copies to any generator)
    const prompt = `
A high-quality semi-realistic chibi character illustration (cute proportions, NOT an oversized head).

Body proportions:
- Feminine silhouette with defined waist
- Balanced chibi proportions, elegant and stylized
- Full-body or waist-up based on user selection

Character details:
- Age: ${ageGroup}
- Gender presentation: ${genderPresentation}
- Ethnicity: ${ethnicity}
- Skin tone: ${skinTone}
- Hair texture: ${hairType}
- Hair style: ${hairStyle}
- Hair color: ${hairColor}

Facial & beauty details:
- Large expressive eyes with glossy highlights
- Soft blush, freckles optional
- Lip style: ${lipStyle}
- Makeup level: ${makeupLevel}
- Nail style (optional): ${nailStyle}

Fashion era & vibe:
- Fashion era: ${fashionEra} (80s, 90s, 2000s, modern)
- Overall vibe: ${vibe} (luxury, street, glam, soft, editorial)


Clothing & outfit selection:
- Outfit category: ${outfitCategory}
- Clothing style: ${clothingStyle}

Street & casual wear options:
- crop top and jogger set
- hoodie and matching sweatpants
- oversized jacket with fitted pants
- denim co-ord set
- glam lounge set

Swim & resort wear options:
- bikini set
- two-piece bikini
- high-waisted bikini
- bikini with matching sarong
- resort maxi dress
- poolside cover-up

Modest & cultural wear options:
- hijab with coordinated outfit
- abaya-inspired fashion look
- modest long dress with layered styling

South Asian / Bollywood style options:
- lehenga set
- saree-inspired modern drape
- anarkali-style dress
- embellished Bollywood glam outfit

${culturalBlock}
${nailsSection}
${faithBlock}
${doggieSection}

Footwear:
- ${footwear}

### Accessories:
- ${accessories}}

Action & lifestyle pose s (options):
- holding a daiquiri or cocktail
- rollerblading pose
- skiing pose
- yoga balance pose
- surfing with board
- snorkeling gear
- confident lifestyle stance

User-selected controls summary:
- Action/pose: ${actionPose}
- Prop: ${prop}
- Render format: ${renderFormat}
- Transparent background: ${transparentBackground}

Sticker rules (optional):
- If sticker mode is selected: full-body chibi, bold clean outlines, simplified shading, high contrast, clear silhouette, minimal background.

Art direction:
- Style: ${artStyle}
- Soft airbrushed shading, polished finish
- Clean linework, premium lighting
- No text, no watermark, no distortion
`.trim();

    return NextResponse.json({ success: true, prompt });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Failed to generate prompt." },
      { status: 400 }
    );
  }
}
