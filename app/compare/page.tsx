"use client";

import { useState, useEffect } from "react";
import { destinations } from "../../lib/destinations";
import PriceCompareTable from "../components/PriceCompareTable";
import { BarChart2, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export default function ComparePage() {
  const [activeSection, setActiveSection] = useState(destinations[0].slug);

  // Intersection Observer for scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" } // trigger when near top of viewport
    );

    destinations.forEach((dest) => {
      const el = document.getElementById(dest.slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", position: "relative" }}>
      {/* ── HERO ── */}
      <section style={{
        padding: "160px 0 80px",
        background: "var(--bg-card)",
        borderBottom: "1px solid var(--border-subtle)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative Grid & Glows */}
        <div style={{
          position: "absolute", inset: 0,
          background: "var(--bg-elevated)",
          backgroundSize: "40px 40px", opacity: 0.5, pointerEvents: "none",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(0, 184, 169, 0.1)", color: "var(--secondary)",
            padding: "6px 14px", borderRadius: "50px",
            fontFamily: "var(--font-montserrat)", fontSize: "0.75rem",
            fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em",
            marginBottom: "16px", justifyContent: "center"
          }}>
            Transparency First
          </div>
          <h1 className="section-title" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "24px" }}>
            Compare & <span className="gradient-text">Save Thousands</span>
          </h1>
          <p style={{
            fontFamily: "var(--font-montserrat), sans-serif", fontSize: "1.1rem",
            color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto", lineHeight: "1.7",
            fontWeight: "500"
          }}>
            See exactly how WanderSouls stacks up against other premium travel providers. We believe in transparent pricing, superior luxury, and unmatched value.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="container" style={{
        padding: "80px 24px",
        display: "grid", gridTemplateColumns: "260px 1fr", gap: "60px",
        alignItems: "flex-start",
      }} >
        {/* SIDEBAR NAVIGATION (Scroll Spy) */}
        <aside style={{ position: "sticky", top: "120px" }}>
          <h4 style={{
            fontFamily: "var(--font-playfair)", fontWeight: "800", fontSize: "1.25rem",
            color: "var(--primary)", marginBottom: "24px", letterSpacing: "-0.01em"
          }}>Destinations</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {destinations.map((dest) => (
              <button
                key={dest.slug}
                onClick={() => scrollTo(dest.slug)}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "12px 18px", borderRadius: "14px", border: "none",
                  background: activeSection === dest.slug ? "var(--secondary)" : "transparent",
                  cursor: "pointer", transition: "all 0.3s ease",
                  textAlign: "left",
                  width: "100%"
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== dest.slug) e.currentTarget.style.background = "rgba(10, 37, 64, 0.04)";
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== dest.slug) e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ fontSize: "16px", filter: activeSection === dest.slug ? "grayscale(0)" : "grayscale(100%)", transition: "filter 0.3s ease" }}>
                  {dest.flag}
                </span>
                <span style={{
                  fontFamily: "var(--font-montserrat)", fontSize: "0.85rem", fontWeight: "700",
                  color: activeSection === dest.slug ? "#FFFFFF" : "var(--text-secondary)",
                  transition: "all 0.3s ease",
                }}>
                  {dest.name}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* COMPARISON SECTIONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
          {destinations.map((dest) => (
            <div key={dest.slug} id={dest.slug} style={{ scrollMarginTop: "100px" }}>
              {/* Destination Header */}
              <div style={{
                display: "flex", alignItems: "flex-end", justifyContent: "space-between",
                marginBottom: "32px", paddingBottom: "24px", borderBottom: "1px solid var(--border-subtle)",
                flexWrap: "wrap", gap: "20px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                  <img src={dest.heroImage} alt={dest.name} style={{
                    width: "80px", height: "80px", borderRadius: "16px", objectFit: "cover",
                    border: "1px solid var(--border-subtle)",
                  }} />
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <span style={{ fontSize: "18px" }}>{dest.flag}</span>
                      <h2 style={{
                        fontFamily: "var(--font-playfair)", fontWeight: "800", fontSize: "1.8rem",
                        color: "var(--primary)", lineHeight: "1.1", letterSpacing: "-0.01em",
                      }}>{dest.name}</h2>
                    </div>
                    <div style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.82rem", color: "var(--text-secondary)", fontWeight: "500" }}>
                      {dest.duration} · {dest.tagline}
                    </div>
                  </div>
                </div>

                <Link href={`/destinations/${dest.slug}`} className="btn-secondary" style={{ padding: "10px 20px", fontSize: "0.82rem" }}>
                  View Full Itinerary <ArrowRight size={14} />
                </Link>
              </div>

              {/* Compare Component */}
              <PriceCompareTable packages={dest.comparison} destinationName={dest.name} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .compare-main-grid { grid-template-columns: 1fr !important; }
          aside { display: none !important; }
        }
      `}</style>
    </div>
  );
}
