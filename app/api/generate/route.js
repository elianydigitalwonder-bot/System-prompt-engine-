// app/api/prompt/route.js
import { NextResponse } from "next/server";

/**
 * Builds ONE clean “master prompt” from UI selections.
 * UI should send a JSON body with any of these fields (all optional).
 */
function buildPrompt(body = {}) {
  const {
    // Identity
    ethnicity = "User-selected",
    skinTone = "User-selected",
    ageGroup = "young adult",
    genderPresentation = "woman",

    // Hair
    hairType = "User-selected",
    hairStyle = "User-selected",
    hairColor = "User-selected",

    // Face / beauty
    lipStyle = "User-selected",
    nailStyle = "none", // e.g. "long acrylic nails", "French tips", "rhinestone nails"
    makeupLevel = "natural", // "natural" | "soft glam" | "bold glam"
    freckles = "optional", // "none" | "optional" | "yes"

    // Fashion
    fashionEra = "modern", // "1980s" | "1990s" | "early 2000s" | "modern"
    vibe = "stylish", // "luxury" | "street" | "glam" | "soft" | "editorial"
    outfitCategory = "User-selected", // e.g. "Street & casual wear" | "Swim & resort wear" | "Modest & cultural wear" | "South Asian / Bollywood style"
    clothingStyle = "User-selected", // free text add-on

    // Cultural & modest options (user chooses)
    modestAttire = "none", // "none" | "muslim_modest" | "christian_modest" | "catholic_modest"
    muslimAttire = "none", // "none" | "hijab" | "abaya" | "modest_long_dress_with_hijab"
    bollywoodOutfit = "none", // "none" | "lehenga" | "saree_modern_drape" | "anarkali" | "embellished_set"
    culturalNotes = "none", // optional free text, e.g. "festival look", "wedding guest"

    // Footwear
    footwear = "User-selected",

    // Accessories
    accessories = "User-selected",
    doggyBagGlamour = false, // true/false
    dogCarrierStyle = "User-selected",
    dogStyleDetails = "User-selected",

    // Faith jewelry (OPTIONAL, only if user chooses)
    faithJewelry = "none", // "none" | "christian" | "catholic"
    faithJewelryItems = "User-selected", // e.g. "cross necklace, rosary bracelet, medallion"

    // Actions / props
    actionPose = "none", // e.g. "rollerblading pose"
    prop = "none", // e.g. "holding a daiquiri cocktail"

    // Output format
    renderFormat = "waist-up", // "waist-up" | "full-body" | "sticker"
    transparentBackground = "optional", // "no" | "yes" | "optional"

    // Art direction
    artStyle = "semi-realistic airbrushed chibi"
  } = body;

  const dogSection = doggyBagGlamour
    ? `
Doggy Bag Glamour 🐶✨ (ENABLED)
- Add a small stylish toy-breed dog being carried in a glam pet bag.
- Pet carrier style: ${dogCarrierStyle}
- Dog styling details: ${dogStyleDetails}
- Extra glam: coordinated owner+dog colors, matching bag+leash details, subtle sparkle accents, editorial fashion styling.
`
    : `
Doggy Bag Glamour 🐶✨ (optional)
- If user enables it: add a small stylish toy-breed dog in a glam pet bag (designer-inspired / quilted tote / structured handbag-style / monogram-style / transparent glam carrier).
- Dog details may include: silk bow, rhinestone collar, gold chain collar, patterned bandana, pearl leash.
`;

  const faithSection =
    faithJewelry === "christian" || faithJewelry === "catholic"
      ? `
Religious jewelry (USER-SELECTED, be respectful)
- Faith: ${faithJewelry}
- Items: ${faithJewelryItems}
- Include only if requested; never stereotype; keep it tasteful and respectful.
`
      : `
Religious jewelry (optional)
- Only include faith-based symbols if the user explicitly requests them.
`;

  const modestSection = `
Modesty & cultural attire (USER-CHOSEN)
- modestAttire: ${modestAttire}
- muslimAttire: ${muslimAttire}
- bollywoodOutfit: ${bollywoodOutfit}
- culturalNotes: ${culturalNotes}
Rules:
- Never assume religion/culture from ethnicity/skin tone.
- Only apply hijab/abaya/Bollywood looks if user selected them.
`;

  // “Sticker rules” only when needed
  const stickerRules =
    renderFormat === "sticker"
      ? `
Sticker rules (REQUIRED)
- Full-body chibi rendered for stickers
- Bold clean outlines, simplified shading, high readability
- Transparent background: ${transparentBackground}
`
      : `
Render format
- ${renderFormat}
- Transparent background: ${transparentBackground}
`;

  const prompt = `
You are generating a HIGH-QUALITY semi-realistic chibi character illustration.
Key constraint: cute chibi proportions WITHOUT an oversized head (avoid “giant head” look).

Character basics
- Age group: ${ageGroup}
- Gender presentation: ${genderPresentation}
- Ethnicity (user-selected): ${ethnicity}
- Skin tone: ${skinTone}

Body proportions
- Feminine silhouette with defined waist (if applicable)
- Balanced chibi proportions: elegant, stylized, cute (not bobblehead)
- Render framing: ${renderFormat} (waist-up or full-body; sticker requires full-body)

Hair
- Texture: ${hairType}
- Style: ${hairStyle}
- Color: ${hairColor}

Face & beauty
- Large expressive eyes with glossy highlights
- Makeup level: ${makeupLevel}
- Soft blush
- Freckles: ${freckles}
- Lip style: ${lipStyle}
- Nails: ${nailStyle} (only if not "none")

Fashion direction
- Era: ${fashionEra}
- Vibe: ${vibe}
- Outfit category: ${outfitCategory}
- Clothing style notes: ${clothingStyle}

Outfit menu (choose from the selected category; keep it stylish, premium, cohesive)
Street & casual wear:
- crop top and jogger set
- hoodie and matching sweatpants
- oversized jacket with fitted pants
- denim co-ord set
- glam lounge set

Swim & resort wear:
- bikini set
- two-piece bikini
- high-waisted bikini
- bikini with matching sarong
- resort maxi dress
- poolside cover-up

Modest & cultural wear:
- hijab with coordinated outfit
- abaya-inspired fashion look
- modest long dress with layered styling

South Asian / Bollywood style:
- lehenga set
- saree-inspired modern drape
- anarkali-style dress
- embellished Bollywood glam outfit

Footwear (user selection)
- Footwear: ${footwear}
(Examples: flat sandals, strappy sandals, platform sandals, sneakers, chunky sneakers, neon shoes, sparkling shoes, sparkling boots)

Accessories (user selection)
- Accessories: ${accessories}
(Examples: designer handbag/clutch, sunglasses, hair accessories, luxury jewelry)

${dogSection}

${faithSection}

${modestSection}

Action / pose & props (user selection)
- Action/pose: ${actionPose}
- Prop: ${prop}
Examples (only if selected): holding a daiquiri/cocktail, rollerblading, skiing, yoga balance, surfing with board, snorkeling gear, confident lifestyle stance.

${stickerRules}

Art direction (strict)
- Style: ${artStyle}
- Soft airbrushed shading, polished finish
- Clean linework, premium lighting
- No text, no watermark, no distortion
- Output should look premium, printable, and consistent with selected vibe.
`.trim();

  return prompt;
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const prompt = buildPrompt(body);

    return NextResponse.json({
      success: true,
      prompt
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}
