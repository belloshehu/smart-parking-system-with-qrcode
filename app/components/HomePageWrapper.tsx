"use client";

import { FilterType } from "@/typings/types";
import { useState } from "react";
import { Filter } from "./Filter";
import SpaceList from "./SpaceList";

export const HomePageWrapper = () => {
	const [filter, setFilter] = useState<FilterType>("all");
	return (
		<div className="flex w-full md:flex-row flex-col gap-5 md:gap-10 items-center justify-between">
			<Filter setFilter={setFilter} filter={filter} />
			<div className="w-full md:w-4/5 my-8">
				<h1 className="text-2xl  md:text-3xl text-slate-600 text-left font-bold">
					Spaces
				</h1>
				<SpaceList />
			</div>
		</div>
	);
};
