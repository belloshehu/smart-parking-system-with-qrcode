import React from "react";
import { CiWarning } from "react-icons/ci";
import { FaThumbsUp } from "react-icons/fa";

type messageProps = {
  type: "error" | "success";
  text: string;
};

const FormMessage = ({ message }: { message: messageProps }) => {
  return (
    <div
      className={`${
        message.text
          ? "translate-x-0 scale-[100%]"
          : "-translate-x-[100%] scale-[30%]"
      } transition-all duration-300  w-full mx-auto my-5 absolute -top-5 left-0`}>
      {message.text && (
        <div
          className={`flex gap-2 items-center ${
            message.type === "success" ? "text-green-700" : "text-red-700"
          } bg-slate-100 w-full justify-center px-2`}>
          {message.type === "success" ? (
            <FaThumbsUp className="text-lg" />
          ) : (
            <CiWarning className="text-lg" />
          )}
          <p>{message.text}</p>
        </div>
      )}
    </div>
  );
};

export default FormMessage;
