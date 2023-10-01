"use client";
import React from "react";
import { Alegreya } from "next/font/google";

type props = {
  children: React.ReactNode;
};
const DashboardLayout = ({ children }: props) => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center p-5 md:px-40 pb-10">
      {children}
    </div>
  );
};

export default DashboardLayout;
