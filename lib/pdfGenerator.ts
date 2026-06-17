/**
 * generateItineraryPDF — Premium Edition v3
 *
 * LAYOUT (every page):
 *  ┌─────────────────────────────────────────────────────────────┐
 *  │  [WanderSouls Logo]               [Destination • Country]   │  ← header bar
 *  │──────────────────────────────────────────────────────────── │  ← teal accent line
 *  │                                                             │
 *  │                   CONTENT AREA                              │
 *  │                                                             │
 *  │──────────────────────────────────────────────────────────── │  ← footer line
 *  │  © WanderSouls Travel Pvt. Ltd.    Page X / Y    [Dest]    │
 *  └─────────────────────────────────────────────────────────────┘
 *
 *  END OF DOCUMENT — full-width contact & legal card:
 *  ┌──────────────────────────────────────────────────────────────┐
 *  │   CONTACT & BOOKING INFORMATION                              │
 *  │   Email | WhatsApp (Only) | Website                         │
 *  │   ─────────────────────────────────────────────────         │
 *  │   CIN: U7G110MH2025PTC461276                                │
 *  │   Registered Office: ...                                    │
 *  └──────────────────────────────────────────────────────────────┘
 */

import type { Destination } from "./destinations";

// ─────────────────────────────────────────────────────────────────
// Brand colours — aligned with site's #147971 teal theme
// ─────────────────────────────────────────────────────────────────
const C = {
  primary:    [13, 37, 56]    as [number, number, number], // deep navy
  teal:       [20, 121, 113]  as [number, number, number], // #147971
  coral:      [218, 84, 52]   as [number, number, number], // warm accent
  white:      [255, 255, 255] as [number, number, number],
  bg:         [246, 249, 251] as [number, number, number],
  bgElevated: [235, 242, 247] as [number, number, number],
  text:       [22, 22, 22]    as [number, number, number],
  textMid:    [64, 74, 84]    as [number, number, number],
  textMuted:  [118, 128, 140] as [number, number, number],
  successBg:  [224, 250, 244] as [number, number, number],
  errorBg:    [254, 236, 232] as [number, number, number],
};

// ─────────────────────────────────────────────────────────────────
// Layout constants
// ─────────────────────────────────────────────────────────────────
const SP = {
  marginX:  14,
  headerH:  32,   // increased by 10mm to fit logo better
  footerH:  11,
  lineH:    4.8,
  bulletH:  4.4,
};

// ─────────────────────────────────────────────────────────────────
// Company constants
// ─────────────────────────────────────────────────────────────────
const CO = {
  name:   "WanderSouls Travel Pvt. Ltd.",
  cin:    "CIN: U7G110MH2025PTC461276",
  office: "Registered Office: 1204 Aim Platinum CTS 27, 1to5, 287 1to6, Road No.1, Jogeshwari East, Mumbai, Maharashtra - 400060, India",
  email:  "info@wandersouls.in",
  wa:     "+91 84520 87326 (WhatsApp Only)",
  web:    "www.wandersouls.in",
};

// ─────────────────────────────────────────────────────────────────
// Default inclusions / exclusions (fallback if destination missing)
// ─────────────────────────────────────────────────────────────────
const INCL_DEFAULT = [
  "Accommodation on twin/double sharing basis",
  "Daily breakfast as per itinerary",
  "All transfers & sightseeing by SIC (Seat-in-Coach) basis",
  "English-speaking tour guide",
  "All applicable taxes (GST included)",
];

const EXCL_DEFAULT = [
  "International / domestic airfare unless specified",
  "Visa fees & travel insurance",
  "Lunch, dinner & personal expenses",
  "Camera / entry fees at monuments unless stated",
  "Any services not mentioned under inclusions",
];

