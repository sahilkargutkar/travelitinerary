"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MapPin, BarChart2, Info, Phone, ArrowRight, ChevronDown } from "lucide-react";
import Logo from "./Logo";

interface NavLink {
  label: string;
  href: string;
  icon: any;
  sub?: { label: string; href: string; from: string }[];
}

const NAV_LINKS: NavLink[] = [
  {
    label: "Destinations",
    href: "/destinations",
    icon: MapPin,
  },
  { label: "Compare Prices", href: "/compare", icon: BarChart2 },
  { label: "About", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: Phone },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [destDropOpen, setDestDropOpen] = useState(false);

  const shouldBeSolid = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        background: shouldBeSolid ? "rgba(250, 250, 247, 0.85)" : "transparent",
        backdropFilter: shouldBeSolid ? "blur(20px)" : "none",
        borderBottom: shouldBeSolid ? "1px solid rgba(10, 37, 64, 0.06)" : "1px solid transparent",
        boxShadow: shouldBeSolid ? "0 4px 30px rgba(10, 37, 64, 0.03)" : "none",
        padding: shouldBeSolid ? "14px 0" : "24px 0",
      }}>
        <div className="container" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* LOGO */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <Logo scrolled={shouldBeSolid} />
          </Link>

          {/* DESKTOP NAV */}
          <div className="nav-desktop-links" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {NAV_LINKS.map((link) =>
              link.sub ? (
                <div key={link.label} style={{ position: "relative" }}>
                  <button
                    style={{
                      display: "flex", alignItems: "center", gap: "6px",
                      padding: "8px 16px", background: "transparent", border: "none",
                      cursor: "pointer",
                      color: shouldBeSolid ? "var(--text-primary)" : "rgba(255,255,255,0.9)",
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      borderRadius: "50px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={() => setDestDropOpen(true)}
                    onMouseLeave={() => setDestDropOpen(false)}
                    onClick={() => setDestDropOpen(!destDropOpen)}
                  >
                    {link.label}
                    <ChevronDown size={13} style={{
                      transition: "transform 0.3s ease",
                      transform: destDropOpen ? "rotate(180deg)" : "none"
                    }} />
                  </button>

                  {/* MEGA DROPDOWN */}
                  {destDropOpen && (
                    <div
                      style={{
                        position: "absolute", top: "calc(100% + 8px)", left: "50%",
                        transform: "translateX(-50%)",
                        background: "#FFFFFF",
                        border: "1px solid rgba(10, 37, 64, 0.08)",
                        borderRadius: "16px", padding: "16px",
                        minWidth: "380px",
                        boxShadow: "0 20px 50px rgba(10, 37, 64, 0.1)",
                        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px",
                        zIndex: 1001,
                        animation: "fadeUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
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
                            display: "flex", alignItems: "center", gap: "12px",
                            padding: "10px 14px", borderRadius: "10px",
                            textDecoration: "none",
                            background: "rgba(10, 37, 64, 0.02)",
                            border: "1px solid transparent",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(0, 184, 169, 0.06)";
                            e.currentTarget.style.borderColor = "rgba(0, 184, 169, 0.15)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(10, 37, 64, 0.02)";
                            e.currentTarget.style.borderColor = "transparent";
                          }}
                        >

                          <div>
                            <div style={{
                              fontFamily: "var(--font-playfair), serif",
                              fontWeight: "700",
                              fontSize: "0.85rem",
                              color: "var(--primary)"
                            }}>
                              {sub.label}
                            </div>
                            <div style={{
                              fontFamily: "var(--font-montserrat), sans-serif",
                              fontSize: "0.72rem",
                              color: "var(--accent)",
                              fontWeight: "500"
                            }}>
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
                    padding: "8px 16px",
                    color: shouldBeSolid ? "var(--text-primary)" : "rgba(255,255,255,0.9)",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    borderRadius: "50px",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--secondary)";
                    e.currentTarget.style.background = shouldBeSolid ? "rgba(10, 37, 64, 0.03)" : "rgba(255, 255, 255, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = shouldBeSolid ? "var(--text-primary)" : "rgba(255,255,255,0.9)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* RIGHT CTA */}
          <div className="nav-desktop-cta" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a href="tel:+918452087326" style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.85rem",
              fontWeight: "600",
              color: shouldBeSolid ? "var(--text-secondary)" : "rgba(255,255,255,0.85)",
              textDecoration: "none",
              transition: "color 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--secondary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = shouldBeSolid ? "var(--text-secondary)" : "rgba(255,255,255,0.85)"; }}
            >
              <Phone size={13} />
              +91 84520 87326
            </a>
            <Link href="/destinations" className="btn-primary" style={{
              padding: "10px 22px",
              fontSize: "0.82rem",
              borderRadius: "50px",
              boxShadow: shouldBeSolid ? "0 4px 14px rgba(255, 122, 89, 0.2)" : "0 4px 14px rgba(0,0,0,0.15)",
            }}>
              Book Now <ArrowRight size={14} />
            </Link>
          </div>

          {/* MOBILE BURGER */}
          <button
            style={{
              display: "none",
              background: shouldBeSolid ? "rgba(10, 37, 64, 0.04)" : "rgba(255, 255, 255, 0.12)",
              border: shouldBeSolid ? "1px solid rgba(10, 37, 64, 0.08)" : "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50px", padding: "8px", cursor: "pointer",
              color: shouldBeSolid ? "var(--primary)" : "#FFFFFF",
              transition: "all 0.3s ease",
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            id="mobile-menu-btn"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: "72px", left: 0, right: 0, bottom: 0, zIndex: 999,
          background: "rgba(250, 250, 247, 0.98)",
          backdropFilter: "blur(30px)",
          padding: "32px 24px",
          overflowY: "auto",
          animation: "fadeUp 0.3s ease",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 20px",
                    borderRadius: "16px",
                    fontFamily: "var(--font-playfair), serif",
                    fontWeight: "700",
                    fontSize: "1.1rem",
                    color: "var(--primary)",
                    textDecoration: "none",
                    background: "rgba(10, 37, 64, 0.03)",
                    border: "1px solid rgba(10, 37, 64, 0.05)",
                    marginBottom: "6px",
                    transition: "all 0.2s ease",
                  }}
                >
                  {link.label}
                </Link>
                {link.sub && (
                  <div style={{ paddingLeft: "16px", marginBottom: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    {link.sub.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          display: "flex", alignItems: "center", gap: "10px",
                          padding: "10px 16px", borderRadius: "12px",
                          textDecoration: "none",
                          background: "rgba(10, 37, 64, 0.01)",
                          border: "1px solid transparent",
                          transition: "all 0.2s ease",
                        }}
                      >

                        <span style={{
                          fontFamily: "var(--font-playfair), serif",
                          fontSize: "0.95rem",
                          color: "var(--text-secondary)",
                          fontWeight: "600"
                        }}>
                          {sub.label}
                        </span>
                        <span style={{
                          fontFamily: "var(--font-montserrat), sans-serif",
                          fontSize: "0.75rem",
                          color: "var(--accent)",
                          marginLeft: "auto",
                          fontWeight: "600"
                        }}>
                          {sub.from}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/destinations" className="btn-primary" onClick={() => setMenuOpen(false)}
              style={{ justifyContent: "center", marginTop: "16px", fontSize: "0.95rem", padding: "14px" }}>
              Book Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
      <style>{`
        @media (max-width: 1024px) {
          .nav-desktop-links { display: none !important; }
          .nav-desktop-cta { display: none !important; }
          #mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
