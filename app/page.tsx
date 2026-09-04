import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import BestSellerTabs from "@/components/BestSellerTabs";
import { DragonflyHero, DiscordSection, NewsletterSection } from "@/components/StaticSections";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import AboutHotspots from "@/components/AboutHotspots";
import BlogCarousel from "@/components/BlogCarousel";
import TikTokSection from "@/components/TikTokSection";
import DriverDownloads from "@/components/DriverDownloads";
import { getProductsBySection } from "@/lib/products";

// Always hit the DB for fresh product/pricing data instead of caching the page.
export const dynamic = "force-dynamic";

export default async function Home() {
  const { newArrivals, bestSellers, specialOffers } = await getProductsBySection();

  return (
    <>
      <Hero />

      <div className="content_category">
        <CategoryGrid />
        <h2>New Arrivals</h2>
        <ProductGrid products={newArrivals} />
      </div>

      <DragonflyHero />

      <BestSellerTabs bestSellers={bestSellers} specialOffers={specialOffers} />

      <DriverDownloads />

      <ReviewsCarousel />
      <AboutHotspots />
      <BlogCarousel />
      <TikTokSection />
      <DiscordSection />
      <NewsletterSection />
    </>
  );
}
