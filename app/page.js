"use client";

import { useMemo, useState } from "react";

export const dynamic = "force-dynamic";

const STYLE_PRESETS = {
  Balanced: {
    label: "Balanced (no big head)",
    notes: `
High-end fashion editorial illustration.
Adult proportions, elegant and realistic anatomy.
Natural head-to-body ratio (~1:7 to 1:8). Subtle eyes (NOT oversized).
Refined facial features, premium styling, clean composition.
Soft natural lighting, editorial mood.
STRICT: NOT chibi, NOT kawaii, NOT cartoon, NOT doll-like, NOT big head.
    `.trim(),
  },
  Photoreal: {
    label: "Photoreal (editorial)",
    notes: `
Photorealistic fashion editorial portrait.
Adult proportions, realistic anatomy, natural head size.
High-end studio lighting, premium textures, refined face details.
STRICT: NOT chibi, NOT kawaii, NOT cartoon, NOT doll-like, NOT big head.
    `.trim(),
  },
  Illustration: {
    label: "Fashion illustration",
    notes: `
Semi-realistic luxury fashion illustration (editorial).
Adult proportions, elegant anatomy, natural head size, subtle eyes.
Clean premium look, soft airbrushed shading.
STRICT: NOT chibi, NOT kawaii, NOT cartoon, NOT doll-like, NOT big head.
    `.trim(),
  },
};

const HAIR = ["Honey blonde", "Dark brown", "Black", "Caramel balayage", "Auburn", "Platinum", "Soft pink"];
const OUTFITS = ["Athleisure", "Luxury dress", "Cropped hoodie", "Blouse + skirt", "Blazer set"];
const SHOES = ["Sneakers", "Loafers", "Boots", "Heels", "Sandals"];
const ACCESSORIES = ["None", "Sunglasses on head", "Gold earrings", "Designer handbag", "Jeweled headband", "Vintage hairpin"];
const SETTINGS = ["Santorini terrace", "Bali beach club", "Paris cafe", "Milan street", "Luxury lobby"];
const GENDERS = ["Female", "Male", "Unisex"];

