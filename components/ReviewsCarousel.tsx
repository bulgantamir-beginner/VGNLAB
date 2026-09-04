"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { reviews } from "@/lib/data";

const TOTAL_PAGES = 2;
const GAP = 24;

export default function ReviewsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  function update() {
    const track = trackRef.current;
    const firstCard = firstCardRef.current;
    if (!track || !firstCard) return;
    const cardWidth = firstCard.offsetWidth;
    const moveAmount = (cardWidth + GAP) * currentIndex;
    track.style.transform = `translateX(-${moveAmount}px)`;
  }

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <section className="reviews-section">
      <h2 className="section-title">Let Customers Speak For Us</h2>

      <div className="carousel-container">
        <button
          className="nav-arrow left-arrow"
          id="prevBtn"
          onClick={() => setCurrentIndex((i) => (i > 0 ? i - 1 : TOTAL_PAGES - 1))}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <div className="carousel-viewport">
          <div className="carousel-track" id="track" ref={trackRef}>
            {reviews.map((review, i) => (
              <div
                className="review-card"
                key={review.title}
                ref={i === 0 ? firstCardRef : undefined}
              >
                <div className="image-wrapper">
                  <Image src={review.image} alt={review.alt} width={400} height={300} />
                </div>
                <h3 className="review-title">{review.title}</h3>
                <div className="stars">★★★★★</div>
                <p className="review-text">{review.text}</p>
                <span className="review-date">{review.date}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          className="nav-arrow right-arrow"
          id="nextBtn"
          onClick={() => setCurrentIndex((i) => (i < TOTAL_PAGES - 1 ? i + 1 : 0))}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <div className="dots-container">
        {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
          <span
            key={i}
            className={`dot ${currentIndex === i ? "active" : ""}`}
            data-index={i}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
