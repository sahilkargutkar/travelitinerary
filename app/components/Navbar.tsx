"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, MapPin, BarChart2, Info, Phone, ArrowRight, ChevronDown } from "lucide-react";

const NAV_LINKS = [
  {
    label: "Destinations",
    href: "/#destinations",
    icon: MapPin,
    sub: [
      { label: "Kerala", href: "/destinations/kerala", flag: "🇮🇳", from: "₹24,999" },
      { label: "Thailand", href: "/destinations/thailand", flag: "🇹🇭", from: "₹39,999" },
      { label: "Philippines", href: "/destinations/philippines", flag: "🇵🇭", from: "₹44,999" },
      { label: "Singapore", href: "/destinations/singapore", flag: "🇸🇬", from: "₹54,999" },
      { label: "South Africa", href: "/destinations/south-africa", flag: "🇿🇦", from: "₹89,999" },
      { label: "South Korea", href: "/destinations/south-korea", flag: "🇰🇷", from: "₹49,999" },
    ],
  },
  { label: "Compare Prices", href: "/compare", icon: BarChart2 },
  { label: "About", href: "/#about", icon: Info },
  { label: "Contact", href: "/#contact", icon: Phone },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [destDropOpen, setDestDropOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        transition: "all 0.4s ease",
        background: scrolled ? "rgba(240,243,244,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
        borderBottom: scrolled ? "1px solid rgba(26,43,60,0.06)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.4)" : "none",
        padding: scrolled ? "12px 0" : "20px 0",
      }}>
        <div className="container" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* LOGO */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "var(--accent-navy)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-playfair), serif", fontWeight: "900",
              fontSize: "1rem", color: "#F0F3F4",
              boxShadow: "0 4px 16px rgba(197,160,89,0.4)",
            }}>W</div>
            <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.35rem", fontWeight: "900" }}>
              <span style={{ color: "#F0F0FF" }}>Wander</span>
              <span style={{ color: "#E5C158" }}>Lux</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {NAV_LINKS.map((link) =>
              link.sub ? (
                <div key={link.label} style={{ position: "relative" }}>
                  <button
                    style={{
                      display: "flex", alignItems: "center", gap: "6px",
                      padding: "8px 14px", background: "transparent", border: "none",
                      cursor: "pointer", color: "rgba(255,255,255,0.8)",
                      fontFamily: "var(--font-playfair), serif", fontSize: "0.88rem", fontWeight: "600",
                      borderRadius: "10px", transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--accent-gold)";
                      e.currentTarget.style.background = "rgba(197,160,89,0.08)";
                      setDestDropOpen(true);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                      e.currentTarget.style.background = "transparent";
                    }}
                    onClick={() => setDestDropOpen(!destDropOpen)}
                  >
                    <link.icon size={14} />
                    {link.label}
                    <ChevronDown size={13} style={{ transition: "transform 0.2s ease", transform: destDropOpen ? "rotate(180deg)" : "none" }} />
                  </button>

                  {/* MEGA DROPDOWN */}
                  {destDropOpen && (
                    <div
                      style={{
                        position: "absolute", top: "calc(100% + 8px)", left: "-20px",
                        background: "rgba(12,12,24,0.97)", backdropFilter: "blur(30px)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        borderRadius: "18px", padding: "16px",
                        minWidth: "360px",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(197,160,89,0.06)",
                        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px",
                        zIndex: 1001,
                        animation: "fadeInUp 0.2s ease",
                      }}
                      onMouseEnter={() => setDestDropOpen(true)}
                      onMouseLeave={() => setDestDropOpen(false)}
                    >
                      {link.sub.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setDestDropOpen(false)}
                          style={{
                            display: "flex", alignItems: "center", gap: "10px",
                            padding: "10px 12px", borderRadius: "12px",
                            textDecoration: "none",
                            background: "rgba(26,43,60,0.03)",
                            border: "1px solid transparent",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(197,160,89,0.1)";
                            e.currentTarget.style.borderColor = "rgba(197,160,89,0.2)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(26,43,60,0.03)";
                            e.currentTarget.style.borderColor = "transparent";
                          }}
                        >
                          <span style={{ fontSize: "18px", flexShrink: 0 }}>{sub.flag}</span>
                          <div>
                            <div style={{ fontFamily: "var(--font-playfair), serif", fontWeight: "700", fontSize: "0.85rem", color: "var(--text-primary)" }}>
                              {sub.label}
                            </div>
                            <div style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.7rem", color: "var(--accent-gold)" }}>
                              from {sub.from}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    padding: "8px 14px",
                    color: "rgba(255,255,255,0.8)",
                    fontFamily: "var(--font-playfair), serif", fontSize: "0.88rem", fontWeight: "600",
                    borderRadius: "10px", textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--accent-gold)";
                    e.currentTarget.style.background = "rgba(197,160,89,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* RIGHT CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link href="/compare" style={{
              fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem", fontWeight: "600",
              color: "rgba(26,43,60,0.55)", textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.9)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(26,43,60,0.55)"; }}
            >
              ☎ +91 98765 43210
            </Link>
            <Link href="/#destinations" className="btn-primary" style={{ padding: "9px 20px", fontSize: "0.85rem" }}>
              Book Now <ArrowRight size={14} />
            </Link>
          </div>

          {/* MOBILE BURGER */}
          <button
            style={{
              display: "none", background: "rgba(26,43,60,0.06)",
              border: "1px solid rgba(26,43,60,0.1)",
              borderRadius: "10px", padding: "8px", cursor: "pointer",
              color: "var(--text-primary)",
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            id="mobile-menu-btn"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: "64px", left: 0, right: 0, bottom: 0, zIndex: 999,
          background: "rgba(240,243,244,0.98)", backdropFilter: "blur(30px)",
          padding: "32px 24px",
          overflowY: "auto",
          animation: "fadeInUp 0.2s ease",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "14px 16px", borderRadius: "14px",
                    fontFamily: "var(--font-playfair), serif", fontWeight: "700",
                    fontSize: "1.05rem", color: "var(--text-primary)",
                    textDecoration: "none",
                    background: "rgba(26,43,60,0.04)",
                    border: "1px solid rgba(26,43,60,0.07)",
                    marginBottom: "6px",
                    transition: "all 0.2s ease",
                  }}
                >
                  <link.icon size={18} color="var(--accent-gold)" />
                  {link.label}
                </Link>
                {link.sub && (
                  <div style={{ paddingLeft: "20px", marginBottom: "8px" }}>
                    {link.sub.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          display: "flex", alignItems: "center", gap: "10px",
                          padding: "10px 14px", borderRadius: "10px",
                          textDecoration: "none",
                          transition: "background 0.2s ease",
                          marginBottom: "4px",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(26,43,60,0.04)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                      >
                        <span style={{ fontSize: "16px" }}>{sub.flag}</span>
                        <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.8)" }}>
                          {sub.label}
                        </span>
                        <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.72rem", color: "var(--accent-gold)", marginLeft: "auto" }}>
                          {sub.from}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/#destinations" className="btn-primary" onClick={() => setMenuOpen(false)}
              style={{ justifyContent: "center", marginTop: "16px", fontSize: "1rem", padding: "14px" }}>
              Book Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          nav > div > div:nth-child(2) { display: none !important; }
          nav > div > div:nth-child(3) { display: none !important; }
          #mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
