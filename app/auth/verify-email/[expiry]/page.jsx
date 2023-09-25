"use client";
import VerificationForm from "../../../components/VerificationForm";

const EmailVerificationPage = ({ params }) => {
  const { expiry } = params;
  return (
    <div className=" flex-1 py-auto py-10 pb-auto flex flex-col justify-center items-center">
      <VerificationForm
        form_heading={"Email verification"}
        form_description={
          "Verification code was sent to your email. Enter the code below"
        }
        verificationType={"email"}
        expiry={expiry}
      />
    </div>
  );
};

export default EmailVerificationPage;
