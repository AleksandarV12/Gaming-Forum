const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { verifyToken } = require("../utils/authMiddleware"); // Import the middleware

// Define routes for posts
router.post("/", verifyToken, postController.createPost); // Protect this route
router.get("/", postController.getPosts);
router.get("/:id", postController.getPostById);
router.put("/:id", verifyToken, postController.updatePost); // Protect this route
router.delete("/:id", verifyToken, postController.deletePost); // Protect this route

module.exports = router;
