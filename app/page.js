"use client";

import { useState } from "react";

function ButtonGroup({ label, value, onChange, options }) {
  return (
    <div style={styles.group}>
      <div style={styles.groupLabel}>{label}</div>
      <div style={styles.chips}>
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              style={active ? styles.chipActive : styles.chip}
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
  const [description, setDescription] = useState("");
  const [style, setStyle] = useState("Chibi");
  const [hair, setHair] = useState("Pink");
  const [vibe, setVibe] = useState("Cute");
  const [outfit, setOutfit] = useState("Hoodie");
  const [accessory, setAccessory] = useState("None");
  const [religion, setReligion] = useState("None");

  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);

    // TEMP placeholder image so UI works
    setTimeout(() => {
      setImageUrl(
        "https://placehold.co/600x600/png?text=Chibi+Preview"
      );
      setLoading(false);
    }, 800);
  }

  function handleReset() {
    setDescription("");
    setImageUrl("");
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>✨ Chibi Generator</h1>
        <p style={styles.subtitle}>
          Soft pastel · Apple-clean · Friendly
        </p>

        <input
          placeholder="e.g. cute girl with glasses and pastel hoodie"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
        />

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
          value={accessory}
          onChange={setAccessory}
          options={["None", "Glasses", "Hair clips"]}
        />

        <ButtonGroup
          label="Religion / Spiritual context"
          value={religion}
          onChange={setReligion}
          options={["None", "Christian", "Muslim", "Jewish", "Spiritual"]}
        />

        <div style={styles.actions}>
          <button
            onClick={handleGenerate}
            disabled={loading}
            style={styles.primary(loading)}
          >
            {loading ? "Generating…" : "Generate"}
          </button>

          <button onClick={handleReset} style={styles.secondary}>
            Reset
          </button>
        </div>

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            style={styles.preview}
          />
        )}
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg,#fdf2f8,#eef2ff)",
    padding: 24,
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"SF Pro Text",system-ui',
  },
  card: {
    maxWidth: 720,
    margin: "0 auto",
    background: "rgba(255,255,255,0.9)",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 30px 60px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: 32,
    fontWeight: 800,
    marginBottom: 4,
  },
  subtitle: {
    color: "#6b7280",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    border: "1px solid #e5e7eb",
    marginBottom: 16,
    fontSize: 15,
  },
  group: {
    marginBottom: 14,
  },
  groupLabel: {
    fontWeight: 700,
    marginBottom: 8,
    fontSize: 14,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    padding: "10px 14px",
    borderRadius: 999,
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },
  chipActive: {
    padding: "10px 14px",
    borderRadius: 999,
    border: "1px solid #f9a8d4",
    background: "#fde7f3",
    color: "#9d174d",
    fontWeight: 700,
  },
  actions: {
    display: "flex",
    gap: 12,
    marginTop: 20,
  },
  primary: (disabled) => ({
    padding: "14px 20px",
    borderRadius: 16,
    border: "none",
    background: disabled ? "#e5e7eb" : "#f472b6",
    color: "#fff",
    fontWeight: 800,
    cursor: disabled ? "not-allowed" : "pointer",
  }),
  secondary: {
    padding: "14px 20px",
    borderRadius: 16,
    border: "1px solid #e5e7eb",
    background: "#fff",
    fontWeight: 700,
  },
  preview: {
    marginTop: 24,
    width: "100%",
    borderRadius: 18,
  },
};
