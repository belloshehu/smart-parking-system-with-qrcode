import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import Space from "../../../models/space";
import connectDB from "../../../database/dbconnect";
import jwt from "jsonwebtoken";

export async function PATCH(request: NextRequest, { params }: { params: any }) {
  // update space status from mqtt message
  const { status } = await request.json();
  console.log(status);
  try {
    connectDB();
    const spaceId = params.spaceId;
    if (!spaceId) {
      return NextResponse.json(
        { message: "Space id is required" },
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

    space.status = status;

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
