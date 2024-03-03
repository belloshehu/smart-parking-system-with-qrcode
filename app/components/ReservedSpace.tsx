"use client";
import React, { useState, useRef } from "react";
import { FaCalendar, FaCar, FaClock, FaTimes, FaSpinner } from "react-icons/fa";
import { CategoryType } from "./CategoryType";
import QRCode from "./QRCode";
import { useSelector, useDispatch } from "react-redux";
import FormMessage from "./FormMessage";
import { calculateCost, calculateDuration } from "@/utils";
import { useRouter, usePathname } from "next/navigation";
import { setReservation } from "../GlobalRedux/features/space/spaceSlice";
import { SelectedSpace } from "./SelectedSpace";
import { setSelectedSpace } from "../GlobalRedux/features/space/spaceSlice";
import ReservationUpdateForm from "./ReservationUpdateForm";

type props = {
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
  status: "valid" | "expired" | "cancelled";
  vehicleNumber: string;
  cancelReservation: (id: string) => void;
};

type Message = {
  text: string;
  type: "error" | "success";
};

const ReservedSpace = ({
  _id,
  user,
  space,
  amount,
  checkInTime,
  checkInDate,
  duration,
  vehicleNumber,
  status,
  cancelReservation,
}: props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { selectedSpace, reservation } = useSelector(
    (store: any) => store.space
  );
  const [message, setMessage] = useState<Message>({
    text: "",
    type: "error",
  });
  const [hours, setHours] = useState<number>(1);
  const [minutes, setMinutes] = useState<number>(0);
  const reservationDialogRef = useRef<HTMLDialogElement | null>(null);
  const { mqttClient } = useSelector((store: any) => store.iot);

  const handleProceed = async () => {
    setLoading(true);
    dispatch(
      setReservation({
        checkInDate: checkInDate.slice(0, 10),
        checkInTime,
        durationHour: hours,
        durationMinutes: minutes,
        price: space.price,
        duration: calculateDuration(hours, minutes),
        space: space,
        vehicleNumber,
        status,
        cost: parseInt(calculateCost(space.price, hours, minutes).toFixed(2)),
      })
    );
    setLoading(false);
    router.push(`extensionPayment/${_id}`);
  };

  const dialogFormChangeHandler = (e: any) => {
    if (e.target.name === "hours") {
      setHours(e.target.value);
    } else if (e.target.name === "minutes") {
      setMinutes(e.target.value);
    }
  };

  const close = () => {
    reservationDialogRef?.current?.close();
    setMessage({
      type: "error",
      text: "",
    });
  };
  const setBgColor = () => {
    switch (status) {
      case "cancelled":
        return "bg-slate-800";
      case "valid":
        return "bg-primary";
      case "expired":
        return "bg-red-800";
    }
  };

  const handleCancelReservation = async (id: string) => {
    try {
      await cancelReservation(id);
      await mqttClient.publish(
        "/car/parking/system/reservation",
        `${space.id}=0`
      );
    } catch (error) {}
  };

  const handleClick = () => {
    dispatch(setSelectedSpace({ ...space }));
    if (reservationDialogRef) {
      reservationDialogRef?.current?.showModal();
    }
  };

  return (
    <>
      <div
        className={`w-full md:w-[80%] ${setBgColor()}  text-white rounded-xl pb-5 relative`}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 relative md:pt-10 pt-10 pb-5 p-7 ">
          <div className="flex flex-col justify-center items-start gap-2 md:col-span-2">
            <CategoryType type={space?.type} price={space.price} />
            <div className="flex justify-center items-center gap-2 uppercase text-slate-200">
              <FaCar className="text-4xl top-0 left-0" />
              <p>{vehicleNumber}</p>
            </div>
            <h2 className="text-2xl font-bold">{space?.id}</h2>
            <h3>
              <span className="line-through">N</span>
              {amount} <sup>at {space?.price}/min</sup>
            </h3>
            <div className="flex gap-2 justify-center items-center">
              <FaCalendar />
              <h3>{checkInDate.slice(0, 10)}</h3>
            </div>

            <div className="flex gap-2 justify-center items-center">
              <FaClock />
              <h3>Check-in Time {checkInTime}</h3>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <FaClock />
              <h3>Parking duration {duration} mins </h3>
            </div>
          </div>
          <div className="w-full md:mx-auto">
            <QRCode reservationId={_id} />
          </div>
        </div>

        <div
          className={`text-center w-fit absolute top-0 -right-8 rotate-45 ${setBgColor()} p-2 px-3 shadow-sm shadow-slate-200 capitalize`}>
          <p>{status}</p>
        </div>

        <div className="mx-5 w-full flex justify-between items-center pr-10">
          {status === "cancelled" ? null : (
            <button
              onClick={async () => handleCancelReservation(_id)}
              className="p-2 px-5 rounded-full bg-slate-300 text-primary w-auto text-center mt-4 ">
              Cancel
            </button>
          )}
          {status === "cancelled" ? null : (
            <button
              onClick={handleClick}
              className="p-2 px-5 rounded-full bg-black text-white w-auto text-center mt-4 ">
              Update
            </button>
          )}
        </div>
      </div>

      {/* Dialog */}
      <dialog
        onChange={dialogFormChangeHandler}
        ref={reservationDialogRef}
        className="w-full md:w-3/5 backdrop:backdrop-blur-sm bg-slate-200 p-5 md:p-8 rounded-md">
        <button
          type="button"
          className="top-2 right-2 absolute text-primary"
          onClick={close}>
          <FaTimes />
        </button>
        <header>
          <h1 className="text-xl  text-primary font-semibold mb-4">
            {"Reservation update"}
          </h1>
        </header>
        <div className="flex flex-col justify-center items-center h-full w-full relative">
          <FormMessage message={message} />
          <div className="flex flex-col md:flex-row justify-between items-center gap-5 mt-8 h-full w-full">
            <div className="flex flex-row-reverse md:flex-col-reverse text-white justify-center h-full gap-5 items-center w-full rounded-md p-5 bg-primary">
              <div>
                <h1 className="text-3xl font-bold">
                  Total: <span className="line-through">N</span>
                  {calculateCost(space?.price, hours, minutes).toFixed(2)}
                </h1>
              </div>
              <SelectedSpace {...selectedSpace} />
            </div>
            <ReservationUpdateForm
              reservationId={_id}
              hrs={Math.floor(duration / 60)}
              mins={duration % 60}
            />
          </div>
        </div>

        <footer className="flex justify-end gap-5 items-center w-full mt-10">
          <button
            className="p-2 px-4 bg-slate-400 text-primary text-center rounded-md"
            onClick={close}>
            Cancel
          </button>
          <button
            disabled={loading}
            className="p-2 px-4 bg-primary text-white text-center rounded-md"
            onClick={handleProceed}>
            {loading ? (
              <FaSpinner className={`${loading ? "animate-spin" : ""}`} />
            ) : (
              <span>Proceed</span>
            )}
          </button>
        </footer>
      </dialog>
    </>
  );
};

export default ReservedSpace;
