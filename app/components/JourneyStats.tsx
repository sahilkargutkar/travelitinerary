"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Heart, Users, MapPin, ThumbsUp } from "lucide-react";
import Logo from "@/public/logo.png";
import Image from "next/image";

/* ── STATS DATA ── */
const STATS = [
  { icon: Users, value: 50, suffix: "+", label: "Families using WanderSouls", color: "var(--secondary)" },
  { icon: MapPin, value: 10, suffix: "+", label: "Destinations Planned", color: "var(--accent)" },
  { icon: ThumbsUp, value: 100, suffix: "%", label: "Families recommend WanderSouls", color: "var(--secondary)" },
];

/* ── YOUTUBE SHORTS DATA ── */
const YOUTUBE_SHORTS = [
  { id: "DpFCLkthq28", family: "Sharma Family", destination: "Kerala Backwaters", title: "Alleppey Houseboat Magic" },
  { id: "SoVhU4dk3-I", family: "Mehta Family", destination: "Phuket, Thailand", title: "Island Hopping Fun" },
  { id: "rJBIM9rwKY0", family: "Desai Family", destination: "Kruger, South Africa", title: "Kruger Safari Encounters" },
  { id: "Q-atW0q03fQ", family: "Nair Family", destination: "Singapore", title: "Marina Bay Light Show" },
  { id: "wIUBmXwR-38", family: "Joshi Family", destination: "Seoul, South Korea", title: "Gyeongbokgung Temple Walk" },
  { id: "Te7oCBDpUng", family: "Gupta Family", destination: "Palawan, Philippines", title: "El Nido Lagoons Explored" },
  { id: "ffspmtENYTc", family: "Patel Family", destination: "Alleppey, Kerala", title: "Backwater Luxury Cruise" },
];

