"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayImage, setDisplayImage] = useState(product.image);
  const [price, setPrice] = useState(product.newPrice);
  const [oldPrice, setOldPrice] = useState(product.oldPrice);
  const [fading, setFading] = useState(false);
  const [tooltip, setTooltip] = useState<{ text: string; left: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isHoveringCard = useRef(false);

  function swapImage(src: string) {
    if (src === displayImage) return;
    setFading(true);
    setTimeout(() => {
      setDisplayImage(src);
      setFading(false);
    }, 150);
  }

  function selectSwatch(index: number) {
    const swatch = product.swatches[index];
    setActiveIndex(index);
    swapImage(swatch.image);
    setPrice(swatch.price);
    setOldPrice(swatch.oldPrice);
  }

  function handleCardMouseEnter() {
    isHoveringCard.current = true;
    swapImage(product.hoverImage);
  }

  function handleCardMouseLeave() {
    isHoveringCard.current = false;
    swapImage(product.swatches[activeIndex]?.image ?? product.image);
  }

  function handleSwatchEnter(e: React.MouseEvent<HTMLSpanElement>, index: number) {
    const swatch = product.swatches[index];
    selectSwatch(index);

    if (cardRef.current) {
      const swatchRect = e.currentTarget.getBoundingClientRect();
      const cardRect = cardRef.current.getBoundingClientRect();
      const left = swatchRect.left - cardRect.left + swatchRect.width / 2;
      setTooltip({ text: swatch.name, left });
    }
  }

  function handleSwatchLeave() {
    setTooltip(null);
  }

  return (
    <div
      className="product-card"
      ref={cardRef}
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleCardMouseLeave}
    >
      {product.badges.map((badge, i) => (
        <span
          className={`sale-badge ${/free/i.test(badge) ? "free" : ""}`}
          key={i}
        >
          {badge}
        </span>
      ))}

      <a href={product.href} className="product-image-link">
        <Image
          className="product-image"
          src={displayImage}
          alt={product.alt}
          width={400}
          height={400}
          style={{ opacity: fading ? 0 : 1, transition: "opacity 0.25s ease-in-out" }}
        />
      </a>

      <div className="promo-marquee">
        <div className="promo-marquee-track">
          <span className="promo-item">🔥 Subscribe to 10% OFF | Code: VGNLAB</span>
          <span className="promo-item">🔥 Subscribe to 10% OFF | Code: VGNLAB</span>
        </div>
      </div>

      <div className="product-title">
        <a href={product.href}>{product.title}</a>
      </div>

      <div className="product-price">
        <span className="old-price">{oldPrice}</span>
        <span className="new-price">{price}</span>
      </div>

      <div className="swatches">
        {product.swatches.map((swatch, i) => (
          <span
            key={swatch.name}
            className={`swatch ${activeIndex === i ? "active" : ""}`}
            style={{ backgroundImage: `url('${swatch.image}')` }}
            onMouseEnter={(e) => handleSwatchEnter(e, i)}
            onClick={() => selectSwatch(i)}
            onMouseLeave={handleSwatchLeave}
          />
        ))}
        <span
          className={`swatch-tooltip ${tooltip ? "visible" : ""}`}
          style={tooltip ? { left: `${tooltip.left}px` } : undefined}
        >
          {tooltip?.text}
        </span>
      </div>

      <button className="choose-options">Choose Options</button>
    </div>
  );
}
