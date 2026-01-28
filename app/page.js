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
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
  },
  shell: { maxWidth: 1000, margin: "0 auto", display: "grid", gap: 16 },
  header: {
    padding: 20,
    borderRadius: 20,
    background: "white",
    boxShadow: "0 10px 30px rgba(0,0,0,.08)",
  },
  title: { fontSize: 32, fontWeight: 900 },
  subtitle: { color: "#6b7280" },

  card: {
    borderRadius: 22,
    background: "white",
    boxShadow: "0 20px 40px rgba(0,0,0,.08)",
  },
  cardInner: { padding: 20 },

  input: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    marginBottom: 10,
  },

  section: {
    marginTop: 14,
    padding: 14,
    borderRadius: 18,
    background: "#fafafa",
    border: "1px solid #eee",
  },
  sectionTitle: { fontWeight: 800, marginBottom: 8 },
  chips: { display: "flex", flexWrap: "wrap", gap: 10 },

  chip: {
    padding: "10px 14px",
    borderRadius: 999,
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 700,
  },
  chipActive: {
    padding: "10px 14px",
    borderRadius: 999,
    border: "1px solid #f472b6",
    background: "#fde7f3",
    cursor: "pointer",
    fontWeight: 900,
  },

  actions: { display: "flex", gap: 12, marginTop: 18 },
  primary: (disabled) => ({
    padding: "14px 20px",
    borderRadius: 16,
    border: "none",
    background: disabled ? "#e5e7eb" : "#f472b6",
    color: "#fff",
    fontWeight: 900,
    cursor: disabled ? "not-allowed" : "pointer",
  }),
  secondary: {
    padding: "14px 20px",
    borderRadius: 16,
    border: "1px solid #e5e7eb",
    background: "#fff",
    fontWeight: 800,
  },

  preview: {
    height: 360,
    borderRadius: 18,
    border: "1px solid #eee",
    display: "grid",
    placeItems: "center",
    color: "#9ca3af",
    fontSize: 36,
    fontWeight: 900,
  },
  img: {
    width: "100%",
    borderRadius: 18,
  },
};

/* ---------- Page ---------- */
export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [species, setSpecies] = useState("human");
  const [gender, setGender] = useState("female");
  const [style, setStyle] = useState("chibi");
  const [hairColor, setHairColor] = useState("pink");
  const [outfit, setOutfit] = useState("hoodie");
  const [shoes, setShoes] = useState("sneakers");
  const [accessories, setAccessories] = useState("none");

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const OPTIONS = {
    species: [
      { value: "human", label: "Human" },
      { value: "dog", label: "Dog" },
    ],
    gender: [
      { value: "female", label: "Female" },
      { value: "male", label: "Male" },
      { value: "unisex", label: "Unisex" },
    ],
    style: [
      { value: "chibi", label: "Chibi" },
      { value: "anime", label: "Anime" },
      { value: "cartoon", label: "Cartoon" },
    ],
    hair: [
      { value: "pink", label: "Pink" },
      { value: "blonde", label: "Blonde" },
      { value: "blue", label: "Blue" },
      { value: "brown", label: "Brown" },
      { value: "black", label: "Black" },
    ],
    outfit: [
      { value: "hoodie", label: "Hoodie" },
      { value: "dress", label: "Dress" },
      { value: "suit", label: "Suit" },
      { value: "dog hoodie", label: "Dog Hoodie" },
      { value: "dog sweater", label: "Dog Sweater" },
    ],
    shoes: [
      { value: "sneakers", label: "Sneakers" },
      { value: "boots", label: "Boots" },
      { value: "heels", label: "Heels" },
    ],
    accessories: [
      { value: "none", label: "None" },
      { value: "glasses", label: "Glasses" },
      { value: "hat", label: "Hat" },
      { value: "bow", label: "Bow" },
    ],
  };

  async function handleGenerate() {
    setLoading(true);
    setImageUrl("");

    const fullPrompt = `
${style} style chibi character.
Species: ${species}
Gender: ${gender}
Hair color: ${hairColor}
Outfit: ${outfit}
Shoes: ${shoes}
Accessories: ${accessories}
Extra: ${prompt}
Soft pastel, cute, friendly, clean background
`;

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: fullPrompt }),
    });

    const data = await res.json();
    setImageUrl(data?.imageUrl || "");
    setLoading(false);
  }

  return (
    <div style={ui.page}>
      <div style={ui.shell}>
        <header style={ui.header}>
          <h1 style={ui.title}>✨ Chibi Generator</h1>
          <p style={ui.subtitle}>Soft pastel • Apple-clean • Friendly</p>
        </header>

        <div style={ui.card}>
          <div style={ui.cardInner}>
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Extra description (optional)"
              style={ui.input}
            />

            <ButtonGroup label="Species" value={species} onChange={setSpecies} options={OPTIONS.species} />
            {species === "human" && (
              <ButtonGroup label="Gender" value={gender} onChange={setGender} options={OPTIONS.gender} />
            )}
            <ButtonGroup label="Style" value={style} onChange={setStyle} options={OPTIONS.style} />
            {species === "human" && (
              <ButtonGroup label="Hair Color" value={hairColor} onChange={setHairColor} options={OPTIONS.hair} />
            )}
            <ButtonGroup label="Outfit" value={outfit} onChange={setOutfit} options={OPTIONS.outfit} />
            {species === "human" && (
              <ButtonGroup label="Shoes" value={shoes} onChange={setShoes} options={OPTIONS.shoes} />
            )}
            <ButtonGroup label="Accessories" value={accessories} onChange={setAccessories} options={OPTIONS.accessories} />

            <div style={ui.actions}>
              <button onClick={handleGenerate} disabled={loading} style={ui.primary(loading)}>
                {loading ? "Generating…" : "Generate"}
              </button>
            </div>
          </div>
        </div>

        <div style={ui.card}>
          <div style={ui.cardInner}>
            {imageUrl ? (
              <img src={imageUrl} alt="Generated" style={ui.img} />
            ) : (
              <div style={ui.preview}>Chibi Preview</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