/* ── TESTIMONIALS DATA ── */
const TESTIMONIALS = [
  {
    name: "Priya & Rohan Sharma",
    destination: "Kerala Backwaters",
    quote: "WanderSouls made our anniversary trip absolutely seamless. The houseboat stay on Alleppey was magical — every detail was sorted for us!",
    joined: "Travelled December 2024",
    avatar: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
  },
  {
    name: "Mehta Family",
    destination: "Singapore & Malaysia",
    quote: "Booked a 6-night package — the kids loved Universal Studios and the Petronas Towers. WanderSouls compared every option and saved us ₹18,000!",
    joined: "Travelled January 2025",
    avatar: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=600&q=80",
  },
  {
    name: "Anjali Desai",
    destination: "Bali, Indonesia",
    quote: "Solo trip sorted in 48 hours. The itinerary PDF was a lifesaver — I printed it out and followed it day by day. Everything went perfectly.",
    joined: "Travelled March 2025",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80",
  },
  {
    name: "Gupta Family",
    destination: "Meghalaya",
    quote: "Living root bridges, Dawki lake — it was otherworldly. WanderSouls found us a package ₹12,000 cheaper than MakeMyTrip. Highly recommended!",
    joined: "Travelled February 2025",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80",
  },
  {
    name: "Nair Family",
    destination: "Thailand",
    quote: "Phi Phi islands, elephant sanctuary, Bangkok temples — 7 nights and every day was perfect. The team answered every WhatsApp within minutes!",
    joined: "Travelled April 2025",
    avatar: "https://images.unsplash.com/photo-1542385151-efd9000785f0?w=600&q=80",
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

/* ── SHORTS CARD (click-to-play) ── */
function ShortsCard({ short }: { short: typeof YOUTUBE_SHORTS[0] }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div
      style={{
        flex: "0 0 clamp(150px, 42vw, 200px)",
        width: "clamp(150px, 42vw, 200px)",
        height: "clamp(270px, 75vw, 355px)",
        borderRadius: "16px", overflow: "hidden", position: "relative",
        background: "var(--primary)", border: "1px solid var(--border-subtle)",
        boxShadow: "0 8px 24px rgba(10,37,64,0.06)",
        scrollSnapAlign: "start", cursor: "pointer",
      }}
      className="short-card"
    >
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${short.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={short.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      ) : (
        <div onClick={() => setPlaying(true)} style={{ width: "100%", height: "100%", position: "relative" }}>
          <img
            src={`https://img.youtube.com/vi/${short.id}/hqdefault.jpg`}
            alt={short.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
            className="short-thumb"
          />
          {/* Overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(10,37,64,0.85) 0%, rgba(10,37,64,0.1) 60%)",
          }} />
          {/* Play button */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "46px", height: "46px", borderRadius: "50%",
            background: "var(--secondary)", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 6px 20px rgba(0,184,169,0.45)",
            transition: "transform 0.3s ease",
          }} className="play-btn">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
          </div>
          {/* Bottom meta */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 10px", zIndex: 2 }}>
            <div style={{
              display: "inline-block",
              background: "rgba(0,184,169,0.18)", backdropFilter: "blur(6px)",
              color: "var(--secondary)", border: "1px solid rgba(0,184,169,0.3)",
              borderRadius: "50px", padding: "3px 8px",
              fontFamily: "var(--font-montserrat)", fontSize: "0.58rem",
              fontWeight: 700, textTransform: "uppercase", marginBottom: "6px",
            }}>
              {short.destination}
            </div>
            <div style={{
              fontFamily: "var(--font-playfair)", fontSize: "0.88rem",
              fontWeight: 800, color: "#fff", lineHeight: 1.3, marginBottom: "2px",
            }}>
              {short.title}
            </div>
            <div style={{
              fontFamily: "var(--font-montserrat)", fontSize: "0.65rem",
              color: "rgba(250,250,247,0.7)", fontWeight: 600,
            }}>
              {short.family}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


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
    <section className="journey-stats-section" style={{ background: "var(--bg)", padding: "100px 0 0" }}>
      <div className="container">

        {/* ─── STATS SECTION ─── */}
        <div className="journey-stats-margin-bottom" style={{ textAlign: "center", marginBottom: "80px" }}>
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

        {/* ─── YOUTUBE SHORTS ─── */}
        <div className="journey-stats-margin-bottom" style={{ marginBottom: "80px" }}>
          <h3 style={{
            fontFamily: "var(--font-playfair)", fontWeight: 800,
            fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--primary)",
            marginBottom: "8px", letterSpacing: "-0.01em", textAlign: "center",
          }}>
            Families like yours love <span className="gradient-text">WanderSouls</span>
          </h3>
          <p style={{
            fontFamily: "var(--font-montserrat)", fontSize: "0.9rem",
            color: "var(--text-secondary)", fontWeight: 500,
            textAlign: "center", marginBottom: "40px",
          }}>
            Watch real travel diaries by our happy families
          </p>

          {/* Carousel — buttons hidden on mobile via CSS */}
          <div style={{ position: "relative" }} className="shorts-outer">
            <button
              onClick={() => {
                const el = document.getElementById("shorts-scroll");
                if (el) el.scrollBy({ left: -300, behavior: "smooth" });
              }}
              aria-label="Scroll left"
              className="shorts-nav-btn"
              style={{
                position: "absolute", left: "-20px", top: "50%", transform: "translateY(-50%)",
                width: "44px", height: "44px", borderRadius: "50%",
                background: "#FFFFFF", border: "1px solid var(--border-subtle)",
                color: "var(--primary)", cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center", zIndex: 10,
                boxShadow: "0 4px 12px rgba(10,37,64,0.1)", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--primary)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "var(--primary)"; }}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById("shorts-scroll");
                if (el) el.scrollBy({ left: 300, behavior: "smooth" });
              }}
              aria-label="Scroll right"
              className="shorts-nav-btn"
              style={{
                position: "absolute", right: "-20px", top: "50%", transform: "translateY(-50%)",
                width: "44px", height: "44px", borderRadius: "50%",
                background: "#FFFFFF", border: "1px solid var(--border-subtle)",
                color: "var(--primary)", cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center", zIndex: 10,
                boxShadow: "0 4px 12px rgba(10,37,64,0.1)", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--primary)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "var(--primary)"; }}
            >
              <ChevronRight size={20} />
            </button>

            <div
              id="shorts-scroll"
              style={{
                display: "flex", gap: "14px", overflowX: "auto",
                scrollSnapType: "x mandatory", scrollbarWidth: "none",
                paddingBottom: "8px",
                /* first/last card padding so they don't sit flush on mobile */
                paddingLeft: "4px", paddingRight: "4px",
              }}
              className="shorts-scroll-hide"
            >
              {YOUTUBE_SHORTS.map((short) => (
                <ShortsCard key={short.id} short={short} />
              ))}
            </div>
          </div>
        </div>


        {/* ─── SOCIAL GALLERY ─── */}
        <div className="journey-stats-social-gallery" style={{ marginBottom: "0", paddingBottom: "80px" }}>
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
              <Image
                src="https://instagram.fbom37-1.fna.fbcdn.net/v/t51.82787-19/569316083_17904756150271197_5446830320963300047_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby40MDAuYzIifQ&_nc_ht=instagram.fbom37-1.fna.fbcdn.net&_nc_cat=109&_nc_oc=Q6cZ2gHi1fpq4CooFp42dTEQO4lRPqKDzhtq8bfujGnHJ51Ud7wat9mPq19UA5xLvwwlcQM&_nc_ohc=U0FT3OlvPisQ7kNvwEnbkN_&_nc_gid=6omOXcRVG8U-r14VZcjsVQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_Af-yXBR6L8lBBPe2vMbUECi0yUgAtfWgAZTsNibnFfRe8A&oe=6A383883&_nc_sid=8b3546"
                alt="WanderSouls Instagram"
                width={150}
                height={150}
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
                {/* <span style={{
                  background: "rgba(0, 184, 169, 0.08)",
                  color: "var(--secondary)",
                  borderRadius: "50px",
                  padding: "3px 12px",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-montserrat)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}>Verified Partner</span> */}
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
                  <strong style={{ color: "var(--primary)" }}>72</strong> posts
                </span>
                <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
                  <strong style={{ color: "var(--primary)" }}>251</strong> followers
                </span>
                <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
                  <strong style={{ color: "var(--primary)" }}>0</strong> following
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
        .shorts-scroll-hide::-webkit-scrollbar { display: none; }
        .short-card:hover .short-thumb { transform: scale(1.04); }
        .short-card:hover .play-btn { transform: translate(-50%,-50%) scale(1.1) !important; }
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
          .journey-stats-section {
            padding-top: 40px !important;
          }
          .journey-stats-margin-bottom {
            margin-bottom: 40px !important;
          }
          .journey-stats-social-gallery {
            padding-bottom: 40px !important;
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
        /* Shorts carousel — mobile */
        @media (max-width: 640px) {
          .shorts-nav-btn { display: none !important; }
          .shorts-outer { overflow: visible; }
          #shorts-scroll {
            padding-left: 0 !important;
            padding-right: 0 !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
