"use client";
import ReactInputVerificationCode from "react-input-verification-code";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import axios from "axios";
import SubmitButton from "./SubmitButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import Timer from "./Timer";
// import CodeExpired from "./CodeExpired";

const VerificationForm = ({
  form_description,
  form_heading,
  expiry,
  verificationType,
}) => {
  const router = useRouter();
  const [duration, setDuration] = useState(expiry);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value) {
      toast.error("Enter verification code");
      return;
    }
    if (value.length < 6) {
      toast.error("Incomplete verification code");
      return;
    }
    try {
      setIsLoading(true);

      let res = null;
      if (verificationType === "email") {
        res = await axios.post("/api/auth/verifyemail", {
          code: value,
        });
      } else {
        res = await axios.post("/api/auth/resetpassword", {
          code: value,
        });
      }
      const { data } = res;
      toast.success(data.message);
      router.push(`/auth/verificationsuccess/${verificationType}`);
    } catch (error) {
      toast.error(error?.response?.data || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-1/3">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col items-center h-full w-full">
        <div className="mt-5 text-center">
          <h2
            className={`text-2xl font-bold lg:text-4xl text-center mb-5 text-primary`}>
            {form_heading}
          </h2>
          <p>{form_description}</p>
        </div>
        <section className="verification-form-body">
          {/* <Timer duration={duration} setDuration={setDuration} /> */}
          <div className="custom-styles">
            <ReactInputVerificationCode
              length={6}
              type="text"
              placeholder=""
              value={value}
              onChange={setValue}
            />
          </div>

          <div className="text-center my-4">
            <Link
              href={`/auth/verificationCode/${verificationType}`}
              className="text-blue-600 underline">
              Resend verification code
            </Link>
          </div>
          <SubmitButton isLoading={isLoading} />
        </section>
      </form>
    </div>
  );
};

export default VerificationForm;
