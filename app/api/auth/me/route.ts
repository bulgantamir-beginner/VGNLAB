import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  getSessionFromRequest,
  verifyPassword,
  hashPassword,
  signSession,
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_OPTIONS,
} from "@/lib/auth";
import { rateLimit, parseBody } from "@/lib/api-guards";

export async function GET(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
  return NextResponse.json({
    user: { id: session.sub, email: session.email, role: session.role },
  });
}

const UpdateMeSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newEmail: z.string().email().optional(),
    newPassword: z.string().min(8, "New password must be at least 8 characters.").optional(),
  })
  .refine((data) => data.newEmail || data.newPassword, {
    message: "Provide at least a newEmail or a newPassword to update.",
  });

// PATCH /api/auth/me
// Change your own email and/or password. Requires the CURRENT password
// every time, regardless of which field is changing — this stops someone
// who's grabbed an open/unattended session from silently taking over the
// account by swapping the email or password without knowing the original.
export async function PATCH(request: NextRequest) {
  const limited = rateLimit(request, { limit: 5, windowMs: 60_000 });
  if (limited) return limited;

  const session = await getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const parsed = await parseBody(request, UpdateMeSchema);
  if ("response" in parsed) return parsed.response;
  const { currentPassword, newEmail, newPassword } = parsed.data;

  const user = await prisma.user.findUnique({ where: { id: session.sub } });
  if (!user) {
    return NextResponse.json({ error: "Account not found." }, { status: 404 });
  }

  const passwordValid = await verifyPassword(currentPassword, user.passwordHash);
  if (!passwordValid) {
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 401 });
  }

  if (newEmail && newEmail.toLowerCase() !== user.email) {
    const existing = await prisma.user.findUnique({ where: { email: newEmail.toLowerCase() } });
    if (existing) {
      return NextResponse.json({ error: "That email is already in use." }, { status: 409 });
    }
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...(newEmail && { email: newEmail.toLowerCase() }),
      ...(newPassword && { passwordHash: await hashPassword(newPassword) }),
    },
  });

  // Re-issue the session so the cookie reflects any email change and stays
  // valid — the old token would still verify fine, but keeping it in sync
  // avoids the JWT payload showing a stale email after the update.
  const token = await signSession({ sub: updated.id, email: updated.email, role: updated.role });

  const response = NextResponse.json({
    user: { id: updated.id, email: updated.email, role: updated.role },
  });
  response.cookies.set(SESSION_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);
  return response;
}
