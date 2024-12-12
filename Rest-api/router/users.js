const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const { auth } = require("../utils");
const User = require("../models/userModel"); // Adjust this path based on your structure

// Authentication routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// Get all users (admin or authorized route)
router.get("/", auth(), async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.json(users); // Send the user list as a response
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// Get user profile information (needs authentication)
router.get("/profile", auth(), authController.getProfileInfo);

// Edit user profile information (needs authentication)
router.put("/profile", auth(), authController.editProfileInfo);

module.exports = router;
