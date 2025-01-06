import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import Space from "../../models/space";
import connectDB from "../../database/dbconnect";
import { checkAuthorization } from "@/utils/authorization";
import jwt from "jsonwebtoken";
import User from "../../models/user";
import Reservation from "../../models/reservation";

export async function GET(request: NextRequest, { params }: { params: any }) {
  try {
    connectDB();
    const spaceId = params.spaceId;
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
      const space = await Space.findById(spaceId);
      return NextResponse.json(
        {
          space,
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
      {
        message: error.message,
      },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: any }) {
  try {
    connectDB();
    const spaceId = params.spaceId;
    const { id, status, type, price } = await request.json();
    const token: any = request.cookies.get("token")?.value;
    if (!token) {
      NextResponse.redirect("/auth/login");
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    const userId = decoded?.id;
    const user = await User.findById(userId);
    if (user.role !== "admin") {
      return NextResponse.json(
        { message: "Permission required" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }
    if (!id) {
      return NextResponse.json(
        { message: "Space id is required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    if (!price) {
      return NextResponse.json(
        { message: "Space price is required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    if (!type) {
      return NextResponse.json(
        { message: "Space type is required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    if (!status) {
      return NextResponse.json(
        { message: "Space status is required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    const space = await Space.findById(spaceId);
    if (!space) {
      return NextResponse.json(
        {
          message: `Space with a id ${spaceId} not found`,
        },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    const existingReservation = await Reservation.find({ space: spaceId });
    console.log(existingReservation, spaceId);
    if (space.status === "reserved" && existingReservation.length > 0) {
      return NextResponse.json(
        { message: "Space is reserved" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    space.id = id;
    space.price = price;
    space.status = status;
    space.type = type;
    await space.save();
    return NextResponse.json(
      {
        message: "Space updated successfully",
        space,
        success: true,
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: any }
) {
  try {
    connectDB();
    const spaceId = params.spaceId;
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
      const space = await Space.findByIdAndRemove(spaceId);

      if (!space) {
        return NextResponse.json(
          { message: `Space with ID ${spaceId} not found` },
          { status: StatusCodes.NOT_FOUND }
        );
      }
      return NextResponse.json(
        {
          space,
          message: "Space deleted successfully",
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
      {
        message: error.message,
      },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
}
