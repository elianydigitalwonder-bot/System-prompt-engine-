"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("chibi");
  const [message, setMessage] = useState("");

  function handleGenerate() {
    setMessage(`Got it! Style: ${style}. Prompt: ${prompt || "(empty)"}`);
  }

  return (
    <main style={{ padding: "40px", fontFamily: "Arial, sans-serif", maxWidth: 700 }}>
      <h1>✨ Chibi Generator</h1>

      <p>Describe your character and pick a style. (We’ll connect the AI next.)</p>

      <label style={{ display: "block", marginTop: 16, fontWeight: "bold" }}>
        Character description
      </label>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder='e.g. "A brave girl with pink hair and a hoodie"'
        style={{ width: "100%", padding: 10, marginTop: 8, fontSize: 16 }}
      />

      <label style={{ display: "block", marginTop: 16, fontWeight: "bold" }}>
        Style
      </label>
      <select
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 8, fontSize: 16 }}
      >
        <option value="chibi">Chibi</option>
        <option value="anime">Anime</option>
        <option value="watercolor">Watercolor</option>
        <option value="pixel">Pixel</option>
      </select>

      <button
        onClick={handleGenerate}
        style={{
          marginTop: 20,
          padding: "12px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Generate
      </button>

      {message ? (
        <p style={{ marginTop: 16 }}>
          <strong>{message}</strong>
        </p>
      ) : null}
    </main>
  );
}
