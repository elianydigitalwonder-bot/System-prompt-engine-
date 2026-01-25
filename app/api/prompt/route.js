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

      // Face / beauty
      lipStyle = "User-selected",
      nails = { enabled: false },
      makeupLevel = "natural",

      // Fashion
      fashionEra = "modern",
      vibe = "stylish",
      outfitCategory = "User-selected",
      artStyle = "semi-realistic airbrushed chibi",

      // Clothing + cultural styling
      clothingStyle = "User-selected",
      modestAttire = "none",
      muslimAttire = "none",
      bollywoodOutfit = "none",
      culturalNotes = "none",

      // Footwear / accessories
      shoes = { enabled: false },
      accessories = { enabled: false },

      // Doggy glam (optional)
      doggyBagGlamour = false,
      dogCarrierStyle = "User-selected",
      dogStyleDetails = "User-selected",

      // Tattoos (optional)
      tattoos = { enabled: false },

      // Actions / props
      actionPose = "none",
      prop = "none",

      // Output format
      renderFormat = "waist-up",
      transparentBackground = "optional",

      // NEW: Bags / travel
      bags = { enabled: false },

      // NEW: Sunglasses
      sunglasses = { enabled: false },

      // NEW: Headphones
      headphones = { enabled: false },
    } = body ?? {};

    const isMale =
      String(genderPresentation).toLowerCase() === "male" ||
      String(genderPresentation).toLowerCase() === "man";

    // ----------------------------
    // 2) Optional sections (SAFE)
    // ----------------------------

    const doggySection = doggyBagGlamour
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

    const modestCulturalBlock = isMale
      ? `
Male modest & cultural wear options (if relevant):
- tailored thobe or kandura
- fitted long tunic with structured trousers
- traditional-inspired outfit with masculine tailoring
- modest layered look with long coat
- clean, elegant cultural formalwear
`
      : `
Female modest & cultural wear options (if relevant):
- hijab with coordinated outfit
- abaya-inspired fashion look
- modest long dress with layered styling
`;

    const bollywoodBlock = `
South Asian / Bollywood style options (if relevant):
- lehenga set
- saree-inspired modern drape
- anarkali-style dress
- embellished Bollywood glam outfit
`;

    const nailsSection = nails?.enabled
      ? `
Nails:
- Length: ${nails.length ?? "medium"}
- Shape: ${nails.shape ?? "almond"}
- Color: ${nails.color ?? "neutral"}
- Finish: ${nails.finish ?? "glossy"}
- Elegant, proportional to chibi hands
`
      : "";

    const shoesSection = shoes?.enabled
      ? `
Footwear:
- Type: ${shoes.type ?? (isMale ? "chunky sneakers" : "sparkly sandals")}
- Style: ${shoes.style ?? (isMale ? "street-lux" : "glam")}
- Color: ${shoes.color ?? "neon + metallic mix"}
- Material: ${shoes.material ?? "mixed materials (leather + mesh + accents)"}
- Details: ${shoes.details ?? "bold statement details: sparkles, glossy panels, hardware"}
- Proportional to chibi feet, clean silhouette, high-fashion vibe
`
      : "";

    const accessoriesSection = accessories?.enabled
      ? `
Accessories:
- Type: ${accessories.type ?? "statement pieces"}
- Style: ${accessories.style ?? "super funky"}
- Color: ${accessories.color ?? "vibrant"}
- Material: ${accessories.material ?? "mixed materials"}
- Details: ${accessories.details ?? "bold shapes, sparkles, playful accents"}
- Exaggerated, fashion-forward accessories scaled for chibi proportions
`
      : "";

    const tattooDefaults = {
      style: isMale
        ? "bold blackwork, geometric, realism accents"
        : "fine-line, delicate floral, minimalist symbols",
      motif: isMale
        ? "geometric shapes, lions, dragons, abstract lines, tribal-inspired"
        : "butterflies, roses, stars, hearts, tiny symbols, elegant script",
      placement: isMale
        ? "forearm, upper arm, shoulder, chest (optional), back"
        : "wrist, forearm, shoulder, collarbone, upper back",
      coverage: isMale ? "medium (1–3 areas)" : "light (1–2 small areas)",
      color: isMale ? "black with grey shading" : "black with subtle color accents",
    };

    const tattooSection = tattoos?.enabled
      ? `
Tattoos:
- Style: ${tattoos.style ?? tattooDefaults.style}
- Motif / theme: ${tattoos.motif ?? tattooDefaults.motif}
- Placement: ${tattoos.placement ?? tattooDefaults.placement}
- Coverage: ${tattoos.coverage ?? tattooDefaults.coverage}
- Color: ${tattoos.color ?? tattooDefaults.color}
- Detail level: ${tattoos.detail ?? "clean linework, sharp edges, readable at chibi scale"}
- Rules:
  - avoid face tattoos
  - keep tattoos stylish and editorial (no clutter)
  - scale perfectly to chibi proportions
`
      : "";

    const bodyBlock = isMale
      ? `
Body & physique:
- Athletic, muscular build with broad shoulders
- Defined chest, arms, and legs
- Strong, confident posture
- Stylized chibi proportions with heroic physique
`
      : `
Body & physique:
- Soft, curvy silhouette with elegant proportions
- Balanced chibi anatomy and smooth contouring
- Graceful posture and confident presence
`;

    // NEW: Bags / luggage
    const bagsSection = bags?.enabled
      ? `
Bags & luggage:
- Type: ${bags.type ?? "traveller backpack"}
- Style: ${bags.style ?? "modern, functional, fashion-forward"}
- Material: ${bags.material ?? "nylon, canvas, or leather"}
- Color: ${bags.color ?? "coordinated with outfit (neutral or bold accent)"}
- Options to include (choose 1–2 max unless user requests more):
  - suitcase (hard-shell, travel-ready)
  - traveller backpack (carry-on friendly)
  - school backpack (casual, youthful)
  - tote or handbag (optional)
- Scaled appropriately for chibi proportions
`
      : "";

    // NEW: Sunglasses
    const sunglassesSection = sunglasses?.enabled
      ? `
Sunglasses:
- Style: ${
          sunglasses.style ??
          (isMale ? "aviator or square frames" : "oversized or cat-eye")
        }
- Lens color: ${sunglasses.lensColor ?? "dark or gradient"}
- Frame color: ${sunglasses.frameColor ?? "black, tortoise, or metallic"}
- Vibe: ${sunglasses.vibe ?? "editorial, stylish, confident"}
- Properly scaled for chibi face
`
      : "";

    // NEW: Headphones (Beats-style)
    const headphonesSection = headphones?.enabled
      ? `
Headphones:
- Type: ${headphones.type ?? "over-ear Beats-style headphones"}
- Color: ${headphones.color ?? "black, white, red, or metallic"}
- Finish: ${headphones.finish ?? "matte with subtle gloss accents"}
- Alternative option: wireless earbuds (compact, modern)
- Clean, stylish, proportional to chibi head
`
      : "";

    // ----------------------------
    // 3) Master prompt (NO risky inline ternaries)
    // ----------------------------
    const prompt = `
A high-quality ${artStyle} chibi character illustration (cute proportions, polished finish).

Body proportions:
- Balanced chibi proportions, elegant and stylized
- Full-body or waist-up based on selection (${renderFormat})

Character details:
- Age: ${ageGroup}
- Gender presentation: ${genderPresentation}
- Ethnicity: ${ethnicity}
- Skin tone: ${skinTone}
- Hair texture: ${hairType}
- Hair style: ${hairStyle}
- Hair color: ${hairColor}

${bodyBlock}

Face & beauty details:
- Makeup level: ${makeupLevel}
- Lip style: ${lipStyle}

Fashion era & vibe:
- Fashion era: ${fashionEra}
- Overall vibe: ${vibe}

Clothing & outfit selection:
- Outfit category: ${outfitCategory}
- Clothing style: ${clothingStyle}

${modestCulturalBlock}
${bollywoodBlock}
${culturalBlock}

Swim & resort wear options (if relevant):
- bikini set
- two-piece bikini
- high-waisted bikini
- bikini with matching sarong
- resort maxi dress
- poolside cover-up

Optional add-ons (only include if enabled/selected):
${doggySection}${nailsSection}${tattooSection}${shoesSection}${accessoriesSection}${bagsSection}${sunglassesSection}${headphonesSection}

User-selected controls summary:
- Action/pose: ${actionPose}
- Prop: ${prop}
- Render format: ${renderFormat}
- Transparent background: ${transparentBackground}

Art direction:
- Soft airbrushed shading, polished finish
- Clean linework, premium lighting
- No text, no watermark, no distortion
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
