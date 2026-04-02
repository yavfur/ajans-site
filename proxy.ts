import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // JWT session cookie (NextAuth v5 default)
  const sessionCookie =
    request.cookies.get("authjs.session-token") ||
    request.cookies.get("__Secure-authjs.session-token");

  const isLoggedIn = !!sessionCookie;

  // Admin ve dashboard rotaları için giriş zorunlu
  if ((pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/giris", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
