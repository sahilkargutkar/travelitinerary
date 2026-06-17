"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft, Plus, Edit2, Trash2, Check, Sparkles, Loader2,
  Image as ImageIcon, FileText, User, Tag, Clock, Calendar
} from "lucide-react";

interface BlogFormState {
  _id?: string;
  title: string;
  desc: string;
  image: string;
  category: string;
  readTime: string;
  author: string;
  featured: boolean;
}

const initialFormState: BlogFormState = {
  title: "",
  desc: "",
  image: "",
  category: "Culture & Wellness",
  readTime: "5 min read",
  author: "",
  featured: false,
};

const CATEGORIES = [
  "Culture & Wellness",
  "Adventure Guides",
  "Gastronomy",
  "Luxury Travel",
  "Solo Expeditions",
  "Family Escapes"
];

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<BlogFormState>(initialFormState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      } else {
        setError("Failed to load blogs.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while loading blogs.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch("/api/blogs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSuccess(isEditing ? "Story updated successfully!" : "Story created successfully!");
      setForm(initialFormState);
      setIsEditing(false);
      fetchBlogs();
      
      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to save blog.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (blog: any) => {
    setIsEditing(true);
    setForm({
      _id: blog._id,
      title: blog.title,
      desc: blog.desc,
      image: blog.image,
      category: blog.category,
      readTime: blog.readTime,
      author: blog.author,
      featured: blog.featured || false,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this story?")) return;
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete");
      }
      setSuccess("Story deleted successfully!");
      fetchBlogs();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to delete blog.");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setForm(initialFormState);
    setError("");
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", paddingTop: "110px", paddingBottom: "80px" }}>
      <div className="container" style={{ maxWidth: "1200px" }}>
        
        {/* Header Breadcrumb */}
        <div style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <Link href="/" style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              color: "var(--text-secondary)", textDecoration: "none",
              fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.78rem",
              fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em",
              marginBottom: "12px", transition: "color 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--secondary)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
            >
              <ArrowLeft size={13} /> Back to Homepage
            </Link>
            <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "2.4rem", fontWeight: "900", color: "var(--primary)", margin: 0 }}>
              Story & Editorial <span className="gradient-text">Manager</span>
            </h1>
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(0, 184, 169, 0.08)", color: "var(--secondary)",
            padding: "8px 16px", borderRadius: "50px",
            fontFamily: "var(--font-montserrat)", fontSize: "0.78rem", fontWeight: "700",
          }}>
            <Sparkles size={14} /> Database Connected (MongoDB Atlas)
          </div>
        </div>

        {/* Success/Error Banners */}
        {error && (
          <div style={{ background: "rgba(220, 38, 38, 0.08)", border: "1px solid rgba(220, 38, 38, 0.2)", color: "#DC2626", padding: "16px 20px", borderRadius: "12px", marginBottom: "24px", fontFamily: "var(--font-montserrat)", fontSize: "0.88rem", fontWeight: "600" }}>
            ✕ {error}
          </div>
        )}
        {success && (
          <div style={{ background: "rgba(0, 184, 169, 0.08)", border: "1px solid rgba(0, 184, 169, 0.2)", color: "var(--secondary)", padding: "16px 20px", borderRadius: "12px", marginBottom: "24px", fontFamily: "var(--font-montserrat)", fontSize: "0.88rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
            <Check size={16} /> {success}
          </div>
        )}

        <div className="admin-grid" style={{ display: "grid", gridTemplateColumns: "450px 1fr", gap: "36px" }}>
          
          {/* LEFT COLUMN: The Form */}
          <div>
            <div style={{
              background: "#FFFFFF",
              border: "1px solid var(--border-subtle)",
              borderRadius: "24px",
              padding: "32px",
              position: "sticky",
              top: "100px",
              boxShadow: "0 10px 30px rgba(10,37,64,0.02)"
            }} className="luxury-card">
              <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.45rem", fontWeight: "800", color: "var(--primary)", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
                {isEditing ? <Edit2 size={20} color="var(--secondary)" /> : <Plus size={22} color="var(--secondary)" />}
                {isEditing ? "Edit Editorial Post" : "Draft New Story"}
              </h2>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                
                {/* Title */}
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-montserrat)", fontSize: "0.7rem", fontWeight: "700", textTransform: "uppercase", color: "var(--text-secondary)", letterSpacing: "0.05em", marginBottom: "6px" }}>
                    Story Title
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Navigating Kyoto's Hidden Temple Pathways"
                      style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1px solid var(--border-subtle)", fontFamily: "var(--font-montserrat)", fontSize: "0.85rem", outline: "none", color: "var(--primary)" }}
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-montserrat)", fontSize: "0.7rem", fontWeight: "700", textTransform: "uppercase", color: "var(--text-secondary)", letterSpacing: "0.05em", marginBottom: "6px" }}>
                    Snippet / Summary
                  </label>
                  <textarea
                    name="desc"
                    value={form.desc}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Provide a compelling brief paragraph summarizing the travel story..."
                    style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1px solid var(--border-subtle)", fontFamily: "var(--font-montserrat)", fontSize: "0.85rem", outline: "none", color: "var(--primary)", resize: "none" }}
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-montserrat)", fontSize: "0.7rem", fontWeight: "700", textTransform: "uppercase", color: "var(--text-secondary)", letterSpacing: "0.05em", marginBottom: "6px" }}>
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={form.image}
                    onChange={handleInputChange}
                    required
                    placeholder="https://images.unsplash.com/photo-..."
                    style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1px solid var(--border-subtle)", fontFamily: "var(--font-montserrat)", fontSize: "0.85rem", outline: "none", color: "var(--primary)" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  {/* Category */}
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-montserrat)", fontSize: "0.7rem", fontWeight: "700", textTransform: "uppercase", color: "var(--text-secondary)", letterSpacing: "0.05em", marginBottom: "6px" }}>
                      Category
                    </label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleInputChange}
                      style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1px solid var(--border-subtle)", background: "#FFFFFF", fontFamily: "var(--font-montserrat)", fontSize: "0.85rem", outline: "none", color: "var(--primary)", cursor: "pointer" }}
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Read Time */}
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-montserrat)", fontSize: "0.7rem", fontWeight: "700", textTransform: "uppercase", color: "var(--text-secondary)", letterSpacing: "0.05em", marginBottom: "6px" }}>
                      Read Time
                    </label>
                    <input
                      type="text"
                      name="readTime"
                      value={form.readTime}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. 6 min read"
                      style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1px solid var(--border-subtle)", fontFamily: "var(--font-montserrat)", fontSize: "0.85rem", outline: "none", color: "var(--primary)" }}
                    />
                  </div>
                </div>

                {/* Author */}
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-montserrat)", fontSize: "0.7rem", fontWeight: "700", textTransform: "uppercase", color: "var(--text-secondary)", letterSpacing: "0.05em", marginBottom: "6px" }}>
                    Author Name
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={form.author}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Evelyn Thorne"
                    style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1px solid var(--border-subtle)", fontFamily: "var(--font-montserrat)", fontSize: "0.85rem", outline: "none", color: "var(--primary)" }}
                  />
                </div>

                {/* Featured Checkbox */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px", background: "rgba(10,37,64,0.02)", borderRadius: "12px", border: "1px solid var(--border-subtle)", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={form.featured}
                    onChange={handleCheckboxChange}
                    style={{ cursor: "pointer", width: "16px", height: "16px" }}
                  />
                  <label htmlFor="featured" style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.82rem", fontWeight: "600", color: "var(--primary)", cursor: "pointer", selectAnchor: "none" } as any}>
                    Feature this story on Homepage (Unsets other featured story)
                  </label>
                </div>

                {/* Form CTA Buttons */}
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      style={{ flex: 1, padding: "12px 16px", border: "1px solid var(--border-subtle)", background: "transparent", color: "var(--text-secondary)", fontFamily: "var(--font-montserrat)", fontSize: "0.85rem", fontWeight: "700", borderRadius: "12px", cursor: "pointer", transition: "background 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(10,37,64,0.03)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary"
                    style={{ flex: 2, padding: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", border: "none", cursor: "pointer" }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Saving...
                      </>
                    ) : isEditing ? (
                      "Save Story Updates"
                    ) : (
                      "Publish Story"
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Live Blogs List */}
          <div>
            <div style={{
              background: "#FFFFFF",
              border: "1px solid var(--border-subtle)",
              borderRadius: "24px",
              padding: "32px",
              boxShadow: "0 10px 30px rgba(10,37,64,0.02)"
            }} className="luxury-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.45rem", fontWeight: "800", color: "var(--primary)", margin: 0 }}>
                  Live Stories ({blogs.length})
                </h2>
                <button
                  onClick={fetchBlogs}
                  style={{ background: "transparent", border: "none", color: "var(--secondary)", fontFamily: "var(--font-montserrat)", fontSize: "0.78rem", fontWeight: "700", cursor: "pointer" }}
                >
                  Reload List
                </button>
              </div>

              {loading ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 0", gap: "12px" }}>
                  <Loader2 size={36} className="animate-spin" style={{ color: "var(--secondary)" }} />
                  <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "500" }}>
                    Fetching database records...
                  </span>
                </div>
              ) : blogs.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px", border: "2px dashed var(--border-subtle)", borderRadius: "16px" }}>
                  <p style={{ fontFamily: "var(--font-montserrat)", color: "var(--text-muted)", margin: 0 }}>
                    No editorial stories found in Database.
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {blogs.map((blog) => (
                    <div
                      key={blog._id}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "120px 1fr auto",
                        gap: "20px",
                        padding: "16px",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "16px",
                        background: blog.featured ? "rgba(0, 184, 169, 0.02)" : "transparent",
                        borderColor: blog.featured ? "rgba(0, 184, 169, 0.2)" : "var(--border-subtle)",
                        transition: "all 0.3s ease",
                      }}
                      className="admin-blog-card"
                    >
                      {/* Image Preview */}
                      <div style={{ position: "relative", height: "90px", borderRadius: "10px", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
                        <img src={blog.image} alt={blog.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>

                      {/* Blog Details */}
                      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                          <span style={{ background: "rgba(10,37,64,0.05)", border: "1px solid var(--border-subtle)", padding: "3px 8px", borderRadius: "6px", fontFamily: "var(--font-montserrat)", fontSize: "0.68rem", fontWeight: "700", color: "var(--primary)" }}>
                            {blog.category}
                          </span>
                          {blog.featured && (
                            <span style={{ background: "rgba(255,122,89,0.12)", border: "1px solid rgba(255,122,89,0.3)", padding: "3px 8px", borderRadius: "6px", fontFamily: "var(--font-montserrat)", fontSize: "0.68rem", fontWeight: "700", color: "var(--accent)" }}>
                              ★ Featured on Home
                            </span>
                          )}
                        </div>
                        
                        <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: "800", color: "var(--primary)", margin: "0 0 6px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {blog.title}
                        </h3>

                        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: "var(--font-montserrat)", fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: "600" }}>
                            <User size={10} /> {blog.author}
                          </span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: "var(--font-montserrat)", fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: "600" }}>
                            <Clock size={10} /> {blog.readTime}
                          </span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: "var(--font-montserrat)", fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: "600" }}>
                            <Calendar size={10} /> Updated: {formatDate(blog.updatedAt)}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px", justifyContent: "center" }}>
                        <button
                          onClick={() => handleEdit(blog)}
                          style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "transparent", border: "1px solid rgba(0, 184, 169, 0.25)", color: "var(--secondary)", padding: "7px 12px", borderRadius: "8px", fontFamily: "var(--font-montserrat)", fontSize: "0.78rem", fontWeight: "700", cursor: "pointer", transition: "background 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0, 184, 169, 0.04)"}
                          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        >
                          <Edit2 size={12} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "transparent", border: "1px solid rgba(220, 38, 38, 0.25)", color: "#DC2626", padding: "7px 12px", borderRadius: "8px", fontFamily: "var(--font-montserrat)", fontSize: "0.78rem", fontWeight: "700", cursor: "pointer", transition: "background 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(220, 38, 38, 0.04)"}
                          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

        </div>

      </div>

      <style>{`
        .admin-blog-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(10,37,64,0.03);
        }
        @media (max-width: 1024px) {
          .admin-grid {
            grid-template-columns: 1fr !important;
          }
          .luxury-card {
            position: static !important;
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
