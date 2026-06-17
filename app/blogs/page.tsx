"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, User, Search, BookOpen, Calendar, ArrowRight } from "lucide-react";

const CATEGORIES = [
  "All",
  "Culture & Wellness",
  "Adventure Guides",
  "Gastronomy",
  "Luxury Travel",
  "Solo Expeditions",
  "Family Escapes"
];

export default function BlogsPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  // Filter logic
  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.desc.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === "All" || art.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", paddingTop: "110px", paddingBottom: "80px" }}>
      <div className="container">
        
        {/* Breadcrumb Back Link */}
        <Link href="/" style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          color: "var(--text-secondary)", textDecoration: "none",
          fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.78rem",
          fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em",
          marginBottom: "24px", transition: "color 0.2s"
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = "var(--secondary)"}
        onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
        >
          <ArrowLeft size={13} /> Back to Homepage
        </Link>

        {/* Page Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(0, 184, 169, 0.05)", color: "var(--secondary)",
            padding: "6px 14px", borderRadius: "50px",
            fontFamily: "var(--font-montserrat)", fontSize: "0.75rem",
            fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em",
            marginBottom: "16px"
          }}>
            <BookOpen size={13} /> WanderSouls Journal
          </div>
          <h1 style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
            fontWeight: "900",
            color: "var(--primary)",
            lineHeight: "1.15",
            marginBottom: "16px"
          }}>
            Travel Inspiration & <span className="gradient-text">Insider Guides</span>
          </h1>
          <p style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "1.05rem",
            color: "var(--text-secondary)",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.7"
          }}>
            Detailed dispatches, cultural notes, and local secrets mapped out by our specialist writers.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div style={{
          background: "#FFFFFF",
          border: "1px solid var(--border-subtle)",
          borderRadius: "20px",
          padding: "24px",
          boxShadow: "0 10px 30px rgba(10,37,64,0.03)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginBottom: "40px"
        }}>
          {/* Search Input */}
          <div style={{ position: "relative", width: "100%" }}>
            <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}>
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search articles by title, destination, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px 14px 48px",
                borderRadius: "50px",
                border: "1px solid var(--border-subtle)",
                fontFamily: "var(--font-montserrat)",
                fontSize: "0.9rem",
                outline: "none",
                color: "var(--primary)",
                background: "var(--bg-elevated)",
                transition: "border-color 0.2s ease"
              }}
            />
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "50px",
                  border: "1px solid",
                  borderColor: selectedCategory === cat ? "var(--secondary)" : "var(--border-subtle)",
                  background: selectedCategory === cat ? "rgba(0, 184, 169, 0.08)" : "transparent",
                  color: selectedCategory === cat ? "var(--secondary)" : "var(--text-secondary)",
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "0.82rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  outline: "none"
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== cat) {
                    e.currentTarget.style.background = "rgba(10,37,64,0.02)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== cat) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Live Articles Grid */}
        {loading ? (
          /* Loading Skeleton Grid */
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "30px" }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ height: "220px", borderRadius: "20px", background: "rgba(10,37,64,0.05)", marginBottom: "16px" }} className="skeleton-pulse" />
                <div style={{ width: "80px", height: "14px", background: "rgba(10,37,64,0.05)", borderRadius: "4px", marginBottom: "10px" }} className="skeleton-pulse" />
                <div style={{ width: "90%", height: "24px", background: "rgba(10,37,64,0.05)", borderRadius: "4px", marginBottom: "10px" }} className="skeleton-pulse" />
                <div style={{ width: "100%", height: "40px", background: "rgba(10,37,64,0.05)", borderRadius: "4px" }} className="skeleton-pulse" />
              </div>
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          /* No Results State */
          <div style={{ textAlign: "center", padding: "80px 20px", background: "#FFFFFF", borderRadius: "20px", border: "1px dashed var(--border-subtle)" }}>
            <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.6rem", color: "var(--primary)", marginBottom: "8px" }}>
              No Articles Found
            </h3>
            <p style={{ fontFamily: "var(--font-montserrat), sans-serif", color: "var(--text-secondary)", margin: 0 }}>
              Adjust your search keywords or switch categories to discover more stories.
            </p>
          </div>
        ) : (
          /* Clean Cards Grid */
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "30px" }}>
            {filteredArticles.map((art) => (
              <Link
                key={art._id}
                href={`/blogs/${art._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
              <article
                style={{
                  background: "#FFFFFF",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid var(--border-subtle)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer"
                }}
                className="blog-archive-card group"
              >
                {/* Cover Image */}
                <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                  <img
                    src={art.image}
                    alt={art.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}
                    className="blog-img"
                  />
                  <div style={{
                    position: "absolute", top: "16px", left: "16px",
                    background: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.4)",
                    borderRadius: "50px", padding: "4px 12px",
                    fontFamily: "var(--font-montserrat)", fontSize: "0.68rem",
                    fontWeight: "700", color: "var(--primary)", textTransform: "uppercase"
                  }}>
                    {art.category}
                  </div>
                </div>

                {/* Content Block */}
                <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: "var(--font-montserrat)", fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: "600" }}>
                      <User size={10} /> {art.author}
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: "var(--font-montserrat)", fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: "600" }}>
                      <Clock size={10} /> {art.readTime}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "1.35rem",
                      fontWeight: "800",
                      color: "var(--primary)",
                      lineHeight: "1.3",
                      marginBottom: "12px",
                      transition: "color 0.3s ease"
                    }}
                    className="blog-title"
                  >
                    {art.title}
                  </h3>

                  <p style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    lineHeight: "1.6",
                    marginBottom: "20px",
                    flex: 1
                  }}>
                    {art.desc.length > 120 ? `${art.desc.substring(0, 120)}...` : art.desc}
                  </p>

                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid var(--border-subtle)",
                    paddingTop: "16px",
                    marginTop: "auto"
                  }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: "var(--font-montserrat)", fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: "600" }}>
                      <Calendar size={10} /> {formatDate(art.updatedAt)}
                    </span>
                    <div style={{
                      display: "flex", alignItems: "center", gap: "4px",
                      fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", fontWeight: "700",
                      color: "var(--primary)"
                    }}>
                      Read Article <ArrowRight size={12} style={{ transition: "transform 0.2s" }} className="arrow-drag" />
                    </div>
                  </div>
                </div>
              </article>
              </Link>
            ))}
          </div>
        )}

      </div>

      <style>{`
        .blog-archive-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(10,37,64,0.06);
        }
        .blog-archive-card:hover .blog-img {
          transform: scale(1.05);
        }
        .blog-archive-card:hover .blog-title {
          color: var(--secondary) !important;
        }
        .blog-archive-card:hover .arrow-drag {
          transform: translateX(3px);
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        .skeleton-pulse {
          animation: pulse 1.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
