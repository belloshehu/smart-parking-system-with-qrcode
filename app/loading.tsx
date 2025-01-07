import { FaSpinner } from "react-icons/fa";

const loading = () => {
  return (
    <div className="flex justify-center items-center">
      <FaSpinner className="text-xl animate-spin" />
    </div>
  );
};

export default loading;
