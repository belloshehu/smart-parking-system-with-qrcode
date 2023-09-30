import { NextRequest, NextResponse } from "next/server";
import { authenticateUser } from "./utils/authentication";

const allowedOrigin =
  process.env.NODE_ENV === "development"
    ? [
        "http://localhost:3000",
        "https://www.google.com",
        "ewanki-mobile-app",
        "http://localhost:19006",
      ]
    : ["http://smart-parking-system.vercel.app"];

export async function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (request.nextUrl.pathname.endsWith("/space")) {
    const decoded = authenticateUser(request);
    console.log(decoded);
    console.log("authenticating users");
  }

  if (origin && !allowedOrigin.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request",
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
