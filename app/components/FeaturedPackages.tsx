"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { CheckCircle, ShieldCheck, Tag, ArrowRight, Plane, Hotel, Navigation, Compass, Utensils } from "lucide-react";

const PACKAGES = [
  {
    id: "kerala-pkg",
    title: "Kerala Backwaters & Tea Gardens Luxury",
    duration: "7 Days / 6 Nights",
    slug: "kerala",
    price: 24999,
    mmtPrice: 32500,
    veenaPrice: 34900,
    savings: "₹7,501",
    inclusions: ["5★ Heritage Resorts + 1N Private Houseboat", "Daily Gourmet Breakfast & Dinner", "Dedicated Private Chauffeur & AC SUV", "Private Munnar Tea Estate Tasting Safari", "Complimentary 90-min Ayurvedic Spa Session"],
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
  },
  {
    id: "thailand-pkg",
    title: "Phuket & Phi Phi Islands Tropical Retreat",
    duration: "8 Days / 7 Nights",
    slug: "thailand",
    price: 39999,
    mmtPrice: 47800,
    veenaPrice: 49900,
    savings: "₹7,801",
    inclusions: ["Luxury Beachfront Pool Villa Accommodation", "Private Speedboat Yacht Charter to Phi Phi", "All Inclusive Meals & Sunset Cocktail Cruises", "Exclusive Access Elephant Sanctuary Guided Tour", "Bespoke Culinary Cooking Class & Tour Guide"],
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    id: "safari-pkg",
    title: "Kruger Wildlife Safari & Cape Vineyards",
    duration: "10 Days / 9 Nights",
    slug: "south-africa",
    price: 89999,
    mmtPrice: 112000,
    veenaPrice: 118000,
    savings: "₹22,001",
    inclusions: ["Ultra-luxury Safari Lodge Overlooking River", "Twice Daily Dawn & Dusk Private Game Drives", "Private Flight from Johannesburg to Kruger Reserve", "Franschhoek VIP Wine Tram Tour & Wine Pairings", "Exclusive Helicopter Ride over Table Mountain"],
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
  },
];

