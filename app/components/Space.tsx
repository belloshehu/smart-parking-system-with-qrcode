"use client";
import Link from "next/link";
import React from "react";
import { CategoryType } from "./CategoryType";
import { FaCar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { openDialog } from "../GlobalRedux/features/modal/modalSlice";
import { setSelectedSpace } from "../GlobalRedux/features/space/spaceSlice";

type props = {
  status: string;
  price: string;
  id: number | string;
  type: string;
};
export const Space = ({ status, price, id, type }: props) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setSelectedSpace({ price, id, type }));
    dispatch(openDialog());
  };
  return (
    <div
      className={`rounded-md flex flex-col relative gap-2 shadow-lg shadow-slate-600 hover:scale-105 duration-150 transition-all ${
        status === "free" ? "bg-primary" : "bg-red-900"
      } p-5`}>
      <CategoryType type={type} />
      <div className="flex justify-evenly items-centers">
        <div>
          <h3 className="text-white text-xl font-semibold">{id}</h3>
          <h2 className="text-white text-2xl font-semibold">${price}</h2>
        </div>
        <FaCar className="text-5xl text-white line-through" />
      </div>
      <button
        className="bg-white rounded-full text-center p-2 my-3"
        type="button"
        onClick={handleClick}>
        {status === "free" ? "Reserve now" : "Occupied"}
      </button>
    </div>
  );
};
