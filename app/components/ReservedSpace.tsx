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
  id: string | number;
  cost: string | number;
  date: string;
  time: string;
  type: string;
  status: string;
  duration: number;
  price: string;
};
const ReservedSpace = ({
  id,
  cost,
  date,
  time,
  duration,
  status,
  type,
  price,
}: props) => {
  return (
    <div className="w-full md:w-[80%] p-5 md:p-10 bg-primary grid grid-cols-3 relative text-white rounded-xl">
      <div className="flex flex-col justify-center items-start gap-2 col-span-2 md:pl-5">
        <CategoryType type={type} />
        <div>
          <FaCar className="text-4xl top-0 left-0" />
        </div>
        <h2 className="text-2xl font-bold">{id}</h2>
        <h3>
          ${cost} <sup>at {price}</sup>
        </h3>
        <div className="flex gap-2 justify-center items-center">
          <FaCalendar />
          <h3>{date}</h3>
        </div>

        <div className="flex gap-2 justify-center items-center">
          <FaClock />
          <h3>Check in {time}</h3>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <FaClock />
          <h3>For {duration / 60} hours </h3>
        </div>
        <Link
          href="/"
          className="p-2 px-5 rounded-full bg-slate-300 text-primary w-full md:w-2/3 text-center mt-4">
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
