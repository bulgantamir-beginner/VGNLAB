import { prisma } from "@/lib/prisma";
import type { Product as DbProduct, Swatch as DbSwatch, ProductSection } from "@prisma/client";

export type Swatch = {
  name: string;
  image: string;
  price: string;
  oldPrice: string;
};

export type Product = {
  id: string;
  section: "new-arrivals" | "best-sellers" | "special-offers";
  title: string;
  href: string;
  badges: string[];
  image: string;
  hoverImage: string;
  alt: string;
  oldPrice: string;
  newPrice: string;
  swatches: Swatch[];
};

const sectionToDb: Record<Product["section"], ProductSection> = {
  "new-arrivals": "NEW_ARRIVALS",
  "best-sellers": "BEST_SELLERS",
  "special-offers": "SPECIAL_OFFERS",
};

const sectionFromDb: Record<ProductSection, Product["section"]> = {
  NEW_ARRIVALS: "new-arrivals",
  BEST_SELLERS: "best-sellers",
  SPECIAL_OFFERS: "special-offers",
};

type DbProductWithSwatches = DbProduct & { swatches: DbSwatch[] };

function mapProduct(p: DbProductWithSwatches): Product {
  return {
    id: p.slug,
    section: sectionFromDb[p.section],
    title: p.title,
    href: p.href,
    badges: JSON.parse(p.badges) as string[],
    image: p.image,
    hoverImage: p.hoverImage,
    alt: p.alt,
    oldPrice: p.oldPrice,
    newPrice: p.newPrice,
    swatches: p.swatches
      .sort((a, b) => a.position - b.position)
      .map((s) => ({ name: s.name, image: s.image, price: s.price, oldPrice: s.oldPrice })),
  };
}

export type ProductFilters = {
  category?: string;
  q?: string;
  tab?: string;
};

function categoryMatches(category: string, title: string): boolean {
  const isKeyboard = /keyboard|hub|flash|neon|v98|v87/i.test(title);
  const isMouse = /mouse|dragonfly/i.test(title);
  switch (category) {
    case "keyboards":
      return isKeyboard;
    case "mouse":
      return isMouse;
    case "headsets":
      return /headset|siren/i.test(title);
    case "accessories":
      return false;
    case "deals":
      return true; // narrowed further by badge check in caller
    default:
      return true;
  }
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const { category, q, tab } = filters;

  const where: Record<string, unknown> = {};
  if (tab === "best-sellers" || tab === "special-offers" || tab === "new-arrivals") {
    where.section = sectionToDb[tab];
  }
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { swatches: { some: { name: { contains: q, mode: "insensitive" } } } },
    ];
  }

  const dbProducts = await prisma.product.findMany({
    where,
    include: { swatches: true },
    orderBy: { createdAt: "asc" },
  });

  let results = dbProducts.map(mapProduct);

  if (category) {
    results = results.filter((p) => {
      if (category === "deals") return p.badges.some((b) => /sale/i.test(b));
      return categoryMatches(category, p.title);
    });
  }

  return results;
}

export async function getProductsBySection() {
  const all = await prisma.product.findMany({
    include: { swatches: true },
    orderBy: { createdAt: "asc" },
  });
  const mapped = all.map(mapProduct);
  return {
    newArrivals: mapped.filter((p) => p.section === "new-arrivals"),
    bestSellers: mapped.filter((p) => p.section === "best-sellers"),
    specialOffers: mapped.filter((p) => p.section === "special-offers"),
  };
}
