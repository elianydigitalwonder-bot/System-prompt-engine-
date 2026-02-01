import { NextResponse } from "next/server";

export async function POST(req) {
  let body = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  // Supports BOTH your current UI fields AND your full “advanced” variables.
  const {
    // ---- Current UI fallback keys (from your chips/buttons) ----
    styleMode,
    gender,
    hairColor,
    outfit,
    shoes,
    accessories,
    setting,

    // ---- Full prompt-engine variables (advanced) ----
    ethnicity = "User-selected",
    skinTone = "User-selected",
    ageGroup = "User-selected",
    genderPresentation = gender || "User-selected",

    hairType = "User-selected",
    hairStyle = "User-selected",
    hairColor: hairColorFull = hairColor || "User-selected",

    lipStyle = "User-selected",
    nailStyle = "none", // e.g. "long acrylic nails", "French tips", "rhinestone nails"
    makeupLevel = "soft glam", // "natural" | "soft glam" | "bold glam"

    fashionEra = "modern", // "1980s" | "1990s" | "early 2000s" | "modern"
    vibe = "stylish",
    outfitCategory = outfit || "User-selected",
    artStyle =
      styleMode === "Photoreal"
        ? "photoreal"
        : styleMode === "Illustration"
          ? "illustration"
          : "semi-realistic airbrushed chibi",

    // Clothing + cultural styling (user chooses)
    modestAttire = "none", // free text or enum on UI later
    muslimAttire = "none", // "none" | "hijab" | "abaya" | etc.
    bollywoodOutfit = "none", // "none" | "lehenga" | "saree_modern_drape" | etc.
    culturalNotes = "none",

    // Footwear
    footwear = shoes || "User-selected",

    // Accessories
    accessories: accessoriesFull = accessories || "User-selected",

    // Doggy Bag Glamour
    doggyBagGlamour = false, // true/false
    dogCarrierStyle = "User-selected",
    dogStyleDetails = "User-selected",

    // Faith jewelry (ONLY if user requests)
    faithJewelry = "none", // "none" | "christian" | "catholic"
    faithJewelryItems = "User-selected", // "cross necklace, rosary bracelet..." etc.

    // Actions / props
    actionPose = "none",
    prop = "none",

    // Output
    renderFormat = "waist-up", // "waist-up" | "full-body" | "sticker"
    transparentBackground = "optional", // "yes" | "no" | "optional"
  } = body;

  const prompt = `
A high-quality semi-realistic chibi character illustration (cute proportions, NOT an oversized head).

Body proportions:
- Feminine silhouette with defined waist
- Balanced chibi proportions, elegant and stylized
- Render format: ${renderFormat}
- Transparent background: ${transparentBackground}

Character details:
- Ethnicity: ${ethnicity}
- Skin tone: ${skinTone}
- Age group: ${ageGroup}
- Gender presentation: ${genderPresentation}

Hair:
- Texture: ${hairType}
- Style: ${hairStyle}
- Color: ${hairColorFull}

Facial & beauty:
- Large expressive eyes with glossy highlights
- Makeup level: ${makeupLevel}
- Soft blush, freckles optional
- Lip style: ${lipStyle}
- Nail style (optional): ${nailStyle}

Fashion direction:
- Fashion era: ${fashionEra}
- Overall vibe: ${vibe}
- Outfit category: ${outfitCategory}

Clothing options (user chooses):
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

Modest & cultural wear (user chooses):
- hijab with coordinated outfit
- abaya-inspired fashion look
- modest long dress with layered styling
- modestAttire: ${modestAttire}
- muslimAttire: ${muslimAttire}

South Asian / Bollywood style (user chooses):
- lehenga set
- saree-inspired modern drape
- anarkali-style dress
- embellished Bollywood glam outfit
- bollywoodOutfit: ${bollywoodOutfit}
- culturalNotes: ${culturalNotes}

Footwear:
- ${footwear}

Accessories:
- ${accessoriesFull}

Doggy Bag Glamour (optional):
- Enabled: ${doggyBagGlamour}
- Pet carrier styles: designer-inspired / quilted luxury tote / structured handbag-style / monogram-style / transparent glam carrier
- Carrier style selected: ${dogCarrierStyle}
- Dog styling details: small toy-breed dog, silk bow, rhinestone collar, gold chain collar, patterned bandana, pearl leash
- Dog styling selected: ${dogStyleDetails}
- Glam enhancements: coordinated outfits, matching bag/leash details, subtle sparkle, editorial styling

Faith-based jewelry (optional, respectful — only if user requested):
- Faith type: ${faithJewelry}
- Items: ${faithJewelryItems}

Action & lifestyle:
- Pose: ${actionPose}
- Prop: ${prop}
- Examples: holding a daiquiri/cocktail, rollerblading, skiing, yoga balance, surfing with board, snorkeling gear, confident lifestyle stance

Sticker rules (if renderFormat = "sticker"):
- Full-body chibi rendered for stickers
- Bold clean outlines
- Simplified shading
- Transparent background if requested

Scene / setting (if provided by UI):
- Setting: ${setting || "none"}

Art direction:
- Style: ${artStyle}
- Soft airbrushed shading, polished finish
- Clean linework, premium lighting
- No text, no watermark, no distortion
  `.trim();

  return NextResponse.json({
    success: true,
    prompt,
  });
}
