"use client";

export default function Home() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>✨ Chibi Generator</h1>

      <p>
        Welcome! This is the front page of your future chibi character generator.
      </p>

      <button
        onClick={() => alert("Chibi generation coming soon!")}
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Generate Chibi
      </button>
    </main>
  );
}
