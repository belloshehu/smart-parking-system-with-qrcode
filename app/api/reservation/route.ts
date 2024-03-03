import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "../database/dbconnect";
import Reservation from "../models/reservation";
import Space from "../models/space";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { sendTransactionalEmails } from "@/utils/email";

export async function POST(request: NextRequest) {
  try {
    connectDB();
    const token: any = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Please login" },
        { status: StatusCodes.UNAUTHORIZED }
      );
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
    const userId = id;
    const {
      duration,
      checkInDate,
      checkInTime,
      amount,
      space,
      vehicleNumber,
      paymentReference,
    } = await request.json();

    const spaceId = space;
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
    const existingSpace = await Space.findById(spaceId);
    if (!existingSpace) {
      return NextResponse.json(
        { message: `Space with ID ${spaceId} not found` },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    if (existingSpace.status !== "free") {
      return NextResponse.json(
        {
          message: `Space with ID ${existingSpace.id} is not free`,
          existingSpace,
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

    existingSpace.status = "reserved";
    await existingSpace.save();
    const formatedCheckInDate = new Date(checkInDate)
      .toISOString()
      .slice(0, 10);
    const emailContent = `
      <p>Hi ${user.firstName},</p>
      <p>Reservation was successfully made: </p>
      <h4 style="text-align:left">Reservation details:</h4>
      <table style="padding: 1rem; text-align: left; background-color: #2233D3; color: white; width: 100%">
        <tr>
         <td>Space ID:</td> <td>${existingSpace.id}</td>
        </tr>
        <tr>
         <td>Checkin date:</td> <td>${formatedCheckInDate}</td> 
        </tr>
        <tr>
         <td>Checkin time:</td> <td>${checkInTime}</td> 
        </tr>
        <tr>
         <td>Duration:</td> <td>${duration} minutes</td> 
        </tr>
        <tr>
          <td>Amount charged:</td> <td>${amount} Naira</td> 
        </tr>
      </table>

      <p style="text-align: left">Thank you.</p>
      <p style="text-align: left">Smart parking Team.</p>
    `;
    sendTransactionalEmails(emailContent, [user.email], "Space reservation");
    return NextResponse.json(
      {
        message: "Reservation created successfully",
        reservation: { ...reservation._doc, space: existingSpace },
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
      return NextResponse.json(
        { message: "Please login" },
        { status: StatusCodes.UNAUTHORIZED }
      );
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
