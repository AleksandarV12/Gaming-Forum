const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cookieSecret = process.env.COOKIESECRET || "SoftUni";
const userRoutes = require("./routes/user.routes"); // Import user routes
const postRoutes = require("./routes/post.routes"); // Import post routes
const themeRoutes = require("./routes/theme.routes"); // Import theme routes

module.exports = (app) => {
  app.use(express.json());
  app.use(cookieParser(cookieSecret));
  app.use(express.static(path.resolve(__basedir, "static")));

  // Add your routes here
  app.use("/api/users", userRoutes);
  app.use("/api/posts", postRoutes);
  app.use("/api/themes", themeRoutes);
};
