"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

type props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: props) => {
  const { user } = useSelector((store: any) => store.auth);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
    if (user?.role !== "admin" && path.includes("/admin")) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center p-5 md:px-40 pb-10">
      {children}
    </div>
  );
};

export default DashboardLayout;
