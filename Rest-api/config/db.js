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
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Database connection error:", err));
};
