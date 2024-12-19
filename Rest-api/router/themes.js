const express = require("express");
const router = express.Router();
const { auth } = require("../utils");
const { themeController, postController } = require("../controllers");

// Middleware that is specific to this router
router.get("/", themeController.getThemes);
router.post("/", auth(), themeController.createTheme);

router.get("/:themeId", themeController.getTheme);
router.post("/:themeId", auth(), postController.createPost);
router.put("/:themeId/posts/:postId", auth(), postController.editPost);
router.delete("/:themeId/posts/:postId", auth(), postController.deletePost);

// Remove the subscribe route
// router.put("/:themeId", auth(), themeController.subscribe);

module.exports = router;
