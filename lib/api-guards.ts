import { NextRequest, NextResponse } from "next/server";
import { ZodSchema } from "zod";
import { getSessionFromRequest } from "@/lib/auth";

/**
 * ---------------------------------------------------------------------
 * 1. METHOD GUARD
 * Not usually needed in App Router — a route.ts only exports the methods
 * it supports (GET/POST/etc.), and Next.js auto-returns 405 for the rest.
 * ---------------------------------------------------------------------
 */
export function requireMethod(request: NextRequest, allowed: string[]) {
  if (!allowed.includes(request.method)) {
    return NextResponse.json(
      { error: `Method ${request.method} not allowed.` },
      { status: 405, headers: { Allow: allowed.join(", ") } }
    );
  }
  return null;
}

/**
 * ---------------------------------------------------------------------
 * 2. AUTH GUARDS
 * requireAuth: any signed-in user. requireAdmin: must be role ADMIN.
 * Use these inside individual route handlers; middleware.ts covers
 * whole path prefixes (/admin, /api/admin) centrally — use both where
 * it makes sense, they're not mutually exclusive.
 * ---------------------------------------------------------------------
 */
export async function requireAuth(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!session) {
    return { response: NextResponse.json({ error: "Not signed in." }, { status: 401 }) };
  }
  return { session };
}

export async function requireAdmin(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!session) {
    return { response: NextResponse.json({ error: "Not signed in." }, { status: 401 }) };
  }
  if (session.role !== "ADMIN") {
    return { response: NextResponse.json({ error: "Admin access required." }, { status: 403 }) };
  }
  return { session };
}

/**
 * ---------------------------------------------------------------------
 * 3. API KEY GUARD (for machine-to-machine calls, not browser sessions)
 * ---------------------------------------------------------------------
 */
export function requireApiKey(request: NextRequest) {
  const key = request.headers.get("x-api-key");
  if (!key || key !== process.env.API_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return null;
}

/**
 * ---------------------------------------------------------------------
 * 4. RATE LIMIT GUARD
 * In-memory fixed-window limiter — fine for a single server instance.
 * For serverless/multi-instance production, back this with Redis
 * (e.g. Upstash) instead so limits are shared across instances.
 * ---------------------------------------------------------------------
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  request: NextRequest,
  { limit = 10, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {}
) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const now = Date.now();
  const record = hits.get(ip);

  if (!record || now > record.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + windowMs });
    return null;
  }

  if (record.count >= limit) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  record.count += 1;
  return null;
}

/**
 * ---------------------------------------------------------------------
 * 5. BODY VALIDATION GUARD (zod)
 * ---------------------------------------------------------------------
 */
export async function parseBody<T>(
  request: NextRequest,
  schema: ZodSchema<T>
): Promise<{ data: T } | { response: NextResponse }> {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return { response: NextResponse.json({ error: "Invalid JSON body." }, { status: 400 }) };
  }

  const result = schema.safeParse(json);
  if (!result.success) {
    return {
      response: NextResponse.json(
        { error: "Validation failed.", issues: result.error.flatten() },
        { status: 400 }
      ),
    };
  }

  return { data: result.data };
}
