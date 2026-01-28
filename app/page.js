"use client";

import { useState } from "react";

function ButtonGroup({ label, value, onChange, options }) {
  return (
    <section style={ui.section}>
      <div style={ui.sectionHeader}>
        <div style={ui.sectionTitle}>{label}</div>
      </div>

      <div style={ui.chipGrid}>
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              style={selected ? ui.chipSelected : ui.chip}
              aria-pressed={selected}
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
    background: "linear-gradient(180deg, #0b1020 0%, #0f172a 100%)",
    padding: 18,
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Apple Color Emoji","Segoe UI Emoji"',
    color: "#e5e7eb",
  },
  shell: {
    maxWidth: 920,
    margin: "0 auto",
    display: "grid",
    gap: 14,
  },
  headerCard: {
    borderRadius: 18,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
    padding: 18,
  },
  title: {
    margin: 0,
    fontSize: 32,
    letterSpacing: -0.5,
  },
  subtitle: {
    margin: "8px 0 0",
    color: "rgba(229,231,235,0.80)",
    lineHeight: 1.4,
  },
  card: {
    borderRadius: 18,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
    overflow: "hidden",
  },
  cardInner: {
    padding: 18,
  },
  fieldLabelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 10,
    marginBottom: 8,
  },
  fieldLabel: {
    fontWeight: 800,
    fontSize: 13,
    color: "rgba(229,231,235,0.95)",
  },
  fieldHint: {
    fontSize: 12,
    color: "rgba(229,231,235,0.65)",
  },
  input: {
    width: "100%",
    padding: "12px 12px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.16)",
    background: "rgba(0,0,0,0.25)",
    color: "#e5e7eb",
    outline: "none",
    fontSize: 15,
  },
  divider: {
    height: 1,
    background: "rgba(255,255,255,0.08)",
    margin: "16px 0",
  },
  section: {
    padding: 14,
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.18)",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: 800,
    fontSize: 13,
    color: "rgba(229,231,235,0.92)",
    letterSpacing: 0.2,
  },
  chipGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    padding: "10px 12px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.05)",
    color: "rgba(229,231,235,0.92)",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 13,
  },
  chipSelected: {
    padding: "10px 12px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.22)",
    background: "rgba(255,255,255,0.92)",
    color: "#0b1020",
    cursor: "pointer",
    fontWeight: 800,
    fontSize: 13,
    boxShadow: "0 10px 22px rgba(255,255,255,0.12)",
  },
  actionsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
    marginTop: 14,
  },
  primaryBtn: (disabled) => ({
    padding: "12px 16px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.18)",
    background: disabled
      ? "rgba(148,163,184,0.35)"
      : "linear-gradient(180deg, rgba(124,92,255,0.95), rgba(88,68,255,0.85))",
    color: "#fff",
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: 900,
    letterSpacing: 0.2,
  }),
  ghostBtn: (disabled) => ({
    padding: "12px 16px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    color: "rgba(229,231,235,0.92)",
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: 800,
  }),
  results: {
    marginTop: 14,
    padding: 14,
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.35)",
    color: "#e5e7eb",
    whiteSpace: "pre-wrap",
    overflowX: "auto",
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: 12.5,
    lineHeight: 1.5,
  },
  footerHint: {
    marginTop: 10,
    fontSize: 12,
    color: "rgba(229,231,235,0.60)",
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

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    const masterPrompt = `
Create a ${style} chibi-style character.

Character description:
${prompt || "No description provided"}

Appearance:
- Hair color: ${hairColor}
- Outfit: ${outfit}
- Accessories: ${accessories}

Personality & mood:
- Vibe: ${vibe}

Cultural / spiritual context:
- Religion or spirituality: ${religion}

Art direction:
Cute proportions, big expressive eyes, clean line art, soft shading, high-quality illustration.
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
    } catch (err) {
      setMessage("Error generating character");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setPrompt("");
    setStyle("chibi");
    setHairColor("pink");
    setVibe("cute");
    setOutfit("hoodie");
    setAccessories("none");
    setReligion("none");
    setMessage("");
  }

  const canGenerate = prompt.trim().length > 0 && !loading;

  return (
    <div style={ui.page}>
      <div style={ui.shell}>
        <header style={ui.headerCard}>
          <h1 style={ui.title}>✨ Chibi Generator</h1>
          <p style={ui.subtitle}>
            Pick options like a real product form. Next we can replace the JSON
            with an image preview.
          </p>
        </header>

        <div style={ui.card}>
          <div style={ui.cardInner}>
            <div style={ui.fieldLabelRow}>
              <div style={ui.fieldLabel}>Character description</div>
              <div style={ui.fieldHint}>Try: “pink hair hoodie glasses”</div>
            </div>

            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. brave girl with glasses and a hoodie"
              style={ui.input}
            />

            <div style={ui.divider} />

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
                { value: "black", label: "Black" },
                { value: "blonde", label: "Blonde" },
                { value: "blue", label: "Blue" },
              ]}
            />

            <ButtonGroup
              label="Vibe"
              value={vibe}
              onChange={setVibe}
              options={[
                { value: "cute", label: "Cute" },
                { value: "cool", label: "Cool" },
                { value: "soft", label: "Soft" },
                { value: "edgy", label: "Edgy" },
              ]}
            />

            <ButtonGroup
              label="Outfit"
              value={outfit}
              onChange={setOutfit}
              options={[
                { value: "hoodie", label: "Hoodie" },
                { value: "dress", label: "Dress" },
                { value: "jacket", label: "Jacket" },
                { value: "school uniform", label: "School Uniform" },
              ]}
            />

            <ButtonGroup
              label="Accessories"
              value={accessories}
              onChange={setAccessories}
              options={[
                { value: "none", label: "None" },
                { value: "glasses", label: "Glasses" },
                { value: "hat", label: "Hat" },
                { value: "earrings", label: "Earrings" },
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
                { value: "hindu", label: "Hindu" },
                { value: "buddhist", label: "Buddhist" },
                { value: "spiritual", label: "Spiritual" },
              ]}
            />

            <div style={ui.actionsRow}>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={!canGenerate}
                style={ui.primaryBtn(!canGenerate)}
              >
                {loading ? "Generating..." : "Generate"}
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                style={ui.ghostBtn(loading)}
              >
                Reset
              </button>
            </div>

            {message ? <pre style={ui.results}>{message}</pre> : null}

            <div style={ui.footerHint}>
              Want it even nicer? Next we can add icons + two-column sections +
              an image preview panel.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
