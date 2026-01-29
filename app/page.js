"use client";

import { useState } from "react";

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("chibi");
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

    const masterPrompt = `
Cute ${style} character, chibi proportions,
big expressive eyes, pastel colors,
soft shading, clean line art.

Description:
${prompt}

Style notes:
- kawaii
- soft lighting
- simple background
`.trim();

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: masterPrompt }),
      });

      const data = await res.json();

      if (!data.ok) {
        throw new Error(data.error || "Image generation failed");
      }

      setImageUrl(data.imageUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>✨ Chibi Generator</h1>
      <p style={styles.subtitle}>Soft pastel • Cute • Friendly</p>

      <textarea
        placeholder="e.g. cute girl with glasses and pastel hoodie"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={styles.textarea}
      />

      <div style={styles.row}>
        <button
          onClick={() => setStyle("chibi")}
          style={style === "chibi" ? styles.active : styles.button}
        >
          Chibi
        </button>
        <button
          onClick={() => setStyle("anime")}
          style={style === "anime" ? styles.active : styles.button}
        >
          Anime
        </button>
        <button
          onClick={() => setStyle("cartoon")}
          style={style === "cartoon" ? styles.active : styles.button}
        >
          Cartoon
        </button>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          ...styles.generate,
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? "Generating…" : "Generate"}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Generated chibi"
          style={styles.image}
        />
      )}
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: 24,
    background: "linear-gradient(180deg, #fdf2f8, #eef2ff)",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro", system-ui, sans-serif',
  },
  title: {
    fontSize: 32,
    fontWeight: 800,
  },
  subtitle: {
    color: "#6b7280",
    marginBottom: 16,
  },
  textarea: {
    width: "100%",
    maxWidth: 600,
    height: 100,
    padding: 12,
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    fontSize: 15,
  },
  row: {
    display: "flex",
    gap: 8,
    marginTop: 12,
  },
  button: {
    padding: "8px 14px",
    borderRadius: 999,
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },
  active: {
    padding: "8px 14px",
    borderRadius: 999,
    border: "1px solid #f9a8d4",
    background: "#fde7f3",
    color: "#9d174d",
    cursor: "pointer",
    fontWeight: 700,
  },
  generate: {
    marginTop: 16,
    padding: "12px 18px",
    borderRadius: 14,
    border: "none",
    background: "#f472b6",
    color: "#fff",
    fontWeight: 800,
    cursor: "pointer",
  },
  image: {
    marginTop: 24,
    maxWidth: 512,
    width: "100%",
    borderRadius: 18,
    border: "1px solid #e5e7eb",
  },
  error: {
    marginTop: 12,
    color: "#dc2626",
    fontWeight: 600,
  },
};
