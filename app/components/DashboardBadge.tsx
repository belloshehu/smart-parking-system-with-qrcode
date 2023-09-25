import React from "react";
import { FaCar } from "react-icons/fa";

type props = {
  status: string;
  count: number;
};
export const DashboardBadge = ({ status, count = 0 }: props) => {
  return (
    <div
      className={`ring-4 rounded-full w-16 h-16 p-2 text-3xl flex flex-col justify-center items-center ${
        status === "occupied" ? "ring-red-900" : "ring-primary"
      }`}>
      <FaCar
        className={`${
          status === "occupied" ? "text-red-900" : "text-primary"
        } text-5xl`}
      />
      <h1
        className={`text-2xl ${
          status === "occupied" ? "text-red-900" : "text-primary"
        }`}>
        {count}
      </h1>
    </div>
  );
};
