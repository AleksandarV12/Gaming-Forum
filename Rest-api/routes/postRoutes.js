const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { verifyToken } = require("../utils/authMiddleware");

router.post("/", verifyToken, postController.createPost);
router.get("/", postController.getPosts);
router.get("/:id", postController.getPostById);
router.put("/:id", verifyToken, postController.updatePost);
router.delete("/:id", verifyToken, postController.deletePost);
module.exports = router;
