"use client";

import { FilterType } from "@/typings/types";
import { useState } from "react";
import { Filter } from "./Filter";
import SpaceList from "./SpaceList";

export const HomePageWrapper = () => {
	const [filter, setFilter] = useState<FilterType>("all");
	return (
		<div className="flex w-full md:flex-row flex-col gap-5 md:gap-14 items-start justify-between">
			<Filter setFilter={setFilter} filter={filter} />
			<div className="w-full md:w-4/5">
				<h1 className="text-2xl  md:text-3xl text-primary text-left font-bold mb-5">
					Spaces
				</h1>
				<SpaceList />
			</div>
		</div>
	);
};
