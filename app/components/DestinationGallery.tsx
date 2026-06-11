"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, X, ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Props {
  images: string[];
  destinationName: string;
}

export default function DestinationGallery({ images, destinationName }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0));
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0));
      } else if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Disable body scroll when lightbox is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div style={{ position: "relative", width: "100%" }}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          className="premium-gallery-swiper"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={img}>
              <div
                className="gallery-card-item"
                style={{ height: "280px" }}
                onClick={() => setActiveIndex(idx)}
              >
                <img
                  src={img}
                  alt={`${destinationName} Gallery ${idx + 1}`}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div className="gallery-overlay">
                  <div className="gallery-view-btn">
                    <Eye size={13} /> View Photo
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
          >
            <button
              className="lightbox-close-btn"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(null);
              }}
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              {images.length > 1 && (
                <>
                  <button
                    className="lightbox-nav-btn lightbox-nav-prev"
                    onClick={() => setActiveIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0))}
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button
                    className="lightbox-nav-btn lightbox-nav-next"
                    onClick={() => setActiveIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0))}
                    aria-label="Next photo"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              <div className="lightbox-image-wrapper">
                <motion.img
                  key={activeIndex}
                  src={images[activeIndex]}
                  alt={`${destinationName} Full Photo ${activeIndex + 1}`}
                  className="lightbox-image"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 150 }}
                />
              </div>

              <div className="lightbox-info">
                {activeIndex + 1} of {images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
