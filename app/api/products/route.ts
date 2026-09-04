import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/products";
import { rateLimit } from "@/lib/api-guards";

// GET /api/products?category=keyboards&q=neon&tab=best-sellers
export async function GET(request: NextRequest) {
  const limited = rateLimit(request, { limit: 60, windowMs: 60_000 });
  if (limited) return limited;

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? undefined;
  const q = searchParams.get("q") ?? undefined;
  const tab = searchParams.get("tab") ?? undefined;

  try {
    const results = await getProducts({ category, q, tab });
    return NextResponse.json({ count: results.length, products: results });
  } catch (err) {
    console.error("GET /api/products failed:", err);
    return NextResponse.json(
      { error: "Failed to load products from the database." },
      { status: 500 }
    );
  }
}
