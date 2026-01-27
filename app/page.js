"use client";

import { useMemo, useState } from "react";

export default function Home() {
  // Core
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("chibi");

  // Identity
  const [ethnicity, setEthnicity] = useState("user-selected");
  const [skinTone, setSkinTone] = useState("user-selected");
  const [ageGroup, setAgeGroup] = useState("teen");
  const [genderPresentation, setGenderPresentation] = useState("user-selected");

  // Hair
  const [hairType, setHairType] = useState("user-selected");
  const [hairStyle, setHairStyle] = useState("user-selected");
  const [hairColor, setHairColor] = useState("user-selected");

  // Beauty
  const [makeupLevel, setMakeupLevel] = useState("natural");
  const [lipStyle, setLipStyle] = useState("user-selected");
  const [nailsEnabled, setNailsEnabled] = useState(false);

  // Fashion / vibe
  const [fashionEra, setFashionEra] = useState("modern");
  const [vibe, setVibe] = useState("stylish");
  const [outfitCategory, setOutfitCategory] = useState("user-selected");

  // Scene
  const [background, setBackground] = useState("simple");
  const [pose, setPose] = useState("standing");
  const [mood, setMood] = useState("happy");
  const [accessories, setAccessories] = useState("none");

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const payload = useMemo(() => {
    return {
      prompt,
      style,
      ethnicity,
      skinTone,
      ageGroup,
      genderPresentation,
      hairType,
      hairStyle,
      hairColor,
      makeupLevel,
      lipStyle,
      nails: { enabled: nailsEnabled },
      fashionEra,
      vibe,
      outfitCategory,
      background,
      pose,
      mood,
      accessories,
    };
  }, [
    prompt,
    style,
    ethnicity,
    skinTone,
    ageGroup,
    genderPresentation,
    hairType,
    hairStyle,
    hairColor,
    makeupLevel,
    lipStyle,
    nailsEnabled,
    fashionEra,
    vibe,
    outfitCategory,
    background,
    pose,
    mood,
    accessories,
  ]);

  async function handleGenerate() {
    setIsLoading(true);
    setErrorMsg("");
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data?.error || "Request failed");
      } else {
        setResult(data);
      }
    } catch (err) {
      setErrorMsg("Network error");
    } finally {
      setIsLoading(false);
    }
  }

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#0b1020",
      color: "#e8ecff",
      padding: 24,
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    },
    shell: {
      maxWidth: 980,
      margin: "0 auto",
      display: "grid",
      gap: 16,
    },
    header: {
      padding: 18,
      borderRadius: 16,
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.10)",
    },
    title: { fontSize: 34, margin: 0, letterSpacing: 0.2 },
    sub: { marginTop: 8, opacity: 0.85, lineHeight: 1.4 },
    grid: {
      display: "grid",
      gap: 16,
      gridTemplateColumns: "1fr 1fr",
    },
    card: {
      borderRadius: 16,
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.10)",
      padding: 16,
    },
    cardTitle: {
      margin: 0,
      marginBottom: 12,
      fontSize: 16,
      letterSpacing: 0.2,
      opacity: 0.95,
    },
    label: { display: "block", fontSize: 13, opacity: 0.85, marginBottom: 6 },
    input: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.18)",
      background: "rgba(0,0,0,0.25)",
      color: "#e8ecff",
      outline: "none",
      fontSize: 14,
    },
    textarea: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.18)",
      background: "rgba(0,0,0,0.25)",
      color: "#e8ecff",
      outline: "none",
      fontSize: 14,
      minHeight: 90,
      resize: "vertical",
    },
    row2: { display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" },
    row3: { display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr 1fr" },
    toggleRow: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginTop: 10,
      padding: 12,
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.10)",
      background: "rgba(0,0,0,0.18)",
    },
    btnRow: { display: "flex", gap: 12, alignItems: "center", marginTop: 12 },
    button: {
      padding: "12px 14px",
      borderRadius: 14,
      border: "1px solid rgba(255,255,255,0.18)",
      background: "linear-gradient(180deg, rgba(124,92,255,0.95), rgba(88,68,255,0.85))",
      color: "white",
      fontWeight: 700,
      cursor: "pointer",
      minWidth: 140,
    },
    secondary: {
      padding: "12px 14px",
      borderRadius: 14,
      border: "1px solid rgba(255,255,255,0.18)",
      background: "rgba(255,255,255,0.06)",
      color: "#e8ecff",
      cursor: "pointer",
      minWidth: 140,
    },
    help: { fontSize: 12, opacity: 0.75, margin: "8px 0 0" },
    full: { gridColumn: "1 / -1" },
    resultBox: {
      marginTop: 12,
      padding: 14,
      borderRadius: 14,
      background: "rgba(0,0,0,0.30)",
      border: "1px solid rgba(255,255,255,0.12)",
      overflowX: "auto",
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      fontSize: 12,
      lineHeight: 1.45,
      whiteSpace: "pre",
    },
    error: {
      marginTop: 12,
      padding: 12,
      borderRadius: 14,
      background: "rgba(255,0,0,0.12)",
      border: "1px solid rgba(255,0,0,0.28)",
      color: "#ffd7d7",
      fontSize: 13,
    },
    footer: {
      opacity: 0.7,
      fontSize: 12,
      textAlign: "center",
      padding: 10,
    },
  };

  function resetToDefaults() {
    setPrompt("");
    setStyle("chibi");

    setEthnicity("user-selected");
    setSkinTone("user-selected");
    setAgeGroup("teen");
    setGenderPresentation("user-selected");

    setHairType("user-selected");
   
