const { userModel, themeModel, postModel } = require("../models");

// Create a new post and update user and theme references
function newPost(text, userId, themeId) {
  return postModel.create({ text, userId, themeId }).then((post) => {
    return Promise.all([
      userModel.updateOne(
        { _id: userId },
        { $push: { posts: post._id }, $addToSet: { themes: themeId } }
      ),
      themeModel.findByIdAndUpdate(
        { _id: themeId },
        { $push: { posts: post._id } }, // Removed subscribers field
        { new: true }
      ),
    ]);
  });
}

// Get the latest posts
function getLatestsPosts(req, res, next) {
  const limit = Number(req.query.limit) || 0;

  postModel
    .find()
    .sort({ createdAt: -1 }) // Use `createdAt` instead of `created_at`
    .limit(limit)
    .populate("themeId userId")
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(next);
}

// Create a new post
function createPost(req, res, next) {
  const { themeId } = req.params;
  const { _id: userId } = req.user;
  const { postText, title } = req.body; // Ensure title is included in the request body

  newPost(postText, userId, themeId)
    .then(([_, updatedTheme]) => res.status(200).json(updatedTheme))
    .catch(next);
}

// Edit an existing post
function editPost(req, res, next) {
  const { postId } = req.params;
  const { postText } = req.body;
  const { _id: userId } = req.user;

  postModel
    .findOneAndUpdate(
      { _id: postId, userId },
      { text: postText },
      { new: true }
    )
    .then((updatedPost) => {
      if (updatedPost) {
        res.status(200).json(updatedPost);
      } else {
        res.status(401).json({ message: "Not allowed!" });
      }
    })
    .catch(next);
}

// Delete a post
function deletePost(req, res, next) {
  const { postId, themeId } = req.params;
  const { _id: userId } = req.user;

  Promise.all([
    postModel.findOneAndDelete({ _id: postId, userId }),
    userModel.findOneAndUpdate({ _id: userId }, { $pull: { posts: postId } }),
    themeModel.findOneAndUpdate({ _id: themeId }, { $pull: { posts: postId } }),
  ])
    .then(([deletedPost, _, __]) => {
      if (deletedPost) {
        res.status(200).json(deletedPost);
      } else {
        res.status(401).json({ message: "Not allowed!" });
      }
    })
    .catch(next);
}

// Like a post
function like(req, res, next) {
  const { postId } = req.params;
  const { _id: userId } = req.user;

  postModel
    .updateOne({ _id: postId }, { $addToSet: { likes: userId } }, { new: true })
    .then(() => res.status(200).json({ message: "Liked successfully!" }))
    .catch(next);
}

// Export the controller functions
module.exports = {
  getLatestsPosts,
  newPost,
  createPost,
  editPost,
  deletePost,
  like,
};
