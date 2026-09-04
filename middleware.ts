import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";

// Runs on the Edge runtime, before the request reaches any route/page —
// this is the right place for guards that should apply across many paths
// at once, as opposed to per-route checks in individual route.ts files.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPath = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  if (!isAdminPath) {
    return NextResponse.next();
  }

  const token = request.cookies.get("session")?.value;
  const session = token ? await verifySession(token) : null;

  if (!session || session.role !== "ADMIN") {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Admin access required." }, { status: 403 });
    }
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
