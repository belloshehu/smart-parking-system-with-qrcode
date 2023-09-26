import React from "react";
import { categories } from "@/utils/categories";
import { Category } from "./Category";
import ReservationForm from "./ReservationForm";

export const CategoryList = () => {
  return (
    <div className="w-full p-3 bg-gradient-to-tr rounded-md from-primary to-white auth-page">
      <div className="grid grid-cols-2 gap-5 place-content-center w-full md:w-2/3 mx-auto">
        {categories.map((category, index) => (
          <Category key={index} {...category} />
        ))}
      </div>
      <dialog>
        <ReservationForm />
      </dialog>
    </div>
  );
};
