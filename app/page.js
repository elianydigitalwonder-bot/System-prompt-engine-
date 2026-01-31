"use client";

import { useMemo, useState } from "react";

/* ---------- ButtonGroup ---------- */
function ButtonGroup({ label, value, onChange, options }) {
  return (
    <section style={ui.section}>
      <div style={ui.sectionTitle}>{label}</div>
      <div style={ui.chips}>
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              style={active ? ui.chipActive : ui.chip}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- UI ---------- */
const ui = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #fdf2f8, #eef2ff)",
    padding: 20,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif',
    color: "#111827",
  },
  shell: { maxWidth: 1050, margin: "0 auto", display: "grid", gap: 16 },
  header: {
    padding: 18,
    borderRadius: 20,
    background: "rgba(255,255,255,0.88)",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  },
  title: { margin: 0, fontSize: 34, fontWeight: 900, letterSpacing: -0.6 },
  subtitle: { marginTop: 8, color: "#6b7280" },

  grid: {
    display: "grid",
    gap: 16,
    gridTemplateColumns: "1fr",
  },

  card: {
    borderRadius: 22,
    background: "rgba(255,255,255,0.92)",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },
  cardInner: { padding: 20 },

  label: { fontWeight: 900, marginBottom: 6, fontSize: 13, color: "#374151" },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 14,
    border: "1px solid #e5e7eb",
    fontSize: 15,
    outline: "none",
    background: "#fff",
  },
  hint: { marginTop: 8, fontSize: 12, color: "#6b7280" },

  section: {
    marginTop: 14,
    padding: 14,
    borderRadius: 18,
    background: "#fafafa",
    border: "1px solid #f0f0f0",
  },
  sectionTitle: {
    fontWeight: 900,
    fontSize: 13,
    marginBottom: 10,
    color: "#374151",
  },
  chips: { display: "flex", flexWrap: "wrap", gap: 10 },

  chip: {
    padding: "10px 14px",
    borderRadius: 999,
    border: "1px solid #e5e7eb",
    background: "#ffffff",
    color: "#374151",
    cursor: "pointer",
    fontWeight: 800,
  },
  chipActive: {
    padding: "10px 14px",
    borderRadius: 999,
    border: "1px solid #f9a8d4",
    background: "#fde7f3",
    color: "#9d174d",
    cursor: "pointer",
    fontWeight: 900,
    boxShadow: "0 10px 24px rgba(236,72,153,0.22)",
  },

  actions: { display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" },
  primary: (disabled) => ({
    padding: "14px 20px",
    borderRadius: 16,
    border: "none",
    background: disabled ? "#e5e7eb" : "#f472b6",
    color: "#fff",
    fontSize: 16,
    fontWeight: 900,
    cursor: disabled ? "not-allowed" : "pointer",
    boxShadow: disabled ? "none" : "0 10px 24px rgba(236,72,153,0.35)",
  }),
  secondary: (disabled) => ({
    padding: "14px 20px",
    borderRadius: 16,
    border: "1px solid #e5e7eb",
    background: "#fff",
    fontSize: 16,
    fontWeight: 900,
    cursor: disabled ? "not-allowed" : "pointer",
    color: "#2563eb",
  }),

  previewCard: {
    borderRadius: 22,
    background: "rgba(255,255,255,0.92)",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },
  previewHeader: {
    padding: 16,
    borderBottom: "1px solid rgba(0,0,0,0.06)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 10,
  },
  previewTitle: { margin: 0, fontSize: 14, fontWeight: 900, color: "#374151" },
  previewHint: { margin: 0, fontSize: 12, color: "#6b7280" },
  imgWrap: { padding: 16 },
  img: {
    width: "100%",
    maxWidth: 640,
    display: "block",
    borderRadius: 18,
    border: "1px solid rgba(0,0,0,0.08)",
    background: "#fff",
  },
  placeholder: {
    width: "100%",
    maxWidth: 640,
    height: 420,
    borderRadius: 18,
    border: "1px solid rgba(0,0,0,0.08)",
    background: "linear-gradient(135deg, #fff 0%, #fff7fb 45%, #eff6ff 100%)",
    display: "grid",
    placeItems: "center",
    color: "#9ca3af",
    fontWeight: 900,
    fontSize: 42,
    letterSpacing: -1,
  },
  error: { padding: 16, color: "#b91c1c", fontWeight: 900 },
  details: { padding: 16, borderTop: "1px solid rgba(0,0,0,0.06)" },
  summary: { cursor: "pointer", fontWeight: 900, color: "#374151" },
  code: {
    padding: 14,
    marginTop: 10,
    fontSize: 12,
    color: "#111827",
    background: "#fff7fb",
    borderRadius: 14,
    border: "1px solid rgba(0,0,0,0.06)",
    whiteSpace: "pre-wrap",
  },
};

