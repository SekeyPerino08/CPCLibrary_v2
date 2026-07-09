import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("cpc_token")?.value ?? null;

  // Allow Next.js internals, backend API, and favicon
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname === "/favicon.ico") {
    return NextResponse.next();
  }

  if (pathname === "/login") {
    if (token) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Protected routes
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};


