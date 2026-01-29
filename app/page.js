"use client";

import { useMemo, useState } from "react";

function ButtonGroup({ label, value, onChange, options }) {
  return (
    <section style={ui.section}>
      <div style={ui.sectionTitle}>{label}</div>
      <div style={ui.chips}>
        {options.map((opt) => {
          const active = value === opt.value;
          const tint = opt.tint || null;

          const style = active
            ? {
                ...ui.chipActive,
                ...(tint
                  ? {
                      border: `1px solid ${tint.border}`,
                      background: tint.bg,
                      color: tint.text,
                      boxShadow: `0 8px 18px ${tint.shadow}`,
                    }
                  : {}),
              }
            : {
                ...ui.chip,
                ...(tint
                  ? {
                      border: `1px solid ${tint.borderSoft}`,
                      background: tint.bgSoft,
                      color: "#374151",
                    }
                  : {}),
              };

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              style={style}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

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
    maxWidth: 620,
    display: "block",
    borderRadius: 18,
    border: "1px solid rgba(0,0,0,0.08)",
    background: "#fff",
  },
  placeholder: {
    width: "100%",
    maxWidth: 620,
    height: 380,
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
  error: { paddingTop: 12, color: "#b91c1c", fontWeight: 900 },
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

  const [species, setSpecies] = useState("human"); // human | dog
  const [gender, setGender] = useState("female"); // female | male | unisex
  const [style, setStyle] = useState("chibi");

  const [hairColor, setHairColor] = useState("pink");
  const [vibe, setVibe] = useState("cute");

  const [outfit, setOutfit] = useState("hoodie");
  const [shoes, setShoes] = useState("sneakers");
  const [accessories, setAccessories] = useState("none");
  const [religion, setReligion] = useState("none");

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [debug, setDebug] = useState("");
  const [masterPrompt, setMasterPrompt] = useState("");

  const HAIR_OPTIONS = useMemo(
    () => [
      {
        value: "pink",
        label: "Pink",
        tint: {
          bg: "#fde7f3",
          bgSoft: "#fff5fb",
          border: "#f9a8d4",
          borderSoft: "#fbcfe8",
          text: "#9d174d",
          shadow: "rgba(236,72,153,0.25)",
        },
      },
      {
        value: "blonde",
        label: "Blonde",
        tint: {
          bg: "#fff6cc",
          bgSoft: "#fffaf0",
          border: "#facc15",
          borderSoft: "#fde68a",
          text: "#854d0e",
          shadow: "rgba(250,204,21,0.22)",
        },
      },
      {
        value: "blue",
        label: "Blue",
        tint: {
          bg: "#e0f2fe",
          bgSoft: "#f0f9ff",
          border: "#7dd3fc",
          borderSoft: "#bae6fd",
          text: "#075985",
          shadow: "rgba(14,165,233,0.22)",
        },
      },
      {
        value: "brown",
        label: "Brown",
        tint: {
          bg: "#efe7dd",
          bgSoft: "#faf7f2",
          border: "#d6b49a",
          borderSoft: "#ead7c6",
          text: "#5b341a",
          shadow: "rgba(120,53,15,0.18)",
        },
      },
      {
        value: "black",
        label: "Black",
        tint: {
          bg: "#e5e7eb",
          bgSoft: "#f3f4f6",
          border: "#9ca3af",
          borderSoft: "#d1d5db",
          text: "#111827",
          shadow: "rgba(17,24,39,0.12)",
        },
      },
      { value: "red", label: "Red" },
      { value: "purple", label: "Purple" },
      { value: "green", label: "Green" },
      { value: "white", label: "White" },
    ],
    []
  );

  const STYLE_OPTIONS = useMemo(
    () => [
      { value: "chibi", label: "Chibi" },
      { value: "anime", label: "Anime" },
      { value: "cartoon", label: "Cartoon" },
    ],
    []
  );

  const VIBE_OPTIONS = useMemo(
    () => [
      { value: "cute", label: "Cute" },
      { value: "soft", label: "Soft" },
      { value: "cozy", label: "Cozy" },
      { value: "dreamy", label: "Dreamy" },
      { value: "cool", label: "Cool" },
      { value: "edgy", label: "Edgy" },
    ],
    []
  );

  const SHOES_OPTIONS = useMemo(
    () => [
      { value: "sneakers", label: "Sneakers" },
      { value: "boots", label: "Boots" },
      { value: "heels", label: "Heels" },
      { value: "flats", label: "Flats" },
      { value: "sandals", label: "Sandals" },
      { value: "loafers", label: "Loafers" },
    ],
    []
  );

  const ACCESSORY_OPTIONS = useMemo(() => {
    if (species === "dog") {
      return [
        { value: "none", label: "None" },
        { value: "bandana", label: "Bandana" },
        { value: "bowtie", label: "Bowtie" },
        { value: "glasses", label: "Glasses" },
        { value: "collar tag", label: "Collar tag" },
        { value: "little hat", label: "Little hat" },
        { value: "flower crown", label: "Flower crown" },
      ];
    }
    return [
      { value: "none", label: "None" },
      { value: "glasses", label: "Glasses" },
      { value: "hair clips", label: "Hair clips" },
      { value: "hat", label: "Hat" },
      { value: "earrings", label: "Earrings" },
      { value: "necklace", label: "Necklace" },
      { value: "backpack", label: "Backpack" },
      { value: "headphones", label: "Headphones" },
      { value: "scarf", label: "Scarf" },
    ];
  }, [species]);

  const RELIGION_OPTIONS = useMemo(
    () => [
      { value: "none", label: "None" },
      { value: "christian", label: "Christian" },
      { value: "muslim", label: "Muslim" },
      { value: "jewish", label: "Jewish" },
      { value: "spiritual", label: "Spiritual" },
    ],
    []
  );

  const OUTFIT_OPTIONS = useMemo(() => {
    if (species === "dog") {
      return [
        { value: "dog hoodie", label: "Dog hoodie" },
        { value: "dog sweater", label: "Dog sweater" },
        { value: "dog raincoat", label: "Dog raincoat" },
        { value: "dog pajamas", label: "Dog pajamas" },
        { value: "dog tutu", label: "Dog tutu" },
        { value: "service vest", label: "Service vest" },
        { value: "bandana outfit", label: "Bandana outfit" },
      ];
    }

    if (gender === "female") {
      return [
        { value: "hoodie", label: "Hoodie" },
        { value: "dress", label: "Dress" },
        { value: "skirt", label: "Skirt" },
        { value: "cardigan", label: "Cardigan" },
        { value: "sweater", label: "Sweater" },
        { value: "blazer", label: "Blazer" },
        { value: "school uniform", label: "School uniform" },
        { value: "athleisure set", label: "Athleisure set" },
        { value: "overalls", label: "Overalls" },
      ];
    }

    if (gender === "male") {
      return [
        { value: "hoodie", label: "Hoodie" },
        { value: "t-shirt", label: "T-shirt" },
        { value: "button-up", label: "Button-up" },
        { value: "jacket", label: "Jacket" },
        { value: "sweater", label: "Sweater" },
        { value: "blazer", label: "Blazer" },
        { value: "suit", label: "Suit" },
        { value: "school uniform", label: "School uniform" },
        { value: "sports jersey", label: "Sports jersey" },
      ];
    }

    return [
      { value: "oversized hoodie", label: "Oversized hoodie" },
      { value: "streetwear", label: "Streetwear" },
      { value: "sweater", label: "Sweater" },
      { value: "overalls", label: "Overalls" },
      { value: "athleisure set", label: "Athleisure set" },
      { value: "pajamas", label: "Pajamas" },
      { value: "school uniform", label: "School uniform" },
    ];
  }, [species, gender]);

  function safeSetSpecies(next) {
    setSpecies(next);
    setImageUrl("");
    setError("");
    setDebug("");
    setOutfit(next === "dog" ? "dog hoodie" : "hoodie");
  }

  function safeSetGender(next) {
    setGender(next);
    setImageUrl("");
    setError("");
    setDebug("");
    setOutfit("hoodie");
  }

  async function handleGenerate() {
    setLoading(true);
    setImageUrl("");
    setError("");
    setDebug("");

    const safePrompt = prompt.trim() || "(no extra description)";

    // 🔒 CHIBI LOCK (this is what forces the look)
    const built = `
You are generating ONE SINGLE CHARACTER illustration.

STYLE MUST BE: SUPER-DEFORMED CHIBI / SD.
- very large head (about 60% of total height)
- tiny body, short limbs, small hands and feet
- big expressive eyes, cute face
- clean lineart, soft shading, pastel palette
- simple soft background, centered full-body character

DO NOT:
- do not use realistic or semi-realistic proportions
- do not crop the character
- do not add extra characters

CHARACTER:
- Species: ${species}${species === "human" ? ` (${gender})` : ""}
- Hair color: ${species === "human" ? hairColor : "fur color matching the vibe"}
- Clothes/outfit: ${outfit}
${species === "human" ? `- Shoes: ${shoes}` : ""}
- Accessories: ${accessories}
- Vibe: ${vibe}
- Religion/spiritual context (styling only, respectful): ${religion}

USER DESCRIPTION:
${safePrompt}
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
    setSpecies("human");
    setGender("female");
    setStyle("chibi");
    setHairColor("pink");
    setVibe("cute");
    setOutfit("hoodie");
    setShoes("sneakers");
    setAccessories("none");
    setReligion("none");
    setImageUrl("");
    setError("");
    setDebug("");
    setMasterPrompt("");
  }

  return (
    <div style={ui.page}>
      <div style={ui.shell}>
        <header style={ui.header}>
          <h1 style={ui.title}>✨ Chibi Generator</h1>
          <p style={ui.subtitle}>
            All buttons restored • Strong chibi proportions • Debug shows errors
          </p>
        </header>

        <div style={ui.grid}>
          <div style={ui.card}>
            <div style={ui.cardInner}>
              <div style={ui.label}>Character description (optional)</div>
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. cute boy with glasses, pastel jacket..."
                style={ui.input}
              />
              <div style={ui.hint}>
                Tip: you can generate even with this empty — the buttons are enough.
              </div>

              <ButtonGroup
                label="Species"
                value={species}
                onChange={safeSetSpecies}
                options={[
                  { value: "human", label: "Human" },
                  { value: "dog", label: "Dog" },
                ]}
              />

              {species === "human" && (
                <ButtonGroup
                  label="Gender"
                  value={gender}
                  onChange={safeSetGender}
                  options={[
                    { value: "female", label: "Female" },
                    { value: "male", label: "Male" },
                    { value: "unisex", label: "Unisex" },
                  ]}
                />
              )}

              <ButtonGroup
                label="Style"
                value={style}
                onChange={setStyle}
                options={STYLE_OPTIONS}
              />

              {species === "human" && (
                <ButtonGroup
                  label="Hair Color"
                  value={hairColor}
                  onChange={setHairColor}
                  options={HAIR_OPTIONS}
                />
              )}

              <ButtonGroup
                label="Vibe"
                value={vibe}
                onChange={setVibe}
                options={VIBE_OPTIONS}
              />

              <ButtonGroup
                label={species === "dog" ? "Dog Clothes" : "Clothes"}
                value={outfit}
                onChange={setOutfit}
                options={OUTFIT_OPTIONS}
              />

              {species === "human" && (
                <ButtonGroup
                  label="Shoes"
                  value={shoes}
                  onChange={setShoes}
                  options={SHOES_OPTIONS}
                />
              )}

              <ButtonGroup
                label="Accessories"
                value={accessories}
                onChange={setAccessories}
                options={ACCESSORY_OPTIONS}
              />

              <ButtonGroup
                label="Religion / Spiritual context"
                value={religion}
                onChange={setReligion}
                options={RELIGION_OPTIONS}
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
              <p style={ui.previewHint}>If it fails, check Debug below</p>
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
                <summary style={ui.summary}>Debug JSON (copy this if it fails)</summary>
                <pre style={ui.code}>{debug || "(no response yet)"}</pre>
              </details>

              <details style={{ marginTop: 10 }}>
                <summary style={ui.summary}>Master prompt</summary>
                <pre style={ui.code}>{masterPrompt || "(empty)"}</pre>
              </details
div>
          </div>
        </div>
      </div>
    </div>
);
}