export default function Home() {
  const [prompt, setPrompt] = useState("");

  // Style mode (your “no big head” requirement)
  const [styleMode, setStyleMode] = useState("balanced"); // chibi | balanced | fashion

  // Options (more buttons)
  const [gender, setGender] = useState("female"); // female | male | unisex
  const [hairColor, setHairColor] = useState("honey blonde");
  const [outfit, setOutfit] = useState("athleisure set");
  const [shoes, setShoes] = useState("sneakers");
  const [accessories, setAccessories] = useState("sunglasses on head");
  const [setting, setSetting] = useState("Santorini terrace");

  // Output
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [debug, setDebug] = useState("");
  const [masterPrompt, setMasterPrompt] = useState("");

  const STYLE_BLOCKS = useMemo(
    () => ({
      chibi: `
Cute chibi illustration.
Slightly oversized head and bigger eyes.
Pastel colors, friendly vibe.
`,
      balanced: `
Semi-realistic fashion illustration with elegant, balanced proportions.
Natural head-to-body ratio (NO oversized head).
Refined facial features, subtle eye size, clean premium look.
`,
      fashion: `
High-end fashion editorial illustration with realistic anatomy.
Natural head size, elegant silhouette, luxury aesthetic.
NOT chibi, NOT cartoon, NOT doll-like.
`,
    }),
    []
  );

  const GENDER_OPTIONS = useMemo(
    () => [
      { value: "female", label: "Female" },
      { value: "male", label: "Male" },
      { value: "unisex", label: "Unisex" },
    ],
    []
  );

  const HAIR_OPTIONS = useMemo(
    () => [
      { value: "honey blonde", label: "Honey Blonde" },
      { value: "dark brown", label: "Dark Brown" },
      { value: "black", label: "Black" },
      { value: "caramel balayage", label: "Caramel Balayage" },
      { value: "auburn", label: "Auburn" },
      { value: "platinum blonde", label: "Platinum" },
      { value: "soft pink", label: "Soft Pink" },
    ],
    []
  );

  const OUTFIT_OPTIONS = useMemo(() => {
    if (gender === "male") {
      return [
        { value: "streetwear set", label: "Streetwear set" },
        { value: "linen shirt + pants", label: "Linen set" },
        { value: "designer athleisure", label: "Athleisure" },
        { value: "blazer + trousers", label: "Blazer" },
        { value: "hoodie + joggers", label: "Hoodie set" },
      ];
    }
    if (gender === "unisex") {
      return [
        { value: "oversized hoodie set", label: "Oversized hoodie" },
        { value: "minimalist streetwear", label: "Minimal streetwear" },
        { value: "athleisure set", label: "Athleisure" },
        { value: "pajamas set", label: "Pajamas" },
        { value: "denim jacket look", label: "Denim jacket" },
      ];
    }
    // female
    return [
      { value: "athleisure set", label: "Athleisure" },
      { value: "luxury dress", label: "Luxury dress" },
      { value: "cropped hoodie + leggings", label: "Cropped hoodie" },
      { value: "silky blouse + skirt", label: "Blouse + skirt" },
      { value: "blazer + mini skirt", label: "Blazer set" },
    ];
  }, [gender]);

  const SHOES_OPTIONS = useMemo(
    () => [
      { value: "sneakers", label: "Sneakers" },
      { value: "loafers", label: "Loafers" },
      { value: "boots", label: "Boots" },
      { value: "heels", label: "Heels" },
      { value: "sandals", label: "Sandals" },
    ],
    []
  );

  const ACCESSORY_OPTIONS = useMemo(
    () => [
      { value: "none", label: "None" },
      { value: "sunglasses on head", label: "Sunglasses on head" },
      { value: "gold earrings", label: "Gold earrings" },
      { value: "designer handbag", label: "Designer handbag" },
      { value: "jeweled headband", label: "Jeweled headband" },
      { value: "vintage hairpin", label: "Vintage hairpin" },
    ],
    []
  );

  const SETTING_OPTIONS = useMemo(
    () => [
      { value: "Santorini terrace", label: "Santorini terrace" },
      { value: "Bali beach club", label: "Bali beach club" },
      { value: "Paris cafe", label: "Paris cafe" },
      { value: "Milan shopping street", label: "Milan street" },
      { value: "luxury hotel lobby", label: "Luxury lobby" },
    ],
    []
  );

  async function handleGenerate() {
    setLoading(true);
    setError("");
    setImageUrl("");
    setDebug("");

    const built = `
${STYLE_BLOCKS[styleMode]}

Character:
- Gender: ${gender}
- Hair: ${hairColor}
- Outfit: ${outfit}
- Shoes: ${shoes}
- Accessories: ${accessories}
- Setting: ${setting}

User description:
${prompt || "(no extra description)"}

Direction:
Soft pastel palette, clean composition, premium look, natural lighting.
Rules:
- Avoid oversized head unless styleMode is "chibi"
- Avoid cartoon proportions in balanced/fashion modes
`.trim();

    setMasterPrompt(built);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: built }),
      });

      const data = await res.json();
      setDebug(JSON.stringify(data, null, 2));

      if (!res.ok || !data?.ok) {
        setError(data?.error || "Something went wrong");
        return;
      }

      setImageUrl(data.imageUrl || "");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setPrompt("");
    setStyleMode("balanced");
    setGender("female");
    setHairColor("honey blonde");
    setOutfit("athleisure set");
    setShoes("sneakers");
    setAccessories("sunglasses on head");
    setSetting("Santorini terrace");
    setImageUrl("");
    setError("");
    setDebug("");
    setMasterPrompt("");
  }

  return (
    <div style={ui.page}>
      <div style={ui.shell}>
        <header style={ui.header}>
          <h1 style={ui.title}>✨ Character Generator</h1>
          <p style={ui.subtitle}>Pastel • Elegant • Style Control</p>
        </header>

        <div style={ui.grid}>
          <div style={ui.card}>
            <div style={ui.cardInner}>
              <div style={ui.label}>Description (optional)</div>
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. confident smile, olive skin, subtle makeup…"
                style={ui.input}
              />
              <div style={ui.hint}>
                Tip: leave it empty and use buttons only.
              </div>

              <ButtonGroup
                label="Style Mode"
                value={styleMode}
                onChange={setStyleMode}
                options={[
                  { value: "balanced", label: "Balanced (Elegant)" },
                  { value: "fashion", label: "Fashion (Realistic)" },
                  { value: "chibi", label: "Chibi (Big head)" },
                ]}
              />

              <ButtonGroup
                label="Gender"
                value={gender}
                onChange={setGender}
                options={GENDER_OPTIONS}
              />

              <ButtonGroup
                label="Hair Color"
                value={hairColor}
                onChange={setHairColor}
                options={HAIR_OPTIONS}
              />

              <ButtonGroup
                label="Outfit"
                value={outfit}
                onChange={setOutfit}
                options={OUTFIT_OPTIONS}
              />

              <ButtonGroup
                label="Shoes"
                value={shoes}
                onChange={setShoes}
                options={SHOES_OPTIONS}
              />

              <ButtonGroup
                label="Accessories"
                value={accessories}
                onChange={setAccessories}
                options={ACCESSORY_OPTIONS}
              />

              <ButtonGroup
                label="Setting"
                value={setting}
                onChange={setSetting}
                options={SETTING_OPTIONS}
              />

              <div style={ui.actions}>
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={loading}
                  style={ui.primary(loading)}
                >
                  {loading ? "Generating…" : "Generate"}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={loading}
                  style={ui.secondary(loading)}
                >
                  Reset
                </button>
              </div>

              {error ? <div style={ui.error}>{error}</div> : null}
            </div>
          </div>

          <div style={ui.previewCard}>
            <div style={ui.previewHeader}>
              <p style={ui.previewTitle}>Preview</p>
              <p style={ui.previewHint}>Balanced = no big head</p>
            </div>

            <div style={ui.imgWrap}>
              {imageUrl ? (
                <img src={imageUrl} alt="Generated" style={ui.img} />
              ) : (
                <div style={ui.placeholder}>✨</div>
              )}
            </div>

            <div style={ui.details}>
              <details>
                <summary style={ui.summary}>Master prompt</summary>
                <pre style={ui.code}>{masterPrompt || "(empty)"}</pre>
              </details>

              <details style={{ marginTop: 10 }}>
                <summary style={ui.summary}>Debug JSON</summary>
                <pre style={ui.code}>{debug || "(no response yet)"}</pre>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
