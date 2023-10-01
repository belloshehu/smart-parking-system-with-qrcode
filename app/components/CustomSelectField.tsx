import { Field, useField } from "formik";
import { styles } from "../styles";

type InputProps = {
  children: React.ReactNode;
  name: string;
  label: string;
};
const CustomSelectField = ({ label, name, children, ...props }: InputProps) => {
  const [field, meta] = useField(name);
  return (
    <div className="flex flex-col  gap-2 w-full">
      <label htmlFor={name}>{label}</label>
      <select
        {...field}
        {...props}
        className={`${styles.input} focus:border-4`}>
        {children}
      </select>
      {meta.error && meta.touched ? (
        <div>
          <small className="text-red-500">{meta.error}</small>
        </div>
      ) : null}
    </div>
  );
};

export default CustomSelectField;
