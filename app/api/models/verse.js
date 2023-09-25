import mongoose from "mongoose";

const verseSchema = new mongoose.Schema(
  {
    verseNumber: {
      type: Number,
      required: [true, "Verse number required"],
    },
    surah: {
      type: String,
      required: [true, "Surah required "],
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: [true, "User Id required"],
    },
  },
  { timestamps: true }
);

const Verse = mongoose.models.Verse || mongoose.model("Verse", verseSchema);

export default Verse;
