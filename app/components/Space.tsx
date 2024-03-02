"use client";
import React, { useRef, useState } from "react";
import { CategoryType } from "./CategoryType";
import { FaCar, FaSpinner, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import SpaceForm from "./SpaceForm";
import {
  setSelectedSpace,
  setReservation,
  removeSpace,
} from "../GlobalRedux/features/space/spaceSlice";
import { calculateCost, calculateDuration } from "@/utils";
import ReservationForm from "./ReservationForm";
import { SelectedSpace } from "./SelectedSpace";
import FormMessage from "./FormMessage";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";

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
  const { id, price, type, status, _id } = space;
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const reservationDialogRef = useRef<HTMLDialogElement | null>(null);
  const deleteDialogRef = useRef<HTMLDialogElement | null>(null);
  const editDialogRef = useRef<HTMLDialogElement | null>(null);
  const [hours, setHours] = useState<number>(1);
  const [minutes, setMinutes] = useState<number>(0);
  const [message, setMessage] = useState<Message>({ text: "", type: "error" });
  const dispatch = useDispatch();
  const { selectedSpace, reservation } = useSelector(
    (store: any) => store.space
  );

  const handleClick = () => {
    dispatch(setSelectedSpace({ ...space }));
    if (reservationDialogRef) {
      reservationDialogRef?.current?.showModal();
    }
  };

  const deleteBtnClick = () => {
    if (deleteDialogRef) {
      deleteDialogRef?.current?.showModal();
    }
  };

  const editBtnClick = () => {
    if (editDialogRef) {
      editDialogRef?.current?.showModal();
    }
  };
  const deleteSpace = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete(`/api/space/${_id}`);
      setMessage({
        type: "success",
        text: "Space deleted successfully",
      });
      dispatch(removeSpace(_id));
    } catch (error) {
      console.log(error);
      setMessage({
        type: "error",
        text: "Error",
      });
    } finally {
      setLoading(false);
    }
  };
  const editSpace = () => {};

  const handleProceed = async () => {
    setLoading(true);
    if (reservation?.vehicleNumber === "") {
      // toast.error("Please select checkin time");
      setMessage({
        type: "error",
        text: "Please enter vehicle number",
      });
      setLoading(false);
      return;
    }
    if (reservation?.checkInDate === "") {
      // toast.error("Please select checkin time");
      setMessage({
        type: "error",
        text: "Please enter checkin date",
      });
      setLoading(false);
      return;
    }
    if (reservation?.checkInTime === "") {
      setMessage({
        type: "error",
        text: "Please enter checkin time",
      });
      setLoading(false);
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
        duration: calculateDuration(hours, minutes),
        space: _id,
      })
    );
    setLoading(false);
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
    reservationDialogRef?.current?.close();
    deleteDialogRef?.current?.close();
    editDialogRef?.current?.close();
    setMessage({
      type: "error",
      text: "",
    });
    // dispatch(clearSelectedSpace());
  };
  return (
    <>
      <div
        className={`rounded-md flex flex-col text-slate-700 relative gap-2 shadow-lg shadow-slate-600 hover:scale-105 duration-150 transition-all border-2 ${
          status === "free" ? "bg-slate-200" : "bg-red-200"
        } p-5 pt-10`}>
        <CategoryType type={type} price={price} />
        <div className="flex justify-between items-centers">
          <div>
            <h3 className=" text-xl">{id}</h3>
            <h2 className=" text-2xl">N{price}/minute</h2>
          </div>
          <FaCar className="text-5xl  line-through" />
        </div>
        {!pathname.includes("/admin") ? (
          <button
            disabled={status !== "free"}
            className={`${
              status !== "free" ? "bg-slate-400" : "bg-primary"
            } text-white rounded-full text-center p-2 px-5 my-3 shadow-md shadow-slate-600 w-full md:w-fit capitalize`}
            type="button"
            onClick={handleClick}>
            {status === "free" ? "Reserve now" : status}
          </button>
        ) : (
          <div className="flex justify-between items-center w-full mt-5">
            <button
              disabled={status !== "free"}
              className={`p-2 px-4 rounded-md text-white ${
                status !== "free" ? "bg-blue-500 line-through" : "bg-primary"
              } `}
              onClick={editBtnClick}>
              Edit
            </button>
            {/* Space that is not free should not be deleted */}
            <button
              disabled={status !== "free"}
              className={`p-2 px-4 rounded-md text-white ${
                status !== "free" ? "bg-red-400 line-through" : "bg-red-800"
              } `}
              onClick={deleteBtnClick}>
              Delete
            </button>
          </div>
        )}
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
                  {calculateCost(price, hours, minutes).toFixed(2)}
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

      {/* Delete dialog */}
      <dialog
        ref={deleteDialogRef}
        className="w-full md:w-2/5 backdrop:backdrop-blur-sm bg-slate-200 p-5 md:p-8 rounded-md">
        <button
          type="button"
          className="top-2 right-2 absolute text-primary"
          onClick={close}>
          <FaTimes />
        </button>
        <header>
          <h1 className="text-xl  text-primary font-semibold mb-4">
            {"Delete confirmation"}
          </h1>
        </header>
        <div className="flex flex-col justify-center items-center h-full w-full relative">
          <FormMessage message={message} />
          <div className="flex flex-col md:flex-row justify-center items-center gap-5 mt-8 h-full w-full">
            <p className="font-bold text-center">
              Want to delete this space with ID{" "}
              <span className="text-primary">{id}</span>?
            </p>
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
            onClick={deleteSpace}>
            {loading ? (
              <FaSpinner className="animate-spin text-white m-1 mx-2" />
            ) : (
              <span>Yes Delete</span>
            )}
          </button>
        </footer>
      </dialog>

      {/* Edit dialog */}

      <dialog
        ref={editDialogRef}
        className="w-full h-fit md:w-1/3 backdrop:backdrop-blur-sm bg-slate-200 p-5 rounded-md">
        <button
          type="button"
          className="top-2 right-2 absolute text-primary"
          onClick={close}>
          <FaTimes />
        </button>
        <header className="flex justify-center items-center">
          <h1 className="text-xl  text-primary font-semibold mb-4">
            {"Edit Space"}
          </h1>
        </header>

        <div className="flex flex-col justify-center items-center h-full w-full relative">
          <SpaceForm space={space} />
        </div>
      </dialog>
    </>
  );
};
