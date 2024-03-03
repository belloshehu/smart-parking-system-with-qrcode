import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import { getEmailTemplate, sendTransactionalEmails } from "@/utils/email";

/* Generate and use your API key */

export async function GET(request: NextRequest) {
  const res = sendTransactionalEmails(
    "You have successfully created reservation",
    ["belloshehu1@gmail.com"],
    "Reservation"
  );

  if (res) {
    return NextResponse.json(
      { message: "Email sent" },
      { status: StatusCodes.OK }
    );
  } else {
    return NextResponse.json(
      { message: `Failed to send email` },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
}
