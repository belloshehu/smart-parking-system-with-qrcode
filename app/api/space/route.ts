import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import Space from "../models/space";
import connectDB from "../database/dbconnect";
import { isAuthorized } from "@/utils/authorization";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { id, status, price, type } = await request.json();
    if (!id) {
      return NextResponse.json(
        { message: "Space ID is required" },
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

    const space = await Space.create({ id, status, price, type });
    console.log(space);

    return NextResponse.json(
      { message: "Space created successfully", success: true },
      { status: StatusCodes.CREATED }
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

export async function GET(request: NextRequest) {
  try {
    connectDB();
    const spaces = await Space.find();
    return NextResponse.json(
      {
        spaces,
        length: spaces.length,
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

export async function PATCH(request: NextRequest) {
  try {
    connectDB();
    const { _id, id, status, type, price } = await request.json();
    if (!_id) {
      return NextResponse.json(
        { message: "Space _id is required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    if (!id) {
      return NextResponse.json(
        { message: "Space ID is required" },
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
    const space = await Space.findById(_id);
    if (!space) {
      return NextResponse.json(
        {
          message: `Space with a id ${id} not found`,
        },
        { status: StatusCodes.NOT_FOUND }
      );
    }
    space.id = id;
    space.price = price;
    space.status = status;
    space.type = type;
    await space.save();
    return NextResponse.json(
      {
        message: "Space successfully updated",
        space,
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
