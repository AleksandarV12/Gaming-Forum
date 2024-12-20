const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const postRoutes = require("./routes/postRoutes");
const themeRoutes = require("./routes/themeRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./utils/errorHandler");

dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/themes", themeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Test route
app.get("/test", (req, res) => {
  res.send("GET request received!");
});

app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
