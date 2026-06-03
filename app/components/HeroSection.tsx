"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, MapPin, Clock, Star, TrendingUp } from "lucide-react";

const DESTINATIONS = [
  {
    slug: "kerala",
    name: "Kerala",
    subtitle: "God's Own Country",
    country: "India",
    flag: "🇮🇳",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&q=90",
    color: "var(--accent-gold)",
    price: "₹24,999",
    duration: "7D/6N",
    rating: "4.8",
    mood: "Serene & Spiritual",
  },
  {
    slug: "thailand",
    name: "Thailand",
    subtitle: "Land of Smiles",
    country: "Thailand",
    flag: "🇹🇭",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90",
    color: "#D4AF37",
    price: "₹39,999",
    duration: "8D/7N",
    rating: "4.9",
    mood: "Vibrant & Exotic",
  },
  {
    slug: "philippines",
    name: "Philippines",
    subtitle: "More Than the Expected",
    country: "Philippines",
    flag: "🇵🇭",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1920&q=90",
    color: "#1A2B3C",
    price: "₹44,999",
    duration: "8D/7N",
    rating: "4.7",
    mood: "Tropical & Wild",
  },
  {
    slug: "singapore",
    name: "Singapore",
    subtitle: "The Lion City",
    country: "Singapore",
    flag: "🇸🇬",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1920&q=90",
    color: "var(--accent-navy)",
    price: "₹54,999",
    duration: "5D/4N",
    rating: "4.8",
    mood: "Ultra-Modern",
  },
  {
    slug: "south-africa",
    name: "South Africa",
    subtitle: "A World in One Country",
    country: "South Africa",
    flag: "🇿🇦",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1920&q=90",
    color: "#8B5A2B",
    price: "₹89,999",
    duration: "10D/9N",
    rating: "4.9",
    mood: "Wild & Dramatic",
  },
  {
    slug: "south-korea",
    name: "South Korea",
    subtitle: "Ancient Meets Ultra-Modern",
    country: "South Korea",
    flag: "🇰🇷",
    image: "https://images.unsplash.com/photo-1617541086271-4d8e21a9d439?w=1920&q=90",
    color: "#C5A059",
    price: "₹49,999",
    duration: "7D/6N",
    rating: "4.8",
    mood: "Trendy & Cultural",
  },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(-1);
  const [transitioning, setTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => {
    if (idx === active || transitioning) return;
    setTransitioning(true);
    setPrev(active);
    setActive(idx);
    setTimeout(() => {
      setPrev(-1);
      setTransitioning(false);
    }, 700);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      goTo((active + 1) % DESTINATIONS.length);
    }, 6000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, transitioning]);

  const dest = DESTINATIONS[active];

  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "700px",
        overflow: "hidden",
        background: "#F0F3F4",
      }}
    >
      {/* ── BG IMAGES ── */}
      {DESTINATIONS.map((d, i) => (
        <div
          key={d.slug}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${d.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: i === active ? 1 : i === prev ? 0 : 0,
            transition: "opacity 0.8s ease",
            zIndex: 0,
          }}
        />
      ))}

      {/* ── MULTI-LAYER GRADIENT ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        background: "rgba(240,243,244,0.3)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        background: "rgba(240,243,244,0.3)" }} />

      {/* ── ACCENT GLOW ── */}
      <div style={{
        position: "absolute", left: "-10%", top: "20%",
        width: "500px", height: "500px", borderRadius: "50%",
        display: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", alignItems: "center" }}>
        <div className="hero-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 340px", gap: "60px",
          width: "100%", alignItems: "center",
        }}>
          {/* LEFT — MAIN TEXT */}
          <div style={{ maxWidth: "720px", marginTop: "-60px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <div style={{
                background: "var(--bg-card)",
                padding: "8px 16px", borderRadius: "50px",
                display: "inline-flex", alignItems: "center", gap: "10px",
                fontFamily: "var(--font-playfair), serif", fontSize: "0.85rem", fontWeight: "700",
                color: "var(--text-primary)",
                border: "1px solid rgba(26,43,60,0.1)",
              }}>
                <MapPin size={14} color={dest.color} />
                {dest.country}
              </div>
              <p style={{
                fontFamily: "var(--font-playfair), serif", fontWeight: "600", fontSize: "1rem",
                color: "rgba(26,43,60,0.9)", letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}>
                &ldquo;{dest.subtitle}&rdquo;
              </p>
            </div>

            {/* Tagline */}
            <p style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "1.05rem",
              color: "rgba(240,240,255,0.75)",
              maxWidth: "500px",
              lineHeight: "1.75",
              marginBottom: "40px",
            }}>
              Curated day-by-day itineraries, luxury stays, and unbeatable prices — for the world&apos;s most captivating destinations.
            </p>

            {/* Pills Row */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "40px" }}>
              {[
                { icon: Clock, label: dest.duration, color: "var(--accent-gold)" },
                { icon: Star, label: `${dest.rating} Rating`, color: "#E5C158" },
                { icon: TrendingUp, label: "Best Value", color: "#FF6F59" },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} style={{
                  display: "flex", alignItems: "center", gap: "7px",
                  background: "rgba(26,43,60,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "50px",
                  padding: "8px 16px",
                }}>
                  <Icon size={14} color={color} />
                  <span style={{
                    fontFamily: "var(--font-playfair), serif", fontSize: "0.8rem",
                    fontWeight: "600", color: "rgba(255,255,255,0.9)",
                  }}>{label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link href={`/destinations/${dest.slug}`} className="btn-primary"
                style={{ fontSize: "0.95rem", padding: "14px 32px" }}>
                Explore {dest.name} <ArrowRight size={17} />
              </Link>
              <Link href="/#destinations" className="btn-secondary"
                style={{ fontSize: "0.95rem", padding: "14px 28px" }}>
                All Destinations
              </Link>
            </div>
          </div>

          {/* RIGHT — DESTINATION SWITCHER */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {DESTINATIONS.map((d, i) => (
              <button
                key={d.slug}
                onClick={() => { if (intervalRef.current) clearInterval(intervalRef.current); goTo(i); }}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "14px 18px",
                  background: i === active
                    ? "rgba(26,43,60,0.1)"
                    : "rgba(26,43,60,0.03)",
                  border: i === active
                    ? `1px solid ${d.color}50`
                    : "1px solid rgba(26,43,60,0.06)",
                  borderRadius: "14px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(12px)",
                  textAlign: "left",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  if (i !== active) {
                    e.currentTarget.style.background = "rgba(26,43,60,0.07)";
                    e.currentTarget.style.borderColor = `${d.color}40`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (i !== active) {
                    e.currentTarget.style.background = "rgba(26,43,60,0.03)";
                    e.currentTarget.style.borderColor = "rgba(26,43,60,0.06)";
                  }
                }}
              >
                {/* Active indicator */}
                {i === active && (
                  <div style={{
                    position: "absolute", left: 0, top: 0, bottom: 0, width: "3px",
                    background: d.color, borderRadius: "0 2px 2px 0",
                  }} />
                )}

                {/* Thumb */}
                <div style={{
                  width: "44px", height: "44px", borderRadius: "10px",
                  overflow: "hidden", flexShrink: 0,
                  border: `2px solid ${i === active ? d.color + "60" : "transparent"}`,
                  transition: "border-color 0.3s ease",
                }}>
                  <img src={d.image} alt={d.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "14px" }}>{d.flag}</span>
                    <span style={{
                      fontFamily: "var(--font-playfair), serif", fontWeight: "700",
                      fontSize: "0.88rem", color: i === active ? "white" : "rgba(26,43,60,0.65)",
                      transition: "color 0.3s ease",
                    }}>{d.name}</span>
                  </div>
                  <div style={{
                    fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.72rem",
                    color: i === active ? d.color : "rgba(26,43,60,0.35)",
                    transition: "color 0.3s ease",
                    marginTop: "2px",
                  }}>{d.price} · {d.duration}</div>
                </div>

                {/* Arrow */}
                {i === active && (
                  <ArrowRight size={14} color={d.color} style={{ flexShrink: 0 }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM STATS BAR ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2,
        background: "rgba(240,243,244,0.3)",
        padding: "24px 0 32px",
      }}>
        <div className="container">
          <div style={{ display: "flex", gap: "0", alignItems: "center", flexWrap: "wrap" }}>
            {[
              { value: "6", label: "Curated Destinations", suffix: "+" },
              { value: "12,000", label: "Happy Travellers", suffix: "+" },
              { value: "4.8", label: "Average Rating", suffix: "★" },
              { value: "100", label: "Price Match Guarantee", suffix: "%" },
            ].map((stat, i) => (
              <div key={stat.label} style={{
                flex: 1, minWidth: "150px",
                padding: "0 28px",
                borderRight: i < 3 ? "1px solid rgba(26,43,60,0.08)" : "none",
                textAlign: "center",
              }}>
                <div style={{
                  fontFamily: "var(--font-playfair), serif", fontWeight: "900",
                  fontSize: "1.8rem", lineHeight: "1",
                  color: "var(--accent-navy)",
                  display: "flex", alignItems: "baseline", justifyContent: "center",
                  whiteSpace: "nowrap"
                }}>
                  {stat.value}{stat.suffix}
                </div>
                <div style={{
                  fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.75rem",
                  color: "rgba(26,43,60,0.45)", marginTop: "4px",
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROGRESS BAR ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "3px",
        background: "rgba(26,43,60,0.05)", zIndex: 3,
      }}>
        <div
          key={active}
          style={{
            height: "100%", width: "100%",
            background: "var(--accent-emerald)",
            transform: "scaleX(0)", transformOrigin: "left",
            animation: "progressBar 6s linear forwards",
          }}
        />
      </div>

      <style>{`
        @keyframes progressBar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @media (max-width: 1000px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-switcher { display: none !important; }
        }
      `}</style>
    </section>
  );
}
