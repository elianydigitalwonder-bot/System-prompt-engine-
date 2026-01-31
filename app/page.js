"use client";

import { useState } from "react";

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [styleMode, setStyleMode] = useState("balanced"); // chibi | balanced | fashion
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  async function handleGenerate() {
    if (!prompt.trim()) {
      setError("Please describe your character first.");
      return;
    }

    setLoading(true);
    setError("");
    setImageUrl("");

    const STYLE_BLOCKS = {
      chibi: `
Chibi illustration with cute proportions.
Slightly oversized head, big expressive eyes.
Soft pastel colors, kawaii aesthetic.
`,
      balanced: `
Semi-realistic illustration with elegant, balanced proportions.
Natural head-to-body ratio (NO oversized head).
Refined facial features, subtle eye size.
Soft airbrushed shading, fashion-forward look.
`,
      fashion: `
High-end fashion editorial illustration.
Fully realistic proportions (NO chibi, NO cartoon).
Natural head size, cinematic lighting.
Luxury aesthetic, photorealistic skin texture.
`,
    };

    const masterPrompt = `
${STYLE_BLOCKS[styleMode]}

Character description:
${prompt}

Rules:
- Avoid oversized head unless chibi is selected
- Elegant, premium look
- Clean composition, professional fashion vibe
`.trim();

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: masterPrompt }),
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Generation failed");

      setImageUrl(data.imageUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 20 }}>
      <h1>✨ Style-Controlled Character Generator</h1>

      <textarea
        placeholder="Describe your character (fashion, pose, mood, outfit…) "
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        style={{ width: "100%", padding: 12, marginTop: 12 }}
      />

      {/* STYLE BUTTONS */}
      <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
        {[
          { value: "chibi", label: "Chibi (Big head)" },
          { value: "balanced", label: "Balanced (Elegant)" },
          { value: "fashion", label: "Fashion (Realistic)" },
        ].map((opt) => (
          <button
            key={opt.value}
            onClick={() => setStyleMode(opt.value)}
            type="button"
            style={{
              padding: "10px 14px",
              borderRadius: 999,
              border:
                styleMode === opt.value
                  ? "1px solid #ec4899"
                  : "1px solid #ddd",
              background:
                styleMode === opt.value ? "#fde7f3" : "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          marginTop: 16,
          padding: "12px 20px",
          fontWeight: 800,
          borderRadius: 8,
          background: "#ec4899",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Generating…" : "Generate"}
      </button>

      {error && <p style={{ color: "red", marginTop: 12 }}>{error}</p>}

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Generated"
          style={{ width: "100%", marginTop: 24, borderRadius: 12 }}
        />
      )}
    </main>
  );
}
