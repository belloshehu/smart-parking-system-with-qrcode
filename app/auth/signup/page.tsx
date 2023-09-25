import Heading from "@/app/components/Heading";
import LoginForm from "@/app/components/LoginForm";
import Image from "next/image";
import React from "react";
import SignupForm from "@/app/components/SignupForm";

const SignupPage = () => {
  return (
    <div className="container p-0">
      <div className="auth-page w-full grid grid-cols-1 md:grid-cols-2 h-screen">
        <div className="w-full m-auto p-2 pb-10 bg-slate-200 bg-opacity-50 h-full">
          <Heading text="Sign up" style="" />
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
