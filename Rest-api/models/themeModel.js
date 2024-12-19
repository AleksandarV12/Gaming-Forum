const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const themeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true, // Custom ID, separate from `_id`
    },
    themeName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: ObjectId, // Reference to the User model
      ref: "User",
      required: true,
    },
    posts: [
      {
        type: ObjectId, // References to the Post model
        ref: "Post",
      },
    ],
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

module.exports = mongoose.model("Theme", themeSchema);
