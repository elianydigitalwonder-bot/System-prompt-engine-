const built = `
High-end fashion editorial illustration with elegant, realistic proportions.

PROPORTIONS (very important):
- Natural adult head-to-body ratio (approximately 1:7)
- NO oversized head
- NO exaggerated eyes
- Balanced, realistic anatomy
- Refined facial features

STYLE:
- Semi-realistic illustration
- Luxury fashion editorial aesthetic
- Soft airbrushed shading
- Photorealistic skin texture
- Cinematic natural lighting
- Clean, premium, sophisticated look

WARDROBE & DETAILS:
- Hair color: ${hairColor}
- Outfit: ${outfit}
- Shoes: ${shoes}
- Accessories: ${accessories}
- Gender: ${gender}

ENVIRONMENT:
- Elegant, upscale setting
- Fashion photography composition
- Calm, confident, editorial mood

STRICT RULES (DO NOT BREAK):
- NOT chibi
- NOT cartoon
- NOT kawaii
- NOT doll-like
- NO big head
- Keep proportions realistic and elegant at all times

USER DESCRIPTION:
${prompt || "Elegant fashion portrait with refined features"}
`.trim();
