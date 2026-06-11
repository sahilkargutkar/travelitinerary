"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, Send, Bot, User, CheckCircle, ArrowRight, FileText } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
  itinerary?: {
    destination: string;
    days: { day: number; title: string; highlight: string }[];
  };
}

const PRESET_PROMPTS = [
  {
    text: "A quiet week in Kerala for two",
    query: "kerala-honeymoon",
    response: {
      destination: "Munnar & Alleppey Backwaters, Kerala",
      days: [
        { day: 1, title: "Arrive in Cochin & Scenic Drive to Munnar", highlight: "Private transfer, premium resort check-in, romantic candlelit dinner." },
        { day: 2, title: "Private Tea Plantation Safari & Tea Tasting", highlight: "Guided stroll through private estate, artisanal tea tasting, couples massage." },
        { day: 3, title: "Scenic Munnar Waterfalls & Lake Ride", highlight: "Speedboat ride on Mattupetty Dam, sunset viewing at Echo Point." },
        { day: 4, title: "Munnar to Alleppey Luxury Houseboat Check-in", highlight: "Traditional Kerala lunch prepared onboard, sailing past quiet villages." },
        { day: 5, title: "Alleppey Backwaters to Marari Beach Resort", highlight: "Check-in at luxury beach villa, sunset stroll on pristine white sands." },
        { day: 6, title: "Ayurvedic Rejuvenation & Beach Dinner", highlight: "Full body wellness therapy, beachfront lobster dinner under the stars." },
        { day: 7, title: "Marari Beach to Cochin Departure", highlight: "Sightseeing in Fort Kochi, spice market visit, private transfer to airport." }
      ]
    }
  },
  {
    text: "Family trip to Singapore",
    query: "singapore-adventure",
    response: {
      destination: "Singapore City",
      days: [
        { day: 1, title: "Arrival & Marina Bay Sands VIP SkyPark", highlight: "VIP lounge access, infinity pool view, champagne toast at Sunset." },
        { day: 2, title: "Supertree Canopy Walk & Cloud Forest", highlight: "Early access before public, avatar-themed cloud walk, dinner at Michelin-starred Hawker Chan." },
        { day: 3, title: "Sentosa Island Private Yacht Charter", highlight: "4-hour catamaran cruise, snorkeling, gourmet barbecue on board." },
        { day: 4, title: "Universal Studios VIP Access & Night Safari", highlight: "No-wait queues for all rides, private golf buggy tour at Night Safari." },
        { day: 5, title: "Jewel Changi Canopy Park & Departure", highlight: "Viewing vortex waterfall from private lounge, souvenir shopping, airport drop." }
      ]
    }
  },
  {
    text: "10-day safari in Kruger",
    query: "safari-kruger",
    response: {
      destination: "Kruger National Park, South Africa",
      days: [
        { day: 1, title: "Arrive in Johannesburg & Fly to Kruger Private Reserve", highlight: "Check-in at luxury safari lodge, evening game drive, boma dinner." },
        { day: 2, title: "Dawn Game Drive & Big Five Tracking", highlight: "Open 4x4 safari with master tracker, bush breakfast, pool relaxation." },
        { day: 3, title: "Guided Bush Walk & Wildlife Conservation Seminar", highlight: "Walking safari with armed rangers, learning animal tracking, sundowners." },
        { day: 4, title: "Luxury Safari Lodge Transfer & Spa Massage", highlight: "Indulge in wellness massage overlooking the river, cheetah spotting." },
        { day: 5, title: "Hot Air Balloon Flight & Champagne Sunset", highlight: "Floating above the savannah at sunrise, bush breakfast, evening game drive." },
        { day: 6, title: "Private Wildlife Photography Masterclass", highlight: "Safari with professional photographer, custom editing session." },
        { day: 7, title: "Cape Town Fly-in & Table Mountain Sunset VIP", highlight: "Flight to Cape Town, luxury hotel, cableway sunset view." },
        { day: 8, title: "Cape Peninsula Private Tour & Penguins", highlight: "Cape of Good Hope, coastal drive, visiting Boulders Beach penguin colony." },
        { day: 9, title: "Franschhoek Luxury Wine Tram & Gourmet Lunch", highlight: "Hop-on private tram through historic vineyards, 5-course wine pairing." },
        { day: 10, title: "Cape Town Craft Markets & Departure", highlight: "Buying local art, airport private drop-off." }
      ]
    }
  }
];

