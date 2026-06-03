"use client";

import { useState, useEffect } from "react";
import { destinations } from "../../lib/destinations";
import PriceCompareTable from "../components/PriceCompareTable";
import { BarChart2, TrendingDown, CheckCircle, ArrowRight } from "lucide-react";
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
        borderBottom: "1px solid rgba(26,43,60,0.05)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative Grid & Glows */}
        <div style={{
          position: "absolute", inset: 0,
          background: "var(--bg-elevated)",
          backgroundSize: "40px 40px", opacity: 0.5, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: "600px", height: "600px", borderRadius: "50%",
          display: "none",
        }} />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <span className="section-label" style={{ justifyContent: "center" }}>Transparency First</span>
          <h1 className="section-title" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "24px" }}>
            Compare & <span className="gradient-text">Save Thousands</span>
          </h1>
          <p style={{
            fontFamily: "var(--font-montserrat), sans-serif", fontSize: "1.1rem",
            color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6"
          }}>
            See exactly how WanderLux stacks up against other premium travel providers. We believe in transparent pricing, superior luxury, and unmatched value.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="container" style={{
        padding: "80px 24px",
        display: "grid", gridTemplateColumns: "250px 1fr", gap: "60px",
        alignItems: "flex-start",
      }}>
        {/* SIDEBAR NAVIGATION (Scroll Spy) */}
        <aside style={{ position: "sticky", top: "120px" }}>
          <h4 style={{
            fontFamily: "'Outfit'", fontWeight: "800", fontSize: "1.2rem",
            color: "var(--text-primary)", marginBottom: "24px", letterSpacing: "-0.01em"
          }}>Destinations</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {destinations.map((dest) => (
              <button
                key={dest.slug}
                onClick={() => scrollTo(dest.slug)}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "12px 16px", borderRadius: "12px", border: "none",
                  background: activeSection === dest.slug ? "var(--accent-navy)" : "transparent",
                  cursor: "pointer", transition: "all 0.3s ease",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== dest.slug) e.currentTarget.style.background = "rgba(26,43,60,0.05)";
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== dest.slug) e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ fontSize: "16px", filter: activeSection === dest.slug ? "grayscale(0)" : "grayscale(100%)", transition: "filter 0.3s ease" }}>
                  {dest.flag}
                </span>
                <span style={{
                  fontFamily: "'Outfit'", fontSize: "0.9rem", fontWeight: activeSection === dest.slug ? "700" : "500",
                  color: activeSection === dest.slug ? "white" : "var(--text-secondary)",
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
                marginBottom: "32px", paddingBottom: "24px", borderBottom: "1px solid rgba(26,43,60,0.05)",
                flexWrap: "wrap", gap: "20px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                  <img src={dest.heroImage} alt={dest.name} style={{
                    width: "80px", height: "80px", borderRadius: "16px", objectFit: "cover",
                    border: "1px solid rgba(26,43,60,0.1)",
                  }} />
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <span style={{ fontSize: "18px" }}>{dest.flag}</span>
                      <h2 style={{
                        fontFamily: "'Outfit'", fontWeight: "800", fontSize: "2rem",
                        color: "var(--text-primary)", lineHeight: "1", letterSpacing: "-0.02em",
                      }}>{dest.name}</h2>
                    </div>
                    <div style={{ fontFamily: "'Inter'", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                      {dest.duration} · {dest.tagline}
                    </div>
                  </div>
                </div>

                <Link href={`/destinations/${dest.slug}`} className="btn-secondary" style={{ padding: "10px 20px", fontSize: "0.85rem" }}>
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
          .container { grid-template-columns: 1fr !important; }
          aside { display: none !important; }
        }
      `}</style>
    </div>
  );
}
