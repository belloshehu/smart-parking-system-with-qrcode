"use client";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Link from "next/link";
import { styles } from "../styles";
import { toast } from "react-hot-toast";
import axios from "axios";
import CustomInputField from "./CustomInputField";
import PhoneNumberField from "./PhoneNumberField";
import { useRouter } from "next/navigation";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { CiWarning } from "react-icons/ci";
import FormError from "./FormMessage";

type responseMsgType = {
  text: string;
  type: "error" | "success";
};

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState<responseMsgType>({
    text: "",
    type: "error",
  });
  const router = useRouter();
  return (
    <div
      className={`w-full md:w-3/5 mx-auto shadow-xl md:p-10 p-5 ${styles.gradientSlateCyan} relative`}>
      <Formik
        initialValues={{
          email: "",
          phoneNumber: "",
          firstName: "",
          lastName: "",
          //   terms: "",
          // phoneNumber: "",
          password: "",
          passwordRepeat: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setIsLoading(true);
          axios
            .post("/api/signup", values)
            .then((res) => {
              toast.success("Signed up successfully");
              setIsLoading(false);
              router.push(
                `/auth/verifyEmail/${res.data.verificationCodeExpiry}`
              );
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
          firstName: Yup.string()
            .min(2, "Must be atlest 2 characters")
            .required("First name is required"),
          lastName: Yup.string()
            .min(2, "Must be atlest 2 characters")
            .required("Other name is required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          // phoneNumber: Yup.string().required("Phone number is required"),
          password: Yup.string()
            .min(8, "Must be at least 8 characters")
            .required("Password required")
            .matches(/[a-z]+/, "Must contain atleast one lowercase character")
            // .matches(/[A-Z]+/, "One uppercase character")
            // .matches(/[@$!%*#?&]+/, "One special character")
            .matches(/\d+/, "Must contain atleast one number"),
          passwordRepeat: Yup.string()
            .required("Confirm password required")
            .oneOf([Yup.ref("password"), null!], "Passwords must match"),
          //   terms: Yup.string().required("You must accept the terms to proceed"),
        })}>
        <Form>
          <div className="flex flex-col items-center justify-center gap-2 md:gap-5 w-full">
            <FormError message={responseMsg} />
            <div className="flex flex-col lg:flex-row gap-4 md:gap-3 w-full mb-2">
              <CustomInputField
                name="firstName"
                label="First name"
                placeholder="First name"
                type="text"
              />
              <CustomInputField
                name="lastName"
                label="Last name"
                placeholder="Last name"
                type="text"
              />
            </div>

            <CustomInputField
              name="email"
              label="Email"
              placeholder="Email"
              type="email"
            />

            {/* <PhoneNumberField
              label="Phone number"
              defaultCountry="NG"
              name="phoneNumber"
              placeholder="Phone number"
              styleValue={styles.input}
            /> */}

            <div className="flex flex-col lg:flex-row gap-4 md:gap-3 w-full mt-2">
              <CustomInputField
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
              />
              <CustomInputField
                name="passwordRepeat"
                label="Password repeat"
                placeholder="Password repeat"
                type="password"
              />
            </div>

            <SubmitButton isLoading={isLoading} />
          </div>
        </Form>
      </Formik>
      {/* <SocialLoginButton
        text={"Continue with Google"}
        provider={"google"}
        socialIcon={googleIcon}
      /> */}
      <div className="flex justify-center items-center gap-1">
        <p>Have an account? </p>
        <Link href="/auth/login" className="underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
