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
          className="dest-card luxury-card"
          style={{
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            cursor: "pointer",
            height: "480px",
            border: "1px solid var(--border-subtle)",
            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.borderColor = "rgba(0, 184, 169, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = "var(--border-subtle)";
          }}
        >
          {/* Image */}
          <img
            src={dest.heroImage}
            alt={dest.name}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%", objectFit: "cover",
              transition: "transform 0.8s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          />

          {/* Premium Dark Gradient Overlay (No White Layer Wash) */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(10, 37, 64, 0.15) 30%, rgba(10, 37, 64, 0.85) 100%)",
            zIndex: 1,
          }} />

          {/* Top Badges */}
          <div style={{
            position: "absolute", top: "20px", left: "20px", right: "20px",
            display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            zIndex: 2,
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "50px", padding: "6px 14px",
            }}>
              <span style={{ fontSize: "16px" }}>{dest.flag}</span>
              <span style={{
                fontFamily: "var(--font-montserrat)", fontSize: "0.75rem",
                fontWeight: "700", color: "#FFFFFF",
              }}>{dest.country}</span>
            </div>
            
            <div style={{
              background: "var(--success)",
              borderRadius: "12px", padding: "8px 14px", textAlign: "right",
              boxShadow: "0 4px 14px rgba(22, 163, 74, 0.25)",
            }}>
              <div style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.6rem", fontWeight: "600", color: "rgba(255,255,255,0.85)", textTransform: "uppercase" }}>from</div>
              <div style={{ fontFamily: "var(--font-montserrat)", fontWeight: "800", fontSize: "1.1rem", color: "#FFFFFF" }}>
                ₹{dest.basePrice.toLocaleString("en-IN")}
              </div>
            </div>
          </div>

          {/* Bottom Content */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px", zIndex: 2 }}>
            <div style={{ marginBottom: "14px" }}>
              <h3 style={{
                fontFamily: "var(--font-playfair)", fontWeight: "800",
                fontSize: "2.2rem", color: "#FFFFFF", lineHeight: "1.1",
                marginBottom: "6px", letterSpacing: "-0.01em",
              }}>{dest.name}</h3>
              <p style={{
                fontFamily: "var(--font-montserrat)", fontStyle: "italic",
                fontSize: "0.9rem", color: "var(--accent)", fontWeight: "600",
              }}>{dest.tagline}</p>
            </div>

            <p style={{
              fontFamily: "var(--font-montserrat)", fontSize: "0.85rem",
              color: "rgba(250, 250, 247, 0.8)", lineHeight: "1.65",
              marginBottom: "20px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>{dest.description}</p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Clock size={14} color="var(--accent)" />
                  <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.78rem", color: "rgba(250, 250, 247, 0.9)", fontWeight: "600" }}>
                    {dest.duration}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Star size={14} color="var(--accent)" fill="var(--accent)" />
                  <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.78rem", color: "rgba(250, 250, 247, 0.9)", fontWeight: "600" }}>
                    {dest.rating} ({dest.reviewCount.toLocaleString()})
                  </span>
                </div>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: "6px",
                color: "var(--accent)", fontFamily: "var(--font-montserrat)", fontWeight: "700", fontSize: "0.85rem",
              }}>
                View Itinerary <ArrowRight size={14} />
              </div>
            </div>

            {/* Tags */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "18px" }}>
              {dest.tags.slice(0, 3).map((t) => (
                <span key={t} style={{
                  background: "rgba(255, 255, 255, 0.12)", border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "6px", padding: "4px 10px",
                  fontFamily: "var(--font-montserrat)", fontSize: "0.7rem", color: "#FAFAF7",
                  fontWeight: "600"
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
        className="dest-card luxury-card"
        style={{
          position: "relative", borderRadius: "20px", overflow: "hidden",
          cursor: "pointer", height: "100%", minHeight: "410px",
          border: "1px solid var(--border-subtle)",
          background: "var(--bg-card)",
          transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex", flexDirection: "column",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.borderColor = "rgba(0, 184, 169, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.borderColor = "var(--border-subtle)";
        }}
      >
        {/* Image Container */}
        <div style={{ position: "relative", height: "220px", overflow: "hidden", flexShrink: 0 }}>
          <img
            src={dest.heroImage}
            alt={dest.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          />

          {/* Dark gradient overlay for text readability on image */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(10, 37, 64, 0.1) 50%, rgba(10, 37, 64, 0.6) 100%)",
            zIndex: 1
          }} />

          {/* Country Badge */}
          <div style={{ position: "absolute", top: "14px", left: "14px",
            display: "flex", alignItems: "center", gap: "6px",
            background: "rgba(255, 255, 255, 0.75)", backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.4)", borderRadius: "50px", padding: "5px 12px",
            zIndex: 2,
          }}>
            <span style={{ fontSize: "14px" }}>{dest.flag}</span>
            <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.7rem", fontWeight: "700", color: "var(--primary)" }}>
              {dest.country}
            </span>
          </div>

          {/* Best Time */}
          <div style={{ position: "absolute", top: "14px", right: "14px", zIndex: 2 }}>
            <span style={{
              background: "rgba(10, 37, 64, 0.65)",
              backdropFilter: "blur(6px)",
              color: "#FFFFFF",
              borderRadius: "6px",
              padding: "4px 8px",
              fontFamily: "var(--font-montserrat)",
              fontSize: "0.65rem",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              border: "1px solid rgba(255, 255, 255, 0.15)"
            }}>{dest.bestTime}</span>
          </div>

          {/* Price */}
          <div style={{
            position: "absolute", bottom: "14px", right: "14px",
            background: "var(--success)",
            borderRadius: "10px", padding: "6px 12px",
            boxShadow: "0 4px 12px rgba(22, 163, 74, 0.2)",
            zIndex: 2,
          }}>
            <div style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.55rem", fontWeight: "600", color: "rgba(255,255,255,0.85)", textTransform: "uppercase" }}>from</div>
            <div style={{ fontFamily: "var(--font-montserrat)", fontWeight: "800", fontSize: "0.95rem", color: "#FFFFFF" }}>
              ₹{dest.basePrice.toLocaleString("en-IN")}
            </div>
          </div>

          {/* Dest name on image */}
          <div style={{ 
            position: "absolute", bottom: "14px", left: "14px", 
            background: "rgba(255, 255, 255, 0.15)", 
            backdropFilter: "blur(12px)", 
            WebkitBackdropFilter: "blur(12px)",
            padding: "10px 14px", borderRadius: "12px", 
            border: "1px solid rgba(255, 255, 255, 0.25)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            zIndex: 2,
          }}>
            <h3 style={{
              fontFamily: "var(--font-playfair), serif", fontWeight: "800", fontSize: "1.2rem",
              color: "#FFFFFF", lineHeight: "1.1", letterSpacing: "-0.01em", marginBottom: "2px"
            }}>{dest.name}</h3>
            <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: "600", fontSize: "0.68rem", color: "var(--accent)" }}>
              {dest.tagline}
            </p>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Stats */}
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {[
              { icon: Clock, val: dest.duration, color: "var(--accent)" },
              { icon: Users, val: dest.groupSize, color: "var(--secondary)" },
              { icon: Star, val: `${dest.rating} (${dest.reviewCount.toLocaleString()})`, color: "var(--accent)" },
            ].map(({ icon: Icon, val, color }) => (
              <div key={val} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Icon size={13} color={color} fill={color === "var(--accent)" && val.includes("(") ? "var(--accent)" : "none"} />
                <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: "600" }}>
                  {val}
                </span>
              </div>
            ))}
          </div>

          {/* Description */}
          <p style={{
            fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", color: "var(--text-secondary)",
            lineHeight: "1.6", flex: 1,
            display: "-webkit-box", WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>{dest.description}</p>

          {/* Highlights Strip */}
          <div style={{
            background: "rgba(0, 184, 169, 0.05)", border: "1px solid rgba(0, 184, 169, 0.12)",
            borderRadius: "12px", padding: "10px 14px",
          }}>
            <div style={{
              fontFamily: "var(--font-montserrat)", fontSize: "0.65rem", fontWeight: "700",
              color: "var(--secondary)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px",
            }}>Top Highlights</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {dest.highlights.slice(0, 2).map((h) => (
                <div key={h} style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                  <span style={{ color: "var(--secondary)", fontSize: "0.7rem", marginTop: "1px", flexShrink: 0 }}>▸</span>
                  <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.72rem", color: "var(--text-primary)", lineHeight: "1.4", fontWeight: "500" }}>
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags + CTA */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            paddingTop: "12px", borderTop: "1px solid var(--border-subtle)",
            marginTop: "auto"
          }}>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {dest.tags.slice(0, 2).map((t) => (
                <span key={t} style={{
                  background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)",
                  borderRadius: "6px", padding: "3px 8px",
                  fontFamily: "var(--font-montserrat)", fontSize: "0.65rem", color: "var(--text-secondary)",
                  fontWeight: "600"
                }}>{t}</span>
              ))}
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: "4px",
              fontFamily: "var(--font-montserrat)", fontWeight: "700", fontSize: "0.78rem", color: "var(--accent)",
            }}>View <ArrowRight size={13} /></div>
          </div>
        </div>
      </article>
    </Link>
  );
}
