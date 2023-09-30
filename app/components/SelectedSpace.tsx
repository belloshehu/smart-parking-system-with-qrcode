import React from "react";
import { FaCar } from "react-icons/fa";
import { number } from "yup";

type Props = {
  id: string | number;
  price: string;
  type: string;
};
export const SelectedSpace = ({ id, price, type }: Props) => {
  return (
    <div className="flex justify-center items-center gap-3 w-full  text-white">
      <div>
        <FaCar className="text-3xl md:text-5xl" />
      </div>
      <div className="flex gap-1 flex-col ">
        <h1 className="text-xl">{id}</h1>
        <h3>
          <span className="line-through">N</span>
          {price}/minutes
        </h3>
        <div className="p-1 px-2 rounded-full bg-slate-300 text-primary">
          <h3 className="text-sm text-center">{type}</h3>
        </div>
      </div>
    </div>
  );
};
