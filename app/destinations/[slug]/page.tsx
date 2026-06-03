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
  Calendar, ArrowLeft, ArrowRight, MapPin, Thermometer,
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
        position: "relative", height: "75vh", minHeight: "500px",
        display: "flex", alignItems: "flex-end", overflow: "hidden",
      }}>
        <img src={dest.heroImage} alt={dest.name}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0,
          background: "rgba(240,243,244,0.3)" }} />
        <div style={{ position: "absolute", inset: 0,
          background: "rgba(240,243,244,0.3)" }} />

        <div className="container" style={{ position: "relative", zIndex: 1, paddingBottom: "52px", width: "100%" }}>
          {/* Back Breadcrumb */}
          <Link href="/#destinations" style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            color: "rgba(26,43,60,0.55)", textDecoration: "none",
            fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem",
            marginBottom: "20px",
            background: "rgba(240,243,244,0.5)", backdropFilter: "blur(10px)",
            border: "1px solid rgba(26,43,60,0.1)",
            borderRadius: "50px", padding: "6px 14px",
            transition: "all 0.2s ease",
          }}>
            <ArrowLeft size={13} /> All Destinations
          </Link>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "40px", alignItems: "flex-end" }}>
            <div>
              {/* Country + Mood */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ fontSize: "28px" }}>{dest.flag}</span>
                <span style={{
                  fontFamily: "var(--font-playfair), serif", fontSize: "0.72rem", fontWeight: "700",
                  letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent-gold)",
                }}>{dest.country}</span>
                <span style={{ color: "rgba(26,43,60,0.2)" }}>|</span>
                <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)" }}>
                  {dest.difficulty}
                </span>
              </div>

              {/* Name */}
              <h1 style={{
                fontFamily: "var(--font-playfair), serif", fontWeight: "900",
                fontSize: "clamp(3rem, 7vw, 5.5rem)", color: "var(--text-primary)",
                letterSpacing: "-0.03em", lineHeight: "0.95", marginBottom: "12px",
              }}>{dest.name}</h1>

              <p style={{
                fontFamily: "var(--font-playfair), serif", fontStyle: "italic",
                fontSize: "1.15rem", color: "#E5C158", fontWeight: "600",
                marginBottom: "24px",
              }}>&ldquo;{dest.tagline}&rdquo;</p>

              {/* Quick Stats Pills */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {[
                  { icon: Clock, label: dest.duration, color: "var(--accent-gold)" },
                  { icon: Users, label: dest.groupSize, color: "#9098B8" },
                  { icon: Calendar, label: `Best: ${dest.bestTime}`, color: "#E5C158" },
                  { icon: BarChart2, label: dest.difficulty, color: "#FF6F59" },
                ].map(({ icon: Icon, label, color }) => (
                  <div key={label} style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    background: "rgba(240,243,244,0.7)", backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "50px", padding: "7px 14px",
                  }}>
                    <Icon size={13} color={color} />
                    <span style={{
                      fontFamily: "var(--font-playfair), serif", fontSize: "0.78rem",
                      fontWeight: "600", color: "rgba(255,255,255,0.9)",
                    }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price + CTA block */}
            <div style={{
              background: "rgba(240,243,244,0.85)", backdropFilter: "blur(20px)",
              border: "1px solid rgba(197,160,89,0.3)",
              borderRadius: "22px", padding: "24px 28px",
              textAlign: "center", minWidth: "220px",
            }}>
              <p style={{ fontFamily: "'Inter'", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginBottom: "4px" }}>
                Starting from
              </p>
              <p style={{
                fontFamily: "'Outfit'", fontWeight: "900", fontSize: "2.4rem",
                color: "var(--accent-gold)", lineHeight: "1", marginBottom: "4px",
              }}>₹{dest.basePrice.toLocaleString("en-IN")}</p>
              <p style={{ fontFamily: "'Inter'", fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", marginBottom: "16px" }}>
                per person
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", marginBottom: "16px" }}>
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={13}
                    fill={s <= Math.round(dest.rating) ? "#E5C158" : "transparent"}
                    color={s <= Math.round(dest.rating) ? "#E5C158" : "rgba(26,43,60,0.2)"} />
                ))}
                <span style={{ fontFamily: "'Outfit'", fontSize: "0.75rem", color: "rgba(26,43,60,0.65)", marginLeft: "4px" }}>
                  {dest.rating} ({dest.reviewCount.toLocaleString()})
                </span>
              </div>
              <PdfExportButton destination={dest} />
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY TOOLBAR ── */}
      <div style={{
        position: "sticky", top: "0", zIndex: 100,
        background: "rgba(240,243,244,0.97)", backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(26,43,60,0.06)",
      }}>
        <div className="container" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "16px", padding: "12px 32px", flexWrap: "wrap",
        }}>
          {/* Quick jump nav */}
          <div style={{ display: "flex", gap: "4px" }}>
            {[
              { label: "Overview", id: "#overview" },
              { label: "Highlights", id: "#highlights" },
              { label: "Itinerary", id: "#itinerary" },
              { label: "Prices", id: "#compare" },
            ].map((item) => (
              <a key={item.label} href={item.id} className="sticky-nav-link" style={{
                padding: "6px 14px", borderRadius: "8px",
                fontFamily: "var(--font-playfair), serif", fontSize: "0.8rem", fontWeight: "600",
                color: "rgba(26,43,60,0.55)", textDecoration: "none",
                transition: "all 0.2s ease", border: "1px solid transparent",
              }}>
                {item.label}
              </a>
            ))}
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <span style={{ fontFamily: "'Outfit'", fontWeight: "800", fontSize: "1.3rem", color: "var(--accent-gold)" }}>
              ₹{dest.basePrice.toLocaleString("en-IN")}
            </span>
            <span style={{ fontFamily: "'Inter'", fontSize: "0.72rem", color: "rgba(26,43,60,0.35)" }}>/ person</span>
            <PdfExportButton destination={dest} />
            <a href="#compare" className="sticky-compare-btn" style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "9px 18px", background: "rgba(26,43,60,0.05)",
              border: "1px solid rgba(26,43,60,0.1)", borderRadius: "50px",
              fontFamily: "'Outfit'", fontSize: "0.82rem", fontWeight: "600",
              color: "rgba(26,43,60,0.7)", textDecoration: "none",
              transition: "all 0.2s ease",
            }}>
              <BarChart2 size={14} /> Compare Prices
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="container" style={{ padding: "60px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "48px", alignItems: "flex-start" }}>

          {/* ── LEFT ── */}
          <div>
            {/* OVERVIEW */}
            <section id="overview" style={{ marginBottom: "64px", scrollMarginTop: "80px" }}>
              <div className="section-label">Overview</div>
              <p style={{
                fontFamily: "var(--font-montserrat), sans-serif", fontSize: "1.08rem",
                color: "var(--text-secondary)", lineHeight: "1.85", marginBottom: "32px",
              }}>{dest.description}</p>

              {/* Quick Info Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {[
                  { icon: Clock, label: "Duration", value: dest.duration, color: "var(--accent-gold)" },
                  { icon: Calendar, label: "Best Time", value: dest.bestTime, color: "#E5C158" },
                  { icon: Users, label: "Group Size", value: dest.groupSize, color: "#FF6F59" },
                  { icon: BarChart2, label: "Difficulty", value: dest.difficulty, color: "var(--accent-navy)" },
                  { icon: Wallet, label: "Starting From", value: `₹${dest.basePrice.toLocaleString("en-IN")}`, color: "var(--accent-gold)" },
                  { icon: Star, label: "Rating", value: `${dest.rating} / 5`, color: "#E5C158" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="quick-info-card" style={{
                    background: "var(--bg-card)",
                    border: "1px solid rgba(26,43,60,0.07)",
                    borderRadius: "16px", padding: "18px",
                    transition: "all 0.2s ease",
                    "--hover-border": `${color}35`,
                  } as React.CSSProperties}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "8px" }}>
                      <Icon size={14} color={color} />
                      <span style={{ fontFamily: "'Outfit'", fontSize: "0.65rem", fontWeight: "700",
                        color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        {label}
                      </span>
                    </div>
                    <div style={{ fontFamily: "'Outfit'", fontWeight: "800", fontSize: "0.95rem", color: "var(--text-primary)" }}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* HIGHLIGHTS */}
            <section id="highlights" style={{ marginBottom: "64px", scrollMarginTop: "80px" }}>
              <div className="section-label">Must-See & Do</div>
              <h2 style={{
                fontFamily: "'Outfit'", fontWeight: "800", fontSize: "1.6rem",
                color: "var(--text-primary)", marginBottom: "24px",
              }}>Trip Highlights</h2>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
                {dest.highlights.map((h, i) => (
                  <div key={h} className="highlight-card" style={{
                    display: "flex", alignItems: "flex-start", gap: "12px",
                    background: "var(--bg-card)", border: "1px solid rgba(26,43,60,0.06)",
                    borderRadius: "14px", padding: "14px 16px",
                    transition: "all 0.25s ease",
                  }}>
                    <div style={{
                      width: "28px", height: "28px", borderRadius: "8px", flexShrink: 0,
                      background: "var(--bg-card)",
                      border: "1px solid rgba(197,160,89,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'Outfit'", fontWeight: "800", fontSize: "0.7rem", color: "var(--accent-gold)",
                    }}>{i + 1}</div>
                    <span style={{
                      fontFamily: "'Inter'", fontSize: "0.83rem",
                      color: "var(--text-secondary)", lineHeight: "1.5",
                    }}>{h}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ITINERARY */}
            <section id="itinerary" style={{ marginBottom: "64px", scrollMarginTop: "80px" }}>
              <div className="section-label">Day by Day</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
                <h2 style={{
                  fontFamily: "'Outfit'", fontWeight: "800", fontSize: "1.6rem",
                  color: "var(--text-primary)",
                }}>Full Itinerary — {dest.duration}</h2>
                <PdfExportButton destination={dest} />
              </div>
              <ItineraryTimeline itinerary={dest.itinerary} />
            </section>

            {/* PRICE COMPARISON */}
            <section id="compare" style={{ marginBottom: "64px", scrollMarginTop: "80px" }}>
              <PriceCompareTable packages={dest.comparison} destinationName={dest.name} />
            </section>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div style={{ position: "sticky", top: "70px", display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Booking CTA Card */}
            <div style={{
              background: "var(--bg-elevated)",
              border: "1px solid rgba(197,160,89,0.28)",
              borderRadius: "22px", padding: "26px",
            }}>
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <p style={{ fontFamily: "'Inter'", fontSize: "0.75rem", color: "rgba(26,43,60,0.45)", marginBottom: "4px" }}>
                  Starting from
                </p>
                <p style={{ fontFamily: "'Outfit'", fontWeight: "900", fontSize: "2.5rem", color: "var(--accent-gold)", lineHeight: "1", marginBottom: "4px" }}>
                  ₹{dest.basePrice.toLocaleString("en-IN")}
                </p>
                <p style={{ fontFamily: "'Inter'", fontSize: "0.72rem", color: "rgba(26,43,60,0.35)", marginBottom: "14px" }}>
                  per person · {dest.duration}
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: "3px", marginBottom: "6px" }}>
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={14}
                      fill={s <= Math.round(dest.rating) ? "#E5C158" : "transparent"}
                      color={s <= Math.round(dest.rating) ? "#E5C158" : "rgba(26,43,60,0.15)"} />
                  ))}
                </div>
                <p style={{ fontFamily: "'Inter'", fontSize: "0.72rem", color: "rgba(26,43,60,0.45)" }}>
                  {dest.rating} rating · {dest.reviewCount.toLocaleString()} reviews
                </p>
              </div>

              <button id={`enquire-${dest.slug}`} className="btn-primary"
                style={{ width: "100%", justifyContent: "center", marginBottom: "8px", padding: "14px" }}>
                Enquire Now — Free <ArrowRight size={15} />
              </button>
              <PdfExportButton destination={dest} />

              <div style={{
                display: "flex", alignItems: "center", gap: "8px", justifyContent: "center",
                marginTop: "14px",
              }}>
                <Phone size={12} color="rgba(26,43,60,0.35)" />
                <span style={{ fontFamily: "'Inter'", fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>
                  +91 98765 43210 · Mon–Sat 9AM–7PM
                </span>
              </div>
            </div>

            {/* Inclusions Card */}
            <div style={{
              background: "var(--bg-card)", border: "1px solid rgba(26,43,60,0.07)",
              borderRadius: "20px", padding: "22px",
            }}>
              <h4 style={{
                fontFamily: "'Outfit'", fontWeight: "700", fontSize: "0.9rem",
                color: "var(--text-primary)", marginBottom: "14px",
                display: "flex", alignItems: "center", gap: "7px",
              }}>
                <CheckCircle size={15} color="#FF6F59" /> What&apos;s Included
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "7px", marginBottom: "18px" }}>
                {dest.inclusions.map((item) => (
                  <li key={item} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <CheckCircle size={13} color="#FF6F59" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontFamily: "'Inter'", fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: "1.45" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div style={{ height: "1px", background: "rgba(26,43,60,0.06)", margin: "14px 0" }} />

              <h4 style={{
                fontFamily: "'Outfit'", fontWeight: "700", fontSize: "0.9rem",
                color: "var(--text-primary)", marginBottom: "14px",
                display: "flex", alignItems: "center", gap: "7px",
              }}>
                <XCircle size={15} color="#F87171" /> Not Included
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "7px" }}>
                {dest.exclusions.map((item) => (
                  <li key={item} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <XCircle size={13} color="rgba(248,113,113,0.6)" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontFamily: "'Inter'", fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: "1.45" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Info Card */}
            <div style={{
              background: "var(--bg-card)", border: "1px solid rgba(26,43,60,0.07)",
              borderRadius: "18px", padding: "18px 20px",
            }}>
              <div style={{
                fontFamily: "'Outfit'", fontSize: "0.65rem", fontWeight: "700",
                color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em",
                marginBottom: "12px",
              }}>Trip Themes</div>
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {dest.tags.map((tag) => (
                  <span key={tag} style={{
                    background: "rgba(26,43,60,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: "7px", padding: "4px 10px",
                    fontFamily: "'Outfit'", fontSize: "0.7rem", color: "rgba(255,255,255,0.6)",
                  }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* PDF CTA */}
            <div style={{
              background: "var(--bg-card)",
              border: "1px solid rgba(197,160,89,0.2)",
              borderRadius: "16px", padding: "18px 20px",
              display: "flex", alignItems: "center", gap: "14px",
            }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "10px",
                background: "rgba(197,160,89,0.12)", border: "1px solid rgba(197,160,89,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <FileText size={18} color="#FF6F59" />
              </div>
              <div>
                <div style={{ fontFamily: "'Outfit'", fontWeight: "700", fontSize: "0.85rem", color: "var(--text-primary)", marginBottom: "2px" }}>
                  Free PDF Itinerary
                </div>
                <div style={{ fontFamily: "'Inter'", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                  Download the complete plan instantly
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED DESTINATIONS */}
        <div style={{ marginTop: "60px" }}>
          <div style={{ height: "1px", background: "rgba(2, 128, 144, 0.1)", marginBottom: "48px" }} />
          <div className="section-label">Explore More</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
            <h2 style={{
              fontFamily: "'Outfit'", fontWeight: "800", fontSize: "1.5rem",
              color: "var(--text-primary)",
            }}>You Might Also Love</h2>
            <Link href="/#destinations" className="btn-secondary" style={{ padding: "9px 18px", fontSize: "0.82rem" }}>
              All Destinations <ArrowRight size={14} />
            </Link>
          </div>
          <RelatedDestinations destinations={otherDests} />
        </div>
      </div>

      <style>{`
        .sticky-nav-link:hover {
          color: var(--accent-gold) !important;
          border-color: rgba(197,160,89,0.2) !important;
          background: rgba(197,160,89,0.06) !important;
        }
        .sticky-compare-btn:hover {
          border-color: rgba(197,160,89,0.4) !important;
          color: var(--accent-gold) !important;
        }
        .quick-info-card:hover {
          border-color: var(--hover-border) !important;
        }
        .highlight-card:hover {
          border-color: rgba(197,160,89,0.25) !important;
          background: var(--bg-elevated) !important;
        }
        @media (max-width: 1024px) {
          .dest-main-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .hero-price-block { display: none !important; }
          .quick-info-grid { grid-template-columns: repeat(2,1fr) !important; }
          .highlights-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
