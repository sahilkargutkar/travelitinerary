"use client";

import Link from "next/link";
import { Share2, MessageCircle, Camera, Globe, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{
      background: "var(--primary)", // Deep Ocean Blue #0A2540
      color: "#FAFAF7",
      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative fine-line border at top */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "1px",
        background: "linear-gradient(to right, transparent, rgba(0, 184, 169, 0.3), transparent)",
      }} />

      <div className="container" style={{ paddingTop: "80px", paddingBottom: "40px", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: "40px",
          marginBottom: "60px"
        }} className="footer-cols-grid">

          {/* Brand & Mission Statement */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{
                background: "rgba(255, 255, 255, 0.1)", width: "40px", height: "40px",
                borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--secondary)", border: "1px solid rgba(255, 255, 255, 0.15)"
              }}>
                <Globe size={20} />
              </div>
              <span style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: "900",
                fontSize: "1.5rem",
                color: "#FAFAF7",
                letterSpacing: "-0.02em"
              }}>
                WanderLux
              </span>
            </div>
            <p style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.9rem",
              color: "rgba(250, 250, 247, 0.75)",
              lineHeight: "1.6",
              marginBottom: "28px",
              maxWidth: "320px"
            }}>
              Crafting extraordinary, bespoke travel itineraries for the discerning explorer. Comparison-tested for absolute value and luxury.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {[
                { Icon: Share2, label: "Share" },
                { Icon: MessageCircle, label: "Twitter" },
                { Icon: Camera, label: "Instagram" },
                { Icon: Globe, label: "LinkedIn" }
              ].map(({ Icon, label }, i) => (
                <a key={i} href="#" aria-label={label} style={{
                  width: "38px", height: "38px", borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(250, 250, 247, 0.8)",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--secondary)";
                    e.currentTarget.style.color = "var(--primary)";
                    e.currentTarget.style.borderColor = "var(--secondary)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                    e.currentTarget.style.color = "rgba(250, 250, 247, 0.8)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links: Destinations */}
          <div>
            <h4 style={{
              fontFamily: "var(--font-playfair), serif", fontWeight: "700", fontSize: "1.1rem",
              color: "#FAFAF7", marginBottom: "24px", letterSpacing: "0.02em"
            }}>Destinations</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { name: "Kerala, India", href: "/destinations/kerala" },
                { name: "Phuket, Thailand", href: "/destinations/thailand" },
                { name: "Palawan, Philippines", href: "/destinations/philippines" },
                { name: "Singapore City", href: "/destinations/singapore" },
                { name: "Kruger Safari, SA", href: "/destinations/south-africa" },
                { name: "Seoul, South Korea", href: "/destinations/south-korea" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} style={{
                    fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.85rem",
                    color: "rgba(250, 250, 247, 0.75)", textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--secondary)"; e.currentTarget.style.paddingLeft = "4px"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(250, 250, 247, 0.75)"; e.currentTarget.style.paddingLeft = "0px"; }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 style={{
              fontFamily: "var(--font-playfair), serif", fontWeight: "700", fontSize: "1.1rem",
              color: "#FAFAF7", marginBottom: "24px", letterSpacing: "0.02em"
            }}>Company</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "About Us", href: "/#about" },
                { label: "Compare Prices", href: "/compare" },
                { label: "AI Concierge Planner", href: "/#ai-planner" },
                { label: "Editorial Articles", href: "/#blog" },
                { label: "Luxury Travel Insurance", href: "#" },
                { label: "Terms & Conditions", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} style={{
                    fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.85rem",
                    color: "rgba(250, 250, 247, 0.75)", textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--secondary)"; e.currentTarget.style.paddingLeft = "4px"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(250, 250, 247, 0.75)"; e.currentTarget.style.paddingLeft = "0px"; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Newsletter */}
          <div>
            <h4 style={{
              fontFamily: "var(--font-playfair), serif", fontWeight: "700", fontSize: "1.1rem",
              color: "#FAFAF7", marginBottom: "24px", letterSpacing: "0.02em"
            }}>Contact Concierge</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "28px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <MapPin size={16} color="var(--secondary)" style={{ marginTop: "3px", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.85rem", color: "rgba(250, 250, 247, 0.75)", lineHeight: "1.5" }}>
                  Mumbai | Pune | Delhi | Bangalore
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Phone size={16} color="var(--secondary)" style={{ flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.85rem", color: "rgba(250, 250, 247, 0.75)" }}>
                  +91 98765 43210
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Mail size={16} color="var(--secondary)" style={{ flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.85rem", color: "rgba(250, 250, 247, 0.75)" }}>
                  concierge@wandersouls.com
                </span>
              </div>
            </div>

            {/* Newsletter subscription */}
            <div>
              <h5 style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.75rem", fontWeight: "700", color: "#FAFAF7", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
                Subscribe to our Newsletter
              </h5>
              <div style={{ display: "flex", gap: "8px", position: "relative" }}>
                <input type="email" placeholder="Email address" style={{
                  background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "50px", padding: "10px 18px", color: "#FAFAF7",
                  fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.82rem", flex: 1,
                  outline: "none",
                }} />
                <button aria-label="Subscribe" style={{
                  background: "var(--accent)", border: "none",
                  borderRadius: "50px", padding: "0 18px", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#FFFFFF", fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.8rem", fontWeight: "700", gap: "4px",
                  boxShadow: "0 4px 10px rgba(255, 122, 89, 0.2)",
                  transition: "all 0.2s ease"
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#E56241"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "var(--accent)"; }}
                >
                  Join <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "16px",
        }}>
          <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.82rem", color: "rgba(250, 250, 247, 0.5)" }}>
            © {new Date().getFullYear()} WanderSouls Premium Travel. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.82rem", color: "rgba(250, 250, 247, 0.5)" }}>
              Designed by <strong>WanderSouls Studio</strong>
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
}
