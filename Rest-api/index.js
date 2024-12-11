global.__basedir = __dirname;
require("dotenv").config();
const dbConnector = require("./config/db");
const apiRouter = require("./router");
const cors = require("cors");
const { errorHandler } = require("./utils");

dbConnector()
  .then(() => {
    const config = require("./config/config");

    const express = require("express");
    const app = express();

    // Middleware configurations
    require("./config/express")(app);

    // CORS configuration
    app.use(
      cors({
        origin: config.origin,
        credentials: true,
      })
    );

    // API routes
    app.use("/api", apiRouter);

    // Error handling middleware
    app.use(errorHandler);

    // Start server
    app.listen(config.port, () => {
      console.log(`Listening on port ${config.port}!`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
