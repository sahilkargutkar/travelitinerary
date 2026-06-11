"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

interface DateRangePickerProps {
  value: string;
  onChange: (val: string) => void;
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync initial value back to states if needed (simplified: just use internal state and format on change)
  useEffect(() => {
    if (startDate) {
      if (endDate) {
        onChange(`${formatDate(startDate)} - ${formatDate(endDate)}`);
      } else {
        onChange(`${formatDate(startDate)}`);
      }
    } else {
      onChange("");
    }
  }, [startDate, endDate]);

  const formatDate = (d: Date) => {
    return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}`;
  };

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (clickedDate < startDate) {
        setStartDate(clickedDate);
      } else {
        setEndDate(clickedDate);
        setTimeout(() => setIsOpen(false), 300);
      }
    }
  };

  const isSelected = (day: number) => {
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (startDate && d.getTime() === startDate.getTime()) return true;
    if (endDate && d.getTime() === endDate.getTime()) return true;
    return false;
  };

  const isInRange = (day: number) => {
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (startDate && endDate && d > startDate && d < endDate) return true;
    if (startDate && !endDate && hoverDate && d > startDate && d <= hoverDate) return true;
    return false;
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const isSel = isSelected(d);
      const isRange = isInRange(d);
      const dateObj = new Date(year, month, d);
      
      days.push(
        <div
          key={d}
          className={`calendar-day ${isSel ? "selected" : ""} ${isRange ? "in-range" : ""}`}
          onClick={() => handleDateClick(d)}
          onMouseEnter={() => setHoverDate(dateObj)}
        >
          {d}
        </div>
      );
    }
    return days;
  };

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
      {/* Selector Trigger */}
      <div 
        style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div style={{ color: "var(--secondary)" }}><CalendarIcon size={20} /></div>
        <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
          <span style={{ display: "block", fontFamily: "var(--font-montserrat)", fontSize: "0.68rem", fontWeight: "700", textTransform: "uppercase", color: "rgba(250, 250, 247, 0.65)", letterSpacing: "0.08em" }}>
            When?
          </span>
          <span style={{ display: "block", fontFamily: "var(--font-playfair)", fontSize: "0.95rem", fontWeight: "700", color: "#FAFAF7", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: "2px", minHeight: "22px" }}>
            {value || "Select Dates"}
          </span>
        </div>
      </div>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, marginTop: "10px",
          background: "#FFFFFF", borderRadius: "16px", padding: "20px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)", border: "1px solid rgba(10,37,64,0.08)",
          width: "320px", zIndex: 100, color: "var(--primary)",
          animation: "fadeIn 0.2s ease-out"
        }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <button onClick={handlePrevMonth} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)", padding: "4px" }}>
              <ChevronLeft size={20} />
            </button>
            <div style={{ fontFamily: "var(--font-montserrat)", fontWeight: "700", fontSize: "0.95rem" }}>
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </div>
            <button onClick={handleNextMonth} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)", padding: "4px" }}>
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Weekdays */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", marginBottom: "8px", textAlign: "center" }}>
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
              <div key={day} style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.7rem", fontWeight: "700", color: "var(--text-muted)" }}>
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", rowGap: "8px" }} onMouseLeave={() => setHoverDate(null)}>
            {renderDays()}
          </div>

          <style>{`
            .calendar-day {
              aspect-ratio: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: var(--font-montserrat);
              font-size: 0.85rem;
              font-weight: 500;
              border-radius: 50%;
              cursor: pointer;
              transition: all 0.2s ease;
              color: var(--primary);
            }
            .calendar-day:not(.empty):not(.selected):not(.in-range):hover {
              background: rgba(0,184,169,0.1);
              color: var(--accent);
            }
            .calendar-day.selected {
              background: var(--accent);
              color: #FFFFFF;
              font-weight: 700;
            }
            .calendar-day.in-range {
              background: rgba(0,184,169,0.15);
              border-radius: 0;
            }
            /* Connect range visuals */
            .calendar-day.selected:first-of-type {
              border-top-right-radius: 0;
              border-bottom-right-radius: 0;
            }
            .calendar-day.selected:last-of-type {
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
