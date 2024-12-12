const { postModel } = require("../models");

// Get the latest posts
exports.getLatestsPosts = async (req, res) => {
  try {
    const posts = await postModel.find().sort({ created_at: -1 }).limit(10); // Sorting by created_at in descending order
    res.json(posts);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Error fetching posts" });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  const { text, userId, themeId } = req.body;

  try {
    const newPost = new postModel({ text, userId, themeId });
    await newPost.save();
    res.status(201).json(newPost); // Return the created post
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error creating post" });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching post" });
  }
};

// Edit a post
exports.editPost = async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;

  try {
    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      { text },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error updating post" });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const deletedPost = await postModel.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(204).send(); // Send a no content response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting post" });
  }
};

// Like a post
exports.like = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id; // Assuming user ID is stored in req.user

  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Toggle like: If user already liked, remove; otherwise, add
    if (post.likes.includes(userId)) {
      post.likes.pull(userId); // Remove user from likes
    } else {
      post.likes.push(userId); // Add user to likes
    }

    await post.save();
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error liking post" });
  }
};
