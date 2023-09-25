"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../GlobalRedux/features/modal/modalSlice";
import Sidebar from "./Sidebar";
import Dropdown from "./Dropdown";
import { usePathname } from "next/navigation";

export const Header = () => {
  const { isOpened } = useSelector((store: any) => store.modal);
  const { user } = useSelector((store: any) => store.auth);
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const path = usePathname();
  if (path.split("/").includes("auth")) {
    return;
  }
  return (
    <div className="p-2 md:p-5 flex justify-between items-center w-full mb-10">
      <div>
        <Link href={"/"}>
          <Image src={"/logo.png"} alt="logo" height={100} width={100} />
        </Link>
      </div>
      <ul className="md:flex justify-center items-center gap-4 list-none p-0 text-primary hidden md:visible">
        <li>
          <Link href={"/pricing"}>Pricing</Link>
        </li>
        <li>
          <Link href={"/dashboard"}>Dashboard</Link>
        </li>
      </ul>
      <ul className="flex justify-center items-center gap-4 list-none p-0 text-primary">
        <li>
          <Link href={"/pricing"}>Sign up</Link>
        </li>
        <li>
          <Link
            href={"/auth/login"}
            className="rounded-full p-2 px-6 text-white bg-primary">
            Login
          </Link>
        </li>
      </ul>
      <div className="visible inline md:hidden">
        <CiMenuFries
          className="text-cyan-900 text-2xl"
          onClick={() => dispatch(openModal())}
        />
      </div>
      {isOpened && <Sidebar />}
      {user && <Dropdown showDropdown={showDropdown} />}
    </div>
  );
};
