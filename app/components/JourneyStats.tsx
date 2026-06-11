"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Heart, Users, MapPin, ThumbsUp } from "lucide-react";

/* ── STATS DATA ── */
const STATS = [
  { icon: Users, value: 250, suffix: "", label: "Families using WanderSouls", color: "var(--secondary)" },
  { icon: MapPin, value: 1500, suffix: "+", label: "Destinations Planned", color: "var(--accent)" },
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
  {
    image: "/gallery/instagram/post1.jpg",
    likes: "1.2k",
    comments: 30,
    caption: "50 travellers. 5 unforgettable months. ✈️💜 We’re beyond grateful to every traveller who chose to explore the world with us, trusted us with their dream journeys, and became a part of the WanderSouls family. From beautiful memories to lifelong friendships — this is only the beginning. 🌍✨ #WanderSouls #TravelMemories #DreamTravels #TravelCommunity",
    link: "https://www.instagram.com/p/DYPSX4BNEV-/"
  },
  {
    image: "/gallery/instagram/post2.jpg",
    likes: "942",
    comments: 45,
    caption: "Chasing tropical vibes and ocean waves 🌊🐚🐳",
    link: "https://www.instagram.com/p/DTC75J6Da4R/"
  },
  {
    image: "/gallery/instagram/post3.jpg",
    likes: "1.5k",
    comments: 60,
    caption: "Creating trips that turn into lifetime memories — shared by our happy clients ✨ At Wandersouls, we don’t just plan trips — we create memories our clients love sharing ❤️✨ #HappyClients #TravelMemories #ClientLove #Wandersouls #MemoriesMade",
    link: "https://www.instagram.com/p/DSX14m5DYW9/"
  },
  {
    image: "/gallery/instagram/post4.jpg",
    likes: "1.1k",
    comments: 75,
    caption: "Dreaming of Darjeeling? ☁️🏔️ We've got the perfect Darjeeling packages for you! DM us for itinerary details, prices, and bookings. ✨ #DarjeelingDiaries #TravelWithUs #DarjeelingPackage #ExploreIndia",
    link: "https://www.instagram.com/p/DZCu1O8tJ0R/"
  },
  {
    image: "/gallery/instagram/post5.jpg",
    likes: "1.8k",
    comments: 90,
    caption: "Why chase foreign dreams when India already has places that feel unreal? 🇮🇳✨ Paradise exists right here at home. ❤️🌏 Travel more. Discover local. Fall in love with India all over again. ✈️🇮🇳 #IncredibleIndia #TravelIndia #DekhoApnaDesh #IndiaTourism #WanderIndia",
    link: "https://www.instagram.com/p/DYtnpw6jUNe/"
  },
  {
    image: "/gallery/instagram/post6.jpg",
    likes: "2.4k",
    comments: 105,
    caption: "Looks like AI, feels like a dream… but this is nature showing off its magic 🌿✨ Tawang Falls is truly one of those places that makes you pause and admire how unreal our world can be 🏔️🤍 Would you add this hidden paradise to your travel bucket list? ✈️👇 #TravelIndia #Wanderlust #TravelDiaries #ExploreMore #MountainEscape",
    link: "https://www.instagram.com/p/DYfHf5rtgW5/"
  }
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
                Immersive Explorer Diaries
              </h3>
              <p style={{
                fontFamily: "var(--font-montserrat)", fontSize: "0.85rem",
                color: "var(--text-muted)", fontWeight: 500,
              }}>
                Tag us <span style={{ color: "var(--secondary)", fontWeight: 700 }}>@wandersoulsindia</span>{" "}
                to share your luxury travels with our global community.
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <a href="https://www.instagram.com/wandersoulsindia/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "var(--bg-elevated)", display: "flex",
                alignItems: "center", justifyContent: "center",
                color: "var(--text-muted)", transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg-elevated)"; e.currentTarget.style.color = "var(--text-muted)"; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>
            </div>
          </div>

          {/* Instagram Profile Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "24px",
            padding: "24px 32px",
            marginBottom: "32px",
            boxShadow: "0 10px 30px -10px rgba(10, 37, 64, 0.04)"
          }} className="instagram-profile-card">
            <a href="https://www.instagram.com/wandersoulsindia/" target="_blank" rel="noopener noreferrer" style={{ display: "block", position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&q=80"
                alt="WanderSouls Instagram"
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid var(--accent)",
                  padding: "3px"
                }}
              />
              <div style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "0.7rem",
                fontWeight: "bold",
                border: "2px solid #fff"
              }}>
                📸
              </div>
            </a>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <a href="https://www.instagram.com/wandersoulsindia/" target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "var(--primary)",
                  textDecoration: "none",
                }}>
                  wandersoulsindia
                </a>
                <span style={{
                  background: "rgba(0, 184, 169, 0.08)",
                  color: "var(--secondary)",
                  borderRadius: "50px",
                  padding: "3px 12px",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-montserrat)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}>Verified Partner</span>
              </div>
              <p style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "0.85rem",
                color: "var(--text-secondary)",
                margin: "6px 0 12px",
                fontWeight: 500,
                lineHeight: "1.45"
              }}>
                <strong>WanderSouls</strong> • Curating the world's most beautiful destinations with radical value comparison. Handcrafted day-by-day luxury itineraries. ✨
              </p>
              <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
                  <strong style={{ color: "var(--primary)" }}>256</strong> posts
                </span>
                <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
                  <strong style={{ color: "var(--primary)" }}>12.4k</strong> followers
                </span>
                <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
                  <strong style={{ color: "var(--primary)" }}>82</strong> following
                </span>
              </div>
            </div>
            <div className="profile-action-btn">
              <a href="https://www.instagram.com/wandersoulsindia/" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{
                padding: "10px 20px",
                fontSize: "0.8rem",
                borderRadius: "12px",
                minHeight: "auto",
                boxShadow: "0 4px 12px rgba(255, 122, 89, 0.15)",
                textTransform: "none",
                letterSpacing: "normal"
              }}>
                Follow Profile
              </a>
            </div>
          </div>

          {/* Image Grid */}
          <div className="social-gallery-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(6, 1fr)",
            gap: "16px",
          }}>
            {SOCIAL_POSTS.map((post, i) => (
              <a href={post.link} key={i} target="_blank" rel="noopener noreferrer" style={{
                position: "relative", borderRadius: "16px",
                overflow: "hidden", aspectRatio: "1",
                cursor: "pointer", display: "block"
              }} className="social-gallery-item">
                <img
                  src={post.image}
                  alt={`Travel moment ${i + 1}`}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                  className="social-post-img"
                />

                {/* Gradient overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(10,37,64,0.8) 0%, transparent 60%)",
                  transition: "background 0.3s ease",
                }} className="social-post-overlay" />

                {/* Likes / Comments Stats overlay (visible on hover) */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "rgba(10, 37, 64, 0.7)",
                  display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                  opacity: 0, transition: "opacity 0.3s ease",
                  padding: "16px", textAlign: "center", color: "#FAFAF7", zIndex: 2
                }} className="social-post-hover-details">
                  <div style={{ display: "flex", gap: "14px", fontFamily: "var(--font-montserrat)", fontWeight: 700, fontSize: "0.85rem", marginBottom: "8px" }}>
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                  <p style={{
                    fontFamily: "var(--font-montserrat)", fontSize: "0.65rem", lineHeight: "1.35",
                    margin: 0, fontWeight: 500, overflow: "hidden", display: "-webkit-box",
                    WebkitLineClamp: 3, WebkitBoxOrient: "vertical"
                  }}>{post.caption}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .social-gallery-item:hover .social-post-hover-details {
          opacity: 1 !important;
        }
        .social-gallery-item:hover .social-post-img {
          transform: scale(1.06);
        }
        @media (max-width: 992px) {
          .instagram-profile-card {
            flex-direction: column;
            text-align: center;
            padding: 24px;
            gap: 16px;
          }
          .instagram-profile-card > div {
            align-items: center;
            display: flex;
            flex-direction: column;
          }
          .social-gallery-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
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
            grid-template-columns: repeat(2, 1fr) !important;
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