function Pill({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "10px 14px",
        borderRadius: 999,
        border: active ? "1px solid rgba(210, 80, 150, 0.55)" : "1px solid rgba(0,0,0,0.12)",
        background: active ? "rgba(255, 220, 238, 0.75)" : "rgba(255,255,255,0.7)",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 13,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

export default function Page() {
  const [styleMode, setStyleMode] = useState("Balanced");
  const [gender, setGender] = useState("Female");
  const [hairColor, setHairColor] = useState("Honey blonde");
  const [outfit, setOutfit] = useState("Luxury dress");
  const [shoes, setShoes] = useState("Sneakers");
  const [accessories, setAccessories] = useState("None");
  const [setting, setSetting] = useState("Luxury lobby");

  const [userPrompt, setUserPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const builtPrompt = useMemo(() => {
    const preset = STYLE_PRESETS[styleMode]?.notes || STYLE_PRESETS.Balanced.notes;

    // ✅ This is the final prompt sent to /api/generate
    return `
${preset}

WARDROBE & DETAILS:
- Gender presentation: ${gender}
- Hair color: ${hairColor}
- Outfit: ${outfit}
- Shoes: ${shoes}
- Accessories: ${accessories}

ENVIRONMENT:
- Setting: ${setting}
- Mood: calm, confident, editorial
- Composition: fashion photography framing, premium look

USER DESCRIPTION (include exactly, but keep elegance):
${(userPrompt || "Elegant fashion portrait with refined features.").trim()}
`.trim();
  }, [styleMode, gender, hairColor, outfit, shoes, accessories, setting, userPrompt]);

  async function handleGenerate() {
    if (!userPrompt.trim()) {
      setError("Write a short description first (1–2 lines).");
      return;
    }

    setLoading(true);
    setError("");
    setImageUrl("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: builtPrompt }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        setError(data?.error || `Request failed (${res.status}). Check Vercel logs.`);
        setLoading(false);
        return;
      }

      setImageUrl(data.imageUrl);
      setLoading(false);
    } catch (e) {
      setError(e?.message || "Network error");
      setLoading(false);
    }
  }

  function handleReset() {
    setUserPrompt("");
    setImageUrl("");
    setError("");
    setStyleMode("Balanced");
    setGender("Female");
    setHairColor("Honey blonde");
    setOutfit("Luxury dress");
    setShoes("Sneakers");
    setAccessories("None");
    setSetting("Luxury lobby");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: 22,
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        background:
          "radial-gradient(1200px 700px at 20% 10%, rgba(255,220,238,0.7), transparent 55%), radial-gradient(900px 600px at 80% 20%, rgba(210,245,255,0.65), transparent 50%), linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.7))",
      }}
    >
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          background: "rgba(255,255,255,0.72)",
          border: "1px solid rgba(0,0,0,0.10)",
          borderRadius: 18,
          padding: 18,
          boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
          <h1 style={{ margin: 0, fontSize: 22 }}>✨ Character Generator</h1>
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            {STYLE_PRESETS[styleMode]?.label || STYLE_PRESETS.Balanced.label}
          </div>
        </div>

        <div style={{ height: 12 }} />

        <label style={{ fontWeight: 700, fontSize: 13 }}>Description (required)</label>
        <textarea
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="Example: A confident woman with sleek hair, subtle makeup, elegant pose, luxury editorial vibe."
          rows={3}
          style={{
            width: "100%",
            marginTop: 8,
            padding: 12,
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.14)",
            outline: "none",
            resize: "vertical",
            background: "rgba(255,255,255,0.85)",
          }}
        />

        <div style={{ height: 16 }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
          <section>
            <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 8 }}>Style Mode</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {Object.keys(STYLE_PRESETS).map((k) => (
                <Pill key={k} active={styleMode === k} onClick={() => setStyleMode(k)}>
                  {k}
                </Pill>
              ))}
            </div>
          </section>

          <section>
            <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 8 }}>Gender</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {GENDERS.map((x) => (
                <Pill key={x} active={gender === x} onClick={() => setGender(x)}>
                  {x}
                </Pill>
              ))}
            </div>
          </section>

          <section>
            <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 8 }}>Hair Color</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {HAIR.map((x) => (
                <Pill key={x} active={hairColor === x} onClick={() => setHairColor(x)}>
                  {x}
                </Pill>
              ))}
            </div>
          </section>

          <section>
            <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 8 }}>Outfit</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {OUTFITS.map((x) => (
                <Pill key={x} active={outfit === x} onClick={() => setOutfit(x)}>
                  {x}
                </Pill>
              ))}
            </div>
          </section>

          <section>
            <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 8 }}>Shoes</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {SHOES.map((x) => (
                <Pill key={x} active={shoes === x} onClick={() => setShoes(x)}>
                  {x}
                </Pill>
              ))}
            </div>
          </section>

          <section>
            <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 8 }}>Accessories</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {ACCESSORIES.map((x) => (
                <Pill key={x} active={accessories === x} onClick={() => setAccessories(x)}>
                  {x}
                </Pill>
              ))}
            </div>
          </section>

          <section>
            <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 8 }}>Setting</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {SETTINGS.map((x) => (
                <Pill key={x} active={setting === x} onClick={() => setSetting(x)}>
                  {x}
                </Pill>
              ))}
            </div>
          </section>
        </div>

        <div style={{ height: 16 }} />

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              border: "1px solid rgba(210, 80, 150, 0.45)",
              background: loading ? "rgba(255, 220, 238, 0.6)" : "rgba(255, 220, 238, 0.9)",
              fontWeight: 900,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Generating..." : "Generate"}
          </button>

          <button
            onClick={handleReset}
            type="button"
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.14)",
              background: "rgba(255,255,255,0.85)",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Reset
          </button>

          <div style={{ marginLeft: "auto", fontSize: 12, opacity: 0.75 }}>
            Balanced = no big head ✅
          </div>
        </div>

        {error ? (
          <div style={{ marginTop: 12, color: "#b42318", fontWeight: 700 }}>{error}</div>
        ) : null}

        <div style={{ height: 18 }} />

        <div style={{ fontWeight: 900, fontSize: 13, marginBottom: 8 }}>Preview</div>
        <div
          style={{
            borderRadius: 16,
            border: "1px solid rgba(0,0,0,0.12)",
            background: "rgba(255,255,255,0.75)",
            padding: 12,
            minHeight: 280,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {imageUrl ? (
            // data:image/png;base64,... or url
            <img
              src={imageUrl}
              alt="Generated"
              style={{ width: "100%", maxWidth: 640, borderRadius: 14 }}
            />
          ) : (
            <div style={{ opacity: 0.55, fontWeight: 700 }}>✨ Your image will appear here</div>
          )}
        </div>

        <details style={{ marginTop: 14 }}>
          <summary style={{ cursor: "pointer", fontWeight: 800 }}>See the exact prompt sent</summary>
          <pre
            style={{
              marginTop: 10,
              padding: 12,
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.12)",
              background: "rgba(255,255,255,0.85)",
              whiteSpace: "pre-wrap",
              fontSize: 12,
            }}
          >
            {builtPrompt}
          </pre>
        </details>
      </div>
    </main>
  );
}
