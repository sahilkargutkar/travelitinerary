"use client";

import Link from "next/link";
import { Share2, MessageCircle, Camera, Globe, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{
      background: "#F0F3F4",
      borderTop: "1px solid rgba(26,43,60,0.05)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative Gradients */}
      <div style={{
        position: "absolute", top: 0, left: "20%",
        width: "600px", height: "1px",
        background: "rgba(197,160,89,0.2)",
      }} />
      <div style={{
        position: "absolute", bottom: "-100px", right: "-100px",
        width: "300px", height: "300px", borderRadius: "50%",
        display: "none",
      }} />

      <div className="container" style={{ paddingTop: "64px", paddingBottom: "32px", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: "40px",
          marginBottom: "48px"
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{
                background: "var(--accent-navy)", width: "40px", height: "40px",
                borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
                color: "#FFF",
              }}>
                <Globe size={24} strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: "900", fontSize: "1.5rem", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                WanderLux
              </span>
            </div>
            <p style={{
              fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.95rem", color: "var(--text-secondary)",
              lineHeight: "1.6", marginBottom: "24px", maxWidth: "300px"
            }}>
              We curate the world's most breathtaking destinations in pure luxury.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                { Icon: Share2, label: "Share" },
                { Icon: MessageCircle, label: "Message" },
                { Icon: Camera, label: "Instagram" },
                { Icon: Globe, label: "Website" }
              ].map(({ Icon, label }, i) => (
                <a key={i} href="#" aria-label={label} style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: "rgba(26,43,60,0.05)", border: "1px solid rgba(26,43,60,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(26,43,60,0.7)", transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(197,160,89,0.15)"; e.currentTarget.style.color = "var(--accent-gold)"; e.currentTarget.style.borderColor = "rgba(197,160,89,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(26,43,60,0.05)"; e.currentTarget.style.color = "rgba(26,43,60,0.7)"; e.currentTarget.style.borderColor = "rgba(26,43,60,0.1)"; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontFamily: "var(--font-playfair), serif", fontWeight: "700", fontSize: "1.1rem",
              color: "var(--text-primary)", marginBottom: "20px",
            }}>Destinations</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { name: "Kerala, India", href: "/destinations/kerala" },
                { name: "Phuket, Thailand", href: "/destinations/thailand" },
                { name: "Palawan, Philippines", href: "/destinations/philippines" },
                { name: "Singapore City", href: "/destinations/singapore" },
                { name: "Cape Town, SA", href: "/destinations/south-africa" },
                { name: "Seoul, South Korea", href: "/destinations/south-korea" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} style={{
                    fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.9rem",
                    color: "var(--text-secondary)", textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent-gold)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{
              fontFamily: "var(--font-playfair), serif", fontWeight: "700", fontSize: "1.1rem",
              color: "var(--text-primary)", marginBottom: "20px",
            }}>Company</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "About Us", href: "/#about" },
                { label: "Compare Prices", href: "/compare" },
                { label: "Travel Insurance", href: "#" },
                { label: "Terms & Conditions", href: "#" },
                { label: "Privacy Policy", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} style={{
                    fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.9rem",
                    color: "var(--text-secondary)", textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent-gold)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontFamily: "var(--font-playfair), serif", fontWeight: "700", fontSize: "1.1rem",
              color: "var(--text-primary)", marginBottom: "20px",
            }}>Contact Us</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <MapPin size={18} color="var(--accent-gold)" style={{ marginTop: "2px" }} />
                <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                  123 Luxury Lane, Cyber City<br />Gurugram, Haryana 122002
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Phone size={18} color="var(--accent-gold)" />
                <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  +91 98765 43210
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Mail size={18} color="var(--accent-gold)" />
                <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  concierge@wanderlux.com
                </span>
              </div>
            </div>

            <div style={{ marginTop: "24px" }}>
              <h5 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "0.8rem", color: "var(--text-primary)", marginBottom: "12px" }}>
                Subscribe to our Newsletter
              </h5>
              <div style={{ display: "flex", gap: "8px" }}>
                <input type="email" placeholder="Email address" style={{
                  background: "rgba(26,43,60,0.05)", border: "1px solid rgba(26,43,60,0.1)",
                  borderRadius: "10px", padding: "10px 14px", color: "var(--text-primary)",
                  fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.85rem", flex: 1,
                  outline: "none",
                }} />
                <button aria-label="Subscribe" style={{
                  background: "var(--accent-gold)", border: "none",
                  borderRadius: "10px", padding: "0 20px", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", 
                  color: "#FFFFFF", fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.85rem", fontWeight: "600", gap: "6px"
                }}>
                  Subscribe <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: "1px solid rgba(26,43,60,0.05)", paddingTop: "24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "16px",
        }}>
          <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} WanderLux Premium Travel. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Designed by <strong>WanderLux Studio</strong>
            </span>
          </div>
        </div>
      </div>
      
      <style>{`
        @media (max-width: 1024px) {
          footer .container > div:first-child { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          footer .container > div:first-child { grid-template-columns: 1fr !important; }
          footer .container > div:last-child { flex-direction: column; text-align: center; justify-content: center; }
        }
      `}</style>
    </footer>
  );
}
