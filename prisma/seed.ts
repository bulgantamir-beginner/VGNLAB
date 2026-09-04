import { PrismaClient, ProductSection } from "@prisma/client";
import { products as staticProducts } from "../lib/data";

const prisma = new PrismaClient();

const sectionMap: Record<string, ProductSection> = {
  "new-arrivals": ProductSection.NEW_ARRIVALS,
  "best-sellers": ProductSection.BEST_SELLERS,
  "special-offers": ProductSection.SPECIAL_OFFERS,
};

async function main() {
  // Set by docker-compose so restarts don't wipe admin edits; plain `npm run db:seed` still resets.
  if (process.env.SEED_IF_EMPTY && (await prisma.product.count()) > 0) {
    console.log("Products already exist, skipping seed.");
    return;
  }

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