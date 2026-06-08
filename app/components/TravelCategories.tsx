"use client";

import { Compass, Gem, Palmtree, Heart, Users, User } from "lucide-react";

const CATEGORIES = [
  {
    icon: Compass,
    title: "Adventure",
    desc: "Uncharted trails, mountain summits, and exhilarating wildlife safaris.",
    count: "14 Packages",
    color: "#00B8A9", // Secondary Teal
  },
  {
    icon: Gem,
    title: "Luxury Escapes",
    desc: "Private villas, world-class dining, and exclusive boutique resort stays.",
    count: "8 Packages",
    color: "#FF7A59", // Accent Sunset
  },
  {
    icon: Palmtree,
    title: "Beach Escapes",
    desc: "Turquoise shorelines, overwater bungalows, and pristine sands.",
    count: "19 Packages",
    color: "#378ADD", // Sky blue
  },
  {
    icon: Heart,
    title: "Honeymoon",
    desc: "Romantic candlelit retreats, private cruises, and intimate hideaways.",
    count: "11 Packages",
    color: "#FF597B", // Romantic Rose
  },
  {
    icon: Users,
    title: "Family Trips",
    desc: "Multi-generational itineraries with expert-guided cultural sights.",
    count: "15 Packages",
    color: "#16A34A", // Success Green
  },
  {
    icon: User,
    title: "Solo Travel",
    desc: "Self-discovery journeys with immersive local connections and safety.",
    count: "10 Packages",
    color: "#0A2540", // Primary Ocean Blue
  },
];

export default function TravelCategories() {
  return (
    <section id="categories" style={{
      padding: "64px 0",
      background: "var(--bg-elevated)",
      borderTop: "1px solid var(--border-subtle)",
      borderBottom: "1px solid var(--border-subtle)",
    }}>
      <div className="container">
        
        {/* Header */}
        <div style={{
          textAlign: "center",
          marginBottom: "64px",
        }}>
          <h2 className="section-title">
            Travel by <span className="gradient-text">Category</span>
          </h2>
          <p style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "1rem",
            color: "var(--text-secondary)",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.7",
          }}>
            Every traveler is unique. Discover our tailor-made itineraries organized by the type of journey that matches your soul.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="categories-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
        }}>
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "24px",
                  padding: "32px",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "20px",
                  position: "relative",
                  overflow: "hidden",
                }}
                className="luxury-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.borderColor = `${cat.color}35`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                }}
              >
                {/* Icon Container */}
                <div style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  background: `${cat.color}10`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: cat.color,
                  transition: "all 0.3s ease",
                }}>
                  <Icon size={24} strokeWidth={2} />
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontWeight: "800",
                    fontSize: "1.3rem",
                    color: "var(--primary)",
                    marginBottom: "8px",
                  }}>{cat.title}</h3>
                  <p style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.88rem",
                    color: "var(--text-secondary)",
                    lineHeight: "1.6",
                    marginBottom: "0",
                  }}>{cat.desc}</p>
                </div>

                {/* Count Badge */}
                <span style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: "700",
                  color: cat.color,
                  background: `${cat.color}10`,
                  padding: "4px 12px",
                  borderRadius: "50px",
                  alignSelf: "flex-end",
                  marginTop: "auto"
                }}>{cat.count}</span>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
