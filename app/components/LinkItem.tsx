import Link from "next/link";
import React from "react";
import { closeModal } from "../GlobalRedux/features/modal/modalSlice";
import { useDispatch } from "react-redux";
type props = {
  url: string;
  children: React.ReactNode;
};

function LinkItem({ url, children }: props) {
  const dispatch = useDispatch();
  const closeSidebar = () => dispatch(closeModal());
  return (
    <Link onClick={closeSidebar} href={url}>
      {children}
    </Link>
  );
}

export default LinkItem;
