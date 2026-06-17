"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Clock, User } from "lucide-react";

export default function BlogGuides() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const data = await res.json();
          setArticles(data);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section id="blog" style={{
        padding: "64px 0",
        background: "var(--bg)",
        borderTop: "1px solid var(--border-subtle)",
      }}>
        <div className="container">
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "60px",
            flexWrap: "wrap",
            gap: "24px",
          }}>
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(10, 37, 64, 0.05)", color: "var(--primary)",
                padding: "6px 14px", borderRadius: "50px",
                fontFamily: "var(--font-montserrat)", fontSize: "0.75rem",
                fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em",
                marginBottom: "16px"
              }}>
                Magazine & Stories
              </div>
              <h2 className="section-title" style={{ marginBottom: "0" }}>
                Travel Inspiration <br />& <span className="gradient-text">Insider Guides</span>
              </h2>
            </div>
          </div>
          <div className="blog-grid" style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "36px",
          }}>
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <div style={{ width: "100%", height: "360px", borderRadius: "24px", background: "rgba(10,37,64,0.05)", marginBottom: "24px" }} className="skeleton-pulse" />
              <div style={{ width: "200px", height: "20px", background: "rgba(10,37,64,0.05)", borderRadius: "4px", marginBottom: "10px" }} className="skeleton-pulse" />
              <div style={{ width: "80%", height: "30px", background: "rgba(10,37,64,0.05)", borderRadius: "4px", marginBottom: "14px" }} className="skeleton-pulse" />
              <div style={{ width: "100%", height: "60px", background: "rgba(10,37,64,0.05)", borderRadius: "4px" }} className="skeleton-pulse" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {[1, 2].map((i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "24px" }}>
                  <div style={{ height: "140px", borderRadius: "16px", background: "rgba(10,37,64,0.05)" }} className="skeleton-pulse" />
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px" }}>
                    <div style={{ width: "100px", height: "14px", background: "rgba(10,37,64,0.05)", borderRadius: "4px" }} className="skeleton-pulse" />
                    <div style={{ width: "80%", height: "24px", background: "rgba(10,37,64,0.05)", borderRadius: "4px" }} className="skeleton-pulse" />
                    <div style={{ width: "120px", height: "14px", background: "rgba(10,37,64,0.05)", borderRadius: "4px" }} className="skeleton-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
          }
          .skeleton-pulse {
            animation: pulse 1.5s infinite ease-in-out;
          }
        `}</style>
      </section>
    );
  }

  const featured = articles.find(a => a.featured) || articles[0];
  const regulars = featured ? articles.filter(a => a._id !== featured._id) : articles;

  return (
    <section id="blog" style={{
      padding: "64px 0",
      background: "var(--bg)",
      borderTop: "1px solid var(--border-subtle)",
    }}>
      <div className="container">

        {/* Section Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "60px",
          flexWrap: "wrap",
          gap: "24px",
        }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: "rgba(10, 37, 64, 0.05)", color: "var(--primary)",
              padding: "6px 14px", borderRadius: "50px",
              fontFamily: "var(--font-montserrat)", fontSize: "0.75rem",
              fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em",
              marginBottom: "16px"
            }}>
              Magazine & Stories
            </div>
            <h2 className="section-title" style={{ marginBottom: "0" }}>
              Travel Inspiration <br />& <span className="gradient-text">Insider Guides</span>
            </h2>
          </div>

          <Link href="/blogs" style={{
            fontFamily: "var(--font-montserrat)", fontSize: "0.9rem", fontWeight: "700",
            color: "var(--accent)", textDecoration: "none", display: "flex",
            alignItems: "center", gap: "8px", transition: "color 0.2s ease"
          }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--accent)"}
          >
            View All Blogs
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Editorial Layout */}
        <div className="blog-grid" style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "36px",
        }}>

          {/* Left: Featured Large Article */}
          {featured && (
            <article style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              cursor: "pointer",
            }} className="group">
              {/* Image box */}
              <div style={{
                position: "relative",
                width: "100%",
                height: "360px",
                borderRadius: "24px",
                overflow: "hidden",
                marginBottom: "24px",
                border: "1px solid var(--border-subtle)",
              }}>
                <img
                  src={featured.image}
                  alt={featured.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="blog-img"
                />

                {/* Category tag */}
                <div style={{
                  position: "absolute", top: "18px", left: "18px",
                  background: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  borderRadius: "50px", padding: "6px 14px",
                  fontFamily: "var(--font-montserrat)", fontSize: "0.7rem",
                  fontWeight: "700", color: "var(--primary)", textTransform: "uppercase"
                }}>
                  {featured.category}
                </div>
              </div>

              {/* Text */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "10px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: "var(--font-montserrat)", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "500" }}>
                    <User size={12} /> By {featured.author}
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: "var(--font-montserrat)", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "500" }}>
                    <Clock size={12} /> {featured.readTime}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: "var(--font-playfair)", fontSize: "1.8rem", fontWeight: "800",
                  color: "var(--primary)", lineHeight: "1.25", marginBottom: "14px",
                  letterSpacing: "-0.01em", transition: "color 0.3s ease"
                }} className="blog-title">
                  {featured.title}
                </h3>

                <p style={{
                  fontFamily: "var(--font-montserrat)", fontSize: "0.9rem",
                  color: "var(--text-secondary)", lineHeight: "1.65", marginBottom: "16px"
                }}>{featured.desc}</p>

                <div style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  fontFamily: "var(--font-montserrat)", fontSize: "0.85rem", fontWeight: "700",
                  color: "var(--primary)", marginTop: "auto"
                }}>
                  Read Full Editorial <ArrowRight size={14} style={{ transition: "transform 0.2s ease" }} className="arrow-drag" />
                </div>
              </div>
            </article>
          )}

          {/* Right: Regular Stacked Articles */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {regulars.map((art) => (
              <article key={art._id} style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr",
                gap: "24px",
                cursor: "pointer",
              }} className="group">
                {/* Image */}
                <div style={{
                  position: "relative",
                  height: "140px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid var(--border-subtle)",
                }}>
                  <img
                    src={art.image}
                    alt={art.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.6s ease",
                    }}
                    className="blog-img"
                  />
                </div>

                {/* Content */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <span style={{
                    fontFamily: "var(--font-montserrat)", fontSize: "0.68rem", fontWeight: "700",
                    color: "var(--secondary)", textTransform: "uppercase", letterSpacing: "0.05em",
                    marginBottom: "6px"
                  }}>{art.category}</span>

                  <h3 style={{
                    fontFamily: "var(--font-playfair)", fontSize: "1.15rem", fontWeight: "800",
                    color: "var(--primary)", lineHeight: "1.3", marginBottom: "8px",
                    transition: "color 0.3s ease"
                  }} className="blog-title">
                    {art.title}
                  </h3>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "2px" }}>
                    <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: "500" }}>
                      {art.readTime}
                    </span>
                    <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: "500" }}>
                      {formatDate(art.updatedAt)}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>

      </div>

      <style>{`
        .group:hover .blog-img {
          transform: scale(1.04) !important;
        }
        .group:hover .blog-title {
          color: var(--secondary) !important;
        }
        .group:hover .arrow-drag {
          transform: translateX(4px) !important;
        }
      `}</style>
    </section>
  );
}
