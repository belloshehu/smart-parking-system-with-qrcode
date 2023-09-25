export const calculateCost = (
  price: number,
  hours: number,
  minutes: number
) => {
  console.log(price, hours, minutes);
  const duration = hours * 60 + minutes / 60;
  return duration * price;
};