// ─────────────────────────────────────────────────────────────────
// T&C sections
// ─────────────────────────────────────────────────────────────────
const TNC = [
  {
    title: "IMPORTANT INSTRUCTIONS & NOTES",
    items: [
      "All tours & transfers are subject to availability at the time of booking",
      "Hotel check-in: 14:00 hrs | Check-out: 11:00-12:00 hrs",
      "Early check-in / late check-out is subject to hotel availability",
      "Passport must be valid for minimum 6 months from travel date",
      "Itinerary sequence may change due to weather, traffic, or operational reasons",
      "No refund for unused services or sightseeing",
    ],
  },
  {
    title: "HOTEL & ITINERARY DISCLAIMER",
    items: [
      "Hotels mentioned are 3.5-Star or similar category",
      "Hotels are subject to availability at the time of confirmation",
      "In case of non-availability, similar or equivalent hotels will be provided",
    ],
  },
  {
    title: "GENERAL INFORMATION",
    items: [
      "Carry original passport & valid visa during travel",
      "Follow local laws & tour manager instructions at all times",
      "Travel insurance is strongly recommended for all travellers",
    ],
  },
];

// ═════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═════════════════════════════════════════════════════════════════
export async function generateItineraryPDF(
  destination: Destination,
  logoBase64?: string
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const mX    = SP.marginX;
  const cW    = pageW - mX * 2;
  const cTop  = SP.headerH + 7;             // content top y
  const cBot  = pageH - SP.footerH - 4;     // content bottom y

  const cursor = { y: cTop };

  // ── safeLines ──────────────────────────────────────────────────
  // jsPDF v4 validates EVERY element of a text array at runtime,
  // so we must guarantee each element is a genuine string.
  function safeLines(text: string, maxWidth: number): string[] {
    const raw = doc.splitTextToSize(String(text), maxWidth);
    if (Array.isArray(raw)) return raw.map((l: unknown) => String(l ?? ""));
    return [String(raw ?? text)];
  }

  // ── ensureSpace ────────────────────────────────────────────────
  function ensureSpace(needed: number): void {
    if (cursor.y + needed <= cBot) return;
    doc.addPage();
    drawPageHeader();
    cursor.y = cTop;
  }

  // ── writeParagraph ─────────────────────────────────────────────
  function writeParagraph(
    text: string,
    fontSize = 9,
    lineHeight = SP.lineH,
    color: [number, number, number] = C.text
  ): void {
    doc.setTextColor(...color);
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "normal");
    const lines = safeLines(text, cW);
    ensureSpace(lines.length * lineHeight + 2);
    doc.text(lines, mX, cursor.y);
    cursor.y += lines.length * lineHeight + 2.5;
  }

  // ── writeBullet ────────────────────────────────────────────────
  function writeBullet(text: string, indent = 0, positive?: boolean): void {
    const color: [number, number, number] =
      positive === true ? C.teal : positive === false ? C.coral : C.textMid;
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    const lines = safeLines(text, cW - 8 - indent);
    ensureSpace(lines.length * SP.bulletH + 1);
    // Bullet symbol — use ASCII-safe characters
    doc.setTextColor(...(positive === false ? C.coral : C.teal));
    doc.text(positive === false ? "-" : "+", mX + indent, cursor.y);
    doc.setTextColor(...color);
    doc.text(lines, mX + 5 + indent, cursor.y);
    cursor.y += lines.length * SP.bulletH + 1;
  }

  // ── drawSectionTitle ───────────────────────────────────────────
  function drawSectionTitle(title: string, fontSize = 10): void {
    ensureSpace(16);
    // Left accent bar
    doc.setFillColor(...C.teal);
    doc.rect(mX, cursor.y - 1, 3, 10, "F");
    // Background pill
    doc.setFillColor(...C.bgElevated);
    doc.roundedRect(mX + 3, cursor.y - 1, cW - 3, 10, 1, 1, "F");
    // Title text
    doc.setTextColor(...C.primary);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(fontSize);
    doc.text(title, mX + 8, cursor.y + 6.2);
    cursor.y += 14;
  }

  // ── drawDayHeader ──────────────────────────────────────────────
  function drawDayHeader(heading: string, dayNum: number): void {
    ensureSpace(16);
    const barH = 11;
    doc.setFillColor(...C.primary);
    doc.roundedRect(mX, cursor.y, cW, barH, 1.5, 1.5, "F");
    // Day pill
    doc.setFillColor(...C.teal);
    doc.roundedRect(mX + 3, cursor.y + 2, 20, 7, 1, 1, "F");
    doc.setTextColor(...C.white);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.text("DAY", mX + 13, cursor.y + 5.2, { align: "center" });
    doc.setFontSize(8);
    doc.text(String(dayNum), mX + 13, cursor.y + 8.2, { align: "center" });
    // Heading text
    doc.setFontSize(9.5);
    const headingLines = safeLines(heading, cW - 32);
    doc.text(headingLines, mX + 27, cursor.y + 7);
    cursor.y += barH + 4;
  }

  // ── drawMetaCard ───────────────────────────────────────────────
  function drawMetaCard(items: { label: string; value: string }[]): void {
    const cardH = 26;
    ensureSpace(cardH + 6);
    // Card background
    doc.setFillColor(...C.bgElevated);
    doc.roundedRect(mX, cursor.y, cW, cardH, 2.5, 2.5, "F");
    // Left teal accent bar
    doc.setFillColor(...C.teal);
    doc.rect(mX, cursor.y, 3.5, cardH, "F");
    doc.roundedRect(mX, cursor.y, 3.5, cardH, 2, 2, "F");

    const colW = cW / items.length;
    items.forEach((item, i) => {
      const cx = mX + 8 + i * colW;
      // Label
      doc.setTextColor(...C.coral);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6);
      doc.text(item.label.toUpperCase(), cx, cursor.y + 8);
      // Value
      doc.setTextColor(...C.primary);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      const vLines = safeLines(String(item.value), colW - 10);
      doc.text(vLines, cx, cursor.y + 14);
      // Column separator (not last)
      if (i < items.length - 1) {
        doc.setDrawColor(...C.textMuted);
        doc.setLineWidth(0.15);
        doc.line(
          mX + (i + 1) * colW, cursor.y + 6,
          mX + (i + 1) * colW, cursor.y + cardH - 6
        );
      }
    });
    cursor.y += cardH + 7;
  }

  // ── drawHighlightStrip ─────────────────────────────────────────
  function drawHighlightStrip(highlights: string[]): void {
    const rows    = Math.ceil(highlights.length / 2);
    const stripH  = 12 + rows * 6;
    ensureSpace(stripH + 4);
    doc.setFillColor(...C.bg);
    doc.roundedRect(mX, cursor.y, cW, stripH, 2, 2, "F");
    doc.setDrawColor(...C.teal);
    doc.setLineWidth(0.25);
    doc.roundedRect(mX, cursor.y, cW, stripH, 2, 2, "S");
    // Section label
    doc.setTextColor(...C.teal);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text("* TRIP HIGHLIGHTS", mX + 6, cursor.y + 7.5);
    cursor.y += 11;
    const mid = Math.ceil(highlights.length / 2);
    highlights.forEach((h, i) => {
      const col = i < mid ? 0 : 1;
      const row = i < mid ? i : i - mid;
      const hx  = mX + 6 + col * (cW / 2 - 4);
      const hy  = cursor.y + row * 6;
      doc.setTextColor(...C.teal);
      doc.text(".", hx, hy);
      doc.setTextColor(...C.text);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.text(String(h), hx + 4, hy);
    });
    cursor.y += mid * 6 + 4;
  }

  // ── drawMealsBadge ─────────────────────────────────────────────
  function drawMealsBadge(mealsText: string): void {
    ensureSpace(9);
    const label   = "Meals: ";
    const badgeW  = Math.max(48, doc.getTextWidth(label + mealsText) + 14);
    doc.setFillColor(228, 250, 246);
    doc.roundedRect(mX, cursor.y - 1.5, badgeW, 7.5, 2, 2, "F");
    doc.setDrawColor(...C.teal);
    doc.setLineWidth(0.2);
    doc.roundedRect(mX, cursor.y - 1.5, badgeW, 7.5, 2, 2, "S");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...C.teal);
    doc.text(label, mX + 5, cursor.y + 4);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...C.text);
    doc.text(mealsText, mX + 5 + doc.getTextWidth(label), cursor.y + 4);
    cursor.y += 10;
  }

  // ── drawTable ──────────────────────────────────────────────────
  function drawTable(
    headers: string[],
    rows: any[][],
    colWidths?: number[]
  ): void {
    const colW  = colWidths ?? headers.map(() => cW / headers.length);
    const rowH  = 8;

    // Header row
    ensureSpace(rowH + 6);
    let cx = mX;
    doc.setFillColor(...C.primary);
    doc.roundedRect(mX, cursor.y, cW, rowH, 1, 1, "F");
    headers.forEach((h, i) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(...C.white);
      doc.text(String(h), cx + 4, cursor.y + 5.4);
      cx += colW[i];
    });
    cursor.y += rowH;

    // Data rows
    rows.forEach((row, ri) => {
      const splitCells = row.map((cell, i) => {
        const v =
          cell !== undefined && cell !== null
            ? typeof cell === "number"
              ? cell.toLocaleString("en-IN")
              : String(cell)
            : "-";
        return safeLines(v, colW[i] - 7);
      });
      const maxLines  = Math.max(1, ...splitCells.map((l) => l.length));
      const rowHeight = Math.max(rowH, maxLines * 4.5 + 3.5);

      ensureSpace(rowHeight);
      doc.setFillColor(...(ri % 2 === 0 ? C.bgElevated : C.white));
      doc.rect(mX, cursor.y, cW, rowHeight, "F");
      doc.setDrawColor(...C.textMuted);
      doc.setLineWidth(0.1);
      doc.line(mX, cursor.y + rowHeight, mX + cW, cursor.y + rowHeight);

      cx = mX;
      splitCells.forEach((lines, i) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(...C.text);
        const textY = cursor.y + (rowHeight - lines.length * 4.5) / 2 + 3.8;
        doc.text(lines, cx + 4, textY);
        cx += colW[i];
      });
      cursor.y += rowHeight;
    });
    cursor.y += 6;
  }

  // ═══════════════════════════════════════════════════════════════
  // PAGE HEADER  —  [Logo flush-left]  [Destination | navy right]
  // ═══════════════════════════════════════════════════════════════
  function drawBrandBar(): void {
    const logoZoneW = 60;   // logo occupies left portion (mm)

    // ── Full-width navy bar as base ──────────────────────────────
    doc.setFillColor(...C.primary);
    doc.rect(0, 0, pageW, SP.headerH, "F");

    // ── Logo image — flush, NO white panel, NO padding ───────────
    if (logoBase64) {
      // Render the logo flush from x=0, y=0 at exactly the header
      // height. The image has its own white/transparent background
      // so it will visually stand out from the navy without any
      // extra white rectangle beneath it.
      const logoH = SP.headerH;        // full header height
      const logoW = logoZoneW;         // fill entire logo zone width
      try {
        doc.addImage(logoBase64, "PNG", 0, 0, logoW, logoH);
      } catch {
        drawLogoFallback();
      }
    } else {
      // Fallback: white panel behind text so it's readable
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, logoZoneW, SP.headerH, "F");
      drawLogoFallback();
    }

    // ── Destination name (right section of navy bar) ─────────────
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...C.white);
    doc.text(
      destination.name,
      pageW - mX,
      SP.headerH / 2 + 2,
      { align: "right" }
    );

    // Country — lighter teal, smaller
    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(140, 215, 205);
    doc.text(
      destination.country,
      pageW - mX,
      SP.headerH / 2 + 8,
      { align: "right" }
    );

    // ── Bottom accent line spanning full width ───────────────────
    doc.setFillColor(...C.teal);
    doc.rect(0, SP.headerH, pageW, 1, "F");
  }

  function drawLogoFallback(): void {
    // Renders on white panel — use dark brand colours
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...C.teal);
    doc.text("Wander", 5, SP.headerH / 2 + 2.5);
    const ww = doc.getTextWidth("Wander");
    doc.setTextColor(...C.coral);
    doc.text("Souls", 5 + ww + 0.5, SP.headerH / 2 + 2.5);
    // Tagline below
    doc.setFont("helvetica", "normal");
    doc.setFontSize(5);
    doc.setTextColor(...C.textMid);
    doc.text("Memories don't have to cost a fortune", 5, SP.headerH / 2 + 7.5);
  }

  function drawPageHeader(): void {
    drawBrandBar();
  }

  // ═══════════════════════════════════════════════════════════════
  // PAGE FOOTER — slim, every page
  // ═══════════════════════════════════════════════════════════════
  function drawPageFooter(page: number, total: number): void {
    const fy = pageH - SP.footerH + 1;

    // Teal top rule
    doc.setFillColor(...C.teal);
    doc.rect(0, fy, pageW, 0.8, "F");

    // Dark strip
    doc.setFillColor(...C.primary);
    doc.rect(0, fy + 0.8, pageW, SP.footerH - 0.8, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);

    // Left: copyright
    doc.setTextColor(150, 170, 190);
    doc.text("(c) WanderSouls Travel Pvt. Ltd.", mX, pageH - 3.5);

    // Centre: page number
    doc.setFont("helvetica", "bold");
    doc.setTextColor(120, 210, 200);
    doc.text(`Page ${page} of ${total}`, pageW / 2, pageH - 3.5, { align: "center" });

    // Right: destination label
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150, 170, 190);
    doc.text(`${destination.name} Itinerary`, pageW - mX, pageH - 3.5, { align: "right" });
  }

  // ═══════════════════════════════════════════════════════════════
  // CONTACT & LEGAL CARD — displayed at END of document
  // ═══════════════════════════════════════════════════════════════
  function drawContactSection(): void {
    // Section heading
    drawSectionTitle("CONTACT & BOOKING INFORMATION", 11);
    ensureSpace(56);

    const cardY = cursor.y;
    const cardH = 50;

    // Outer card — deep navy
    doc.setFillColor(...C.primary);
    doc.roundedRect(mX, cardY, cW, cardH, 3, 3, "F");

    // ── Top banner (teal strip) ──────────────────────────────────
    doc.setFillColor(...C.teal);
    doc.roundedRect(mX, cardY, cW, 12, 3, 3, "F");
    doc.rect(mX, cardY + 6, cW, 6, "F");   // flatten bottom of rounded teal strip

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...C.white);
    doc.text(
      "REACH OUT TO US ANYTIME  -  WE'RE HERE TO HELP",
      pageW / 2,
      cardY + 8,
      { align: "center" }
    );

    // ── Three contact columns ────────────────────────────────────
    const col3W = cW / 3;
    const rowY  = cardY + 18;

    // ─ Column 1: Email ─
    const c1x = mX + 7;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(...C.coral);
    doc.text("EMAIL", c1x, rowY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...C.white);
    doc.text(CO.email, c1x, rowY + 6.5);
    // Website (second line in email column)
    doc.setFontSize(7);
    doc.setTextColor(180, 210, 210);
    doc.text(CO.web, c1x, rowY + 12.5);

    // Column separator 1
    doc.setDrawColor(70, 100, 120);
    doc.setLineWidth(0.3);
    doc.line(mX + col3W, cardY + 14, mX + col3W, cardY + 34);

    // ─ Column 2: WhatsApp ─
    const c2x = mX + col3W + 7;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(...C.coral);
    doc.text("WHATSAPP (ONLY)", c2x, rowY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...C.white);
    doc.text(CO.wa, c2x, rowY + 6.5);

    // Column separator 2
    doc.line(mX + col3W * 2, cardY + 14, mX + col3W * 2, cardY + 34);

    // ─ Column 3: Website + Booking note ─
    const c3x = mX + col3W * 2 + 7;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(...C.coral);
    doc.text("WEBSITE", c3x, rowY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...C.white);
    doc.text(CO.web, c3x, rowY + 6.5);
    doc.setFontSize(6.5);
    doc.setTextColor(180, 210, 210);
    doc.text("Book & plan online", c3x, rowY + 12.5);

    // ── Horizontal divider ───────────────────────────────────────
    const divY = cardY + 36;
    doc.setDrawColor(60, 90, 110);
    doc.setLineWidth(0.4);
    doc.line(mX + 5, divY, mX + cW - 5, divY);

    // ── CIN + Registered Office ──────────────────────────────────
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(...C.teal);
    doc.text(CO.cin, mX + 7, divY + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(5.8);
    doc.setTextColor(160, 185, 205);
    const offLines = safeLines(CO.office, cW - 14);
    offLines.forEach((line, idx) => {
      doc.text(line, mX + 7, divY + 11 + idx * 4.5);
    });

    cursor.y = cardY + cardH + 8;
  }

  // ═══════════════════════════════════════════════════════════════
  // ① COVER PAGE
  // ═══════════════════════════════════════════════════════════════
  drawPageHeader();

  // ── Hero block ──────────────────────────────────────────────────
  ensureSpace(36);
  const heroY = cursor.y;
  const heroH = 34;

  // Outer card
  doc.setFillColor(...C.primary);
  doc.roundedRect(mX, heroY, cW, heroH, 3, 3, "F");

  // Left coral accent stripe
  doc.setFillColor(...C.coral);
  doc.rect(mX, heroY, 5, heroH, "F");
  doc.roundedRect(mX, heroY, 5, heroH, 2, 2, "F");

  // Bottom teal stripe
  doc.setFillColor(...C.teal);
  doc.rect(mX, heroY + heroH - 7, cW, 7, "F");
  doc.roundedRect(mX, heroY + heroH - 9, cW, 9, 2, 2, "F");

  // Destination name — big, prominent
  doc.setTextColor(...C.white);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text(`${destination.name} Holiday`, mX + 12, heroY + 15);

  // Tagline — italic teal
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(180, 230, 225);
  doc.text(`"${destination.tagline}"`, mX + 12, heroY + 23);

  // Top-right: duration + group
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(200, 220, 235);
  doc.text(destination.duration, pageW - mX - 4, heroY + 10, { align: "right" });
  doc.text(destination.groupSize, pageW - mX - 4, heroY + 17, { align: "right" });

  // Bottom-right: country
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...C.white);
  doc.text(destination.country.toUpperCase(), pageW - mX - 4, heroY + heroH - 2, { align: "right" });

  cursor.y = heroY + heroH + 6;

  // ── Introduction paragraph ──────────────────────────────────────
  writeParagraph(buildIntroParagraph(destination), 9, SP.lineH, C.textMid);

  // ── Meta card ──────────────────────────────────────────────────
  const { dateRange, nightsDays } = getTravelMeta(destination);
  drawMetaCard([
    { label: "Departure Dates", value: dateRange },
    { label: "Duration", value: nightsDays },
    { label: "Group Size", value: destination.groupSize },
  ]);

  // ── Highlights strip ────────────────────────────────────────────
  drawHighlightStrip(destination.highlights.slice(0, 6));

  // ═══════════════════════════════════════════════════════════════
  // ② INCLUSIONS & EXCLUSIONS
  // ═══════════════════════════════════════════════════════════════
  drawSectionTitle("INCLUSIONS & EXCLUSIONS", 11);

  const halfW  = (cW - 10) / 2;
  const startY = cursor.y;

  // Left column header — Inclusions
  doc.setFillColor(...C.successBg);
  doc.roundedRect(mX, cursor.y, halfW, 8, 1.5, 1.5, "F");
  doc.setTextColor(...C.teal);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text("+ WHAT'S INCLUDED", mX + 5, cursor.y + 5.5);
  cursor.y += 10;

  const inclList = destination.inclusions?.length ? destination.inclusions : INCL_DEFAULT;
  inclList.forEach((item) => writeBullet(item, 0, true));
  const leftEndY = cursor.y;

  // Right column header — Exclusions
  cursor.y = startY + 10;
  doc.setFillColor(...C.errorBg);
  doc.roundedRect(mX + halfW + 10, startY, halfW, 8, 1.5, 1.5, "F");
  doc.setTextColor(...C.coral);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text("- NOT INCLUDED", mX + halfW + 14, startY + 5.5);

  const exclList = destination.exclusions?.length ? destination.exclusions : EXCL_DEFAULT;
  exclList.forEach((item) => {
    const lines = safeLines(item, halfW - 10);
    ensureSpace(lines.length * SP.bulletH + 1);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...C.coral);
    doc.text("-", mX + halfW + 14, cursor.y);
    doc.setTextColor(...C.textMid);
    doc.text(lines, mX + halfW + 18, cursor.y);
    cursor.y += lines.length * SP.bulletH + 1;
  });

  cursor.y = Math.max(leftEndY, cursor.y) + 6;

  // ═══════════════════════════════════════════════════════════════
  // ③ PRICING COMPARISON TABLE (if data available)
  // ═══════════════════════════════════════════════════════════════
  if (destination.comparison?.length) {
    drawSectionTitle("PRICING COMPARISON", 11);

    const tableRows = destination.comparison.map((c) => [
      c.provider,
      c.price ? `Rs. ${c.price.toLocaleString("en-IN")}` : "-",
      c.departureDates?.join(", ") ?? "-",
      c.inclusions?.join(", ") ?? "-",
    ]);

    drawTable(
      ["Provider", "Price (Per Person)", "Departure Dates", "Package Inclusions"],
      tableRows,
      [36, 34, 50, cW - 36 - 34 - 50]
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // ④ DAY-BY-DAY ITINERARY
  // ═══════════════════════════════════════════════════════════════
  drawSectionTitle("DAY-BY-DAY ITINERARY", 11);

  const travelDates = buildTravelDates(destination);

  destination.itinerary.forEach((day, index) => {
    const dateLabel = travelDates[index] ?? "";
    const isFirst   = day.day === 1;
    const isLast    = day.day === destination.itinerary.length;

    drawDayHeader(`${day.title}  |  ${dateLabel}`, day.day);

    if (isFirst) {
      // Arrival day narrative
      const lead = day.activities[0]
        ? `Arrival at ${day.location} — ${day.activities[0].activity}`
        : day.title;
      writeParagraph(lead, 9, SP.lineH, C.teal);
      day.activities.forEach((act) => {
        const t = act.description ? `${act.activity} - ${act.description}` : act.activity;
        writeBullet(t);
      });
      if (day.accommodation) writeBullet(`Hotel: ${day.accommodation}`);
    } else if (isLast) {
      // Departure day — just bullets
      day.activities.forEach((act) => {
        const t = act.description ? `${act.activity} - ${act.description}` : act.activity;
        writeBullet(t);
      });
    } else {
      // Standard sightseeing day
      if (day.activities[0]?.description) {
        writeParagraph(day.activities[0].description, 9, SP.lineH, C.textMid);
      }

      // Transfer note
      ensureSpace(6);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...C.coral);
      doc.text("Transfer: ", mX, cursor.y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...C.text);
      doc.text("SIC (Seat-in-Coach)", mX + doc.getTextWidth("Transfer: "), cursor.y);
      cursor.y += 5.5;

      // Experiences heading
      ensureSpace(6);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(...C.primary);
      doc.text("Today's Experiences:", mX, cursor.y);
      cursor.y += 5.5;

      day.activities.forEach((act) => {
        ensureSpace(6);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(...C.primary);
        doc.text(String(act.activity), mX + 4, cursor.y);
        cursor.y += 5;
        if (act.description) {
          safeLines(act.description, cW - 14).forEach((line) => writeBullet(line, 8));
        }
      });

      if (day.accommodation) {
        ensureSpace(6);
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8);
        doc.setTextColor(...C.textMuted);
        doc.text(`Overnight: ${day.accommodation}`, mX, cursor.y);
        cursor.y += 5.5;
      }
    }

    const mealsText = day.meals.length > 0 ? day.meals.join(", ") : isFirst ? "None" : "Breakfast";
    drawMealsBadge(mealsText);
    cursor.y += 3;
  });

  // ═══════════════════════════════════════════════════════════════
  // ⑤ TERMS & CONDITIONS
  // ═══════════════════════════════════════════════════════════════
  drawSectionTitle("TERMS, CONDITIONS & NOTES", 11);

  TNC.forEach((section, si) => {
    if (si > 0) {
      ensureSpace(12);
      doc.setTextColor(...C.primary);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.text(section.title, mX, cursor.y);
      cursor.y += 3;
      doc.setFillColor(...C.bgElevated);
      doc.rect(mX, cursor.y, cW, 0.4, "F");
      cursor.y += 5;
    }
    section.items.forEach((item) => writeBullet(item));
    cursor.y += 3;
  });

  // ═══════════════════════════════════════════════════════════════
  // ⑥ CONTACT & LEGAL INFORMATION CARD (end of itinerary)
  // ═══════════════════════════════════════════════════════════════
  drawContactSection();

  // ═══════════════════════════════════════════════════════════════
  // STAMP PAGE HEADERS + FOOTERS ON ALL PAGES
  // ═══════════════════════════════════════════════════════════════
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    drawPageFooter(p, totalPages);
  }

  savePdf(doc, createPdfFileName(destination));
}