export default function FeaturedPackages() {
  const [animateBars, setAnimateBars] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setAnimateBars(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateBars(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="packages" style={{
      padding: "64px 0",
      background: "var(--bg)",
    }}>
      <div className="container">

        {/* Header */}
        <div style={{
          textAlign: "center",
          marginBottom: "64px",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(0, 184, 169, 0.1)", color: "var(--secondary)",
            padding: "6px 14px", borderRadius: "50px",
            fontFamily: "var(--font-montserrat)", fontSize: "0.75rem",
            fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em",
            marginBottom: "16px"
          }}>
            <Tag size={13} />
            Exclusive Values
          </div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Luxury Packages</span>
          </h2>
          <p style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "1rem",
            color: "var(--text-secondary)",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.7",
          }}>
            Compare packages and see verified price transparency. WanderSouls cuts middlemen markup to deliver superior itineraries for less.
          </p>
        </div>

        {/* Package list grid */}
        <div className="packages-grid" style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}>
          {PACKAGES.map((pkg) => {
            // Percent calculations for comparison bar
            const maxVal = pkg.veenaPrice;
            const wanderPct = (pkg.price / maxVal) * 100;
            const mmtPct = (pkg.mmtPrice / maxVal) * 100;

            return (
              <div
                key={pkg.id}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "24px",
                  overflow: "hidden",
                  display: "grid",
                  gridTemplateColumns: "360px 1fr",
                  boxShadow: "0 10px 30px rgba(10, 37, 64, 0.03)",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="luxury-card flex-pkg-card"
              >
                {/* Package Left Thumbnail */}
                <div style={{ position: "relative", height: "100%", minHeight: "300px" }}>
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to bottom, rgba(10,37,64,0.1) 60%, rgba(10,37,64,0.8) 100%)",
                  }} />
                  <div style={{
                    position: "absolute", bottom: "24px", left: "24px", right: "24px"
                  }}>
                    <span style={{
                      display: "inline-block", background: "rgba(255, 255, 255, 0.2)",
                      backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      borderRadius: "6px", padding: "4px 10px",
                      fontFamily: "var(--font-montserrat)", fontSize: "0.72rem",
                      fontWeight: "700", color: "#FFFFFF", marginBottom: "8px"
                    }}>{pkg.duration}</span>
                    <h3 style={{
                      fontFamily: "var(--font-playfair)", fontSize: "1.35rem",
                      fontWeight: "800", color: "#FFFFFF", margin: 0
                    }}>{pkg.title}</h3>
                  </div>
                </div>

                {/* Package Details & Comparison */}
                <div style={{ padding: "36px", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "32px" }} className="pkg-inner-grid">

                  {/* Left inner column: Inclusions list */}
                  <div>
                    <h4 style={{
                      fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", fontWeight: "700",
                      color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.08em",
                      marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px"
                    }}>
                      <CheckCircle size={15} color="var(--secondary)" />
                      Inclusions & Highlights
                    </h4>

                    <ul style={{
                      listStyle: "none", padding: 0, margin: 0,
                      display: "flex", flexDirection: "column", gap: "10px"
                    }}>
                      {pkg.inclusions.map((inc, index) => (
                        <li key={index} style={{
                          display: "flex", gap: "8px", alignItems: "flex-start",
                          fontFamily: "var(--font-montserrat)", fontSize: "0.82rem",
                          color: "var(--text-secondary)", lineHeight: "1.4"
                        }}>
                          <span style={{ color: "var(--secondary)", fontWeight: "bold" }}>✓</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Quick amenities icon strip */}
                    <div style={{
                      display: "flex", gap: "16px", marginTop: "24px",
                      paddingTop: "16px", borderTop: "1px solid var(--border-subtle)",
                      color: "var(--text-muted)",
                    }}>
                      {[
                        { icon: Plane, label: "Flights" },
                        { icon: Hotel, label: "5★ Stay" },
                        { icon: Navigation, label: "AC SUV" },
                        { icon: Utensils, label: "Gourmet Meals" },
                      ].map((amen, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <amen.icon size={13} color="var(--secondary)" />
                          <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.7rem", fontWeight: "600" }}>{amen.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right inner column: Price Comparison Widget */}
                  <div style={{
                    display: "flex", flexDirection: "column",
                    justifyContent: "space-between",
                    paddingLeft: "24px",
                    borderLeft: "1px solid var(--border-subtle)"
                  }} className="pkg-price-col">

                    {/* Visual Comparison bars */}
                    <div>
                      <h4 style={{
                        fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", fontWeight: "700",
                        color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.08em",
                        marginBottom: "16px"
                      }}>Price Transparency</h4>

                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {/* WanderSouls Bar */}
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-montserrat)", fontSize: "0.72rem", fontWeight: "700", marginBottom: "4px" }}>
                            <span style={{ color: "var(--secondary)" }}>WanderSouls</span>
                            <span style={{ color: "var(--primary)" }}>₹{pkg.price.toLocaleString("en-IN")}</span>
                          </div>
                          <div style={{ width: "100%", height: "8px", background: "rgba(10,37,64,0.05)", borderRadius: "4px" }}>
                            <div style={{
                              width: animateBars ? `${wanderPct}%` : "0%",
                              height: "100%",
                              background: "var(--secondary)",
                              borderRadius: "4px",
                              transition: "width 1.4s cubic-bezier(0.16, 1, 0.3, 1)"
                            }} />
                          </div>
                        </div>

                        {/* MakeMyTrip Bar */}
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-montserrat)", fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "4px" }}>
                            <span>MakeMyTrip</span>
                            <span>₹{pkg.mmtPrice.toLocaleString("en-IN")}</span>
                          </div>
                          <div style={{ width: "100%", height: "8px", background: "rgba(10,37,64,0.05)", borderRadius: "4px" }}>
                            <div style={{
                              width: animateBars ? `${mmtPct}%` : "0%",
                              height: "100%",
                              background: "#C5C5CE",
                              borderRadius: "4px",
                              transition: "width 1.4s cubic-bezier(0.16, 1, 0.3, 1)"
                            }} />
                          </div>
                        </div>

                        {/* Veena World Bar */}
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-montserrat)", fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "4px" }}>
                            <span>Veena World</span>
                            <span>₹{pkg.veenaPrice.toLocaleString("en-IN")}</span>
                          </div>
                          <div style={{ width: "100%", height: "8px", background: "rgba(10,37,64,0.05)", borderRadius: "4px" }}>
                            <div style={{
                              width: animateBars ? "100%" : "0%",
                              height: "100%",
                              background: "#E8D8D8",
                              borderRadius: "4px",
                              transition: "width 1.4s cubic-bezier(0.16, 1, 0.3, 1)"
                            }} />
                          </div>
                        </div>
                      </div>

                      {/* Savings tag */}
                      <div style={{
                        marginTop: "16px", padding: "10px 14px",
                        background: "rgba(22, 163, 74, 0.08)",
                        border: "1px solid rgba(22, 163, 74, 0.15)",
                        borderRadius: "10px",
                        display: "flex", alignItems: "center", gap: "6px",
                        color: "var(--success)"
                      }}>
                        <ShieldCheck size={16} />
                        <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.78rem", fontWeight: "700" }}>
                          Save {pkg.savings} vs. Competitors
                        </span>
                      </div>
                    </div>

                    {/* Booking CTAs */}
                    <div style={{ marginTop: "24px" }}>
                      <Link
                        href={`/destinations/${pkg.slug}`}
                        className="btn-primary"
                        style={{
                          width: "100%",
                          padding: "12px 18px",
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.85rem",
                          fontWeight: "700"
                        }}
                      >
                        Bespoke Inquiry
                        <ArrowRight size={14} />
                      </Link>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
