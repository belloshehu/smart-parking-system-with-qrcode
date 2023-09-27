"use client";
import React from "react";

type props = {
  children: React.ReactNode;
};
const DashboardLayout = ({ children }: props) => {
  return <div className="p-">{children}</div>;
};

export default DashboardLayout;
