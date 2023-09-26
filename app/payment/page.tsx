"use client";
import React, { useEffect } from "react";
import Reservation from "../components/Reservation";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import PaystackPop from "@paystack/inline-js";
import { FaMoneyBill } from "react-icons/fa";

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

  const makePayment = () => {
    const paystack = new PaystackPop();
    const amount: any = reservation?.cost;
    const paystackAmount: number = amount * 100;
    paystack.newTransaction({
      key: "pk_test_f2f78ad36864d99374867e56ae7887e5eb249408",
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      amount: paystackAmount,
      onSuccess(transition: any) {
        console.log(transition);
      },
      onCancel() {
        console.log("cancel trnasaction");
      },
    });
  };
  return (
    <div className="w-full min-h-screen flex flex-col gap-5 justify-start items-center">
      <h3 className="my-3 text-xl text-primary text-center font-semibold border-b-4 border-primary">
        Reservation Payment
      </h3>
      <div className="shadow-lg shadow-black w-full md:w-2/5 flex flex-col justify-center gap-0 items-center p-0 rounded-lg relative bg-primary">
        <FaMoneyBill className="absolute top-0 right-0 rotate-45 text-7xl text-red-500" />
        <Reservation />
        <div className="p-5 w-full bg-primary">
          <button
            className="bg-white p-2 px-4 w-full rounded-md text-primary shadow-md shadow-slate-400"
            onClick={makePayment}>
            Make payment now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
