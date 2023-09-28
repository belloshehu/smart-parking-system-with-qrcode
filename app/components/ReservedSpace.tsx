import React from "react";
import {
  FaBarcode,
  FaCalendar,
  FaCar,
  FaClock,
  FaQrcode,
} from "react-icons/fa";
import Link from "next/link";
import { CategoryType } from "./CategoryType";
import QRCode from "./QRCode";

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
};
const ReservedSpace = ({
  _id,
  user,
  space,
  amount,
  createdAt,
  checkInTime,
  checkInDate,
  duration,
}: props) => {
  return (
    <div className="w-full md:w-[80%] p-5 pt-7 md:p-10 md:pt-16 bg-primary grid grid-cols-3 relative text-white rounded-xl">
      <div className="flex flex-col justify-center items-start gap-2 col-span-2 md:pl-5">
        <CategoryType type={space?.type} />
        <div>
          <FaCar className="text-4xl top-0 left-0" />
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
        <Link
          href="/"
          className="p-2 px-5 rounded-full bg-slate-300 text-primary w-full text-center mt-4">
          Cancel
        </Link>
      </div>
      <div className="w-full">
        <QRCode id={""} checkInDate={new Date()} checkInTime={new Date()} />
      </div>
    </div>
  );
};

export default ReservedSpace;
