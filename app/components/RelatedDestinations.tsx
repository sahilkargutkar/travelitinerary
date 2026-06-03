"use client";

import DestinationCard from "./DestinationCard";
import type { Destination } from "../../lib/destinations";

interface Props {
  destinations: Destination[];
}

export default function RelatedDestinations({ destinations }: Props) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "20px",
    }}>
      {destinations.map((dest, i) => (
        <DestinationCard key={dest.slug} destination={dest} index={i} />
      ))}
      <style>{`
        @media (max-width: 1024px) {
          .related-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
