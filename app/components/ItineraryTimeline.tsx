"use client";

import { useState } from "react";
import type { ItineraryDay } from "../../lib/destinations";
import { MapPin, Utensils, BedDouble, Clock, ChevronDown, ChevronUp } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface Props {
  itinerary: ItineraryDay[];
}

// Helper to dynamically render a Lucide icon by string name (e.g. "plane", "shopping-bag")
const DynamicIcon = ({ name, size = 16, color = "currentColor" }: { name: string; size?: number; color?: string }) => {
  const iconName = name.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.MapPin;
  return <IconComponent size={size} color={color} />;
};

function getTimeColor(time: string): string {
  const hour = parseInt(time.split(":")[0], 10);
  const isPM = time.includes("PM");
  const h24 = isPM && hour !== 12 ? hour + 12 : (!isPM && hour === 12 ? 0 : hour);
  if (h24 < 10) return "var(--secondary)"; // Morning (Teal)
  if (h24 < 13) return "var(--accent)"; // Mid-morning (Sunset Orange)
  if (h24 < 17) return "var(--accent)"; // Afternoon (Sunset Orange)
  if (h24 < 20) return "var(--primary)"; // Evening (Deep Ocean)
  return "var(--primary)";               // Night (Deep Ocean)
}

export default function ItineraryTimeline({ itinerary }: Props) {
  const [expanded, setExpanded] = useState<number[]>([0]);

  const toggle = (i: number) => {
    setExpanded((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {itinerary.map((day, dayIdx) => {
        const isOpen = expanded.includes(dayIdx);
        return (
          <div
            key={dayIdx}
            style={{
              background: isOpen ? "var(--bg-elevated)" : "var(--bg-card)",
              border: `1px solid ${isOpen ? "rgba(0, 184, 169, 0.25)" : "var(--border-subtle)"}`,
              borderRadius: "20px",
              overflow: "hidden",
              transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow: isOpen ? "0 10px 30px rgba(10, 37, 64, 0.04)" : "none",
            }}
          >
            {/* Day Header — clickable */}
            <button
              onClick={() => toggle(dayIdx)}
              style={{
                width: "100%", background: "none", border: "none",
                cursor: "pointer", padding: "16px 18px",
                display: "flex", alignItems: "center", gap: "12px",
                textAlign: "left",
              }}
            >
              {/* Day Number */}
              <div style={{
                width: "52px", height: "52px", borderRadius: "14px", flexShrink: 0,
                background: isOpen
                  ? "var(--secondary)"
                  : "rgba(0, 184, 169, 0.05)",
                border: isOpen ? "none" : "1px solid rgba(0, 184, 169, 0.2)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                transition: "all 0.3s ease",
                boxShadow: isOpen ? "0 4px 12px rgba(0, 184, 169, 0.15)" : "none",
              }}>
                <span style={{
                  fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.55rem", fontWeight: "700",
                  color: isOpen ? "rgba(255,255,255,0.85)" : "var(--secondary)",
                  textTransform: "uppercase", letterSpacing: "0.05em", lineHeight: "1",
                }}>DAY</span>
                <span style={{
                  fontFamily: "var(--font-playfair), serif", fontWeight: "900",
                  fontSize: "1.3rem", color: isOpen ? "white" : "var(--secondary)", lineHeight: "1",
                }}>{dayIdx + 1}</span>
              </div>

              {/* Title block */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                  <span className="timeline-day-title" style={{
                    fontFamily: "var(--font-playfair), serif", fontWeight: "800",
                    fontSize: "1rem", color: "var(--primary)", lineHeight: "1.3",
                    wordBreak: "break-word",
                  }}>Day {dayIdx + 1}: {day.title}</span>
                  {day.location && (
                    <span style={{
                      display: "flex", alignItems: "center", gap: "4px",
                      background: "rgba(0, 184, 169, 0.08)", border: "1px solid rgba(0, 184, 169, 0.15)",
                      borderRadius: "50px", padding: "2px 10px",
                      fontFamily: "var(--font-montserrat)", fontSize: "0.68rem", fontWeight: "700", color: "var(--secondary)",
                    }}>
                      <MapPin size={10} />
                      {day.location}
                    </span>
                  )}
                </div>

                {/* Activity pill row */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {day.activities.slice(0, 3).map((act, index) => (
                    <span key={act.time} style={{
                      fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.72rem",
                      color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "4px",
                      fontWeight: "500"
                    }}>
                      <DynamicIcon name={act.icon} size={11} color="var(--text-muted)" />
                      <span>{act.activity}</span>
                      {index < Math.min(day.activities.length, 3) - 1 && (
                        <span style={{ color: "var(--border-strong)", marginLeft: "2px" }}>·</span>
                      )}
                    </span>
                  ))}
                  {day.activities.length > 3 && (
                    <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: "500" }}>
                      +{day.activities.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Stay + meals + chevron */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }} className="timeline-stay-block">
                <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: "4px" }}>
                  {day.accommodation && (
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", justifyContent: "flex-end" }}>
                      <BedDouble size={11} color="var(--text-muted)" />
                      <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.7rem", color: "var(--text-secondary)", fontWeight: "600" }}>
                        {day.accommodation.split(",")[0]}
                      </span>
                    </div>
                  )}
                  {day.meals && (
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", justifyContent: "flex-end" }}>
                      <Utensils size={11} color="var(--text-muted)" />
                      <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.7rem", color: "var(--text-secondary)", fontWeight: "600" }}>
                        {day.meals.join(" · ")}
                      </span>
                    </div>
                  )}
                </div>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "rgba(10, 37, 64, 0.04)",
                  border: "1px solid var(--border-subtle)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--text-muted)", transition: "all 0.2s ease",
                }}>
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>
            </button>

            {/* Expanded Content */}
            {isOpen && (
              <div style={{ padding: "0 16px 20px" }}>
                {/* Timeline line */}
                <div style={{ position: "relative", paddingLeft: "28px" }}>
                  <div style={{
                    position: "absolute", left: "7px", top: 0, bottom: "16px",
                    width: "2px",
                    background: "rgba(0, 184, 169, 0.2)",
                    borderRadius: "2px",
                  }} />

                  <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                    {day.activities.map((act, i) => {
                      const timeColor = getTimeColor(act.time);
                      return (
                        <div
                          key={i}
                          style={{
                            display: "flex", gap: "16px", alignItems: "flex-start",
                            padding: "12px 0",
                            borderBottom: i < day.activities.length - 1 ? "1px solid var(--border-subtle)" : "none",
                          }}
                        >
                          {/* Timeline dot */}
                          <div style={{
                            position: "absolute", left: "0px",
                            width: "14px", height: "14px", borderRadius: "50%",
                            background: timeColor, opacity: 0.9,
                            marginTop: "4px",
                            boxShadow: `0 0 8px ${timeColor}40`,
                            flexShrink: 0,
                          }} />

                          {/* SVG Icon */}
                          <div style={{ 
                            flexShrink: 0, width: "24px", height: "24px", 
                            display: "flex", alignItems: "center", justifyContent: "center",
                            background: "var(--bg-elevated)", borderRadius: "6px",
                            border: "1px solid var(--border-subtle)",
                          }}>
                            <DynamicIcon name={act.icon} size={13} color="var(--text-secondary)" />
                          </div>

                          {/* Content */}
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2px", flexWrap: "wrap" }}>
                              <span style={{
                                fontFamily: "var(--font-montserrat)", fontWeight: "700",
                                fontSize: "0.88rem", color: "var(--primary)",
                              }}>{act.activity}</span>
                              <span style={{
                                background: `${timeColor}10`,
                                border: `1px solid ${timeColor}20`,
                                borderRadius: "50px", padding: "2px 8px",
                                fontFamily: "var(--font-montserrat)", fontSize: "0.68rem",
                                fontWeight: "700", color: timeColor,
                                display: "flex", alignItems: "center", gap: "3px",
                              }}>
                                <Clock size={9} />
                                {act.time}
                              </span>
                            </div>
                            <p style={{
                              fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem",
                              color: "var(--text-secondary)", lineHeight: "1.6", fontWeight: "500", margin: 0
                            }}>{act.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Day Footer */}
                <div style={{
                  display: "flex", gap: "16px", flexWrap: "wrap",
                  marginTop: "16px", paddingTop: "16px",
                  borderTop: "1px solid var(--border-subtle)",
                }}>
                  {day.accommodation && (
                    <div style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      background: "rgba(0, 184, 169, 0.08)", border: "1px solid rgba(0, 184, 169, 0.15)",
                      borderRadius: "10px", padding: "8px 14px",
                    }}>
                      <BedDouble size={14} color="var(--secondary)" />
                      <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.78rem", fontWeight: "600", color: "var(--primary)" }}>
                        {day.accommodation}
                      </span>
                    </div>
                  )}
                  {day.meals && (
                    <div style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      background: "rgba(255, 122, 89, 0.08)", border: "1px solid rgba(255, 122, 89, 0.15)",
                      borderRadius: "10px", padding: "8px 14px",
                    }}>
                      <Utensils size={14} color="var(--accent)" />
                      <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.78rem", fontWeight: "600", color: "var(--primary)" }}>
                        Meals: {day.meals.join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Expand / collapse all */}
      <button
        onClick={() => {
          if (expanded.length === itinerary.length) setExpanded([]);
          else setExpanded(itinerary.map((_, i) => i));
        }}
        style={{
          background: "rgba(10, 37, 64, 0.04)", border: "1px solid var(--border-strong)",
          borderRadius: "12px", padding: "12px 20px", cursor: "pointer",
          fontFamily: "var(--font-montserrat)", fontSize: "0.82rem", fontWeight: "700",
          color: "var(--text-secondary)", transition: "all 0.2s ease",
          width: "100%", maxWidth: "300px",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--secondary)"; e.currentTarget.style.color = "var(--secondary)"; e.currentTarget.style.background = "rgba(0, 184, 169, 0.03)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.background = "rgba(10, 37, 64, 0.04)"; }}
      >
        {expanded.length === itinerary.length ? "↑ Collapse all days" : "↓ Expand all days"}
      </button>
      <style>{`
        @media (max-width: 480px) {
          .timeline-stay-block { display: none !important; }
          .timeline-day-title { font-size: 0.92rem !important; }
        }
      `}</style>
    </div>
  );
}
