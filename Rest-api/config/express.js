const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cookieSecret = process.env.COOKIESECRET || "SoftUni";

// Adjust the path to the user routes file
const userRoutes = require("../router/users"); // Correct path to users
const postRoutes = require("../router/posts"); // Correct path to posts
const themeRoutes = require("../router/themes"); // Correct path to themes

module.exports = (app) => {
  app.use(express.json());
  app.use(cookieParser(cookieSecret));
  app.use(express.static(path.resolve(__basedir, "static")));

  // Add your routes here
  app.use("/api/users", userRoutes);
  app.use("/api/posts", postRoutes);
  app.use("/api/themes", themeRoutes);
};
