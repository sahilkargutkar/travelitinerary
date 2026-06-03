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
  // Convert kebab-case or string name to PascalCase
  const iconName = name.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.MapPin;
  return <IconComponent size={size} color={color} />;
};

function getTimeColor(time: string): string {
  const hour = parseInt(time.split(":")[0], 10);
  const isPM = time.includes("PM");
  const h24 = isPM && hour !== 12 ? hour + 12 : (!isPM && hour === 12 ? 0 : hour);
  if (h24 < 10) return "#4DD2C5"; // Morning (Light Teal)
  if (h24 < 13) return "var(--accent-gold)"; // Mid-morning (Primary Teal)
  if (h24 < 17) return "#FF6F59"; // Afternoon (Coral CTA)
  if (h24 < 20) return "var(--accent-navy)"; // Evening (Deep Ocean)
  return "#015B66";               // Night (Darker Ocean)
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
              border: `1px solid ${isOpen ? "rgba(197,160,89,0.25)" : "rgba(26,43,60,0.07)"}`,
              borderRadius: "20px",
              overflow: "hidden",
              transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
              boxShadow: isOpen ? "0 8px 40px rgba(26,43,60,0.08)" : "none",
            }}
          >
            {/* Day Header — clickable */}
            <button
              onClick={() => toggle(dayIdx)}
              style={{
                width: "100%", background: "none", border: "none",
                cursor: "pointer", padding: "20px 24px",
                display: "flex", alignItems: "center", gap: "16px",
                textAlign: "left",
              }}
            >
              {/* Day Number */}
              <div style={{
                width: "52px", height: "52px", borderRadius: "14px", flexShrink: 0,
                background: isOpen
                  ? "var(--accent-navy)"
                  : "rgba(197,160,89,0.05)",
                border: isOpen ? "none" : "1px solid rgba(197,160,89,0.2)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                transition: "all 0.3s ease",
                boxShadow: isOpen ? "0 4px 16px rgba(26,43,60,0.2)" : "none",
              }}>
                <span style={{
                  fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.55rem", fontWeight: "700",
                  color: isOpen ? "rgba(255,255,255,0.7)" : "rgba(197,160,89,0.7)",
                  textTransform: "uppercase", letterSpacing: "0.05em", lineHeight: "1",
                }}>DAY</span>
                <span style={{
                  fontFamily: "var(--font-playfair), serif", fontWeight: "900",
                  fontSize: "1.3rem", color: isOpen ? "white" : "var(--accent-gold)", lineHeight: "1",
                }}>{dayIdx + 1}</span>
              </div>

              {/* Title block */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                  <span style={{
                    fontFamily: "var(--font-playfair), serif", fontWeight: "800",
                    fontSize: "1.1rem", color: "var(--text-primary)",
                  }}>Day {dayIdx + 1}: {day.title}</span>
                  {day.location && (
                    <span style={{
                      display: "flex", alignItems: "center", gap: "4px",
                      background: "rgba(197,160,89,0.1)", border: "1px solid rgba(197,160,89,0.2)",
                      borderRadius: "50px", padding: "2px 10px",
                      fontFamily: "var(--font-playfair), serif", fontSize: "0.68rem", fontWeight: "700", color: "var(--accent-gold)",
                    }}>
                      <MapPin size={10} />
                      {day.location}
                    </span>
                  )}
                </div>

                {/* Activity pill row */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {day.activities.slice(0, 3).map((act) => (
                    <span key={act.time} style={{
                      fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.7rem",
                      color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px",
                    }}>
                      <DynamicIcon name={act.icon} size={11} color="var(--text-muted)" />
                      <span>{act.activity}</span>
                      {day.activities.indexOf(act) < 2 && (
                        <span style={{ color: "rgba(26,43,60,0.15)", marginLeft: "2px" }}>·</span>
                      )}
                    </span>
                  ))}
                  {day.activities.length > 3 && (
                    <span style={{ fontFamily: "'Inter'", fontSize: "0.7rem", color: "var(--text-muted)" }}>
                      +{day.activities.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Stay + meals + chevron */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
                <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: "4px" }}>
                  {day.accommodation && (
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", justifyContent: "flex-end" }}>
                      <BedDouble size={11} color="var(--text-muted)" />
                      <span style={{ fontFamily: "'Inter'", fontSize: "0.7rem", color: "var(--text-muted)" }}>
                        {day.accommodation.split(",")[0]}
                      </span>
                    </div>
                  )}
                  {day.meals && (
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", justifyContent: "flex-end" }}>
                      <Utensils size={11} color="var(--text-muted)" />
                      <span style={{ fontFamily: "'Inter'", fontSize: "0.7rem", color: "var(--text-muted)" }}>
                        {day.meals}
                      </span>
                    </div>
                  )}
                </div>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "rgba(26,43,60,0.05)",
                  border: "1px solid rgba(26,43,60,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--text-muted)", transition: "all 0.2s ease",
                }}>
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>
            </button>

            {/* Expanded Content */}
            {isOpen && (
              <div style={{ padding: "0 24px 24px" }}>
                {/* Timeline line */}
                <div style={{ position: "relative", paddingLeft: "28px" }}>
                  <div style={{
                    position: "absolute", left: "7px", top: 0, bottom: "16px",
                    width: "2px",
                    background: "rgba(197,160,89,0.2)",
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
                            padding: "10px 0",
                            borderBottom: i < day.activities.length - 1 ? "1px solid rgba(26,43,60,0.04)" : "none",
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
                            border: "1px solid rgba(26,43,60,0.05)",
                          }}>
                            <DynamicIcon name={act.icon} size={13} color="var(--text-secondary)" />
                          </div>

                          {/* Content */}
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2px" }}>
                              <span style={{
                                fontFamily: "var(--font-playfair), serif", fontWeight: "700",
                                fontSize: "0.9rem", color: "var(--text-primary)",
                              }}>{act.activity}</span>
                              <span style={{
                                background: `${timeColor}10`,
                                border: `1px solid ${timeColor}20`,
                                borderRadius: "50px", padding: "1px 8px",
                                fontFamily: "var(--font-playfair), serif", fontSize: "0.63rem",
                                fontWeight: "700", color: timeColor,
                                display: "flex", alignItems: "center", gap: "3px",
                              }}>
                                <Clock size={9} />
                                {act.time}
                              </span>
                            </div>
                            <p style={{
                              fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem",
                              color: "var(--text-secondary)", lineHeight: "1.6",
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
                  borderTop: "1px solid rgba(26,43,60,0.06)",
                }}>
                  {day.accommodation && (
                    <div style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      background: "rgba(197,160,89,0.1)", border: "1px solid rgba(197,160,89,0.2)",
                      borderRadius: "10px", padding: "8px 14px",
                    }}>
                      <BedDouble size={14} color="var(--accent-gold)" />
                      <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: "0.78rem", fontWeight: "600", color: "var(--text-primary)" }}>
                        {day.accommodation}
                      </span>
                    </div>
                  )}
                  {day.meals && (
                    <div style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      background: "rgba(197,160,89,0.08)", border: "1px solid rgba(197,160,89,0.15)",
                      borderRadius: "10px", padding: "8px 14px",
                    }}>
                      <Utensils size={14} color="#FF6F59" />
                      <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: "0.78rem", fontWeight: "600", color: "var(--text-primary)" }}>
                        {day.meals}
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
          background: "rgba(26,43,60,0.04)", border: "1px solid rgba(26,43,60,0.09)",
          borderRadius: "12px", padding: "12px 20px", cursor: "pointer",
          fontFamily: "var(--font-playfair), serif", fontSize: "0.82rem", fontWeight: "600",
          color: "var(--text-secondary)", transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(197,160,89,0.3)"; e.currentTarget.style.color = "var(--accent-gold)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(26,43,60,0.09)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
      >
        {expanded.length === itinerary.length ? "↑ Collapse all days" : "↓ Expand all days"}
      </button>
    </div>
  );
}
