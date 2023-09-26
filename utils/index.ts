export const calculateCost = (
  price: number,
  hours: number,
  minutes: number
) => {
  const duration = hours * 60 + minutes;
  return duration * price;
};

export const formatedTodayDate = () => {
  const date = new Date().toLocaleDateString();
  const [day, month, year] = date.split("/");

  let formatedDate = "";

  formatedDate = year + "-" + month + "-" + day;
  return formatedDate;
};
