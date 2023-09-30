import { NextRequest, NextResponse } from "next/server";
import User from "../../models/user";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import Reservation from "../../models/reservation";
import Space from "../../models/space";

export async function GET(request: NextRequest, { params }: { params: any }) {
  // get a reservation by a user
  try {
    const id = params.reservationId;
    const token: any = request.cookies.get("token")?.value;
    if (!token) {
      NextResponse.redirect("/login");
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
      const query = await Reservation.findById(id);
      const reservation = await Reservation.populate(query, "space");
      return NextResponse.json(
        {
          reservation,
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: any }
) {
  // delete reservations by its owner or admin
  try {
    const id = params.reservationId;
    const token: any = request.cookies.get("token")?.value;
    if (!token) {
      NextResponse.redirect("/login");
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
      const reservation = await Reservation.findByIdAndRemove(id);
      if (!reservation) {
        return NextResponse.json(
          { message: `Reservation with id ${id} not found` },
          { status: StatusCodes.NOT_FOUND }
        );
      }
      const space = await Space.findById(reservation.space.toHexString());
      space.status = "free";
      await space.save();
      return NextResponse.json(
        {
          reservation,
          message: "Reservation deleted successfully",
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

export async function PATCH(request: NextRequest, { params }: { params: any }) {
  // update reservations by its owner or admin (cancellation)
  try {
    const id = params.reservationId;
    const token: any = request.cookies.get("token")?.value;
    if (!token) {
      NextResponse.redirect("/login");
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
      space.status = "free";
      await space.save();
      reservation.status = "cancelled";
      await reservation.save();
      return NextResponse.json(
        {
          reservation,
          message: "Reservation updated successfully",
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