// ─────────────────────────────────────────────────────────────────
// Utility functions
// ─────────────────────────────────────────────────────────────────

function buildIntroParagraph(destination: Destination): string {
  const sample = destination.highlights.slice(0, 3).join(", ");
  return (
    `Experience an unforgettable ${destination.name} getaway filled with iconic attractions ` +
    `and vibrant cultural experiences. This carefully crafted itinerary blends ` +
    `${sample.toLowerCase()}, and immersive local highlights — all complemented by comfortable ` +
    `stays and seamless transfers for a relaxed, memorable holiday.`
  );
}

function parseDuration(duration: string): { nights: number; days: number } {
  const nm = duration.match(/(\d+)\s*Nights?/i);
  const dm = duration.match(/(\d+)\s*Days?/i);
  const nights = nm ? Number(nm[1]) : 0;
  const days   = dm ? Number(dm[1]) : nights > 0 ? nights + 1 : 0;
  return { nights, days };
}

function getTravelMeta(
  destination: Destination
): { dateRange: string; nightsDays: string } {
  const { nights, days } = parseDuration(destination.duration);
  const nightsDays        = nights && days ? `${nights}N / ${days}D` : destination.duration;
  const wanderPkg         = destination.comparison?.find((c) => c.provider === "WanderSouls");
  const firstDep          = wanderPkg?.departureDates?.[0];

  if (!firstDep) return { dateRange: "Contact us for available dates", nightsDays };

  const startDate = parseDepartureDate(firstDep);
  const endDate   = new Date(startDate);
  endDate.setDate(endDate.getDate() + Math.max(days - 1, nights));
  return {
    dateRange: `${formatPdfDate(startDate)} to ${formatPdfDate(endDate)}`,
    nightsDays,
  };
}

