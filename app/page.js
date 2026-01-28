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

  return (
    <main style={{ padding: 40, fontFamily: "Arial, sans-serif", maxWidth: 700 }}>
      <h1>✨ Chibi Generator</h1>
      <p>Describe your character and customize the look.</p>

      <label>Character description</label>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g. brave girl with a hoodie"
        style={{ width: "100%", padding: 10, marginBottom: 16 }}
      />

      <label>Style</label>
      <select value={style} onChange={(e) => setStyle(e.target.value)}>
        <option value="chibi">Chibi</option>
        <option value="anime">Anime</option>
        <option value="cartoon">Cartoon</option>
      </select>

      <label>Hair Color</label>
      <select value={hair} onChange={(e) => setHair(e.target.value)}>
        <option value="pink">Pink</option>
        <option value="black">Black</option>
        <option value="blonde">Blonde</option>
        <option value="blue">Blue</option>
      </select>

      <label>Vibe</label>
      <select value={vibe} onChange={(e) => setVibe(e.target.value)}>
        <option value="cute">Cute</option>
        <option value="cool">Cool</option>
        <option value="soft">Soft</option>
        <option value="edgy">Edgy</option>
      </select>

      <label>Outfit</label>
      <select value={outfit} onChange={(e) => setOutfit(e.target.value)}>
        <option value="hoodie">Hoodie</option>
        <option value="dress">Dress</option>
        <option value="jacket">Jacket</option>
        <option value="school uniform">School Uniform</option>
      </select>

      <br /><br />

      <button
        onClick={handleGenerate}
        style={{ padding: "12px 20px", cursor: "pointer" }}
      >
        Generate
      </button>

      <pre style={{ marginTop: 20, background: "#f4f4f4", padding: 12 }}>
        {message}
      </pre>
    </main>
  );
}
