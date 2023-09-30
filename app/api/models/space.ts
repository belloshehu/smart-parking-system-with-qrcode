import { timeStamp } from "console";
import mongoose from "mongoose";

const SpaceSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      length: [4, "Space ID cannot be more than 4 characters"],
      required: [true, "Space ID required"],
      unique: true,
    },

    price: {
      type: Number,
      required: [true, "Space price required"],
    },
    type: {
      type: String,
      enum: {
        values: ["vip", "normal"],
        message: "{VALUE} is not valid space type",
        default: "normal",
      },
      required: [true, "Space type required"],
    },
    status: {
      type: String,
      enum: {
        values: ["free", "occupied"],
        message: "{VALUE} is not a valid space status",
        default: "free",
      },
      required: [true, "Space status required"],
    },
  },
  { timestamps: true }
);
const Space = mongoose.models.Space || mongoose.model("Space", SpaceSchema);
export default Space;
