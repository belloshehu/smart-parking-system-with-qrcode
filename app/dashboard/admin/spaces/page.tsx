"use client";
import React, { useState, useEffect, useRef } from "react";
import { DashboardBadge } from "@/app/components/DashboardBadge";
import { spaces } from "@/utils/space";
import ReservationList from "@/app/components/ReservationList";
import { FaPlus, FaSpinner, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import SpaceList from "@/app/components/SpaceList";
import Link from "next/link";
import SpaceForm from "@/app/components/SpaceForm";
import {
  clearSelectedSpace,
  setIsModalOpen,
  setSpaces,
} from "@/app/GlobalRedux/features/space/spaceSlice";

type SpaceType = {
  _id: string;
  id: string;
  price: number;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const AdminSpaces = () => {
  const [loading, setLoading] = useState(false);
  // const [spaces, setSpaces] = useState<SpaceType[]>([]);

  const { spaces } = useSelector((store: any) => store.space);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const dispatch = useDispatch();

  const getSpaces = React.useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/space");
      const spaceData = await data.spaces;
      dispatch(setSpaces(spaceData));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const close = () => {
    dialogRef?.current?.close();
  };

  useEffect(() => {
    getSpaces();
  }, []);

  const addSpaceHandler = () => {
    if (dialogRef) {
      dialogRef?.current?.showModal();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <FaSpinner className="text-xl animate-spin" />
      </div>
    );
  }

  const handleSubmit = async () => {};
  return (
    <div className="w-full">
      <div className="rounded-md shadow-md p-5 md:p-10 gap-5 w-full justify-center items-center text-center bg-white bg-opacity-60">
        <h2 className="text-3xl text-primary mb-4">Welcome, buddy</h2>
        <div className="flex justify-evenly items-center w-full">
          <DashboardBadge
            status="VIP"
            count={
              spaces?.filter(
                (space: SpaceType) => space.type.toLowerCase() === "vip"
              ).length
            }
          />
          <DashboardBadge
            status="Normal"
            count={
              spaces?.filter(
                (space: SpaceType) => space.type.toLowerCase() === "normal"
              ).length
            }
          />
        </div>
      </div>

      {/* my spaces */}
      <div className="min-w-full p-0 md:p-20">
        <div className="flex justify-start items-center gap-3">
          <h1 className="text-primary text-xl my-4 font-bold ml-0 md:ml-24">
            Spaces
          </h1>
          <button
            className="p-2 px-4 rounded-md bg-primary text-white flex justify-center items-center"
            onClick={addSpaceHandler}>
            <FaPlus /> Add Space
          </button>
        </div>
        <div className="min-w-full flex flex-col gap-5 justify-center items-center">
          <SpaceList />
        </div>
      </div>

      {/* New Space Dialog */}
      <dialog
        ref={dialogRef}
        className="w-full h-fit md:w-1/3 backdrop:backdrop-blur-sm bg-slate-200 p-5 rounded-md">
        <button
          type="button"
          className="top-2 right-2 absolute text-primary"
          onClick={close}>
          <FaTimes />
        </button>
        <header className="flex justify-center items-center">
          <h1 className="text-xl  text-primary font-semibold mb-4">
            {"New Space"}
          </h1>
        </header>

        <div className="flex flex-col justify-center items-center h-full w-full relative">
          <SpaceForm space={null} />
        </div>
      </dialog>
    </div>
  );
};

export default React.memo(AdminSpaces);
