import { spaceFilters } from "@/constants";
import { FilterType } from "@/typings/types";
import { FilterButton } from "./FilterButton";

interface FilterProps {
	setFilter: React.Dispatch<FilterType>;
	filter: FilterType;
}
export const Filter = ({ setFilter, filter }: FilterProps) => {
	const handleFilterClick = (name: FilterType) => {
		console.log("selected", name);
		setFilter(name);
	};
	return (
		<aside className="w-full md:w-1/5 bg-slate-50 p-5 flex md:flex-col  flex-row gap-3 md:min-h-[40vh] max-h-fit justify-between md:justify-center ">
			{spaceFilters.map((item) => (
				<FilterButton
					name={item}
					clickHandler={handleFilterClick}
					key={item}
					selected={item == filter}
				/>
			))}
		</aside>
	);
};
