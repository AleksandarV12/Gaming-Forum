const { userModel, themeModel, postModel } = require("../models");

async function newPost(title, content, userId, themeId) {
  return postModel
    .create({ title, content, authorId: userId, themeId })
    .then((post) => {
      return Promise.all([
        userModel.updateOne(
          { _id: userId },
          { $push: { posts: post._id }, $addToSet: { themes: themeId } }
        ),
        themeModel.findByIdAndUpdate(
          { _id: themeId },
          { $push: { posts: post._id } },
          { new: true }
        ),
      ]);
    });
}

async function getLatestsPosts(req, res, next) {
  const limit = Number(req.query.limit) || 0;

  try {
    const posts = await postModel
      .find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("themeId authorId");
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
}

async function createPost(req, res, next) {
  const { themeId } = req.params;
  const { _id: userId } = req.user;
  const { title, content } = req.body;

  try {
    const newPost = await postModel.create({
      title,
      content,
      authorId: userId,
      themeId,
    });
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
}

async function editPost(req, res, next) {
  const { postId } = req.params;
  const { title, content } = req.body;
  const { _id: userId } = req.user;

  try {
    const updatedPost = await postModel.findOneAndUpdate(
      { _id: postId, authorId: userId },
      { title, content },
      { new: true }
    );
    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(403).json({ message: "Not allowed!" });
    }
  } catch (err) {
    next(err);
  }
}

async function deletePost(req, res, next) {
  const { postId, themeId } = req.params;
  const { _id: userId } = req.user;

  try {
    const deletedPost = await postModel.findOneAndDelete({
      _id: postId,
      authorId: userId,
    });
    if (deletedPost) {
      await userModel.updateOne({ _id: userId }, { $pull: { posts: postId } });
      await themeModel.updateOne(
        { _id: themeId },
        { $pull: { posts: postId } }
      );
      res.status(200).json(deletedPost);
    } else {
      res.status(403).json({ message: "Not allowed!" });
    }
  } catch (err) {
    next(err);
  }
}

async function like(req, res, next) {
  const { postId } = req.params;
  const { _id: userId } = req.user;

  try {
    await postModel.updateOne(
      { _id: postId },
      { $addToSet: { likes: userId } }
    );
    res.status(200).json({ message: "Liked successfully!" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getLatestsPosts,
  createPost,
  editPost,
  deletePost,
  like,
};
