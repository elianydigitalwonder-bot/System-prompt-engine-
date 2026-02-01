// app/api/prompt/route.js
// Next.js App Router API route that converts UI selections (JSON) into a single clean prompt string.

export async function POST(req) {
  try {
    const body = await req.json();

    // -------------------------
    // 1) UI → Variables (defaults)
    // -------------------------
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

      // Face / beauty
      lipStyle = "User-selected",
      nailStyle = "none", // e.g. "long acrylic nails", "French tips", "rhinestone nails"
      makeupLevel = "natural", // "natural" | "soft glam" | "bold glam"

      // Art / overall styling
      fashionEra = "modern", // "1980s" | "1990s" | "early 2000s" | "modern"
      vibe = "stylish", // "luxury" | "street" | "glam" | "soft" | "editorial"
      outfitCategory = "User-selected", // e.g. "street", "swim", "modest", "bollywood"
      artStyle = "semi-realistic airbrushed chibi", // e.g. "photoreal", "illustration", etc.

      // Clothing + cultural styling
      clothingStyle = "User-selected", // free text description if your UI sends it
      muslimAttire = "none", // "none" | "hijab" | "abaya" | "modest_long_dress_with_hijab"
      christianAttire = "none", // optional modest styling (kept broad & respectful)
      catholicAttire = "none", // optional modest styling (kept broad & respectful)
      bollywoodOutfit = "none", // "none" | "lehenga" | "saree_modern_drape" | "anarkali" | "embellished_set"
      culturalNotes = "none", // e.g. "festival look", "wedding guest"

      // Footwear
      footwear = "User-selected", // e.g. "sparkling boots"

      // Accessories
      accessories = "User-selected", // e.g. "designer handbag, sunglasses"
      doggyBagGlamour = false, // true/false
      dogCarrierStyle = "none", // one of carrier styles
      dogStyleDetails = "none", // bow/collar/bandana etc.

      // Faith jewelry / symbols (OPTIONAL; only if user chooses)
      faithJewelry = "none", // "none" | "christian" | "catholic"
      faithJewelryItems = "none", // e.g. "cross necklace, rosary bracelet"

      // Actions / props
      actionPose = "none", // e.g. "rollerblading pose"
      prop = "none", // e.g. "surfboard", "snorkel gear", "daiquiri"

      // Output format
      renderFormat = "waist-up", // "waist-up" | "full-body" | "sticker"
      transparentBackground = false // true/false
    } = body || {};

    // -------------------------
    // 2) Helper: normalize booleans + tidy lines
    // -------------------------
    const yn = (v) => (v ? "yes" : "no");
    const safeLine = (label, value) => `- ${label}: ${value}`;

    // Only include faith jewelry section if user explicitly selected it
    const includeFaithJewelry = faithJewelry && faithJewelry !== "none";

    // Only include dog section if turned on
    const includeDog = Boolean(doggyBagGlamour);

    // Only include cultural attire sections when not "none"
    const includeMuslimAttire = muslimAttire && muslimAttire !== "none";
    const includeChristianAttire = christianAttire && christianAttire !== "none";
    const includeCatholicAttire = catholicAttire && catholicAttire !== "none";
    const includeBollywood = bollywoodOutfit && bollywoodOutfit !== "none";

    // -------------------------
    // 3) One clean prompt (THIS drives your image generator)
    // -------------------------
    const prompt = `
A high-quality semi-realistic chibi character illustration
(cute proportions, NOT an oversized head).

Body proportions:
- Feminine silhouette with defined waist
- Balanced chibi proportions, elegant and stylized
- Render format: ${renderFormat}
- If "sticker": bold clean outlines + simplified shading

Character details:
${safeLine("Ethnicity", ethnicity)}
${safeLine("Skin tone", skinTone)}
${safeLine("Age group", ageGroup)}
${safeLine("Gender presentation", genderPresentation)}

Hair:
${safeLine("Texture", hairType)}
${safeLine("Style", hairStyle)}
${safeLine("Color", hairColor)}

Facial & beauty details:
${safeLine("Lip style", lipStyle)}
${safeLine("Nail style (optional)", nailStyle)}
${safeLine("Makeup level", makeupLevel)}
- Large expressive eyes with glossy highlights
- Soft blush, freckles optional

Fashion direction:
${safeLine("Fashion era", fashionEra)}
${safeLine("Overall vibe", vibe)}
${safeLine("Outfit category", outfitCategory)}
${safeLine("Clothing style notes", clothingStyle)}
${safeLine("Cultural notes (optional)", culturalNotes)}

Clothing & outfit library (choose based on Outfit category):
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
- snorkeling-ready swim look (optional)

Modest & cultural wear (respectful, user-selected):
- hijab with coordinated outfit
- abaya-inspired fashion look
- modest long dress with layered styling

South Asian / Bollywood style:
- lehenga set
- saree-inspired modern drape
- anarkali-style dress
- embellished Bollywood glam outfit

Cultural attire selections (apply ONLY if user selected):
${includeMuslimAttire ? safeLine("Muslim attire", muslimAttire) : "- Muslim attire: none"}
${includeChristianAttire ? safeLine("Christian attire", christianAttire) : "- Christian attire: none"}
${includeCatholicAttire ? safeLine("Catholic attire", catholicAttire) : "- Catholic attire: none"}
${includeBollywood ? safeLine("Bollywood outfit", bollywoodOutfit) : "- Bollywood outfit: none"}

Footwear:
${safeLine("Footwear", footwear)}
Suggested footwear options:
- flat sandals
- strappy sandals
- platform sandals
- sneakers
- chunky sneakers
- neon shoes
- sparkling shoes
- sparkling boots

Accessories:
${safeLine("Accessories", accessories)}
Suggested accessories:
- designer handbag or clutch
- sunglasses
- hair accessories
- luxury jewelry

Doggy Bag Glamour (optional add-on):
${safeLine("Enabled", yn(includeDog))}
${includeDog ? safeLine("Pet carrier style", dogCarrierStyle) : "- Pet carrier style: none"}
${includeDog ? safeLine("Dog styling details", dogStyleDetails) : "- Dog styling details: none"}
If enabled, use these style notes:
- designer-inspired dog carrier bag
- quilted luxury pet tote
- structured handbag-style pet carrier
- monogram-style pet carrier
- transparent glam pet carrier
- small toy-breed scale dog, silk bow, rhinestone collar, gold chain collar, patterned bandana, pearl leash
- coordinated outfit colors between owner and dog, subtle sparkle accents, editorial fashion styling

Faith jewelry (optional, respectful — ONLY if user selected):
${safeLine("Faith jewelry type", includeFaithJewelry ? faithJewelry : "none")}
${safeLine("Faith jewelry items", includeFaithJewelry ? faithJewelryItems : "none")}
Notes:
- Only include faith-based jewelry if explicitly requested/selected by the user.
- Keep depiction respectful and non-stereotyped.

Action & lifestyle:
${safeLine("Action/pose", actionPose)}
${safeLine("Prop", prop)}
Suggested action/pose options:
- holding a daiquiri or cocktail
- rollerblading pose
- skiing pose
- yoga balance pose
- surfing with board
- snorkeling gear
- confident lifestyle stance

Sticker rules (only if renderFormat is "sticker"):
- Full-body chibi, bold clean outlines, simplified shading
- Transparent background if requested

Art direction:
${safeLine("Style", artStyle)}
- Soft airbrushed shading, polished finish
- Clean linework, premium lighting
- No text, no watermark, no distortion
`.trim();

    // -------------------------
    // 4) Return
    // -------------------------
    return Response.json({ success: true, prompt });
  } catch (err) {
    return Response.json(
      { success: false, error: err?.message || "Unknown error" },
      { status: 400 }
    );
  }
}
