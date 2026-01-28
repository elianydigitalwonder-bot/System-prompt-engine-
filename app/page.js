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
    padding: 20,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif',
    color: "#1f2937",
  },
  shell: {
    maxWidth: 900,
    margin: "0 auto",
    display: "grid",
    gap: 16,
  },
  header: {
    padding: 18,
    borderRadius: 20,
    background: "rgba(255,255,255,0.85)",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  },
  title: {
    margin: 0,
    fontSize: 34,
    fontWeight: 800,
    letterSpacing: -0.6,
  },
  subtitle: {
    marginTop: 8,
    color: "#6b7280",
  },
  card: {
    borderRadius: 22,
    background: "rgba(255,255,255,0.9)",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  },
  cardInner: {
    padding: 20,
  },
  label: {
    fontWeight: 700,
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 14,
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
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    padding: "10px 14px",
    borderRadius: 999,
    border: "1px solid #e5e7eb",
    background: "#ffffff",
    color: "#374151",
    cursor: "pointer",
    fontWeight: 600,
  },
  chipActive: {
    padding: "10px 14px",
    borderRadius: 999,
    border: "1px solid #f9a8d4",
    background: "#fde7f3",
    color: "#9d174d",
    cursor: "pointer",
    fontWeight: 700,
    boxShadow: "0 6px 14px rgba(236,72,153,0.25)",
  },
  actions: {
    display: "flex",
    gap: 12,
    marginTop: 18,
  },
  primary: (disabled) => ({
    padding: "14px 20px",
    borderRadius: 16,
    border: "none",
    background: disabled ? "#e5e7eb" : "#f472b6",
    color: "#fff",
    fontSize: 16,
    fontWeight: 800,
    cursor: disabled ? "not-allowed" : "pointer",
    boxShadow: "0 10px 24px rgba(236,72,153,0.35)",
  }),
  secondary: {
    padding: "14px 20px",
    borderRadius: 16,
    border: "1px solid #e5e7eb",
    background: "#fff",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
  },
  result: {
    marginTop: 16,
    padding: 14,
    borderRadius: 16,
    background: "#fdf2f8",
    border: "1px solid #fbcfe8",
    fontSize: 13,
    whiteSpace: "pre-wrap",
  },
};

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("chibi");
  const [hairColor, setHairColor] = useState("pink");
  const [vibe, setVibe] = useState("cute");
  const [outfit, setOutfit] = useState("hoodie");
  const [accessories, setAccessories] = useState("none");
  const [religion, setReligion] = useState("none");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleGenerate() {
    const masterPrompt = `
Create a ${style} chibi-style character.

Description:
${prompt}

Hair: ${hairColor}
Outfit: ${outfit}
Accessories: ${accessories}
Vibe: ${vibe}
Religion / spirituality: ${religion}

Art style: pastel colors, soft shading, clean lines, cute proportions.
    `.trim();

    setLoading(true);
    setMessage("Generating...");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: masterPrompt }),
      });

      const data = await res.json();
      setMessage(JSON.stringify(data, null, 2));
    } catch {
      setMessage("Error generating character");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={ui.page}>
      <div style={ui.shell}>
        <header style={ui.header}>
          <h1 style={ui.title}>✨ Chibi Generator</h1>
          <p style={ui.subtitle}>
            Soft pastel • Apple-clean • Friendly
          </p>
        </header>

        <div style={ui.card}>
          <div style={ui.cardInner}>
            <div style={ui.label}>Character description</div>
            <input
              style={ui.input}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. cute girl with glasses and pastel hoodie"
            />

            <ButtonGroup
              label="Style"
              value={style}
              onChange={setStyle}
              options={[
                { value: "chibi", label: "Chibi" },
                { value: "anime", label: "Anime" },
                { value: "cartoon", label: "Cartoon" },
              ]}
            />

            <ButtonGroup
              label="Hair Color"
              value={hairColor}
              onChange={setHairColor}
              options={[
                { value: "pink", label: "Pink" },
                { value: "blonde", label: "Blonde" },
                { value: "blue", label: "Blue" },
                { value: "brown", label: "Brown" },
              ]}
            />

            <ButtonGroup
              label="Vibe"
              value={vibe}
              onChange={setVibe}
              options={[
                { value: "cute", label: "Cute" },
                { value: "soft", label: "Soft" },
                { value: "cozy", label: "Cozy" },
                { value: "dreamy", label: "Dreamy" },
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

            <ButtonGroup
              label="Accessories"
              value={accessories}
              onChange={setAccessories}
              options={[
                { value: "none", label: "None" },
                { value: "glasses", label: "Glasses" },
                { value: "hair clips", label: "Hair clips" },
              ]}
            />

            <ButtonGroup
              label="Religion / Spiritual context"
              value={religion}
              onChange={setReligion}
              options={[
                { value: "none", label: "None" },
                { value: "christian", label: "Christian" },
                { value: "muslim", label: "Muslim" },
                { value: "jewish", label: "Jewish" },
                { value: "spiritual", label: "Spiritual" },
              ]}
            />

            <div style={ui.actions}>
              <button
                onClick={handleGenerate}
                disabled={!prompt || loading}
                style={ui.primary(!prompt || loading)}
              >
                {loading ? "Generating…" : "Generate"}
              </button>

              <button
                onClick={() => {
                  setPrompt("");
                  setMessage("");
                }}
                style={ui.secondary}
              >
                Reset
              </button>
            </div>

            {message && <pre style={ui.result}>{message}</pre>}
          </div>
        </div>
      </div>
    </div>
  );
}
