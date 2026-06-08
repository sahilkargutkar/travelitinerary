import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: {
    default: "WanderLux – Premium Travel Itineraries",
    template: "%s | WanderLux",
  },
  description:
    "Discover curated, day-by-day travel itineraries for Kerala, Thailand, Philippines, Singapore, South Africa, South Korea and more. Compare packages vs Veena World & MakeMyTrip. Download PDF itineraries instantly.",
  keywords: [
    "travel itinerary",
    "Kerala tour package",
    "Thailand itinerary",
    "Philippines tour",
    "Singapore package",
    "South Africa safari",
    "South Korea travel",
    "travel comparison",
    "WanderLux",
  ],
  openGraph: {
    title: "WanderLux – Premium Travel Itineraries",
    description: "Curated travel itineraries with PDF download & price comparison vs Veena World, MakeMyTrip",
    type: "website",
    siteName: "WanderLux",
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
      <body className={`${playfair.variable} ${montserrat.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