function buildTravelDates(destination: Destination): string[] {
  const wanderPkg = destination.comparison?.find((c) => c.provider === "WanderSouls");
  const firstDep  = wanderPkg?.departureDates?.[0];
  const startDate = firstDep ? parseDepartureDate(firstDep) : new Date();
  return destination.itinerary.map((_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return formatPdfDate(d);
  });
}

function parseDepartureDate(departure: string): Date {
  const year   = new Date().getFullYear();
  const parsed = new Date(`${departure} ${year}`);
  if (!Number.isNaN(parsed.getTime())) return parsed;
  const fb = new Date();
  fb.setDate(fb.getDate() + 30);
  return fb;
}

function formatPdfDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function savePdf(doc: { output(type: string): Blob }, fileName: string): void {
  const blob   = doc.output("blob") as Blob;
  const url    = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href          = url;
  anchor.download      = fileName;
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function createPdfFileName(destination: Destination): string {
  const safeName = destination.name
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const { nights, days } = parseDuration(destination.duration);
  const seg =
    nights && days ? `${nights}N-${days}D` :
    nights ? `${nights}N` :
    days   ? `${days}D`   :
    destination.duration.replace(/[^a-zA-Z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return `WanderSouls-${safeName}-${seg}-Itinerary.pdf`;
}