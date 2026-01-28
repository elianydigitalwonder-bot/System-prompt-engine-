"use client";

import { useState } from "react";

/* ---------- ButtonGroup ---------- */
function ButtonGroup({ label, value, onChange, options }) {
  return (
    <div style={ui.section}>
      <div style={ui.sectionTitle}>{label}</div>
      <div style={ui.chips}>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            style={value === o.value ? ui.chipActive : ui.chip}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- UI ---------- */
const ui = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg,#fdf2f8,#eef2ff)",
    padding: 20,
    fontFamily: "system-ui,-apple-system",
  },
  shell: { maxWidth: 900, margin: "0 auto", display: "grid", gap: 16 },
  card: {
    background: "#fff",
    borderRadius: 20,
    padding: 20,
    boxShadow: "0 20px 40px rgba(0,0,0,.08)",
  },
  h1: { fontSize: 32, fontWeight: 900 },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    marginBottom: 12,
  },
  section: {
    marginTop: 12,
    padding: 12,
    borderRadius: 16,
    background: "#fafafa",
    border: "1px solid #eee",
  },
  sectionTitle: { fontWeight: 800, marginBottom: 8 },
  chips: { display: "flex", flexWrap: "wrap", gap: 8 },
  chip: {
    padding: "8px 14px",
    borderRadius: 999,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },
  chipActive: {
    padding: "8px 14px",
    borderRadius: 999,
    border: "1px solid #f472b6",
    background: "#fde7f3",
    cursor: "pointer",
    fontWeight: 800,
  },
  actions: { display: "flex", gap: 12, marginTop: 16 },
  primary: {
    padding: "14px 20px",
    borderRadius: 14,
    border: "none",
    background: "#f472b6",
    color: "#fff",
    fontWeight: 900,
    cursor: "pointer",
  },
  preview: {
    height: 320,
    borderRadius: 18,
    border: "1px solid #eee",
    display: "grid",
    placeItems: "center",
    fontSize: 36,
    fontWeight: 900,
    color: "#9ca3af",
  },
  img: { width: "100%", borderRadius: 18 },
  error: { color: "#b91c1c", fontWeight: 800, marginTop: 12 },
  debug: {
    whiteSpace: "pre-wrap",
    fontSize: 12,
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
};

/* ---------- PAGE ---------- */
export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("chibi");
  const [hair, setHair] = useState("pink");
  const [outfit, setOutfit] = useState("hoodie");

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [debug, setDebug] = useState("");

  async function handleGenerate() {
    setLoading(true);
    setError("");
    setImageUrl("");
    setDebug("");

    const finalPrompt = `
SUPER-DEFORMED CHIBI CHARACTER.
Big head (60%), tiny body, short limbs.
Cute face, pastel colors, clean lines.

Hair: ${hair}
Outfit: ${outfit}

User description:
${prompt || "cute friendly character"}

DO NOT be realistic.
ONE character only.
Full body visible.
`.trim();

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      const data = await res.json();
      setDebug(JSON.stringify(data, null, 2));

      if (!res.ok || !data.ok) {
        setError(data.error || "Generation failed");
      } else {
        setImageUrl(data.imageUrl);
      }
    } catch (e) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={ui.page}>
      <div style={ui.shell}>
        <div style={ui.card}>
          <h1 style={ui.h1}>✨ Chibi Generator</h1>

          <input
            style={ui.input}
            placeholder="Extra description (optional)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <ButtonGroup
            label="Style"
            value={style}
            onChange={setStyle}
            options={[{ value: "chibi", label: "Chibi" }]}
          />

          <ButtonGroup
            label="Hair Color"
            value={hair}
            onChange={setHair}
            options={[
              { value: "pink", label: "Pink" },
              { value: "blue", label: "Blue" },
              { value: "blonde", label: "Blonde" },
              { value: "brown", label: "Brown" },
              { value: "black", label: "Black" },
            ]}
          />

          <ButtonGroup
            label="Outfit"
            value={outfit}
            onChange={setOutfit}
            options={[
              { value: "hoodie", label: "Hoodie" },
              { value: "dress", label: "Dress" },
              { value: "sweater", label: "Sweater" },
            ]}
          />

          <div style={ui.actions}>
            <button style={ui.primary} onClick={handleGenerate}>
              {loading ? "Generating…" : "Generate"}
            </button>
          </div>

          {error && <div style={ui.error}>{error}</div>}
          {debug && <pre style={ui.debug}>{debug}</pre>}
        </div>

        <div style={ui.card}>
          {imageUrl ? (
            <img src={imageUrl} alt="Result" style={ui.img} />
          ) : (
            <div style={ui.preview}>Preview</div>
          )}
        </div>
      </div>
    </div>
  );
}
