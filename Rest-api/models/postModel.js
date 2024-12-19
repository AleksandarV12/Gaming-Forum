const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: ObjectId, // Reference to the User model
      ref: "User",
      required: true,
    },
    themeId: {
      type: ObjectId, // Reference to the Theme model
      ref: "Theme",
      required: true,
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

module.exports = mongoose.model("Post", postSchema);
