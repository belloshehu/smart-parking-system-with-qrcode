import React from "react";

type props = {
  type: string;
};

export const CategoryType = ({ type }: props) => {
  return (
    <div className="rounded-tr-md p-1 px-2 bg-white text-primary text-center top-0 right-0 w-fit absolute">
      {type}
    </div>
  );
};
