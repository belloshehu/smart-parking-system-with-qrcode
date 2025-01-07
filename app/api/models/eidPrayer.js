import mongoose from "mongoose";
import { string } from "yup";

const EidPrayerSchema = new mongoose.Schema(
  {
    user: {
      ref: "User",
      type: mongoose.Types.ObjectId,
      required: [true, "User reference required"],
    },
    address: {
      type: String,
      required: [true, "Address required"],
      minlength: [5, "Address must be more than 5 characters"],
      maxlength: [30, "Address must not be more than 30 characters"],
    },
    city: {
      type: String,
      required: [true, "City required"],
      minlength: [2, "Address must be 2 or more characters"],
    },
    state: {
      type: String,
      required: [true, "State required"],
      minlength: [2, "State must be 2 or more characters"],
    },
    country: {
      type: String,
      required: [true, "Country required"],
      minlength: [2, "Country must be 2 or more characters"],
    },
    mosqueName: {
      type: String,
      required: [true, "Mosque name required"],
      minlength: [5, "Country must be 5 or more characters"],
      unique: true,
      unique: [true, "Mosque already added"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    imamName: {
      // Imam to lead the eid prayer
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.EidPrayer ||
  mongoose.model("EidPrayer", EidPrayerSchema);
