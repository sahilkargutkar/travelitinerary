"use client";

import { CheckCircle, XCircle, Star, ExternalLink, Trophy, TrendingDown, Calendar } from "lucide-react";
import type { PackagePrice } from "../../lib/destinations";

interface Props {
  packages: PackagePrice[];
  destinationName: string;
}

const PROVIDER_META: Record<string, { color: string; bg: string; logo: string; desc: string; tag: string }> = {
  WanderLux: {
    color: "var(--accent-gold)", bg: "rgba(197,160,89,0.08)",
    logo: "W", desc: "Premium curated itineraries with 24/7 support",
    tag: "Best Value",
  },
  "Veena World": {
    color: "#9098B8", bg: "rgba(144,152,184,0.05)",
    logo: "VW", desc: "Group tours, fixed departures",
    tag: "Group Tours",
  },
  MakeMyTrip: {
    color: "#9098B8", bg: "rgba(144,152,184,0.05)",
    logo: "MMT", desc: "Online booking aggregator",
    tag: "Online Portal",
  },
};

export default function PriceCompareTable({ packages, destinationName }: Props) {
  const wanderPkg = packages.find((p) => p.provider === "WanderLux");
  const maxPrice = Math.max(...packages.map((p) => p.price));

  return (
    <div>
      {/* Section Header */}
      <div style={{ marginBottom: "32px" }}>
        <div className="section-label">Price Intelligence</div>
        <h2 style={{
          fontFamily: "var(--font-playfair), serif", fontWeight: "800",
          fontSize: "1.6rem", color: "var(--text-primary)", marginBottom: "10px",
        }}>
          How We Compare
        </h2>
        <p style={{
          fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.88rem",
          color: "var(--text-secondary)", maxWidth: "500px", lineHeight: "1.65",
        }}>
          Side-by-side comparison with leading providers. Same destination, honest inclusions — you decide.
        </p>
      </div>

      {/* Savings Banner */}
      {wanderPkg && (
        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          background: "var(--bg-elevated)",
          border: "1px solid rgba(197,160,89,0.25)",
          borderRadius: "14px", padding: "14px 20px", marginBottom: "24px",
        }}>
          <TrendingDown size={20} color="#FF6F59" />
          <div>
            <span style={{
              fontFamily: "var(--font-playfair), serif", fontWeight: "800",
              fontSize: "0.9rem", color: "#FF6F59",
            }}>
              Save up to ₹{(maxPrice - wanderPkg.price).toLocaleString("en-IN")}
            </span>
            <span style={{
              fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.82rem",
              color: "rgba(255,255,255,0.6)", marginLeft: "8px",
            }}>
              vs. highest competitor · Same itinerary duration
            </span>
          </div>
          <span style={{
            marginLeft: "auto",
            background: "rgba(197,160,89,0.15)", border: "1px solid rgba(197,160,89,0.3)",
            borderRadius: "50px", padding: "3px 12px",
            fontFamily: "var(--font-playfair), serif", fontSize: "0.7rem", fontWeight: "700", color: "#FF6F59",
          }}>Verified Jun 2025</span>
        </div>
      )}

      {/* Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "28px" }}>
        {packages.map((pkg, i) => {
          const meta = PROVIDER_META[pkg.provider] || PROVIDER_META["Veena World"];
          const isWander = pkg.provider === "WanderLux";
          const savings = pkg.price - (wanderPkg?.price || 0);

          return (
            <div
              key={pkg.provider}
              style={{
                background: isWander
                  ? "rgba(197,160,89,0.08)"
                  : "var(--bg-card)",
                border: isWander
                  ? "2px solid rgba(197,160,89,0.4)"
                  : "1px solid rgba(26,43,60,0.07)",
                borderRadius: "22px",
                padding: "24px",
                position: "relative",
                transition: "all 0.35s ease",
              }}
              onMouseEnter={(e) => {
                if (!isWander) {
                  e.currentTarget.style.borderColor = "rgba(26,43,60,0.15)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isWander) {
                  e.currentTarget.style.borderColor = "rgba(26,43,60,0.07)";
                  e.currentTarget.style.transform = "none";
                }
              }}
            >
              {/* Best Value Badge */}
              {isWander && (
                <div style={{
                  position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)",
                  background: "var(--accent-navy)",
                  borderRadius: "50px", padding: "4px 16px",
                  fontFamily: "var(--font-playfair), serif", fontSize: "0.68rem", fontWeight: "800",
                  color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "5px",
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 14px rgba(197,160,89,0.4)",
                }}>
                  <Trophy size={10} /> Best Value Pick
                </div>
              )}

              {/* Provider Header */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "12px",
                  background: isWander ? "rgba(197,160,89,0.08)" : "var(--bg-card)",
                  border: isWander ? "none" : "1px solid rgba(26,43,60,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-playfair), serif", fontWeight: "900",
                  fontSize: "0.7rem", color: isWander ? "white" : "var(--text-muted)",
                  boxShadow: isWander ? "0 4px 14px rgba(197,160,89,0.3)" : "none",
                }}>{meta.logo}</div>
                <div>
                  <div style={{
                    fontFamily: "var(--font-playfair), serif", fontWeight: "800",
                    fontSize: "0.95rem", color: isWander ? "white" : "var(--text-primary)",
                  }}>{pkg.provider}</div>
                  <div style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.7rem", color: "var(--text-muted)" }}>
                    {meta.desc}
                  </div>
                </div>
              </div>

              {/* Price */}
              <div style={{ marginBottom: "18px" }}>
                <div style={{
                  fontFamily: "var(--font-playfair), serif", fontWeight: "900",
                  fontSize: "2rem", lineHeight: "1",
                  color: isWander ? "var(--accent-gold)" : "var(--text-primary)",
                  marginBottom: "4px",
                }}>
                  ₹{pkg.price.toLocaleString("en-IN")}
                </div>
                <div style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.73rem", color: "var(--text-muted)" }}>
                  per person · {pkg.duration}
                </div>
                {!isWander && savings > 0 && (
                  <div style={{
                    display: "flex", alignItems: "center", gap: "4px", marginTop: "6px",
                    background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)",
                    borderRadius: "6px", padding: "3px 8px", width: "fit-content",
                  }}>
                    <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: "0.68rem", fontWeight: "700", color: "#F87171" }}>
                      ₹{savings.toLocaleString("en-IN")} more expensive
                    </span>
                  </div>
                )}
              </div>

              {/* Stars */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "18px" }}>
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={13}
                    fill={s <= Math.round(pkg.rating) ? "#E5C158" : "transparent"}
                    color={s <= Math.round(pkg.rating) ? "#E5C158" : "rgba(26,43,60,0.2)"}
                  />
                ))}
                <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: "0.75rem", fontWeight: "700", color: "var(--text-secondary)" }}>
                  {pkg.rating} · {pkg.reviewCount.toLocaleString()} reviews
                </span>
              </div>

              {/* Departures */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{
                  fontFamily: "var(--font-playfair), serif", fontSize: "0.65rem", fontWeight: "700",
                  color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em",
                  marginBottom: "8px",
                }}>Upcoming Departures</div>
                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                  {pkg.departureDates.map((d) => (
                    <span key={d} style={{
                      background: "rgba(26,43,60,0.05)", border: "1px solid rgba(26,43,60,0.08)",
                      borderRadius: "6px", padding: "3px 9px",
                      fontFamily: "var(--font-playfair), serif", fontSize: "0.65rem", fontWeight: "600",
                      color: "rgba(26,43,60,0.65)", display: "flex", alignItems: "center", gap: "4px",
                    }}>
                      <Calendar size={9} /> {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Inclusions */}
              <div style={{ marginBottom: "18px" }}>
                <div style={{
                  fontFamily: "var(--font-playfair), serif", fontSize: "0.65rem", fontWeight: "700",
                  color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em",
                  marginBottom: "8px",
                }}>Package Includes</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {pkg.inclusions.slice(0, 5).map((item) => (
                    <div key={item} style={{ display: "flex", gap: "7px", alignItems: "flex-start" }}>
                      <CheckCircle size={12} color="#FF6F59" style={{ marginTop: "2px", flexShrink: 0 }} />
                      <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: "1.45" }}>
                        {item}
                      </span>
                    </div>
                  ))}
                  {pkg.inclusions.length > 5 && (
                    <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      +{pkg.inclusions.length - 5} more included
                    </span>
                  )}
                </div>
              </div>

              {/* CTA */}
              <button
                style={{
                  width: "100%", padding: "12px",
                  background: isWander ? "rgba(197,160,89,0.08)" : "var(--bg-card)",
                  border: isWander ? "none" : "1px solid rgba(26,43,60,0.1)",
                  borderRadius: "12px", cursor: "pointer",
                  fontFamily: "var(--font-playfair), serif", fontWeight: "700",
                  fontSize: "0.85rem",
                  color: isWander ? "white" : "var(--text-secondary)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "7px",
                  transition: "all 0.2s ease",
                  boxShadow: isWander ? "0 4px 16px rgba(197,160,89,0.3)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (isWander) {
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(197,160,89,0.5)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  } else {
                    e.currentTarget.style.background = "rgba(255,255,255,0.09)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (isWander) {
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(197,160,89,0.3)";
                    e.currentTarget.style.transform = "none";
                  } else {
                    e.currentTarget.style.background = "rgba(26,43,60,0.05)";
                  }
                }}
              >
                {isWander ? "Enquire Now — Free" : <><ExternalLink size={13} /> View on {pkg.provider}</>}
              </button>
            </div>
          );
        })}
      </div>

      {/* Quick Comparison Table */}
      <div style={{
        background: "var(--bg-card)", border: "1px solid rgba(26,43,60,0.07)",
        borderRadius: "20px", overflow: "hidden",
      }}>
        <div style={{
          padding: "16px 24px",
          background: "rgba(26,43,60,0.03)",
          borderBottom: "1px solid rgba(26,43,60,0.06)",
          fontFamily: "var(--font-playfair), serif", fontWeight: "700",
          fontSize: "0.82rem", color: "var(--text-secondary)",
          letterSpacing: "0.08em", textTransform: "uppercase",
        }}>
          Feature Comparison
        </div>

        {[
          { label: "Price", render: (pkg: PackagePrice) => `₹${pkg.price.toLocaleString("en-IN")}` },
          { label: "Duration", render: (pkg: PackagePrice) => pkg.duration },
          { label: "Hotel included", render: (pkg: PackagePrice) => pkg.inclusions.some(i => i.toLowerCase().includes("hotel")) },
          { label: "Flights included", render: (pkg: PackagePrice) => pkg.inclusions.some(i => i.toLowerCase().includes("flight") || i.toLowerCase().includes("air")) },
          { label: "Meals included", render: (pkg: PackagePrice) => pkg.inclusions.some(i => i.toLowerCase().includes("meal") || i.toLowerCase().includes("breakfast")) },
          { label: "Guide included", render: (pkg: PackagePrice) => pkg.inclusions.some(i => i.toLowerCase().includes("guide")) },
          { label: "24/7 support", render: (pkg: PackagePrice) => pkg.provider === "WanderLux" },
          { label: "Free PDF itinerary", render: (pkg: PackagePrice) => pkg.provider === "WanderLux" },
        ].map((row, ri) => (
          <div key={row.label} style={{
            display: "grid", gridTemplateColumns: "1fr repeat(3, 1fr)",
            borderBottom: ri < 7 ? "1px solid rgba(26,43,60,0.04)" : "none",
          }}>
            <div style={{
              padding: "13px 24px",
              fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem",
              color: "var(--text-secondary)",
              background: "rgba(255,255,255,0.01)",
              borderRight: "1px solid rgba(26,43,60,0.04)",
            }}>{row.label}</div>
            {packages.map((pkg) => {
              const val = row.render(pkg);
              const isWander = pkg.provider === "WanderLux";
              return (
                <div key={pkg.provider} style={{
                  padding: "13px 20px", textAlign: "center",
                  background: isWander ? "rgba(197,160,89,0.04)" : "transparent",
                  borderRight: "1px solid rgba(26,43,60,0.04)",
                }}>
                  {typeof val === "boolean" ? (
                    val
                      ? <CheckCircle size={15} color="#FF6F59" style={{ margin: "0 auto" }} />
                      : <XCircle size={15} color="rgba(248,113,113,0.5)" style={{ margin: "0 auto" }} />
                  ) : (
                    <span style={{
                      fontFamily: isWander ? "'Outfit'" : "'Inter'",
                      fontSize: "0.82rem",
                      fontWeight: isWander ? "700" : "400",
                      color: isWander ? "var(--accent-gold)" : "var(--text-secondary)",
                    }}>{val as string}</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <p style={{
        fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.72rem",
        color: "var(--text-muted)", marginTop: "12px", lineHeight: "1.6",
      }}>
        * Competitor prices are indicative as of June 2025. Always verify directly with providers before booking.
        Savings calculations are based on publicly listed package prices for equivalent durations.
      </p>
    </div>
  );
}
