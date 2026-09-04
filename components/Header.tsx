"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { navLinks } from "@/lib/data";

function HeaderContent() {
  const headerRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "";
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let lastScrollY = window.scrollY;
    const BG_THRESHOLD = 40;
    const HIDE_THRESHOLD = 150;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      header.classList.toggle("scrolled", currentScrollY > BG_THRESHOLD);

      if (currentScrollY > HIDE_THRESHOLD && currentScrollY > lastScrollY) {
        header.classList.add("hidden");
      } else if (currentScrollY < lastScrollY) {
        header.classList.remove("hidden");
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function updateQueryParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleCategoryClick(category: string) {
    updateQueryParam("category", category);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateQueryParam("q", query);
  }

  return (
    <header className="site_header" id="siteHeader" ref={headerRef}>
      <div className="scroll_banner">
        <div className="scroll_banner_track">
          <div className="banner_group">
            {Array.from({ length: 10 }).map((_, i) => (
              <div className="banner-item" key={`a-${i}`}>
                Subscribe to 10% OFF
              </div>
            ))}
          </div>
          <div className="banner_group">
            {Array.from({ length: 10 }).map((_, i) => (
              <div className="banner-item" key={`b-${i}`}>
                Subscribe to 10% OFF
              </div>
            ))}
          </div>
        </div>
      </div>

      <nav className="navbar">
        <div className="logo">
          <Image src="/images/logo.png" alt="VGN Logo" width={120} height={40} />
        </div>
        <ul>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href="#"
                className={activeCategory === link.category && link.category ? "active" : ""}
                onClick={(e) => {
                  if (link.category) {
                    e.preventDefault();
                    handleCategoryClick(link.category);
                  }
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="icons">
          {searchOpen ? (
            <form onSubmit={handleSearchSubmit} className="header-search-form">
              <input
                type="text"
                value={query}
                autoFocus
                placeholder="Search products..."
                onChange={(e) => setQuery(e.target.value)}
                onBlur={() => !query && setSearchOpen(false)}
              />
            </form>
          ) : (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSearchOpen(true);
              }}
            >
              <Image src="/images/search.png" alt="Search" width={20} height={20} />
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}

export default function Header() {
  return (
    <Suspense fallback={<header className="site_header" id="siteHeader" />}>
      <HeaderContent />
    </Suspense>
  );
}