"use client";

import { useState } from "react";

function ButtonGroup({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>{label}</div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              style={{
                padding: "10px 16px",
                borderRadius: 999,
                border: active ? "1px solid #f9a8d4" : "1px solid #e5e7eb",
                background: active ? "#fde7f3" : "#fff",
                color: active ? "#9d174d" : "#374151",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Chibi");
  const [hair, setHair] = useState("Pink");
  const [vibe, setVibe] = useState("Cute");
  const [outfit, setOutfit] = useState("Hoodie");
  const [accessories, setAccessories] = useState("None");
  const [religion, setReligion] = useState("None");

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  async function handleGenerate() {
    setLoading(true);
    setError("");
    setImageUrl("");

    const masterPrompt = `
${style} chibi character.
${prompt}
Hair: ${hair}
Outfit: ${outfit}
Vibe: ${vibe}
Accessories: ${accessories}
Religion / spiritual context: ${religion}
Pastel colors, soft shading, cute proportions.
    `.trim();

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: masterPrompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Generation failed");
      }

      setImageUrl(data.imageUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #fdf2f8, #eef2ff)",
        padding: 24,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui',
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          background: "rgba(255,255,255,0.9)",
          borderRadius: 24,
          padding: 24,
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ fontSize: 32, fontWeight: 800 }}>
          ✨ Chibi Generator
        </h1>
        <p style={{ color: "#6b7280" }}>
          Soft pastel • Apple-clean • Friendly
        </p>

        <div style={{ marginTop: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>
            Character description
          </div>
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. cute girl with glasses and pastel hoodie"
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 14,
              border: "1px solid #e5e7eb",
              fontSize: 16,
            }}
          />
        </div>

        <ButtonGroup
          label="Style"
          value={style}
          onChange={setStyle}
          options={["Chibi", "Anime", "Cartoon"]}
        />

        <ButtonGroup
          label="Hair Color"
          value={hair}
          onChange={setHair}
          options={["Pink", "Blonde", "Blue", "Brown"]}
        />

        <ButtonGroup
          label="Vibe"
          value={vibe}
          onChange={setVibe}
          options={["Cute", "Soft", "Cozy", "Dreamy"]}
        />

        <ButtonGroup
          label="Outfit"
          value={outfit}
          onChange={setOutfit}
          options={["Hoodie", "Dress", "Sweater"]}
        />

        <ButtonGroup
          label="Accessories"
          value={accessories}
          onChange={setAccessories}
          options={["None", "Glasses", "Hair clips"]}
        />

        <ButtonGroup
          label="Religion / Spiritual context"
          value={religion}
          onChange={setReligion}
          options={["None", "Christian", "Muslim", "Jewish", "Spiritual"]}
        />

        <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              padding: "14px 24px",
              borderRadius: 16,
              border: "none",
              background: loading ? "#e5e7eb" : "#f472b6",
              color: "#fff",
              fontWeight: 800,
              fontSize: 16,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Generating…" : "Generate"}
          </button>
        </div>

        {error && (
          <p style={{ color: "red", marginTop: 16 }}>{error}</p>
        )}

        <div style={{ marginTop: 30 }}>
          <h3>Chibi Preview</h3>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Chibi preview"
              style={{
                maxWidth: "100%",
                borderRadius: 20,
                border: "1px solid #e5e7eb",
              }}
            />
          ) : (
            <div
              style={{
                height: 300,
                borderRadius: 20,
                border: "1px dashed #d1d5db",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#9ca3af",
              }}
            >
              No image yet
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
