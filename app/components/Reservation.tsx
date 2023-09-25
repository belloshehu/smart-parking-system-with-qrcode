import React from "react";
import { SelectedSpace } from "./SelectedSpace";
import { useSelector } from "react-redux";
import { calculateCost } from "@/utils";

const Reservation = () => {
  const { selectedSpace, reservation } = useSelector(
    (store: any) => store.space
  );
  return (
    <div className="bg-primary w-full p-5 flex justify-between items-center text-white">
      <h2 className="text-3xl">
        $
        {calculateCost(
          parseFloat(selectedSpace?.price?.split("/").at(0)),
          reservation?.durationHour,
          reservation?.durationMinutes
        ).toFixed(2)}
      </h2>
      <SelectedSpace {...selectedSpace} />
    </div>
  );
};

export default Reservation;
