const mongoose = require("mongoose");

try {
  const expensesSchema = mongoose.Schema({
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
  const expensesModel = mongoose.model("Expenses", expensesSchema);

  module.exports = expensesModel;
} catch (error) {
  console.log(error.message || error);
}
