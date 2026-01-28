"use client";

import { useState } from "react";

function ButtonGroup({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontWeight: "bold", display: "block", marginBottom: 6 }}>
        {label}
      </label>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              padding: "8px 14px",
              borderRadius: 10,
              border: "1px solid #ccc",
              background: value === opt.value ? "#222" : "#fff",
              color: value === opt.value ? "#fff" : "#000",
              cursor: "pointer"
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("chibi");
  const [hairColor, setHairColor] = useState("pink");
  const [vibe, setVibe] = useState("cute");
  const [outfit, setOutfit] = useState("hoodie");
  const [accessories, setAccessories] = useState("none");
  const [religion, setReligion] = useState("none");
  const [message, setMessage] = useState("");

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

    setMessage("Generating...");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: masterPrompt })
      });

      const data = await res.json();
      setMessage(JSON.stringify(data, null, 2));
    } catch (err) {
      setMessage("Error generating character");
    }
  }

  return (
    <main style={{ padding: 40, fontFamily: "Arial, sans-serif", maxWidth: 720 }}>
      <h1>✨ Chibi Generator</h1>
      <p>Describe your character and customize everything.</p>

      <label style={{ fontWeight: "bold" }}>Character description</label>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g. brave girl with glasses and a hoodie"
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 20,
          marginTop: 6
        }}
      />

      <ButtonGroup
        label="Style"
        value={style}
        onChange={setStyle}
        options={[
          { value: "chibi", label: "chibi" },
          { value: "anime", label: "anime" },
          { value: "cartoon", label: "cartoon" }
        ]}
      />

      <ButtonGroup
        label="Hair Color"
        value={hairColor}
        onChange={setHairColor}
        options={[
          { value: "pink", label: "pink" },
          { value: "black", label: "black" },
          { value: "blonde", label: "blonde" },
          { value: "blue", label: "blue" }
        ]}
      />

      <ButtonGroup
        label="Vibe"
        value={vibe}
        onChange={setVibe}
        options={[
          { value: "cute", label: "cute" },
          { value: "cool", label: "cool" },
          { value: "soft", label: "soft" },
          { value: "edgy", label: "edgy" }
        ]}
      />

      <ButtonGroup
        label="Outfit"
        value={outfit}
        onChange={setOutfit}
        options={[
          { value: "hoodie", label: "hoodie" },
          { value: "dress", label: "dress" },
          { value: "jacket", label: "jacket" },
          { value: "school uniform", label: "school uniform" }
        ]}
      />

      <ButtonGroup
        label="Accessories"
        value={accessories}
        onChange={setAccessories}
        options={[
          { value: "none", label: "none" },
          { value: "glasses", label: "glasses" },
          { value: "hat", label: "hat" },
          { value: "earrings", label: "earrings" }
        ]}
      />

      <ButtonGroup
        label="Religion / Spiritual context"
        value={religion}
        onChange={setReligion}
        options={[
          { value: "none", label: "none" },
          { value: "christian", label: "christian" },
          { value: "muslim", label: "muslim" },
          { value: "jewish", label: "jewish" },
          { value: "hindu", label: "hindu" },
          { value: "buddhist", label: "buddhist" },
          { value: "spiritual", label: "spiritual" }
        ]}
      />

      <button
        onClick={handleGenerate}
        style={{
          marginTop: 20,
          padding: "14px 28px",
          fontSize: 16,
          borderRadius: 12,
          border: "none",
          background: "#222",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        Generate
      </button>

      <pre
        style={{
          marginTop: 20,
          background: "#f4f4f4",
          padding: 16,
          whiteSpace: "pre-wrap"
        }}
      >
        {message}
      </pre>
    </main>
  );
}
