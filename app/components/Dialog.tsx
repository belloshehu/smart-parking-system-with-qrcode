"use client";
import React, { useRef, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

type Props = {
  children: React.ReactNode;
  title: string;
  okButtonText: string;
  okClickHandler: () => void;
};

const Dialog = ({ children, title, okButtonText, okClickHandler }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { dialogOpen } = useSelector((store: any) => store.modal);

  const close = () => {
    dialogRef?.current?.close();
  };

  useEffect(() => {
    if (dialogOpen == true) {
      dialogRef?.current?.showModal();
    } else {
      dialogRef?.current?.close();
    }
  }, [dialogOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="w-full md:w-3/5 backdrop:backdrop-blur-sm bg-slate-200 p-5 md:p-8 rounded-md">
      <button
        type="button"
        className="top-2 right-2 absolute text-primary"
        onClick={close}>
        <FaTimes />
      </button>
      <header>
        <h1 className="text-xl  text-primary font-semibold mb-4">{title}</h1>
      </header>
      {children}
      <footer className="flex justify-end gap-5 items-center w-full mt-10">
        <button
          className="p-2 px-4 bg-slate-400 text-primary text-center rounded-md"
          onClick={close}>
          Cancel
        </button>
        <button
          className="p-2 px-4 bg-primary text-white text-center rounded-md"
          onClick={okClickHandler}>
          {okButtonText}
        </button>
      </footer>
    </dialog>
  );
};

export default Dialog;
