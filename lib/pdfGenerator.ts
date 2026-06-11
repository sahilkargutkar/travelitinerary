import type { Destination } from "./destinations";

const COMPANY = {
  cin: "U7G110MH2025PTC461276",
  registeredOffice:
    "Registered Office: 1204 Aim Platinum Cts 27, 1to5, 287 1to6, Road No.1, Jogeshwari East, Mumbai, Maharashtra – 400060, India",
  contact:
    "Email: info@wandersouls.in | Only WhatsApp: +91 84520 87326 | Website: www.wandersouls.in",
};

const COLORS = {
  primary: [10, 37, 64] as [number, number, number],
  secondary: [0, 184, 169] as [number, number, number],
  accent: [255, 122, 89] as [number, number, number],
  bg: [250, 250, 247] as [number, number, number],
  bgElevated: [242, 242, 236] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  text: [26, 26, 26] as [number, number, number],
  textSecondary: [74, 74, 74] as [number, number, number],
  textMuted: [126, 126, 126] as [number, number, number],
};

const DISCLAIMER_SECTIONS = [
  {
    title: "IMPORTANT INSTRUCTIONS & NOTES",
    items: [
      "All tours & transfers are subject to availability at the time of booking",
      "Hotel check-in time: 14:00 hrs | Check-out time: 11:00–12:00 hrs",
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
      "Number of sightseeing days / order may increase or decrease due to local conditions",
    ],
  },
  {
    title: "FLIGHT & TRANSFER NOTES",
    items: [
      "Flights are subject to availability & fare change",
      "Guests must reach the airport at least 3 hours before departure",
    ],
  },
  {
    title: "GENERAL INFORMATION",
    items: [
      "Carry original passport & valid visa during travel",
      "Follow local laws & tour manager instructions at all times",
      "Travel insurance is strongly recommended",
    ],
  },
];

