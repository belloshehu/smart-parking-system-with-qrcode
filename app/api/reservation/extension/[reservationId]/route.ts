import { NextRequest, NextResponse } from "next/server";
import User from "../../../models/user";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import Reservation from "../../../models/reservation";
import Space from "../../../models/space";
import { sendTransactionalEmails } from "@/utils/email";

export async function PATCH(request: NextRequest, { params }: { params: any }) {
  // update reservations by its owner or admin (cancellation)
  try {
    const id = params.reservationId;
    const body = await request.json();
    const newDuration = body.duration;

    if (!newDuration) {
      return NextResponse.json(
        { message: "New duration required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
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
      const reservation = await Reservation.findById(id);
      if (!reservation) {
        return NextResponse.json(
          { message: `Reservation with id ${id} not found` },
          { status: StatusCodes.NOT_FOUND }
        );
      }
      const space = await Space.findById(reservation.space.toHexString());

      reservation.duration = newDuration;
      await reservation.save();
      const { checkInDate, amount, checkInTime } = reservation;
      const formatedCheckInDate = new Date(checkInDate)
        .toISOString()
        .slice(0, 10);
      const emailContent = `
      <p>Hi ${user.firstName},</p>
      <p>Reservation was successfully extended: </p>
      <h4 style="text-align:left">Reservation details:</h4>
      <table style="padding: 1rem; text-align: left; background-color: #2233D3; color: white; width: 100%">
        <tr>
         <td>Space ID:</td> <td>${space.id}</td>
        </tr>
        <tr>
         <td>Checkin date:</td> <td>${formatedCheckInDate}</td> 
        </tr>
        <tr>
         <td>Checkin time:</td> <td>${checkInTime}</td> 
        </tr>
        <tr>
         <td>Duration:</td> <td>${newDuration} minutes</td> 
        </tr>
        <tr>
          <td>Amount charged:</td> <td>${amount} Naira</td> 
        </tr>
      </table>

      <p style="text-align: left">Thank you.</p>
      <p style="text-align: left">Smart parking Team.</p>
    `;
      sendTransactionalEmails(
        emailContent,
        [user.email],
        "Reservation extension"
      );
      return NextResponse.json(
        {
          reservation,
          message: "Reservation extended successfully",
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
