"use client";

interface LogoProps {
  scrolled?: boolean;
  light?: boolean;
}

export default function Logo({ scrolled = false, light = false }: LogoProps) {
  // If scrolled or in light mode, text color should be teal/green.
  // Unscrolled on transparent header: text color should be white.
  const textColor = scrolled || light ? "#0f766e" : "#FAFAF7";
  const sloganColor = scrolled || light ? "#701a75" : "rgba(250, 250, 247, 0.8)";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Brand Text: WanderSouls */}
        <span style={{
          fontFamily: "var(--font-satisfy), cursive",
          fontSize: "1.85rem",
          fontWeight: "400",
          color: textColor,
          lineHeight: "1.1",
          transition: "color 0.3s ease",
          letterSpacing: "-0.01em",
        }}>
          WanderSouls
        </span>
        
        {/* Brand Icon: Teardrop Location Pin & Plane */}
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <defs>
            <linearGradient id="pinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#701a75" />
            </linearGradient>
          </defs>
          {/* Teardrop Outer Pin */}
          <path
            d="M16 4C21.5 4 25 8 25 13C25 21 16 27 16 27C16 27 7 21 7 13C7 8 10.5 4 16 4Z"
            fill="url(#pinGradient)"
          />
          {/* Inside Loop */}
          <path
            d="M16 7C19.3 7 22 9.7 22 13C22 18 16 24 16 24C16 24 10 18 10 13C10 9.7 12.7 7 16 7Z"
            fill="#FFFFFF"
          />
          {/* Middle Wave */}
          <path
            d="M12.5 13.5C13.8 12.2 14.8 12.2 16 13.5C17.2 14.8 18.2 14.8 19.5 13.5"
            stroke="#701a75"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Airplane flying off the right side of the pin */}
          <g transform="translate(17, 7) scale(0.5) rotate(15)">
            <path
              d="M14 12.5L22 10L25 4.5L23 4.5L21 9L15.5 9.5L13.5 6.5L12 6.5L13.5 10L9.5 11L8 9L7 9L8.2 12L7 15L8 15L9.5 13L13.5 14L12 17.5L13.5 17.5L15.5 14.5L21 15L23 19.5L25 19.5L22 14L14 12.5Z"
              fill="#ec4899"
            />
          </g>
        </svg>
      </div>
      
      {/* Centered Slogan */}
      <span style={{
        fontFamily: "var(--font-satisfy), cursive",
        fontSize: "0.68rem",
        color: sloganColor,
        letterSpacing: "0.01em",
        marginTop: "-6px",
        transition: "color 0.3s ease",
        opacity: 0.9,
      }}>
        Memories don&apos;t have to cost a fortune
      </span>
    </div>
  );
}
