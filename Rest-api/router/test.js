const express = require("express");
const router = express.Router();

// Simple test route to check API status
router.get("/", (req, res) => {
  const data = {
    name: "Gaming Forum API",
    version: "1.0.0",
    description: "REST API for the gaming forum application.",
    main: "index.js",
  };
  res.send(data);
});

module.exports = router;
