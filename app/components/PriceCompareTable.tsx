"use client";

import { CheckCircle, XCircle, Star, ExternalLink, Trophy, TrendingDown, Calendar } from "lucide-react";
import type { PackagePrice } from "../../lib/destinations";

interface Props {
  packages: PackagePrice[];
  destinationName: string;
}

const PROVIDER_META: Record<string, { color: string; bg: string; logo: string; desc: string; tag: string }> = {
  WanderLux: {
    color: "var(--accent)", bg: "rgba(0, 184, 169, 0.08)",
    logo: "W", desc: "Premium curated itineraries with 24/7 support",
    tag: "Best Value",
  },
  "Veena World": {
    color: "var(--text-muted)", bg: "rgba(126, 126, 126, 0.05)",
    logo: "VW", desc: "Group tours, fixed departures",
    tag: "Group Tours",
  },
  MakeMyTrip: {
    color: "var(--text-muted)", bg: "rgba(126, 126, 126, 0.05)",
    logo: "MMT", desc: "Online booking aggregator",
    tag: "Online Portal",
  },
};

export default function PriceCompareTable({ packages, destinationName }: Props) {
  const wanderPkg = packages.find((p) => p.provider === "WanderLux");
  const maxPrice = Math.max(...packages.map((p) => p.price));

  return (
    <div style={{ marginBottom: "40px" }}>
      {/* Section Header */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          background: "rgba(0, 184, 169, 0.1)", color: "var(--secondary)",
          padding: "6px 12px", borderRadius: "50px",
          fontFamily: "var(--font-montserrat)", fontSize: "0.7rem",
          fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em",
          marginBottom: "10px"
        }}>
          Price Intelligence
        </div>
        <h3 style={{
          fontFamily: "var(--font-playfair), serif", fontWeight: "800",
          fontSize: "1.45rem", color: "var(--primary)", marginBottom: "8px",
        }}>
          How We Compare
        </h3>
        <p style={{
          fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.85rem",
          color: "var(--text-secondary)", maxWidth: "520px", lineHeight: "1.6",
          fontWeight: "500", margin: 0
        }}>
          Side-by-side comparison with leading providers. Same destination, honest inclusions — you decide.
        </p>
      </div>

      {/* Savings Banner */}
      {wanderPkg && (
        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          background: "rgba(22, 163, 74, 0.08)",
          border: "1px solid rgba(22, 163, 74, 0.15)",
          borderRadius: "14px", padding: "14px 20px", marginBottom: "24px",
          flexWrap: "wrap"
        }}>
          <TrendingDown size={20} color="var(--success)" />
          <div>
            <span style={{
              fontFamily: "var(--font-montserrat)", fontWeight: "700",
              fontSize: "0.88rem", color: "var(--success)",
            }}>
              Save up to ₹{(maxPrice - wanderPkg.price).toLocaleString("en-IN")}
            </span>
            <span style={{
              fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem",
              color: "var(--text-secondary)", marginLeft: "8px", fontWeight: "500"
            }}>
              vs. highest competitor · Same itinerary duration
            </span>
          </div>
          <span style={{
            marginLeft: "auto",
            background: "rgba(22, 163, 74, 0.1)", border: "1px solid rgba(22, 163, 74, 0.2)",
            borderRadius: "50px", padding: "3px 12px",
            fontFamily: "var(--font-montserrat)", fontSize: "0.68rem", fontWeight: "700", color: "var(--success)",
          }}>Verified June 2026</span>
        </div>
      )}

      {/* Cards Grid — stacks to 1 col on mobile */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }} className="compare-grid-cards">
        {packages.map((pkg, i) => {
          const meta = PROVIDER_META[pkg.provider] || PROVIDER_META["Veena World"];
          const isWander = pkg.provider === "WanderLux";
          const savings = pkg.price - (wanderPkg?.price || 0);

          return (
            <div
              key={pkg.provider}
              style={{
                background: isWander
                  ? "rgba(0, 184, 169, 0.03)"
                  : "var(--bg-card)",
                border: isWander
                  ? "2px solid rgba(0, 184, 169, 0.35)"
                  : "1px solid var(--border-subtle)",
                borderRadius: "20px",
                padding: "24px",
                position: "relative",
                transition: "all 0.35s ease",
              }}
              onMouseEnter={(e) => {
                if (!isWander) {
                  e.currentTarget.style.borderColor = "var(--secondary)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isWander) {
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                  e.currentTarget.style.transform = "none";
                }
              }}
            >
              {/* Best Value Badge */}
              {isWander && (
                <div style={{
                  position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)",
                  background: "var(--primary)",
                  borderRadius: "50px", padding: "4px 16px",
                  fontFamily: "var(--font-montserrat)", fontSize: "0.68rem", fontWeight: "700",
                  color: "#FFFFFF", display: "flex", alignItems: "center", gap: "5px",
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 12px rgba(10, 37, 64, 0.15)",
                }}>
                  <Trophy size={11} color="var(--accent)" /> Best Value Pick
                </div>
              )}

              {/* Provider Header */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "10px",
                  background: isWander ? "var(--primary)" : "var(--bg-elevated)",
                  border: isWander ? "none" : "1px solid var(--border-subtle)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-playfair), serif", fontWeight: "900",
                  fontSize: "0.85rem", color: isWander ? "#FFFFFF" : "var(--text-secondary)",
                }}>{meta.logo}</div>
                <div>
                  <div style={{
                    fontFamily: "var(--font-playfair), serif", fontWeight: "800",
                    fontSize: "0.95rem", color: "var(--primary)",
                  }}>{pkg.provider}</div>
                  <div style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: "500" }}>
                    {meta.tag}
                  </div>
                </div>
              </div>

              {/* Price */}
              <div style={{ marginBottom: "18px" }}>
                <div style={{
                  fontFamily: "var(--font-montserrat)", fontWeight: "800",
                  fontSize: "1.8rem", lineHeight: "1",
                  color: isWander ? "var(--accent)" : "var(--primary)",
                  marginBottom: "4px",
                }}>
                  ₹{pkg.price.toLocaleString("en-IN")}
                </div>
                <div style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.73rem", color: "var(--text-muted)", fontWeight: "500" }}>
                  per person · {pkg.duration}
                </div>
                {!isWander && savings > 0 && (
                  <div style={{
                    display: "flex", alignItems: "center", gap: "4px", marginTop: "6px",
                    background: "rgba(220, 38, 38, 0.08)", border: "1px solid rgba(220, 38, 38, 0.15)",
                    borderRadius: "6px", padding: "4px 8px", width: "fit-content",
                  }}>
                    <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.68rem", fontWeight: "700", color: "#DC2626" }}>
                      ₹{savings.toLocaleString("en-IN")} extra
                    </span>
                  </div>
                )}
              </div>

              {/* Stars */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "18px" }}>
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={13}
                    fill={s <= Math.round(pkg.rating) ? "var(--accent)" : "transparent"}
                    color={s <= Math.round(pkg.rating) ? "var(--accent)" : "rgba(10,37,64,0.15)"}
                  />
                ))}
                <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.75rem", fontWeight: "600", color: "var(--text-secondary)" }}>
                  {pkg.rating} ({pkg.reviewCount.toLocaleString()})
                </span>
              </div>

              {/* Departures */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{
                  fontFamily: "var(--font-montserrat)", fontSize: "0.65rem", fontWeight: "700",
                  color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em",
                  marginBottom: "8px",
                }}>Upcoming Departures</div>
                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                  {pkg.departureDates.map((d) => (
                    <span key={d} style={{
                      background: "rgba(10,37,64,0.03)", border: "1px solid var(--border-subtle)",
                      borderRadius: "6px", padding: "3px 9px",
                      fontFamily: "var(--font-montserrat)", fontSize: "0.65rem", fontWeight: "600",
                      color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "4px",
                    }}>
                      <Calendar size={9} /> {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Inclusions */}
              <div style={{ marginBottom: "18px" }}>
                <div style={{
                  fontFamily: "var(--font-montserrat)", fontSize: "0.65rem", fontWeight: "700",
                  color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em",
                  marginBottom: "8px",
                }}>Package Inclusions</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {pkg.inclusions.slice(0, 5).map((item) => (
                    <div key={item} style={{ display: "flex", gap: "7px", alignItems: "flex-start" }}>
                      <CheckCircle size={12} color="var(--success)" style={{ marginTop: "2px", flexShrink: 0 }} />
                      <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: "1.4", fontWeight: "500" }}>
                        {item}
                      </span>
                    </div>
                  ))}
                  {pkg.inclusions.length > 5 && (
                    <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: "500" }}>
                      +{pkg.inclusions.length - 5} more included
                    </span>
                  )}
                </div>
              </div>

              {/* CTA */}
              <button
                style={{
                  width: "100%", padding: "12px",
                  background: isWander ? "var(--accent)" : "transparent",
                  border: isWander ? "none" : "1px solid var(--border-strong)",
                  borderRadius: "12px", cursor: "pointer",
                  fontFamily: "var(--font-montserrat)", fontWeight: "700",
                  fontSize: "0.82rem",
                  color: isWander ? "#FFFFFF" : "var(--primary)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                  transition: "all 0.2s ease",
                  boxShadow: isWander ? "0 4px 12px rgba(255, 122, 89, 0.2)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (isWander) {
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(255, 122, 89, 0.35)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  } else {
                    e.currentTarget.style.background = "rgba(10, 37, 64, 0.03)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (isWander) {
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 122, 89, 0.2)";
                    e.currentTarget.style.transform = "none";
                  } else {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {isWander ? "Enquire Now — Free" : <><ExternalLink size={13} /> View Details</>}
              </button>
            </div>
          );
        })}
      </div>

      {/* Quick Comparison Table — horizontally scrollable on mobile */}
      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" as any, borderRadius: "20px", border: "1px solid var(--border-subtle)" }}>
      <div style={{
        background: "var(--bg-card)",
        borderRadius: "20px", overflow: "hidden",
        minWidth: "480px",
      }}>
        <div style={{
          padding: "16px 24px",
          background: "var(--bg-elevated)",
          borderBottom: "1px solid var(--border-subtle)",
          fontFamily: "var(--font-montserrat)", fontWeight: "700",
          fontSize: "0.72rem", color: "var(--primary)",
          letterSpacing: "0.08em", textTransform: "uppercase",
        }}>
          Feature Comparison Matrix
        </div>

        {[
          { label: "Price", render: (pkg: PackagePrice) => `₹${pkg.price.toLocaleString("en-IN")}` },
          { label: "Duration", render: (pkg: PackagePrice) => pkg.duration },
          { label: "Hotel included", render: (pkg: PackagePrice) => pkg.inclusions.some(i => i.toLowerCase().includes("hotel")) },
          { label: "Flights included", render: (pkg: PackagePrice) => pkg.inclusions.some(i => i.toLowerCase().includes("flight") || i.toLowerCase().includes("air")) },
          { label: "Meals included", render: (pkg: PackagePrice) => pkg.inclusions.some(i => i.toLowerCase().includes("meal") || i.toLowerCase().includes("breakfast")) },
          { label: "Guide included", render: (pkg: PackagePrice) => pkg.inclusions.some(i => i.toLowerCase().includes("guide")) },
          { label: "24/7 Support Desk", render: (pkg: PackagePrice) => pkg.provider === "WanderLux" },
          { label: "Free PDF Itinerary", render: (pkg: PackagePrice) => pkg.provider === "WanderLux" },
        ].map((row, ri) => (
          <div key={row.label} style={{
            display: "grid", gridTemplateColumns: "1fr repeat(3, 1fr)",
            borderBottom: ri < 7 ? "1px solid var(--border-subtle)" : "none",
          }} className="matrix-row">
            <div style={{
              padding: "14px 24px",
              fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem",
              color: "var(--text-secondary)",
              background: "rgba(255,255,255,0.01)",
              borderRight: "1px solid var(--border-subtle)",
              fontWeight: "600"
            }}>{row.label}</div>
            {packages.map((pkg) => {
              const val = row.render(pkg);
              const isWander = pkg.provider === "WanderLux";
              return (
                <div key={pkg.provider} style={{
                  padding: "14px 20px", textAlign: "center",
                  background: isWander ? "rgba(0, 184, 169, 0.02)" : "transparent",
                  borderRight: "1px solid var(--border-subtle)",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }} className="matrix-cell">
                  {typeof val === "boolean" ? (
                    val
                      ? <CheckCircle size={15} color="var(--success)" style={{ margin: "0 auto" }} />
                      : <XCircle size={15} color="rgba(220, 38, 38, 0.3)" style={{ margin: "0 auto" }} />
                  ) : (
                    <span style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "0.82rem",
                      fontWeight: isWander ? "700" : "500",
                      color: isWander ? "var(--accent)" : "var(--text-secondary)",
                    }}>{val as string}</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      </div>

      {/* Disclaimer */}
      <p style={{
        fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.72rem",
        color: "var(--text-muted)", marginTop: "14px", lineHeight: "1.6", fontWeight: "500"
      }}>
        * Competitor prices are indicative as of June 2026. Always verify directly with providers before booking.
        Savings calculations are based on publicly listed package prices for equivalent durations.
      </p>

      <style>{`
        @media (max-width: 768px) {
          .compare-grid-cards { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
        @media (min-width: 481px) and (max-width: 768px) {
          .compare-grid-cards { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
