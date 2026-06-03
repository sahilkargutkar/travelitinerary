"use client";

import HeroSection from "./components/HeroSection";
import DestinationCard from "./components/DestinationCard";
import { destinations } from "../lib/destinations";
import Link from "next/link";
import { ArrowRight, Shield, Award, Clock, HeartHandshake, FileText, BarChart2, Star, MapPin, CheckCircle } from "lucide-react";

const WHY_US = [
  {
    icon: Award,
    title: "Expert-Curated Itineraries",
    desc: "Every single day is planned by travel specialists who have personally visited each destination. No generic tours — just unforgettable experiences.",
    color: "var(--accent-gold)",
    stat: "6 Destinations",
  },
  {
    icon: Shield,
    title: "Radical Price Transparency",
    desc: "We show you real-time comparisons against Veena World & MakeMyTrip so you always know you're getting the absolute best value.",
    color: "#E5C158",
    stat: "Save up to 35%",
  },
  {
    icon: FileText,
    title: "Instant PDF Itinerary",
    desc: "Download your complete, branded itinerary as a polished PDF — with every hotel, activity, meal and transfer mapped out. Ready in seconds.",
    color: "#FF6F59",
    stat: "One-click download",
  },
  {
    icon: HeartHandshake,
    title: "Dedicated 24/7 Support",
    desc: "From the moment you enquire to the day you return home, our travel experts are just a call away — day or night, holiday or weekend.",
    color: "var(--accent-navy)",
    stat: "Always available",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    destination: "Kerala",
    text: "WanderLux planned every single detail. The houseboat experience on the Alleppey backwaters was beyond magical. Couldn't have done it better myself!",
    rating: 5,
    avatar: "P",
    color: "#C5A059",
  },
  {
    name: "Rahul Mehta",
    location: "Bangalore",
    destination: "Thailand",
    text: "The Phi Phi island tour, elephant sanctuary, cooking class — all in one trip! And the price comparison showed us we saved ₹12,000 vs MakeMyTrip.",
    rating: 5,
    avatar: "R",
    color: "#D4AF37",
  },
  {
    name: "Anita Desai",
    location: "Delhi",
    destination: "South Korea",
    text: "As first-time international travellers, the day-by-day PDF gave us so much confidence. Every restaurant, every temple — it was all planned.",
    rating: 5,
    avatar: "A",
    color: "#C5A059",
  },
];

