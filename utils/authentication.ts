import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
// import jwt from "jsonwebtoken";

export const authenticateUser = (request: NextRequest) => {
  // let decoded = null;
  // try {
  //   const token = request.cookies.get("token")?.value as string;
  //   if (!token) {
  //     NextResponse.json(
  //       { message: "Unauthenticated" },
  //       { status: StatusCodes.BAD_REQUEST, url: "/login" }
  //     );
  //   }
  //   decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
  // } catch (error: any) {
  //   NextResponse.redirect("/login");
  //   console.log(error);
  // } finally {
  //   return { decoded };
  // }
};
