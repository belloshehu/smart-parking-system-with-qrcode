import { FilterType } from "@/typings/types";
import { cn } from "@/utils/utils";

interface FilterButtonProps {
	className?: string;
	name: FilterType;
	selected: boolean;
	clickHandler: (val: FilterType) => void;
}
export const FilterButton = ({
	className,
	name,
	selected,
	clickHandler,
}: FilterButtonProps) => {
	return (
		<button
			className={cn(
				"capitalize text-left p-2 px-3 rounded-md shadow-sm",
				selected ? "bg-primary text-white" : "hover:bg-slate-200",
				className
			)}
			onClick={() => {
				clickHandler(name);
			}}
		>
			{name}
		</button>
	);
};
