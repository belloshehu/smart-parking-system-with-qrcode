"use client";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { toast } from "react-hot-toast";
import CustomInputField from "./CustomInputField";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import FormMessage from "./FormMessage";
import SubmitButton from "./SubmitButton";
import { setUser } from "../GlobalRedux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import CustomSelectField from "./CustomSelectField";
import {
  resetReservation,
  setIsModalOpen,
  setReservation,
} from "../GlobalRedux/features/space/spaceSlice";
import { formatedTodayDate } from "@/utils";
import dayjs from "dayjs";

type responseMsgType = {
  text: string;
  type: "error" | "success";
};

const SpaceForm = () => {
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
    <div
      className={`w-full md:w-3/5 mx-auto  md:p-0 p-0  relative border-2 rounded-md`}>
      <Formik
        initialValues={{
          id: "",
          type: "normal",
          price: 10, // N10 per minute
          status: "free",
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setIsLoading(true);
          axios
            .post("/api/space", values)
            .then((callback: any) => {
              if (callback?.error) {
                toast.error(callback?.error);
                if (callback.error?.toLowerCase() === "email not verified") {
                  router.push("/auth/verificationCode/email");
                }
                setResponseMsg({ type: "error", text: callback.error });
              }
              if (callback?.data.success) {
                toast.success("Space added successfully");
                setResponseMsg({
                  text: callback.data.message,
                  type: "success",
                });
                resetForm();
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

              setIsLoading(false);
            });
        }}
        validationSchema={Yup.object({
          id: Yup.string().required("Space ID required"),
          type: Yup.string().required("Type required"),
          price: Yup.number().required("Price required"),
          status: Yup.string().required("Status required"),
        })}>
        {({ handleChange, getFieldHelpers, getFieldProps, values }) => (
          <Form>
            <div className="flex flex-col items-center justify-center gap-2 md:gap-5 w-full">
              <FormMessage message={responseMsg} />
              <CustomInputField
                name="id"
                label="ID"
                placeholder="Space ID"
                type="text"
              />

              <CustomSelectField label="Type" name="type">
                <option value={"vip"} selected>
                  VIP
                </option>
                <option value={"normal"}>Normal</option>
              </CustomSelectField>

              <CustomSelectField label="Status" name="status">
                <option value={"free"} selected>
                  Free
                </option>
                <option value={"occupied"}>Occupied</option>
                <option value={"reserved"}>Reserved</option>
              </CustomSelectField>

              <div className="flex w-full justify-between gap-5 items-center">
                <CustomInputField
                  name="price"
                  label="Price (in Naira) per minute"
                  placeholder="Price per minute"
                  type="number"
                />
              </div>
              <div className="flex flex-col gap-1 justify-center items-center w-full my-4">
                <SubmitButton isLoading={isLoading} />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SpaceForm;
