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
  vehicleNumber: string;
  status: "valid" | "cancelled" | "expired";
};

const ReservationList = async ({
  reservations,
}: {
  reservations: Reservation[];
}) => {
  const [reservationItems, setReservationItems] =
    useState<Reservation[]>(reservations);
  const [loading, setLoading] = useState(false);

  const handleCancelReservation = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(`/api/reservation/${id}`);
      setReservationItems((prev: any) =>
        prev.map((item: any) => {
          if (item._id === id) {
            return { ...item, status: data.reservation.status };
          }
          return item;
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="grid grid-cols-1 px-0 md:px-20 w-full gap-8 my-5">
      {reservationItems.map((reservation: Reservation) => (
        <ReservedSpace
          key={reservation._id}
          {...reservation}
          cancelReservation={handleCancelReservation}
        />
      ))}
    </div>
  );
};

export default ReservationList;
