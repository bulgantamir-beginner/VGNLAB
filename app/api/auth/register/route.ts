import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashPassword, signSession, SESSION_COOKIE_NAME, SESSION_COOKIE_OPTIONS } from "@/lib/auth";
import { rateLimit, parseBody } from "@/lib/api-guards";

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters."),
  // Optional: matches ADMIN_BOOTSTRAP_SECRET in .env to create an admin
  // account directly. Intended for one-time initial setup only.
  adminSecret: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, { limit: 5, windowMs: 60_000 });
  if (limited) return limited;

  const parsed = await parseBody(request, RegisterSchema);
  if ("response" in parsed) return parsed.response;
  const { email, password, adminSecret } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (existing) {
    return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
  }

  const isBootstrapAdmin =
    !!adminSecret &&
    !!process.env.ADMIN_BOOTSTRAP_SECRET &&
    adminSecret === process.env.ADMIN_BOOTSTRAP_SECRET;

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      passwordHash,
      role: isBootstrapAdmin ? "ADMIN" : "USER",
    },
  });

  const token = await signSession({ sub: user.id, email: user.email, role: user.role });

  const response = NextResponse.json(
    { user: { id: user.id, email: user.email, role: user.role } },
    { status: 201 }
  );
  response.cookies.set(SESSION_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);
  return response;
}
