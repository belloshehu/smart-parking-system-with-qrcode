"use client";
import React from "react";
import { DashboardBadge } from "../components/DashboardBadge";
import { reservedSpaces, spaces } from "@/utils/space";
import ReservedSpace from "../components/ReservedSpace";

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center p-5 md:px-40 pb-10">
      <div className="rounded-md shadow-md p-5 md:p-10 gap-5 min-w-full justify-center items-center text-center bg-white">
        <h2 className="text-3xl text-primary mb-4">Welcome, buddy</h2>
        <div className="flex justify-evenly items-center w-full">
          <DashboardBadge
            status="free"
            count={spaces.filter((space) => space.status === "free").length}
          />
          <DashboardBadge
            status="occupied"
            count={spaces.filter((space) => space.status === "occupied").length}
          />
        </div>
      </div>

      {/* my spaces */}
      <div className="min-w-full p-0 md:p-20">
        <h1 className="text-primary text-xl my-4 font-bold ml-0 md:ml-24">
          My spaces
        </h1>
        <div className="min-w-full flex flex-col gap-5 justify-center items-center">
          {reservedSpaces.map((space) => (
            <ReservedSpace key={space.id} {...space} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
