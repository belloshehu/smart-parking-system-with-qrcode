import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const decode = async (request: NextRequest) => {
  const token = request.headers.get("authorization")?.split(" ")[1] as string;
  console.log(token);
  const paylaod = jwt.verify(token, process.env.JWT_SECRET_KEY!);
  console.log(paylaod);
  return paylaod;
};
