import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyPassword, signSession, SESSION_COOKIE_NAME, SESSION_COOKIE_OPTIONS } from "@/lib/auth";
import { rateLimit, parseBody } from "@/lib/api-guards";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  // Stricter limit on login — this is the endpoint brute-force attempts hit.
  const limited = rateLimit(request, { limit: 8, windowMs: 60_000 });
  if (limited) return limited;

  const parsed = await parseBody(request, LoginSchema);
  if ("response" in parsed) return parsed.response;
  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

  // Same error for "no such user" and "wrong password" — don't leak which one.
  const invalid = () =>
    NextResponse.json({ error: "Invalid email or password." }, { status: 401 });

  if (!user) return invalid();

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return invalid();

  const token = await signSession({ sub: user.id, email: user.email, role: user.role });

  const response = NextResponse.json({
    user: { id: user.id, email: user.email, role: user.role },
  });
  response.cookies.set(SESSION_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);
  return response;
}
