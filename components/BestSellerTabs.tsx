"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Product } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function BestSellerTabs({
  bestSellers,
  specialOffers,
}: {
  bestSellers: Product[];
  specialOffers: Product[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") === "special-offers" ? "special-offers" : "best-sellers";

  function setTab(tab: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="best_seller">
      <div className="bestseller-tabs">
        <button
          className={`bestseller-tab ${activeTab === "best-sellers" ? "active" : ""}`}
          onClick={() => setTab("best-sellers")}
        >
          BEST SELLERS
        </button>
        <button
          className={`bestseller-tab ${activeTab === "special-offers" ? "active" : ""}`}
          onClick={() => setTab("special-offers")}
        >
          SPECIAL OFFERS
        </button>
      </div>

      <div
        className={`product-grid bestseller-panel ${activeTab === "best-sellers" ? "active" : ""}`}
        id="panel-best-sellers"
        hidden={activeTab !== "best-sellers"}
      >
        {bestSellers.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>

      <div
        className={`product-grid bestseller-panel ${activeTab === "special-offers" ? "active" : ""}`}
        id="panel-special-offers"
        hidden={activeTab !== "special-offers"}
      >
        {specialOffers.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
    </div>
  );
}
