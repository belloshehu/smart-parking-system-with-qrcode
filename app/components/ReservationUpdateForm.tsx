"use client";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { toast } from "react-hot-toast";
import CustomInputField from "./CustomInputField";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
// import FormMessage from "./FormMessage";
import { setUser } from "../GlobalRedux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  resetReservation,
  setReservation,
} from "../GlobalRedux/features/space/spaceSlice";
import { formatedTodayDate } from "@/utils";
import dayjs from "dayjs";

type responseMsgType = {
  text: string;
  type: "error" | "success";
};

type Props = {
  reservationId: string;
  mins: number;
  hrs: number;
};
const ReservationUpdateForm = ({ reservationId, mins, hrs }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { reservation } = useSelector((store: any) => store.space);
  const [responseMsg, setResponseMsg] = useState<responseMsgType>({
    text: "",
    type: "error",
  });

  useEffect(() => {
    dispatch(resetReservation());
  }, []);

  return (
    <div className={`w-full mx-auto  md:p-0 p-0  relative border-2 rounded-md`}>
      <Formik
        initialValues={{
          hours: hrs,
          minutes: mins,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          hours: Yup.number().required("Check in hour required"),
          minutes: Yup.number().required("Check in minute required"),
        })}>
        {({ values }) => (
          <Form
            onChange={async (e) => {
              dispatch(
                setReservation({
                  ...reservation,
                  durationHour: values.hours,
                  durationMinutes: values.minutes,
                  duration: values.hours * 60 + values.minutes,
                })
              );
            }}>
            <div className="flex flex-col items-center justify-center gap-2 md:gap-5 w-full">
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
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReservationUpdateForm;
