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
import { FaChevronUp, FaChevronDown, FaUserCircle } from "react-icons/fa";

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
    <div className="p-2 md:p-5 flex justify-between items-center w-full mb-10 relative">
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

      <div className="hidden md:visible md:flex items-center gap-4">
        {!user ? (
          <div className="flex items-center gap-2">
            <Link
              href={"/auth/signup"}
              className="p-2 px-5 rounded-3xl bg-primary text-white">
              Sign up
            </Link>
            <Link href={"/auth/login"}>Login</Link>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <div className="flex gap-6 items-center">
              <Link href={"/auth/login"}>
                <FaUserCircle className="text-3xl text-primary shadow-2xl rounded-full ring-2 ring-white" />
              </Link>
            </div>
            <small>Hello, {user?.firstName}</small>
            {showDropdown ? (
              <FaChevronUp onClick={() => setShowDropdown(false)} />
            ) : (
              <FaChevronDown onClick={() => setShowDropdown(true)} />
            )}
          </div>
        )}
      </div>
      <div className="visible inline md:hidden">
        <CiMenuFries
          className="text-primary text-2xl"
          onClick={() => dispatch(openModal())}
        />
      </div>
      {isOpened && <Sidebar />}
      {user && <Dropdown showDropdown={showDropdown} />}
    </div>
  );
};
