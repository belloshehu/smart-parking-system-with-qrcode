import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "../database/dbconnect";
import Reservation from "../models/reservation";
import Space from "../models/space";

export async function POST(request: NextRequest) {
  try {
    connectDB();
    const { duration, checkInDate, checkInTime, amount, spaceId, userId } =
      await request.json();

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
  try {
    connectDB();
    const query = await Reservation.find();

    const reservations = await Reservation.populate(query, "space");
    return NextResponse.json(
      {
        reservations,
        length: reservations.length,
      },
      { status: StatusCodes.OK }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
}
