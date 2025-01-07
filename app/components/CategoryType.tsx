import React from "react";

type Props = {
  type: string;
  price: number;
};

export const CategoryType = ({ type, price }: Props) => {
  return (
    <div className="rounded-t-md p-1 px-2 bg-white text-primary text-center top-0 right-0 w-full absolute">
      <p className="capitalize">
        {type} (<span className="line-through">N</span> {price}/minutes)
      </p>
    </div>
  );
};
