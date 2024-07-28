const mongoose = require("mongoose");

async function mongoose_connection() {
await mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error.message || error);
  });
}

module.exports = mongoose_connection;