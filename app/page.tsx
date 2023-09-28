"use client";
import { CategoryList } from "./components/CategoryList";
import SpaceList from "./components/SpaceList";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5 md:px-40 pb-10">
      <div className="w-full flex flex-col gap-5 text-center justify-center items-center py-10">
        <div>
          <h1 className="text-3xl font-bold md:text-5xl animate-pulse text-primary first-letter:text-8xl">
            Flexible parking space for your vehicle.
          </h1>
          <h3 className="text-2xl md:text-3xl text-black font-bold animate-bounce">
            Make reservation online
          </h3>
        </div>
        <p>
          Reserve a space any time and you can cancel any time before it
          expires.
        </p>
      </div>
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
