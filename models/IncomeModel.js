const mongoose = require("mongoose");

try {
  const incomeSchema = mongoose.Schema({
    rupee: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    typeOfMoney: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    }
  });
  const incomeModel = mongoose.model("Income", incomeSchema);

  module.exports = incomeModel;
} catch (error) {
  console.log(error.message || error);
}
