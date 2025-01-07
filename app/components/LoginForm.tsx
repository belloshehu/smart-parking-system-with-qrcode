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
import FormMessage from "./FormMessage";
import { setUser } from "../GlobalRedux/features/auth/authSlice";
import { useDispatch } from "react-redux";

type responseMsgType = {
  text: string;
  type: "error" | "success";
};

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [responseMsg, setResponseMsg] = useState<responseMsgType>({
    text: "",
    type: "error",
  });
  return (
    <div
      className={`w-full md:w-3/5 mx-auto shadow-xl md:p-10 p-5 ${styles.gradientSlateCyan}  relative`}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setIsLoading(true);
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
                  console.log(callback.data.user);
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
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string()
            .min(8, "Must be at least 8 characters")
            .required("Password required")
            .matches(/[a-z]+/, "Must contain atleast one lowercase character")
            // .matches(/[A-Z]+/, "One uppercase character")
            // .matches(/[@$!%*#?&]+/, "One special character")
            .matches(/\d+/, "Must contain atleast one number"),
        })}>
        <Form>
          <div className="flex flex-col items-center justify-center gap-2 md:gap-5 w-full">
            <FormMessage message={responseMsg} />
            <CustomInputField
              name="email"
              label="Email"
              placeholder="Email"
              type="email"
            />

            <CustomInputField
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
            />

            <div className="flex flex-col gap-1 justify-center items-center w-full my-4">
              <div className="flex justify-between items-center text-blue-500 underline w-full">
                {/* <Link href={"/auth/verificationCode/email"}>Verify email</Link> */}
                {/* <Link href={"/auth/verificationCode/password"}>
                  forgot password
                </Link> */}
              </div>
              <SubmitButton isLoading={isLoading} />
            </div>
          </div>
        </Form>
      </Formik>
      <div className="flex justify-center items-center gap-1">
        <p>Have no account? </p>
        <Link href="/auth/signup" className="underline">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
