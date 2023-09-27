import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/app/api/database/dbconnect";
import { getUser } from "./user";
import { decode } from "./decode";
type Data = {
  email: string;
  firstName: string;
  lastName: string;
};

export const isAuthorized = (request: NextRequest, role: string) => {
  const paylaod = decode(request);
  console.log(paylaod);
  //   const user = getUser(paylaod?.email);
};
