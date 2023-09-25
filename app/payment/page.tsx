"use client";
import React, { useEffect } from "react";
import { SelectedSpace } from "../components/SelectedSpace";
import Reservation from "../components/Reservation";
import { paymentMethos } from "@/utils/payment";
import PaymentMethod from "../components/PaymentMethod";
import Dialog from "../components/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../GlobalRedux/features/modal/modalSlice";
import { useRouter } from "next/navigation";
import PaystackPop from "@paystack/inline-js";
import { calculateCost } from "@/utils";

const Payment = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { selectedSpace, reservation } = useSelector(
    (store: any) => store.space
  );
  useEffect(() => {
    if (!selectedSpace) {
      router.push("/");
    }
  }, [selectedSpace, reservation]);

  const makePayment = () => {
    const paystack = new PaystackPop();
    const amount: any = calculateCost(
      parseFloat(selectedSpace?.price?.split("/").at(0)),
      reservation?.durationHour,
      reservation?.durationMinutes
    ).toFixed(2);

    const paystackAmount: number = amount * 100;
    paystack.newTransaction({
      key: "pk_test_f2f78ad36864d99374867e56ae7887e5eb249408",
      email: "belloshehu1@gmail.com",
      firstName: "Bello",
      lastName: "Shehu",
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
      <div className="bg-slate-300 w-full md:w-2/5 flex flex-col justify-center gap-8 items-center p-0">
        <Reservation />
        <div className="p-5 w-full">
          <button
            className="bg-white p-2 px-4 w-full rounded-md text-primary shadow-md "
            onClick={makePayment}>
            Make payment now
          </button>
        </div>
      </div>
      {/* <Dialog
        okButtonText="Proceed"
        okClickHandler={() => console.log("")}
        title="Select payment method">
        <h1 className="text-xl md:text-3xl text-primary text-center"></h1>
        <div className="bg-white w-full md:w-2/3 flex flex-col justify-center items-center">
          <div className="flex flex-col gap-3 w-full justify-center items-center my-5">
            {paymentMethos.map(({ id, title }) => (
              <PaymentMethod key={id} title={title} />
            ))}
          </div>
        </div>
      </Dialog> */}
    </div>
  );
};

export default Payment;
