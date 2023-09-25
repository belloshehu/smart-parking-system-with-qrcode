import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaLock, FaTimesCircle, FaUser } from "react-icons/fa";
import { logout } from "@/utils/auth";
import { closeModal } from "../GlobalRedux/features/modal/modalSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store: any) => store.auth);
  const { isOpened } = useSelector((store: any) => store.modal);
  const router = useRouter();

  const closeSidebar = () => dispatch(closeModal());
  return (
    <div
      className={`flex flex-col text-white gap-4 fixed h-screen z-50 top-0 left-0 w-[98%] backdrop:backdrop-blur-xl backdrop-brightness-0 ${
        isOpened
          ? " translate-x-0 scale-100 rotate-0"
          : "-translate-x-[100%] scale-50 rotate-180"
      }  bg-gradient-to-tr from-slate-700 to-primary p-4 transition-all duration-300`}>
      <FaTimesCircle
        className="top-3 text-3xl right-4 text-white absolute"
        onClick={() => dispatch(closeModal())}
      />
      <div className="border-b-2 pb-1 flex items-center gap-4">
        <FaUser className="text-xl text-slate-400" />
        <h3>Hello, {user ? user.firstName : "Buddy"}</h3>
      </div>
      <div className="w-full flex flex-col gap-4">
        <Link onClick={closeSidebar} href={"/dashboard"}>
          Dashboard
        </Link>
        <Link onClick={closeSidebar} href={"/profile"}>
          Profile
        </Link>
      </div>

      <div className="w-full mx-auto">
        {user ? (
          <button
            className="p-2 px-5 rounded-3xl bg-primary text-white w-full"
            onClick={() => logout(dispatch, router)}>
            log out
          </button>
        ) : (
          <div className="flex flex-col items-center justify-between gap-4 w-full mt-5">
            <Link
              onClick={closeSidebar}
              href={"/auth/login"}
              className="p-2 px-5 shadow-sm shadow-slate-400 rounded-3xl bg-primary text-white hover:text-slate-400 w-full flex items-center gap-2 justify-center">
              <FaLock /> log in
            </Link>
            <Link
              onClick={closeSidebar}
              href={"/auth/signup"}
              className="p-2 px-5 shadow-sm shadow-slate-400 rounded-3xl bg-primary text-white w-full text-center place-self-stretch">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
