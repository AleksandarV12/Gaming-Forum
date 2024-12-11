const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const themeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    subscribers: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    creatorId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    posts: [
      {
        type: ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Theme", themeSchema);
