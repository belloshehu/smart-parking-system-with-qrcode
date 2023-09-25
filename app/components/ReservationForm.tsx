"use client";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Link from "next/link";
import { toast } from "react-hot-toast";
import CustomInputField from "./CustomInputField";
import { useRouter } from "next/navigation";
import SubmitButton from "./SubmitButton";
import axios from "axios";
import { useState } from "react";
import { styles } from "../styles";
// import FormMessage from "./FormMessage";
import { setUser } from "../GlobalRedux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { setReservation } from "../GlobalRedux/features/space/spaceSlice";

type responseMsgType = {
  text: string;
  type: "error" | "success";
};

const ReservationForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { reservation } = useSelector((store: any) => store.space);
  const [responseMsg, setResponseMsg] = useState<responseMsgType>({
    text: "",
    type: "error",
  });
  return (
    <div className={`w-full mx-auto  md:p-0 p-0  relative border-2 rounded-md`}>
      <Formik
        initialValues={{
          date: "",
          checkIn: "",
          hours: 1,
          minutes: 0,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setIsLoading(true);
          console.log(values);
          axios
            .post("/api/login", values)
            .then((callback: any) => {
              if (callback?.error) {
                toast.error(callback?.error);
                if (callback.error?.toLowerCase() === "email not verified") {
                  router.push("/auth/verificationCode/email");
                }
              }
              if (callback?.data.success) {
                toast.success("Logged in successfully");
                setResponseMsg({
                  text: callback.data.message,
                  type: "success",
                });
                // save user in the local storage:
                if (typeof window !== "undefined") {
                  localStorage.setItem(
                    "user",
                    JSON.stringify(callback.data.user)
                  );
                }
                dispatch(setUser(callback.data.user));
                router.push("/");
              }

              setIsLoading(false);
            })
            .catch((error) => {
              toast.error(
                error.response.data.message || "Something went wrong"
              );
              setResponseMsg({
                text: error.response.data.message || "Something went wrong",
                type: "error",
              });
              // remove user when error occur
              if (typeof window !== "undefined") {
                localStorage.removeItem("user");
              }
              setIsLoading(false);
            });
        }}
        validationSchema={Yup.object({
          date: Yup.string(),
          checkIn: Yup.string(),
          hours: Yup.number(),
          minutes: Yup.number(),
        })}>
        {({ handleChange, getFieldHelpers, getFieldProps, values }) => (
          <Form
            onChange={(e) => {
              dispatch(
                setReservation({
                  ...reservation,
                  checkInDate: values.date,
                  checkInTime: values.checkIn,
                  durationHour: values.hours,
                  durationMinutes: values.minutes,
                })
              );
            }}>
            <div className="flex flex-col items-center justify-center gap-2 md:gap-5 w-full">
              {/* <FormMessage message={responseMsg} /> */}
              <CustomInputField
                name="date"
                label="Date"
                placeholder="Date"
                type="date"
              />

              <CustomInputField
                name="checkIn"
                label="Check In Time"
                placeholder="Check In"
                type="time"
              />

              <div className="flex w-full justify-between gap-5 items-center">
                <CustomInputField
                  name="hours"
                  label="Hours"
                  placeholder="Minutes"
                  type="number"
                />
                <CustomInputField
                  name="minutes"
                  label="Minutes"
                  placeholder="Minutes"
                  type="number"
                />
              </div>

              {/* <div className="flex w-full justify-between gap-5 items-center">
              <button
                type="button"
                className="rounded-full p-2 px-4 bg-slate-400 text-primary text-center">
                Cancel
              </button>
              <SubmitButton isLoading={isLoading} />
            </div> */}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReservationForm;
