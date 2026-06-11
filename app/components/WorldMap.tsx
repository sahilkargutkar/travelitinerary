"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Star, ArrowRight, X } from "lucide-react";
import WorldSvg from "./WorldSvg";
import { destinations } from "@/lib/destinations";

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
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const destDetails = activeSpot ? destinations.find((d) => d.slug === activeSpot.id) : null;

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
          {/* Mobile Destination Quick Selector (only visible on mobile screens) */}
          <div className="mobile-destination-selector">
            {MAP_HOTSPOTS.map((spot) => {
              const isActive = activeSpot?.id === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => setActiveSpot(spot)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: isActive ? "var(--accent)" : "rgba(255, 255, 255, 0.08)",
                    border: isActive ? "1px solid var(--accent)" : "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#FFFFFF",
                    padding: "8px 16px",
                    borderRadius: "50px",
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "0.82rem",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    boxShadow: isActive ? "0 4px 14px rgba(255, 122, 89, 0.25)" : "none",
                    transition: "all 0.3s ease",
                  }}
                >

                  {spot.name}
                </button>
              );
            })}
          </div>

          {/* Map SVG Wrapper */}
          <div style={{ position: "relative", width: "100%" }}>
            <WorldSvg
              activeSlug={activeSpot?.slug || hoveredSlug || null}
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
                onMouseEnter={() => setHoveredSlug(spot.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                style={{
                  position: "absolute",
                  left: spot.x,
                  top: spot.y,
                  transform: "translate(-50%, -50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "12px",
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

          {/* ── FLOATING/STACKED GLASS INFO CARD ── */}
          {activeSpot && (
            <div className="map-info-card" style={{
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

              {/* Image Thumbnail Header */}
              {destDetails && (
                <div style={{
                  position: "relative",
                  width: "100%",
                  height: "140px",
                  borderRadius: "14px",
                  overflow: "hidden",
                  marginBottom: "16px",
                  border: "1px solid rgba(255, 255, 255, 0.15)"
                }}>
                  <img
                    src={destDetails.heroImage}
                    alt={activeSpot.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, rgba(10, 37, 64, 0.1) 40%, rgba(10, 37, 64, 0.75) 100%)"
                  }} />
                  <div style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    zIndex: 2
                  }}>

                    <span style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      color: "#FFFFFF",
                      textShadow: "0 2px 4px rgba(0,0,0,0.5)"
                    }}>{activeSpot.country}</span>
                  </div>
                  <div style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "rgba(10, 37, 64, 0.65)",
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "6px",
                    padding: "4px 8px",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "0.65rem",
                    fontWeight: "700",
                    zIndex: 2
                  }}>
                    {destDetails.duration.split("/")[0].trim()}
                  </div>
                </div>
              )}

              {/* Destination Title & Tagline */}
              <div style={{ marginBottom: "12px" }}>
                <h3 style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.3rem",
                  fontWeight: "800",
                  color: "#FFFFFF",
                  margin: "0 0 2px 0",
                  lineHeight: "1.2"
                }}>{activeSpot.name}</h3>
                {destDetails && (
                  <p style={{
                    fontFamily: "var(--font-montserrat)",
                    fontStyle: "italic",
                    fontSize: "0.78rem",
                    color: "var(--accent)",
                    fontWeight: "600",
                    margin: 0
                  }}>{destDetails.tagline}</p>
                )}
              </div>

              {/* Description */}
              <p style={{
                fontFamily: "var(--font-montserrat)", fontSize: "0.78rem",
                color: "rgba(250, 250, 247, 0.85)", lineHeight: "1.5",
                marginBottom: "14px",
              }}>{activeSpot.highlight}</p>

              {/* Quick Highlights list */}
              {destDetails && (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" }}>
                  {destDetails.highlights.slice(0, 2).map((h) => (
                    <div key={h} style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                      <span style={{ color: "var(--secondary)", fontSize: "0.8rem", lineHeight: "1.2" }}>✦</span>
                      <span style={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "0.74rem",
                        color: "rgba(250, 250, 247, 0.85)",
                        lineHeight: "1.4"
                      }}>{h}</span>
                    </div>
                  ))}
                </div>
              )}

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
