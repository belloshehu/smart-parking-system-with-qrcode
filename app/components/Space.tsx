"use client";
import React, { useRef, useState } from "react";
import { CategoryType } from "./CategoryType";
import { FaCar, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedSpace,
  setReservation,
} from "../GlobalRedux/features/space/spaceSlice";
import { calculateCost } from "@/utils";
import Dialog from "./Dialog";
import ReservationForm from "./ReservationForm";
import { SelectedSpace } from "./SelectedSpace";
import FormMessage from "./FormMessage";
import { useRouter } from "next/navigation";

type Props = {
  _id: string;
  id: string;
  price: number;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
type Message = {
  text: string;
  type: "error" | "success";
};
export const Space = ({ space }: { space: Props }) => {
  const { id, price, type, status } = space;
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [hours, setHours] = useState<number>(1);
  const [minutes, setMinutes] = useState<number>(0);
  const [message, setMessage] = useState<Message>({ text: "", type: "error" });
  const dispatch = useDispatch();
  const { selectedSpace, reservation } = useSelector(
    (store: any) => store.space
  );

  const handleClick = () => {
    dispatch(setSelectedSpace({ ...space }));
    console.log(dialogRef);
    if (dialogRef) {
      dialogRef?.current?.showModal();
    }
  };

  const handleProceed = async () => {
    if (reservation?.checkInDate === "") {
      // toast.error("Please select checkin time");
      setMessage({
        type: "error",
        text: "Please select checkin date",
      });
      return;
    }
    if (reservation?.checkInTime === "") {
      setMessage({
        type: "error",
        text: "Please select checkin time",
      });
      return;
    }
    dispatch(
      setReservation({
        ...reservation,
        cost: calculateCost(
          parseFloat(selectedSpace?.price),
          hours,
          minutes
        ).toFixed(2),
      })
    );
    router.push("payment");
  };

  const dialogFormChangeHandler = (e: any) => {
    if (e.target.name === "hours") {
      setHours(e.target.value);
    } else if (e.target.name === "minutes") {
      setMinutes(e.target.value);
    }
  };
  const close = () => {
    dialogRef?.current?.close();
  };
  return (
    <>
      <div
        className={`rounded-md flex flex-col text-slate-700 relative gap-2 shadow-lg shadow-slate-600 hover:scale-105 duration-150 transition-all border-2 ${
          status === "free" ? "bg-slate-200" : "bg-red-200"
        } p-5 pt-10`}>
        <CategoryType type={type} />
        <div className="flex justify-between items-centers">
          <div>
            <h3 className=" text-xl">{id}</h3>
            <h2 className=" text-2xl">N{price}/minute</h2>
          </div>
          <FaCar className="text-5xl  line-through" />
        </div>
        <button
          disabled={status === "occupied"}
          className={`${
            status === "occupied" ? "bg-slate-400" : "bg-primary"
          } text-white rounded-full text-center p-2 px-5 my-3 shadow-md shadow-slate-600 w-full md:w-fit`}
          type="button"
          onClick={handleClick}>
          {status === "free" ? "Reserve now" : "Occupied"}
        </button>
      </div>

      {/* Dialog */}
      <dialog
        onChange={dialogFormChangeHandler}
        ref={dialogRef}
        className="w-full md:w-3/5 backdrop:backdrop-blur-sm bg-slate-200 p-5 md:p-8 rounded-md">
        <button
          type="button"
          className="top-2 right-2 absolute text-primary"
          onClick={close}>
          <FaTimes />
        </button>
        <header>
          <h1 className="text-xl  text-primary font-semibold mb-4">
            {"Reservation details"}
          </h1>
        </header>
        <div className="flex flex-col justify-center items-center h-full w-full relative">
          <FormMessage message={message} />
          <div className="flex flex-col md:flex-row justify-between items-center gap-5 mt-8 h-full w-full">
            <div className="flex flex-row-reverse md:flex-col-reverse text-white justify-center h-full gap-5 items-center w-full rounded-md p-5 bg-primary">
              <div>
                <h1 className="text-3xl font-bold">
                  Total: <span className="line-through">N</span>
                  {calculateCost(
                    parseFloat(selectedSpace?.price),
                    hours,
                    minutes
                  ).toFixed(2)}
                </h1>
              </div>
              <SelectedSpace {...selectedSpace} />
            </div>
            <ReservationForm />
          </div>
        </div>

        <footer className="flex justify-end gap-5 items-center w-full mt-10">
          <button
            className="p-2 px-4 bg-slate-400 text-primary text-center rounded-md"
            onClick={close}>
            Cancel
          </button>
          <button
            className="p-2 px-4 bg-primary text-white text-center rounded-md"
            onClick={handleProceed}>
            Proceed
          </button>
        </footer>
      </dialog>
    </>
  );
};
