"use client";
import Heading from "@/app/components/Heading";
import LoginForm from "@/app/components/LoginForm";
import React from "react";

const LoginPage = () => {
  return (
    <div className="container p-0">
      <div className="auth-page w-full grid grid-cols-1 md:grid-cols-2 h-screen">
        <div className="w-full m-auto p-2 pb-10 bg-slate-200 bg-opacity-50 h-full">
          <div className="flex justify-between items-center gap-5 w-full">
            <Heading text="Login" style="text-primary" />
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
