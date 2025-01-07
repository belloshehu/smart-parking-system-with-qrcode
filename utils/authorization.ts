import { NextRequest, NextResponse } from "next/server";
import User from "@/app/api/models/user";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

export const checkAuthorization = async (
  request: NextRequest,
  role: string
) => {
  try {
    const token: any = request.cookies.get("token")?.value;
    if (!token) {
      NextResponse.redirect("/login");
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    const userId = decoded?.id;
    const user = await User.findById(userId);
    if (user.role !== role) {
      return NextResponse.json(
        { message: "You are not authorized" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.redirect("/");
  }
};
