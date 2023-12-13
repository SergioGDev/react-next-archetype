import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const authTokens = request.cookies.get("authTokens")?.value;
  const pathName = request.nextUrl.pathname;

  if (pathName === '/') {
      const response = NextResponse.redirect(new URL("/login", request.url));
      return response;
  }

  if ((pathName.startsWith("/admin") || pathName.startsWith('/list-data')) && !authTokens) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("authTokens");
    return response;
  }

  if (authTokens && pathName.startsWith("/login")) {
    const response = NextResponse.redirect(new URL("/admin/dashboard", request.url));
    return response;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin(.*)", "/login", '/'],
};
