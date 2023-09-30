import { NextRequest, NextResponse } from "next/server";
import User from "../models/user";
import connectDB from "../database/dbconnect";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  await connectDB();
  //request body
  const { email, password } = await request.json();
  console.log(email, password);
  if (!email)
    return NextResponse.json(
      { message: "email is required", success: false },
      { status: StatusCodes.BAD_REQUEST }
    );
  if (!password)
    return NextResponse.json(
      {
        message: "password is required",
        success: false,
      },
      { status: StatusCodes.BAD_REQUEST }
    );

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      {
        message: "Incorrect email or password",
        success: false,
      },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  const isMatch = user.comparePassword(password);

  if (!isMatch) {
    return NextResponse.json(
      {
        message: "Incorrect email or password",
        success: false,
      },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "30d",
  });

  const response = NextResponse.json({
    message: "logged in successfully",
    user: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    token,
    success: true,
  });

  response.cookies.set("token", token, { httpOnly: false });
  return response;
}
