"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar, BookOpen } from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  desc: string;
  image: string;
  category: string;
  readTime: string;
  author: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (res.status === 404) { setNotFound(true); return; }
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setBlog(data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

  const formatDate = (str: string) =>
    new Date(str).toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric",
    });

  /* ── Loading skeleton ── */
  if (loading) return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", paddingTop: "110px", paddingBottom: "80px" }}>
      <div className="container" style={{ maxWidth: "780px" }}>
        <div style={{ width: "120px", height: "14px", background: "rgba(10,37,64,0.06)", borderRadius: "4px", marginBottom: "32px" }} className="skeleton-pulse" />
        <div style={{ width: "70%", height: "48px", background: "rgba(10,37,64,0.06)", borderRadius: "8px", marginBottom: "16px" }} className="skeleton-pulse" />
        <div style={{ width: "40%", height: "16px", background: "rgba(10,37,64,0.06)", borderRadius: "4px", marginBottom: "32px" }} className="skeleton-pulse" />
        <div style={{ width: "100%", height: "420px", background: "rgba(10,37,64,0.06)", borderRadius: "20px", marginBottom: "32px" }} className="skeleton-pulse" />
        {[1,2,3,4].map(i => (
          <div key={i} style={{ width: "100%", height: "18px", background: "rgba(10,37,64,0.06)", borderRadius: "4px", marginBottom: "10px" }} className="skeleton-pulse" />
        ))}
      </div>
      <style>{`@keyframes pulse{0%{opacity:.6}50%{opacity:1}100%{opacity:.6}}.skeleton-pulse{animation:pulse 1.5s infinite ease-in-out}`}</style>
    </div>
  );

  /* ── Not found ── */
  if (notFound || !blog) return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", paddingTop: "110px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <BookOpen size={48} style={{ color: "var(--text-muted)", marginBottom: "16px" }} />
      <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "2rem", color: "var(--primary)", marginBottom: "12px" }}>Article Not Found</h1>
      <p style={{ fontFamily: "var(--font-montserrat), sans-serif", color: "var(--text-secondary)", marginBottom: "24px" }}>This article may have been removed or the link is incorrect.</p>
      <Link href="/blogs" style={{ fontFamily: "var(--font-montserrat)", fontWeight: "700", color: "var(--accent)", textDecoration: "none" }}>← Back to all articles</Link>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", paddingTop: "100px", paddingBottom: "80px" }}>

      {/* ── Hero image ── */}
      <div style={{ position: "relative", width: "100%", height: "clamp(280px, 45vw, 520px)", overflow: "hidden", marginBottom: "0" }}>
        <img
          src={blog.image}
          alt={blog.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(10,37,56,0.1) 0%, rgba(10,37,56,0.65) 100%)",
        }} />

        {/* Category badge over image */}
        <div style={{
          position: "absolute", top: "24px", left: "24px",
          background: "rgba(255,255,255,0.88)", backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.4)",
          borderRadius: "50px", padding: "6px 16px",
          fontFamily: "var(--font-montserrat)", fontSize: "0.72rem",
          fontWeight: "700", color: "var(--primary)", textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}>
          {blog.category}
        </div>
      </div>

      {/* ── Article body ── */}
      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 24px" }}>

        {/* Back link */}
        <Link
          href="/blogs"
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            color: "var(--text-secondary)", textDecoration: "none",
            fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.78rem",
            fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em",
            marginTop: "32px", marginBottom: "28px",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--secondary)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--text-secondary)"}
        >
          <ArrowLeft size={13} /> All Articles
        </Link>

        {/* Title */}
        <h1 style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "clamp(1.9rem, 4vw, 2.9rem)",
          fontWeight: "900",
          color: "var(--primary)",
          lineHeight: "1.2",
          marginBottom: "20px",
          letterSpacing: "-0.01em",
        }}>
          {blog.title}
        </h1>

        {/* Meta row */}
        <div style={{
          display: "flex", flexWrap: "wrap", alignItems: "center", gap: "20px",
          marginBottom: "36px",
          paddingBottom: "24px",
          borderBottom: "1px solid var(--border-subtle)",
        }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "600" }}>
            <User size={13} /> {blog.author}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "600" }}>
            <Clock size={13} /> {blog.readTime}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "600" }}>
            <Calendar size={13} /> {formatDate(blog.updatedAt)}
          </span>
        </div>

        {/* Article content */}
        <div style={{
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: "1.05rem",
          color: "var(--text-secondary)",
          lineHeight: "1.85",
          marginBottom: "48px",
        }}>
          {/* Render paragraphs split by newline */}
          {blog.desc.split(/\n+/).map((para, i) => (
            <p key={i} style={{ marginBottom: "1.4em" }}>{para}</p>
          ))}
        </div>

        {/* Footer CTA */}
        <div style={{
          background: "linear-gradient(135deg, var(--primary) 0%, #1a4a6e 100%)",
          borderRadius: "20px",
          padding: "36px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "16px",
        }}>
          <div style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "1.5rem", fontWeight: "800",
            color: "#FFFFFF",
          }}>
            Ready to make these memories?
          </div>
          <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.9rem", color: "rgba(255,255,255,0.75)", margin: 0 }}>
            Browse our curated itineraries and plan your dream trip.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/destinations" style={{
              display: "inline-block",
              background: "var(--accent)", color: "#FFFFFF",
              fontFamily: "var(--font-montserrat)", fontWeight: "700", fontSize: "0.9rem",
              padding: "12px 28px", borderRadius: "50px",
              textDecoration: "none", transition: "opacity 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.85"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
            >
              Explore Destinations
            </Link>
            <Link href="/blogs" style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.12)", color: "#FFFFFF",
              border: "1px solid rgba(255,255,255,0.3)",
              fontFamily: "var(--font-montserrat)", fontWeight: "700", fontSize: "0.9rem",
              padding: "12px 28px", borderRadius: "50px",
              textDecoration: "none", transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.2)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"}
            >
              More Articles
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%{opacity:.6} 50%{opacity:1} 100%{opacity:.6} }
        .skeleton-pulse { animation: pulse 1.5s infinite ease-in-out; }
      `}</style>
    </div>
  );
}
