import mongoose, { mongo } from "mongoose";

const FavoriteMosqueSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: [true, "User Id required"],
    },
    mosqueId: {
      type: mongoose.Types.ObjectId,
      required: [true, "Mosque Id required"],
    },
  },
  { timestamps: true }
);

const FavoriteMosque =
  mongoose.models.FavoriteMosque ||
  mongoose.model("FavoriteMosque", FavoriteMosqueSchema);

export default FavoriteMosque;
