import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Reservation User Id required"],
      ref: "User",
    },
    space: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Space Id is required"],
      ref: "Space",
    },
    amount: {
      type: Number,
      required: [true, "Reservation Amount required"],
    },
    checkInTime: {
      type: String,
      required: [true, "CheckIn time required"],
    },
    checkInDate: {
      type: Date,
      required: [true, "CheckIn date required"],
    },
    duration: {
      type: Number, // duration in minutes
      required: [true, "Reservation duration required"],
    },
    vehicleNumber: {
      type: String,
      required: [true, "Vehicle number required"],
    },
    status: {
      type: String,
      required: [true, "Status required"],
      default: "valid",
      enum: {
        values: ["cancelled", "expired", "valid"],
        message: "{VALUE} is not a valid reservation status",
      },
    },
    paymentReference: {
      type: String,
      required: [true, "Payment Reference required"],
    },
  },
  { timestamps: true }
);

const Reservation =
  mongoose.models.Reservation ||
  mongoose.model("Reservation", ReservationSchema);
export default Reservation;
