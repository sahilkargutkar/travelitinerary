"use client";

import Link from "next/link";
import { Clock, Users, Star, ArrowRight, MapPin } from "lucide-react";
import type { Destination } from "../../lib/destinations";

interface Props {
  destination: Destination;
  index?: number;
  featured?: boolean;
}

export default function DestinationCard({ destination: dest, index = 0, featured = false }: Props) {
  if (featured) {
    return (
      <Link href={`/destinations/${dest.slug}`} style={{ textDecoration: "none", display: "block" }}>
        <article
          className="dest-card"
          style={{
            position: "relative",
            borderRadius: "26px",
            overflow: "hidden",
            cursor: "pointer",
            height: "480px",
            border: "1px solid rgba(26,43,60,0.08)",
            transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow = "0 24px 60px rgba(0,0,0,0.6), 0 0 60px rgba(197,160,89,0.2)";
            e.currentTarget.style.borderColor = "rgba(197,160,89,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,0,0,0.4)";
            e.currentTarget.style.borderColor = "rgba(26,43,60,0.08)";
          }}
        >
          {/* Image */}
          <img
            src={dest.heroImage}
            alt={dest.name}
            className="dest-card-img"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%", objectFit: "cover",
            }}
          />

          {/* Gradient Overlays */}
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(240,243,244,0.3)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "transparent",
          }} />

          {/* Top Badges */}
          <div style={{
            position: "absolute", top: "16px", left: "16px", right: "16px",
            display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "7px",
              background: "rgba(240,243,244,0.7)", backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "50px", padding: "6px 14px",
            }}>
              <span style={{ fontSize: "15px" }}>{dest.flag}</span>
              <span style={{
                fontFamily: "var(--font-playfair), serif", fontSize: "0.75rem",
                fontWeight: "700", color: "rgba(255,255,255,0.9)",
              }}>{dest.country}</span>
            </div>
            <div style={{
              background: "var(--accent-emerald)",
              borderRadius: "12px", padding: "8px 14px", textAlign: "right",
              boxShadow: "0 4px 16px rgba(197,160,89,0.35)",
            }}>
              <div style={{ fontFamily: "'Inter'", fontSize: "0.6rem", color: "rgba(255,255,255,0.8)" }}>from</div>
              <div style={{ fontFamily: "'Outfit'", fontWeight: "800", fontSize: "1.1rem", color: "var(--text-primary)" }}>
                ₹{dest.basePrice.toLocaleString("en-IN")}
              </div>
            </div>
          </div>

          {/* Bottom Content */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px" }}>
            <div style={{ marginBottom: "14px" }}>
              <h3 style={{
                fontFamily: "'Outfit'", fontWeight: "900",
                fontSize: "2.2rem", color: "var(--text-primary)", lineHeight: "1",
                marginBottom: "6px", letterSpacing: "-0.02em",
              }}>{dest.name}</h3>
              <p style={{
                fontFamily: "'Outfit'", fontStyle: "italic",
                fontSize: "0.9rem", color: "#E5C158", fontWeight: "500",
              }}>{dest.tagline}</p>
            </div>

            <p style={{
              fontFamily: "'Inter'", fontSize: "0.82rem",
              color: "rgba(240,240,255,0.7)", lineHeight: "1.6",
              marginBottom: "16px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>{dest.description}</p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Clock size={12} color="var(--accent-gold)" />
                  <span style={{ fontFamily: "'Outfit'", fontSize: "0.75rem", color: "rgba(26,43,60,0.7)", fontWeight: "600" }}>
                    {dest.duration}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Star size={12} color="#E5C158" fill="#E5C158" />
                  <span style={{ fontFamily: "'Outfit'", fontSize: "0.75rem", color: "rgba(26,43,60,0.7)", fontWeight: "600" }}>
                    {dest.rating} ({dest.reviewCount.toLocaleString()})
                  </span>
                </div>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: "5px",
                color: "var(--accent-gold)", fontFamily: "'Outfit'", fontWeight: "700", fontSize: "0.82rem",
              }}>
                View Itinerary <ArrowRight size={14} />
              </div>
            </div>

            {/* Tags */}
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "14px" }}>
              {dest.tags.slice(0, 3).map((t) => (
                <span key={t} style={{
                  background: "rgba(26,43,60,0.08)", border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "6px", padding: "3px 9px",
                  fontFamily: "'Outfit'", fontSize: "0.68rem", color: "rgba(26,43,60,0.65)",
                }}>{t}</span>
              ))}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Standard card
  return (
    <Link href={`/destinations/${dest.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <article
        className="dest-card"
        style={{
          position: "relative", borderRadius: "22px", overflow: "hidden",
          cursor: "pointer", height: "100%", minHeight: "380px",
          border: "1px solid rgba(26,43,60,0.07)",
          background: "var(--bg-card)",
          transition: "all 0.45s cubic-bezier(0.23,1,0.32,1)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
          display: "flex", flexDirection: "column",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(197,160,89,0.15)";
          e.currentTarget.style.borderColor = "rgba(197,160,89,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.35)";
          e.currentTarget.style.borderColor = "rgba(26,43,60,0.07)";
        }}
      >
        {/* Image Container */}
        <div style={{ position: "relative", height: "210px", overflow: "hidden", flexShrink: 0 }}>
          <img
            src={dest.heroImage}
            alt={dest.name}
            className="dest-card-img"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute", left: 0, right: 0, bottom: 0, height: "120px",
            background: "rgba(240,243,244,0.4)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "transparent",
          }} />

          {/* Country Badge */}
          <div style={{ position: "absolute", top: "12px", left: "12px",
            display: "flex", alignItems: "center", gap: "6px",
            background: "rgba(240,243,244,0.75)", backdropFilter: "blur(10px)",
            border: "1px solid rgba(26,43,60,0.1)", borderRadius: "50px", padding: "5px 12px",
          }}>
            <span style={{ fontSize: "14px" }}>{dest.flag}</span>
            <span style={{ fontFamily: "'Outfit'", fontSize: "0.7rem", fontWeight: "700", color: "rgba(255,255,255,0.9)" }}>
              {dest.country}
            </span>
          </div>

          {/* Best Time */}
          <div style={{ position: "absolute", top: "12px", right: "12px" }}>
            <span className="badge badge-accent" style={{ fontSize: "0.64rem" }}>{dest.bestTime}</span>
          </div>

          {/* Price */}
          <div style={{
            position: "absolute", bottom: "14px", right: "14px",
            background: "var(--accent-emerald)",
            borderRadius: "10px", padding: "6px 12px",
            boxShadow: "0 4px 14px rgba(197,160,89,0.4)",
          }}>
            <div style={{ fontFamily: "'Inter'", fontSize: "0.58rem", color: "rgba(255,255,255,0.75)" }}>from</div>
            <div style={{ fontFamily: "'Outfit'", fontWeight: "800", fontSize: "0.95rem", color: "var(--text-primary)" }}>
              ₹{dest.basePrice.toLocaleString("en-IN")}
            </div>
          </div>

          {/* Dest name on image */}
          <div style={{ position: "absolute", bottom: "14px", left: "14px" }}>
            <h3 style={{
              fontFamily: "'Outfit'", fontWeight: "900", fontSize: "1.5rem",
              color: "var(--text-primary)", lineHeight: "1", letterSpacing: "-0.02em",
            }}>{dest.name}</h3>
            <p style={{ fontFamily: "'Outfit'", fontStyle: "italic", fontSize: "0.72rem", color: "#E5C158" }}>
              {dest.tagline}
            </p>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Stats */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            {[
              { icon: Clock, val: dest.duration, color: "var(--accent-gold)" },
              { icon: Users, val: dest.groupSize, color: "#9098B8" },
              { icon: Star, val: `${dest.rating} (${dest.reviewCount.toLocaleString()})`, color: "#E5C158" },
            ].map(({ icon: Icon, val, color }) => (
              <div key={val} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Icon size={12} color={color} fill={color === "#E5C158" ? "#E5C158" : "none"} />
                <span style={{ fontFamily: "'Inter'", fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: "500" }}>
                  {val}
                </span>
              </div>
            ))}
          </div>

          {/* Description */}
          <p style={{
            fontFamily: "'Inter'", fontSize: "0.8rem", color: "var(--text-secondary)",
            lineHeight: "1.65", flex: 1,
            display: "-webkit-box", WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>{dest.description}</p>

          {/* Highlights Strip */}
          <div style={{
            background: "rgba(197,160,89,0.06)", border: "1px solid rgba(197,160,89,0.12)",
            borderRadius: "10px", padding: "10px 12px",
          }}>
            <div style={{
              fontFamily: "'Outfit'", fontSize: "0.65rem", fontWeight: "700",
              color: "var(--accent-gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px",
            }}>Top Highlights</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              {dest.highlights.slice(0, 2).map((h) => (
                <div key={h} style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                  <span style={{ color: "var(--accent-gold)", fontSize: "0.65rem", marginTop: "1px", flexShrink: 0 }}>▸</span>
                  <span style={{ fontFamily: "'Inter'", fontSize: "0.72rem", color: "rgba(240,240,255,0.7)", lineHeight: "1.4" }}>
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags + CTA */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            paddingTop: "10px", borderTop: "1px solid rgba(26,43,60,0.05)",
          }}>
            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
              {dest.tags.slice(0, 2).map((t) => (
                <span key={t} style={{
                  background: "rgba(26,43,60,0.05)", border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: "5px", padding: "2px 8px",
                  fontFamily: "'Outfit'", fontSize: "0.65rem", color: "rgba(26,43,60,0.55)",
                }}>{t}</span>
              ))}
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: "4px",
              fontFamily: "'Outfit'", fontWeight: "700", fontSize: "0.78rem", color: "var(--accent-gold)",
            }}>View <ArrowRight size={13} /></div>
          </div>
        </div>
      </article>
    </Link>
  );
}
