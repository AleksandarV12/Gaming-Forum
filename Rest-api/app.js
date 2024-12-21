const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const themeRoutes = require("./routes/themeRoutes"); // Import theme routes
const errorHandler = require("./utils/errorHandler");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/themes", themeRoutes);

app.get("/test", (req, res) => {
  res.send("GET request received!");
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
