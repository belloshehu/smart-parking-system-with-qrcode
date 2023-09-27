import { NextResponse } from "next/server";
import connectDB from "./app/api/database/dbconnect";
import User from "./app/api/models/user";
import jwt from "jsonwebtoken";
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

export async function middleware(request: Request) {
  const origin = request.headers.get("origin");

  if (request.url.includes("/space")) {
    const data = await authenticateUser(request);
    console.log(data);
    console.log(request.url);
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
