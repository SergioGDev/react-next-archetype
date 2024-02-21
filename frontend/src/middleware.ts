import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_TOKEN, USER_DATA } from "./context/AuthContext/authContext.consts";
import { Role } from "./types/roles.types";
import { UserData } from "./context/AuthContext/authContext.types";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const authToken = request.cookies.get(AUTH_TOKEN)?.value;
  const userData = request.cookies.get(USER_DATA)?.value;
  const pathName = request.nextUrl.pathname;

  if (pathName === '/') {
      const response = NextResponse.redirect(new URL("/login", request.url));
      return response;
  }

  if (pathName.startsWith("/dashboard") && !authToken) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete(AUTH_TOKEN);
    return response;
  }
  
  if (pathName.startsWith("/dashboard/user-list")) {
    if (userData) {
      const userRole: Role = (JSON.parse(userData) as UserData).role;
      
      if (userRole !== 'ADMIN_ROLE') {
        const response = NextResponse.redirect(new URL("/dashboard/home", request.url));
        return response;
      }
    } else {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete(AUTH_TOKEN);
      return response;
    }
  }

  if (authToken && pathName.startsWith("/login")) {
    const response = NextResponse.redirect(new URL("/dashboard/home", request.url));
    return response;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard(.*)", "/login", '/'],
};
