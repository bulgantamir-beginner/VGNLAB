"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { slides } from "@/lib/data";

const AUTOPLAY_MS = 5000;

export default function Hero() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToSlide = useCallback((index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const next = (index + slides.length) % slides.length;
    slider.scrollTo({ left: slider.clientWidth * next, behavior: "smooth" });
    setCurrent(next);
  }, []);

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        const next = (c + 1) % slides.length;
        const slider = sliderRef.current;
        if (slider) {
          slider.scrollTo({ left: slider.clientWidth * next, behavior: "smooth" });
        }
        return next;
      });
    }, AUTOPLAY_MS);
  }, []);

  const stopAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const onScroll = () => {
      const index = Math.round(slider.scrollLeft / slider.clientWidth);
      setCurrent((c) => (c !== index ? index : c));
    };

    const onResize = () => {
      slider.scrollTo({ left: slider.clientWidth * current, behavior: "auto" });
    };

    slider.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      slider.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="hero-slider">
      <div
        className="slide_content"
        id="slideContent"
        ref={sliderRef}
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
      >
        {slides.map((slide, i) => (
          <div className={`slide-item ${slide.theme ?? ""}`} key={i}>
            <Image
              src={slide.image}
              alt={`Slide ${i + 1}`}
              fill
              sizes="100vw"
              priority={i === 0}
              style={{ objectFit: "cover" }}
            />
            {slide.title && (
              <div className="overlay-content">
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-text">{slide.text}</p>
                <a href="#" className="shop-now-btn">
                  SHOP NOW
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="slide-dots" id="slideDots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${current === i ? "active" : ""}`}
            data-index={i}
            onClick={() => {
              goToSlide(i);
              startAutoplay();
            }}
          />
        ))}
      </div>
    </div>
  );
}
