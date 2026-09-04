import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { rateLimit, parseBody } from "@/lib/api-guards";

const NewsletterSchema = z.object({
  email: z.string().email("A valid email address is required."),
  source: z.enum(["newsletter", "footer"]).default("newsletter"),
});

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, { limit: 5, windowMs: 60_000 });
  if (limited) return limited;

  const parsed = await parseBody(request, NewsletterSchema);
  if ("response" in parsed) return parsed.response;
  const { email, source } = parsed.data;

  try {
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email: email.toLowerCase() },
      update: {},
      create: { email: email.toLowerCase(), source },
    });
    return NextResponse.json({ subscriber }, { status: 201 });
  } catch (err) {
    console.error("POST /api/newsletter failed:", err);
    return NextResponse.json({ error: "Failed to save subscription." }, { status: 500 });
  }
}
