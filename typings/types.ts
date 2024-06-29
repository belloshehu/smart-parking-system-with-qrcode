export type Reservation = {
  _id: string;
  user: string;
  space: {
    _id: string;
    type: string;
    status: string;
    price: number;
    id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  amount: number;
  createdAt: string;
  duration: number;
  checkInDate: string;
  checkInTime: string;
  vehicleNumber: string;
  status: "valid" | "cancelled" | "expired";
};
