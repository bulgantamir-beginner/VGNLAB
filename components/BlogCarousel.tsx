"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { blogPosts } from "@/lib/data";

const CARDS_PER_PAGE = 3;
const GAP = 24;

export default function BlogCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const totalPages = Math.ceil(blogPosts.length / CARDS_PER_PAGE);

  function update() {
    const track = trackRef.current;
    const firstCard = firstCardRef.current;
    if (!track || !firstCard) return;
    const cardWidth = firstCard.offsetWidth;
    const moveAmount = (cardWidth + GAP) * CARDS_PER_PAGE * index;
    track.style.transform = `translateX(-${moveAmount}px)`;
  }

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <section className="blog-section">
      <div className="blog-header">
        <h2 className="blog-title">Featured Blog</h2>
        <a href="javascript:void(0)" className="view-all-btn">
          View all
        </a>
      </div>

      <div className="blog-carousel-container">
        <button
          className="nav-arrow left-arrow"
          id="prevBlogBtn"
          onClick={() => setIndex((i) => (i > 0 ? i - 1 : totalPages - 1))}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <div className="blog-viewport">
          <div className="blog-track" id="blogTrack" ref={trackRef}>
            {blogPosts.map((post, i) => (
              <article
                className="blog-card"
                key={post.title}
                ref={i === 0 ? firstCardRef : undefined}
              >
                <div className="blog-image-wrapper">
                  <Image src={post.image} alt={post.title} width={400} height={260} />
                </div>
                <div className="blog-info">
                  <h3 className="card-title">{post.title}</h3>
                  <p className="card-desc">{post.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button
          className="nav-arrow right-arrow"
          id="nextBlogBtn"
          onClick={() => setIndex((i) => (i < totalPages - 1 ? i + 1 : 0))}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
}
