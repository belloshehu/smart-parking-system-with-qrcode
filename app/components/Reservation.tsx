"use client";
import React from "react";
import { SelectedSpace } from "./SelectedSpace";
import { useSelector } from "react-redux";
import { FaCalendar, FaClock } from "react-icons/fa";

const Reservation = () => {
  const { selectedSpace, reservation } = useSelector(
    (store: any) => store.space
  );
  return (
    <div className="bg-primary w-full p-5 flex flex-col justify-between items-center text-white">
      <div className="w-full p-5 flex flex-col-reverse gap-5 justify-between items-center">
        <h2 className="text-3xl">
          <span className="line-through">N</span>
          {reservation?.cost}
        </h2>
        <SelectedSpace {...selectedSpace} />
      </div>
      <div className="w-full p-5 flex flex-col justify-between items-center">
        <div className="flex justify-center items-center gap-2">
          <FaCalendar />
          <p>Date: </p>
          <p>{reservation.checkInDate}</p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <FaClock />
          <p>Checkin Time</p>
          <p>{reservation.checkInTime}</p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <FaClock />
          <p>Duration</p>
          <p>
            {reservation.durationMinutes + reservation.durationHour * 60}{" "}
            minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
