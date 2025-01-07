import React from "react";
import Link from "next/link";
import { styles } from "../styles";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex justify-between gap-5 md:gap-10 bg-slate-300 text-primary p-5 md:px-24 md:py-10 w-full">
      <div className="text-center">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            alt="logo"
            height={100}
            width={100}
            className=""
          />
        </Link>
      </div>
      <div className="text-sm">
        <ul className="list-none">
          <li className={styles.underlinedLink}>
            <Link href="/about">About Us</Link>
          </li>
          <li className={styles.underlinedLink}>
            <Link href="/pricing">Pricing</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
