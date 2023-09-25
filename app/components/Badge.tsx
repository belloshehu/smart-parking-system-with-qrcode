import React from "react";

type props = {
  count: number;
  title: string;
};
export const Badge = ({ title, count }: props) => {
  return (
    <div className="p-0 flex flex-col justify-center items-center -top-2 -right-2 absolute">
      <div className="bg-slate-200 rounded-full ring-4 ring-primary w-12 h-12 flex justify-center items-center -space-y-10">
        <h4 className="text-xl text-center text-primary">{count}</h4>
      </div>
    </div>
  );
};