const POPULAR_TAGS = [
  "🌴 Beach Escapes", "🗺️ Adventure Tours", "🏛️ Cultural Immersion",
  "🦁 Safari & Wildlife", "🍜 Food & Cuisine", "🏔️ Hill Stations",
  "🤿 Diving & Snorkelling", "💆 Wellness & Spa", "🎎 Heritage Walks",
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* ── TRUST BAR ── */}
      <section style={{
        padding: "20px 0",
        background: "rgba(197,160,89,0.05)",
        borderTop: "1px solid rgba(197,160,89,0.15)",
        borderBottom: "1px solid rgba(26,43,60,0.05)",
      }}>
        <div className="container">
          <div style={{ display: "flex", gap: "32px", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              "✓ No Hidden Fees",
              "✓ Free PDF Itinerary",
              "✓ Price Match Guarantee",
              "✓ Day-by-Day Planning",
              "✓ 24/7 Expert Support",
            ].map((item) => (
              <span key={item} style={{
                fontFamily: "var(--font-playfair), serif", fontSize: "0.82rem", fontWeight: "600",
                color: "rgba(26,43,60,0.7)", whiteSpace: "nowrap",
              }}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS GRID ── */}
      <section id="destinations" style={{ padding: "100px 0 80px", background: "var(--bg)" }}>
        <div className="container">
          {/* Header */}
          <div style={{ marginBottom: "60px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <div className="section-label">Explore The World</div>
              <h2 className="section-title" style={{ marginBottom: "12px" }}>
                Handpicked <span className="gradient-text">Destinations</span>
              </h2>
              <p style={{
                fontFamily: "var(--font-montserrat), sans-serif", fontSize: "1rem",
                color: "var(--text-secondary)", maxWidth: "480px", lineHeight: "1.7",
              }}>
                Six iconic destinations, hundreds of experiences, one seamless itinerary. Where will your story begin?
              </p>
            </div>
            <Link href="/compare" className="btn-secondary" style={{ flexShrink: 0 }}>
              <BarChart2 size={16} /> Compare All Prices
            </Link>
          </div>

          {/* Popular Tags */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "40px" }}>
            {POPULAR_TAGS.map((tag) => (
              <span key={tag} style={{
                background: "rgba(26,43,60,0.04)", border: "1px solid rgba(26,43,60,0.08)",
                borderRadius: "50px", padding: "6px 14px",
                fontFamily: "var(--font-playfair), serif", fontSize: "0.78rem",
                color: "rgba(26,43,60,0.65)", cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(197,160,89,0.1)";
                e.currentTarget.style.borderColor = "rgba(197,160,89,0.3)";
                e.currentTarget.style.color = "var(--accent-gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(26,43,60,0.04)";
                e.currentTarget.style.borderColor = "rgba(26,43,60,0.08)";
                e.currentTarget.style.color = "rgba(26,43,60,0.65)";
              }}
              >{tag}</span>
            ))}
          </div>

          {/* Featured + Grid Layout */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "auto auto", gap: "20px" }}>
            {/* Featured: Kerala (large) */}
            <div style={{ gridColumn: "1 / 2", gridRow: "1 / 2" }}>
              <DestinationCard destination={destinations[0]} index={0} />
            </div>

            {/* Featured: Thailand (large) */}
            <div style={{ gridColumn: "2 / 3", gridRow: "1 / 2" }}>
              <DestinationCard destination={destinations[1]} index={1} />
            </div>

            {/* Philippines — standard */}
            <div style={{ gridColumn: "3 / 4", gridRow: "1 / 2" }}>
              <DestinationCard destination={destinations[2]} index={2} />
            </div>

            {/* Singapore */}
            <div style={{ gridColumn: "1 / 2", gridRow: "2 / 3" }}>
              <DestinationCard destination={destinations[3]} index={3} />
            </div>

            {/* South Africa */}
            <div style={{ gridColumn: "2 / 3", gridRow: "2 / 3" }}>
              <DestinationCard destination={destinations[4]} index={4} />
            </div>

            {/* South Korea */}
            <div style={{ gridColumn: "3 / 4", gridRow: "2 / 3" }}>
              <DestinationCard destination={destinations[5]} index={5} />
            </div>
          </div>

          {/* Compare CTA Panel */}
          <div style={{
            marginTop: "60px", padding: "48px",
            background: "var(--bg-elevated)",
            border: "1px solid rgba(197,160,89,0.2)",
            borderRadius: "28px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "32px",
            alignItems: "center",
          }}>
            <div>
              <h3 style={{
                fontFamily: "var(--font-playfair), serif", fontWeight: "800", fontSize: "1.5rem",
                color: "var(--text-primary)", marginBottom: "10px",
              }}>
                Not sure which package is right for you?
              </h3>
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                Our price comparison tool shows WanderLux side-by-side with Veena World & MakeMyTrip — same duration, honest inclusions.
              </p>
              <div style={{ display: "flex", gap: "12px", marginTop: "20px", flexWrap: "wrap" }}>
                {["Free to compare", "No account needed", "Updated June 2025"].map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <CheckCircle size={13} color="#FF6F59" />
                    <span style={{ fontFamily: "'Inter'", fontSize: "0.8rem", color: "var(--text-secondary)" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-end" }}>
              <Link href="/compare" className="btn-primary" style={{ fontSize: "0.95rem" }}>
                Compare All Packages <ArrowRight size={16} />
              </Link>
              <span style={{ fontFamily: "'Inter'", fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "right" }}>
                Prices indicative as of June 2025
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMMERSIVE STATS BAND ── */}
      <section style={{
        padding: "80px 0",
        background: "var(--bg-card)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative blobs */}
        <div style={{
          position: "absolute", top: "-80px", left: "10%",
          width: "400px", height: "400px", borderRadius: "50%",
          display: "none",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span className="section-label" style={{ justifyContent: "center" }}>Why Choose Us</span>
            <h2 className="section-title">
              Travel Smarter with <span className="gradient-text">WanderLux</span>
            </h2>
            <p style={{
              fontFamily: "var(--font-montserrat), sans-serif", fontSize: "1.05rem",
              color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto", lineHeight: "1.7"
            }}>
              We've spent 10 years building the ultimate travel planning experience. Here's why thousands choose us every year.
            </p>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
          }}>
            {WHY_US.map(({ icon: Icon, title, desc, color, stat }, i) => (
              <div
                key={title}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid rgba(26,43,60,0.07)",
                  borderRadius: "22px",
                  padding: "36px",
                  display: "flex", gap: "24px",
                  transition: "all 0.4s ease",
                  position: "relative", overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${color}35`;
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.4), 0 0 40px ${color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(26,43,60,0.07)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* BG Glow */}
                <div style={{
                  position: "absolute", top: 0, right: 0, bottom: 0, width: "40%",
                  display: "none",
                }} />
                
                <div style={{
                  width: "60px", height: "60px", borderRadius: "16px",
                  background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Icon size={28} color={color} />
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "var(--font-playfair), serif", fontWeight: "800", fontSize: "1.3rem",
                    color: "var(--text-primary)", marginBottom: "8px",
                  }}>{title}</h3>
                  <p style={{
                    fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.95rem", color: "var(--text-secondary)",
                    lineHeight: "1.6", marginBottom: "16px",
                  }}>{desc}</p>
                  <div style={{
                    display: "inline-block", background: "rgba(26,43,60,0.05)",
                    border: "1px solid rgba(26,43,60,0.1)", borderRadius: "50px",
                    padding: "6px 12px", fontFamily: "var(--font-playfair), serif",
                    fontSize: "0.85rem", fontWeight: "700", color: color,
                  }}>
                    {stat}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{
        padding: "100px 0",
        background: "var(--bg-elevated)",
        position: "relative", overflow: "hidden",
      }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span className="section-label" style={{ justifyContent: "center" }}>Testimonials</span>
            <h2 className="section-title">
              Real Reviews from <span className="gradient-text">Real Explorers</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(26,43,60,0.07)",
                borderRadius: "24px", padding: "40px",
                position: "relative", transition: "all 0.4s ease",
                height: "100%", display: "flex", flexDirection: "column"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 24px 48px rgba(0,0,0,0.05)";
                e.currentTarget.style.borderColor = "rgba(197,160,89,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(26,43,60,0.07)";
              }}
              >
                {/* Quote Mark */}
                <div style={{
                  position: "absolute", top: "20px", right: "24px",
                  fontFamily: "Georgia, serif", fontSize: "6rem", lineHeight: "1",
                  color: `${t.color}15`, fontWeight: "900", pointerEvents: "none",
                }}>"</div>

                {/* Stars */}
                <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }}>
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={14} color="#E5C158" fill="#E5C158" />
                  ))}
                </div>

                {/* Review Text */}
                <p style={{
                  fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.88rem",
                  color: "rgba(26,43,60,0.8)", lineHeight: "1.75",
                  marginBottom: "24px", fontStyle: "italic",
                }}>{t.text}</p>

                {/* Reviewer */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "auto" }}>
                  <div style={{
                    width: "42px", height: "42px", borderRadius: "50%",
                    background: `${t.color}25`, border: `2px solid ${t.color}50`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-playfair), serif", fontWeight: "800",
                    fontSize: "1rem", color: t.color,
                  }}>{t.avatar}</div>
                  <div>
                    <div style={{
                      fontFamily: "var(--font-playfair), serif", fontWeight: "700",
                      fontSize: "0.9rem", color: "var(--text-primary)",
                    }}>{t.name}</div>
                    <div style={{
                      fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.75rem",
                      color: "var(--text-muted)",
                    }}>{t.location} · Travelled to {t.destination}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        padding: "100px 0",
        background: "var(--bg-elevated)",
        position: "relative", overflow: "hidden",
      }}>
        {/* BG decor */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "800px", height: "400px", borderRadius: "50%",
          display: "none",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <span className="section-label" style={{ justifyContent: "center", marginBottom: "16px" }}>Ready to pack?</span>
          <h2 className="section-title" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "24px" }}>
            Your next adventure is <br /> <span className="gradient-text">One Click Away</span>
          </h2>
          <p style={{
            fontFamily: "var(--font-montserrat), sans-serif", fontSize: "1.1rem",
            color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto 40px", lineHeight: "1.6"
          }}>
            Skip the endless research and let WanderLux craft your perfect itinerary. Expertly curated, beautifully presented.
          </p>
          <Link href="/compare" className="btn-primary" style={{ padding: "16px 36px", fontSize: "1.05rem" }}>
            Compare & Save <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .dest-grid-layout { grid-template-columns: repeat(2, 1fr) !important; }
          .dest-grid-layout > div { grid-column: auto !important; grid-row: auto !important; }
        }
        @media (max-width: 700px) {
          .dest-grid-layout { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .why-grid { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .compare-cta-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
