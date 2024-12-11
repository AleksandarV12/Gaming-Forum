const { themeModel } = require("../models");
const { newPost } = require("./postController");

async function getThemes(req, res, next) {
  try {
    const themes = await themeModel.find().populate("creatorId");
    res.status(200).json(themes);
  } catch (err) {
    next(err);
  }
}

async function getTheme(req, res, next) {
  const { themeId } = req.params;

  try {
    const theme = await themeModel.findById(themeId).populate({
      path: "posts",
      populate: {
        path: "authorId",
      },
    });
    res.status(200).json(theme);
  } catch (err) {
    next(err);
  }
}

async function createTheme(req, res, next) {
  const { title, description } = req.body;
  const { _id: userId } = req.user;

  try {
    const theme = await themeModel.create({
      title,
      description,
      creatorId: userId,
      createdAt: new Date(),
    });
    res.status(201).json(theme);
  } catch (err) {
    next(err);
  }
}

async function subscribe(req, res, next) {
  const themeId = req.params.themeId;
  const { _id: userId } = req.user;

  try {
    const updatedTheme = await themeModel.findByIdAndUpdate(
      { _id: themeId },
      { $addToSet: { subscribers: userId } },
      { new: true }
    );
    res.status(200).json(updatedTheme);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getThemes,
  createTheme,
  getTheme,
  subscribe,
};
