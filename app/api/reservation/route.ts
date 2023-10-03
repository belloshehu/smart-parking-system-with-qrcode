import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "../database/dbconnect";
import Reservation from "../models/reservation";
import Space from "../models/space";
import jwt from "jsonwebtoken";
import User from "../models/user";

export async function POST(request: NextRequest) {
  try {
    connectDB();
    const token: any = request.cookies.get("token")?.value;
    if (!token) {
      NextResponse.redirect("/auth/login");
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    if (!decoded) {
      return NextResponse.json(
        { message: "Please login" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }
    const id = decoded?.id;
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { message: "Please login" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }
    const {
      duration,
      checkInDate,
      checkInTime,
      amount,
      spaceId,
      userId,
      vehicleNumber,
      paymentReference,
    } = await request.json();

    if (!duration) {
      return NextResponse.json(
        { message: "Reservation duration required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    if (!checkInDate) {
      return NextResponse.json(
        { message: "Reservation checkIn date required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    if (!checkInTime) {
      return NextResponse.json(
        { message: "Reservation checkIn time required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    if (!amount) {
      return NextResponse.json(
        { message: "Reservation amount/cost required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    if (!userId) {
      return NextResponse.json(
        { message: "Reservation user ID required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    if (!spaceId) {
      return NextResponse.json(
        { message: "Reservation space ID required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    if (!vehicleNumber) {
      return NextResponse.json(
        { message: "Vechile number required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    if (!paymentReference) {
      return NextResponse.json(
        { message: "Payment Reference required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    // check if space is not reserved that day
    const existingReservation = await Space.findById(spaceId);
    if (existingReservation.status !== "free") {
      return NextResponse.json(
        {
          message: `Space with ID ${existingReservation.id} is not free`,
          existingReservation,
        },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const reservation = await Reservation.create({
      duration,
      checkInDate,
      checkInTime,
      amount,
      user: userId,
      space: spaceId,
      status: "valid",
      vehicleNumber,
      paymentReference,
    });

    existingReservation.status = "occupied";
    await existingReservation.save();

    return NextResponse.json(
      {
        message: "Reservation created successfully",
        reservation,
      },
      { status: StatusCodes.CREATED }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
}

export async function GET(request: NextRequest) {
  // get reservations by a user
  try {
    const token: any = request.cookies.get("token")?.value;
    if (!token) {
      NextResponse.redirect("/auth/login");
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    if (!decoded) {
      return NextResponse.json(
        { message: "Please login" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }
    const userId = decoded?.id;
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "Please login" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }
    if (user.role === "admin" || userId === user._id.toHexString()) {
      const query = await Reservation.find({ user: userId });
      const reservations = await Reservation.populate(query, "space");
      return NextResponse.json(
        {
          reservations,
          length: reservations.length,
        },
        { status: StatusCodes.OK }
      );
    } else {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
}

export async function PATCH(request: NextRequest) {}
