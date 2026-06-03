"use client";

import { useState } from "react";
import { Download, FileText, Loader2 } from "lucide-react";
import type { Destination } from "../../lib/destinations";

interface Props {
  destination: Destination;
}

export default function PdfExportButton({ destination }: Props) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    setDone(false);
    try {
      const { generateItineraryPDF } = await import("../../lib/pdfGenerator");
      await generateItineraryPDF(destination);
      setDone(true);
      setTimeout(() => setDone(false), 3000);
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
