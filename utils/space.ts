export const spaces = [
  { id: 0, price: "30/min", status: "free", type: "VIP" },
  { id: 1, price: "10/min", status: "occupied", type: "Normal" },
  { id: 2, price: "10/min", status: "free", type: "Normal" },
];

export const reservedSpaces = [
  {
    id: 0,
    price: "30/min",
    status: "free",
    type: "VIP",
    date: "23/09/2023",
    time: "02:30",
    duration: 120,
    cost: 3,
  },
  {
    id: 1,
    price: "10/min",
    status: "occupied",
    type: "Normal",
    date: "23/09/2023",
    time: "02:30",
    duration: 180,
    cost: 4.5,
  },
  {
    id: 2,
    price: "10/min",
    status: "free",
    type: "Normal",
    date: "23/09/2023",
    time: "02:30",
    duration: 120,
    cost: 3,
  },
];

export const pricings = [
  {
    id: 0,
    title: "Normal",
    price: 10,
    currency: "N",
    duration: "minute",
  },
  {
    id: 1,
    title: "VIP",
    price: 30,
    currency: "N",
    duration: "minute",
  },
];