export async function generateItineraryPDF(destination: Destination): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 14;
  const contentWidth = pageWidth - marginX * 2;

  const brandBarHeight = 14;
  const legalHeaderHeight = 14;
  const headerHeight = brandBarHeight + legalHeaderHeight;
  const footerHeight = 12;
  const footerY = pageHeight - 5;
  const contentTop = headerHeight + 8;
  const contentBottom = pageHeight - footerHeight - 4;

  let y = contentTop;

  const drawBrandBar = () => {
    doc.setFillColor(...COLORS.primary);
    doc.rect(0, 0, pageWidth, brandBarHeight, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(...COLORS.accent);
    doc.text("WANDER", marginX, 9);
    const wanderWidth = doc.getTextWidth("WANDER");
    doc.setTextColor(...COLORS.secondary);
    doc.text("Souls", marginX + wanderWidth + 1, 9);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(200, 210, 220);
    doc.text("Premium Travel Experiences", marginX, 12.5);

    doc.setTextColor(...COLORS.white);
    doc.setFontSize(7);
    doc.text(destination.country + " " + destination.flag, pageWidth - marginX, 8, { align: "right" });
    doc.setTextColor(...COLORS.secondary);
    doc.text("www.wandersouls.in", pageWidth - marginX, 12, { align: "right" });

    doc.setFillColor(...COLORS.accent);
    doc.rect(0, brandBarHeight, pageWidth, 1.2, "F");
  };

  const drawLegalHeader = () => {
    const legalY = brandBarHeight + 4;
    doc.setTextColor(...COLORS.textMuted);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(5.8);
    doc.text(`CIN: ${COMPANY.cin}`, marginX, legalY);
    const officeLines = doc.splitTextToSize(COMPANY.registeredOffice, contentWidth);
    doc.text(officeLines, marginX, legalY + 3);
    doc.text(COMPANY.contact, marginX, legalY + 3 + officeLines.length * 2.6 + 1);
    doc.setDrawColor(...COLORS.secondary);
    doc.setLineWidth(0.15);
    doc.line(marginX, headerHeight - 0.5, pageWidth - marginX, headerHeight - 0.5);
  };

  const drawPageHeader = () => {
    drawBrandBar();
    drawLegalHeader();
  };

  const drawPageFooter = (page: number, total: number) => {
    doc.setFillColor(...COLORS.accent);
    doc.rect(0, pageHeight - footerHeight, pageWidth, 0.8, "F");
    doc.setFillColor(...COLORS.primary);
    doc.rect(0, pageHeight - footerHeight + 0.8, pageWidth, footerHeight - 0.8, "F");

    doc.setTextColor(180, 190, 200);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6);
    doc.text(
      "© WanderSouls Travel Pvt. Ltd. | info@wandersouls.in | +91 84520 87326",
      marginX,
      pageHeight - 4.5
    );
    doc.setTextColor(...COLORS.secondary);
    doc.text(`-- ${page} of ${total} --`, pageWidth / 2, pageHeight - 4.5, { align: "center" });
    doc.setTextColor(...COLORS.white);
    doc.text(`${destination.name} Itinerary`, pageWidth - marginX, pageHeight - 4.5, { align: "right" });
  };

  const ensureSpace = (needed: number) => {
    if (y + needed <= contentBottom) return;
    doc.addPage();
    drawPageHeader();
    y = contentTop;
  };

  const writeParagraph = (
    text: string,
    fontSize = 9,
    lineHeight = 4.6,
    color: [number, number, number] = COLORS.text
  ) => {
    doc.setTextColor(...color);
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(text, contentWidth);
    ensureSpace(lines.length * lineHeight);
    doc.text(lines, marginX, y);
    y += lines.length * lineHeight + 2;
  };

  const writeBullet = (text: string, indent = 0) => {
    doc.setTextColor(...COLORS.text);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(text, contentWidth - 6 - indent);
    ensureSpace(lines.length * 4.2);
    doc.setTextColor(...COLORS.secondary);
    doc.text("•", marginX + indent, y);
    doc.setTextColor(...COLORS.text);
    doc.text(lines, marginX + 4 + indent, y);
    y += lines.length * 4.2 + 1;
  };

  const drawSectionTitle = (title: string, fontSize = 9.5) => {
    ensureSpace(10);
    doc.setTextColor(...COLORS.primary);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(fontSize);
    doc.text(title, marginX, y);
    y += 3;
    doc.setFillColor(...COLORS.secondary);
    doc.rect(marginX, y, 28, 0.6, "F");
    doc.setFillColor(...COLORS.accent);
    doc.rect(marginX + 28, y, 8, 0.6, "F");
    y += 5;
  };

  const drawDayHeader = (heading: string, dayNum: number) => {
    ensureSpace(14);
    const barHeight = 9;
    doc.setFillColor(...COLORS.primary);
    doc.roundedRect(marginX, y - 1, contentWidth, barHeight, 1.5, 1.5, "F");

    doc.setFillColor(...COLORS.accent);
    doc.roundedRect(marginX + 2, y + 1, 14, 5.5, 1, 1, "F");
    doc.setTextColor(...COLORS.white);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text(`DAY ${dayNum}`, marginX + 9, y + 4.8, { align: "center" });

    doc.setTextColor(...COLORS.white);
    doc.setFontSize(9);
    const headingLines = doc.splitTextToSize(heading, contentWidth - 22);
    doc.text(headingLines, marginX + 19, y + 4.5);
    y += barHeight + 3;
  };

  const drawMetaCard = (items: { label: string; value: string }[]) => {
    const cardHeight = 22;
    ensureSpace(cardHeight + 4);
    doc.setFillColor(...COLORS.bgElevated);
    doc.roundedRect(marginX, y, contentWidth, cardHeight, 2, 2, "F");
    doc.setFillColor(...COLORS.secondary);
    doc.rect(marginX, y, 2.5, cardHeight, "F");

    const colWidth = contentWidth / items.length;
    items.forEach((item, i) => {
      const cx = marginX + 8 + i * colWidth;
      doc.setTextColor(...COLORS.accent);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.text(item.label.toUpperCase(), cx, y + 6);
      doc.setTextColor(...COLORS.primary);
      doc.setFontSize(8);
      const valueLines = doc.splitTextToSize(item.value, colWidth - 6);
      doc.text(valueLines, cx, y + 11);
    });
    y += cardHeight + 6;
  };

  const drawHighlightStrip = (highlights: string[]) => {
    const rows = Math.ceil(highlights.length / 2);
    const stripHeight = 8 + rows * 5;
    ensureSpace(stripHeight + 4);

    doc.setFillColor(...COLORS.bg);
    doc.roundedRect(marginX, y, contentWidth, stripHeight, 2, 2, "F");
    doc.setDrawColor(...COLORS.secondary);
    doc.setLineWidth(0.3);
    doc.roundedRect(marginX, y, contentWidth, stripHeight, 2, 2, "S");

    doc.setTextColor(...COLORS.accent);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text("✦  TRIP HIGHLIGHTS", marginX + 5, y + 5.5);
    y += 9;

    const midpoint = Math.ceil(highlights.length / 2);
    highlights.forEach((h, i) => {
      const col = i < midpoint ? 0 : 1;
      const row = i < midpoint ? i : i - midpoint;
      const hx = marginX + 6 + col * (contentWidth / 2 - 4);
      const hy = y + row * 5;
      doc.setTextColor(...COLORS.textSecondary);
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...COLORS.secondary);
      doc.text("•", hx, hy);
      doc.setTextColor(...COLORS.text);
      doc.text(h, hx + 3, hy);
    });
    y += midpoint * 5 + 6;
  };

  const drawMealsBadge = (mealsText: string) => {
    ensureSpace(8);
    const badgeWidth = Math.max(42, doc.getTextWidth(`Meals: ${mealsText}`) + 10);
    doc.setFillColor(242, 252, 251);
    doc.roundedRect(marginX, y - 1, badgeWidth, 6.5, 1.5, 1.5, "F");
    doc.setDrawColor(...COLORS.secondary);
    doc.setLineWidth(0.2);
    doc.roundedRect(marginX, y - 1, badgeWidth, 6.5, 1.5, 1.5, "S");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...COLORS.secondary);
    doc.text("Meals: ", marginX + 3, y + 3.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...COLORS.text);
    doc.text(mealsText, marginX + 3 + doc.getTextWidth("Meals: "), y + 3.5);
    y += 9;
  };

  // ---- COVER PAGE ----
  drawPageHeader();

  // Hero title block
  ensureSpace(28);
  doc.setFillColor(...COLORS.primary);
  doc.roundedRect(marginX, y, contentWidth, 22, 2, 2, "F");
  doc.setFillColor(...COLORS.accent);
  doc.rect(marginX, y, 3, 22, "F");

  doc.setTextColor(...COLORS.white);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(`${destination.name} Holiday`, marginX + 7, y + 10);
  doc.setTextColor(...COLORS.secondary);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.text(`"${destination.tagline}"`, marginX + 7, y + 16);
  y += 26;

  const intro = buildIntroParagraph(destination);
  writeParagraph(intro, 9, 4.8, COLORS.textSecondary);

  const { dateRange, nightsDays } = getTravelMeta(destination);
  drawMetaCard([
    { label: "Dates", value: dateRange },
    { label: "Guests", value: destination.groupSize.replace(/People/i, "Travellers") },
    { label: "Duration", value: nightsDays },
  ]);

  drawHighlightStrip(destination.highlights.slice(0, 6));
  drawSectionTitle("DAY-BY-DAY ITINERARY", 11);

  // ---- DAY-BY-DAY ITINERARY ----
  const travelDates = buildTravelDates(destination);

  destination.itinerary.forEach((day, index) => {
    const dateLabel = travelDates[index] ?? "";
    const isFirst = day.day === 1;
    const isLast = day.day === destination.itinerary.length;

    const dayHeading = isFirst
      ? `${dateLabel}`
      : `${dateLabel} — ${day.title}`;

    drawDayHeader(dayHeading, day.day);

    if (isFirst) {
      const arrivalLead = day.activities[0]
        ? `${day.title} ${day.activities[0].time} at ${day.location}`
        : day.title;
      writeParagraph(arrivalLead, 9, 4.6, COLORS.secondary);
      day.activities.forEach((act) => {
        const bulletText = act.description
          ? `${act.activity} — ${act.description}`
          : act.activity;
        writeBullet(bulletText);
      });
      if (day.accommodation) {
        writeBullet(`Check-in at ${day.accommodation}`);
      }
    } else {
      if (!isLast && day.activities[0]?.description) {
        writeParagraph(day.activities[0].description, 9, 4.6, COLORS.textSecondary);
      }

      if (!isLast) {
        ensureSpace(6);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(...COLORS.accent);
        doc.text("Transfer: ", marginX, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...COLORS.text);
        doc.text("SIC (Seat-in-Coach)", marginX + doc.getTextWidth("Transfer: "), y);
        y += 5;
      }

      ensureSpace(6);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...COLORS.primary);
      doc.text("Experiences:", marginX, y);
      y += 4;

      day.activities.forEach((act) => {
        ensureSpace(4.5);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(...COLORS.primary);
        doc.text(act.activity, marginX + 2, y);
        y += 4.5;

        if (act.description) {
          const detailLines = doc.splitTextToSize(act.description, contentWidth - 10);
          detailLines.forEach((line: string) => writeBullet(line, 6));
        }
      });

      if (day.accommodation) {
        ensureSpace(5);
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8);
        doc.setTextColor(...COLORS.textMuted);
        doc.text(`Return to ${day.accommodation} by evening`, marginX, y);
        y += 5;
      }
    }

    const mealsText =
      day.meals.length > 0 ? day.meals.join(", ") : isFirst ? "No" : "Breakfast";
    drawMealsBadge(mealsText);
    y += 2;
  });

  // ---- DISCLAIMER PAGE ----
  ensureSpace(20);
  drawSectionTitle("IMPORTANT INSTRUCTIONS & NOTES", 11);

  DISCLAIMER_SECTIONS.forEach((section, sectionIndex) => {
    if (sectionIndex > 0) {
      ensureSpace(10);
      doc.setTextColor(...COLORS.primary);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text(section.title, marginX, y);
      y += 3;
      doc.setFillColor(...COLORS.bgElevated);
      doc.rect(marginX, y, contentWidth, 0.4, "F");
      y += 5;
    }
    section.items.forEach((item) => writeBullet(item));
    y += 2;
  });

  // ---- PAGE FOOTERS ----
  const totalPages = (doc.internal as unknown as { getNumberOfPages(): number }).getNumberOfPages();
  for (let page = 1; page <= totalPages; page++) {
    doc.setPage(page);
    drawPageFooter(page, totalPages);
  }

  savePdf(doc, createPdfFileName(destination));
}

