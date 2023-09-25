import { NextResponse } from "next/server";

export function GET(request: Request) {
  //   return NextResponse.json({ message: "hello world" }, { status: 200 });
  const origin = request.headers.get("origin");
  return new NextResponse(JSON.stringify({ message: "Hello world" }), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": origin || "*",
      "Content-Type": "application/json",
    },
  });
}

export function POST(request: Request) {
  //   return NextResponse.json({ message: "hello world" }, { status: 200 });
  const origin = request.headers.get("origin");
  return new NextResponse(JSON.stringify({ message: "Hello world" }), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": origin || "*",
      "Content-Type": "application/json",
    },
  });
}
