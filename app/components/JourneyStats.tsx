"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Heart, Users, MapPin, ThumbsUp } from "lucide-react";

/* ── STATS DATA ── */
const STATS = [
  { icon: Users, value: 250, suffix: "", label: "Families using WanderSouls", color: "var(--secondary)" },
  { icon: MapPin, value: 1500, suffix: "+", label: "Restaurants & activities reviewed", color: "var(--accent)" },
  { icon: ThumbsUp, value: 98, suffix: "%", label: "Families recommend WanderSouls", color: "var(--secondary)" },
];

/* ── TESTIMONIAL DATA ── */
const TESTIMONIALS = [
  {
    quote: "WanderSouls is the best travel planning app I've ever used!",
    name: "Priya",
    joined: "Joined 2024",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&q=80",
    destination: "Kerala",
  },
  {
    quote: "The houseboat in Alleppey was pure magic. Every detail was planned to perfection.",
    name: "Rahul",
    joined: "Joined 2023",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&q=80",
    destination: "Thailand",
  },
  {
    quote: "We saved ₹35,000 compared to MakeMyTrip. The transparency is unmatched.",
    name: "Ananya",
    joined: "Joined 2024",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&q=80",
    destination: "Singapore",
  },
  {
    quote: "South Korea itinerary was phenomenal. The DMZ tour gave us goosebumps!",
    name: "Vikram",
    joined: "Joined 2025",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&q=80",
    destination: "South Korea",
  },
];

/* ── SOCIAL GALLERY DATA ── */
const SOCIAL_POSTS = [
  { image: "/gallery/thailand/AyutthayaElephant.jpg", username: "@priya.travels" },
  { image: "/gallery/singapore/mike-enerio-7ryPpZK1qV8-unsplash.jpg", username: "@rahulexplores" },
  { image: "/gallery/bali/Bali-swing.jpg", username: "@ananya.wanderer" },
  { image: "/gallery/thailand/WatArun.jpg", username: "@vikram.journey" },
];

/* ── ANIMATED COUNTER HOOK ── */
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

/* ── STAT CARD ── */
function StatCard({ icon: Icon, value, suffix, label, color }: typeof STATS[0]) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} style={{ textAlign: "center", flex: "1 1 200px" }}>
      <div style={{
        width: "56px", height: "56px", borderRadius: "16px",
        background: `${color}14`, display: "flex", alignItems: "center",
        justifyContent: "center", margin: "0 auto 16px",
      }}>
        <Icon size={28} color={color} strokeWidth={1.5} />
      </div>
      <div style={{
        fontFamily: "var(--font-playfair)", fontWeight: 800,
        fontSize: "clamp(2.5rem, 5vw, 3.5rem)", color: "var(--primary)",
        lineHeight: 1, marginBottom: "8px", letterSpacing: "-0.02em",
      }}>
        {count.toLocaleString("en-IN")}{suffix}
      </div>
      <div style={{
        fontFamily: "var(--font-montserrat)", fontSize: "0.85rem",
        color: "var(--text-muted)", fontWeight: 500, maxWidth: "180px",
        margin: "0 auto", lineHeight: 1.5,
      }}>
        {label}
      </div>
    </div>
  );
}