export default function AiPlanner() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "I'm the WanderSouls planning assistant. Tell me where you want to go and who you're traveling with, and I'll sketch out an initial route for our specialists to refine."
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSend = (text: string, queryKey?: string) => {
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);

      // Find preset response
      const matched = PRESET_PROMPTS.find(p => p.query === queryKey || p.text.toLowerCase() === text.toLowerCase());

      if (matched) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: `I have crafted a bespoke itinerary for ${matched.response.destination}. Here is a summary of your luxury day-by-day travel map:`,
            itinerary: matched.response
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: `I've analyzed your request: "${text}". To give you an absolute world-class bespoke design, I recommend looking at our curated packages or connecting with our 24/7 Concierge Desk. Try selecting one of our high-fidelity presets below to see a sample itinerary in action!`
          }
        ]);
      }
    }, 1500);
  };

  return (
    <section id="ai-planner" style={{
      padding: "64px 0",
      background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-elevated) 100%)",
      position: "relative",
    }}>
      {/* Subtle background glow */}
      <div style={{
        position: "absolute", top: "20%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0, 184, 169, 0.04) 0%, rgba(255, 122, 89, 0.02) 80%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "60px",
          alignItems: "center"
        }} className="ai-planner-grid">

          {/* Left info column */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: "rgba(0, 184, 169, 0.1)", color: "var(--secondary)",
              padding: "6px 14px", borderRadius: "50px",
              fontFamily: "var(--font-montserrat)", fontSize: "0.75rem",
              fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em",
              marginBottom: "20px"
            }}>
              <Sparkles size={13} fill="var(--secondary)" />
              AI Concierge Desk
            </div>

            <h2 className="section-title" style={{ marginBottom: "20px" }}>
              Your Bespoke Travel Planner, <span className="gradient-text">Powered by AI</span>
            </h2>

            <p style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "1rem",
              color: "var(--text-secondary)",
              lineHeight: "1.75",
              marginBottom: "32px",
            }}>
              Skip hours of research. Our advanced AI concierge synthesizes thousands of luxury accommodation reviews, premium transfers, and exclusive experiences to build a personalized timeline in seconds.
            </p>

            {/* Presets */}
            <div>
              <p style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.78rem",
                fontWeight: "700",
                color: "var(--primary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "12px",
              }}>Select a preset to test the AI engine:</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {PRESET_PROMPTS.map((p) => (
                  <button
                    key={p.query}
                    onClick={() => handleSend(p.text, p.query)}
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      background: "rgba(255, 255, 255, 0.7)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "16px",
                      textAlign: "left",
                      cursor: "pointer",
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      color: "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 8px rgba(10, 37, 64, 0.01)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#FFFFFF";
                      e.currentTarget.style.borderColor = "var(--secondary)";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.7)";
                      e.currentTarget.style.borderColor = "var(--border-subtle)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <span>{p.text}</span>
                    <ArrowRight size={14} color="var(--secondary)" />
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right chat widget column */}
          <div style={{
            background: "rgba(255, 255, 255, 0.65)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            borderRadius: "28px",
            height: "550px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 30px 70px rgba(10, 37, 64, 0.08)",
            overflow: "hidden",
          }}>
            {/* Chat Header */}
            <div style={{
              padding: "18px 24px",
              borderBottom: "1px solid rgba(10, 37, 64, 0.06)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "rgba(255, 255, 255, 0.3)",
            }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "50%",
                background: "var(--primary)", display: "flex",
                alignItems: "center", justifyContent: "center",
                color: "#FFFFFF",
              }}>
                <Bot size={20} />
              </div>
              <div>
                <h3 style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "1rem", fontWeight: "800", color: "var(--primary)",
                  margin: "0",
                }}>WanderSouls Concierge</h3>
                <span style={{
                  fontFamily: "var(--font-montserrat)", fontSize: "0.7rem",
                  color: "var(--secondary)", fontWeight: "600",
                  display: "flex", alignItems: "center", gap: "4px"
                }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--secondary)", display: "inline-block" }}></span>
                  AI Agent Online
                </span>
              </div>
            </div>

            {/* Messages Body */}
            <div style={{
              flex: 1,
              padding: "24px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}>
              {messages.map((m, idx) => (
                <div key={idx} style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: m.sender === "user" ? "flex-end" : "flex-start",
                  width: "100%",
                }}>
                  {/* Avatar + Label */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "4px",
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "0.68rem",
                    fontWeight: "700",
                    color: "var(--text-muted)",
                  }}>
                    {m.sender === "bot" ? (
                      <>
                        <Bot size={11} color="var(--secondary)" />
                        <span>CONCIERGE</span>
                      </>
                    ) : (
                      <>
                        <User size={11} color="var(--accent)" />
                        <span>EXPLORER</span>
                      </>
                    )}
                  </div>

                  {/* Bubble */}
                  <div style={{
                    maxWidth: "85%",
                    padding: "14px 18px",
                    borderRadius: m.sender === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    background: m.sender === "user" ? "var(--primary)" : "#FFFFFF",
                    color: m.sender === "user" ? "#FFFFFF" : "var(--text-primary)",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.85rem",
                    lineHeight: "1.6",
                    boxShadow: m.sender === "user" ? "0 4px 12px rgba(10,37,64,0.1)" : "0 4px 12px rgba(10,37,64,0.02)",
                    border: m.sender === "bot" ? "1px solid rgba(10, 37, 64, 0.05)" : "none",
                  }}>
                    {m.text}
                  </div>

                  {/* Render Itinerary Details Card if exists */}
                  {m.itinerary && (
                    <div style={{
                      marginTop: "12px",
                      width: "100%",
                      maxWidth: "90%",
                      background: "#FFFFFF",
                      borderRadius: "16px",
                      border: "1px solid rgba(0, 184, 169, 0.2)",
                      boxShadow: "0 10px 25px rgba(10, 37, 64, 0.04)",
                      overflow: "hidden",
                    }}>
                      <div className="gradient-ocean" style={{
                        padding: "12px 18px",
                        color: "#FFFFFF",
                        fontFamily: "var(--font-playfair)",
                        fontSize: "0.95rem",
                        fontWeight: "700",
                      }}>
                        🗺️ Luxury Itinerary Preview
                      </div>

                      <div style={{
                        padding: "16px",
                        maxHeight: "220px",
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}>
                        {m.itinerary.days.map((day) => (
                          <div key={day.day} style={{
                            display: "flex", gap: "10px",
                            paddingBottom: "10px",
                            borderBottom: "1px solid rgba(10, 37, 64, 0.04)",
                          }}>
                            <div style={{
                              width: "22px", height: "22px", borderRadius: "50%",
                              background: "rgba(0, 184, 169, 0.1)", color: "var(--secondary)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontFamily: "var(--font-montserrat)", fontSize: "0.7rem", fontWeight: "700",
                              flexShrink: 0, marginTop: "2px"
                            }}>{day.day}</div>
                            <div>
                              <div style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", fontWeight: "700", color: "var(--primary)" }}>
                                {day.title}
                              </div>
                              <div style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                                {day.highlight}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Itinerary CTA */}
                      <div style={{
                        background: "var(--bg-elevated)",
                        padding: "12px 16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.72rem", fontFamily: "var(--font-montserrat)", color: "var(--text-secondary)", fontWeight: "600" }}>
                          <CheckCircle size={12} color="var(--success)" />
                          Comparison Complete
                        </span>

                        <button
                          onClick={() => handleSend("Tell me how much I save on this trip vs MakeMyTrip")}
                          style={{
                            background: "var(--accent)", border: "none", borderRadius: "8px",
                            padding: "6px 12px", fontFamily: "var(--font-montserrat)", fontSize: "0.75rem",
                            fontWeight: "700", color: "#FFFFFF", cursor: "pointer", display: "flex",
                            alignItems: "center", gap: "4px", boxShadow: "0 2px 8px rgba(255, 122, 89, 0.2)"
                          }}
                        >
                          <FileText size={11} /> Compare Price
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              ))}

              {/* Typing State */}
              {isTyping && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px",
                    fontFamily: "var(--font-montserrat)", fontSize: "0.68rem", fontWeight: "700", color: "var(--text-muted)"
                  }}>
                    <Bot size={11} color="var(--secondary)" />
                    <span>CONCIERGE</span>
                  </div>
                  <div style={{
                    padding: "14px 18px", borderRadius: "18px 18px 18px 4px",
                    background: "#FFFFFF", border: "1px solid rgba(10, 37, 64, 0.05)",
                    display: "flex", alignItems: "center", gap: "4px"
                  }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--text-muted)", display: "inline-block", animation: "bounce 1.4s infinite ease-in-out" }}></span>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--text-muted)", display: "inline-block", animation: "bounce 1.4s infinite ease-in-out 0.2s" }}></span>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--text-muted)", display: "inline-block", animation: "bounce 1.4s infinite ease-in-out 0.4s" }}></span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Footer */}
            <div style={{
              padding: "14px 20px",
              borderTop: "1px solid rgba(10, 37, 64, 0.06)",
              background: "rgba(255, 255, 255, 0.4)",
              display: "flex",
              gap: "10px",
              alignItems: "center"
            }}>
              <input
                type="text"
                placeholder="Ask Concierge AI (e.g. Design a wild tour...)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSend(inputValue); }}
                style={{
                  flex: 1,
                  background: "#FFFFFF",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "50px",
                  padding: "10px 18px",
                  outline: "none",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.82rem",
                  color: "var(--text-primary)"
                }}
              />
              <button
                onClick={() => handleSend(inputValue)}
                aria-label="Send query"
                style={{
                  width: "38px", height: "38px", borderRadius: "50%",
                  background: "var(--accent)", border: "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#FFFFFF", cursor: "pointer",
                  boxShadow: "0 4px 10px rgba(255, 122, 89, 0.2)",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                <Send size={15} />
              </button>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
      `}</style>
    </section>
  );
}
