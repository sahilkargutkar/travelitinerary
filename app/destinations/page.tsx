"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { destinations as DESTINATIONS_LIST } from "../../lib/destinations";
import { Filter, Star, Clock, MapPin } from "lucide-react";

function DestinationsContent() {
  const searchParams = useSearchParams();
  const dateStr = searchParams.get("date");
  const guestsStr = searchParams.get("guests");

  const [filterRegion, setFilterRegion] = useState("all");
  const [filterDuration, setFilterDuration] = useState("all");
  const [filterBudget, setFilterBudget] = useState("all");

  const filteredDestinations = DESTINATIONS_LIST.filter(dest => {
    // Region Filter (Simple proxy: India = Domestic, others = International)
    if (filterRegion === "domestic" && dest.country !== "India") return false;
    if (filterRegion === "international" && dest.country === "India") return false;

    // Duration Filter
    const daysMatch = dest.duration.match(/(\d+)\s+Days/i);
    const days = daysMatch ? parseInt(daysMatch[1]) : 0;
    if (filterDuration === "short" && days > 5) return false;
    if (filterDuration === "long" && days <= 5) return false;

    // Budget Filter
    if (filterBudget === "budget" && dest.basePrice > 50000) return false;
    if (filterBudget === "luxury" && dest.basePrice <= 50000) return false;

    return true;
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", paddingTop: "80px", paddingBottom: "80px" }}>

      {/* ── HERO ── */}
      <section style={{
        padding: "60px 20px",
        background: "var(--bg-elevated)",
        textAlign: "center",
        borderBottom: "1px solid var(--border-subtle)"
      }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: "800",
            color: "var(--primary)",
            marginBottom: "16px"
          }}>
            Our Destinations
          </h1>
          <p style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "1.05rem",
            color: "var(--text-secondary)",
            lineHeight: "1.6"
          }}>
            Browse the routes we specialize in.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: "40px 20px" }}>

        {/* ── FILTERS ── */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          alignItems: "center",
          marginBottom: "40px",
          background: "#FFFFFF",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(10,37,64,0.05)",
          border: "1px solid rgba(10,37,64,0.05)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--primary)", fontWeight: "700", fontFamily: "var(--font-montserrat)", marginRight: "8px" }}>
            <Filter size={18} /> Filters
          </div>

          <select value={filterRegion} onChange={e => setFilterRegion(e.target.value)} style={{ padding: "10px 16px", borderRadius: "50px", border: "1px solid var(--border-subtle)", background: "var(--bg-elevated)", fontFamily: "var(--font-montserrat)", fontSize: "0.85rem", outline: "none", cursor: "pointer" }}>
            <option value="all">All Regions</option>
            <option value="domestic">Domestic (India)</option>
            <option value="international">International</option>
          </select>

          <select value={filterDuration} onChange={e => setFilterDuration(e.target.value)} style={{ padding: "10px 16px", borderRadius: "50px", border: "1px solid var(--border-subtle)", background: "var(--bg-elevated)", fontFamily: "var(--font-montserrat)", fontSize: "0.85rem", outline: "none", cursor: "pointer" }}>
            <option value="all">Any Duration</option>
            <option value="short">Short Getaway (≤ 5 Days)</option>
            <option value="long">Extended Journey ({'>'} 5 Days)</option>
          </select>

          <select value={filterBudget} onChange={e => setFilterBudget(e.target.value)} style={{ padding: "10px 16px", borderRadius: "50px", border: "1px solid var(--border-subtle)", background: "var(--bg-elevated)", fontFamily: "var(--font-montserrat)", fontSize: "0.85rem", outline: "none", cursor: "pointer" }}>
            <option value="all">Any Budget</option>
            <option value="budget">Value (≤ ₹50k)</option>
            <option value="luxury">Premium ( {'>'}₹50k)</option>
          </select>

          <div style={{ flex: 1 }}></div>
          <div style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "600" }}>
            Showing {filteredDestinations.length} results
          </div>
        </div>

        {/* ── SEARCH QUERY BANNER ── */}
        {(dateStr || guestsStr) && (
          <div style={{
            background: "rgba(0,184,169,0.1)",
            border: "1px solid rgba(0,184,169,0.2)",
            color: "var(--primary)",
            padding: "16px 20px",
            borderRadius: "12px",
            marginBottom: "30px",
            fontFamily: "var(--font-montserrat)",
            fontSize: "0.95rem",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            Travel Enquiry:
            {dateStr && <span style={{ color: "var(--accent)" }}>{dateStr}</span>}
            {dateStr && guestsStr && <span style={{ color: "var(--text-muted)" }}>•</span>}
            {guestsStr && <span style={{ color: "var(--accent)" }}>{guestsStr}</span>}
          </div>
        )}

        {/* ── GRID ── */}
        {filteredDestinations.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "30px"
          }}>
            {filteredDestinations.map(dest => (
              <div key={dest.slug} style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid rgba(10,37,64,0.06)",
                boxShadow: "0 10px 30px rgba(10,37,64,0.05)",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }} className="dest-grid-card">
                <Link href={`/destinations/${dest.slug}`} style={{ display: "block", textDecoration: "none" }}>
                  <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                    <img src={dest.heroImage} alt={dest.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: "16px", right: "16px", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)", padding: "4px 8px", borderRadius: "8px", fontFamily: "var(--font-montserrat)", fontSize: "0.75rem", fontWeight: "700", color: "var(--primary)", display: "flex", alignItems: "center", gap: "4px" }}>
                      <Star size={12} fill="var(--accent)" color="var(--accent)" /> {dest.rating}
                    </div>
                  </div>
                  <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.4rem", fontWeight: "800", color: "var(--primary)", marginBottom: "8px" }}>
                      {dest.name}
                    </h3>
                    <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "16px", flex: 1 }}>
                      {dest.tagline}
                    </p>

                    <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", fontFamily: "var(--font-montserrat)", color: "var(--text-muted)", fontWeight: "600" }}>
                        <Clock size={14} /> {dest.duration}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", fontFamily: "var(--font-montserrat)", color: "var(--text-muted)", fontWeight: "600" }}>
                        <MapPin size={14} /> {dest.country}
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border-subtle)", paddingTop: "16px" }}>
                      <div>
                        <span style={{ display: "block", fontFamily: "var(--font-montserrat)", fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2px" }}>From</span>
                        <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "1.1rem", fontWeight: "800", color: "var(--primary)" }}>₹{dest.basePrice.toLocaleString("en-IN")}</span>
                      </div>
                      <span className="btn-secondary" style={{ padding: "8px 16px", fontSize: "0.8rem" }}>
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "60px 20px", background: "#FFFFFF", borderRadius: "20px", border: "1px dashed var(--border-subtle)" }}>
            <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.5rem", color: "var(--primary)", marginBottom: "8px" }}>No Destinations Found</h3>
            <p style={{ fontFamily: "var(--font-montserrat), sans-serif", color: "var(--text-secondary)" }}>Adjust your filters to see more options.</p>
            <button onClick={() => { setFilterRegion("all"); setFilterDuration("all"); setFilterBudget("all"); }} style={{ marginTop: "16px", background: "var(--primary)", color: "#FFFFFF", border: "none", padding: "10px 20px", borderRadius: "50px", fontFamily: "var(--font-montserrat)", fontSize: "0.85rem", fontWeight: "600", cursor: "pointer" }}>
              Reset Filters
            </button>
          </div>
        )}

      </div>
      <style>{`
        .dest-grid-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(10,37,64,0.1) !important;
        }
      `}</style>
    </div>
  );
}

export default function DestinationsPage() {
  return (
    <Suspense fallback={<div style={{ padding: "100px", textAlign: "center" }}>Loading destinations...</div>}>
      <DestinationsContent />
    </Suspense>
  );
}