function buildIntroParagraph(destination: Destination): string {
  const highlightSample = destination.highlights.slice(0, 3).join(", ");
  return (
    `Experience an unforgettable ${destination.name} getaway filled with iconic attractions, ` +
    `family-friendly adventures, and vibrant experiences. This carefully planned itinerary blends ` +
    `${highlightSample.toLowerCase()}, and immersive cultural highlights, all complemented by ` +
    `a comfortable stay and seamless transfers for a relaxed and memorable holiday.`
  );
}

function parseDuration(duration: string): { nights: number; days: number } {
  const nightsMatch = duration.match(/(\d+)\s*Nights?/i);
  const daysMatch = duration.match(/(\d+)\s*Days?/i);
  const nights = nightsMatch ? Number(nightsMatch[1]) : 0;
  const days = daysMatch ? Number(daysMatch[1]) : nights > 0 ? nights + 1 : 0;
  return { nights, days };
}

function getTravelMeta(destination: Destination): { dateRange: string; nightsDays: string } {
  const { nights, days } = parseDuration(destination.duration);
  const nightsDays =
    nights && days ? `${nights} Nights / ${days} Days` : destination.duration;

  const wanderPackage = destination.comparison.find((c) => c.provider === "WanderSouls");
  const firstDeparture = wanderPackage?.departureDates?.[0];

  if (!firstDeparture) {
    return {
      dateRange: "Contact WanderSouls for available departure dates",
      nightsDays,
    };
  }

  const startDate = parseDepartureDate(firstDeparture);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + Math.max(days - 1, nights));

  return {
    dateRange: `${formatPdfDate(startDate)} – ${formatPdfDate(endDate)}`,
    nightsDays,
  };
}

