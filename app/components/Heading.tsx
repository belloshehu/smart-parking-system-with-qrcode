import React from "react";
import Image from "next/image";
import Link from "next/link";

const Heading = ({ text, style }: { text: string; style: string }) => {
  return (
    <div className="flex justify-center gap-5 items-center w-full">
      <Link href={"/"}>
        <Image src={"/logo.png"} alt="logo" height={60} width={80} />
      </Link>
      <h2
        className={`text-2xl font-bold text-primary md:text-3xl my-5 text-center border-b-4 border-primary pb-3 w-fit mb-10 ${style}`}>
        {text}
      </h2>
    </div>
  );
};

export default Heading;
