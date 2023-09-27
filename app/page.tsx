"use client";
import { CategoryList } from "./components/CategoryList";
import SpaceList from "./components/SpaceList";

export default async function Home() {
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
        <SpaceList />
      </div>
    </main>
  );
}
