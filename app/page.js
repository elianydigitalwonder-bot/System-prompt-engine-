export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      padding: "2rem",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont"
    }}>
      <h1>🎨 Chibi Generator</h1>

      <p>
        Create high-quality, customizable chibi characters using AI.
      </p>

      <section style={{ marginTop: "2rem" }}>
        <h2>What this app will do</h2>
        <ul>
          <li>Generate chibi characters from prompts</li>
          <li>Customize style, outfits, accessories, vibes</li>
          <li>Professional-grade results (beyond Canva)</li>
        </ul>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Status</h2>
        <p>
          🚧 Frontend in progress. API is live.
        </p>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Next steps</h2>
        <ul>
          <li>Add input form</li>
          <li>Connect to /api/generate</li>
          <li>Show generated images</li>
          <li>Auth + payments</li>
        </ul>
      </section>
    </main>
  );
}
