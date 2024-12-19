const config = require("./config");
const mongoose = require("mongoose");

module.exports = () => {
  return mongoose
    .connect(config.dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
      process.exit(1); // Exit process with failure
    });
};
