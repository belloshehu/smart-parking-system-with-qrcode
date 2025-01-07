import React from "react";

type Props = {
  title: string;
  price: number;
  currency: string;
  duration: string;
};
export const Pricing = ({ title, price, currency, duration }: Props) => {
  return (
    <div className="flex flex-col gap-2 bg-white shadow-md rounded-md p-5">
      <h3 className="text-primary font-semibold text-xl text-center">
        {title}
      </h3>
      <p>
        <span className="line-through">{currency}</span>
        {price}/{duration}
      </p>
    </div>
  );
};