function buildTravelDates(destination: Destination): string[] {
  const wanderPackage = destination.comparison.find((c) => c.provider === "WanderSouls");
  const firstDeparture = wanderPackage?.departureDates?.[0];
  const startDate = firstDeparture ? parseDepartureDate(firstDeparture) : new Date();

  return destination.itinerary.map((_, index) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + index);
    return formatPdfDate(date);
  });
}

function parseDepartureDate(departure: string): Date {
  const currentYear = new Date().getFullYear();
  const parsed = new Date(`${departure} ${currentYear}`);
  if (!Number.isNaN(parsed.getTime())) return parsed;

  const fallback = new Date();
  fallback.setDate(fallback.getDate() + 30);
  return fallback;
}

function formatPdfDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function savePdf(doc: { output(type: string): Blob }, fileName: string) {
  const blob = doc.output("blob");
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function createPdfFileName(destination: Destination): string {
  const safeName = destination.name.replace(/[^a-zA-Z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const { nights, days } = parseDuration(destination.duration);

  let durationSegment = "";
  if (nights && days) {
    durationSegment = `${nights}nights${days}days`;
  } else if (nights) {
    durationSegment = `${nights}nights`;
  } else if (days) {
    durationSegment = `${days}days`;
  } else {
    durationSegment = destination.duration.replace(/[^a-zA-Z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  return `${safeName}-${durationSegment}.pdf`;
}
