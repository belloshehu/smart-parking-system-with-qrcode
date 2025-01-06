"use client";
import React, { useState, useEffect } from "react";
import { DashboardBadge } from "@/app/components/DashboardBadge";
import { spaces } from "@/utils/space";
import ReservationList from "@/app/components/ReservationList";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import { Reservation } from "@/typings/types";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const { user } = useSelector((store: any) => store.auth);

  useEffect(() => {
    const getReservations = async () => {
      setLoading(true);

      try {
        const { data } = await axios.get(`/api/reservation`);
        const reservationData = await data.reservations;
        setReservations(reservationData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getReservations();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <FaSpinner className="text-xl animate-spin" />
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="rounded-md shadow-md p-5 md:p-10 gap-5 min-w-full justify-center items-center text-center bg-white bg-opacity-60">
        <h2 className="text-3xl text-primary mb-4">Welcome, Admin</h2>
        <div className="flex justify-evenly items-center w-full">
          <DashboardBadge
            status="free"
            count={
              reservations?.filter(
                (reservation) => reservation.space.status === "free"
              ).length
            }
          />
          <DashboardBadge
            status="occupied"
            count={
              reservations?.filter(
                (reservation) => reservation.space.status === "occupied"
              ).length
            }
          />
        </div>
      </div>

      {/* my spaces */}
      <div className="min-w-full p-0 md:p-20">
        <h1 className="text-primary text-xl my-4 font-bold ml-0 md:ml-24">
          Reservations
        </h1>
        <div className="min-w-full flex flex-col gap-5 justify-center items-center">
          <ReservationList reservations={reservations} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
