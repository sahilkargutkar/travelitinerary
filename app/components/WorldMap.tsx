"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Star, ArrowRight, X } from "lucide-react";
import WorldSvg from "./WorldSvg";

const MAP_HOTSPOTS = [
  {
    id: "kerala",
    name: "Kerala",
    country: "India",
    flag: "🇮🇳",
    x: "71.5%",
    y: "39.5%",
    price: "₹24,999",
    rating: "4.8",
    slug: "kerala",
    highlight: "Alleppey houseboat & Munnar tea gardens",
  },
  {
    id: "thailand",
    name: "Phuket",
    country: "Thailand",
    flag: "🇹🇭",
    x: "78.8%",
    y: "47.8%",
    price: "₹39,999",
    rating: "4.9",
    slug: "thailand",
    highlight: "Phi Phi island hopping & street food",
  },
  {
    id: "philippines",
    name: "Palawan",
    country: "Philippines",
    flag: "🇵🇭",
    x: "85.0%",
    y: "52.2%",
    price: "₹44,999",
    rating: "4.7",
    slug: "philippines",
    highlight: "El Nido lagoons & private beaches",
  },
  {
    id: "singapore",
    name: "Singapore City",
    country: "Singapore",
    flag: "🇸🇬",
    x: "79.0%",
    y: "58.2%",
    price: "₹54,999",
    rating: "4.8",
    slug: "singapore",
    highlight: "Marina Bay Sands SkyPark & Gardens by the Bay",
  },
  {
    id: "south-africa",
    name: "Kruger Reserve",
    country: "South Africa",
    flag: "🇿🇦",
    x: "58.0%",
    y: "75.2%",
    price: "₹89,999",
    rating: "4.9",
    slug: "south-africa",
    highlight: "Five-star lodges & game drives",
  },
  {
    id: "south-korea",
    name: "Seoul",
    country: "South Korea",
    flag: "🇰🇷",
    x: "82.6%",
    y: "30.2%",
    price: "₹49,999",
    rating: "4.8",
    slug: "south-korea",
    highlight: "Ancient palaces & culinary tours",
  },
];

export default function WorldMap() {
  const [activeSpot, setActiveSpot] = useState<typeof MAP_HOTSPOTS[0] | null>(null);

  return (
    <section id="world-map" style={{
      padding: "64px 0",
      background: "var(--primary)",
      color: "#FFFFFF",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative radial gradients */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px", height: "800px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0, 184, 169, 0.08) 0%, rgba(10, 37, 64, 0) 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(255, 255, 255, 0.1)", color: "var(--secondary)",
            padding: "6px 14px", borderRadius: "50px",
            fontFamily: "var(--font-montserrat)", fontSize: "0.75rem",
            fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em",
            marginBottom: "16px"
          }}>
            <MapPin size={13} />
            Visual Explorer
          </div>

          <h2 className="section-title" style={{ color: "#FAFAF7", marginBottom: "20px" }}>
            Explore Our World <span style={{
              background: "linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              display: "inline-block"
            }}>Interactively</span>
          </h2>
          <p style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "1rem",
            color: "rgba(250, 250, 247, 0.75)",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.7",
          }}>
            Click on any animated coordinates hotspot to reveal a glassmorphic preview of the destination package and custom highlights.
          </p>
        </div>

        {/* The Map Graphic container */}
        <div style={{
          position: "relative",
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto",
          background: "rgba(255, 255, 255, 0.01)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "28px",
          padding: "24px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
        }}>
          {/* Map SVG Wrapper */}
          <div style={{ position: "relative", width: "100%" }}>
            <WorldSvg
              activeSlug={activeSpot?.slug || null}
              onCountryClick={(slug) => {
                const spot = MAP_HOTSPOTS.find((s) => s.slug === slug);
                if (spot) {
                  setActiveSpot(spot);
                }
              }}
            />

            {/* Hotspots mapped on top */}
            {MAP_HOTSPOTS.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setActiveSpot(spot)}
                style={{
                  position: "absolute",
                  left: spot.x,
                  top: spot.y,
                  transform: "translate(-50%, -50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "10px",
                  zIndex: 10,
                }}
                aria-label={`View ${spot.name}`}
              >
                {/* Outer pulsing ring */}
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "transparent",
                  zIndex: -1,
                }} className="animate-pulse-ring" />

                {/* Inner glowing dot */}
                <div style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: activeSpot?.id === spot.id ? "var(--accent)" : "var(--secondary)",
                  boxShadow: activeSpot?.id === spot.id 
                    ? "0 0 16px var(--accent)" 
                    : "0 0 16px var(--secondary)",
                  transition: "all 0.3s ease",
                }} />
              </button>
            ))}
          </div>

          {/* ── FLOATING GLASS INFO CARD ── */}
          {activeSpot && (
            <div className="map-info-card" style={{
              position: "absolute",
              bottom: "40px",
              left: "40px",
              width: "320px",
              background: "rgba(10, 37, 64, 0.82)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "20px",
              padding: "20px",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.4)",
              zIndex: 20,
              animation: "fadeUp 0.3s ease-out",
            }}>
              {/* Close button */}
              <button
                onClick={() => setActiveSpot(null)}
                style={{
                  position: "absolute", top: "12px", right: "12px",
                  background: "transparent", border: "none", color: "#FFFFFF",
                  cursor: "pointer", opacity: 0.7
                }}
              >
                <X size={16} />
              </button>

              {/* Card Header */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span style={{ fontSize: "20px" }}>{activeSpot.flag}</span>
                <div>
                  <h3 style={{
                    fontFamily: "var(--font-playfair)", fontSize: "1.15rem", fontWeight: "800",
                    color: "#FFFFFF", margin: 0,
                  }}>{activeSpot.name}</h3>
                  <span style={{
                    fontFamily: "var(--font-montserrat)", fontSize: "0.68rem",
                    color: "rgba(255,255,255,0.6)", fontWeight: "600"
                  }}>{activeSpot.country}</span>
                </div>
              </div>

              {/* Highlights */}
              <p style={{
                fontFamily: "var(--font-montserrat)", fontSize: "0.78rem",
                color: "rgba(250, 250, 247, 0.85)", lineHeight: "1.5",
                marginBottom: "14px",
              }}>{activeSpot.highlight}</p>

              {/* Price & Rating Row */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                paddingTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.15)",
                marginBottom: "16px"
              }}>
                <div>
                  <span style={{ display: "block", fontFamily: "var(--font-montserrat)", fontSize: "0.6rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>From</span>
                  <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "1rem", fontWeight: "800", color: "#FFFFFF" }}>{activeSpot.price}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Star size={13} fill="var(--accent)" color="var(--accent)" />
                  <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.82rem", fontWeight: "700", color: "#FFFFFF" }}>{activeSpot.rating}</span>
                </div>
              </div>

              {/* Action Link */}
              <Link
                href={`/destinations/${activeSpot.slug}`}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  width: "100%", padding: "10px", background: "var(--accent)",
                  borderRadius: "10px", textDecoration: "none", color: "#FFFFFF",
                  fontFamily: "var(--font-montserrat)", fontSize: "0.82rem", fontWeight: "700",
                  transition: "background 0.3s ease",
                  boxShadow: "0 4px 12px rgba(255, 122, 89, 0.2)"
                }}
              >
                View Detailed Itinerary
                <ArrowRight size={14} />
              </Link>

            </div>
          )}

        </div>

      </div>

    </section>
  );
}
