"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Users, Compass, Star } from "lucide-react";

const DESTINATIONS_LIST = [
  { slug: "kerala", name: "Kerala, India", flag: "🇮🇳", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&q=90" },
  { slug: "thailand", name: "Phuket, Thailand", flag: "🇹🇭", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90" },
  { slug: "philippines", name: "Palawan, Philippines", flag: "🇵🇭", image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1920&q=90" },
  { slug: "singapore", name: "Singapore City", flag: "🇸🇬", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1920&q=90" },
  { slug: "south-africa", name: "Kruger, South Africa", flag: "🇿🇦", image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1920&q=90" },
  { slug: "south-korea", name: "Seoul, South Korea", flag: "🇰🇷", image: "https://images.unsplash.com/photo-1617541086271-4d8e21a9d439?w=1920&q=90" }
];

const CYCLING_WORDS = ["Around the World", "with Radical Value", "with Radical Transparency", "with Bespoke Luxury"];

export default function HeroSection() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  // Search Module states
  const [selectedDest, setSelectedDest] = useState("");
  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedGuests, setSelectedGuests] = useState("2 Travelers");
  const [guestsDropdownOpen, setGuestsDropdownOpen] = useState(false);

  const destRef = useRef<HTMLDivElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);

  // Cycling/typing text logic
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullWord = CYCLING_WORDS[wordIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        if (currentText === fullWord) {
          timer = setTimeout(() => setIsDeleting(true), 2200);
          return;
        }
      } else {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
          return;
        }
      }
      
      const speed = isDeleting ? 25 : 55;
      timer = setTimeout(handleTyping, speed);
    };

    timer = setTimeout(handleTyping, 100);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex]);

  // Auto slide rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setActiveSlide((prev) => (prev + 1) % DESTINATIONS_LIST.length);
        setTransitioning(false);
      }, 500);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setDestDropdownOpen(false);
      }
      if (guestsRef.current && !guestsRef.current.contains(event.target as Node)) {
        setGuestsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (selectedDest) {
      router.push(`/destinations/${selectedDest}`);
    } else {
      // Default fallback
      router.push("/#destinations");
    }
  };

  return (
    <section style={{
      position: "relative",
      height: "100vh",
      minHeight: "750px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      background: "var(--primary)",
    }}>
      {/* ── BACKGROUND IMAGE SLIDER ── */}
      {DESTINATIONS_LIST.map((d, idx) => (
        <div
          key={d.slug}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${d.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: idx === activeSlide ? 1 : 0,
            transform: idx === activeSlide ? "scale(1.05)" : "scale(1)",
            transition: "opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1), transform 6s ease-in-out",
            zIndex: 0,
          }}
        />
      ))}

      {/* ── DEEP OCEAN BLUE GRADIENT OVERLAY ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to bottom, rgba(10, 37, 64, 0.4) 0%, rgba(10, 37, 64, 0.75) 100%)",
        zIndex: 1,
      }} />

      {/* ── HERO CONTENT ── */}
      <div className="container" style={{
        position: "relative",
        zIndex: 2,
        textAlign: "center",
        color: "#FFFFFF",
        paddingTop: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        
        {/* Trust Rating Indicator */}
        <div className="animate-fade-up" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          borderRadius: "50px",
          padding: "8px 18px",
          marginBottom: "24px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        }}>
          <div style={{ display: "flex", gap: "2px" }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={13} fill="var(--accent)" color="var(--accent)" />
            ))}
          </div>
          <span style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.78rem",
            fontWeight: "600",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "#FAFAF7",
          }}>
            Rated 4.9/5 by 12,000+ Luxury Travelers
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up" style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "clamp(2.5rem, 6.5vw, 4.8rem)",
          fontWeight: "800",
          color: "#FAFAF7",
          lineHeight: "1.1",
          maxWidth: "1000px",
          margin: "0 auto 20px",
          letterSpacing: "-0.02em",
          textShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        }}>
          Discover Extraordinary Journeys <br />
          <span style={{
            background: "linear-gradient(135deg, var(--secondary) 0%, #FAFAF7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            display: "inline-block",
            paddingRight: "4px"
          }} className="typing-cursor">{currentText}</span>
        </h1>

        {/* Description */}
        <p className="animate-fade-up" style={{
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: "clamp(0.95rem, 2vw, 1.25rem)",
          color: "rgba(250, 250, 247, 0.85)",
          maxWidth: "680px",
          margin: "0 auto 48px",
          lineHeight: "1.6",
          fontWeight: "500",
          textShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
        }}>
          Bespoke, day-by-day luxury itineraries comparison-tested for absolute value. Crafted by travel specialists with over two decades of design excellence.
        </p>

        {/* ── FLOATING GLASSMORPHISM SEARCH MODULE ── */}
        <div className="animate-fade-up hero-search-grid" style={{
          width: "100%",
          maxWidth: "960px",
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "24px",
          padding: "16px 24px",
          boxShadow: "0 24px 64px rgba(10, 37, 64, 0.35)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr auto",
          gap: "16px",
          alignItems: "center",
          textAlign: "left",
          marginBottom: "60px",
        }}>
          
          {/* 1. Destination Dropdown */}
          <div ref={destRef} style={{ position: "relative", cursor: "pointer" }} onClick={() => setDestDropdownOpen(!destDropdownOpen)}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px" }}>
              <div style={{ color: "var(--secondary)" }}><MapPin size={20} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", fontFamily: "var(--font-montserrat)", fontSize: "0.68rem", fontWeight: "700", textTransform: "uppercase", color: "rgba(250, 250, 247, 0.65)", letterSpacing: "0.08em" }}>Where to?</span>
                <span style={{ display: "block", fontFamily: "var(--font-playfair)", fontSize: "0.95rem", fontWeight: "700", color: "#FAFAF7", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: "2px" }}>
                  {selectedDest ? DESTINATIONS_LIST.find(d => d.slug === selectedDest)?.name : "Explore destinations"}
                </span>
              </div>
            </div>
            
            {destDropdownOpen && (
              <div style={{
                position: "absolute", top: "calc(100% + 14px)", left: 0, right: 0,
                background: "#FFFFFF", borderRadius: "16px", padding: "10px",
                boxShadow: "0 10px 30px rgba(10, 37, 64, 0.2)",
                zIndex: 100, display: "flex", flexDirection: "column", gap: "4px"
              }}>
                {DESTINATIONS_LIST.map((dest) => (
                  <button
                    key={dest.slug}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDest(dest.slug);
                      setDestDropdownOpen(false);
                    }}
                    style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      width: "100%", padding: "10px 12px", border: "none",
                      background: selectedDest === dest.slug ? "rgba(0, 184, 169, 0.08)" : "transparent",
                      borderRadius: "10px", textAlign: "left", cursor: "pointer",
                      fontFamily: "var(--font-montserrat)", fontSize: "0.85rem",
                      fontWeight: "600", color: "var(--primary)",
                      transition: "background 0.2s ease"
                    }}
                    onMouseEnter={(e) => { if (selectedDest !== dest.slug) e.currentTarget.style.background = "rgba(10, 37, 64, 0.03)"; }}
                    onMouseLeave={(e) => { if (selectedDest !== dest.slug) e.currentTarget.style.background = "transparent"; }}
                  >
                    <span style={{ fontSize: "16px" }}>{dest.flag}</span>
                    <span>{dest.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Vertical divider line */}
          <div style={{ width: "1px", height: "40px", background: "rgba(255, 255, 255, 0.15)", display: "none" }} />

          {/* 2. Date Input Selector */}
          <div style={{ cursor: "pointer", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px" }}>
              <div style={{ color: "var(--secondary)" }}><Calendar size={20} /></div>
              <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
                <span style={{ display: "block", fontFamily: "var(--font-montserrat)", fontSize: "0.68rem", fontWeight: "700", textTransform: "uppercase", color: "rgba(250, 250, 247, 0.65)", letterSpacing: "0.08em" }}>When?</span>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{
                    background: "transparent", border: "none", outline: "none",
                    fontFamily: "var(--font-playfair)", fontSize: "0.95rem", fontWeight: "700",
                    color: "#FAFAF7", width: "100%", cursor: "pointer",
                    marginTop: "2px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Vertical divider line */}
          <div style={{ width: "1px", height: "40px", background: "rgba(255, 255, 255, 0.15)", display: "none" }} />

          {/* 3. Guests Selector */}
          <div ref={guestsRef} style={{ position: "relative", cursor: "pointer" }} onClick={() => setGuestsDropdownOpen(!guestsDropdownOpen)}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px" }}>
              <div style={{ color: "var(--secondary)" }}><Users size={20} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", fontFamily: "var(--font-montserrat)", fontSize: "0.68rem", fontWeight: "700", textTransform: "uppercase", color: "rgba(250, 250, 247, 0.65)", letterSpacing: "0.08em" }}>Travelers</span>
                <span style={{ display: "block", fontFamily: "var(--font-playfair)", fontSize: "0.95rem", fontWeight: "700", color: "#FAFAF7", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: "2px" }}>
                  {selectedGuests}
                </span>
              </div>
            </div>

            {guestsDropdownOpen && (
              <div style={{
                position: "absolute", top: "calc(100% + 14px)", left: 0, right: 0,
                background: "#FFFFFF", borderRadius: "16px", padding: "10px",
                boxShadow: "0 10px 30px rgba(10, 37, 64, 0.2)",
                zIndex: 100, display: "flex", flexDirection: "column", gap: "4px"
              }}>
                {["1 Traveler", "2 Travelers", "3-4 Travelers", "5+ Luxury Group"].map((g) => (
                  <button
                    key={g}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedGuests(g);
                      setGuestsDropdownOpen(false);
                    }}
                    style={{
                      width: "100%", padding: "10px 12px", border: "none",
                      background: selectedGuests === g ? "rgba(0, 184, 169, 0.08)" : "transparent",
                      borderRadius: "10px", textAlign: "left", cursor: "pointer",
                      fontFamily: "var(--font-montserrat)", fontSize: "0.85rem",
                      fontWeight: "600", color: "var(--primary)",
                      transition: "background 0.2s ease"
                    }}
                    onMouseEnter={(e) => { if (selectedGuests !== g) e.currentTarget.style.background = "rgba(10, 37, 64, 0.03)"; }}
                    onMouseLeave={(e) => { if (selectedGuests !== g) e.currentTarget.style.background = "transparent"; }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. Search CTA Button */}
          <button
            onClick={handleSearch}
            className="btn-primary"
            style={{
              padding: "16px 28px",
              height: "100%",
              minHeight: "56px",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              background: "var(--accent)",
              border: "none",
              color: "#FFFFFF",
              fontSize: "0.95rem",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(255, 122, 89, 0.3)",
              transition: "all 0.3s ease",
            }}
          >
            <Compass size={18} />
            Search
          </button>
        </div>

        {/* ── TRUSTED BY BRAND LOGOS ── */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
          width: "100%",
        }}>
          <p style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.68rem",
            fontWeight: "700",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(250, 250, 247, 0.5)",
          }}>
            Trusted Partner of Leading Luxury Publications & Guides
          </p>
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "40px",
            flexWrap: "wrap",
            opacity: 0.65,
          }}>
            {["CONDE NAST", "VIRTUOSO", "AMAN RESORTS", "FORBES TRAVEL GUIDE", "LEISURE & TRAVEL"].map((brand) => (
              <span key={brand} style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "0.9rem",
                fontWeight: "800",
                color: "#FAFAF7",
                letterSpacing: "0.06em",
              }}>{brand}</span>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 800px) {
          .hero-search-grid {
            grid-template-columns: 1fr !important;
            padding: 20px !important;
            border-radius: 20px !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
