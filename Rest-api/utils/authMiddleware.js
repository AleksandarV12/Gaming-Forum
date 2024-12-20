const jwt = require("jsonwebtoken");

// Middleware to protect routes
exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(500).json({ message: "Failed to authenticate token" });

    // Save user ID for use in other routes
    req.userId = decoded.id;
    next();
  });
};
