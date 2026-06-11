"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, MessageCircle, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    destination: "",
    dates: "",
    pax: "",
    budget: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    // Simulate API call to email / Google Sheets
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", phone: "", destination: "", dates: "", pax: "", budget: "", message: "" });
      
      // Optionally fallback to mailto if needed
      // const body = `Name: ${formData.name}\nPhone: ${formData.phone}\nDestination: ${formData.destination}\nDates: ${formData.dates}\nGuests: ${formData.pax}\nBudget: ${formData.budget}\nMessage: ${formData.message}`;
      // window.location.href = `mailto:info@wandersouls.in?subject=New Enquiry from ${formData.name}&body=${encodeURIComponent(body)}`;
      
    }, 1500);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", paddingTop: "80px", paddingBottom: "80px" }}>
      
      <div className="container" style={{ padding: "60px 20px" }}>
        
        <div style={{ textAlign: "center", marginBottom: "60px", maxWidth: "700px", margin: "0 auto 60px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(0,184,169,0.1)", color: "var(--secondary)",
            padding: "6px 16px", borderRadius: "50px",
            fontFamily: "var(--font-montserrat)", fontSize: "0.75rem",
            fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em",
            marginBottom: "20px"
          }}>
            Get In Touch
          </div>
          <h1 style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: "800",
            color: "var(--primary)",
            marginBottom: "20px"
          }}>
            Let's Plan Your <span style={{ color: "var(--accent)" }}>Next Escape</span>
          </h1>
          <p style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "1.1rem",
            color: "var(--text-secondary)",
            lineHeight: "1.6"
          }}>
            Speak directly with our travel designers. We'll craft a bespoke itinerary tailored perfectly to your pace and preferences.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "start"
        }} className="contact-grid">
          
          {/* ── LEFT: CONTACT INFO ── */}
          <div>
            <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.8rem", color: "var(--primary)", marginBottom: "30px" }}>
              Direct Contact
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "30px", marginBottom: "40px" }}>
              
              <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(10,37,64,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", flexShrink: 0 }}>
                  <Phone size={20} />
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: "700", fontSize: "0.95rem", color: "var(--primary)", marginBottom: "4px" }}>Call Us</h4>
                  <p style={{ fontFamily: "var(--font-montserrat), sans-serif", color: "var(--text-secondary)", marginBottom: "8px" }}>Mon-Fri, 9am to 6pm IST</p>
                  <a href="tel:+918452087326" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: "700", fontSize: "1.1rem", color: "var(--accent)", textDecoration: "none" }}>+91 84520 87326</a>
                </div>
              </div>

              <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(10,37,64,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", flexShrink: 0 }}>
                  <Mail size={20} />
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: "700", fontSize: "0.95rem", color: "var(--primary)", marginBottom: "4px" }}>Email Us</h4>
                  <p style={{ fontFamily: "var(--font-montserrat), sans-serif", color: "var(--text-secondary)", marginBottom: "8px" }}>For general enquiries & partnerships</p>
                  <a href="mailto:info@wandersouls.in" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: "700", fontSize: "1.1rem", color: "var(--accent)", textDecoration: "none" }}>info@wandersouls.in</a>
                </div>
              </div>

              <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(10,37,64,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", flexShrink: 0 }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: "700", fontSize: "0.95rem", color: "var(--primary)", marginBottom: "4px" }}>HQ Address</h4>
                  <p style={{ fontFamily: "var(--font-montserrat), sans-serif", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                    Level 4, Corporate Park, BKC<br/>
                    Bandra East, Mumbai 400051<br/>
                    Maharashtra, India
                  </p>
                </div>
              </div>

            </div>

            <div style={{
              background: "rgba(0,184,169,0.05)",
              border: "1px solid rgba(0,184,169,0.2)",
              borderRadius: "16px",
              padding: "24px",
              textAlign: "center"
            }}>
              <MessageCircle size={32} color="var(--secondary)" style={{ margin: "0 auto 16px" }} />
              <h4 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: "700", color: "var(--primary)", marginBottom: "8px" }}>Fastest Response via WhatsApp</h4>
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "16px" }}>Chat directly with our luxury concierge team for instant itinerary quotes.</p>
              <a 
                href="https://wa.me/918452087326?text=Hi!%20I'm%20looking%20to%20plan%20a%20luxury%20trip."
                target="_blank" rel="noopener noreferrer"
                className="btn-secondary"
                style={{ display: "inline-block", textDecoration: "none" }}
              >
                Chat on WhatsApp
              </a>
            </div>

          </div>

          {/* ── RIGHT: ENQUIRY FORM ── */}
          <div style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            padding: "40px",
            boxShadow: "0 20px 40px rgba(10,37,64,0.08)",
            border: "1px solid rgba(10,37,64,0.05)"
          }}>
            <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.8rem", color: "var(--primary)", marginBottom: "8px" }}>
              Enquire Now
            </h3>
            <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "30px" }}>
              Fill in your details below and we'll get back to you within 24 hours.
            </p>

            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "40px 20px", background: "rgba(0,184,169,0.05)", borderRadius: "16px" }}>
                <CheckCircle2 size={48} color="var(--secondary)" style={{ margin: "0 auto 16px" }} />
                <h4 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.5rem", color: "var(--primary)", marginBottom: "8px" }}>Request Received!</h4>
                <p style={{ fontFamily: "var(--font-montserrat), sans-serif", color: "var(--text-secondary)" }}>
                  Thank you for your enquiry. Our luxury concierge will contact you shortly to craft your itinerary.
                </p>
                <button onClick={() => setStatus("idle")} style={{ marginTop: "24px", background: "transparent", border: "none", color: "var(--accent)", fontWeight: "700", cursor: "pointer", fontFamily: "var(--font-montserrat)" }}>
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="form-row">
                  <div className="input-group">
                    <label style={{ display: "block", fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", fontWeight: "600", color: "var(--primary)", marginBottom: "8px" }}>Full Name *</label>
                    <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--border-subtle)", background: "var(--bg-elevated)", fontFamily: "var(--font-montserrat)", outline: "none" }} placeholder="Jane Doe" />
                  </div>
                  <div className="input-group">
                    <label style={{ display: "block", fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", fontWeight: "600", color: "var(--primary)", marginBottom: "8px" }}>Phone / WhatsApp *</label>
                    <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--border-subtle)", background: "var(--bg-elevated)", fontFamily: "var(--font-montserrat)", outline: "none" }} placeholder="+91 90000 00000" />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="form-row">
                  <div className="input-group">
                    <label style={{ display: "block", fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", fontWeight: "600", color: "var(--primary)", marginBottom: "8px" }}>Destination *</label>
                    <input required type="text" value={formData.destination} onChange={(e) => setFormData({...formData, destination: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--border-subtle)", background: "var(--bg-elevated)", fontFamily: "var(--font-montserrat)", outline: "none" }} placeholder="e.g. South Africa, Thailand" />
                  </div>
                  <div className="input-group">
                    <label style={{ display: "block", fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", fontWeight: "600", color: "var(--primary)", marginBottom: "8px" }}>Travel Dates</label>
                    <input type="text" value={formData.dates} onChange={(e) => setFormData({...formData, dates: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--border-subtle)", background: "var(--bg-elevated)", fontFamily: "var(--font-montserrat)", outline: "none" }} placeholder="e.g. Oct 2024, 7 Days" />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="form-row">
                  <div className="input-group">
                    <label style={{ display: "block", fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", fontWeight: "600", color: "var(--primary)", marginBottom: "8px" }}>Number of Guests</label>
                    <input type="text" value={formData.pax} onChange={(e) => setFormData({...formData, pax: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--border-subtle)", background: "var(--bg-elevated)", fontFamily: "var(--font-montserrat)", outline: "none" }} placeholder="e.g. 2 Adults" />
                  </div>
                  <div className="input-group">
                    <label style={{ display: "block", fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", fontWeight: "600", color: "var(--primary)", marginBottom: "8px" }}>Est. Budget (Per Pax)</label>
                    <input type="text" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--border-subtle)", background: "var(--bg-elevated)", fontFamily: "var(--font-montserrat)", outline: "none" }} placeholder="e.g. ₹50,000" />
                  </div>
                </div>

                <div className="input-group">
                  <label style={{ display: "block", fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", fontWeight: "600", color: "var(--primary)", marginBottom: "8px" }}>Additional Details</label>
                  <textarea rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--border-subtle)", background: "var(--bg-elevated)", fontFamily: "var(--font-montserrat)", outline: "none", resize: "vertical" }} placeholder="Any special occasions, preferences, or must-haves?"></textarea>
                </div>

                <button type="submit" disabled={status === "submitting"} className="btn-primary" style={{
                  width: "100%", padding: "16px", borderRadius: "12px", border: "none",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  fontSize: "1rem", fontWeight: "700", cursor: status === "submitting" ? "wait" : "pointer",
                  opacity: status === "submitting" ? 0.7 : 1
                }}>
                  {status === "submitting" ? "Sending..." : (
                    <>
                      Send Request <Send size={18} />
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>
      </div>
      
      <style>{`
        @media (max-width: 800px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>

    </div>
  );
}
