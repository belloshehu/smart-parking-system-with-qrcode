import mongoose from "mongoose";
import { string } from "yup";

const MosqueSchema = new mongoose.Schema(
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
    name: {
      type: String,
      required: [true, "Mosque name required"],
      minlength: [5, "Country must be 5 or more characters"],
      unique: true,
      unique: [true, "Mosque already added"],
    },
    image: {
      type: String,
      default: "",
    },
    imamName: {
      // Imam who regualrly leads prayer at the mosque
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

export default mongoose.models.Mosque || mongoose.model("Mosque", MosqueSchema);
