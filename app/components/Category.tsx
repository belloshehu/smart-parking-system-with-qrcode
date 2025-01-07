import React from "react";
import { Badge } from "./Badge";

type props = {
  count: number;
  title: string;
};

export const Category = ({ title, count }: props) => {
  return (
    <div className="relative rounded-lg bg-opacity-80 bg-primary text-white flex flex-col items-center justify-center p-8 shadow-2xl shadow-black">
      <h1 className="text-2xl md:text-5xl">{title}</h1>
      {/* <div className="grid grid-cols-2 gap-3">
        <Badge count={available} title="Available" />
    </div> */}
      <Badge count={count} title="" />
    </div>
  );
};
