// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Kalau belum login, block akses ke /admin dan /user
    if (!token && (pathname.startsWith("/admin") || pathname.startsWith("/user"))) {
      return NextResponse.redirect(new URL("/not-found", req.url));
    }

    // Cek role untuk /admin
    if (pathname.startsWith("/admin")) {
      if (token?.role !== "admin") {
        return NextResponse.redirect(new URL("/not-found", req.url));
      }
    }

    // Cek role untuk /user
    if (pathname.startsWith("/user")) {
      if (token?.role !== "user") {
        return NextResponse.redirect(new URL("/not-found", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // biar next-auth nggak auto redirect
    },
  }
);

// Tentukan route yang kena middleware
export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
