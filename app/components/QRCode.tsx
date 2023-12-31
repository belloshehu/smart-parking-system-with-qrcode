"use client";
import React from "react";
import { useQRCode } from "next-qrcode";

type Props = {
  id: string;
  checkInTime: Date;
  checkInDate: Date;
};

function QRCode({ id, checkInDate, checkInTime }: Props) {
  const { Canvas } = useQRCode();
  return (
    <Canvas
      text={
        id + "," + checkInDate.toDateString() + "," + checkInTime.toTimeString()
      }
      options={{
        errorCorrectionLevel: "M",
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: "#000",
          light: "#FFF",
        },
      }}
    />
  );
}

export default QRCode;
