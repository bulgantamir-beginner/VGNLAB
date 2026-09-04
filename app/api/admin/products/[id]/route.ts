import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/api-guards";

// Reachable only by an authenticated ADMIN — enforced by middleware.ts.

const UpdateProductSchema = z.object({
  section: z.enum(["NEW_ARRIVALS", "BEST_SELLERS", "SPECIAL_OFFERS"]).optional(),
  title: z.string().min(1).optional(),
  href: z.string().optional(),
  badges: z.array(z.string()).optional(),
  image: z.string().min(1).optional(),
  hoverImage: z.string().min(1).optional(),
  alt: z.string().min(1).optional(),
  oldPrice: z.string().min(1).optional(),
  newPrice: z.string().min(1).optional(),
  swatches: z
    .array(
      z.object({
        name: z.string().min(1),
        image: z.string().min(1),
        price: z.string().min(1),
        oldPrice: z.string().min(1),
      })
    )
    .optional(),
});

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { swatches: true },
  });
  if (!product) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ product });
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const parsed = await parseBody(request, UpdateProductSchema);
  if ("response" in parsed) return parsed.response;
  const data = parsed.data;

  try {
    const product = await prisma.$transaction(async (tx) => {
      if (data.swatches) {
        await tx.swatch.deleteMany({ where: { productId: id } });
      }
      return tx.product.update({
        where: { id },
        data: {
          ...(data.section && { section: data.section }),
          ...(data.title && { title: data.title }),
          ...(data.href && { href: data.href }),
          ...(data.badges && { badges: JSON.stringify(data.badges) }),
          ...(data.image && { image: data.image }),
          ...(data.hoverImage && { hoverImage: data.hoverImage }),
          ...(data.alt && { alt: data.alt }),
          ...(data.oldPrice && { oldPrice: data.oldPrice }),
          ...(data.newPrice && { newPrice: data.newPrice }),
          ...(data.swatches && {
            swatches: { create: data.swatches.map((s, i) => ({ ...s, position: i })) },
          }),
        },
        include: { swatches: true },
      });
    });
    return NextResponse.json({ product });
  } catch (err) {
    console.error(`PUT /api/admin/products/${id} failed:`, err);
    return NextResponse.json({ error: "Failed to update product." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(`DELETE /api/admin/products/${id} failed:`, err);
    return NextResponse.json({ error: "Failed to delete product." }, { status: 500 });
  }
}
