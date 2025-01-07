import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: [true, "Please provide first name"],
      trim: true,
    },
    lastName: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: [true, "Please provide other name"],
      trim: true,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      required: [true, "Please provide an email"],
      unique: [true, "Someone is alreay using this email"],
    },
    authProvider: {
      type: String,
      default: "credentials",
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, "Please provide password"],
    },
    location: {
      type: String,
      minlength: 3,
      trim: true,
      default: "my town",
    },
    lga: {
      type: String,
      minlength: 3,
      trim: true,
      default: "my town",
    },
    state: {
      type: String,
      minlength: 3,
      trim: true,
      default: "my town",
    },
    country: {
      type: String,
      minlength: 3,
      trim: true,
      default: "my town",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    verificationCode: {
      type: String,
      length: 6,
    },
    verificationCodeExpiry: Number,
    forgotPasswordCode: {
      type: String,
      length: 6,
    },
    forgotPasswordCodeExpiry: Number,
    image: String,
    role: {
      type: String,
      required: [true, "Please provide user role"],
      default: "user",
      enum: {
        values: ["staff", "admin", "user"],
        message: "Please select valid role",
      },
    },
  },
  { timestamps: true }
);

// hash the password before saving it
UserSchema.pre("save", async function (next) {
  // exit when login with google and facebook
  if (!this.password) return;

  // exit the function when other fields are updated
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (userPassword: string) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

// export new User model if not created already
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
