"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("chibi");
  const [hair, setHair] = useState("pink");
  const [vibe, setVibe] = useState("cute");
  const [outfit, setOutfit] = useState("hoodie");
  const [message, setMessage] = useState("");

  async function handleGenerate() {
    setMessage("Generating...");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          style,
          hair,
          vibe,
          outfit,
        }),
      });

      const data = await res.json();
      setMessage(JSON.stringify(data, null, 2));
    } catch (err) {
      setMessage("Error generating character");
    }
  }

  const buttonStyle = (active) => ({
    padding: "8px 14px",
    borderRadius: 8,
    border: active ? "2px solid black" : "1px solid #ccc",
    background: active ? "#222" : "#fff",
    color: active ? "#fff" : "#000",
    cursor: "pointer",
  });

  return (
    <main style={{ padding: 40, fontFamily: "Arial, sans-serif", maxWidth: 600 }}>
      <h1>✨ Chibi Generator</h1>
      <p>Describe your character and customize the look.</p>

      <label>Character description</label>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g. brave girl with a hoodie"
        style={{ width: "100%", padding: 10, marginBottom: 20 }}
      />

      <label>Style</label>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["chibi", "anime", "cartoon"].map((s) => (
          <button key={s} onClick={() => setStyle(s)} style={buttonStyle(style === s)}>
            {s}
          </button>
        ))}
      </div>

      <label>Hair Color</label>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["pink", "black", "blonde", "blue"].map((h) => (
          <button key={h} onClick={() => setHair(h)} style={buttonStyle(hair === h)}>
            {h}
          </button>
        ))}
      </div>

      <label>Vibe</label>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["cute", "cool", "soft", "edgy"].map((v) => (
          <button key={v} onClick={() => setVibe(v)} style={buttonStyle(vibe === v)}>
            {v}
          </button>
        ))}
      </div>

      <label>Outfit</label>
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {["hoodie", "dress", "jacket", "school uniform"].map((o) => (
          <button key={o} onClick={() => setOutfit(o)} style={buttonStyle(outfit === o)}>
            {o}
          </button>
        ))}
      </div>

      <button
        onClick={handleGenerate}
        style={{ padding: "12px 20px", cursor: "pointer", fontSize: 16 }}
      >
        Generate
      </button>

      <pre style={{ marginTop: 20, background: "#f4f4f4", padding: 12 }}>
        {message}
      </pre>
    </main>
  );
}
