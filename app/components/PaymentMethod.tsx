import React from "react";

type Props = {
  title: string;
};
const PaymentMethod = ({ title }: Props) => {
  return (
    <div className="rounded-md p-3 bg-slate-200 shadow-md text-primary text-center w-full md:w-2/3">
      <p>{title}</p>
    </div>
  );
};

export default PaymentMethod;
