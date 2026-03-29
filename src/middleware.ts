import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes — accessible without auth
const PUBLIC_ROUTES = ["/", "/auth", "/onboarding"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes and static assets
  if (
    PUBLIC_ROUTES.some((route) => pathname === route) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.match(/\.(jpg|jpeg|png|svg|ico|webp|gif)$/)
  ) {
    return NextResponse.next();
  }

  // Check for auth session cookie (Supabase sets this)
  const hasSession =
    request.cookies.has("sb-cgnhfkzqumqeuggtykfw-auth-token") ||
    request.cookies.has("supabase-auth-token");

  if (!hasSession) {
    const loginUrl = new URL("/auth", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
