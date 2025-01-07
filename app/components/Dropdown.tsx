"use client";
import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { logout } from "@/utils/auth";
import LinkItem from "./LinkItem";
import { useClickOutside } from "@react-hooks-hub/use-click-outside";

interface Dropdownprops {
	showDropdown: boolean;
	setShowDropdown: (val: boolean) => void;
}
const Dropdown = ({ showDropdown, setShowDropdown }: Dropdownprops) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const ref = useRef(null);

	useClickOutside([ref], () => {
		setShowDropdown(false);
	});

	const { user } = useSelector((store: any) => store.auth);
	return (
		<div
			ref={ref}
			className={`hidden md:flex flex-col gap-5 w-1/6 p-5 shadow-lg absolute top-[100%] right-0 bg-cyan-100 ${
				showDropdown
					? "translate-x-0 rotate-0 scale-100"
					: "translate-x-[100%] rotate-[360deg] scale-[10%]"
			} transition-all duration-500`}
		>
			<div className="border-b-2 pb-1 flex items-center gap-4">
				<FaUser className="text-xl text-primary" />
				<h3>Hello, {user.firstName}</h3>
			</div>
			<div className="w-full flex flex-col gap-4">
				<LinkItem url="/dashboard">Dashboard</LinkItem>
				<LinkItem url="/dashboard/admin/reservations">Reservations</LinkItem>
				{user.role === "admin" ? (
					<LinkItem url="/dashboard/admin/spaces">Spaces</LinkItem>
				) : null}
				<button
					className="p-2 px-5 rounded-3xl bg-primary text-white w-full"
					onClick={() => logout(dispatch, router)}
				>
					log out
				</button>
			</div>
		</div>
	);
};

export default Dropdown;
