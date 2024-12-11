const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const { auth } = require("../utils");

// Get user profile information (needs authentication)
router.get("/profile", auth(), authController.getProfileInfo);

// Edit user profile information (needs authentication)
router.put("/profile", auth(), authController.editProfileInfo);

module.exports = router;
