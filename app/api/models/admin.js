import mongoose from "mongoose";

const AdminUserSchema = new mongoose.Schema(
  {
    user: {
      ref: "User",
      type: mongoose.Types.ObjectId,
      required: [true, "User reference required"],
      unique: [true, "Application exists"],
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
    },
    // person's position in the mosque he is applying to be admin for
    position: {
      type: String,
      enum: {
        values: ["Imam", "muaddhin", "follower"],
        message: "{VALUE} is not a valid position",
      },
      default: "muaddhin",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    adminType: {
      type: String,
      enum: {
        values: ["mosqueAdmin", "others"],
        message: "{VALUE} is not a valid admin type",
      },
      default: "mosqueAdmin",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Admin ||
  mongoose.model("Admin", AdminUserSchema);
