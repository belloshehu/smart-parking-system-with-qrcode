"use client";
import React, { useState } from "react";
import { FaCalendar, FaCar, FaClock, FaQrcode } from "react-icons/fa";
import { CategoryType } from "./CategoryType";
import QRCode from "./QRCode";
import { useSelector } from "react-redux";

type props = {
  _id: string;
  user: string;
  space: {
    type: string;
    status: string;
    price: number;
    id: string;
  };
  amount: number;
  createdAt: string;
  duration: number;
  checkInDate: string;
  checkInTime: string;
  status: "valid" | "expired" | "cancelled";
  vehicleNumber: string;
  cancelReservation: (id: string) => void;
};
const ReservedSpace = ({
  _id,
  user,
  space,
  amount,
  checkInTime,
  checkInDate,
  duration,
  vehicleNumber,
  status,
  cancelReservation,
}: props) => {
  const { mqttClient } = useSelector((store: any) => store.iot);
  const setBgColor = () => {
    switch (status) {
      case "cancelled":
        return "bg-slate-800";
      case "valid":
        return "bg-primary";
      case "expired":
        return "bg-red-800";
    }
  };

  const handleCancelReservation = async (id: string) => {
    try {
      await cancelReservation(id);
      await mqttClient.publish(
        "/car/parking/system/reservation",
        `${space.id}=0`
      );
    } catch (error) {}
  };
  return (
    <div
      className={`w-full md:w-[80%] ${setBgColor()}  text-white rounded-xl pb-5 relative`}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 relative md:pt-10 pt-10 pb-5 p-7 ">
        <div className="flex flex-col justify-center items-start gap-2 md:col-span-2">
          <CategoryType type={space?.type} price={space.price} />
          <div className="flex justify-center items-center gap-2 uppercase text-slate-200">
            <FaCar className="text-4xl top-0 left-0" />
            <p>{vehicleNumber}</p>
          </div>
          <h2 className="text-2xl font-bold">{space?.id}</h2>
          <h3>
            <span className="line-through">N</span>
            {amount} <sup>at {space?.price}/min</sup>
          </h3>
          <div className="flex gap-2 justify-center items-center">
            <FaCalendar />
            <h3>{checkInDate.slice(0, 10)}</h3>
          </div>

          <div className="flex gap-2 justify-center items-center">
            <FaClock />
            <h3>Check-in Time {checkInTime}</h3>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <FaClock />
            <h3>Parking duration {duration / 60} hours </h3>
          </div>
        </div>
        <div className="w-full md:mx-auto">
          <QRCode reservationId={_id} />
        </div>
      </div>

      <div
        className={`text-center w-fit absolute top-0 -right-5 rotate-45 ${setBgColor()} p-2 px-3 shadow-sm shadow-slate-200 capitalize`}>
        <p>{status}</p>
      </div>

      <div className="mx-5 w-full">
        {status === "cancelled" ? null : (
          <button
            onClick={async () => handleCancelReservation(_id)}
            className="p-2 px-5 rounded-full bg-slate-300 text-primary w-auto text-center mt-4 ">
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default ReservedSpace;
