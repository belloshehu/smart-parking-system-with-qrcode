"use client";
import React from "react";
import { useQRCode } from "next-qrcode";

type Props = {
  reservationId: string;
};

function QRCode({ reservationId }: Props) {
  const { Canvas } = useQRCode();
  return (
    <Canvas
      text={reservationId}
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
