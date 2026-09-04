"use client";

import NewsletterForm from "./NewsletterForm";

export function DragonflyHero() {
  return (
    <section className="dragonfly-hero">
      <div className="hero-bg-image"></div>
      <div className="hero-overlay-content">
        <h1 className="hero-title">VGN Dragonfly F1 Series</h1>
        <div className="title-divider"></div>
        <p className="hero-subtitle">
          Ultra-Lightweight 49g Wireless Gaming Mouse|Dual-Mode Connectivity
        </p>
        <a href="#" className="shop-now-btn">
          SHOP NOW
        </a>
      </div>
    </section>
  );
}

export function VHubSection() {
  return (
    <section className="vhub-section">
      <div className="vhub-bg"></div>
      <div className="vhub-content">
        <h2 className="vhub-title">VGN HUB</h2>
        <p className="vhub-desc">
          VGN HUB lets you optimize and customize all
          <br />
          compatible VGN devices
        </p>
        <a href="#" className="vhub-btn">
          LEARN MORE
        </a>
      </div>
    </section>
  );
}

export function DiscordSection() {
  return (
    <section className="discord-section">
      <div className="discord-container">
        <div className="discord-content">
          <h2 className="discord-title">JOIN OUR DISCORD</h2>
          <div className="discord-line"></div>
          <p className="discord-desc">
            Join thousands of VGNLAB users
            <br />
            Announcements|New-and-restocks|GIVE AWAY| MORE!
          </p>
          <a href="https://discord.gg" target="_blank" className="discord-btn" rel="noreferrer">
            JOIN NOW
          </a>
        </div>
      </div>
    </section>
  );
}

export function NewsletterSection() {
  return (
    <section className="newsletter-section">
      <div className="newsletter-banner">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Sign up for our newsletter</h2>
          <NewsletterForm
            className="newsletter-form"
            placeholder="Your email address"
            buttonLabel="Subscribe"
            source="newsletter"
          />
        </div>
      </div>

      <div className="features-container">
        <div className="feature-item">
          <svg
            className="feature-icon"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="4" y="16" width="22" height="18" rx="2"></rect>
            <path d="M26 22h10l5 6v6h-15v-12z"></path>
            <circle cx="12" cy="36" r="4"></circle>
            <circle cx="34" cy="36" r="4"></circle>
            <path d="M2 20h8"></path>
            <path d="M4 25h5"></path>
          </svg>
          <h3>Worldwide Shipping</h3>
        </div>

        <div className="feature-item">
          <svg
            className="feature-icon"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 16l-8 8 8 8"></path>
            <path d="M6 24h24a10 10 0 0 1 10 10v2"></path>
          </svg>
          <h3>7-Day Return Policy</h3>
        </div>

        <div className="feature-item">
          <svg
            className="feature-icon"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 6l10 12L34 6v8L24 26 14 14V6z"></path>
            <circle cx="24" cy="30" r="10"></circle>
            <polygon points="24,24 26,28 30,28 27,31 28,35 24,32 20,35 21,31 18,28 22,28"></polygon>
          </svg>
          <h3>12 Month Warranty</h3>
        </div>
      </div>
    </section>
  );
}
