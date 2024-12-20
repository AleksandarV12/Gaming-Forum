const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  themeId: {
    type: String,
    required: true,
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
    type: String,
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
