import mongoose from "mongoose";

const PrayerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: {
        values: ["Subhi", "Zuhr", "Asr", "Magrib", "Ishaa", "Jumaa"],
        message: "{VALUE} is not a valid prayer name",
      },
      required: [true, "Prayer name required"],
      unique: [true, "{VALUE} prayer is already added"],
    },
    adhaanTime: {
      type: String,
      required: [true, "Adhaan time required"],
    },
    iqaamaTime: {
      type: String,
      required: [true, "Iqaama time required"],
    },
    imamName: {
      type: String,
    },
    mosque: {
      type: mongoose.Types.ObjectId,
      required: [true, "Mosque ID required"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Prayer || mongoose.model("Prayer", PrayerSchema);
