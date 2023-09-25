"use client";
import { useField } from "formik";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const PhoneNumberField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={props.id || props.name}>{label}</label>
      <PhoneInput
        type="text"
        className={`flex gap-4 ${props.styleValue}`}
        defaultCountry={props.defaultCountry}
        {...field}
        {...props}
        onChange={(value) => {
          helpers.setValue(value);
        }}
      />
      {meta.error && meta.touched ? (
        <div>
          <small className="text-red-500">{meta.error}</small>
        </div>
      ) : null}
    </div>
  );
};

export default PhoneNumberField;
