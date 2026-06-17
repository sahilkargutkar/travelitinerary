import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Satisfy } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import JourneyStats from "./components/JourneyStats";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const satisfy = Satisfy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-satisfy",
});

export const metadata: Metadata = {
  title: {
    default: "WanderSouls – Premium Travel Itineraries",
    template: "%s | WanderSouls",
  },
  description:
    "Discover curated, day-by-day travel itineraries for Bali, Kerala, Malaysia, Meghalaya, Singapore, Thailand and more. Compare packages vs Veena World & MakeMyTrip. Download PDF itineraries instantly.",
  keywords: [
    "travel itinerary",
    "Kerala tour package",
    "Thailand itinerary",
    "Malaysia travel",
    "Singapore package",
    "Meghalaya trek",
    "Bali vacation",
    "travel comparison",
    "WanderSouls",
  ],
  openGraph: {
    title: "WanderSouls – Premium Travel Itineraries",
    description: "Curated travel itineraries with PDF download & price comparison vs Veena World, MakeMyTrip",
    type: "website",
    siteName: "WanderSouls",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${playfair.variable} ${montserrat.variable} ${satisfy.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <JourneyStats />
        <Footer />
        {/* Sticky Mobile Bar for WhatsApp Enquiry */}
        <div className="mobile-whatsapp-bar">
          <a
            href="https://wa.me/918452087326?text=Hi!%20I'm%20interested%20in%20booking%20a%20luxury%20itinerary."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "16px",
              background: "var(--accent)",
              color: "#FFFFFF",
              textDecoration: "none",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: "700",
              fontSize: "1rem",
              boxShadow: "0 -4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            Enquire on WhatsApp
          </a>
        </div>
      </body>
    </html>
  );
}
