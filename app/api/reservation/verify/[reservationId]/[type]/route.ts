import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import Space from "../../../../models/space";
import connectDB from "../../../../database/dbconnect";
import { checkAuthorization } from "@/utils/authorization";
import jwt from "jsonwebtoken";
import Reservation from "../../../../models/reservation";

export async function GET(
  request: NextRequest,
  {
    params,
  }: { params: { reservationId: string; type: "checkin" | "checkout" } }
) {
  try {
    connectDB();
    const { reservationId, type } = params;

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return NextResponse.json(
        { message: "Invalid reservation", status: false },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    const space = await Space.findById(reservation.space);
    const { checkInDate, checkInTime, duration } = reservation;

    const checkInDateISOString = checkInDate.toISOString().slice(0, 11);
    const formatedCheckInDate = new Date(
      checkInDateISOString + checkInTime
    ).getTime();

    const formatedCheckOutDate =
      new Date(checkInDateISOString + checkInTime).getTime() +
      duration * 60 * 1000;

    const now = new Date().getTime();
    const expired = now > formatedCheckInDate;
    const timeDiff = Math.round((now - formatedCheckInDate) / (1000 * 60));
    let message = "";
    let amount = 0;
    let access = "false";

    if (type === "checkin" && expired) {
      message = "Reservation expired";
      access = "false";
    } else if (type === "checkin") {
      message = `Welcome ${Math.abs(timeDiff)} mins.`;
      access = "true";
    } else if (type === "checkout" && now - formatedCheckOutDate > 10000 * 60) {
      message = `${timeDiff} min Overtime`;
      amount = timeDiff * space.price;
      access = "false";
    } else {
      message = `${Math.round(
        Math.abs((now - formatedCheckOutDate) / 60000)
      )} mins. Bye`;
      access = "true";
    }
    return NextResponse.json(
      {
        message,
        type,
        expired,
        amount,
        access,
      },
      { status: StatusCodes.OK }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
}
