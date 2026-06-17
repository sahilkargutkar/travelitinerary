"use client";

import { useState } from "react";
import { Download, FileText, Loader2 } from "lucide-react";
import type { Destination } from "../../lib/destinations";

interface Props {
  destination: Destination;
}

/** Loads an image URL and returns a base64 data URL string. */
async function imageToBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default function PdfExportButton({ destination }: Props) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    setDone(false);
    try {
      // Load logo as base64 — falls back gracefully if unavailable
      let logoBase64: string | undefined;
      try {
        logoBase64 = await imageToBase64("/logo-banner.png");
      } catch {
        console.warn("Logo could not be loaded — using text fallback in PDF.");
      }

      const { generateItineraryPDF } = await import("../../lib/pdfGenerator");
      await generateItineraryPDF(destination, logoBase64);
      setDone(true);
      setTimeout(() => {
        setDone(false);
        const waUrl = `https://wa.me/918452087326?text=${encodeURIComponent(`Hi, I just downloaded the ${destination.name} itinerary — can I get a quote?`)}`;
        window.open(waUrl, "_blank");
      }, 1500);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="btn-accent"
      style={{
        opacity: loading ? 0.8 : 1,
        cursor: loading ? "wait" : "pointer",
        minWidth: "180px",
        justifyContent: "center",
      }}
      id="pdf-export-btn"
      aria-label={`Download ${destination.name} itinerary PDF`}
    >
      {loading ? (
        <>
          <Loader2 size={18} style={{ animation: "rotate-slow 1s linear infinite" }} />
          Generating PDF...
        </>
      ) : done ? (
        <>
          <FileText size={18} />
          ✓ Downloaded!
        </>
      ) : (
        <>
          <Download size={18} />
          Download Itinerary PDF
        </>
      )}
    </button>
  );
}
