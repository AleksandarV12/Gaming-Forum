const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  themeName: {
    type: String,
    required: true,
  },
  posts: {
    type: [String],
    default: [],
  },
});

const Theme = mongoose.model("Theme", themeSchema);
module.exports = Theme;
