"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("chibi");
  const [message, setMessage] = useState("");

  async function handleGenerate() {
    setMessage("Generating...");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style }),
      });

      const data = await res.json();
      setMessage(JSON.stringify(data, null, 2));
    } catch (err) {
      setMessage("Error generating character");
    }
  }

  return (
    <main
      style={{
        padding: 40,
        fontFamily: "Arial, sans-serif",
        maxWidth: 700,
      }}
    >
      <h1>✨ Chibi Generator</h1>

      <p>Describe your character and pick a style.</p>

      <label style={{ display: "block", marginTop: 16, fontWeight: "bold" }}>
        Character description
      </label>

      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g. a brave girl with pink hair and a hoodie"
        style={{
          width: "100%",
          padding: 10,
          marginTop: 8,
          fontSize: 16,
        }}
      />

      <label style={{ display: "block", marginTop: 16, fontWeight: "bold" }}>
        Style
      </label>

      <select
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        style={{
          marginTop: 8,
          padding: 8,
          fontSize: 16,
        }}
      >
        <option value="chibi">Chibi</option>
        <option value="anime">Anime</option>
        <option value="cartoon">Cartoon</option>
      </select>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={handleGenerate}
          style={{
            padding: "12px 20px",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Generate
        </button>
      </div>

      {message && (
        <pre
          style={{
            marginTop: 20,
            padding: 16,
            background: "#f4f4f4",
            whiteSpace: "pre-wrap",
          }}
        >
          {message}
        </pre>
      )}
    </main>
  );
}