/* ── MAIN COMPONENT ── */
export default function JourneyStats() {
  const [activeIdx, setActiveIdx] = useState(0);
  const t = TESTIMONIALS[activeIdx];

  const prev = () => setActiveIdx((i) => (i === 0 ? TESTIMONIALS.length - 1 : i - 1));
  const next = () => setActiveIdx((i) => (i === TESTIMONIALS.length - 1 ? 0 : i + 1));

  /* Auto-advance testimonial */
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx]);

  return (
    <section style={{ background: "var(--bg)", padding: "100px 0 0" }}>
      <div className="container">

        {/* ─── STATS SECTION ─── */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <h2 style={{
            fontFamily: "var(--font-playfair)", fontWeight: 800,
            fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--primary)",
            marginBottom: "56px", letterSpacing: "-0.02em",
          }}>
            Our journey <span className="gradient-text">so far</span>
          </h2>

          <div className="journey-stats-row" style={{
            display: "flex", justifyContent: "center", gap: "48px",
            flexWrap: "wrap",
          }}>
            {STATS.map((s, i) => (
              <StatCard key={i} {...s} />
            ))}
          </div>
        </div>

        {/* ─── TESTIMONIAL CAROUSEL ─── */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <h3 style={{
            fontFamily: "var(--font-playfair)", fontWeight: 800,
            fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--primary)",
            marginBottom: "36px", letterSpacing: "-0.01em",
          }}>
            Families like yours love <span className="gradient-text">WanderSouls</span>
          </h3>

          {/* Card */}
          <div style={{
            maxWidth: "700px", margin: "0 auto",
            background: "var(--primary)", borderRadius: "24px",
            overflow: "hidden", position: "relative",
            minHeight: "320px",
          }}>
            {/* Decorative blob */}
            <div style={{
              position: "absolute", bottom: "-40px", left: "40%",
              width: "200px", height: "200px", borderRadius: "50%",
              background: "var(--secondary)", opacity: 0.15,
              filter: "blur(40px)", pointerEvents: "none",
            }} />

            <div className="testimonial-card-inner" style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              minHeight: "320px",
            }}>
              {/* Left - Text */}
              <div style={{
                padding: "40px 32px", display: "flex", flexDirection: "column",
                justifyContent: "space-between", position: "relative", zIndex: 1,
              }}>
                <div>
                  <Heart size={32} color="var(--secondary)" strokeWidth={1.5} style={{ marginBottom: "20px" }} />
                  <p style={{
                    fontFamily: "var(--font-playfair)", fontSize: "1.25rem",
                    color: "#FAFAF7", lineHeight: 1.5, fontWeight: 600,
                    marginBottom: "12px",
                  }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <span style={{
                    fontFamily: "var(--font-montserrat)", fontSize: "0.78rem",
                    color: "rgba(250,250,247,0.5)", fontWeight: 500,
                  }}>
                    {t.joined}
                  </span>
                </div>

                {/* Controls */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "24px" }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    background: "rgba(250,250,247,0.1)", color: "#FAFAF7",
                    padding: "8px 16px", borderRadius: "50px",
                    fontFamily: "var(--font-montserrat)", fontSize: "0.78rem",
                    fontWeight: 600, backdropFilter: "blur(8px)",
                  }}>
                    <MapPin size={13} /> See Itinerary
                  </span>
                  <button onClick={prev} aria-label="Previous testimonial" style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: "rgba(250,250,247,0.1)", border: "none",
                    color: "#FAFAF7", cursor: "pointer", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    transition: "background 0.2s",
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(250,250,247,0.2)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(250,250,247,0.1)"}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={next} aria-label="Next testimonial" style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: "var(--secondary)", border: "none",
                    color: "#FAFAF7", cursor: "pointer", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    transition: "background 0.2s",
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#00d4c3"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "var(--secondary)"}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Right - Avatar + Name badge */}
              <div style={{ position: "relative", overflow: "hidden" }}>
                {/* Decorative arc */}
                <div style={{
                  position: "absolute", left: "-60px", top: "0", bottom: "0",
                  width: "120px", background: "rgba(0,184,169,0.2)",
                  borderRadius: "0 50% 50% 0", zIndex: 1,
                }} />
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    objectPosition: "center top",
                  }}
                />
                {/* Name badge */}
                <div style={{
                  position: "absolute", top: "50%", left: "16px",
                  transform: "translateY(-50%)",
                  background: "var(--secondary)", color: "#fff",
                  padding: "6px 16px", borderRadius: "50px",
                  fontFamily: "var(--font-montserrat)", fontSize: "0.8rem",
                  fontWeight: 700, zIndex: 2,
                  boxShadow: "0 4px 16px rgba(0,184,169,0.4)",
                }}>
                  {t.name}
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "20px" }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                aria-label={`View testimonial ${i + 1}`}
                style={{
                  width: i === activeIdx ? "24px" : "8px",
                  height: "8px", borderRadius: "50px", border: "none",
                  background: i === activeIdx ? "var(--secondary)" : "var(--border-strong)",
                  cursor: "pointer", transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* ─── SOCIAL GALLERY ─── */}
        <div style={{ marginBottom: "0", paddingBottom: "80px" }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-end", marginBottom: "28px", flexWrap: "wrap", gap: "12px",
          }}>
            <div>
              <h3 style={{
                fontFamily: "var(--font-playfair)", fontWeight: 800,
                fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--primary)",
                marginBottom: "8px", letterSpacing: "-0.01em",
              }}>
                Share the joy of your journey
              </h3>
              <p style={{
                fontFamily: "var(--font-montserrat)", fontSize: "0.85rem",
                color: "var(--text-muted)", fontWeight: 500,
              }}>
                Show us your <span style={{ color: "var(--accent)", fontWeight: 700 }}>#BestTravelMoments</span>{" "}
                by tagging us <span style={{ color: "var(--secondary)", fontWeight: 700 }}>@WanderSouls</span>{" "}
                for a chance to be featured!
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <a href="#" aria-label="Instagram" style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "var(--bg-elevated)", display: "flex",
                alignItems: "center", justifyContent: "center",
                color: "var(--text-muted)", transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg-elevated)"; e.currentTarget.style.color = "var(--text-muted)"; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" aria-label="YouTube" style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "var(--bg-elevated)", display: "flex",
                alignItems: "center", justifyContent: "center",
                color: "var(--text-muted)", transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg-elevated)"; e.currentTarget.style.color = "var(--text-muted)"; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42A2.78 2.78 0 0020.6 4.5C18.88 4 12 4 12 4s-6.88 0-8.6.5A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.4 19.5C5.12 20 12 20 12 20s6.88 0 8.6-.5a2.78 2.78 0 001.94-1.92A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
              </a>
            </div>
          </div>

          {/* Image Grid */}
          <div className="social-gallery-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
          }}>
            {SOCIAL_POSTS.map((post, i) => (
              <div key={i} style={{
                position: "relative", borderRadius: "16px",
                overflow: "hidden", aspectRatio: "1",
                cursor: "pointer", 
              }}>
                <img
                  src={post.image}
                  alt={`Travel moment by ${post.username}`}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                />
                {/* Gradient overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(0deg, rgba(10,37,64,0.7) 0%, transparent 50%)",
                  pointerEvents: "none",
                }} />
                {/* Username */}
                <div style={{
                  position: "absolute", bottom: "14px", left: "14px",
                  fontFamily: "var(--font-montserrat)", fontSize: "0.78rem",
                  color: "#FAFAF7", fontWeight: 600, zIndex: 1,
                }}>
                  {post.username}
                </div>
                {/* Heart icon */}
                <div style={{
                  position: "absolute", top: "14px", right: "14px",
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  zIndex: 1,
                }}>
                  <Heart size={15} color="#FAFAF7" strokeWidth={2} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .testimonial-card-inner {
            grid-template-columns: 1fr !important;
          }
          .testimonial-card-inner > div:last-child {
            height: 250px;
          }
          .social-gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .journey-stats-row {
            gap: 32px !important;
          }
        }
        @media (max-width: 480px) {
          .social-gallery-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 10px !important;
          }
          .journey-stats-row {
            flex-direction: column !important;
            align-items: center !important;
          }
        }
      `}</style>
    </section>
  );
}
