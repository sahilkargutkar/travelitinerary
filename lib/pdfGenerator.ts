import type { Destination } from "./destinations";

export async function generateItineraryPDF(destination: Destination): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // ---- COLOUR PALETTE ----
  const ORANGE = [255, 107, 53] as [number, number, number];
  const NAVY = [26, 26, 46] as [number, number, number];
  const GOLD = [255, 215, 0] as [number, number, number];
  const DARK = [13, 13, 26] as [number, number, number];
  const WHITE = [255, 255, 255] as [number, number, number];
  const LIGHT_GRAY = [245, 245, 250] as [number, number, number];
  const TEXT_DARK = [30, 30, 60] as [number, number, number];
  const TEXT_MED = [80, 80, 120] as [number, number, number];

  // ---- HEADER ----
  doc.setFillColor(...DARK);
  doc.rect(0, 0, pageWidth, 40, "F");

  // Logo text
  doc.setTextColor(...ORANGE);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("WANDER", 14, 18);

  doc.setTextColor(...GOLD);
  doc.text("souls", 14 + doc.getTextWidth("WANDER") + 1, 18);

  doc.setTextColor(...WHITE);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Premium Travel Experiences", 14, 25);

  // Header right side
  doc.setTextColor(...TEXT_MED);
  doc.setFontSize(8);
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
  doc.text(`Generated: ${today}`, pageWidth - 14, 18, { align: "right" });
  doc.text("www.wanderlux.travel", pageWidth - 14, 25, { align: "right" });

  // Decorative accent line
  doc.setFillColor(...ORANGE);
  doc.rect(0, 38, pageWidth, 2, "F");

  // ---- DESTINATION HERO SECTION ----
  doc.setFillColor(...NAVY);
  doc.rect(0, 40, pageWidth, 35, "F");

  doc.setTextColor(...GOLD);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text(destination.country.toUpperCase() + " " + destination.flag, 14, 52);

  doc.setTextColor(...WHITE);
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  doc.text(destination.name, 14, 63);

  doc.setTextColor(200, 200, 220);
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text(`"${destination.tagline}"`, 14, 71);

  // Quick stats pills
  const stats = [
    { label: "Duration", value: destination.duration },
    { label: "Group", value: destination.groupSize },
    { label: "Difficulty", value: destination.difficulty },
    { label: "Best Time", value: destination.bestTime },
  ];

  let statX = 14;
  stats.forEach((stat) => {
    const statWidth = Math.max(36, doc.getTextWidth(stat.value) + 12);
    doc.setFillColor(...ORANGE);
    doc.roundedRect(statX, 55, statWidth, 10, 2, 2, "F");
    doc.setTextColor(...WHITE);
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.text(stat.value, statX + statWidth / 2, 61, { align: "center" });
    statX += statWidth + 4;
  });

  // ---- PRICE BOX ----
  doc.setFillColor(...ORANGE);
  doc.roundedRect(pageWidth - 55, 43, 41, 18, 3, 3, "F");
  doc.setTextColor(...WHITE);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Starting from", pageWidth - 35, 49, { align: "center" });
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`₹${destination.basePrice.toLocaleString("en-IN")}`, pageWidth - 35, 57, { align: "center" });
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text("per person", pageWidth - 35, 63, { align: "center" });

  let y = 82;

  // ---- DESCRIPTION ----
  doc.setTextColor(...TEXT_DARK);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const descLines = doc.splitTextToSize(destination.description, pageWidth - 28);
  doc.text(descLines, 14, y);
  y += descLines.length * 5 + 8;

  // ---- HIGHLIGHTS ----
  doc.setFillColor(...LIGHT_GRAY);
  doc.roundedRect(14, y - 2, pageWidth - 28, 8 + Math.ceil(destination.highlights.length / 2) * 7, 3, 3, "F");

  doc.setTextColor(...ORANGE);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("✦  TRIP HIGHLIGHTS", 20, y + 5);
  y += 12;

  const midpoint = Math.ceil(destination.highlights.length / 2);
  destination.highlights.forEach((h, i) => {
    const col = i < midpoint ? 0 : 1;
    const row = i < midpoint ? i : i - midpoint;
    const hx = 20 + col * (pageWidth / 2 - 10);
    const hy = y + row * 7;
    doc.setTextColor(...TEXT_DARK);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.text(`• ${h}`, hx, hy);
  });
  y += midpoint * 7 + 8;

  // ---- ITINERARY ----
  doc.setTextColor(...ORANGE);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("DAY-BY-DAY ITINERARY", 14, y);
  y += 4;

  doc.setFillColor(...ORANGE);
  doc.rect(14, y, 50, 0.7, "F");
  y += 8;

  destination.itinerary.forEach((day) => {
    // Check page break
    if (y > pageHeight - 50) {
      doc.addPage();
      // Mini header on subsequent pages
      doc.setFillColor(...DARK);
      doc.rect(0, 0, pageWidth, 12, "F");
      doc.setTextColor(...ORANGE);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("WANDERLUX", 14, 8);
      doc.setTextColor(...TEXT_MED);
      doc.setFontSize(8);
      doc.text(`${destination.name} Itinerary`, pageWidth - 14, 8, { align: "right" });
      y = 20;
    }

    // Day header
    doc.setFillColor(...NAVY);
    doc.roundedRect(14, y - 1, pageWidth - 28, 10, 2, 2, "F");
    doc.setTextColor(...GOLD);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text(`DAY ${day.day}`, 18, y + 5);
    doc.setTextColor(...WHITE);
    doc.setFontSize(9);
    doc.text(day.title.toUpperCase(), 38, y + 5);
    doc.setTextColor(180, 180, 200);
    doc.setFontSize(7);
    doc.text(day.location, pageWidth - 18, y + 5, { align: "right" });
    y += 12;

    // Activities
    day.activities.forEach((act) => {
      if (y > pageHeight - 30) {
        doc.addPage();
        doc.setFillColor(...DARK);
        doc.rect(0, 0, pageWidth, 12, "F");
        doc.setTextColor(...ORANGE);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("WANDERLUX", 14, 8);
        y = 20;
      }

      doc.setTextColor(...ORANGE);
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      doc.text(act.time, 18, y);

      doc.setTextColor(...TEXT_DARK);
      doc.setFont("helvetica", "bold");
      doc.text(`${act.icon}  ${act.activity}`, 45, y);

      doc.setTextColor(...TEXT_MED);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      const actDesc = doc.splitTextToSize(act.description, pageWidth - 90);
      doc.text(actDesc, 45, y + 4);
      y += 4 + actDesc.length * 4 + 2;
    });

    // Accommodation & meals
    if (day.accommodation) {
      doc.setFillColor(240, 240, 250);
      doc.rect(14, y, pageWidth - 28, 9, "F");
      doc.setTextColor(...TEXT_MED);
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      doc.text(`🏨 ${day.accommodation}`, 18, y + 4);
      const mealsText = day.meals.join(" • ");
      doc.text(`🍽️ ${mealsText}`, pageWidth - 18, y + 4, { align: "right" });
      y += 12;
    } else {
      y += 4;
    }
  });

  // ---- NEW PAGE: INCLUSIONS / PRICE TABLE ----
  doc.addPage();

  // Mini header
  doc.setFillColor(...DARK);
  doc.rect(0, 0, pageWidth, 12, "F");
  doc.setTextColor(...ORANGE);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("WANDERLUX", 14, 8);
  doc.setTextColor(...TEXT_MED);
  doc.setFontSize(8);
  doc.text(`${destination.name} – Package Details`, pageWidth - 14, 8, { align: "right" });

  y = 22;

  // Inclusions / Exclusions side by side
  doc.setTextColor(...ORANGE);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("WHAT'S INCLUDED", 14, y);
  doc.text("NOT INCLUDED", pageWidth / 2 + 5, y);
  y += 6;

  const maxRows = Math.max(destination.inclusions.length, destination.exclusions.length);
  const rowH = 7;

  for (let i = 0; i < maxRows; i++) {
    if (i % 2 === 0) {
      doc.setFillColor(...LIGHT_GRAY);
      doc.rect(14, y - 1, (pageWidth - 28) / 2 - 2, rowH, "F");
      doc.rect(pageWidth / 2 + 5, y - 1, (pageWidth - 28) / 2 - 2, rowH, "F");
    }

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");

    if (destination.inclusions[i]) {
      doc.setTextColor(52, 211, 153); // green
      doc.text("✓", 18, y + 3);
      doc.setTextColor(...TEXT_DARK);
      doc.text(destination.inclusions[i], 24, y + 3);
    }
    if (destination.exclusions[i]) {
      doc.setTextColor(239, 68, 68); // red
      doc.text("✗", pageWidth / 2 + 9, y + 3);
      doc.setTextColor(...TEXT_DARK);
      doc.text(destination.exclusions[i], pageWidth / 2 + 16, y + 3);
    }
    y += rowH;
  }

  y += 12;

  // ---- PRICE COMPARISON TABLE ----
  doc.setTextColor(...ORANGE);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("PRICE COMPARISON", 14, y);
  y += 3;

  autoTable(doc, {
    startY: y,
    head: [["Provider", "Price (₹)", "Duration", "Rating", "What's Included"]],
    body: destination.comparison.map((c) => [
      c.provider + (c.badge ? `\n★ ${c.badge}` : ""),
      `₹${c.price.toLocaleString("en-IN")}`,
      c.duration,
      `${c.rating}/5 (${c.reviewCount} reviews)`,
      c.inclusions.slice(0, 3).join(", ") + (c.inclusions.length > 3 ? "..." : ""),
    ]),
    styles: { fontSize: 8, cellPadding: 4, textColor: TEXT_DARK },
    headStyles: { fillColor: NAVY, textColor: WHITE, fontStyle: "bold" },
    bodyStyles: { fillColor: WHITE },
    alternateRowStyles: { fillColor: LIGHT_GRAY },
    didDrawCell: (data) => {
      // Highlight WanderSouls row
      if (data.section === "body" && data.row.index === 0) {
        doc.setFillColor(255, 107, 53, 0.08);
      }
    },
    columnStyles: {
      0: { fontStyle: "bold" },
      1: { fontStyle: "bold", textColor: ORANGE },
    },
    margin: { left: 14, right: 14 },
  });

  // ---- FOOTER ON ALL PAGES ----
  const totalPages = (doc.internal as unknown as { getNumberOfPages(): number }).getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFillColor(...DARK);
    doc.rect(0, pageHeight - 12, pageWidth, 12, "F");
    doc.setFillColor(...ORANGE);
    doc.rect(0, pageHeight - 13, pageWidth, 1, "F");

    doc.setTextColor(...TEXT_MED);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text("© 2025 WanderSouls Travel Pvt. Ltd. | www.wanderlux.travel | +91 98765 43210", 14, pageHeight - 5);
    doc.text(`Page ${p} of ${totalPages}`, pageWidth - 14, pageHeight - 5, { align: "right" });
  }

  doc.save(`WanderLux_${destination.name}_Itinerary.pdf`);
}
