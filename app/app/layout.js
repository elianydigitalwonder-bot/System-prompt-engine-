export const metadata = {
  title: "Chibi Generator",
  description: "AI-powered chibi character generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
