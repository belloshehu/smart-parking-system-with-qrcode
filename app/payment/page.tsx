"use client";
import React, { useEffect } from "react";
import Reservation from "../components/Reservation";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { PaystackButton } from "react-paystack";
import { FaMoneyBill } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";

const Payment = () => {
  const router = useRouter();
  const { selectedSpace, reservation } = useSelector(
    (store: any) => store.space
  );
  const { user } = useSelector((store: any) => store.auth);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, []);

  useEffect(() => {
    if (!selectedSpace) {
      router.push("/");
    }
  }, [selectedSpace, reservation]);

  const paystackProps = {
    text: "Pay Now",
    publicKey: process.env.PAYSTACK_PUBLIC_KEY!,
    email: user?.email,
    name: user?.firstName,
    firstname: user?.firstName,
    lastname: user?.lastName,
    amount: reservation.cost * 100,
    onSuccess: async (transition: any) => {
      try {
        const { data } = await axios.post("/api/reservation", {
          amount: parseInt(reservation.cost),
          vehicleNumber: reservation.vehicleNumber,
          spaceId: selectedSpace._id,
          userId: user.id,
          checkInDate: reservation.checkInDate,
          checkInTime: reservation.checkInTime,
          duration: reservation.duration,
          paymentReference: transition.reference,
        });
        router.push("/dashboard");
      } catch (error: any) {
        console.log(error);
      }
    },
    onCancel: async () => {
      router.push("/");
    },
  };
  return (
    <div className="w-full min-h-screen flex flex-col gap-5 justify-start items-center">
      <h3 className="my-3 text-xl text-primary text-center font-semibold border-b-4 border-primary">
        Reservation Payment
      </h3>
      <div className="shadow-lg shadow-black w-full md:w-2/5 flex flex-col justify-center gap-0 items-center p-0 rounded-lg relative bg-primary">
        <FaMoneyBill className="absolute top-0 right-0 rotate-45 text-7xl text-red-500" />
        <Reservation />
        <div className="flex justify-between gap-5 md:gap-10 items-center p-5 w-full bg-primary">
          <Link
            href={"/"}
            className="bg-red-600 p-2 px-3 rounded-md text-center text-white flex-2">
            Cancel
          </Link>
          <PaystackButton
            className="bg-slate-100 p-2 px-3 rounded-md text-center text-primary flex-1"
            {...paystackProps}
            currency="NGN"
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;
