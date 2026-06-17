"use client";

import HeroSection from "./components/HeroSection";
import DestinationCard from "./components/DestinationCard";
import TravelCategories from "./components/TravelCategories";
import AiPlanner from "./components/AiPlanner";
import FeaturedPackages from "./components/FeaturedPackages";
import WorldMap from "./components/WorldMap";
import BlogGuides from "./components/BlogGuides";
import MobileAppPromo from "./components/MobileAppPromo";
import RevealOnScroll from "./components/RevealOnScroll";
import { destinations } from "../lib/destinations";
import Link from "next/link";
import { ArrowRight, BarChart2, Star, CheckCircle, ShieldCheck, HeartHandshake, Award } from "lucide-react";

const WHY_US = [
  {
    icon: Award,
    title: "Planned by Area Specialists",
    desc: "Your days are mapped out by experts who have lived and traveled extensively in these regions. We focus on quiet competence and logistical perfection.",
    color: "var(--accent)",
    stat: "6 Destinations",
  },
  {
    icon: ShieldCheck,
    title: "Verified Price Matching",
    desc: "We compare our costs directly against industry standards like MakeMyTrip & Veena World. Our margins are flat, and our pricing is clear.",
    color: "var(--secondary)",
    stat: "Save up to 35%",
  },
  {
    icon: HeartHandshake,
    title: "Dedicated 24/7 Support",
    desc: "From the moment you enquire to the day you return home, our travel concierge team is just a single tap away in our app — day or night.",
    color: "var(--accent)",
    stat: "Always available",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    destination: "Kerala",
    text: "WanderSouls planned every single detail. The houseboat experience on the Alleppey backwaters was beyond magical. The price comparison was fully honest — we saved ₹14,000 compared to MakeMyTrip.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80",
    color: "var(--accent)",
  },
  {
    name: "Rahul Mehta",
    location: "Bangalore",
    destination: "Thailand",
    text: "The Phi Phi island private tour, elephant sanctuary, and beach dining — all in one trip! And the price comparison showed us we saved ₹12,000 vs MakeMyTrip.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80",
    color: "var(--accent)",
  },
  {
    name: "Anita Desai",
    location: "Delhi",
    destination: "South Korea",
    text: "As first-time international travelers, the day-by-day PDF gave us so much confidence. Every restaurant, every temple — it was all planned beautifully by their AI & specialist designer.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&q=80",
    color: "var(--accent)",
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
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* ── TRUST BAR ── */}
      <section style={{
        padding: "24px 0",
        background: "rgba(0, 184, 169, 0.05)",
        borderTop: "1px solid rgba(0, 184, 169, 0.12)",
        borderBottom: "1px solid var(--border-subtle)",
      }}>
        <div className="container">
          <div style={{ display: "flex", gap: "32px", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              "✓ No Hidden Fees",
              "✓ Free Instantly Generated PDF Itinerary",
              "✓ Verified Price Match Guarantee",
              "✓ Day-by-Day Luxury Planning",
              "✓ 24/7 Dedicated Concierge Support",
            ].map((item) => (
              <span key={item} style={{
                fontFamily: "var(--font-montserrat)", fontSize: "0.78rem", fontWeight: "700",
                color: "var(--primary)", whiteSpace: "nowrap", letterSpacing: "0.05em",
                textTransform: "uppercase"
              }}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. POPULAR DESTINATIONS GRID */}
      <section id="destinations" style={{ padding: "64px 0 48px", background: "var(--bg)" }}>
        <div className="container">
          {/* Header */}
          <RevealOnScroll variant="fade-up">
            <div className="destinations-header">
              <div>
                <h2 className="section-title" style={{ marginBottom: "12px" }}>
                  Our <span className="gradient-text">Destinations</span>
                </h2>
                <p style={{
                  fontFamily: "var(--font-montserrat), sans-serif", fontSize: "1rem",
                  color: "var(--text-secondary)", maxWidth: "520px", lineHeight: "1.7",
                }}>
                  Browse the six regions we specialize in. We focus our expertise narrowly to ensure a higher standard of travel.
                </p>
              </div>
              <Link href="/compare" className="btn-secondary" style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <BarChart2 size={16} /> Compare All Prices
              </Link>
            </div>
          </RevealOnScroll>

          {/* Popular Tags */}
          <RevealOnScroll variant="fade-up" delay={100}>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "40px" }}>
              {POPULAR_TAGS.map((tag) => (
                <span key={tag} style={{
                  background: "rgba(10, 37, 64, 0.03)", border: "1px solid var(--border-subtle)",
                  borderRadius: "50px", padding: "8px 16px",
                  fontFamily: "var(--font-montserrat)", fontSize: "0.78rem", fontWeight: "600",
                  color: "var(--text-secondary)", cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(0, 184, 169, 0.08)";
                    e.currentTarget.style.borderColor = "var(--secondary)";
                    e.currentTarget.style.color = "var(--secondary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(10, 37, 64, 0.03)";
                    e.currentTarget.style.borderColor = "var(--border-subtle)";
                    e.currentTarget.style.color = "var(--text-secondary)";
                  }}
                >{tag}</span>
              ))}
            </div>
          </RevealOnScroll>

          {/* Featured + Grid Layout */}
          <RevealOnScroll variant="fade-up" delay={200}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px" }} className="dest-grid-layout">
              {/* Featured: Kerala (large) */}
              <div style={{ gridColumn: "span 2" }} className="dest-grid-span2">
                <DestinationCard destination={destinations[0]} index={0} featured />
              </div>

              {/* Thailand — standard */}
              <div style={{ gridColumn: "span 1" }}>
                <DestinationCard destination={destinations[1]} index={1} />
              </div>

              {/* Malaysia — standard */}
              <div>
                <DestinationCard destination={destinations[2]} index={2} />
              </div>

              {/* Singapore — standard */}
              <div>
                <DestinationCard destination={destinations[3]} index={3} />
              </div>

              {/* Meghalaya — standard */}
              <div>
                <DestinationCard destination={destinations[4]} index={4} />
              </div>

              {/* Featured: Bali (large) */}
              <div style={{ gridColumn: "span 2" }} className="dest-grid-span2">
                <DestinationCard destination={destinations[5]} index={5} featured />
              </div>
            </div>
          </RevealOnScroll>

          {/* Compare CTA Panel */}
          <div style={{
            marginTop: "60px", padding: "48px",
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "28px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "32px",
            alignItems: "center",
          }} className="compare-cta-grid">
            <div>
              <h3 style={{
                fontFamily: "var(--font-playfair), serif", fontWeight: "800", fontSize: "1.5rem",
                color: "var(--primary)", marginBottom: "10px",
              }}>
                Not sure which destination fits you?
              </h3>
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                Our side-by-side comparison engine benchmarks WanderSouls inclusions against MakeMyTrip and Veena World, updating you with real savings metrics.
              </p>
              <div style={{ display: "flex", gap: "16px", marginTop: "20px", flexWrap: "wrap" }}>
                {["Free comparison reports", "Fully anonymous", "Updated daily"].map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <CheckCircle size={14} color="var(--secondary)" />
                    <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "600" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-end" }}>
              <Link href="/compare" className="btn-primary" style={{ fontSize: "0.9rem", padding: "14px 28px" }}>
                Compare Package Values <ArrowRight size={16} />
              </Link>
              <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.72rem", color: "var(--text-muted)", textAlign: "right", fontWeight: "500" }}>
                Indicative comparison as of June 2026
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRAVEL CATEGORIES */}
      <TravelCategories />

      {/* 4. AI TRAVEL PLANNER */}
      <AiPlanner />

      {/* 5. FEATURED PACKAGES */}
      <FeaturedPackages />

      {/* 6. CUSTOMER TESTIMONIALS */}
      <section style={{
        padding: "64px 0",
        background: "var(--bg-elevated)",
        position: "relative",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
      }}>
        <div className="container">
          <RevealOnScroll variant="fade-up">
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(10, 37, 64, 0.05)", color: "var(--primary)",
                padding: "6px 14px", borderRadius: "50px",
                fontFamily: "var(--font-montserrat)", fontSize: "0.75rem",
                fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em",
                marginBottom: "16px"
              }}>
                Testimonials
              </div>
              <h2 className="section-title">
                Stories from <span className="gradient-text">Recent Travelers</span>
              </h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant="fade-up" delay={150}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="testimonials-grid">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "24px", padding: "40px",
                  position: "relative", transition: "all 0.4s ease",
                  height: "100%", display: "flex", flexDirection: "column"
                }}
                  className="luxury-card"
                >
                  {/* Quote Mark */}
                  <div style={{
                    position: "absolute", top: "20px", right: "24px",
                    fontFamily: "Georgia, serif", fontSize: "5rem", lineHeight: "1",
                    color: "rgba(10, 37, 64, 0.06)", fontWeight: "900", pointerEvents: "none",
                  }}>&ldquo;</div>

                  {/* Stars */}
                  <div style={{ display: "flex", gap: "3px", marginBottom: "20px" }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={15} color="var(--accent)" fill="var(--accent)" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p style={{
                    fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.88rem",
                    color: "var(--text-secondary)", lineHeight: "1.7",
                    marginBottom: "28px", fontStyle: "italic", fontWeight: "500",
                  }}>&ldquo;{t.text}&rdquo;</p>

                  {/* Reviewer */}
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "auto" }}>
                    <img src={t.avatar} alt={t.name} style={{
                      width: "48px", height: "48px", borderRadius: "50%",
                      objectFit: "cover", border: "2px solid var(--secondary)",
                    }} />
                    <div>
                      <div style={{
                        fontFamily: "var(--font-playfair), serif", fontWeight: "800",
                        fontSize: "0.95rem", color: "var(--primary)",
                      }}>{t.name}</div>
                      <div style={{
                        fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.72rem",
                        color: "var(--text-muted)", fontWeight: "600",
                      }}>{t.location} · Travelled to {t.destination}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 7. INTERACTIVE WORLD MAP */}
      <WorldMap />

      {/* 8. TRAVEL BLOG & GUIDES */}
      <BlogGuides />

      {/* 9. MOBILE APP PROMOTION */}
      <MobileAppPromo />

      {/* ── IMMERSIVE TRUST / STATS BAND ── */}
      <section style={{
        padding: "64px 0",
        background: "var(--bg-card)",
        position: "relative", overflow: "hidden",
      }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <RevealOnScroll variant="fade-up">
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <h2 className="section-title">
                How We Plan <span className="gradient-text">Your Trip</span>
              </h2>
              <p style={{
                fontFamily: "var(--font-montserrat), sans-serif", fontSize: "1.05rem",
                color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto", lineHeight: "1.7",
                fontWeight: "500"
              }}>
                A refined system built over a decade of industry experience, designed to eliminate stress and hidden costs.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant="fade-up" delay={150}>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }} className="why-grid">
              {WHY_US.map(({ icon: Icon, title, desc, color, stat }, i) => (
                <div
                  key={title}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "20px",
                    padding: "36px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    transition: "all 0.4s ease",
                    position: "relative", overflow: "hidden",
                  }}
                  className="luxury-card"
                >
                  <div style={{
                    width: "52px", height: "52px", borderRadius: "14px",
                    background: `${color}10`, display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, color: color
                  }}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: "var(--font-playfair), serif", fontWeight: "800", fontSize: "1.25rem",
                      color: "var(--primary)", marginBottom: "8px",
                    }}>{title}</h3>
                    <p style={{
                      fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.85rem", color: "var(--text-secondary)",
                      lineHeight: "1.6", marginBottom: "16px",
                    }}>{desc}</p>
                    <div style={{
                      display: "inline-block", background: `${color}10`,
                      borderRadius: "50px",
                      padding: "6px 12px", fontFamily: "var(--font-montserrat)",
                      fontSize: "0.78rem", fontWeight: "700", color: color,
                    }}>
                      {stat}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        padding: "80px 0",
        background: "var(--bg-elevated)",
        textAlign: "center"
      }}>
        <div className="container">
          <RevealOnScroll variant="zoom-in" duration={1000}>
            <div>
              <h2 className="section-title" style={{ fontSize: "clamp(2.5rem, 5vw, 3.8rem)", marginBottom: "24px" }}>
                Your Next Adventure is <br /> <span className="gradient-text">One Click Away</span>
              </h2>
              <p style={{
                fontFamily: "var(--font-montserrat), sans-serif", fontSize: "1.1rem",
                color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto 40px", lineHeight: "1.7",
                fontWeight: "500"
              }}>
                Skip the endless browser tabs. Let us handle the logistics, so you can focus on the travel.
              </p>
              <Link href="/compare" className="btn-primary" style={{ padding: "16px 36px", fontSize: "1rem" }}>
                Compare & Get Started <ArrowRight size={18} />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .dest-grid-layout { grid-template-columns: repeat(2, 1fr) !important; }
          .dest-grid-span2 { grid-column: span 2 !important; }
        }
        @media (max-width: 800px) {
          .dest-grid-layout { grid-template-columns: 1fr !important; }
          .dest-grid-span2 { grid-column: span 1 !important; }
          .why-grid { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .compare-cta-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .compare-cta-grid div:last-child { align-items: flex-start !important; }
        }
        @media (max-width: 640px) {
          .dest-grid-layout { grid-template-columns: 1fr !important; }
          .dest-grid-span2 { grid-column: span 1 !important; }
        }
      `}</style>
    </>
  );
}
