"use client";
import { CategoryList } from "./components/CategoryList";
import { spaces } from "@/utils/space";
import { Space } from "./components/Space";

import { useDispatch, useSelector } from "react-redux";
import { calculateCost } from "@/utils";
import { useRouter } from "next/navigation";
import { setReservation } from "./GlobalRedux/features/space/spaceSlice";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedSpace, reservation } = useSelector(
    (store: any) => store.space
  );
  // const { dialogRef } = useSelector((store: any) => store.modal);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5 md:px-40 pb-10">
      <div className="w-full">
        <h3 className="text-slate-600 text-left md:text-center text-2xl font-semibold">
          Categories
        </h3>
        <CategoryList />
      </div>
      <div className="w-full my-8">
        <h1 className="text-2xl  md:text-3xl text-slate-600 text-left font-bold">
          Spaces
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 px-0 md:px-20 w-full gap-8 my-5">
          {spaces.map((space) => (
            <Space key={space.id} {...space} />
          ))}
        </div>
      </div>
    </main>
  );
}
