"use client";
import { ErrorMessage, Field } from "formik";
import { styles } from "../styles";

const CustomInputField = ({ ...props }) => {
  return (
    <div className="flex flex-col  gap-2 w-full">
      <label htmlFor={props.name} className={props?.lableStyle}>
        {props.label}
      </label>
      <Field
        name={props.name}
        type={props.type || "text"}
        className={`${styles.input} w-full`}
        placeholder={props.placeholder}
      />
      <ErrorMessage
        name={props.name}
        render={(msg) => (
          <small className="error-text text-red-500">{msg}</small>
        )}
      />
    </div>
  );
};

export default CustomInputField;
