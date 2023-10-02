import React, { useEffect, useState } from "react";
import { Space } from "./Space";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { BiSad } from "react-icons/bi";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SpaceType = {
  _id: string;
  id: string;
  price: number;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const SpaceList = async ({
  spaces,
  loading,
}: {
  spaces: SpaceType[];
  loading: boolean;
}) => {
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <FaSpinner className="text-xl animate-spin" />
      </div>
    );
  }
  if (spaces?.length === 0 || !spaces) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center bg-slate-100 p-5">
        <p>Oops! there are no spaces yet</p>
        <BiSad className="text-primary text-3xl md:text-5xl" />
        {/* Only show button on other pages beside admin pages */}
        {!pathname.includes("/admin") && (
          <Link
            className="bg-primary text-white rounded-md p-2 px-4"
            href={"/dashboard/admin/spaces"}>
            Add parking Spaces
          </Link>
        )}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-0 md:px-20 w-full gap-8 my-5">
      {spaces?.map((space) => (
        <Space key={space._id} space={space} />
      ))}
    </div>
  );
};

export default SpaceList;
