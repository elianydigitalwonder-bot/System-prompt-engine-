"use client";

import { useState } from "react";

function ButtonGroup({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>{label}</div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              style={{
                padding: "10px 16px",
                borderRadius: 999,
                border: active
                  ? "1px solid #f9a8d4"
                  : "1px solid #e5e7eb",
                background: active ? "#fde7f3" : "#fff",
                color: active ? "#9d174d" : "#374151",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("chibi");
  const [hair, setHair] = useState("pink");
  const [vibe, setVibe] = useState("cute");
  const [outfit, setOutfit] = useState("hoodie");
  const [accessories, setAccessories] = useState("none");
  const [religion, setReligion] = useState("none");

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  async function handleGenerate() {
    setLoading(true);
    setImageUrl("");

    // Placeholder image for now
    setTimeout(() => {
      setImageUrl(
        "https://placehold.co/600x600/png?text=Chibi+Preview"
      );
      setLoading(false);
    }, 800);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#fdf2f8,#eef2ff)",
        padding: 24,
        fontFamily:
          '-apple-system,BlinkMacSystemFont,"SF Pro Text",system-ui',
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: 34, fontWeight: 800 }}>✨ Chibi Generator</h1>
        <p style={{ color: "#6b7280" }}>
          Soft pastel • Apple-clean • Friendly
        </p>

        <div
          style={{
            background: "#fff",
            borderRadius: 24,
            padding: 24,
            marginTop: 24,
            boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
          }}
        >
          <label style={{ fontWeight: 700 }}>Character description</label>
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. cute girl with glasses and pastel hoodie"
            style={{
              width: "100%",
              padding: 14,
              marginTop: 8,
              marginBottom: 24,
              borderRadius: 14,
              border: "1px solid #e5e7eb",
            }}
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
              { label: "Hair clips", value: "clips" },
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

          <button
            onClick={handleGenerate}
            disabled={loading || !prompt}
            style={{
              marginTop: 20,
              padding: "14px 22px",
              borderRadius: 16,
              border: "none",
              background: loading || !prompt ? "#e5e7eb" : "#f472b6",
              color: "#fff",
              fontWeight: 800,
              cursor:
                loading || !prompt ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Generating…" : "Generate"}
          </button>
        </div>

        <div
          style={{
            marginTop: 30,
            background: "#fff",
            borderRadius: 24,
            padding: 20,
            boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Chibi preview"
              style={{
                width: "100%",
                maxWidth: 500,
                borderRadius: 20,
              }}
            />
          ) : (
            <div style={{ color: "#9ca3af", fontWeight: 700 }}>
              Chibi Preview
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
