import { notFound } from "next/navigation";
import { getDestinationBySlug, destinations } from "../../../lib/destinations";
import ItineraryTimeline from "../../components/ItineraryTimeline";
import PdfExportButton from "../../components/PdfExportButton";
import PriceCompareTable from "../../components/PriceCompareTable";
import RelatedDestinations from "../../components/RelatedDestinations";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Clock, Users, BarChart2, Star, CheckCircle, XCircle,
  Calendar, ArrowLeft, ArrowRight, MapPin,
  Wallet, FileText, Phone,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) return { title: "Not Found" };
  return {
    title: `${dest.name} Itinerary – ${dest.duration}`,
    description: dest.description,
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) notFound();

  const otherDests = destinations.filter((d) => d.slug !== dest.slug).slice(0, 3);

  return (
    <div style={{ paddingTop: "0" }}>

      {/* ── HERO ── */}
      <section style={{
        position: "relative", height: "70vh", minHeight: "480px",
        display: "flex", alignItems: "flex-end", overflow: "hidden",
      }}>
        <img src={dest.heroImage} alt={dest.name}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        
        {/* Premium Dark Gradient Overlay */}
        <div style={{ position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(10, 37, 64, 0.25) 30%, rgba(10, 37, 64, 0.88) 100%)", zIndex: 1 }} />

        <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: "40px", width: "100%" }}>
          {/* Back Breadcrumb */}
          <Link href="/#destinations" style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            color: "#FAFAF7", textDecoration: "none",
            fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.78rem",
            fontWeight: "600", marginBottom: "16px",
            background: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "50px", padding: "7px 14px",
            transition: "all 0.2s ease",
          }}>
            <ArrowLeft size={13} /> All Destinations
          </Link>

          {/* Hero bottom row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "24px", alignItems: "flex-end" }} className="hero-price-grid">
            <div>
              {/* Country + Mood */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "22px" }}>{dest.flag}</span>
                <span style={{
                  fontFamily: "var(--font-montserrat)", fontSize: "0.72rem", fontWeight: "700",
                  letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--secondary)",
                }}>{dest.country}</span>
                <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
                <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.75rem", color: "rgba(255,255,255,0.7)", fontWeight: "600" }}>
                  {dest.difficulty} Journey
                </span>
              </div>

              {/* Name */}
              <h1 style={{
                fontFamily: "var(--font-playfair)", fontWeight: "800",
                fontSize: "clamp(2rem, 7vw, 4.5rem)", color: "#FAFAF7",
                letterSpacing: "-0.02em", lineHeight: "1.05", marginBottom: "10px",
              }}>{dest.name}</h1>

              <p style={{
                fontFamily: "var(--font-montserrat)", fontStyle: "italic",
                fontSize: "0.95rem", color: "var(--accent)", fontWeight: "600",
                marginBottom: "16px",
              }}>&ldquo;{dest.tagline}&rdquo;</p>

              {/* Quick Stats Pills */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {[
                  { icon: Clock, label: dest.duration, color: "var(--accent)" },
                  { icon: Users, label: dest.groupSize, color: "var(--secondary)" },
                  { icon: Calendar, label: `Best: ${dest.bestTime}`, color: "var(--accent)" },
                ].map(({ icon: Icon, label, color }) => (
                  <div key={label} style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "50px", padding: "6px 12px",
                  }}>
                    <Icon size={12} color={color} />
                    <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.72rem", fontWeight: "600", color: "#FAFAF7" }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price block — hidden on mobile via CSS, shown on md+ */}
            <div style={{
              background: "rgba(255,255,255,0.12)", backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "20px", padding: "22px 26px",
              textAlign: "center", minWidth: "210px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              color: "#FFFFFF",
            }} className="hero-price-block">
              <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.68rem", color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                Starting from
              </p>
              <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: "800", fontSize: "2rem", color: "#FFFFFF", lineHeight: "1", marginBottom: "4px" }}>
                ₹{dest.basePrice.toLocaleString("en-IN")}
              </p>
              <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.68rem", color: "rgba(255,255,255,0.6)", marginBottom: "12px" }}>
                per person
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "3px", marginBottom: "12px" }}>
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={13}
                    fill={s <= Math.round(dest.rating) ? "var(--accent)" : "transparent"}
                    color={s <= Math.round(dest.rating) ? "var(--accent)" : "rgba(255,255,255,0.3)"} />
                ))}
                <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.78rem", color: "#FFFFFF", marginLeft: "4px", fontWeight: "700" }}>
                  {dest.rating}
                </span>
              </div>
              <PdfExportButton destination={dest} />
            </div>
          </div>
        </div>
      </section>

      {/* ── MOBILE PRICE BAR (below hero, only on mobile) ── */}
      <div className="mobile-price-bar" style={{
        background: "var(--bg-card)",
        borderBottom: "1px solid var(--border-subtle)",
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
      }}>
        <div>
          <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.62rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 2px" }}>
            Starting from
          </p>
          <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: "800", fontSize: "1.4rem", color: "var(--primary)", lineHeight: "1.1", margin: "0 0 2px" }}>
            ₹{dest.basePrice.toLocaleString("en-IN")}
          </p>
          <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.65rem", color: "var(--text-muted)", margin: 0 }}>per person · {dest.duration}</p>
        </div>
        <PdfExportButton destination={dest} />
      </div>

      {/* ── STICKY TOOLBAR ── */}
      <div style={{
        position: "sticky", top: "0px", zIndex: 100,
        background: "rgba(250,250,247,0.92)", backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(10,37,64,0.08)",
      }}>
        <div className="container" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "8px", padding: "8px 16px",
        }}>
          {/* Quick jump nav — horizontally scrollable on mobile */}
          <div style={{ display: "flex", gap: "2px", overflowX: "auto", WebkitOverflowScrolling: "touch" as any, flexShrink: 1, minWidth: 0 }}>
            {[
              { label: "Overview", id: "#overview" },
              { label: "Highlights", id: "#highlights" },
              { label: "Itinerary", id: "#itinerary" },
              { label: "Prices", id: "#compare" },
            ].map((item) => (
              <a key={item.label} href={item.id} className="sticky-nav-link" style={{
                padding: "7px 12px", borderRadius: "30px",
                fontFamily: "var(--font-montserrat)", fontSize: "0.75rem", fontWeight: "700",
                color: "var(--text-secondary)", textDecoration: "none",
                transition: "all 0.2s ease", border: "1px solid transparent",
                whiteSpace: "nowrap", flexShrink: 0,
              }}>
                {item.label}
              </a>
            ))}
          </div>

          {/* Price + CTA — hidden on mobile */}
          <div className="sticky-cta-group" style={{ display: "flex", gap: "10px", alignItems: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: "800", fontSize: "1.1rem", color: "var(--accent)", whiteSpace: "nowrap" }}>
              ₹{dest.basePrice.toLocaleString("en-IN")}
            </span>
            <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: "500" }}>/ person</span>
            <a href="#compare" className="btn-secondary" style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "8px 14px", borderRadius: "50px",
              fontFamily: "var(--font-montserrat)", fontSize: "0.75rem", fontWeight: "700",
              whiteSpace: "nowrap", textDecoration: "none",
            }}>
              Compare
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="container dest-content-container" style={{ padding: "32px 16px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "40px", alignItems: "flex-start" }} className="dest-main-grid">

          {/* ── LEFT COLUMN ── */}
          <div style={{ minWidth: 0 }}>
            {/* OVERVIEW */}
            <section id="overview" style={{ marginBottom: "32px", scrollMarginTop: "100px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(10,37,64,0.04)", color: "var(--primary)",
                padding: "4px 10px", borderRadius: "50px",
                fontFamily: "var(--font-montserrat)", fontSize: "0.68rem",
                fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em",
                marginBottom: "14px"
              }}>Overview</div>
              <p style={{
                fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.98rem",
                color: "var(--text-secondary)", lineHeight: "1.75", marginBottom: "24px",
                fontWeight: "500"
              }}>{dest.description}</p>

              {/* Quick Info Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }} className="quick-info-grid">
                {[
                  { icon: Clock, label: "Duration", value: dest.duration, color: "var(--accent)" },
                  { icon: Calendar, label: "Best Time", value: dest.bestTime, color: "var(--secondary)" },
                  { icon: Users, label: "Group Size", value: dest.groupSize, color: "var(--accent)" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="quick-info-card" style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "14px", padding: "16px",
                    transition: "all 0.2s ease",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "8px" }}>
                      <Icon size={13} color={color} />
                      <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.6rem", fontWeight: "700",
                        color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        {label}
                      </span>
                    </div>
                    <div style={{ fontFamily: "var(--font-montserrat)", fontWeight: "700", fontSize: "0.82rem", color: "var(--primary)", lineHeight: "1.3" }}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* HIGHLIGHTS */}
            <section id="highlights" style={{ marginBottom: "32px", scrollMarginTop: "100px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(10,37,64,0.04)", color: "var(--primary)",
                padding: "4px 10px", borderRadius: "50px",
                fontFamily: "var(--font-montserrat)", fontSize: "0.68rem",
                fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em",
                marginBottom: "14px"
              }}>Must-See & Do</div>
              <h2 style={{
                fontFamily: "var(--font-playfair)", fontWeight: "800", fontSize: "1.4rem",
                color: "var(--primary)", marginBottom: "18px",
              }}>Trip Highlights</h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px" }} className="highlights-grid">
                {dest.highlights.map((h, i) => (
                  <div key={h} style={{
                    display: "flex", alignItems: "flex-start", gap: "10px",
                    background: "var(--bg-card)", border: "1px solid var(--border-subtle)",
                    borderRadius: "14px", padding: "14px",
                    transition: "all 0.25s ease",
                  }} className="luxury-card">
                    <div style={{
                      width: "24px", height: "24px", borderRadius: "7px", flexShrink: 0,
                      background: "rgba(0,184,169,0.08)", border: "1px solid rgba(0,184,169,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-montserrat)", fontWeight: "800", fontSize: "0.7rem", color: "var(--secondary)",
                    }}>{i + 1}</div>
                    <span style={{
                      fontFamily: "var(--font-montserrat)", fontSize: "0.78rem",
                      color: "var(--text-secondary)", lineHeight: "1.5",
                      fontWeight: "500", marginTop: "2px"
                    }}>{h}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ITINERARY TIMELINE */}
            <section id="itinerary" style={{ marginBottom: "32px", scrollMarginTop: "100px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(10,37,64,0.04)", color: "var(--primary)",
                padding: "4px 10px", borderRadius: "50px",
                fontFamily: "var(--font-montserrat)", fontSize: "0.68rem",
                fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em",
                marginBottom: "14px"
              }}>Day by Day</div>
              
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
                <h2 style={{
                  fontFamily: "var(--font-playfair)", fontWeight: "800", fontSize: "1.4rem",
                  color: "var(--primary)", margin: 0
                }}>Full Itinerary — {dest.duration}</h2>
                <PdfExportButton destination={dest} />
              </div>
              <ItineraryTimeline itinerary={dest.itinerary} />
            </section>

            {/* PRICE COMPARISON */}
            <section id="compare" style={{ marginBottom: "32px", scrollMarginTop: "100px" }}>
              <PriceCompareTable packages={dest.comparison} destinationName={dest.name} />
            </section>
          </div>

          {/* ── RIGHT COLUMN (SIDEBAR) ── */}
          <div className="dest-sidebar" style={{ position: "sticky", top: "70px", display: "flex", flexDirection: "column", gap: "18px" }}>

            {/* Booking CTA Card */}
            <div style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "22px", padding: "26px",
              boxShadow: "0 10px 30px rgba(10,37,64,0.02)"
            }} className="luxury-card">
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                  Starting from
                </p>
                <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: "800", fontSize: "2.2rem", color: "var(--primary)", lineHeight: "1.1", marginBottom: "4px" }}>
                  ₹{dest.basePrice.toLocaleString("en-IN")}
                </p>
                <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.68rem", color: "var(--text-secondary)", fontWeight: "500", marginBottom: "14px" }}>
                  per person · {dest.duration}
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: "3px", marginBottom: "6px" }}>
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={13}
                      fill={s <= Math.round(dest.rating) ? "var(--accent)" : "transparent"}
                      color={s <= Math.round(dest.rating) ? "var(--accent)" : "rgba(10,37,64,0.15)"} />
                  ))}
                </div>
                <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.7rem", color: "var(--text-secondary)", fontWeight: "600" }}>
                  {dest.rating} rating · {dest.reviewCount.toLocaleString()} reviews
                </p>
              </div>

              <button id={`enquire-${dest.slug}`} className="btn-primary"
                style={{ width: "100%", justifyContent: "center", marginBottom: "10px", padding: "13px", borderRadius: "12px" }}>
                Enquire Now — Free <ArrowRight size={14} />
              </button>
              <PdfExportButton destination={dest} />

              <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center", marginTop: "14px" }}>
                <Phone size={11} color="var(--text-muted)" />
                <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.68rem", color: "var(--text-secondary)", fontWeight: "600" }}>
                  +91 98765 43210 · Mon–Sat 9AM–7PM
                </span>
              </div>
            </div>

            {/* Inclusions Card */}
            <div style={{
              background: "var(--bg-card)", border: "1px solid var(--border-subtle)",
              borderRadius: "22px", padding: "22px",
            }} className="luxury-card">
              <h4 style={{
                fontFamily: "var(--font-montserrat)", fontWeight: "700", fontSize: "0.8rem",
                color: "var(--primary)", marginBottom: "14px",
                display: "flex", alignItems: "center", gap: "7px", textTransform: "uppercase", letterSpacing: "0.05em"
              }}>
                <CheckCircle size={14} color="var(--success)" /> What&apos;s Included
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px", marginBottom: "18px" }}>
                {dest.inclusions.map((item) => (
                  <li key={item} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <CheckCircle size={12} color="var(--success)" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.77rem", color: "var(--text-secondary)", lineHeight: "1.45", fontWeight: "500" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div style={{ height: "1px", background: "var(--border-subtle)", margin: "14px 0" }} />

              <h4 style={{
                fontFamily: "var(--font-montserrat)", fontWeight: "700", fontSize: "0.8rem",
                color: "var(--primary)", marginBottom: "12px",
                display: "flex", alignItems: "center", gap: "7px", textTransform: "uppercase", letterSpacing: "0.05em"
              }}>
                <XCircle size={14} color="#DC2626" /> Not Included
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {dest.exclusions.map((item) => (
                  <li key={item} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <XCircle size={12} color="rgba(220,38,38,0.6)" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.77rem", color: "var(--text-muted)", lineHeight: "1.45", fontWeight: "500" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Themes Card */}
            <div style={{
              background: "var(--bg-card)", border: "1px solid var(--border-subtle)",
              borderRadius: "18px", padding: "18px",
            }} className="luxury-card">
              <div style={{
                fontFamily: "var(--font-montserrat)", fontSize: "0.62rem", fontWeight: "700",
                color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em",
                marginBottom: "12px",
              }}>Trip Themes</div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {dest.tags.map((tag) => (
                  <span key={tag} style={{
                    background: "rgba(10,37,64,0.03)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "6px", padding: "4px 10px",
                    fontFamily: "var(--font-montserrat)", fontSize: "0.68rem", color: "var(--text-secondary)",
                    fontWeight: "600"
                  }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* PDF CTA */}
            <div style={{
              background: "var(--bg-card)", border: "1px solid var(--border-subtle)",
              borderRadius: "18px", padding: "16px",
              display: "flex", alignItems: "center", gap: "12px",
            }} className="luxury-card">
              <div style={{
                width: "38px", height: "38px", borderRadius: "10px",
                background: "rgba(0,184,169,0.08)", border: "1px solid rgba(0,184,169,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <FileText size={17} color="var(--secondary)" />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-montserrat)", fontWeight: "700", fontSize: "0.82rem", color: "var(--primary)", marginBottom: "2px" }}>
                  Free PDF Itinerary
                </div>
                <div style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: "500" }}>
                  Download the complete plan instantly
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED DESTINATIONS */}
        <div style={{ marginTop: "56px" }}>
          <div style={{ height: "1px", background: "var(--border-subtle)", marginBottom: "36px" }} />
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(10,37,64,0.04)", color: "var(--primary)",
            padding: "4px 10px", borderRadius: "50px",
            fontFamily: "var(--font-montserrat)", fontSize: "0.68rem",
            fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em",
            marginBottom: "14px"
          }}>Explore More</div>
          
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
            <h2 style={{
              fontFamily: "var(--font-playfair)", fontWeight: "800", fontSize: "1.4rem",
              color: "var(--primary)", margin: 0
            }}>You Might Also Love</h2>
            <Link href="/#destinations" className="btn-secondary" style={{ padding: "9px 16px", fontSize: "0.8rem" }}>
              All Destinations <ArrowRight size={13} />
            </Link>
          </div>
          <RelatedDestinations destinations={otherDests} />
        </div>
      </div>

      <style>{`
        /* Hover states */
        .sticky-nav-link:hover {
          color: var(--secondary) !important;
          border-color: rgba(0,184,169,0.2) !important;
          background: rgba(0,184,169,0.04) !important;
        }
        .quick-info-card:hover {
          border-color: var(--secondary) !important;
        }

        /* Mobile-first: show mobile price bar, hide hero price block */
        .mobile-price-bar { display: flex; }
        .hero-price-block { display: none !important; }
        .sticky-cta-group { display: none !important; }

        /* Tablet and up: show hero price block, hide mobile bar */
        @media (min-width: 768px) {
          .mobile-price-bar { display: none !important; }
          .hero-price-block { display: block !important; }
          .sticky-cta-group { display: flex !important; }
        }

        /* Desktop: side-by-side two-column layout */
        @media (min-width: 1025px) {
          .dest-main-grid { grid-template-columns: 1fr 320px !important; }
          .dest-sidebar { position: sticky !important; top: 70px !important; }
          .dest-content-container { padding: 40px 24px 80px !important; }
        }

        /* Tablet: single column, sidebar below */
        @media (max-width: 1024px) {
          .dest-main-grid { grid-template-columns: 1fr !important; }
          .dest-sidebar { position: static !important; top: auto !important; }
        }

        /* Mobile: tighter hero grid */
        @media (max-width: 640px) {
          .hero-price-grid { grid-template-columns: 1fr !important; }
          .dest-content-container { padding: 20px 16px 48px !important; }
        }

        /* Quick info grid: 2 col on mobile (3 col breaks at 500px) */
        @media (max-width: 600px) {
          .quick-info-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        /* Highlights grid: 2 col on tablet, 1 col on small mobile */
        @media (min-width: 600px) {
          .highlights-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        /* Timeline: hide stay/meals block on very small screens */
        @media (max-width: 480px) {
          .timeline-stay-block { display: none !important; }
        }

        /* Accordion activity pills: hide overflow */
        .timeline-pills-row {
          overflow: hidden;
          max-width: 100%;
          flex-wrap: nowrap;
        }
      `}</style>
    </div>
  );
}
