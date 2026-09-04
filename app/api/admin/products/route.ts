import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/api-guards";

// Reachable only by an authenticated ADMIN — enforced by middleware.ts
// (matcher: /api/admin/:path*). This handler can assume the caller is
// already authorized.

const CreateProductSchema = z.object({
  slug: z.string().min(1),
  section: z.enum(["NEW_ARRIVALS", "BEST_SELLERS", "SPECIAL_OFFERS"]),
  title: z.string().min(1),
  href: z.string().default("#"),
  badges: z.array(z.string()).default([]),
  image: z.string().min(1),
  hoverImage: z.string().min(1),
  alt: z.string().min(1),
  oldPrice: z.string().min(1),
  newPrice: z.string().min(1),
  swatches: z
    .array(
      z.object({
        name: z.string().min(1),
        image: z.string().min(1),
        price: z.string().min(1),
        oldPrice: z.string().min(1),
      })
    )
    .default([]),
});

export async function GET() {
  const products = await prisma.product.findMany({
    include: { swatches: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  const parsed = await parseBody(request, CreateProductSchema);
  if ("response" in parsed) return parsed.response;
  const data = parsed.data;

  try {
  const product = await prisma.product.create({
    data: {
      slug: data.slug,
      section: data.section,
      title: data.title,
      href: data.href,
      badges: JSON.stringify(data.badges),
      image: data.image,
      hoverImage: data.hoverImage,
      alt: data.alt,
      oldPrice: data.oldPrice,
      newPrice: data.newPrice,
      swatches: data.swatches?.length
        ? { create: data.swatches.map((s, i) => ({ ...s, position: i })) }
        : undefined,
    },
    include: { swatches: true },
  });
  return NextResponse.json({ product }, { status: 201 });
} catch (err) {
  console.error("POST /api/admin/products failed:", err);
  return NextResponse.json({ error: "Failed to create product." }, { status: 500 });
}
}