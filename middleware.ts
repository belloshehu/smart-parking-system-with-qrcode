import { NextResponse } from "next/server";

const allowedOrigin =
  process.env.NODE_ENV === "development"
    ? [
        "http://localhost:3000",
        "https://www.google.com",
        "ewanki-mobile-app",
        "http://localhost:19006",
      ]
    : ["http://smart-parking-system.vercel.app"];

export function middleware(request: Request) {
  const origin = request.headers.get("origin");
  console.log(origin);
  if (origin && !allowedOrigin.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request",
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  console.log(request.url);
  console.log(request.method);
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
