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
  },
  { timestamps: true }
);

const Reservation =
  mongoose.models.Reservation ||
  mongoose.model("Reservation", ReservationSchema);
export default Reservation;
