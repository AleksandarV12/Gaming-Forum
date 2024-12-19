const { themeModel } = require("../models");
const { newPost } = require("./postController");

// Get all themes
function getThemes(req, res, next) {
  themeModel
    .find()
    .populate("userId", "username avatarUrl") // Populate only selected fields
    .then((themes) => res.json(themes))
    .catch(next);
}

// Get a single theme by ID
function getTheme(req, res, next) {
  const { themeId } = req.params;

  themeModel
    .findById(themeId)
    .populate({
      path: "posts",
      populate: {
        path: "userId",
        select: "username avatarUrl", // Populate only selected fields
      },
    })
    .then((theme) => {
      if (!theme) {
        return res.status(404).json({ message: "Theme not found" });
      }
      res.json(theme);
    })
    .catch(next);
}

// Create a new theme
function createTheme(req, res, next) {
  const { themeName, description, postText } = req.body;
  const { _id: userId } = req.user;

  // Generate a unique ID for the theme
  const id = new mongoose.Types.ObjectId().toString();

  themeModel
    .create({ themeName, userId, id, description })
    .then((theme) => {
      if (postText) {
        // Create a new post if postText is provided
        return newPost(postText, userId, theme._id).then(([_, updatedTheme]) =>
          res.status(200).json(updatedTheme)
        );
      }
      res.status(201).json(theme);
    })
    .catch(next);
}

// Export the controller functions
module.exports = {
  getThemes,
  createTheme,
  getTheme,
};
