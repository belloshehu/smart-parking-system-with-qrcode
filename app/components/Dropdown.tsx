import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearUser } from "../GlobalRedux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { logout } from "@/utils/auth";

const Dropdown = ({ showDropdown }: { showDropdown: boolean }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useSelector((store: any) => store.auth);
  return (
    <div
      className={`flex flex-col gap-5 w-1/6 p-5 shadow-lg absolute top-[105%] right-0 bg-cyan-100 ${
        showDropdown
          ? "translate-x-0 rotate-0 scale-100"
          : "translate-x-[100%] rotate-[360deg] scale-[10%]"
      } transition-all duration-500`}>
      <div className="border-b-2 pb-1 flex items-center gap-4">
        <FaUser className="text-xl text-cyan-800" />
        <h3>Hello, {user.firstName}</h3>
      </div>
      <div className="w-full flex flex-col gap-4">
        <Link href={"/dashboard"}>Dashboard</Link>
        <Link href={"/profile"}>Profile</Link>
        <button
          className="p-2 px-5 rounded-3xl bg-cyan-900 text-white w-full"
          onClick={() => logout(dispatch, router)}>
          log out
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
