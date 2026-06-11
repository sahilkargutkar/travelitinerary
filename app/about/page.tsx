"use client";

import { Award, Globe, Heart, Shield } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", paddingTop: "80px" }}>
      
      {/* ── HERO ── */}
      <section style={{
        padding: "80px 20px",
        background: "var(--primary)",
        color: "#FFFFFF",
        textAlign: "center"
      }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 className="animate-fade-up" style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: "800",
            marginBottom: "20px",
            color: "#FAFAF7"
          }}>
            Crafting Extraordinary <br />
            <span style={{ color: "var(--secondary)" }}>Journeys</span>
          </h1>
          <p className="animate-fade-up" style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "1.1rem",
            color: "rgba(255,255,255,0.8)",
            lineHeight: "1.7",
            animationDelay: "0.2s"
          }}>
            We believe that travel is the ultimate catalyst for inspiration, connection, and profound transformation.
          </p>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="container" style={{ padding: "80px 20px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "60px",
          alignItems: "center"
        }}>
          <div>
            <h2 style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "2.5rem",
              color: "var(--primary)",
              marginBottom: "24px"
            }}>Our Story</h2>
            <p style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              color: "var(--text-secondary)",
              lineHeight: "1.8",
              marginBottom: "16px"
            }}>
              WanderSouls Travel Pvt. Ltd. was founded on a simple premise: luxury is personal. For over two decades, our founders traveled the globe seeking out the most breathtaking, untouched, and exclusive corners of the world. 
            </p>
            <p style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              color: "var(--text-secondary)",
              lineHeight: "1.8"
            }}>
              We saw a gap in the market for truly bespoke travel experiences that prioritize value and authenticity over cookie-cutter itineraries. Today, we are proud to be a trusted partner for luxury travelers seeking deep, meaningful connections with their destinations.
            </p>
          </div>
          <div style={{
            background: "rgba(10,37,64,0.03)",
            padding: "40px",
            borderRadius: "24px",
            border: "1px solid rgba(10,37,64,0.06)"
          }}>
            <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
              <div style={{ color: "var(--accent)" }}><Award size={32} /></div>
              <div>
                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: "700", marginBottom: "8px", color: "var(--primary)" }}>Award Winning</h3>
                <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.5" }}>Recognized by Condé Nast and Virtuoso for excellence in experiential travel.</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
              <div style={{ color: "var(--accent)" }}><Globe size={32} /></div>
              <div>
                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: "700", marginBottom: "8px", color: "var(--primary)" }}>Global Network</h3>
                <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.5" }}>Exclusive partnerships with world-class properties and local experts.</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ color: "var(--accent)" }}><Shield size={32} /></div>
              <div>
                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: "700", marginBottom: "8px", color: "var(--primary)" }}>Absolute Trust</h3>
                <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.5" }}>Fully bonded, insured, and committed to your safety and satisfaction.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE TEAM ── */}
      <section style={{ background: "var(--bg-elevated)", padding: "80px 20px" }}>
        <div className="container" style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "2.5rem",
            color: "var(--primary)",
            marginBottom: "16px"
          }}>Meet Your Travel Designers</h2>
          <p style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            color: "var(--text-secondary)",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            Our team of destination specialists have personally vetted every hotel, tested every experience, and tasted every recommended dish.
          </p>
        </div>

        <div className="container" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "40px"
        }}>
          {[
            { name: "Eleanor Vance", role: "Head of Asian Expeditions", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80" },
            { name: "Marcus Thorne", role: "African Safari Specialist", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80" },
            { name: "Sophia Chen", role: "Luxury Concierge", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80" }
          ].map(member => (
            <div key={member.name} style={{ textAlign: "center" }}>
              <img src={member.img} alt={member.name} style={{
                width: "160px", height: "160px", borderRadius: "50%", objectFit: "cover", marginBottom: "20px",
                border: "4px solid #FFFFFF", boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
              }} />
              <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: "700", color: "var(--primary)", marginBottom: "4px" }}>
                {member.name}
              </h3>
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.85rem", color: "var(--secondary)", fontWeight: "600" }}>
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── LEGAL & COMPANY INFO ── */}
      <section className="container" style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2 style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "2rem",
          color: "var(--primary)",
          marginBottom: "32px"
        }}>Corporate Information</h2>
        
        <div style={{
          background: "#FFFFFF",
          padding: "40px",
          borderRadius: "24px",
          border: "1px solid rgba(10,37,64,0.08)",
          maxWidth: "700px",
          margin: "0 auto",
          textAlign: "left"
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div>
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Registered Entity</p>
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: "700", color: "var(--primary)" }}>WanderSouls Travel Pvt. Ltd.</p>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Corporate Identity Number (CIN)</p>
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: "700", color: "var(--primary)" }}>U7G110MH2025PTC461276</p>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Registered Address</p>
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: "600", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                Level 4, Corporate Park, Bandra Kurla Complex (BKC)<br/>
                Bandra East, Mumbai, Maharashtra 400051<br/>
                India
              </p>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: "40px" }}>
          <Link href="/contact" className="btn-primary" style={{ padding: "16px 32px", borderRadius: "50px", textDecoration: "none", display: "inline-flex", fontWeight: "700" }}>
            Get in Touch
          </Link>
        </div>
      </section>

    </div>
  );
}
