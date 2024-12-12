const express = require("express");
const router = express.Router();
const { auth } = require("../utils");
const { postController } = require("../controllers");

// Get latest posts
router.get("/", postController.getLatestsPosts); // Corrected function name

// Create a new post (needs authentication)
router.post("/", auth(), postController.createPost);

// Get a single post by ID
router.get("/:postId", postController.getPostById); // Ensure this function exists

// Edit a post (needs authentication)
router.put("/:postId", auth(), postController.editPost);

// Delete a post (needs authentication)
router.delete("/:postId", auth(), postController.deletePost);

module.exports = router;
