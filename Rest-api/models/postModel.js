const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  themeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Theme",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
