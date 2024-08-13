import mongoose from "mongoose";

const catSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imagePublicId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // ref to the user model
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", catSchema);
