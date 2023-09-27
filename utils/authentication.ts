import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export const authenticateUser = async (request: Request) => {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return NextResponse.json(
      { message: "Unauthenticated" },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    console.log(decoded, "in");
    return decoded;
  } catch (error: any) {
    console.log(error, "error");
  }
};
