const mongoose = require("mongoose");
const config = require("config");
const debuger = require("debug")("production:mongoose");

mongoose
  .connect(`${config.get("MONGODB_URI")}`)
  .then(() => {
    debuger("Connected to MongoDB");
  })
  .catch((error) => {
    debuger("Error connecting to MongoDB: ", error.message || error);
  });
