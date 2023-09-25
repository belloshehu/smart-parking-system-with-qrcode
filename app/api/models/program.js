import { timeStamp } from "console";
import mongoose from "mongoose";

const ProgramSchema = new mongoose.Schema(
  {
    mosque: {
      type: mongoose.Types.ObjectId,
      required: [true, "Mosque ID required"],
    },
    title: {
      type: String,
      required: [true, "Program title required"],
      minLength: [5, "Title too short"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Program description required"],
      minLength: [20, "Description too short"],
      trim: true,
    },
    keyPersonName: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: {
        values: ["continous", "one-off"],
        message: "{VALUE} is not a valid type for program",
        required: [true, "Specify program type"],
        default: "physical",
      },
    },
    photo: {
      type: String,
      default: "",
    },
    nature: {
      // nature of program: virtual, hybrid or physical
      type: String,
      enum: {
        values: ["virtual", "hybrid", "physical"],
        message: "{VALUE} is not a valid type for program",
        required: [true, "Specify program type"],
        default: "physical",
      },
    },
    virtualUrl: {
      type: String,
      default: "",
    },
    startDate: {
      // for one-off programs, start date is specified
      type: Date,
    },
    endDate: {
      // for one-off programs, end date is specified: this is optional
      type: Date,
    },
    startTime: {
      type: String,
      required: [true, "Start time required"],
    },
    stopTime: {
      type: String,
      required: [true, "Stop time required"],
    },
    customDate: {
      // incase days and start and end date do not match the type of date for the program
      type: String,
      default: "",
    },
    additionalInfo: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Program ||
  mongoose.model("Program", ProgramSchema);
