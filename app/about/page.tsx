"use client";
import React, { useState, useEffect } from "react";
import { DashboardBadge } from "../components/DashboardBadge";
import { spaces } from "@/utils/space";
import ReservationList from "../components/ReservationList";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";

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
const About = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center p-5 md:px-40 pb-10">
      <div className="rounded-md shadow-md p-5 md:p-10 gap-5 min-w-full justify-center items-center text-center bg-white bg-opacity-60">
        <h2 className="text-3xl text-primary mb-4">About Us</h2>
        <div className="w-full p-0 md:p-0 text-center">
          <p className="first-letter:text-3xl first-letter:font-bold">
            Vehicle space is a platform for motorist to reserve parking space
            with convenience to avoid problem of having no where to park on
            arrival.
          </p>
        </div>
      </div>
      <div className="p-0 md:p-10 text-left flex flex-col justify-center items-center">
        <h3 className="text-primary underline text-xl text-left">
          What we offer
        </h3>
        <ul className="list-disc">
          <li>Online payment</li>
          <li>Parking space reservation</li>
          <li>Reservation cancellation</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
