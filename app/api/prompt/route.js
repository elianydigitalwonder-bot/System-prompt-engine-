import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // ----------------------------
    // 1) User selections (defaults)
    // ----------------------------
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

      // Beauty
      makeupLevel = "natural",
      lipStyle = "User-selected",
      nails = { enabled: false },

      // Fashion
      fashionEra = "modern",
      vibe = "stylish",
      outfitCategory = "User-selected",
      clothingStyle = "User-selected",
      artStyle = "semi-realistic airbrushed chibi",

      // Cultural / modest
      modestAttire = "none",
      muslimAttire = "none",
      bollywoodOutfit = "none",
      culturalNotes = "none",

      // Extras
      shoes = { enabled: false },
      accessories = { enabled: false },
      tattoos = { enabled: false },

      // Doggy glam
      doggyBagGlamour = false,
      dogCarrierStyle = "User-selected",
      dogStyleDetails = "User-selected",

      // NEW: Travel & lifestyle
      bags = { enabled: false },
      sunglasses = { enabled: false },
      headphones = { enabled: false },

      // Scene controls
      actionPose = "none",
      prop = "none",
      renderFormat = "waist-up",
      transparentBackground = "optional",
    } = body ?? {};

    const isMale =
      String(genderPresentation).toLowerCase() === "male" ||
      String(genderPresentation).toLowerCase() === "man";

    // ----------------------------
    // 2) SAFE OPTIONAL BLOCKS
    // ----------------------------

    const bodyBlock = isMale
      ? `
Body & physique:
- Athletic, muscular build
- Broad shoulders, defined arms
- Heroic chibi proportions
`
      : `
Body & physique:
- Soft, elegant silhouette
- Balanced feminine proportions
- Graceful chibi anatomy
`;

    const culturalBlock =
      modestAttire !== "none" ||
      muslimAttire !== "none" ||
      bollywoodOutfit !== "none" ||
      culturalNotes !== "none"
        ? `
Cultural & modest styling:
- Modest attire: ${modestAttire}
- Muslim attire: ${muslimAttire}
- Bollywood outfit: ${bollywoodOutfit}
- Cultural notes: ${culturalNotes}
`
        : "";

    const modestCulturalBlock = isMale
      ? `
Male modest & cultural wear options:
- tailored thobe or kandura
- long tunic with trousers
- traditional layered coat
`
      : `
Female modest & cultural wear options:
- hijab with coordinated outfit
- abaya-inspired fashion
- modest long dress
`;

    const bollywoodBlock = `
South Asian / Bollywood style options:
- lehenga set
- saree-inspired modern drape
- anarkali-style dress
- embellished Bollywood glam
`;

    const nailsSection = nails?.enabled
      ? `
Nails:
- Length: ${nails.length ?? "medium"}
- Shape: ${nails.shape ?? "almond"}
- Color: ${nails.color ?? "neutral"}
- Finish: ${nails.finish ?? "glossy"}
`
      : "";

    const shoesSection = shoes?.enabled
      ? `
Footwear:
- Type: ${shoes.type ?? (isMale ? "chunky sneakers" : "sparkly sandals")}
- Style: ${shoes.style ?? "fashion-forward"}
- Color: ${shoes.color ?? "coordinated with outfit"}
`
      : "";

    const accessoriesSection = accessories?.enabled
      ? `
Accessories:
- Type: ${accessories.type ?? "statement pieces"}
- Style: ${accessories.style ?? "editorial"}
- Color: ${accessories.color ?? "bold accents"}
`
      : "";

    const tattooSection = tattoos?.enabled
      ? `
Tattoos:
- Style: ${tattoos.style ?? (isMale ? "bold blackwork" : "fine-line")}
- Placement: ${tattoos.placement ?? "arms or shoulders"}
- Coverage: ${tattoos.coverage ?? "light to medium"}
- Avoid face tattoos
`
      : "";

    const doggySection = doggyBagGlamour
      ? `
Doggy Bag Glamour:
- Carrier style: ${dogCarrierStyle}
- Dog styling: ${dogStyleDetails}
`
      : "";

    // 🎒 BAGS
    const bagsSection = bags?.enabled
      ? `
Bags & luggage:
- Type: ${bags.type ?? "traveller backpack"}
- Options: suitcase, traveller backpack, school backpack, tote/handbag
- Color: ${bags.color ?? "neutral or outfit-matched"}
- Scaled for chibi proportions
`
      : "";

    // 🕶 SUNGLASSES
    const sunglassesSection = sunglasses?.enabled
      ? `
Sunglasses:
- Style: ${
          sunglasses.style ??
          (isMale ? "aviator / square" : "oversized / cat-eye")
        }
- Lens color: ${sunglasses.lensColor ?? "dark or gradient"}
- Frame color: ${sunglasses.frameColor ?? "black or metallic"}
`
      : "";

    // 🎧 HEADPHONES
    const headphonesSection = headphones?.enabled
      ? `
Headphones:
- Type: ${headphones.type ?? "over-ear Beats-style"}
- Color: ${headphones.color ?? "black, white, or red"}
- Alternative: wireless earbuds
`
      : "";

    // ----------------------------
    // 3) MASTER PROMPT
    // ----------------------------
    const prompt = `
A high-quality ${artStyle} chibi character illustration.

Character:
- Age: ${ageGroup}
- Gender presentation: ${genderPresentation}
- Ethnicity: ${ethnicity}
- Skin tone: ${skinTone}

Hair:
- Texture: ${hairType}
- Style: ${hairStyle}
- Color: ${hairColor}

${bodyBlock}

Beauty:
- Makeup: ${makeupLevel}
- Lips: ${lipStyle}

Fashion:
- Era: ${fashionEra}
- Vibe: ${vibe}
- Outfit category: ${outfitCategory}
- Clothing style: ${clothingStyle}

${modestCulturalBlock}
${bollywoodBlock}
${culturalBlock}

Optional fashion add-ons:
${shoesSection}${accessoriesSection}${nailsSection}${tattooSection}

Lifestyle & props:
${bagsSection}${sunglassesSection}${headphonesSection}${doggySection}

Scene:
- Action/pose: ${actionPose}
- Prop: ${prop}
- Render format: ${renderFormat}
- Transparent background: ${transparentBackground}

Art direction:
- Clean linework
- Soft airbrushed shading
- High detail, cute chibi proportions
- No text, no watermark
`.trim();

    return NextResponse.json({ success: true, prompt });
  } catch (error) {
    console.error("Prompt API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate prompt" },
      { status: 500 }
    );
  }
}
