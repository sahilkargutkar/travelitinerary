"use client";

import { CheckCircle, PhoneCall, Smartphone, ShieldCheck, Map } from "lucide-react";

export default function MobileAppPromo() {
  return (
    <section id="mobile-app" style={{
      padding: "64px 0",
      background: "var(--bg-elevated)",
      borderTop: "1px solid var(--border-subtle)",
      borderBottom: "1px solid var(--border-subtle)",
      overflow: "hidden"
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "center"
        }} className="app-promo-grid">

          {/* Left Column: Info & CTAs */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: "rgba(0, 184, 169, 0.1)", color: "var(--secondary)",
              padding: "6px 14px", borderRadius: "50px",
              fontFamily: "var(--font-montserrat)", fontSize: "0.75rem",
              fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em",
              marginBottom: "20px"
            }}>
              <Smartphone size={13} />
              Companion App
            </div>

            <h2 className="section-title" style={{ marginBottom: "24px" }}>
              Your Personal Concierge, <br />
              <span className="gradient-text">Right in Your Pocket</span>
            </h2>

            <p style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "1rem",
              color: "var(--text-secondary)",
              lineHeight: "1.7",
              marginBottom: "32px"
            }}>
              Download the WanderSouls companion app to keep your luxury travel documents organized, receive real-time updates on transfers, and connect with your dedicated travel designer instantly.
            </p>

            {/* Features list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
              {[
                { title: "Offline Itinerary Access", desc: "Never worry about cellular network. View all hotel bookings, flight tickets, and maps offline.", icon: Map },
                { title: "24/7 Direct Concierge Chat", desc: "Connect with your assigned luxury travel designer in one tap from anywhere in the world.", icon: PhoneCall },
                { title: "Real-Time Transfer Alerts", desc: "Instant notifications for airport pick-ups, driver contacts, and gate changes.", icon: ShieldCheck }
              ].map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <div key={i} style={{ display: "flex", gap: "16px" }}>
                    <div style={{
                      width: "42px", height: "42px", borderRadius: "12px",
                      background: "rgba(10, 37, 64, 0.04)", display: "flex",
                      alignItems: "center", justifyContent: "center", color: "var(--primary)",
                      flexShrink: 0, marginTop: "2px"
                    }}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 style={{
                        fontFamily: "var(--font-montserrat)", fontSize: "0.95rem", fontWeight: "700",
                        color: "var(--primary)", marginBottom: "4px"
                      }}>{feat.title}</h3>
                      <p style={{
                        fontFamily: "var(--font-montserrat)", fontSize: "0.82rem", color: "var(--text-secondary)",
                        lineHeight: "1.5", margin: 0
                      }}>{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Luxury App Store / Play Store Badges */}
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              {/* App Store */}
              <a href="#" style={{
                background: "var(--primary)", color: "#FFFFFF",
                borderRadius: "14px", padding: "12px 24px",
                display: "flex", alignItems: "center", gap: "12px",
                textDecoration: "none", boxShadow: "0 10px 24px rgba(10, 37, 64, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                transition: "all 0.3s ease"
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.84-.98 2.94.1.08.2.1.29.1 1.05 0 2.15-.62 2.52-1.43z" />
                </svg>
                <div style={{ textAlign: "left" }}>
                  <span style={{ display: "block", fontSize: "0.62rem", fontFamily: "var(--font-montserrat)", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", fontWeight: "600" }}>Download on the</span>
                  <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.9rem", fontWeight: "700", letterSpacing: "-0.01em" }}>App Store</span>
                </div>
              </a>

              {/* Play Store */}
              <a href="#" style={{
                background: "var(--primary)", color: "#FFFFFF",
                borderRadius: "14px", padding: "12px 24px",
                display: "flex", alignItems: "center", gap: "12px",
                textDecoration: "none", boxShadow: "0 10px 24px rgba(10, 37, 64, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                transition: "all 0.3s ease"
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M3 5.27V18.73c0 .89 1.08 1.34 1.71.71l6.73-6.73-6.73-6.73C4.08 3.93 3 4.38 3 5.27z M17.47 11.29l-4.57-2.61L12 9.56l4.57 4.57 2.15-1.23c.53-.3.53-1.08 0-1.38l-1.25-.71z M12 14.44l-1.12-1.12-6.73 6.73c.63.63 1.71.18 1.71-.71v-.33l6.14-3.51L12 14.44z M12 9.56l-6.14-3.51V5.72c0-.89-1.08-1.34-1.71-.71l6.73 6.73L12 9.56z" />
                </svg>
                <div style={{ textAlign: "left" }}>
                  <span style={{ display: "block", fontSize: "0.62rem", fontFamily: "var(--font-montserrat)", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", fontWeight: "600" }}>Get it on</span>
                  <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.9rem", fontWeight: "700", letterSpacing: "-0.01em" }}>Google Play</span>
                </div>
              </a>
            </div>

          </div>

          {/* Right Column: Pure CSS iPhone 15 Pro Mockup */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
            zIndex: 1
          }}>
            {/* The Phone frame */}
            <div style={{
              width: "290px",
              height: "580px",
              borderRadius: "44px",
              background: "#1E1E24", // Space Black titanium
              border: "11px solid #3A3A43", // Titanium rim bezel
              boxShadow: "0 30px 80px rgba(10, 37, 64, 0.25), inset 0 0 4px rgba(255,255,255,0.3)",
              position: "relative",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden"
            }}>

              {/* iPhone Dynamic Island */}
              <div style={{
                position: "absolute", top: "18px", left: "50%",
                transform: "translateX(-50%)",
                width: "90px", height: "24px",
                borderRadius: "20px", background: "#000000",
                zIndex: 10,
              }} />

              {/* Screen Content Wrapper */}
              <div style={{
                flex: 1,
                borderRadius: "26px",
                background: "#FAFAF7", // Match Soft Ivory body
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                position: "relative"
              }}>
                {/* Phone Status Bar */}
                <div style={{
                  padding: "14px 18px 4px",
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "0.62rem",
                  fontWeight: "700",
                  color: "var(--primary)"
                }}>
                  <span>9:41</span>
                  <div style={{ display: "flex", gap: "4px" }}>
                    <span>📶</span>
                    <span>🔋</span>
                  </div>
                </div>

                {/* App Main Header */}
                <div style={{ padding: "12px 16px 4px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ display: "block", fontFamily: "var(--font-montserrat)", fontSize: "0.6rem", color: "var(--text-muted)", fontWeight: "600" }}>WELCOME BACK</span>
                    <span style={{ fontFamily: "var(--font-playfair)", fontSize: "0.95rem", fontWeight: "800", color: "var(--primary)" }}>Hello, Priya</span>
                  </div>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: "rgba(0, 184, 169, 0.1)", border: "1px solid var(--secondary)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-playfair)", fontSize: "0.75rem", fontWeight: "700", color: "var(--secondary)"
                  }}>P</div>
                </div>

                {/* Simulated Screen Itinerary Card */}
                <div style={{ padding: "12px 14px", flex: 1, overflowY: "auto" }}>
                  <div style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(10, 37, 64, 0.05)",
                    borderRadius: "18px",
                    overflow: "hidden",
                    boxShadow: "0 6px 16px rgba(10, 37, 64, 0.02)"
                  }}>
                    {/* Munnar Image */}
                    <div style={{ height: "110px", position: "relative" }}>
                      <img
                        src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80"
                        alt="Munnar"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      <span style={{
                        position: "absolute", top: "10px", left: "10px",
                        background: "rgba(255,255,255,0.85)", backdropFilter: "blur(6px)",
                        border: "1px solid rgba(255,255,255,0.3)", borderRadius: "20px",
                        padding: "3px 8px", fontFamily: "var(--font-montserrat)",
                        fontSize: "0.55rem", fontWeight: "700", color: "var(--primary)"
                      }}>🌴 Kerala, India</span>
                    </div>

                    {/* Progress tracking details */}
                    <div style={{ padding: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.78rem", fontWeight: "700", color: "var(--primary)" }}>Munnar Tea Safari</span>
                        <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.68rem", fontWeight: "700", color: "var(--accent)" }}>Day 3 of 7</span>
                      </div>

                      <div style={{ width: "100%", height: "4px", background: "rgba(10,37,64,0.06)", borderRadius: "4px", marginBottom: "12px" }}>
                        <div style={{ width: "42%", height: "100%", background: "var(--secondary)", borderRadius: "4px" }} />
                      </div>

                      {/* Quick Schedule items */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                          <span style={{ color: "var(--secondary)", fontSize: "0.7rem", marginTop: "1px" }}>✓</span>
                          <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.68rem", color: "var(--text-secondary)", lineHeight: "1.3" }}>
                            <strong>09:00 AM</strong> Estate stroll & private guide pickup.
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                          <span style={{ color: "var(--accent)", fontSize: "0.7rem", marginTop: "1px" }}>▸</span>
                          <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.68rem", color: "var(--primary)", lineHeight: "1.3", fontWeight: "600" }}>
                            <strong>01:30 PM</strong> Tea Tasting & tasting seminar.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Button */}
                  <button style={{
                    width: "100%", padding: "10px", background: "var(--primary)",
                    border: "none", borderRadius: "12px", color: "#FFFFFF",
                    fontFamily: "var(--font-montserrat)", fontSize: "0.72rem", fontWeight: "700",
                    marginTop: "12px", cursor: "pointer", display: "flex", alignItems: "center",
                    justifyContent: "center", gap: "4px"
                  }}>
                    💬 Chat with Concierge
                  </button>
                </div>

                {/* Glassmorphic Tab Bar */}
                <div style={{
                  padding: "10px 16px 14px",
                  background: "rgba(255, 255, 255, 0.85)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  borderTop: "1px solid rgba(10,37,64,0.06)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  {["🗺️", "💬", "💼", "⚙️"].map((emoji, i) => (
                    <span key={i} style={{
                      fontSize: "1.1rem",
                      cursor: "pointer",
                      opacity: i === 0 ? 1 : 0.4
                    }}>{emoji}</span>
                  ))}
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
