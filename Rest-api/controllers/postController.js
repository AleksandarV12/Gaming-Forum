const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
  console.log('POST /api/posts called');
  console.log('Request body:', req.body);
  
  const { themeId, title, text, userId } = req.body;
  console.log('themeId:', themeId);
  console.log('userId:', userId);
  
  const post = new Post({ themeId, title, text, userId });

  try {
    await post.save();
    res.status(201).json({ message: "Post created", post });
  } catch (error) {
    console.error('CREATE POST ERROR:', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getPosts = async (req, res) => {
  console.log('GET /api/posts called');
  try {
    const posts = await Post.find().lean();
    console.log('Posts found:', posts.length);
    res.json(posts);
  } catch (error) {
    console.error('POSTS ERROR:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post updated", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
