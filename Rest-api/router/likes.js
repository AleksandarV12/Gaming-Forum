const express = require("express");
const router = express.Router();
const { auth } = require("../utils");
const { postController } = require("../controllers");

// Route to like a post
router.put("/:postId", auth(), postController.like);

module.exports = router;
