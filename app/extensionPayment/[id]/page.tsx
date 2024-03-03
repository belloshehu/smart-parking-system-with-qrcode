"use client";
import React, { useEffect } from "react";
import Reservation from "../../components/Reservation";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FaMoneyBill } from "react-icons/fa";
import Link from "next/link";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import axios from "axios";

const Payment = ({ params }: { params: any }) => {
  const { id } = params;
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

  // with flutterwave
  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!,
    tx_ref: Date.now().toString(),
    amount: reservation?.cost,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: user?.email,
      phone_number: "+2348133306065",
      name: user?.firstName + " " + user?.lastName,
    },
    customizations: {
      title: "Smart Parking",
      description: "Payment for space reservation",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: async (response: any) => {
      console.log("Payment success!");
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {
      console.log("Payment cancelled!");
      router.push("/");
    },
  };
  const handleFlutterPayment = useFlutterwave(fwConfig);

  const handlePayment = () => {
    handleFlutterPayment({
      callback: async (response: any) => {
        try {
          const res = await axios.patch(`/api/reservation/extension/${id}`, {
            duration: reservation.duration,
          });
          router.push("/dashboard");
        } catch (error) {
          console.log("Reservation extension failed:", error);
          router.push("/");
        } finally {
          closePaymentModal();
        }
      },
      onClose: () => {
        // console.log("Cancelled payment!");
        router.push("/");
      },
    });
  };
  return (
    <div className="w-full min-h-screen flex flex-col gap-5 justify-start items-center">
      <h3 className="my-3 text-xl text-primary text-center font-semibold border-b-4 border-primary">
        Reservation Extension Payment
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
          <button onClick={handlePayment}>Pay now</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
