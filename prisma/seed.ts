import { PrismaClient } from "@prisma/client";
import { products as staticProducts } from "../lib/data";

const prisma = new PrismaClient();

const sectionMap: Record<string, string> = {
  "new-arrivals": "NEW_ARRIVALS",
  "best-sellers": "BEST_SELLERS",
  "special-offers": "SPECIAL_OFFERS",
};

async function main() {
  console.log(`Seeding ${staticProducts.length} products...`);

  await prisma.swatch.deleteMany();
  await prisma.product.deleteMany();

  for (const p of staticProducts) {
    await prisma.product.create({
      data: {
        slug: p.id,
        section: sectionMap[p.section],
        title: p.title,
        href: p.href,
        badges: JSON.stringify(p.badges),
        image: p.image,
        hoverImage: p.hoverImage,
        alt: p.alt,
        oldPrice: p.oldPrice,
        newPrice: p.newPrice,
        swatches: {
          create: p.swatches.map((s, i) => ({
            name: s.name,
            image: s.image,
            price: s.price,
            oldPrice: s.oldPrice,
            position: i,
          })),
        },
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
