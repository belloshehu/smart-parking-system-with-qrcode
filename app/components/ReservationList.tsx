import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import Reservation from "./Reservation";
import ReservedSpace from "./ReservedSpace";

type Reservation = {
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

const ReservationList = async ({
  reservations,
}: {
  reservations: Reservation[];
}) => {
  return (
    <div className="grid grid-cols-1 px-0 md:px-20 w-full gap-8 my-5">
      {reservations.map((reservation: Reservation) => (
        <ReservedSpace key={reservation._id} {...reservation} />
      ))}
    </div>
  );
};

export default ReservationList;
