import { number } from "yup";

export const calculateDuration = (hours: number, minutes: number) => {
  if (typeof minutes === "string") {
    return hours * 60 + parseInt(minutes);
  }
  return hours * 60 + minutes;
};
export const calculateCost = (
  price: number,
  hours: number,
  minutes: number
) => {
  return calculateDuration(hours, minutes) * price;
};

export const formatedTodayDate = () => {
  const date = new Date().toLocaleDateString();
  const [day, month, year] = date.split("/");

  let formatedDate = "";

  formatedDate = year + "-" + month + "-" + day;
  return formatedDate;
};
