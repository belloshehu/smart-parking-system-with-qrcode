"use client";
import React from "react";
import { Category } from "./Category";
import ReservationForm from "./ReservationForm";
import { useSelector } from "react-redux";

type Space = {
  _id: string;
  id: string;
  price: number;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const CategoryList = () => {
  const { spaces } = useSelector((store: any) => store.space);
  return (
    <div className="w-full p-3 bg-gradient-to-tr rounded-md from-primary to-white auth-page">
      <div className="grid grid-cols-2 gap-5 place-content-center w-full md:w-2/3 mx-auto">
        <Category
          count={spaces.filter((space: Space) => space.type === "vip").length}
          title="vip"
        />
        <Category
          count={
            spaces.filter((space: Space) => space.type === "normal").length
          }
          title="normal"
        />
      </div>
      <dialog>
        <ReservationForm />
      </dialog>
    </div>
  );
};
