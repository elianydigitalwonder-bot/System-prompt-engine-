"use client";

import { useState } from "react";

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

const ui = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #fdf2f8, #eef2ff)",
    padding: 24,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    color: "#1f2937",
  },
  shell: {
    maxWidth: 920,
    margin: "0 auto",
    display: "grid",
    gap: 20,
  },
  header: {
    padding: 20,
    borderRadius: 22,
    background: "rgba(255,255,255,0.9)",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 18px 40px rgba(0,0,0,0.08)",
  },
  title: { margin: 0, fontSize: 34, fontWeight: 800 },
  subtitle: { marginTop: 6, color: "#6b7280" },

  card: {
    borderRadius: 22,
    background: "rgba(255,255,255,0.9)",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 18px 40px rgba(0,0,0,0.08)",
    padding: 20,
  },

  label: { fontWeight: 700, marginBottom: 6, fontSize: 14 },
  input: {
    width: "100%",
    padding: 14,
    borderRadius: 16,
    border: "1px solid #e5e7eb",
    fontSize: 15,
    outline: "none",
  },

  section: {
    marginTop: 14,
    padding: 14,
    borderRadius: 18,
    background: "#fafafa",
    border: "1px solid #f0f0f0",
  },
  sectionTitle: {
    fontWeight: 800,
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
    cursor: "pointer",
    fontWeight: 600,
  },
  chipActive: {
    padding: "10px 14px",
    borderRadius: 999,
    border: "1px solid #f9a8d4",
    background: "#fde7f3",
    color: "#9d174d",
    fontWeight: 700,
    boxShadow: "0 6px 14px rgba(236,72,153,0.25)",
  },

  actions: { display: "flex", gap: 12, marginTop: 20 },
  primary: {
    padding: "14px 22px",
    borderRadius: 18,
    border: "none",
    background: "#f472b6",
    color: "#fff",
    fontSize: 16,
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 12px 26px rgba(236,72,153,0.35)",
  },
  secondary: {
    padding: "14px 22px",
    borderRadius: 18,
    border: "1px solid #e5e7eb",
    background: "#fff",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
  },

  previewImg: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 20,
    border: "1px solid rgba(0,0,0,0.08)",
    marginTop: 16,
  },
};

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("chibi");
  const [hair, setHair] = useState("pink");
  const [vibe, setVibe] = useState("cute");
  const [outfit, setOutfit] = useState("hoodie");
  const [accessories, setAccessories] = useState("none");
  const [religion, setReligion] = useState("none");
  const [imageUrl, setImageUrl] = useState("");

  function handleGenerate() {
    setImageUrl(
      "https://placehold.co/600x600/png?text=Chibi+Preview"
    );
  }

  function handleReset() {
    setPrompt("");
    setImageUrl("");
  }

  return (
    <div style={ui.page}>
      <div style={ui.shell}>
        <header style={ui.header}>
          <h1 style={ui.title}>✨ Chibi Generator</h1>
          <p style={ui.subtitle}>
            Soft pastel · Apple-clean · Friendly
          </p>
        </header>

        <div style={ui.card}>
          <div style={ui.label}>Character description</div>
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. cute girl with glasses and pastel hoodie"
            style={ui.input}
          />

          <ButtonGroup
            label="Style"
            value={style}
            onChange={setStyle}
            options={[
              { label: "Chibi", value: "chibi" },
              { label: "Anime", value: "anime" },
              { label: "Cartoon", value: "cartoon" },
            ]}
          />

          <ButtonGroup
            label="Hair Color"
            value={hair}
            onChange={setHair}
            options={[
              { label: "Pink", value: "pink" },
              { label: "Blonde", value: "blonde" },
              { label: "Blue", value: "blue" },
              { label: "Brown", value: "brown" },
            ]}
          />

          <ButtonGroup
            label="Vibe"
            value={vibe}
            onChange={setVibe}
            options={[
              { label: "Cute", value: "cute" },
              { label: "Soft", value: "soft" },
              { label: "Cozy", value: "cozy" },
              { label: "Dreamy", value: "dreamy" },
            ]}
          />

          <ButtonGroup
            label="Outfit"
            value={outfit}
            onChange={setOutfit}
            options={[
              { label: "Hoodie", value: "hoodie" },
              { label: "Dress", value: "dress" },
              { label: "Sweater", value: "sweater" },
            ]}
          />

          <ButtonGroup
            label="Accessories"
            value={accessories}
            onChange={setAccessories}
            options={[
              { label: "None", value: "none" },
              { label: "Glasses", value: "glasses" },
              { label: "Hair clips", value: "hair-clips" },
            ]}
          />

          <ButtonGroup
            label="Religion / Spiritual context"
            value={religion}
            onChange={setReligion}
            options={[
              { label: "None", value: "none" },
              { label: "Christian", value: "christian" },
              { label: "Muslim", value: "muslim" },
              { label: "Jewish", value: "jewish" },
              { label: "Spiritual", value: "spiritual" },
            ]}
          />

          <div style={ui.actions}>
            <button style={ui.primary} onClick={handleGenerate}>
              Generate
            </button>
            <button style={ui.secondary} onClick={handleReset}>
              Reset
            </button>
          </div>

          {imageUrl && (
            <img src={imageUrl
                      )}
        </div>
      </div>
    </div>
           );
