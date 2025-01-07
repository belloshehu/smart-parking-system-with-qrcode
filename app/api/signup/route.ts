import { NextRequest, NextResponse } from "next/server";
import connectDB from "../database/dbconnect";
import User from "../models/user";
import { sendVerificationEmail } from "../../../utils/mailer";
import { StatusCodes } from "http-status-codes";
import { error } from "console";

export async function POST(request: NextRequest) {
  await connectDB();
  // request body data
  try {
    const { email, password, firstName, lastName } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "email is required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    if (!firstName) {
      return NextResponse.json(
        { message: "first name is required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    if (!lastName) {
      return NextResponse.json(
        { message: "other name is required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    if (!password) {
      return NextResponse.json(
        { message: "password is required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const user = await User.create({
      email,
      firstName,
      lastName,
      password,
    });

    // send email to user's email address

    // await sendVerificationEmail({
    //   email,
    //   emailType: "VERIFY_EMAIL",
    //   userId: user._id,
    // });

    return NextResponse.json(
      {
        message: "Signed up successfully",
        user,
        verificationCodeExpiry:
          parseInt(process.env.V_CODE_EXPIRATION as string) / 1000,
      },
      { status: StatusCodes.OK }
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
}
