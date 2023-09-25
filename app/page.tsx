"use client";
import { CategoryList } from "./components/CategoryList";
import { spaces } from "@/utils/space";
import { Space } from "./components/Space";
import ReservationForm from "./components/ReservationForm";
import Dialog from "./components/Dialog";
import { SelectedSpace } from "./components/SelectedSpace";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { calculateCost } from "@/utils";
import { useRouter } from "next/navigation";
import PaystackPop from "@paystack/inline-js";

export default function Home() {
  const router = useRouter();
  const handleProceed = async () => {
    router.push("payment");
  };
  const { selectedSpace, reservation } = useSelector(
    (store: any) => store.space
  );
  useEffect(() => {}, [reservation]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5 md:px-40 pb-10">
      <div className="w-full">
        <h3 className="text-primary text-left md:text-center text-2xl font-semibold">
          Categories
        </h3>
        <CategoryList />
      </div>
      <div className="w-full my-8">
        <h1 className="text-2xl  md:text-3xl text-primary text-left font-bold">
          Spaces
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8 my-5">
          {spaces.map((space) => (
            <Space key={space.id} {...space} />
          ))}
        </div>
      </div>
      <Dialog
        title="Reservation Detail"
        okButtonText="Proceed"
        okClickHandler={handleProceed}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 h-full w-full">
          <div className="flex flex-row-reverse md:flex-col-reverse text-white justify-center h-full gap-5 items-center w-full rounded-md p-5 bg-primary">
            <div>
              <h1 className="text-3xl font-bold">
                Total: ${" "}
                {calculateCost(
                  parseFloat(selectedSpace?.price?.split("/").at(0)),
                  reservation?.durationHour,
                  reservation?.durationMinutes
                ).toFixed(2)}
              </h1>
            </div>
            <SelectedSpace {...selectedSpace} />
          </div>
          <ReservationForm />
        </div>
      </Dialog>
    </main>
  );
}
