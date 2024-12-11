const express = require("express");
const router = express.Router();
const { auth } = require("../utils");
const { themeController, postController } = require("../controllers");

// Get all themes
router.get("/", themeController.getThemes);

// Create a new theme (needs authentication)
router.post("/", auth(), themeController.createTheme);

// Get a specific theme by ID
router.get("/:themeId", themeController.getTheme);

// Subscribe to a theme (needs authentication)
router.put("/:themeId/subscribe", auth(), themeController.subscribe);

// Create a post in a specific theme (needs authentication)
router.post("/:themeId/posts", auth(), postController.createPost);

// Edit a post in a specific theme (needs authentication)
router.put("/:themeId/posts/:postId", auth(), postController.editPost);

// Delete a post in a specific theme (needs authentication)
router.delete("/:themeId/posts/:postId", auth(), postController.deletePost);

module.exports = router;
