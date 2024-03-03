"use client";
import React, { useState } from "react";
import axios from "axios";
import { BiSad } from "react-icons/bi";
import Reservation from "./Reservation";
import Link from "next/link";
import { useSelector } from "react-redux";
import ReservedSpace from "./ReservedSpace";

import {
  setSelectedSpace,
  setReservation,
  removeSpace,
} from "../GlobalRedux/features/space/spaceSlice";
import { SelectedSpace } from "./SelectedSpace";

type Reservation = {
  _id: string;
  user: string;
  space: {
    _id: string;
    type: string;
    status: string;
    price: number;
    id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  amount: number;
  createdAt: string;
  duration: number;
  checkInDate: string;
  checkInTime: string;
  vehicleNumber: string;
  status: "valid" | "cancelled" | "expired";
};

type Message = {
  text: string;
  type: "error" | "success";
};

const ReservationList = async ({
  reservations,
}: {
  reservations: Reservation[];
}) => {
  const [reservationItems, setReservationItems] =
    useState<Reservation[]>(reservations);
  const [loading, setLoading] = useState(false);
  const { mqttClient } = useSelector((store: any) => store.iot);
  const { selectedSpace, reservation } = useSelector(
    (store: any) => store.space
  );

  const handleCancelReservation = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(`/api/reservation/${id}`);
      setReservationItems((prev: any) =>
        prev.map((item: any) => {
          if (item._id === id) {
            mqttClient.publish(
              "/car/parking/system/reservation",
              `${item.space.id}=0`
            );
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

  if (reservations?.length === 0 || !reservations) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center bg-slate-100 p-5">
        <p>Oops! there are no reservations yet</p>
        <BiSad className="text-primary text-3xl md:text-5xl" />
        <Link className="bg-primary text-white rounded-md p-2 px-4" href={"/"}>
          Make Reservation
        </Link>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 px-0 md:px-20 w-full gap-8 my-5">
        {reservationItems.map((reservation: Reservation) => (
          <ReservedSpace
            key={reservation._id}
            {...reservation}
            cancelReservation={handleCancelReservation}
          />
        ))}
      </div>
    </>
  );
};

export default ReservationList;
